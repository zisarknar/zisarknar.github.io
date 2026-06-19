---
title: "Lessons from Mobile Development"
date: "2024-02-20"
excerpt: "What switching between web and mobile taught me about state management, offline support, and respecting the platform."
tags: ["Mobile", "React Native", "Engineering"]
status: "published"
---

Moving between web and mobile development forces you to question assumptions you didn't even know you had. On the web, a flaky network connection is an edge case. On mobile, it's Tuesday.

## Offline-first isn't a feature, it's a default

Early on, I built a mobile app the same way I'd build a web app: assume the network is there, show a spinner, fetch data. Users on the train in Tokyo's subway tunnels taught me otherwise. Now I design data flow around a simple question first: "what does this screen look like with zero connectivity?" If the answer is "broken," the architecture is wrong before a single line of UI code gets written.

## State management needs a single source of truth, twice

Mobile apps often need two sources of truth — a local cache (SQLite, MMKV, or similar) for instant reads, and a remote source for correctness. The mistake I made repeatedly was letting UI components reach into both directly. The fix was a sync layer that owns reconciliation: the UI only ever talks to the local store, and a background process keeps it in sync with the server, resolving conflicts in one place instead of scattered across components.

## Respect the platform, don't fight it

It's tempting to build one shared component library and stamp it onto both iOS and Android. Users notice the difference even when they can't articulate it — gesture behavior, navigation transitions, haptic feedback timing. I've learned to share logic aggressively but let platform-specific primitives handle anything the user touches directly.

## Battery and memory are real constraints, not afterthoughts

A background sync job that polls every five seconds feels harmless in a simulator. On a real device with a real battery, it's the difference between a 4.5 and a 2-star review. Treat resource usage as a first-class requirement, the same way you'd treat correctness.

Mobile development made me a better web developer too — it's hard to unlearn the discipline of asking "what happens when this fails" once you've had to answer it for real.
