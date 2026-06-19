---
title: "CI/CD Pipelines That Don't Suck"
date: "2024-07-30"
excerpt: "Why most CI pipelines are slower and flakier than they need to be, and the handful of changes that fixed it every time."
tags: ["DevOps", "CI/CD", "Engineering"]
status: "published"
---

I've inherited more broken CI pipelines than I've built from scratch, and the failure pattern is almost always the same: nobody treats the pipeline itself as a piece of software that needs maintenance. It gets written once, under deadline pressure, and then it just sits there accumulating workarounds until someone gets frustrated enough to actually look at the YAML.

## Cache dependencies like you mean it

The single biggest speedup in almost every pipeline I've touched is fixing dependency caching that was technically "set up" but silently missing the cache every run because of a cache key that included a timestamp, a wrong path, or an OS-specific hash mismatch. Verify the cache hit rate, don't just assume the YAML you copied from a blog post is doing what it says.

On a React Native project I worked on, the pipeline was caching `node_modules` with a key based on the commit SHA. Every single commit was a guaranteed cache miss, which means the cache was pure overhead: time spent uploading a cache that would never be downloaded again. Nobody had noticed because the pipeline "worked," it just took eleven minutes to install dependencies on every run, every time, for months.

```yaml
# Before: cache key changes every commit, so it never hits
- uses: actions/cache@v4
  with:
    path: node_modules
    key: node-modules-${{ github.sha }}

# After: cache key is based on the lockfile, so it's stable
# across commits that don't change dependencies
- uses: actions/cache@v4
  with:
    path: node_modules
    key: node-modules-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      node-modules-
```

That one-line change took install time from eleven minutes to about forty seconds on cache hits. The lesson wasn't really about caching syntax — it was that nobody had looked at the actual cache hit rate in the CI dashboard in over a year. Caching that isn't measured is decoration.

## Flaky tests are a process failure, not bad luck

A test that fails 2% of the time and gets re-run until it passes isn't "flaky," it's broken, and re-running it trains your team to ignore CI failures in general. I quarantine flaky tests into a separate non-blocking suite immediately, file an issue, and fix or delete them within a sprint. The alternative — letting them linger — quietly destroys trust in the entire pipeline, and once people stop trusting CI red, they stop trusting CI green too.

I've seen this play out concretely: a test suite with one timing-dependent test (it asserted on a `setTimeout` callback firing within 100ms, which is fine on a quiet CI runner and not fine on a loaded one) trained an entire team to click "re-run failed jobs" reflexively, without reading why it failed. Six months later, that same reflex meant a genuine regression got re-run three times and merged, because by then "just re-run it" had become muscle memory rather than a judgment call.

The fix is procedural, not technical:

1. Any test that fails without a code change tied to it gets moved to a `quarantine` job that runs but doesn't block merges.
2. An issue gets filed automatically (or at minimum, manually within the day) with the failure logs attached.
3. The quarantine job has its own dashboard, so quarantined tests don't just disappear into a backlog nobody revisits.
4. A test sitting in quarantine for more than two weeks gets deleted, not fixed "eventually." A test nobody has time to fix is a test that isn't telling you anything useful.

## Parallelize by splitting work, not by adding workers blindly

Throwing more parallel jobs at a slow suite without splitting tests intelligently just means more workers sitting idle waiting for the one slow shard to finish. I split test suites by historical run time, not by file count, so each shard finishes at roughly the same moment.

```
Splitting by file count (4 shards, uneven):

shard 1  [###########################] 9m  <- bottleneck
shard 2  [####]                        2m
shard 3  [#####]                       2.5m
shard 4  [###]                         1.5m
total wall time: 9 minutes

Splitting by historical run time (4 shards, balanced):

shard 1  [##############]              5m
shard 2  [###############]             5.2m
shard 3  [##############]              4.9m
shard 4  [###############]             5.1m
total wall time: 5.2 minutes
```

Most CI platforms (GitHub Actions, CircleCI, Buildkite) either support this natively or have a community plugin that reads timing data from the previous run and splits accordingly. The setup cost is an afternoon. The payoff compounds every single day the pipeline runs after that, and on a team committing dozens of times a day, that adds up to hours of engineer waiting-time saved per week.

## Deploy should be the boring part

If deploying is the part of the pipeline everyone's afraid of, that's a sign the pipeline is undertested, not that deploys are inherently risky. I aim for deploys that are routine enough to run on a Friday afternoon without anyone flinching — which mostly comes down to good rollback automation and feature flags decoupling deploy from release.

The distinction that took me a while to internalize: deploying code and releasing a feature don't have to be the same event. If a feature flag gates the risky part of a change, the deploy itself becomes a no-op from the user's perspective, and you can flip the flag on for 1% of traffic, watch the metrics, and roll forward or back without touching the deployment pipeline at all.

| Approach | Rollback speed | Blast radius if wrong | Operational cost |
|---|---|---|---|
| Deploy = release, no flags | Full re-deploy (minutes) | 100% of traffic immediately | Low setup, high risk |
| Deploy behind feature flag | Flag flip (seconds) | Configurable, e.g. 1% first | Some setup, much safer |
| Canary deploy + automated rollback | Automatic on metric breach | Limited to canary pool | Higher setup, lowest risk |

I don't think every team needs full canary infrastructure with automated rollback on metric breach — that's a real investment, and it's overkill for a small internal tool. But every team benefits from decoupling "the code is on the server" from "the feature is visible to users," because it turns deploy day from an event into a non-event.

## Treat the pipeline config like production code

The underlying theme across all of this: a CI/CD pipeline is software, and software that doesn't get reviewed, tested, or maintained rots. I've started asking the same questions of pipeline YAML that I'd ask of an application module — does this have an owner, is there a test for the thing it's supposed to catch, when was it last actually reviewed for whether it's still doing its job.

One habit that's paid off disproportionately: adding a lightweight pipeline-health check that runs weekly and reports cache hit rate, average build time, and flaky test count to a dashboard. It takes ten minutes to set up and turns "I think the pipeline got slower" from a vague feeling into a number someone can act on.

A pipeline people trust gets used correctly. A pipeline people route around with manual workarounds, local-only deploys, or a Slack message that says "just merge it, CI's been weird lately" isn't doing its job, no matter how sophisticated it looks on paper. The goal was never a pipeline that looks impressive in the YAML file — it's a pipeline that nobody has to think about, which is a much higher bar than it sounds.
