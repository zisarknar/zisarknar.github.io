---
title: "How I Structure a New Project in the First Week"
date: "2025-02-14"
excerpt: "The handful of decisions worth getting right before writing the first feature — folder structure, environments, and CI — and the ones not worth agonizing over yet."
tags: ["Engineering", "Project Setup", "Best Practices"]
status: "published"
---

The first week of a new project shapes the next two years more than any individual decision after it. Most of that leverage comes from a small number of boring choices made early, not from picking the trendiest stack. I learned this the slow way, by inheriting a handful of projects in their second or third year and watching the team spend entire sprints undoing decisions — or non-decisions — from week one.

There's a pattern to what actually compounds and what doesn't. Environment separation, CI, and folder structure compound, because every feature added afterward either benefits from them or has to work around their absence. Database indexing strategy, caching layers, and bundle size optimization don't compound in the same way in week one, because you don't yet have the usage data to make those decisions well. Spending week-one energy on the second category at the expense of the first is the single most common mistake I see, including from myself, years ago.

## Environments before features

Local, staging, and production environments — with config separated from code via environment variables — need to exist before the first real feature lands, not retrofitted after. Retrofitting environment separation onto a codebase that's been hardcoding values for months is a miserable, error-prone process I've done more than once and don't want to do again.

What retrofitting actually looks like, concretely: a junior engineer hardcodes an API base URL because there's no environment config to put it in, then six other people copy that pattern because it's the only example in the codebase, then someone discovers the production database name is hardcoded in a script that ran fine until someone ran it against staging by mistake and it quietly inserted three thousand test rows into prod. Untangling that isn't a refactor, it's an archaeology project, and it always takes longer than just setting up `.env.local`, `.env.staging`, and `.env.production` from day one would have.

```
project/
  .env.local         <- gitignored, dev machine values
  .env.staging       <- staging secrets, injected by CI/CD, not committed
  .env.production    <- production secrets, injected by CI/CD, not committed
  .env.example       <- committed, documents every required key with no values
```

The `.env.example` file matters more than people give it credit for. It's the difference between a new hire spending five minutes setting up their environment and spending half a day guessing which of fifteen undocumented environment variables their local server needs to boot.

I also make sure config access goes through one validated module rather than scattered `process.env.X` calls, so a missing variable fails loudly at startup instead of producing `undefined` deep in some unrelated code path three weeks later.

```typescript
// config.ts — the only file allowed to read process.env directly
const required = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
};

export const config = {
  databaseUrl: required("DATABASE_URL"),
  apiBaseUrl: required("API_BASE_URL"),
  environment: required("NODE_ENV") as "development" | "staging" | "production",
};
```

That fails fast at boot, which is exactly where you want a misconfiguration to surface. Finding out at boot costs ten seconds. Finding out three weeks later, in production, costs an incident.

## CI from commit one

A pipeline that runs lint, type checks, and tests on every PR costs almost nothing to set up in week one and saves enormous pain later, because it establishes a baseline of "broken code doesn't get merged" before bad habits have a chance to form. Adding CI to a project six months in means retroactively fixing a backlog of violations nobody noticed because nothing was checking.

I've done both. Setting up CI in week one, on an empty-ish codebase, is a fifteen-minute task: a workflow file, three steps, done. Setting up CI on a six-month-old codebase means the first PR that adds the lint step fails with four hundred existing violations, and now you're negotiating with the team about whether to fix all four hundred before merging the CI config, or merge it with the rule disabled, which mostly defeats the purpose.

```yaml
# .github/workflows/ci.yml
name: CI
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
```

Nothing exotic. The value isn't in the sophistication of the pipeline, it's in the fact that it exists and runs on every single PR without exception, starting from the first one.

| Setup timing | Cost to add | What you inherit |
|---|---|---|
| Week one | ~15 minutes | A clean baseline, zero violations |
| Month three | A few hours | A handful of accumulated violations |
| Month six+ | Days, plus negotiation | A backlog nobody wants to own, often disabled rules |

The trend line only goes one direction. The earlier the floor goes in, the cheaper it is, and the cost doesn't grow linearly, it grows with however much code got written without a check in place.

## Folder structure: optimize for deletion, not elegance

I organize by feature/domain rather than by technical layer (no top-level `controllers`, `models`, `views` split) because it means a feature can be deleted — fully, cleanly — by deleting one folder. Six months in, "can we rip this out safely" is a question you'll ask far more often than "is this technically the purest architecture."

```
By layer (what I avoid):          By feature (what I use):
  controllers/                      features/
    user.ts                           billing/
    billing.ts                          controller.ts
    notifications.ts                    model.ts
  models/                               service.ts
    user.ts                             tests/
    billing.ts                        notifications/
    notifications.ts                    controller.ts
  views/                                model.ts
    user.tsx                            service.ts
    billing.tsx                         tests/
```

The layered structure looks tidy in a diagram, but in practice, deleting the billing feature from the left structure means hunting through three separate top-level folders, finding every file with "billing" somewhere in the name or imports, and hoping you didn't miss one that nothing references anymore but still silently runs in a cron job. Deleting the billing feature from the right structure means deleting `features/billing/` and watching the type checker tell you exactly what else referenced it, if anything still does.

This isn't just about deletion, either — it's about cognitive load while building. When a feature's controller, business logic, data access, and tests all live in one folder, a new engineer (or me, eight months later, having forgotten the details) can understand the entire feature by opening one directory, instead of mentally cross-referencing three parallel folder trees that all happen to use the word "billing" somewhere.

## What I deliberately don't decide in week one

Exact database indexing strategy, caching layers, micro-optimization of bundle size — none of that. Those decisions are reversible later and premature now, before real usage patterns exist to inform them. Spending week-one energy on problems you don't have yet is energy not spent on the environment and CI setup that actually compounds.

I've watched smart engineers lose entire days in week one debating whether to use Redis or an in-memory cache for a feature that doesn't have a single real user yet. The honest answer at that point is: you don't know, and you won't know until the access patterns exist to measure. Premature caching strategy isn't just wasted effort, it's actively risky, because caching introduces invalidation bugs, and an invalidation bug in a system with no real traffic yet is a bug you're paying the complexity cost for without yet getting any benefit from.

Database indexes are the same story with a twist: adding an index later, once you know the actual slow query, is a five-minute migration. Guessing wrong about indexes in week one means either no benefit (if you guessed the access pattern wrong) or active cost (every write now updates an index nobody queries against).

```
Week 1 priority queue:
  [#####################] environments + config validation
  [###################  ] CI (lint, typecheck, test) on every PR
  [#################    ] feature-based folder structure
  [##                    ] caching strategy
  [#                     ] index tuning
  [                      ] bundle size optimization
```

That last row isn't zero because it's unimportant forever. It's zero because in week one there's no bundle to measure yet, and optimizing a bundle that doesn't exist is optimizing in the dark.

## A real week one, roughly in order

In practice the sequence I follow looks like this: repo created, environment files and config validation module in place, CI workflow committed before the second PR, feature folder convention written down somewhere visible (even just a comment in the root `README`), then the actual first feature starts. The first feature is usually something deliberately small and low-stakes, chosen specifically to exercise the scaffolding rather than to ship something impressive. If the scaffolding has a problem, you want to find out from a small feature, not from the feature the whole launch depends on.

This sequencing matters because each of these decisions is much cheaper to make correctly before anything depends on it, and increasingly expensive the longer you wait. A new project has a brief window where the cost of doing things right is at its lowest it will ever be. Spend that window on the things that compound.

Week one isn't about building fast. It's about making the next fifty weeks of building fast actually possible.
