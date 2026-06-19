---
title: "Git Workflows for Small Teams"
date: "2024-11-08"
excerpt: "Trunk-based development, short-lived branches, and the small set of git habits that keep a small team moving fast without stepping on each other."
tags: ["Git", "Engineering", "Workflow"]
status: "published"
---

Most git workflow debates online are scaled for teams of fifty engineers across multiple time zones. For a team of three to eight people, almost all of that ceremony is overhead with no payoff. I learned this the slow way, by importing a process designed for a much bigger org into a four-person team at a previous job in Tokyo, and watching everyone quietly route around it within a month.

The team had inherited a workflow from a much larger sister team: release branches, a develop branch, feature branches that forked off develop, a freeze period before each release, and a changelog bot that nobody read. It was a reasonable system for forty engineers shipping on a train schedule. For us, it meant every small feature took two merges to reach production and every hotfix needed to be cherry-picked into three branches. We eventually stripped almost all of it out, and the team got faster, not slower.

## The shape of the problem

Before getting into specific habits, it's worth naming what actually goes wrong in small-team git workflows. It's rarely "we don't have enough process." It's almost always one of three things: branches live too long and diverge, PRs are too large to review properly, or the rules around `main` are either too loose (broken code ships) or too rigid (a one-reviewer team requires two approvals and a change-management ticket).

```
Branch age vs. merge pain (informal, but consistent across teams)

merge
pain  |                                   ____
      |                              ____/
      |                         ____/
      |                    ____/
      |               ____/
      |          ____/
      |_____ ____/
      |__________________________________________
        1d    3d    1wk   2wk   1mo         age
```

The curve isn't linear. A branch that's a day old almost never conflicts with anything. A branch that's three weeks old has usually drifted so far from `main` that the merge itself becomes a mini-project, often requiring you to re-review code that was already reviewed once, because the rebase changed enough context that the original review doesn't mean much anymore.

## Short-lived branches beat long-lived ones, always

The longer a branch lives, the more it diverges from `main`, and the more painful the eventual merge becomes. I push the team toward branches that live hours or a couple of days, not weeks. If a feature is too big to land in that window, it's a sign to split it into smaller, independently mergeable pieces behind a feature flag, not a sign to let the branch grow.

This sounds obvious written down, but it goes against a very natural instinct, which is to want a feature to be "done" before anyone else sees it. The instinct is wrong for small teams specifically. With three to eight people, everyone already knows roughly what everyone else is working on. There's no large blast radius to hide from. The cost of a half-finished feature being visible in `main` (behind a flag, unreachable by real users) is close to zero. The cost of three days of someone else's branch silently rotting because nobody merged it yet is real: it's now diverged from two other people's work, and untangling that costs real hours.

A concrete example: we had a mobile app feature, a redesign of the onboarding flow, that took about two weeks of actual work. Done as one branch, it would have been an 1800-line PR with cross-cutting changes to the navigation stack, three new screens, and updated analytics calls. Instead, we landed it as nine PRs over the two weeks, each behind a flag: navigation scaffolding first, then each screen as a no-op shell, then real content per screen, then the analytics wiring, then the flag flip. Every PR was reviewable in fifteen minutes. Nothing sat unmerged for more than a day.

## Rebase locally, merge commit on the way in

Rebasing your own branch onto `main` before opening a PR keeps history readable and makes the diff reviewers see actually reflect the current codebase. Once it's reviewed, I prefer a single merge commit into `main` rather than squash-everything-always. It preserves enough granularity to bisect later without polluting history with every "fix typo" commit along the way.

The squash-everything camp has a real point: a clean one-commit-per-PR history is easier to read in `git log`. But it throws away information. If a PR includes a refactor commit and a behavior-change commit, squashing collapses them into one commit that mixes "moved code" with "changed code," which makes `git bisect` and `git blame` both noticeably less useful six months later when you're trying to find when a subtle bug was introduced. A merge commit keeps the PR's internal commits intact while still giving you a single point in `main`'s history (the merge commit itself) to reference in changelogs or revert as a unit if needed.

```
git log --graph (merge commit strategy)

*   a1c92f Merge PR #214: onboarding nav scaffolding
|\
| * 7e0291 wire up flag check
| * 44b810 add NavStack screen shell
| * 9f0a3c rebase onto main
|/
*   d2f117 Merge PR #213: fix flaky upload retry
```

The rule I give new hires is simple: rebase often while you work, so your branch never drifts far from `main` and conflicts stay tiny; don't rewrite history once a PR is open and someone has started reviewing it, because force-pushing over a reviewer's in-progress comments is its own special kind of bad morning for them.

## Small PRs are a discipline, not a personality trait

Nobody enjoys reviewing a 1500-line PR, and reviewers who are tired skim instead of reading. I treat PR size as a metric worth watching. If a change is sprawling, it usually means it's doing two unrelated things that should have been two PRs.

There's a pattern I see constantly: an engineer sets out to fix one bug, notices an unrelated bit of dead code nearby, cleans it up "while they're in there," renames a variable for clarity, and updates a dependency that was flagged as outdated. Four good intentions, one PR, and now the reviewer has to mentally context-switch between a bug fix, a refactor, a rename, and a dependency bump, none of which share a review lens. Split into four PRs, each one takes two minutes to review and approve. Combined, the PR sits open for a day because nobody has a clean fifteen-minute block to review all four threads at once.

| PR size (lines changed) | Typical review behavior | Defects found per review |
|---|---|---|
| Under 100 | Read line by line | Highest catch rate |
| 100–400 | Read carefully, skim tests | Moderate |
| 400–1000 | Skim diff, trust description | Low |
| 1000+ | Approve based on description alone | Near zero |

That table is informal, drawn from watching review patterns rather than a formal study, but it tracks with research on code review that's been published elsewhere, and it matches what every engineer who's been tired on a Friday afternoon already knows intuitively: attention degrades with diff size, and it degrades faster than people think.

## Protect `main`, but don't bureaucratize it

Branch protection rules (required review, required CI pass) prevent the worst failure mode, broken code on `main`, without requiring a heavyweight process. For a small team, one required reviewer and a green CI check is usually enough. Anything more elaborate tends to slow down a small team more than it protects them.

I've seen teams add a second required reviewer "for safety" and then watch PRs sit for two days because the second reviewer is in a different time zone and only has a thirty-minute overlap window with the author each day. For a small team, that's not safety, it's a self-inflicted bottleneck. The actual safety nets that matter more than a second human are: CI that runs the real test suite (not just lint), a staging environment that mirrors production closely enough to catch integration issues, and a fast, well-practiced rollback path. None of those require a second approval to exist.

What I do require, even on a tiny team, is that the CI check is non-negotiable. "It's just a docs change, skip CI" is exactly the kind of exception that, six months later, someone uses to justify skipping CI on a change that wasn't actually just a docs change. Consistency here matters more than speed in the rare case where the exception would have been fine.

## Handling the inevitable hotfix

Every workflow discussion eventually runs into "but what about production incidents." For a small team, I keep this deliberately boring: a hotfix branch off the current `main` (or the deployed tag, if `main` has drifted ahead of production), the smallest possible diff, the same review and CI bar as anything else, just faster because everyone drops what they're doing to look at it immediately. No separate hotfix process, no special branch naming convention beyond `hotfix/`, no exception to the merge strategy. The thing that actually makes incidents go faster isn't a different git process, it's everyone agreeing in advance that when one happens, review turnaround drops from "whenever I get to it" to "right now."

## What this looks like in practice

Put together, the loop for a small team ends up looking like this for almost every change, big or small:

```
 main ──●───────●───────●───────●───── (always deployable)
         \     / \     / \     /
          branch    branch    branch
        (hours-     (hours-   (hours-
         2 days)      2 days)   2 days)
```

Open a branch, keep it small enough to live a day or two, rebase onto `main` as you go, open a PR, get one fast review, merge with a merge commit, delete the branch. Repeat. There's no ceremony beyond that for a team this size, and adding ceremony back in doesn't make the team safer, it just makes the loop slower without buying anything the loop didn't already provide.

The best git workflow is the one your team barely has to think about because it matches how the team actually works, not the one that looks impressive in a wiki page nobody rereads.
