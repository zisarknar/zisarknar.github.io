---
title: "Debugging Production Incidents Without Losing Your Mind"
date: "2024-09-25"
excerpt: "A calm process for the moment everything is on fire — how I triage, isolate, and fix production incidents under pressure."
tags: ["Debugging", "SRE", "Engineering"]
status: "published"
---

The worst debugging happens during the worst possible time — production is down, people are watching, and panic makes everyone worse at their job, including you. Having a process that doesn't depend on staying calm matters more than any specific debugging trick. I've been on both sides of this: the engineer frantically tailing logs with no plan, and the engineer who's run the same five steps enough times that the panic just doesn't have anywhere to attach itself anymore.

## Stop the bleeding before you understand the cause

The instinct to find the root cause immediately is usually wrong under incident pressure. The first move should be mitigation: can you roll back the last deploy, fail over to a healthy region, or disable the feature flag tied to the change? Understanding "why" can come after the immediate damage stops, not before.

I remember an incident on a mobile backend where push notifications started silently failing for a subset of users right after a routine dependency bump. The natural instinct in the room was to start reading the diff line by line, looking for the bug. That's the wrong first move. The right first move was: roll back the deploy, confirm notifications resume, and only then start reading the diff with the pressure off. Once we weren't actively losing notifications, the actual bug, a subtle change in how a third-party SDK serialized payload size limits, took twenty calm minutes to find instead of an hour of stressed guessing.

```
Incident timeline, mitigation-first:

t+0   alert fires
t+2m  on-call acknowledges
t+4m  rollback triggered          <- bleeding stopped
t+6m  error rate back to normal
t+25m root cause identified       <- calm investigation
t+40m fix written, tested, deployed forward

Incident timeline, root-cause-first (worse):

t+0   alert fires
t+2m  on-call acknowledges
t+5m  start reading code under pressure
t+35m still debugging, error rate still elevated
t+50m finally roll back out of frustration
t+50m users affected for 50 minutes instead of 6
```

The difference in that second timeline isn't that the engineer was less skilled. It's that mitigation got delayed in favor of understanding, and understanding under pressure is slow and error-prone in a way it just isn't once the system is stable again.

## Narrow the blast radius with evidence, not guesses

Once things are stable, I resist the urge to start changing code based on a hunch. Instead: what changed recently (deploys, config, traffic patterns, third-party dependencies)? What do the error rates and latency graphs actually show, and when did they start diverging from normal? A timeline built from logs and metrics beats intuition every time, especially when the obvious suspect ("it's probably the database") is often wrong.

A habit that's served me well: before touching anything, write down a literal timeline with timestamps, even if it feels like overhead in the moment.

```
14:02 — error rate begins climbing (from dashboard)
14:00 — deploy of api-gateway v2.14.3 completed (from deploy log)
13:58 — feature flag "new-checkout-flow" set to 10% (from flag history)
13:45 — traffic spike begins, +40% over baseline (from CDN metrics)
```

Laid out like that, the deploy at 14:00 and the error spike at 14:02 line up far more convincingly than the traffic spike at 13:45, which is fourteen minutes earlier and a much weaker correlation. Without writing it down, it's easy to anchor on "traffic spike" because it's the most dramatic-looking number on the dashboard, even when the timing doesn't actually support it. The timeline forces you to confront the data instead of the first plausible story.

| Signal | Useful for | Misleading when |
|---|---|---|
| Error rate / latency graphs | Pinpointing exact onset time | Confused with a slower, unrelated trend |
| Deploy history | Correlating with code changes | Multiple deploys close together |
| Feature flag history | Isolating a specific rollout | Flag change coincidental, not causal |
| "It's probably X" intuition | Generating hypotheses fast | Treated as confirmed before checking evidence |

## One change at a time, always

Under pressure, there's a strong temptation to apply three fixes at once because each seems plausible and time is short. Resist it. If you change three things and the incident resolves, you've learned nothing about which one mattered, and you've potentially introduced two unnecessary changes into a system that's already unstable.

I've seen this go wrong concretely: during a database connection pool exhaustion incident, someone suggested bumping the pool size, someone else suggested adding a retry with backoff, and a third person wanted to kill long-running queries. All three changes went out in the same deploy because everyone was anxious to "just fix it." The incident resolved, but six weeks later, when a similar symptom showed up again, nobody could say with confidence which of the three changes had actually mattered, which meant we couldn't reason about whether this new incident was the same root cause resurfacing or something different wearing a similar disguise. We ended up re-deriving the same investigation from scratch, which is the exact cost that "one change at a time" is meant to avoid paying twice.

The discipline isn't about being slow. It's about preserving the ability to learn from what just happened, which is the entire point of debugging something instead of just making it stop.

## The postmortem is the actual deliverable

The incident itself is mostly noise — what matters is whether the postmortem produces a concrete action that prevents the same class of failure from recurring. "We'll be more careful" is not an action. "We added a circuit breaker on this dependency and a canary deploy step" is.

I've started judging the success of an incident response less by how fast we recovered and more by whether the postmortem changed anything real. A good postmortem template, in my experience, asks four questions and refuses to let anyone skip to the comfortable answer:

1. **What was the actual user-facing impact, in concrete numbers?** Not "some users were affected," but "checkout failed for roughly 4% of attempts over 38 minutes."
2. **What was the earliest point we could have caught this, and why didn't we?** This is usually the most uncomfortable and most useful question in the entire document.
3. **What specific, assignable action prevents this exact failure mode from recurring?** If there's no owner and no deadline next to it, it's not an action, it's a wish.
4. **What worked well in the response that we should keep doing?** Postmortems that only list failures train people to dread them, and a process people dread gets skipped under the next real pressure.

The postmortems that actually changed something at companies I've worked at all had one thing in common: a named owner and a date for the follow-up action, tracked somewhere that gets checked, not just written down and forgotten in a document nobody reopens.

## Building the muscle before you need it

None of this works if the first time you try to follow a calm process is during an actual incident with real users affected and your manager watching the metrics dashboard over your shoulder. The teams I've seen handle incidents well all practice this in some lower-stakes way beforehand: deliberate game days where someone breaks a non-critical service on purpose and the team practices the mitigation-first, evidence-based, one-change-at-a-time process on something that doesn't matter if it goes a little sideways.

It feels artificial the first time. It stops feeling artificial the third or fourth time, and by then the process has become close enough to muscle memory that it survives contact with an actual 2am page, which is the only test that actually counts.

Staying calm during an outage isn't a personality trait — it's what happens when you trust your process more than your panic, and trust like that isn't free. It's built the same way any other skill is: by practicing it enough times before it matters that, when it finally does matter, there's nothing left to figure out except the specific bug in front of you.
