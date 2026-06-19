---
title: "Lessons from Mobile Development"
date: "2024-02-20"
excerpt: "What switching between web and mobile taught me about state management, offline support, and respecting the platform."
tags: ["Mobile", "React Native", "Engineering"]
status: "published"
---

Moving between web and mobile development forces you to question assumptions you didn't even know you had. On the web, a flaky network connection is an edge case you handle with a loading spinner and a retry button. On mobile, it's Tuesday. It's the Yamanote line going underground between Shinjuku and Yoyogi for ninety seconds. It's a user in a basement izakaya with one bar of signal trying to split a bill before their friends lose patience.

I came into mobile development from a web background, and the first few months were a slow process of unlearning habits that web had taught me were fine.

## Offline-first isn't a feature, it's a default

Early on, I built a mobile app the same way I'd build a web app: assume the network is there, show a spinner, fetch data, render it. Users on the train in Tokyo's subway tunnels taught me otherwise, mostly through one-star reviews that said things like "app is unusable, just shows loading forever." They weren't wrong. The app was technically working exactly as designed, and the design was wrong.

Now I design data flow around a simple question first: "what does this screen look like with zero connectivity?" If the answer is "broken," the architecture is wrong before a single line of UI code gets written. If the answer is "shows the last known data with a small indicator that it might be stale," the architecture has a chance.

The shift in thinking looks roughly like this:

```
 Before (network-first)
 screen mount -> fetch -> spinner -> render
                   |
                   v
              no network = stuck forever

 After (offline-first)
 screen mount -> render from local store
                   |
                   v
            background sync -> update store -> re-render
```

The second model means the user always sees something immediately, even if it's a few minutes old, and the screen quietly catches up once connectivity returns. That single architectural change did more for perceived app quality than any UI polish I shipped that year.

## State management needs a single source of truth, twice

Mobile apps often need two sources of truth: a local cache (SQLite, MMKV, Realm, or similar) for instant reads, and a remote source for correctness. The mistake I made repeatedly was letting UI components reach into both directly. A component would read from the local cache for the initial render, then also kick off its own fetch, and now there were two code paths that could disagree about what the current state actually was.

The fix was a sync layer that owns reconciliation. The UI only ever talks to the local store, full stop. A background process keeps the local store in sync with the server, resolving conflicts in one place instead of scattered across components.

```ts
// syncEngine.ts
async function syncExpenses() {
  const localChanges = await db.getUnsyncedExpenses()
  for (const change of localChanges) {
    try {
      const serverVersion = await api.pushExpense(change)
      await db.markSynced(change.id, serverVersion)
    } catch (err) {
      await db.markSyncFailed(change.id, err)
    }
  }
  const remoteChanges = await api.pullExpensesSince(lastSyncedAt)
  await db.mergeRemoteChanges(remoteChanges)
}
```

```tsx
// ExpenseList.tsx
function ExpenseList() {
  const expenses = useLiveQuery(() => db.getExpenses())
  // no fetch() here at all
  return expenses.map((e) => <ExpenseRow key={e.id} expense={e} />)
}
```

The component has no idea whether the data it's showing came from the network thirty seconds ago or was written locally and hasn't synced yet. That's intentional. The sync engine is the only thing that needs to know, and it's the only thing that needs to be tested for the gnarly edge cases like "what happens if the same expense gets edited offline on two devices before either one reconnects."

## Respect the platform, don't fight it

It's tempting to build one shared component library and stamp it onto both iOS and Android, especially when you're trying to ship fast with a small team. I did this on an early version of a savings tracker app aimed partly at the Lisu and Myanmar diaspora community here in Japan, figuring a shared design system would save time. It saved time on day one and cost time for the next year.

Users notice the difference even when they can't articulate it: gesture behavior, navigation transitions, haptic feedback timing, the exact spring curve of a sheet sliding up from the bottom. An Android user swiping back from the left edge expects a different feel than an iOS user swiping the same gesture. Get it close enough and nobody complains. Get it slightly wrong and people describe the app as "laggy" or "weird" without being able to say why, which is a much harder bug report to act on than a crash log.

I've learned to share logic aggressively, business rules, validation, the sync engine described above, but let platform-specific primitives handle anything the user touches directly: navigation, lists, modals, haptics. The split roughly looks like this in practice.

| Layer | Shared across platforms | Platform-specific |
|---|---|---|
| Business logic / sync | Yes | No |
| Data models / validation | Yes | No |
| Navigation transitions | No | Yes (native stack per platform) |
| List scrolling physics | No | Yes (native list component) |
| Haptics / feedback timing | No | Yes |
| API client | Yes | No |

## Battery and memory are real constraints, not afterthoughts

A background sync job that polls every five seconds feels harmless in a simulator running on a plugged-in laptop. On a real device with a real battery, sitting in someone's pocket for eight hours, it's the difference between a 4.5 and a 2-star review titled "drains my battery in an hour." I shipped exactly this mistake once: a polling interval that made sense for a demo and was catastrophic in the real world, because the simulator never told me anything about power draw.

The fix wasn't clever. It was switching from polling to a push-based sync trigger plus a much longer background fetch interval, and being honest with myself that "instant sync" mattered far less to users than "doesn't kill my battery." I measured the difference on a test device over a week of normal use:

| Sync strategy | Avg. battery drain per hour (idle) | Sync latency |
|---|---|---|
| Poll every 5s | ~9% | Near-instant |
| Poll every 60s | ~3% | Up to 1 minute |
| Push + background fetch | <1% | Seconds to minutes |

Memory has the same dynamic. A list screen rendering five thousand transaction rows without virtualization works fine until it doesn't, usually on the oldest, cheapest Android device in your user base rather than the flagship phone every engineer tests on. Treat resource usage as a first-class requirement, the same way you'd treat correctness, and test on the device your actual users are likely to own, not the one in your pocket.

## Permissions, onboarding, and the cost of asking too early

One pattern I picked up from watching support tickets pile up: asking for permissions (location, notifications, camera) at app launch, before the user has any reason to trust the app or understand why it needs them, tanks both the grant rate and first-impression sentiment. Moving every permission request to the exact moment it becomes relevant, right when the user taps "scan receipt" rather than on the splash screen, more than doubled our notification opt-in rate on one project. Nothing about the underlying permission logic changed. Only the timing did.

## What carried back into my web work

Mobile development made me a better web developer too. It's hard to unlearn the discipline of asking "what happens when this fails, right now, mid-request, with no warning" once you've had to answer it for real, on a real device, for a real user standing in a tunnel. I now build web apps with the same offline-first instinct: optimistic UI updates, a local cache that the UI trusts completely, and a sync layer that reconciles in the background instead of blocking the interface on every request.

The platforms are different, but the underlying lesson travels everywhere: the network is not a detail you handle later. It's a condition you design for from the very first sketch of the architecture, because the moment you treat connectivity as guaranteed, you've already written the bug report someone will file in a few months.
