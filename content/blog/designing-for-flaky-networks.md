---
title: "Designing for Flaky Networks"
date: "2025-01-27"
excerpt: "Lessons from building mobile and web apps where the network can't be trusted to be there, drawn from both Myanmar and the Tokyo subway."
tags: ["Mobile", "System Design", "Reliability"]
status: "published"
---

I've now built software under two very different versions of "the network is unreliable" — growing up with inconsistent infrastructure in Myanmar, and later building apps used inside Tokyo's subway tunnels. The lesson is the same in both cases: design for absence, not just for slowness.

## Retries need a ceiling and a backoff, not just a loop

A naive retry loop on failure turns a brief outage into a thundering herd the moment connectivity returns — every client retries at once, often hammering the same endpoint that just recovered. Exponential backoff with jitter spreads that load out, and a retry ceiling prevents a request from silently retrying forever in the background, draining battery for a request the user has long since given up on.

## Idempotency is what makes retries safe

None of this works if retrying a request can cause it twice — a duplicate payment, a duplicate message send. Every mutating request needs an idempotency key generated client-side, so the server can recognize "this is the same logical request" even after a retry following a network drop mid-request.

## Optimistic UI needs an honest rollback path

Showing a "sent" state immediately, before server confirmation, makes an app feel responsive — but only if there's a real plan for what happens when the request actually fails after the UI already moved on. I treat optimistic updates as a UI promise that has to be kept or visibly corrected, never silently dropped.

## Queue writes, don't just block on them

For anything that doesn't need an immediate server round-trip — a draft, a log entry, a "mark as read" — queuing the write locally and syncing when connectivity returns beats blocking the UI on a network call that might not succeed for minutes. The user shouldn't have to know or care that the network briefly disappeared.

None of these are mobile-specific tricks. They're just what "the network is a real-world resource with real-world failure modes" looks like once you take it seriously instead of assuming a happy path.
