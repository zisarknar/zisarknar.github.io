---
title: "TypeScript Tips for Cleaner Code"
date: "2024-04-05"
excerpt: "A handful of TypeScript patterns I reach for constantly — discriminated unions, branded types, and saying no to 'any'."
tags: ["TypeScript", "Best Practices"]
---

TypeScript's type system is powerful enough to replace a surprising amount of runtime validation and defensive code, if you actually use it instead of treating it as JavaScript with extra syntax.

## Discriminated unions instead of optional fields

A request object with five optional fields that "depend on the type" is a bug waiting to happen. Modeling state as a discriminated union — `{ status: 'loading' } | { status: 'success', data: T } | { status: 'error', error: string }` — makes invalid states unrepresentable. The compiler stops you from accessing `data` when `status` is `'loading'`, instead of a null check you'll forget six months from now.

## Branded types for values that look the same but aren't

A `UserId` and an `OrderId` are both strings, but they're not interchangeable. A few lines of branding —

```ts
type UserId = string & { readonly __brand: 'UserId' }
```

— turns a category of bugs (passing the wrong ID into the wrong function) into a compile-time error instead of a 2am production incident.

## `any` is a deferred decision, not a solution

Every `any` is a promise to come back later and fix it properly, and that promise is rarely kept. I treat `unknown` as the honest version of "I don't know this type yet" — it forces a narrowing check before the value can be used, which is exactly the friction you want when dealing with untyped data at a boundary (API responses, JSON parsing, third-party libraries).

## Let inference do the work, don't fight it

Over-annotating every variable adds noise without adding safety. I annotate function signatures (parameters and return types) carefully, since those are contracts other code depends on, and let TypeScript infer the rest. The type system works best when it has room to do its job.

None of these are clever tricks — they're just consequences of taking the type system seriously instead of treating it as a linter with extra steps.
