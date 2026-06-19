---
title: "Observability Beyond Dashboards"
date: "2025-04-10"
excerpt: "Dashboards tell you something is wrong. Good observability tells you why — and the difference comes down to what you instrument, not which tool you buy."
tags: ["Observability", "SRE", "Backend"]
status: "published"
---

A team can have a beautiful dashboard full of green graphs and still have no idea why a specific user's request failed five minutes ago. Dashboards answer "is the system healthy," which is a different question from "why did this one thing break."

## Structured logs beat clever log messages

A log line like `"failed to process order"` is nearly useless at 2am. A structured log with `order_id`, `user_id`, `error_code`, and `duration_ms` as queryable fields turns "search through text and hope" into "filter by order_id and see exactly what happened." The discipline of structuring every log line the same way pays for itself the first time you actually need to use one during an incident.

## Traces tell you where the time actually went

Metrics tell you a request took 800ms. A distributed trace tells you it took 800ms because a downstream service call took 650ms of it, and that service was waiting on a lock. Without tracing, "this endpoint is slow" debugging turns into guesswork across service boundaries; with it, it's usually a five-minute investigation.

## Correlate logs, metrics, and traces with one ID

The single highest-leverage observability decision is propagating one request ID through every log line, every trace span, and every metric label across all services a request touches. Without that thread, you're reconstructing a request's journey by matching timestamps across systems, which is slow and error-prone exactly when speed matters most.

## Alert on symptoms, not on every possible cause

Alerting on "CPU is above 80%" produces noise, because high CPU isn't always a problem. Alerting on "P99 latency exceeded the SLA" or "error rate crossed a threshold users would notice" reflects what actually matters — the user-facing symptom — and lets the on-call engineer use traces and logs to find the cause, instead of being woken up for every metric that merely looks unusual.

Good observability isn't about buying a more expensive tool. It's about instrumenting the system so that, when something breaks, the answer to "why" is a query away instead of a guessing game.
