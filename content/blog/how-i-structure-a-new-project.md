---
title: "How I Structure a New Project in the First Week"
date: "2025-02-14"
excerpt: "The handful of decisions worth getting right before writing the first feature — folder structure, environments, and CI — and the ones not worth agonizing over yet."
tags: ["Engineering", "Project Setup", "Best Practices"]
status: "published"
---

The first week of a new project shapes the next two years more than any individual decision after it. Most of that leverage comes from a small number of boring choices made early, not from picking the trendiest stack.

## Environments before features

Local, staging, and production environments — with config separated from code via environment variables — need to exist before the first real feature lands, not retrofitted after. Retrofitting environment separation onto a codebase that's been hardcoding values for months is a miserable, error-prone process I've done more than once and don't want to do again.

## CI from commit one

A pipeline that runs lint, type checks, and tests on every PR costs almost nothing to set up in week one and saves enormous pain later, because it establishes a baseline of "broken code doesn't get merged" before bad habits have a chance to form. Adding CI to a project six months in means retroactively fixing a backlog of violations nobody noticed because nothing was checking.

## Folder structure: optimize for deletion, not elegance

I organize by feature/domain rather than by technical layer (no top-level `controllers`, `models`, `views` split) because it means a feature can be deleted — fully, cleanly — by deleting one folder. Six months in, "can we rip this out safely" is a question you'll ask far more often than "is this technically the purest architecture."

## What I deliberately don't decide in week one

Exact database indexing strategy, caching layers, micro-optimization of bundle size — none of that. Those decisions are reversible later and premature now, before real usage patterns exist to inform them. Spending week-one energy on problems you don't have yet is energy not spent on the environment and CI setup that actually compounds.

Week one isn't about building fast. It's about making the next fifty weeks of building fast actually possible.
