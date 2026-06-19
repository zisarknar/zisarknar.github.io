---
title: "The Case for Boring Technology"
date: "2024-10-12"
excerpt: "Why I default to the well-worn tool over the exciting new framework, and the one exception that's actually worth the risk."
tags: ["Engineering", "Architecture", "Opinion"]
status: "published"
---

Every few months a new framework promises to make everything faster, simpler, or more elegant. Most of the time, I let other people find out the hard way whether that's true.

## Boring technology has already paid its dues

A database, language, or framework that's been in production for a decade has already hit the weird edge cases — the obscure concurrency bug, the migration path nobody documented, the failure mode that only shows up at scale. That knowledge is baked into its documentation, its Stack Overflow answers, and the experience of every engineer who's used it before you. New tools haven't paid that tax yet, and you end up paying it yourself, in production, usually at the worst time.

## The real cost of "exciting" isn't the learning curve

People worry about the time it takes to learn a new tool, but that's rarely the actual cost. The real cost is the operational burden six months later — the on-call engineer who's never seen this framework before, debugging a 2am incident with thin documentation and no Stack Overflow answer for their specific error. Boring technology means anyone on the team, including future hires, can reason about a failure without starting from zero.

## Where I'll actually take the risk

I'm not against new technology — I'm against adopting it without a specific reason. The exception is when a new tool removes an entire category of bugs my current stack can't avoid, not just a marginal improvement in developer experience. Type-safe schema validation across a network boundary, for instance, was worth adopting early because it eliminated a whole class of runtime errors I was tired of debugging, not because it was new.

## A useful question

Before adopting anything unproven, I ask: "if this breaks in production at 3am, what does debugging it actually look like?" If the honest answer is "I have no idea, there's no community to ask," that's not necessarily a dealbreaker, but it should be a deliberate, acknowledged trade-off — not something I back into by accident because the framework had a good landing page.
