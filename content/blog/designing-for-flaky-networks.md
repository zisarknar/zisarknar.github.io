---
title: "Designing for Flaky Networks"
date: "2025-01-27"
excerpt: "Lessons from building mobile and web apps where the network can't be trusted to be there, drawn from both Myanmar and the Tokyo subway."
tags: ["Mobile", "System Design", "Reliability"]
status: "published"
---

I've now built software under two very different versions of "the network is unreliable" — growing up with inconsistent infrastructure in Myanmar, and later building apps used inside Tokyo's subway tunnels. The lesson is the same in both cases: design for absence, not just for slowness.

The instinct most engineers have is to treat the network as a thing that's either up or down, fast or slow. In practice it's neither binary. It's a resource that disappears mid-request, comes back with stale DNS, hands you a connection that looks alive but silently drops every third packet, or gives you 200ms round trips for ten minutes and then nothing for ninety seconds. None of that shows up if you test on office wifi. It shows up the moment a real user is on a train going through Shinjuku, or on a 2G connection in a town outside Yangon where the tower serving it is shared by more people than it was built for.

## What "unreliable" actually looks like in practice

When I was a kid, "the internet" meant a shared connection that worked in bursts — long enough to load a page, not long enough to be sure a form submission actually went through before the connection dropped. You learned, without anyone teaching you, to distrust the spinner. Did it submit? Did it not? You'd hit submit again just in case, and sometimes that meant two identical forum posts, or worse, two payments.

Years later in Tokyo, building a transit-adjacent app, I watched the same failure mode happen to people who had never thought about network reliability in their lives, because the Tokyo Metro and most JR lines genuinely do lose signal between stations. The infrastructure is completely different — fiber to every building, gigabit wifi everywhere above ground — but the moment you go underground, you get the exact same failure profile I grew up with: requests that start and never finish, sockets that hang in a half-open state, apps that spin forever waiting for a server that will never answer because the client already lost the connection.

That convergence is the real lesson. "Flaky network" isn't a developing-infrastructure problem or a subway problem. It's what happens any time a request crosses a boundary the client doesn't fully control, which is to say: always. Designing for it isn't a regional concession, it's just designing correctly.

```
Happy path assumption:
  client ---request---> server ---response---> client
  (always succeeds, always returns, always once)

Reality:
  client ---request---X   (dropped before server saw it)
  client ---request---> server ---response---X  (dropped on the way back)
  client ---request---> server (slow) ... (timeout, client retries)
                                  \-> server eventually responds anyway
```

That last case is the dangerous one. The client gave up and moved on, but the server didn't know that, and it finished the work anyway. If that work was "charge the card," you now have a very different kind of problem than a spinner that spun too long.

## Retries need a ceiling and a backoff, not just a loop

A naive retry loop on failure turns a brief outage into a thundering herd the moment connectivity returns — every client retries at once, often hammering the same endpoint that just recovered. I've seen this happen literally at the level of a subway car: a train pulls into a station, forty phones simultaneously regain signal, and forty copies of the same app simultaneously retry the same failed request against the same backend. If that backend just came back up itself, you've recreated the outage you were trying to recover from.

Exponential backoff with jitter spreads that load out. The "exponential" part matters because it stops hammering a struggling server with the same frequency it was already failing to handle. The "jitter" part matters because without it, every client computes the exact same backoff delay and they all retry in sync anyway, just on a slower cadence. Add randomness and the retries spread across a window instead of landing in the same instant.

A retry ceiling matters just as much, for a less obvious reason: it prevents a request from silently retrying forever in the background, draining battery for a request the user has long since given up on, closed the app, and forgotten about. I worked on an app early in my career that had no retry ceiling on a background sync job. Users started reporting their phone got warm and the battery drained fast even with the screen off. The sync job was retrying every few seconds, forever, against an endpoint that had been returning errors for that user's account for weeks because of a stale auth token nobody had surfaced to them. The fix wasn't a smarter retry algorithm. It was admitting that after N attempts, the answer is "stop and tell the user," not "try again."

```python
def retry_with_backoff(fn, max_attempts=5, base_delay=0.5):
    for attempt in range(max_attempts):
        try:
            return fn()
        except TransientError:
            if attempt == max_attempts - 1:
                raise  # give up, surface it, don't loop forever
            delay = base_delay * (2 ** attempt)
            jitter = random.uniform(0, delay * 0.3)
            time.sleep(delay + jitter)
```

## Idempotency is what makes retries safe

None of this works if retrying a request can cause it twice — a duplicate payment, a duplicate message send, a double-booked seat. Every mutating request needs an idempotency key generated client-side, so the server can recognize "this is the same logical request" even after a retry following a network drop mid-request.

The key has to be generated once, before the first attempt, and reused across every retry of that same logical action — not regenerated each time, which defeats the entire point. I usually generate it as a UUID at the moment the user takes the action (taps "send," taps "pay"), store it alongside the pending request locally, and attach it to every retry attempt until the request either succeeds or the user explicitly abandons it.

On the server side, this means keeping a short-lived record of "I've seen this idempotency key, here was the result," so a retried request with the same key returns the original result instead of re-executing the logic. For a payment, that's the difference between "card charged once" and an angry support ticket about a duplicate charge that takes a human three days to refund.

| Approach | Behavior on retry | Risk |
|---|---|---|
| No idempotency key | Re-executes the full operation | Duplicate payments, duplicate messages |
| Idempotency key, no server dedup | Server sees the key but ignores it | Same risk, key is decorative |
| Idempotency key + server dedup window | Server returns cached result for repeated key | Safe, but window must outlive realistic retry span |
| Idempotency key + permanent dedup record | Always safe, even for very delayed retries | Storage cost, needs cleanup policy |

I default to the last option for anything involving money or anything irreversible (sending a message, deleting an account), and the dedup-window approach for everything else, where eventual cleanup of old keys is fine.

## Optimistic UI needs an honest rollback path

Showing a "sent" state immediately, before server confirmation, makes an app feel responsive — but only if there's a real plan for what happens when the request actually fails after the UI already moved on. I treat optimistic updates as a UI promise that has to be kept or visibly corrected, never silently dropped.

The mistake is treating optimistic UI as "assume success and forget about it." It's the opposite: optimistic UI means you've taken on the responsibility of reconciling reality with what you already showed the user. If a message shows as sent and the request later fails, the UI needs to show that message as failed, with a clear way to retry or remove it. If it just sits there forever looking sent when it wasn't, you've built a system that lies to the user, and they will eventually find out at the worst possible moment, usually when someone tells them "I never got that."

```
User taps send
   |
   v
[UI: message shown as "sent", greyed checkmark]  <- optimistic
   |
   v
Request goes out
   |
   +--> success --> [UI: checkmark turns solid]
   |
   +--> failure --> [UI: message marked "failed to send", retry button]
   |
   +--> timeout/unknown --> [UI: message marked "sending...", keep retrying
                              with same idempotency key, then fail visibly
                              if ceiling reached]
```

That third branch is the one most apps skip, and it's the one that matters most on a genuinely flaky connection, because "the request might still be in flight" is the common case, not the exception.

## Queue writes, don't just block on them

For anything that doesn't need an immediate server round-trip — a draft, a log entry, a "mark as read" — queuing the write locally and syncing when connectivity returns beats blocking the UI on a network call that might not succeed for minutes. The user shouldn't have to know or care that the network briefly disappeared.

This is the pattern that most directly maps onto what I grew up doing without realizing it had a name. Writing a long message on a bad connection, you'd learn to just keep typing and let it send "eventually," because waiting for confirmation after every keystroke-adjacent action was hopeless. A well-built app formalizes that instinct: a local write queue, persisted to disk (not just memory, because the app might get killed before connectivity returns), drained in order once the network is confirmed available again.

The part that's easy to get wrong is ordering and conflict resolution once you have more than one queued write touching the same resource. "Mark as read" twice is harmless. Two queued edits to the same draft, made offline on two different devices, are not — you need a resolution strategy (last-write-wins with a timestamp, a merge strategy, or surfacing the conflict to the user) decided before it happens in production, not improvised during an incident.

## Detecting "flaky" versus "down" changes what you should do

One thing I didn't appreciate early on: a fully-down network and a flaky one require different handling, and conflating them leads to bad UX in both directions. If you treat every failure as "fully offline," you stop retrying too aggressively and the app feels broken the moment a single request times out on an otherwise fine connection. If you treat every failure as "just retry," a genuinely offline device burns battery retrying forever and never tells the user to, say, walk toward a window.

I track a rolling success rate over the last N requests rather than reacting to any single failure. Below a threshold, the app switches into an explicit "offline" mode: stop background retries, surface a banner, queue writes more aggressively, and check connectivity with a lightweight periodic probe instead of retrying real requests. Above the threshold, normal retry-with-backoff behavior applies to individual failures without changing the app's overall state.

| Signal | Single request failure | Sustained low success rate |
|---|---|---|
| Likely cause | Transient packet loss, brief tunnel | Genuinely offline or server down |
| Right response | Retry with backoff | Switch to offline mode, stop hammering |
| User-facing | Nothing visible, or quiet spinner | Explicit "you're offline" banner |
| Background sync | Keep trying within ceiling | Pause, probe periodically instead |

## Testing this honestly

None of the above means anything if it's only ever exercised against a fast, stable connection in a CI environment. I keep a network-conditioning step in my own testing routine — Chrome DevTools throttling, or for mobile, an actual airplane-mode toggle mid-request, repeatedly, deliberately, until the rollback paths and retry ceilings behave the way I claimed they would on paper. The bugs in this category don't show up from reading the code. They show up from yanking the cable while a request is half-sent and watching what the UI does next.

None of these are mobile-specific tricks. They're just what "the network is a real-world resource with real-world failure modes" looks like once you take it seriously instead of assuming a happy path. The interesting thing, looking back, is that the most useful intuition I have for this came from a place with objectively worse infrastructure than almost anywhere I've worked since. Designing for the network you actually have, rather than the network you wish you had, turns out to be a transferable skill no matter which side of that gap you grew up on.
