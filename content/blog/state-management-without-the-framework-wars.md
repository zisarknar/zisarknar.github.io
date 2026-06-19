---
title: "State Management Without the Framework Wars"
date: "2024-12-18"
excerpt: "Redux, Zustand, Context, signals — the tool matters far less than knowing which category of state you're actually dealing with."
tags: ["React", "Frontend", "Architecture"]
status: "published"
---

Every few months a new state management library claims to have solved state management. Most of the actual problem was never about the library — it was about not categorizing what kind of state you're holding in the first place.

## Server state is not client state

The biggest unlock for me was realizing that data fetched from an API isn't really "application state" in the traditional sense — it's a cache of something that lives elsewhere and can go stale. Treating it like client state (manually dispatching actions to update it, manually tracking loading flags) leads to enormous amounts of boilerplate for a problem that's actually about caching, deduplication, and invalidation. Tools built specifically for that job handle it in a fraction of the code.

## URL state belongs in the URL

Filters, pagination, selected tabs — if a user would reasonably expect the back button or a shared link to restore this state, it doesn't belong in a client store at all. It belongs in the URL's query parameters. This single rule eliminates a whole category of "why didn't this persist on refresh" bugs.

## Local component state is underused, not overused

There's a tendency to lift state up "just in case" a sibling component might need it someday. Most of the time, that day never comes, and you've paid the cost of indirection for nothing. I default to `useState` colocated with the component that actually needs it, and only lift state when a second component genuinely needs to read or write the same value.

## Global state is for things that are actually global

Authenticated user info, theme, feature flags — state that's genuinely needed across unrelated parts of the tree. Everything else creeping into global state is usually a sign that component boundaries are drawn in the wrong place, not a sign that you need a more powerful state library.

Pick whichever library fits your team's taste. The actual leverage comes from sorting state into the right category before you decide where it lives.
