---
title: "What Code Review Is Actually For"
date: "2025-01-09"
excerpt: "Code review isn't a bug-finding tool — treating it like one explains most of the frustration teams have with it."
tags: ["Engineering", "Code Review", "Culture"]
status: "published"
---

A lot of teams treat code review as a quality gate whose job is to catch bugs before they ship. Under that framing, review feels adversarial, slows everyone down, and still misses plenty of bugs anyway. I think that framing is the actual problem. I've watched the same review process produce completely different team dynamics depending on whether people believed its job was "find what's wrong with this" or "understand what this does," and the difference in morale alone was enough to convince me the framing matters more than any specific review checklist.

I started paying close attention to this after joining a team where review comments had a noticeably sharper edge than anywhere I'd worked before. Nobody was being cruel exactly, but PRs would sit with eight comments, most of them about naming or style, and authors would visibly brace before opening their review notifications. Six months later, after we'd deliberately shifted what review was supposed to accomplish, the comment count per PR actually went down, and the quality of the comments that remained went up. The team hadn't gotten better at writing code in six months. It had gotten clearer on what review was for.

## Bugs should mostly be caught by tests, not eyeballs

If your team's primary defense against bugs is a human reading a diff carefully, you have a testing gap, not a review gap. Tests run every time, deterministically, and don't get tired at 4pm on a Friday. Review is a terrible substitute for automated coverage, it should be a complement to it.

```
Defense layer        Runs when?         Gets tired?    Deterministic?
─────────────────────────────────────────────────────────────────────
Automated tests       every commit          no              yes
Static analysis       every commit          no              yes
Human review          once, by 1-2 people   yes             no
Production monitoring continuously          no              yes
```

Looking at that table, the conclusion is uncomfortable but pretty clear: review is the least reliable layer in that whole stack, and yet it's frequently the layer teams lean on hardest, because it feels rigorous in a way that's easy to point to ("a human looked at this and approved it") even when it's statistically the weakest defense against an actual regression.

I had a very concrete demonstration of this on a payments-adjacent feature. A PR went through two rounds of careful review, three reviewers total, nobody caught that a currency rounding function truncated instead of rounded for a specific negative-amount edge case. It shipped. It was caught two weeks later not by a human rereading the code, but by a property-based test someone added afterward as part of the postmortem, a test that, if it had existed before the PR, would have failed immediately and blocked the merge without any human needing to spot the bug by eye at all. The postmortem's main action item wasn't "review more carefully." It was "this class of bug needs to be caught by a machine, because we've now seen three humans fail to catch it by eye in a row."

That doesn't mean review never catches bugs. It does, regularly. But the bugs it catches well are usually the ones a test wouldn't easily catch either: a misunderstanding of a requirement, an approach that technically works but creates a maintenance trap, a missing consideration the author didn't know to test for in the first place. Those are real and valuable catches. They're just a different category from "does this function have an off-by-one error," which a test should be catching automatically, every time, without depending on a human's attention span that afternoon.

## Review is for shared understanding, not gatekeeping

The actual value of review is that a second person now understands this part of the codebase. That matters for on-call coverage, for catching design decisions that don't fit the bigger picture, and for spreading knowledge so the system doesn't depend on one person's memory. Judged by that goal, a review that asks good questions and approves is often more valuable than one that nitpicks variable names.

This reframing changes what a "good reviewer" looks like in practice. Under the gatekeeping model, a thorough reviewer is one who finds the most things wrong with a PR. Under the shared-understanding model, a thorough reviewer is one who, by the end of the review, could explain this change to someone else, on-call, at 2am, without the original author present. Those produce visibly different comment styles. A gatekeeping reviewer leaves comments like "use a `Map` here instead of an object." A shared-understanding reviewer leaves comments like "what happens if this webhook arrives twice, are we relying on the caller to dedupe, or do we need to handle that here?" The second comment is more valuable, takes the same amount of time to write, and frequently uncovers something the first style of review never would, precisely because it's not looking for a textbook violation, it's checking whether the reviewer's mental model of the system now matches the code.

| Review style | Typical comment | What it optimizes for |
|---|---|---|
| Gatekeeping | "Use `const` instead of `let` here" | Catching the PR doing something "wrong" |
| Shared understanding | "What happens on a duplicate webhook?" | Reviewer genuinely understanding the change |
| Knowledge spreading | "Why this approach over the existing pattern in `OrderService`?" | Both people learning something |

I started explicitly asking reviewers, especially newer engineers who were nervous about reviewing senior engineers' code, to optimize for the middle and bottom rows rather than the top one. It lowered the intimidation factor noticeably. Asking "why this approach" doesn't require you to already know a better approach exists, it just requires genuine curiosity, which is a much lower bar than "I must find something objectively wrong here to justify this review," and it tends to produce more useful conversations besides.

## Fast feedback matters more than thorough feedback

A review that comes back in twenty minutes with two solid comments beats a review that comes back two days later with fifteen comments, every time. Slow review cycles are one of the biggest hidden costs in a team's velocity, and they compound. A PR sitting open for days means context the author had is gone by the time they have to address comments.

```
Fast, light review                Slow, heavy review

open PR ──┐                       open PR ──┐
          │ 20 min                          │
          ▼                                 │  2 days
2 comments, both useful                     │  (context fades)
          │ 10 min                          ▼
          ▼                       15 comments, mixed value
merged                                       │ author re-reads
                                             │ own diff to
                                             │ remember why
                                             ▼
                                   address, re-request, wait again
```

The compounding cost is the part that's easy to underestimate from a single PR's perspective but adds up fast across a team. If the average PR sits open for two days instead of two hours, and an engineer has three or four PRs moving through review at any given time, that's not just slower merges, it's the engineer holding three or four sets of half-finished context in their head simultaneously, switching between them, none of them getting closed out cleanly. I've found that teams underestimate this cost specifically because it shows up as generalized fatigue and scattered focus rather than as a clean metric anyone tracks, unlike "PR open time," which is trivial to measure and rarely looked at.

The fix that worked best on the teams I've been part of wasn't a tooling change, it was a social norm: review requests get acknowledged (not necessarily completed, just acknowledged) within an hour during working hours, and a full review happens same-day unless it's a genuinely large PR, which circles back to the earlier point about PR size being a discipline worth maintaining for its own sake.

## Disagreements need a tiebreaker, not a stalemate

When author and reviewer genuinely disagree on approach and both have reasonable points, the PR shouldn't sit blocked indefinitely. I push teams toward a simple rule: if it's not a correctness issue, the author gets to make the call and move on, with the option to revisit later if it turns out to matter. Review is there to catch problems, not to enforce a single person's taste.

The hardest part of applying this rule is the honest classification step, deciding whether a given disagreement is actually about correctness or about taste, because almost every taste disagreement gets argued in correctness-flavored language. "This will be hard to maintain" sounds like a correctness claim but is frequently a taste claim dressed up, especially when the reviewer can't point to a specific future scenario where the maintenance difficulty would actually bite. I started asking reviewers, when a disagreement stalled, to state the concrete failure mode they were worried about. "I'm worried this breaks if X happens" is a correctness conversation worth having to resolution. "I'd have organized this differently" is a taste conversation that the tiebreaker rule should resolve quickly, in the author's favor, so the PR can move.

This doesn't mean reviewer pushback is unwelcome or that authors should get defensive about taste comments. It means the team has a pre-agreed way to avoid a PR rotting in limbo for a week over something that, six months from now, neither person will remember disagreeing about.

## What changed when we shifted the framing

Going back to the team I mentioned at the start, the concrete changes after we explicitly reframed review's purpose were: average PR open time dropped because reviewers stopped feeling obligated to find a minimum number of issues to justify their time spent; comment quality shifted from style nitpicks toward genuine questions about edge cases and intent; and, less measurable but very noticeable, people stopped bracing before opening their review notifications. None of that came from a new tool or a stricter checklist. It came from everyone agreeing, out loud, on what the activity was actually trying to accomplish.

Review done well is one of the highest-leverage habits an engineering team has. Review done as a bug hunt mostly just produces friction and false confidence.
