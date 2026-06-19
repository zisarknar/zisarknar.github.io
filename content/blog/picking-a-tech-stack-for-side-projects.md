---
title: "Picking a Tech Stack for Side Projects"
date: "2025-03-21"
excerpt: "The opposite advice from what I'd give for production work at a company — and why side projects should optimize for a completely different goal."
tags: ["Side Projects", "Engineering", "Opinion"]
status: "published"
---

I tell people to default to boring, proven technology at work, and then I turn around and use the newest, least battle-tested tools I can find for my own side projects. That's not hypocrisy — the two contexts are optimizing for different things entirely. At work, the cost of being wrong about a technology choice is measured in incident reports, on-call pages, and the time of everyone who has to maintain the consequences of a bad call for the next several years. At 11pm on a side project, the cost of being wrong is that I learned something didn't work the way the README promised, and I close the laptop and try again tomorrow.

Conflating these two contexts is, I think, the single biggest reason side projects either turn into joyless miniature versions of work, or work starts accumulating the kind of risk that should have stayed confined to side projects. Keeping them deliberately separate is the whole trick.

## Side projects optimize for learning, not reliability

A side project that never ships isn't a failure if it taught you something real about a new tool, a new pattern, or a new part of the stack you don't touch at work. The actual cost of an unreliable side project is close to zero — nobody's paged at 2am because your hobby app's experimental database had a weird edge case.

I think about this in terms of what each context is actually trying to maximize.

| Dimension | Production at work | Side project |
|---|---|---|
| Primary goal | Reliability, maintainability | Learning, momentum |
| Cost of being wrong | Incidents, on-call, lost trust | A wasted evening |
| Right default | Boring, proven tech | Newest thing that interests you |
| Audience | Paying users, your team | Yourself, maybe a few friends |
| Failure mode to avoid | Outages, data loss | Losing interest before shipping anything |
| Reversibility needed | High (migrations, rollbacks) | Low — throw it away if it's wrong |

Every row in that table points in opposite directions, which is exactly why the same engineer can hold two completely different sets of defaults without contradiction. The mistake isn't having different defaults. The mistake is applying the wrong column to the wrong context — bringing work-grade caution to a side project kills the only thing side projects are actually for, and bringing side-project experimentation into production work creates risk nobody signed up for.

I learned the production-side half of this the hard way early in my career, picking a trendy database for a real feature because I'd enjoyed using it on a weekend project. It worked fine until it didn't, at which point I was the only person on the team who understood its failure modes, and I was debugging an unfamiliar system under real pressure instead of in the relaxed, consequence-free way I'd used it the first time.

## Pick one new thing, not five

The mistake I made early on was using a side project as an excuse to try a new framework, a new database, a new deployment platform, and a new language all at once. When something breaks, you have no idea which of the five unfamiliar things caused it, and debugging becomes its own unplanned side project. I now limit myself to one genuinely new piece of technology per project and keep everything else in the stack something I already trust.

This sounds like a small constraint but it changes the entire shape of the debugging experience. If everything is new, an error message could be coming from a misunderstanding of the framework, a misconfiguration of the database, a deployment platform quirk, or a language feature you don't fully grasp yet, and you have no prior to narrow it down. If only one thing is new, an error is almost certainly about that one thing, because everything else is something you've already debugged a hundred times before and would recognize immediately if it were the actual culprit.

```
Five unknowns stacked:
  new framework + new db + new platform + new language + new auth
  -> error appears -> which of 5 things caused it? no idea
  -> debugging time grows combinatorially, not additively

One unknown, rest familiar:
  new framework + (db you know) + (platform you know) + (lang you know)
  -> error appears -> almost certainly the framework
  -> debugging time stays roughly linear
```

There's a version of this rule that's even more specific, which is to be honest about what "new" actually means. Trying a new ORM on top of a database engine you already know is one new thing. Trying a new ORM on top of a database engine you've also never used is two, even though it might feel like one project decision. I try to count honestly rather than generously when I'm scoping this, because the generous count is exactly the trap that got me into trouble the first time.

## Ship something small before the ambitious version

The side projects I actually finished were the ones I scoped down aggressively in the first week, then expanded once something real existed. The ones I abandoned were the ones where I tried to build the "real" version from day one and ran out of momentum before there was anything to show.

There's a specific failure pattern here that I've watched happen to myself and to almost every other engineer I know who has a graveyard of half-built side projects. You get excited about an idea, and the version of it in your head is the full version — every feature, every edge case handled gracefully, a polished UI, the works. You start building toward that version directly. Three weeks in, you've built maybe a third of it, none of it actually works end to end yet because you've been building breadth instead of depth, and the part of your brain that generates enthusiasm for new ideas has already moved on to the next idea, because there's nothing yet that feels like a real, working thing to be proud of.

The fix that's worked for me consistently is forcing the smallest possible version that does one real thing end to end, even if everything about it is ugly and incomplete, within the first weekend if at all possible.

```
Ambitious-first approach:
  Week 1: auth system    [60% built, nothing runnable yet]
  Week 2: data model     [40% built, still nothing runnable]
  Week 3: core feature    [stalls here, motivation gone]
  -> never finishes, no working demo ever existed

Small-first approach:
  Day 1-2: ugliest possible version of the core feature, hardcoded
           auth, no styling, but it actually runs end to end
  Week 1:  add real auth, because the core thing already works
  Week 2:  add the second feature, because momentum exists
  -> finishes, because there was always something to show
```

The psychological mechanism matters as much as the technical one. A working ugly thing generates motivation to keep going. A half-built ambitious thing generates dread every time you open the editor, because opening it means confronting how much is still missing rather than how much already works.

## Let yourself throw it away

A side project doesn't need migrations, doesn't need backward compatibility, and doesn't need to survive contact with real users at scale. The freedom to delete the whole thing and start over without consequence is exactly what makes a side project a good place to take risks you wouldn't take at work.

I keep a loose mental rule: if I'm hesitating to make a big structural change to a side project because of how much existing code it would invalidate, something has gone wrong, because that hesitation is a work-context instinct leaking into a context where it doesn't belong. At work, that hesitation is correct and healthy, because backward compatibility and migration cost are real constraints with real stakeholders. On a side project with zero users besides maybe me, that hesitation is just friction with no corresponding benefit.

The most useful side projects I've built, in terms of what they taught me, were ones I rewrote from scratch at least once partway through, because the first attempt taught me enough about the problem to see a much better second approach, and nothing was stopping me from taking it. That kind of total restart is basically unavailable in production work, and it's one of the more underrated reasons side projects are worth doing at all, separate from whatever the side project's stated goal is.

## A rough decision process

When I'm actually starting a new side project, the sequence looks roughly like this: pick the one new technology I'm trying to learn, deliberately choose familiar tools for everything else even if a newer option looks more appealing, scope the first version down until it feels almost embarrassingly small, and explicitly tell myself in advance that I'm allowed to throw the whole thing away if the first approach turns out wrong. That last part matters more than it sounds like it should — saying it out loud, even just to myself, removes a surprising amount of the friction that would otherwise build up around "wasted" work that wasn't actually wasted at all, because the learning happened regardless of whether the code survived.

The right stack for a side project is whichever one makes you want to keep opening the editor. That's the entire metric that matters.
