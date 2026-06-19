---
title: "Git Workflows for Small Teams"
date: "2024-11-08"
excerpt: "Trunk-based development, short-lived branches, and the small set of git habits that keep a small team moving fast without stepping on each other."
tags: ["Git", "Engineering", "Workflow"]
status: "published"
---

Most git workflow debates online are scaled for teams of fifty engineers across multiple time zones. For a team of three to eight people, almost all of that ceremony is overhead with no payoff.

## Short-lived branches beat long-lived ones, always

The longer a branch lives, the more it diverges from `main`, and the more painful the eventual merge becomes. I push the team toward branches that live hours or a couple of days, not weeks. If a feature is too big to land in that window, it's a sign to split it into smaller, independently mergeable pieces behind a feature flag — not a sign to let the branch grow.

## Rebase locally, merge commit on the way in

Rebasing your own branch onto `main` before opening a PR keeps history readable and makes the diff reviewers see actually reflect the current codebase. Once it's reviewed, I prefer a single merge commit into `main` rather than squash-everything-always — it preserves enough granularity to bisect later without polluting history with every "fix typo" commit along the way.

## Small PRs are a discipline, not a personality trait

Nobody enjoys reviewing a 1500-line PR, and reviewers who are tired skim instead of reading. I treat PR size as a metric worth watching — if a change is sprawling, it usually means it's doing two unrelated things that should have been two PRs.

## Protect `main`, but don't bureaucratize it

Branch protection rules (required review, required CI pass) prevent the worst failure mode — broken code on `main` — without requiring a heavyweight process. For a small team, one required reviewer and a green CI check is usually enough. Anything more elaborate tends to slow down a small team more than it protects them.

The best git workflow is the one your team barely has to think about because it matches how the team actually works, not the one that looks impressive in a wiki page nobody rereads.
