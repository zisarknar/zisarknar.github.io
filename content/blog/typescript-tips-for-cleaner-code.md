---
title: "TypeScript Tips for Cleaner Code"
date: "2024-04-05"
excerpt: "A handful of TypeScript patterns I reach for constantly — discriminated unions, branded types, and saying no to 'any'."
tags: ["TypeScript", "Best Practices"]
status: "published"
---

TypeScript's type system is powerful enough to replace a surprising amount of runtime validation and defensive code, if you actually use it instead of treating it as JavaScript with extra syntax. I've watched plenty of teams adopt TypeScript, get a green checkmark from the compiler, and still ship the exact same category of bugs they shipped in plain JavaScript, because the types they wrote described what the data looked like in the happy path and nothing about the paths that actually break in production.

The difference between "TypeScript as a linter" and "TypeScript as a design tool" comes down to a handful of patterns that, once they click, change how you model problems before you've written a single line of implementation.

## Discriminated unions instead of optional fields

A request object with five optional fields that "depend on the type" is a bug waiting to happen. I've seen this shape more times than I'd like:

```ts
interface RequestState {
  status: string
  data?: User[]
  error?: string
  loading?: boolean
}
```

Nothing stops you from constructing `{ status: 'loading', data: [...], error: 'oops' }`, a state that means nothing and that the rest of your code now has to defend against everywhere it's consumed. Modeling state as a discriminated union makes invalid states unrepresentable:

```ts
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
```

The compiler stops you from accessing `data` when `status` is `'loading'`, instead of a null check you'll forget six months from now when you're tired and just want the feature to ship. The narrowing happens automatically too:

```ts
function render(state: RequestState<User[]>) {
  switch (state.status) {
    case 'idle':
      return null
    case 'loading':
      return <Spinner />
    case 'success':
      return <UserList users={state.data} /> // data is known here
    case 'error':
      return <ErrorBanner message={state.error} /> // error is known here
  }
}
```

I reach for this constantly now, not just for async state but for any value that has a meaningfully different shape depending on a tag field: payment methods, form field types, API response variants. Anywhere I used to write five optional fields, I now ask whether the data is actually one of a fixed set of distinct shapes, and almost always it is.

## Branded types for values that look the same but aren't

A `UserId` and an `OrderId` are both strings at runtime, but they're not interchangeable, and a plain `string` type won't stop you from passing one where the other belongs. I had exactly this bug ship to production once: a refund function that took an `orderId: string` got called with a `userId` by mistake during a refactor, and because both were just strings, nothing caught it until a customer got refunded for the wrong amount.

A few lines of branding turn that category of bug into a compile-time error instead of a 2am production incident:

```ts
type Brand<T, B> = T & { readonly __brand: B }

type UserId = Brand<string, 'UserId'>
type OrderId = Brand<string, 'OrderId'>

function asUserId(id: string): UserId {
  return id as UserId
}

function asOrderId(id: string): OrderId {
  return id as OrderId
}

function refundOrder(orderId: OrderId) {
  // ...
}

const userId = asUserId('u_123')
refundOrder(userId) // compile error: UserId is not assignable to OrderId
```

The cast at the boundary (`asUserId`, `asOrderId`) is the one place you have to trust the value is correctly tagged, usually right where it comes out of a database row or a validated request body. Everywhere downstream, the type system enforces the distinction for free. I now brand any identifier that has a "sibling" type it could be confused with: currency amounts in different currencies, IDs across different entities, timestamps in different timezones represented as numbers.

| Pattern | Problem it solves | Cost |
|---|---|---|
| Discriminated unions | Invalid combinations of fields being representable | A bit more upfront modeling |
| Branded types | Structurally identical values being interchangeable | A thin casting layer at boundaries |
| `unknown` over `any` | Untyped data silently flowing through typed code | Forces explicit narrowing |
| Strict function signatures | Contract drift between caller and callee | Slightly more typing at definition sites |

## `any` is a deferred decision, not a solution

Every `any` is a promise to come back later and fix it properly, and that promise is rarely kept. I've grepped old codebases for `any` and found instances from years earlier with a `// TODO: type this properly` comment still attached, written by someone who has since left the company.

I treat `unknown` as the honest version of "I don't know this type yet." It forces a narrowing check before the value can be used, which is exactly the friction you want when dealing with untyped data at a boundary: API responses, JSON parsing, third-party libraries without good type definitions.

```ts
async function fetchUser(id: string): Promise<unknown> {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
}

const raw = await fetchUser('123')

// This won't compile, and that's the point:
// console.log(raw.name)

const user = userSchema.parse(raw) // zod narrows unknown -> User
console.log(user.name) // fine, fully typed
```

The friction is the feature. `any` removes that friction entirely, which feels productive in the moment and turns into a debugging session later when the API silently starts returning a slightly different shape and nothing in the type system noticed.

## Let inference do the work, don't fight it

Over-annotating every variable adds noise without adding safety:

```ts
// Noisy, and the annotations add nothing the compiler didn't already know
const name: string = user.name
const total: number = items.reduce((sum: number, item: Item) => sum + item.price, 0)
```

```ts
// Same safety, less noise
const name = user.name
const total = items.reduce((sum, item) => sum + item.price, 0)
```

I annotate function signatures, parameters and return types, carefully, since those are contracts other code depends on and the place where ambiguity actually costs something. I let TypeScript infer the rest. The type system works best when it has room to do its job instead of being told the answer twice.

```
 Annotate here:                Let inference handle this:

 function total(             |  const result = total(items)
   items: Item[]              |  const doubled = result * 2
 ): number {                  |  items.map(i => i.price)
   ...                        |
 }                             |
```

## Exhaustiveness checks save you from the "forgot to update the switch" bug

One small pattern that's saved me repeatedly: when handling a discriminated union in a `switch`, add a default case that asserts the value is `never`. The moment someone adds a new variant to the union, type checking fails everywhere that union was handled incompletely, instead of silently falling through at runtime.

```ts
function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`)
}

function describe(state: RequestState<User[]>): string {
  switch (state.status) {
    case 'idle':
      return 'Not started'
    case 'loading':
      return 'Loading...'
    case 'success':
      return `Loaded ${state.data.length} users`
    case 'error':
      return `Failed: ${state.error}`
    default:
      return assertNever(state)
  }
}
```

Add a fifth variant to `RequestState` and forget to update `describe`, and the compiler will tell you immediately, at the `assertNever` call, rather than letting that case fall through to a default and surface as a confusing UI bug three sprints later.

## Where I draw the line

None of this means chasing type purity for its own sake. I've seen codebases where someone spent two days building an elaborate generic type to validate string templates at compile time for a feature that touched two files and never changed again. The return on that investment was close to zero. The patterns above earn their complexity because they prevent real, recurring bugs: invalid states, mixed-up IDs, untyped data sneaking past a boundary, incomplete handling of a union. If a piece of type machinery doesn't map to one of those categories of actual bug, it's probably cleverness for its own sake, and I'd rather ship the simpler version.

None of these are clever tricks. They're just consequences of taking the type system seriously instead of treating it as a linter with extra steps, and the payoff compounds the longer a codebase lives and the more people touch it after you.
