---
title: "Observability Beyond Dashboards"
date: "2025-04-10"
excerpt: "Dashboards tell you something is wrong. Good observability tells you why — and the difference comes down to what you instrument, not which tool you buy."
tags: ["Observability", "SRE", "Backend"]
status: "published"
---

A team can have a beautiful dashboard full of green graphs and still have no idea why a specific user's request failed five minutes ago. Dashboards answer "is the system healthy," which is a different question from "why did this one thing break." I've sat in incident calls where the dashboard showed everything was fine in aggregate, while one specific customer's checkout had been failing for twenty minutes, invisible in the noise of every other successful request averaging the graph back to green.

That gap between "the dashboard looks fine" and "this one thing is broken" is, in my experience, where most on-call pain actually lives. It's not that teams lack monitoring. It's that monitoring built only for dashboards answers the wrong question when something specific goes wrong, and specific is how almost everything actually goes wrong.

## Structured logs beat clever log messages

A log line like `"failed to process order"` is nearly useless at 2am. A structured log with `order_id`, `user_id`, `error_code`, and `duration_ms` as queryable fields turns "search through text and hope" into "filter by order_id and see exactly what happened." The discipline of structuring every log line the same way pays for itself the first time you actually need to use one during an incident.

I've worked in codebases with both styles, and the difference under pressure is dramatic.

```
Unstructured:
  "failed to process order for user, retrying"
  -> grep for "failed to process order", get 4,000 matches
  -> manually scan timestamps near the incident window
  -> guess which one is the right order based on surrounding lines

Structured:
  {"event": "order_processing_failed", "order_id": "ord_8f2a",
   "user_id": "usr_1192", "error_code": "PAYMENT_DECLINED",
   "duration_ms": 1240, "timestamp": "2025-04-10T03:14:02Z"}
  -> filter: order_id = "ord_8f2a"
  -> exactly one result, full context immediately visible
```

The unstructured version isn't useless because the engineer who wrote it was careless. It's useless because text was never designed to be queried precisely, and "failed to process order" reads fine in isolation but becomes indistinguishable from four thousand other instances of the same string the moment volume goes up, which is exactly when you need it most.

```typescript
// A small wrapper that makes structured logging the only easy option
function logEvent(event: string, fields: Record<string, unknown>) {
  console.log(JSON.stringify({
    event,
    ...fields,
    timestamp: new Date().toISOString(),
  }));
}

logEvent("order_processing_failed", {
  orderId: order.id,
  userId: order.userId,
  errorCode: "PAYMENT_DECLINED",
  durationMs: 1240,
});
```

The discipline isn't really about the logging library. It's about making the structured path the path of least resistance, so that the natural thing to reach for already produces something queryable, instead of relying on every engineer remembering to be careful every single time they add a log line.

## Traces tell you where the time actually went

Metrics tell you a request took 800ms. A distributed trace tells you it took 800ms because a downstream service call took 650ms of it, and that service was waiting on a lock. Without tracing, "this endpoint is slow" debugging turns into guesswork across service boundaries; with it, it's usually a five-minute investigation.

I think of a trace as the thing that turns "the checkout API is slow" from a hypothesis into a measured fact about a specific span of a specific request. Without it, a slow endpoint touching four services means four separate engineers, in four separate Slack threads, each checking their own service's metrics and reporting back "looks fine on my end," and the actual answer is buried in the interaction between services, not in any one service's isolated view of itself.

```
Trace for one slow checkout request (800ms total):

  api-gateway     [==] 40ms
  checkout-svc    [====================================] 800ms (root)
    auth-check    [==] 30ms
    inventory-svc [=========] 120ms
    payment-svc   [=====================================] 650ms  <- here
      db-lock-wait[=================================] 590ms
```

That last line is the entire incident report, once you can see it. Without tracing, the five engineers debugging this independently would each have looked at their own service's average latency, seen nothing unusual (because most requests to `payment-svc` don't hit this lock), and the bug would have stayed invisible until someone got lucky enough to correlate timestamps by hand across five separate dashboards.

The instrumentation cost for this is genuinely small relative to the payoff. Most modern frameworks support OpenTelemetry with a few lines of setup, propagating a trace context header across service calls automatically. The expensive part isn't the tooling, it's the cultural habit of actually checking traces before guessing, which takes a few incidents of "tracing would have caught this in five minutes" before it becomes the default reflex instead of the last resort.

## Correlate logs, metrics, and traces with one ID

The single highest-leverage observability decision is propagating one request ID through every log line, every trace span, and every metric label across all services a request touches. Without that thread, you're reconstructing a request's journey by matching timestamps across systems, which is slow and error-prone exactly when speed matters most.

I generate this ID at the edge, the first service a request hits, and pass it forward as a header on every subsequent call. Every service that receives it includes it in every log line it writes, every span it creates, and ideally as a label on relevant metrics too, though high-cardinality metric labels need care since not every system handles a unique-per-request label well at scale.

```
Request enters at api-gateway:
  x-request-id: req_4ab92f generated here
        |
        v
  api-gateway logs: {"request_id": "req_4ab92f", ...}
        |
        v  (header forwarded)
  checkout-svc logs: {"request_id": "req_4ab92f", ...}
        |
        v  (header forwarded)
  payment-svc logs: {"request_id": "req_4ab92f", ...}

One query, one ID, the entire journey across three services.
```

This is the one piece of infrastructure I'd genuinely fight for on a new project, ahead of almost any other observability investment, because everything else partially substitutes for it but nothing fully replaces it. Good structured logs without a correlation ID still leave you cross-referencing timestamps across services. Good tracing without it still leaves your logs and metrics speaking a different language than your traces. The request ID is the thread that ties the other three signals (logs, metrics, traces) into one coherent narrative instead of three separate, only loosely related, data sources.

| Signal alone | What it tells you | What it's missing |
|---|---|---|
| Metrics only | Aggregate health, trends over time | Why any single request failed |
| Logs only | What happened, if you can find the line | How it relates across services |
| Traces only | Where time went, for one request | Broader context, historical pattern |
| All three + request ID | Full story, one request, one query | Almost nothing, this is the goal |

## Alert on symptoms, not on every possible cause

Alerting on "CPU is above 80%" produces noise, because high CPU isn't always a problem. Alerting on "P99 latency exceeded the SLA" or "error rate crossed a threshold users would notice" reflects what actually matters — the user-facing symptom — and lets the on-call engineer use traces and logs to find the cause, instead of being woken up for every metric that merely looks unusual.

The distinction that matters here is between a cause and a symptom. CPU usage, memory pressure, queue depth, connection pool saturation — these are all potential causes of a problem, but none of them are the problem itself. A service can run at 95% CPU all day, every day, by design, and serve every request within SLA the entire time. Paging someone for that is paging them for nothing, and every time that happens, it erodes a little bit of trust in the alerting system, until eventually people start ignoring pages on instinct, which is exactly the failure mode you can't afford the one time the page is real.

I've been on teams that paged on a dozen different cause-level metrics and teams that paged on three symptom-level ones, and the second kind of team slept dramatically better without missing anything that actually mattered.

```
Cause-based alerting (noisy):
  CPU > 80%        -> page  (often fine, by design)
  Memory > 75%      -> page  (often fine, GC will reclaim it)
  Queue depth > 100 -> page  (often fine, traffic spike, draining normally)
  Connection pool 90% used -> page (often fine, briefly)

Symptom-based alerting (meaningful):
  P99 latency > SLA threshold       -> page (users are affected, now)
  Error rate > acceptable baseline  -> page (users are affected, now)
  Availability < target             -> page (users are affected, now)
```

Once a symptom-level alert fires, that's exactly when the cause-level signals (CPU, memory, queue depth, the trace, the structured logs) become useful, as the tools for diagnosis rather than as triggers for waking someone up. They're not useless metrics, they're just the wrong layer to alert on. They belong on a dashboard the on-call engineer pulls up after the page, not in the page itself.

## Putting it together: what actually happens during an incident

The real test of an observability setup isn't how it looks on a calm Tuesday, it's what happens at 3am when something is actually broken. With the pieces above in place, an incident tends to follow a predictable, fast shape: a symptom-level alert fires (error rate crossed the threshold), the on-call engineer pulls the request ID from one of the failing requests' logs, follows that ID into the trace to see exactly which downstream call is slow or failing, and follows the same ID into structured logs from that specific service to see the exact error code and payload that caused it. Minutes, not hours, and crucially, no guessing.

```
3:14am: alert fires (error rate > threshold)
   |
   v
on-call grabs a failing request_id from the alert payload
   |
   v
traces: payment-svc span shows 590ms db-lock-wait
   |
   v
logs filtered by request_id: error_code = LOCK_TIMEOUT,
  row being locked by a stuck batch job from 3:02am
   |
   v
root cause found in under 5 minutes, batch job killed, resolved
```

Without any one of the three pieces, this same incident takes much longer and depends a lot more on luck. Without the request ID, correlating the trace to the right log lines means guessing by timestamp. Without the trace, nobody knows to look at `payment-svc` specifically instead of checking all four services in sequence. Without structured logs, finding the actual error code buried in a sea of text-based log lines is its own fifteen-minute side quest.

Good observability isn't about buying a more expensive tool. It's about instrumenting the system so that, when something breaks, the answer to "why" is a query away instead of a guessing game.
