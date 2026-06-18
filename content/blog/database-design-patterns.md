---
title: "Database Design Patterns I Actually Use"
date: "2024-06-22"
excerpt: "Forget the textbook normal forms for a second — here are the database decisions that actually mattered in production systems I've built."
tags: ["Database", "Backend", "System Design"]
---

Most database advice online is either academic normalization theory or a hot take about how a particular ORM ruined someone's week. Here's what's actually mattered in systems I've shipped.

## Soft deletes, but with an expiration plan

`deleted_at` columns are everywhere for good reason — accidental deletes are common, and audit trails matter. What's missing from most implementations is a plan for what happens to soft-deleted rows after six months. Without one, every query needs a `WHERE deleted_at IS NULL` forever, indexes grow with rows nobody will ever read again, and "soft delete" quietly becomes "never delete." I now pair soft deletes with a scheduled job that hard-deletes anything past a retention window, after the data's been archived elsewhere if needed.

## Denormalize for the read pattern you actually have

Textbook normalization optimizes for write integrity, which matters, but production systems are usually read-heavy. If a dashboard query joins five tables every single page load, that's a sign to denormalize a summary table that gets updated on write, not a sign to add another index and hope. Measure the actual read pattern before deciding.

## Migrations are a deployment artifact, not a side project

Every migration should be written assuming it runs against a production table with real traffic, not an empty dev database. That means: no long-locking `ALTER TABLE` on a hot table without a backward-compatible multi-step plan, no migration that assumes it runs before the new code deploys (it might run after, depending on your pipeline), and every migration should be reversible or explicitly documented as not being so.

## Indexes are a promise you have to keep

An index speeds up reads and slows down writes — that trade-off doesn't go away because you stopped thinking about it. I periodically audit indexes against actual query patterns (most databases will tell you which indexes are never used) and remove the ones nobody queries against. An unused index is pure write-side cost with no benefit.

None of this is glamorous. Database design rewards being boring and consistent far more than it rewards cleverness.
