---
title: "What Code Review Is Actually For"
date: "2025-01-09"
excerpt: "Code review isn't a bug-finding tool — treating it like one explains most of the frustration teams have with it."
tags: ["Engineering", "Code Review", "Culture"]
status: "published"
---

A lot of teams treat code review as a quality gate whose job is to catch bugs before they ship. Under that framing, review feels adversarial, slows everyone down, and still misses plenty of bugs anyway. I think that framing is the actual problem.

## Bugs should mostly be caught by tests, not eyeballs

If your team's primary defense against bugs is a human reading a diff carefully, you have a testing gap, not a review gap. Tests run every time, deterministically, and don't get tired at 4pm on a Friday. Review is a terrible substitute for automated coverage — it should be a complement to it.

## Review is for shared understanding, not gatekeeping

The actual value of review is that a second person now understands this part of the codebase. That matters for on-call coverage, for catching design decisions that don't fit the bigger picture, and for spreading knowledge so the system doesn't depend on one person's memory. Judged by that goal, a review that asks good questions and approves is often more valuable than one that nitpicks variable names.

## Fast feedback matters more than thorough feedback

A review that comes back in twenty minutes with two solid comments beats a review that comes back two days later with fifteen comments, every time. Slow review cycles are one of the biggest hidden costs in a team's velocity, and they compound — a PR sitting open for days means context the author had is gone by the time they have to address comments.

## Disagreements need a tiebreaker, not a stalemate

When author and reviewer genuinely disagree on approach and both have reasonable points, the PR shouldn't sit blocked indefinitely. I push teams toward a simple rule: if it's not a correctness issue, the author gets to make the call and move on, with the option to revisit later if it turns out to matter. Review is there to catch problems, not to enforce a single person's taste.

Review done well is one of the highest-leverage habits an engineering team has. Review done as a bug hunt mostly just produces friction and false confidence.
