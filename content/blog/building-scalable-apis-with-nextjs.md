---
title: "Building Scalable APIs with Next.js"
date: "2024-01-15"
excerpt: "How I structure API routes and server actions in Next.js projects so they stay maintainable as the codebase grows."
tags: ["Next.js", "API", "Backend"]
status: "published"
---

When I started building APIs with Next.js, I treated every route handler like a one-off script. That worked fine for a weekend project, but it fell apart the moment a real product needed authentication, validation, and shared business logic across a dozen endpoints. I learned this the hard way on a fintech-adjacent project in Tokyo where the API surface grew from four routes to almost sixty in about five months, and the codebase started fighting back every time we touched it.

The symptoms were obvious in hindsight. Two endpoints that should have shared a permission check had drifted apart because someone copy-pasted the logic instead of extracting it. A `PATCH` handler silently accepted a field that the `POST` handler rejected, because the validation lived inline in each file instead of in one place. None of these were exotic bugs. They were the predictable result of letting `route.ts` files become the place where business logic lived.

## Separate the transport layer from the logic

The biggest improvement came from refusing to let `route.ts` files know anything about HTTP beyond parsing the request and shaping the response. Each handler now does three things: parse the request, call a plain TypeScript function that lives outside the `app` directory, and format the response. The actual logic — fetching data, validating input, talking to the database — lives in a `lib/services` folder that has zero knowledge of Next.js, `NextRequest`, or `NextResponse`.

```ts
// app/api/invoices/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createInvoice } from '@/lib/services/invoices'
import { createInvoiceSchema } from '@/lib/schemas/invoices'

export async function POST(req: NextRequest) {
  const body = createInvoiceSchema.parse(await req.json())
  const invoice = await createInvoice(body)
  return NextResponse.json(invoice, { status: 201 })
}
```

```ts
// lib/services/invoices.ts
import { db } from '@/lib/db'
import type { CreateInvoiceInput } from '@/lib/schemas/invoices'

export async function createInvoice(input: CreateInvoiceInput) {
  const customer = await db.customer.findUniqueOrThrow({
    where: { id: input.customerId },
  })
  return db.invoice.create({
    data: { ...input, currency: customer.defaultCurrency },
  })
}
```

This single decision made testing trivial. I can unit test `createInvoice()` without spinning up a server, mocking `NextRequest`, or dealing with any of the framework's runtime quirks. If I ever need to expose the same logic through a CLI, a queue worker, or a scheduled job, it's already decoupled and ready to be called from anywhere.

The request flow ends up looking like this:

```
 client
   |
   v
+-----------------+
|  route.ts        |  parse + format only
+-----------------+
   |
   v
+-----------------+
|  lib/services     |  business logic
+-----------------+
   |
   v
+-----------------+
|  db / external    |
+-----------------+
```

Nothing in the bottom two boxes imports anything from `next/server`. That constraint, enforced mostly by discipline and occasionally by an ESLint rule banning Next.js imports outside the `app` directory, is what keeps the architecture honest over time.

## Validate at the boundary, trust everywhere else

I use `zod` schemas right where requests enter the system. Once a payload passes validation, every function downstream treats it as trusted, fully-typed data. No defensive `if (!user)` checks scattered through five layers of the call stack, just one gate at the door.

```ts
import { z } from 'zod'

export const createInvoiceSchema = z.object({
  customerId: z.string().uuid(),
  amount: z.number().positive(),
  dueDate: z.coerce.date(),
  lineItems: z.array(
    z.object({
      description: z.string().min(1),
      quantity: z.number().int().positive(),
      unitPrice: z.number().nonnegative(),
    })
  ).min(1),
})

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>
```

The schema becomes the single source of truth for both runtime validation and the TypeScript type, which means the type and the validation can never silently drift apart the way they do when you hand-write an interface next to a separate validation function.

This pattern also pays off when an endpoint's input shape needs to change. Adding an optional `notes` field is a one-line schema change, and every service function that consumes `CreateInvoiceInput` picks up the new shape automatically, with the compiler flagging any place that needs to handle it.

## Cache aggressively, invalidate precisely

Next.js's built-in caching is powerful but easy to misuse. My rule of thumb: tag every fetch with a specific cache tag tied to the resource, and only call `revalidateTag` for that exact resource when it mutates. Broad `revalidatePath` calls on parent routes tend to cause unnecessary rebuilds and confusing staleness bugs that are miserable to debug three weeks later when nobody remembers which route triggered which invalidation.

```ts
export async function getInvoice(id: string) {
  return fetch(`${API_BASE}/invoices/${id}`, {
    next: { tags: [`invoice:${id}`] },
  }).then((res) => res.json())
}

export async function markInvoicePaid(id: string) {
  await db.invoice.update({ where: { id }, data: { status: 'paid' } })
  revalidateTag(`invoice:${id}`)
}
```

I keep a short table of the caching strategies I've actually used in production, because "it depends" stops being useful advice the third time someone asks which one to reach for:

| Strategy | Good for | Risk if misused |
|---|---|---|
| `revalidateTag` per resource | Frequently updated single records (invoices, user profiles) | Forgetting to tag a fetch means stale data forever |
| `revalidatePath` on a route | Static marketing pages, rarely-changing listings | Rebuilds way more than needed, slow deploys |
| Time-based `revalidate` | Third-party data you don't control (exchange rates, public APIs) | Stale window equals your `revalidate` interval, choose carefully |
| No caching (`cache: 'no-store'`) | Anything involving money, auth, or per-request personalization | None, but you lose all the performance benefit |

That last row matters more than it looks. Early on, a teammate cached an account balance endpoint with a five-minute revalidation window because "it's basically the same flow as the invoice list." It wasn't. A customer support ticket about a balance that didn't reflect a payment made four minutes earlier taught us to treat money-adjacent endpoints as a different category entirely, not a variation on the same caching theme.

## Authentication as a layer, not a sprinkle

Every route used to start with a copy-pasted block checking a session cookie, decoding a JWT, and throwing a 401 if something was off. When the auth logic changed, which it did more often than I'd like to admit, I had to hunt down every route that had that block and update it consistently. Inevitably, one or two got missed.

The fix was moving authentication into middleware and into a small set of composable helpers that route handlers call explicitly:

```ts
// lib/auth/require-user.ts
export async function requireUser(req: NextRequest) {
  const session = await getSession(req)
  if (!session?.user) {
    throw new ApiError(401, 'Unauthorized')
  }
  return session.user
}
```

```ts
export async function POST(req: NextRequest) {
  const user = await requireUser(req)
  const body = createInvoiceSchema.parse(await req.json())
  const invoice = await createInvoice(user, body)
  return NextResponse.json(invoice, { status: 201 })
}
```

A thin error-handling wrapper around each route catches `ApiError` instances and converts them into the right status code and JSON shape, so individual handlers never write a `try/catch` for the common cases. The handler reads almost like pseudocode: require a user, validate the body, call the service, return the result. Everything else is plumbing that lives one layer down.

## Rate limiting and idempotency, learned the expensive way

The first production incident I caused with a Next.js API wasn't a bug in the logic at all. A client app retried a `POST /api/invoices` call on a flaky mobile network in a Tokyo subway tunnel, and because the request had no idempotency key, we created the same invoice three times. Nothing in the validation layer caught it because each request was, individually, perfectly valid.

The fix was an idempotency key pattern borrowed from payment APIs: the client generates a UUID per logical operation, sends it in a header, and the server stores a short-lived record mapping that key to the result of the first successful request.

```ts
export async function POST(req: NextRequest) {
  const idempotencyKey = req.headers.get('Idempotency-Key')
  if (idempotencyKey) {
    const existing = await getIdempotentResult(idempotencyKey)
    if (existing) return NextResponse.json(existing, { status: 201 })
  }
  const user = await requireUser(req)
  const body = createInvoiceSchema.parse(await req.json())
  const invoice = await createInvoice(user, body)
  if (idempotencyKey) await storeIdempotentResult(idempotencyKey, invoice)
  return NextResponse.json(invoice, { status: 201 })
}
```

It's a small addition, maybe twenty lines including the storage helper, but it closed a category of bug that no amount of careful business logic would have caught, because the bug wasn't in the logic. It was in the assumption that a request only happens once.

## What scaling actually looked like in practice

By the time the API surface reached sixty-some routes, the file structure looked roughly like this:

```
app/api/
  invoices/route.ts
  invoices/[id]/route.ts
  customers/route.ts
lib/
  services/
    invoices.ts
    customers.ts
  schemas/
    invoices.ts
    customers.ts
  auth/
    require-user.ts
  errors/
    api-error.ts
```

The `app/api` folder stayed thin no matter how many routes we added, because route files are mechanically simple: parse, call, format. The complexity moved into `lib`, where it belongs, organized by domain rather than by HTTP verb. New engineers joining the team, including a junior developer I mentored who had never touched Next.js before, could read a route file and understand exactly what it did in under a minute, then go find the real logic in a predictable place.

None of this is exotic. It's mostly about resisting the urge to let framework conventions dictate architecture. The framework should be a thin adapter at the edge of the system, not the place where your business rules live, and every time I've violated that rule, the codebase has made me pay for it within a few months.
