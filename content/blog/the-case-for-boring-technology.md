---
title: "The Case for Boring Technology"
date: "2024-10-12"
excerpt: "Why I default to the well-worn tool over the exciting new framework, and the one exception that's actually worth the risk."
tags: ["Engineering", "Architecture", "Opinion"]
status: "published"
---

Every few months a new framework promises to make everything faster, simpler, or more elegant. Most of the time, I let other people find out the hard way whether that's true. This isn't because I dislike new technology, it's because I've watched the gap between a framework's launch blog post and its actual operational reality play out enough times to be skeptical by default.

## Boring technology has already paid its dues

A database, language, or framework that's been in production for a decade has already hit the weird edge cases — the obscure concurrency bug, the migration path nobody documented, the failure mode that only shows up at scale. That knowledge is baked into its documentation, its Stack Overflow answers, and the experience of every engineer who's used it before you. New tools haven't paid that tax yet, and you end up paying it yourself, in production, usually at the worst time.

I think of it as a kind of debt that gets paid down collectively, by everyone who used the tool before you, every time someone files an issue, writes a blog post about a gotcha, or answers a question on a forum. Postgres has been in production since 1996. Whatever weird thing you're about to do with it, someone has almost certainly done something adjacent already, and there's a decent chance they wrote down what went wrong. A framework that shipped its 1.0 release six months ago hasn't accumulated that. You're not just adopting the tool, you're volunteering to be part of its early debugging history.

```
Maturity vs. unknowns, roughly:

new framework   [risk: ##########          ] mostly unknown
2 years old      [risk: ######              ] some known issues
5 years old      [risk: ###                 ] most footguns documented
10+ years old    [risk: #                   ] edge cases are well-mapped
```

## The real cost of "exciting" isn't the learning curve

People worry about the time it takes to learn a new tool, but that's rarely the actual cost. The real cost is the operational burden six months later — the on-call engineer who's never seen this framework before, debugging a 2am incident with thin documentation and no Stack Overflow answer for their specific error. Boring technology means anyone on the team, including future hires, can reason about a failure without starting from zero.

I worked on a mobile project where the team adopted a brand-new state management library because it promised less boilerplate than Redux. It delivered on that promise during development. The cost showed up later, when a production crash only happened under a specific combination of background app refresh and a particular navigation sequence, and the library's GitHub issues had exactly one related report, unresolved, from a different person, six months earlier, with no maintainer response. We ended up reading the library's source code directly to understand its internals, something we never would have needed to do with a library that had ten years of community-generated explanation already sitting on the internet.

| Factor | Boring, established tool | New, exciting tool |
|---|---|---|
| Time to first prototype | Slower, more setup ceremony | Often faster, less boilerplate |
| Debugging an obscure bug | Stack Overflow likely has it | You might be the first to hit it |
| Hiring / onboarding | Most candidates already know it | Team has to train from scratch |
| Long-term maintenance | Predictable, well-documented | Depends entirely on a small maintainer team |
| Risk if the project goes unmaintained | Low, large ecosystem persists | High, could be abandoned within years |

That last row matters more than people give it credit for. A boring tool's ecosystem doesn't depend on one maintainer's continued enthusiasm. An exciting new tool frequently does, and "exciting" libraries go quiet far more often than people expect when they first adopt them.

## Where I'll actually take the risk

I'm not against new technology — I'm against adopting it without a specific reason. The exception is when a new tool removes an entire category of bugs my current stack can't avoid, not just a marginal improvement in developer experience.

Type-safe schema validation across a network boundary is the clearest example from my own work. Before adopting it, a meaningful share of production bugs on a Next.js API I maintained traced back to the same root cause: the frontend and backend disagreed about the shape of a payload, usually because one side changed and the other didn't get updated in lockstep. That's not a hypothetical risk, it's a recurring, measurable category of incident.

```typescript
// Before: shape of the payload is just a comment and a hope
function createOrder(payload: any) {
  // expects { items: Item[], userId: string }
  return db.orders.create(payload);
}

// After: shared schema, validated at the boundary,
// and the type is enforced on both client and server
const OrderSchema = z.object({
  items: z.array(ItemSchema),
  userId: z.string().uuid(),
});

function createOrder(payload: unknown) {
  const parsed = OrderSchema.parse(payload);
  return db.orders.create(parsed);
}
```

Adopting schema validation early was worth the risk because it eliminated a whole class of runtime errors I was tired of debugging, not because it was new or had a compelling landing page. The bar I hold new technology to is exactly that specific: does it remove a category of failure I can point to concrete past incidents for, not "does it feel nicer to write."

## A useful question

Before adopting anything unproven, I ask: "if this breaks in production at 3am, what does debugging it actually look like?" If the honest answer is "I have no idea, there's no community to ask," that's not necessarily a dealbreaker, but it should be a deliberate, acknowledged trade-off, not something I back into by accident because the framework had a good landing page and a charismatic conference talk.

I ask a second, related question that's saved me more than once: "if the maintainer disappeared tomorrow, what would we do?" For an established tool like Postgres or React, the honest answer is "basically nothing changes, the ecosystem is bigger than any one person." For a one-year-old library with a single maintainer and a Discord server, the honest answer is much less comfortable, and that discomfort is information, not just anxiety.

## Boring is a strategy, not a lack of ambition

The label "boring" makes this sound like a lack of curiosity or ambition, and I think that's a mischaracterization worth pushing back on. Choosing boring technology for the parts of a system that need to be reliable frees up the actual ambition for where it belongs: the genuinely hard, specific problem your product exists to solve, not the database you happen to be running it on.

The engineers I respect most aren't the ones chasing every new framework. They're the ones who can tell you, with precision, exactly which parts of their stack are boring on purpose and which parts they're deliberately taking a calculated risk on, and why. That distinction, knowing the difference between a default and a deliberate exception, is most of what good engineering judgment actually looks like in practice.
