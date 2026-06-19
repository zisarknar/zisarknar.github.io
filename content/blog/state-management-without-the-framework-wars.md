---
title: "State Management Without the Framework Wars"
date: "2024-12-18"
excerpt: "Redux, Zustand, Context, signals — the tool matters far less than knowing which category of state you're actually dealing with."
tags: ["React", "Frontend", "Architecture"]
status: "published"
---

Every few months a new state management library claims to have solved state management. Most of the actual problem was never about the library, it was about not categorizing what kind of state you're holding in the first place. I spent a chunk of a project migrating an app from Redux to Zustand expecting it to fix our bug count, and the bug count didn't move, because the bugs were never about Redux. They were about treating four genuinely different kinds of state as if they were one kind of state, all funneled through the same global store because that's where the library put things.

This became obvious to me only after the migration was done and the same class of bug showed up again in the new codebase, just with different syntax. A list of orders fetched from the API would show stale data after a mutation. The fix in both Redux and Zustand versions was the same shape of hack: a manual `refetch()` call sprinkled wherever someone remembered to add it. The library wasn't the problem. The mental model was.

## The four categories, named properly

The framing that actually fixed things for me, on both web and the React Native apps I maintain, was splitting state into four categories before deciding where any of it lives:

```
 ┌─────────────────────────────────────────┐
 │              Server state                │
 │   (fetched data, owned by the backend)    │
 └─────────────────────────────────────────┘
 ┌─────────────────────────────────────────┐
 │                URL state                  │
 │  (filters, pagination, selected tab)      │
 └─────────────────────────────────────────┘
 ┌─────────────────────────────────────────┐
 │            Local component state          │
 │   (a toggle, a form draft, scroll pos)    │
 └─────────────────────────────────────────┘
 ┌─────────────────────────────────────────┐
 │               Global state                │
 │   (auth user, theme, feature flags)       │
 └─────────────────────────────────────────┘
```

Each box has a natural home. The mistake almost every team makes, mine included, is collapsing all four into the same global store because that's the tool everyone already knows how to use, and then writing a pile of glue code to make that store behave like the other three categories it was never designed to be.

## Server state is not client state

The biggest unlock for me was realizing that data fetched from an API isn't really "application state" in the traditional sense, it's a cache of something that lives elsewhere and can go stale. Treating it like client state (manually dispatching actions to update it, manually tracking loading flags) leads to enormous amounts of boilerplate for a problem that's actually about caching, deduplication, and invalidation. Tools built specifically for that job handle it in a fraction of the code.

Here's roughly what the Redux-era version of fetching a list of orders looked like, simplified:

```ts
// actions
const fetchOrders = () => async (dispatch) => {
  dispatch({ type: "ORDERS_LOADING" });
  try {
    const res = await api.get("/orders");
    dispatch({ type: "ORDERS_SUCCESS", payload: res.data });
  } catch (e) {
    dispatch({ type: "ORDERS_ERROR", error: e });
  }
};

// reducer
function ordersReducer(state = initial, action) {
  switch (action.type) {
    case "ORDERS_LOADING": return { ...state, loading: true };
    case "ORDERS_SUCCESS": return { ...state, loading: false, data: action.payload };
    case "ORDERS_ERROR": return { ...state, loading: false, error: action.error };
    default: return state;
  }
}
```

And then, separately, a manual `dispatch(fetchOrders())` call after every mutation that might have changed the list, scattered across however many places in the app could plausibly create or update an order. Miss one of those call sites and you get a stale list, which was the recurring bug class that started this whole rethink.

The replacement, using a query library that treats server data as a cache:

```ts
function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => api.get("/orders").then(r => r.data),
  });
}

function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (order) => api.post("/orders", order),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });
}
```

The invalidation is declared once, next to the mutation that causes it, instead of remembered at every call site that might trigger it. Loading and error states come from the hook itself instead of being manually tracked in a reducer. The bug class where a list goes stale because someone forgot a manual refetch mostly disappears, not because the library is smarter, but because the responsibility moved to a place where it's structurally harder to forget.

| Concern | Manual store (Redux-style) | Query cache library |
|---|---|---|
| Loading/error flags | Hand-written per resource | Built in |
| Invalidation after mutation | Manual dispatch, easy to miss | Declared once near the mutation |
| Deduplicating concurrent fetches | Manual, often skipped | Built in |
| Background refetch on refocus | Custom code | Built in, configurable |
| Boilerplate per resource | High | Low |

This isn't an argument against Redux as a library. Redux is a perfectly good tool for actual client state. It's an argument against using any general-purpose store, Redux, Zustand, Context, whatever, as the home for data that fundamentally belongs to a cache-invalidation problem rather than a state-transition problem.

## URL state belongs in the URL

Filters, pagination, selected tabs: if a user would reasonably expect the back button or a shared link to restore this state, it doesn't belong in a client store at all. It belongs in the URL's query parameters. This single rule eliminates a whole category of "why didn't this persist on refresh" bugs.

I ran into this directly on a dashboard feature where filters (date range, status, assigned engineer) lived in a Zustand store. It worked fine until a teammate tried to share a filtered view with someone over Slack by copying the URL, and the link opened to the unfiltered default view, because none of that state was ever in the URL to begin with. The fix wasn't a bigger state management library. It was moving those specific values out of the store entirely:

```
Before: state lives in a store, invisible to the URL

  /dashboard
  (filters held in memory, lost on refresh,
   not shareable, not bookmarkable)

After: state lives in the URL itself

  /dashboard?status=open&assignee=42&from=2024-11-01
  (refresh-safe, shareable, bookmarkable,
   back button works as expected)
```

The mobile equivalent of this, for the React Native apps I work on, is deep links and navigation state rather than query parameters, but the principle transfers directly: if a push notification should be able to land a user on a specific filtered screen, that screen's configuration needs to be expressible as a route, not buried in an in-memory store that a cold app launch wipes out.

## Local component state is underused, not overused

There's a tendency to lift state up "just in case" a sibling component might need it someday. Most of the time, that day never comes, and you've paid the cost of indirection for nothing. I default to `useState` colocated with the component that actually needs it, and only lift state when a second component genuinely needs to read or write the same value.

The cost of premature lifting isn't abstract. Every level you lift state up adds a layer of props or context that has to be threaded through components that don't care about the value at all, just pass it along. I inherited a form component once where a single "is this field focused" boolean had been lifted four levels up into a page-level reducer, apparently because someone imagined a future feature needing to know focus state from outside the form. That feature never got built. What did get built was a form that re-rendered the entire page on every keystroke, because the focus state lived high enough in the tree to trigger a wide re-render on every change. Moving it back down to a local `useState` inside the input component fixed a real, measurable input-lag bug that had been blamed on "React being slow" for months.

## Global state is for things that are actually global

Authenticated user info, theme, feature flags: state that's genuinely needed across unrelated parts of the tree. Everything else creeping into global state is usually a sign that component boundaries are drawn in the wrong place, not a sign that you need a more powerful state library.

A useful test I apply before putting anything into a global store: name three unrelated parts of the app that would need to read this value, right now, not hypothetically. Auth user passes this test instantly, the header, the settings page, and every API call's auth header all need it. A specific order-detail page's "is the edit modal open" boolean fails this test completely, nothing outside that one page cares, and it should live exactly where it's used.

## Picking a tool once the categories are sorted

Once state is sorted into these categories, the actual library choice becomes a much smaller decision, mostly about team familiarity and bundle size rather than capability, because each category has a fairly narrow, well-understood set of tools that fit it well:

| State category | Typical good fit | What to avoid |
|---|---|---|
| Server state | A query/cache library (React Query, SWR, RTK Query) | Manual reducers tracking loading/error by hand |
| URL state | Router-driven query params / search params hooks | A client store mirroring what the URL already holds |
| Local component state | `useState` / `useReducer`, colocated | Lifting to global "just in case" |
| Global state | Zustand, Context, Redux, or signals, team's choice | Putting server or URL state inside it too |

Notice that the last row genuinely doesn't matter much. Zustand, Redux, plain Context with `useReducer`, or a signals-based library all do an adequate job of holding a small amount of genuinely global state. The arguments people have about which of these is "best" are almost always happening one layer above the actual problem, because the pain they're trying to solve was caused by stuffing the wrong three categories of state into whichever one of these tools they picked first.

Pick whichever library fits your team's taste. The actual leverage comes from sorting state into the right category before you decide where it lives.
