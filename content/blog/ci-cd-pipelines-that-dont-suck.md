---
title: "CI/CD Pipelines That Don't Suck"
date: "2024-07-30"
excerpt: "Why most CI pipelines are slower and flakier than they need to be, and the handful of changes that fixed it every time."
tags: ["DevOps", "CI/CD", "Engineering"]
status: "published"
---

I've inherited more broken CI pipelines than I've built from scratch, and the failure pattern is almost always the same: nobody treats the pipeline itself as a piece of software that needs maintenance.

## Cache dependencies like you mean it

The single biggest speedup in almost every pipeline I've touched is fixing dependency caching that was technically "set up" but silently missing the cache every run because of a cache key that included a timestamp, a wrong path, or an OS-specific hash mismatch. Verify the cache hit rate, don't just assume the YAML you copied from a blog post is doing what it says.

## Flaky tests are a process failure, not bad luck

A test that fails 2% of the time and gets re-run until it passes isn't "flaky," it's broken, and re-running it trains your team to ignore CI failures in general. I quarantine flaky tests into a separate non-blocking suite immediately, file an issue, and fix or delete them within a sprint. The alternative — letting them linger — quietly destroys trust in the entire pipeline, and once people stop trusting CI red, they stop trusting CI green too.

## Parallelize by splitting work, not by adding workers blindly

Throwing more parallel jobs at a slow suite without splitting tests intelligently just means more workers sitting idle waiting for the one slow shard to finish. I split test suites by historical run time, not by file count, so each shard finishes at roughly the same moment.

## Deploy should be the boring part

If deploying is the part of the pipeline everyone's afraid of, that's a sign the pipeline is undertested, not that deploys are inherently risky. I aim for deploys that are routine enough to run on a Friday afternoon without anyone flinching — which mostly comes down to good rollback automation and feature flags decoupling deploy from release.

A pipeline people trust gets used correctly. A pipeline people route around with manual workarounds isn't doing its job, no matter how sophisticated it looks on paper.
