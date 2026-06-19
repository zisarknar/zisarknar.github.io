---
title: "Database Design Patterns I Actually Use"
date: "2024-06-22"
excerpt: "Forget the textbook normal forms for a second — here are the database decisions that actually mattered in production systems I've built."
tags: ["Database", "Backend", "System Design"]
status: "published"
---

Most database advice online is either academic normalization theory or a hot take about how a particular ORM ruined someone's week. Here's what's actually mattered in systems I've shipped, including a few mistakes I had to live with long enough to learn from them.

## Soft deletes, but with an expiration plan

`deleted_at` columns are everywhere for good reason — accidental deletes are common, and audit trails matter. What's missing from most implementations is a plan for what happens to soft-deleted rows after six months. Without one, every query needs a `WHERE deleted_at IS NULL` forever, indexes grow with rows nobody will ever read again, and "soft delete" quietly becomes "never delete."

I learned this the hard way on a mobile app backend where users could delete their own posts. We added `deleted_at` in week one, felt good about it, and moved on. A year later, the `posts` table had three times as many soft-deleted rows as live ones. Every feed query — the single most frequent read in the entire system — was filtering out two-thirds of the rows it scanned. The index was still technically being used, but the table itself had become mostly dead weight that the database had to wade through anyway.

The fix wasn't clever. I paired soft deletes with a scheduled job that hard-deletes anything past a retention window, after the data's been archived to cold storage if there's a compliance reason to keep it. Now the rule on every new table is: if you add `deleted_at`, you write the cleanup job in the same pull request, not "later."

```sql
-- Runs nightly, archives then purges
INSERT INTO posts_archive
SELECT * FROM posts
WHERE deleted_at IS NOT NULL
  AND deleted_at < NOW() - INTERVAL '90 days';

DELETE FROM posts
WHERE deleted_at IS NOT NULL
  AND deleted_at < NOW() - INTERVAL '90 days';
```

## Denormalize for the read pattern you actually have

Textbook normalization optimizes for write integrity, which matters, but production systems are usually read-heavy. If a dashboard query joins five tables every single page load, that's a sign to denormalize a summary table that gets updated on write, not a sign to add another index and hope.

The clearest example from my own work was an order-history screen for an e-commerce admin panel. Every page load joined `orders`, `order_items`, `products`, `users`, and `shipments` to render a single summary row per order. It worked fine with a hundred orders in the seed data. At ten thousand orders with real traffic, the page took close to four seconds to render, and the database CPU graph looked like a saw blade every time someone refreshed the dashboard.

```
Read pattern before denormalization:

  Request → orders JOIN order_items JOIN products
                    JOIN users JOIN shipments
          → 5-table join, every page load
          → ~3.8s p50 latency

Read pattern after denormalization:

  Write path:  order event → update order_summary row
  Read path:   Request → SELECT * FROM order_summary
          → single table, indexed on order_id
          → ~40ms p50 latency
```

I added an `order_summary` table that gets written to whenever an order, item, or shipment changes, and the dashboard reads from that table alone. The write path got slightly more complex — there's now a function responsible for keeping `order_summary` in sync — but that complexity is centralized in one place, instead of being repeated across every screen that needs order data. Measure the actual read pattern before deciding which tables deserve this treatment; not every join is worth flattening, and denormalizing tables nobody queries heavily is just extra write cost for no benefit.

## Migrations are a deployment artifact, not a side project

Every migration should be written assuming it runs against a production table with real traffic, not an empty dev database. That means: no long-locking `ALTER TABLE` on a hot table without a backward-compatible multi-step plan, no migration that assumes it runs before the new code deploys (it might run after, depending on your pipeline), and every migration should be reversible or explicitly documented as not being so.

The pattern I use for anything resembling a column rename or type change is always the same three-step rollout:

| Step | What happens | Why it's safe |
|---|---|---|
| 1. Add | New column added, nullable, no default backfill yet | Old code ignores it, new code can start writing to it |
| 2. Backfill | Background job copies old column into new column in batches | Doesn't lock the table, runs at low-traffic hours |
| 3. Cut over | New code reads from new column, old column dropped later | Old column removal is a separate, low-risk migration |

Collapsing these three steps into one migration is exactly how you end up locking a table for twenty seconds during business hours and taking down checkout. I've done it once, early in my career, and never again. The extra discipline of writing three small migrations instead of one big one feels slow in the moment and saves you from being the reason the incident channel lights up.

## Indexes are a promise you have to keep

An index speeds up reads and slows down writes — that trade-off doesn't go away because you stopped thinking about it. Every index you add is something the database has to update on every single insert, update, and delete to that table, forever, whether or not anyone ever queries against it again.

I periodically audit indexes against actual query patterns. Postgres, for instance, tracks index usage in `pg_stat_user_indexes`, and it's a five-minute query that tells an honest story:

```sql
SELECT
  relname AS table_name,
  indexrelname AS index_name,
  idx_scan AS times_used
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY relname;
```

On one project this turned up four indexes that had never been used once since the last database restart, two of which had been added "just in case" during a sprint where nobody had time to check whether they were actually needed. Removing them didn't make anything faster in a way users would notice, but it did make every write a little cheaper, and it removed clutter that made the schema harder to reason about. An unused index is pure write-side cost with no benefit — it's the database equivalent of dead code that nobody has the confidence to delete.

## Foreign keys are documentation that enforces itself

A pattern I came to later than I should have: treating foreign key constraints as a form of documentation rather than just a performance or integrity feature. When I look at an unfamiliar schema, the foreign keys tell me the actual shape of the data relationships faster than any wiki page, because they can't drift out of date the way prose documentation does. A `comments.post_id REFERENCES posts(id) ON DELETE CASCADE` line tells you exactly what happens when a post is deleted, with no ambiguity and no need to go ask the person who wrote it eighteen months ago and has since left the team.

I've worked on systems where foreign keys were deliberately left out for "flexibility," and what that flexibility actually bought was a steady trickle of orphaned rows: comments pointing at posts that no longer existed, order items referencing products that had been deleted without anyone checking for dependents first. The database was being asked to trust application code to maintain integrity that the database itself could have enforced for free.

## None of this is glamorous

Database design rewards being boring and consistent far more than it rewards cleverness. The systems I've seen fail in production weren't undone by a missing exotic feature — they were undone by a soft delete with no expiration, a migration that assumed a quiet production database, or an index nobody remembered the reason for. The unglamorous habit of asking "what happens to this in a year, under real traffic, when nobody on the team remembers why it was built this way" has saved me more incidents than any single clever optimization ever has.
