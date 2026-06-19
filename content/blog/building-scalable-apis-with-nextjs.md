---
title: "Building Scalable APIs with Next.js"
date: "2024-01-15"
excerpt: "How I structure API routes and server actions in Next.js projects so they stay maintainable as the codebase grows."
tags: ["Next.js", "API", "Backend"]
status: "published"
---

When I started building APIs with Next.js, I treated every route handler like a one-off script. That worked fine for a weekend project, but it fell apart the moment a real product needed authentication, validation, and shared business logic across a dozen endpoints.

## Separate the transport layer from the logic

The biggest improvement came from refusing to let `route.ts` files know anything about HTTP. Each handler now does three things: parse the request, call a plain TypeScript function that lives outside the `app` directory, and format the response. The actual logic — fetching data, validating input, talking to the database — lives in a `lib/services` folder that has zero knowledge of Next.js.

This single decision made testing trivial. I can unit test `createInvoice()` without spinning up a server, and if I ever need to expose the same logic through a CLI or a queue worker, it's already decoupled.

## Validate at the boundary, trust everywhere else

I use `zod` schemas right where requests enter the system. Once a payload passes validation, every function downstream treats it as trusted data. No defensive `if (!user)` checks scattered through five layers of the call stack — just one gate at the door.

## Cache aggressively, invalidate precisely

Next.js's built-in caching is powerful but easy to misuse. My rule of thumb: tag every fetch with a specific cache tag tied to the resource, and only call `revalidateTag` for that exact resource when it mutates. Broad `revalidatePath` calls on parent routes tend to cause unnecessary rebuilds and confusing staleness bugs.

None of this is exotic. It's mostly about resisting the urge to let framework conventions dictate architecture. The framework should be a thin adapter, not the place where your business rules live.
