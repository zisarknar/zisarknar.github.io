---
title: "React Server Components, Explained"
date: "2024-05-18"
excerpt: "Cutting through the confusion around Server Components — what actually changes, and what mental model finally made it click for me."
tags: ["React", "Next.js", "Frontend"]
---

I resisted React Server Components for longer than I should have, mostly because every explanation I read started with implementation details instead of the actual problem they solve.

## The problem, stated plainly

Client-side React ships your component code to the browser so it can run there. That's useful when a component needs interactivity, but most components in a typical app don't — they just render data. Shipping the code for those anyway means bigger bundles, more JavaScript to parse, and a render that depends on the client finishing a fetch before showing anything useful.

Server Components let a component run only on the server, render to a serializable format, and send the result down — no component code shipped to the browser at all for that piece of the tree.

## The mental model that finally clicked

Stop thinking of "server" and "client" as a technical detail and start thinking of them as two different environments with different capabilities. Server Components can talk directly to a database or filesystem, but can't use `useState` or respond to clicks — there's no browser there to manage state in. Client Components can't directly query a database, but they can hold interactive state. The `'use client'` directive isn't turning a feature on, it's drawing a boundary between environments.

## Where it actually helps

Data-heavy pages with little interactivity are the clearest win — a blog list, a product catalog, a dashboard's static summary cards. I let Server Components do the data fetching and pass it down as plain serializable props, and only mark the genuinely interactive leaves — a button, a form, a toggle — as Client Components.

## Where I still reach for Client Components

Anything involving browser APIs, animation libraries, or local state that doesn't need to survive a page reload. There's no prize for making everything a Server Component; the goal is shipping less JavaScript where it doesn't earn its cost, not eliminating the client entirely.
