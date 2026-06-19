---
title: "React Server Components, Explained"
date: "2024-05-18"
excerpt: "Cutting through the confusion around Server Components — what actually changes, and what mental model finally made it click for me."
tags: ["React", "Next.js", "Frontend"]
status: "published"
---

I resisted React Server Components for longer than I should have, mostly because every explanation I read started with implementation details, the RSC payload format, the streaming protocol, the bundler magic, instead of the actual problem they solve. Implementation details are interesting once you already believe something is worth understanding. They're a terrible way to convince someone it's worth their time in the first place.

## The problem, stated plainly

Client-side React ships your component code to the browser so it can run there. That's useful when a component needs interactivity, but most components in a typical app don't, they just render data. A blog post page, a product detail card, a settings page's read-only summary section: none of that needs to run in the browser at all. It needs to produce HTML once, using data the server already has easy access to, and hand that HTML to the user.

Shipping the component code for those pieces anyway means bigger JavaScript bundles, more parsing and execution time on a user's device, and a render that depends on the client finishing a fetch (often a fetch that has to wait for the JavaScript to even download first) before showing anything useful. I worked on a dashboard a few years ago where the initial bundle was over 800KB before a single useful pixel appeared, because half of that bundle was components that never did anything interactive. They just sat there rendering numbers that came from an API call.

Server Components let a component run only on the server, render to a serializable format, and send the result down. No component code ships to the browser at all for that piece of the tree. The user's device never has to download, parse, or execute the code for a component that was never going to respond to a click in the first place.

## The mental model that finally clicked

Stop thinking of "server" and "client" as a technical detail about where code happens to execute, and start thinking of them as two different environments with fundamentally different capabilities. That reframing is what made everything else fall into place for me.

Server Components can talk directly to a database, the filesystem, or an internal service with credentials that should never reach a browser. They cannot use `useState`, `useEffect`, or respond to a click, because there's no browser there to manage state or dispatch events. Client Components can't directly query a database (there's no database connection available in a browser tab, and there shouldn't be), but they can hold interactive state, animate, and respond to user input. The `'use client'` directive isn't turning a feature on. It's drawing a boundary between environments, declaring "everything below this line, in this part of the tree, needs a browser to function."

```
 Server environment                  Client environment
 -------------------                  -------------------
 - direct DB / fs access              - useState / useEffect
 - secrets, API keys                  - event handlers (onClick)
 - no useState, no events             - browser APIs (localStorage)
 - runs once, sends result down       - re-renders on user input

           |
           |  'use client' boundary
           v
   [ Server Component tree ]
           |
           +--> renders --> [ Client Component island ]
                                   |
                                   v
                          interactive in the browser
```

Once you see it that way, a lot of the confusing rules stop being arbitrary. Of course you can't use `useState` in a Server Component, there's no persistent browser session for that state to live in between server renders. Of course you can pass a database query result as a prop into a Client Component, the data already resolved on the server; what you can't pass is a function or a class instance that only makes sense in the server's environment, because that boundary is a serialization boundary, not just a stylistic one.

## Where it actually helps

Data-heavy pages with little interactivity are the clearest win: a blog list, a product catalog, a dashboard's static summary cards. I let Server Components do the data fetching and pass it down as plain serializable props, and only mark the genuinely interactive leaves, a button, a form, a toggle, as Client Components.

```tsx
// app/products/page.tsx — Server Component, no 'use client'
import { db } from '@/lib/db'
import { AddToCartButton } from './AddToCartButton'

export default async function ProductsPage() {
  const products = await db.product.findMany()
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <h2>{p.name}</h2>
          <p>{p.description}</p>
          <AddToCartButton productId={p.id} />
        </li>
      ))}
    </ul>
  )
}
```

```tsx
// app/products/AddToCartButton.tsx — Client Component, the only interactive bit
'use client'
import { useState } from 'react'

export function AddToCartButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false)
  return (
    <button onClick={() => setAdded(true)}>
      {added ? 'Added' : 'Add to cart'}
    </button>
  )
}
```

The page component itself never ships to the browser. Its database query, its mapping logic, its rendering of names and descriptions, all of that happens once on the server and arrives as HTML plus a tiny serialized reference telling React where the interactive island goes. Only `AddToCartButton`'s code, a few hundred bytes, ships as JavaScript.

When I rebuilt that 800KB dashboard with this split, the comparison was stark enough that I kept the numbers around as a reference for future projects:

| Metric | Before (all client) | After (Server Components) |
|---|---|---|
| Initial JS bundle | ~810KB | ~140KB |
| Time to first contentful paint | ~2.4s | ~0.6s |
| Components shipped as client JS | ~45 | ~6 |
| Data fetching location | Client, after mount | Server, before render |

The interactive pieces (a filter dropdown, a sort toggle, the add-to-cart button) stayed exactly as responsive as before, because those specific six components were still full Client Components with all their usual capabilities. Nothing about the user-facing interactivity got worse. What disappeared was the JavaScript cost of the other thirty-nine components that were never doing anything except rendering text.

## Where I still reach for Client Components

Anything involving browser APIs, animation libraries, or local state that doesn't need to survive a page reload. Anything that needs `localStorage`, `IntersectionObserver`, a WebSocket connection, or a third-party library that assumes a `window` object exists. A drag-and-drop kanban board, a live-updating chat panel, a form with real-time validation as you type, these all live firmly in Client Component territory and gain nothing from being forced server-side.

There's no prize for making everything a Server Component. The goal is shipping less JavaScript where it doesn't earn its cost, not eliminating the client entirely. I've seen teams treat "fewer Client Components" as a scoreboard to optimize, which leads to contorted code where a genuinely interactive feature gets awkwardly split across a server/client boundary for no benefit except a vanity metric. The actual question for any given component is simple: does a person need to interact with this in a way that requires a browser to manage state or respond to events? If yes, it's a Client Component, and that's a complete, satisfying answer, not a compromise.

## A mistake I made early on

The first time I used Server Components in a real project, I tried to fetch data inside a Client Component and pass the fetch function itself down from a Server Component parent, thinking I was being clever about code reuse. It didn't work, and the error message wasn't immediately illuminating. Functions, class instances, and anything else that isn't plain serializable data can't cross the server-to-client boundary as props, because the "boundary" is actually a serialization step: the server's output gets turned into a format that can travel over the network and get reconstructed in the browser, and a function has no meaningful representation in that format.

The fix was straightforward once I understood the actual constraint: call the data-fetching function on the server, pass the resolved data down as a plain object, and let the Client Component receive data instead of a way to get data. That's a small mental adjustment, but it's the kind of adjustment that only makes sense once you've internalized the environment-boundary model rather than treating Server Components as "the same React, but with a magic performance switch."

Once that model is solid, Server Components stop feeling like a new framework to learn and start feeling like an answer to a question that was always there, even before they existed: why was a static, read-only piece of UI ever shipping the same amount of JavaScript as the most interactive part of the page?
