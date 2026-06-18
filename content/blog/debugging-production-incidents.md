---
title: "Debugging Production Incidents Without Losing Your Mind"
date: "2024-09-25"
excerpt: "A calm process for the moment everything is on fire — how I triage, isolate, and fix production incidents under pressure."
tags: ["Debugging", "SRE", "Engineering"]
---

The worst debugging happens during the worst possible time — production is down, people are watching, and panic makes everyone worse at their job, including you. Having a process that doesn't depend on staying calm matters more than any specific debugging trick.

## Stop the bleeding before you understand the cause

The instinct to find the root cause immediately is usually wrong under incident pressure. The first move should be mitigation: can you roll back the last deploy, fail over to a healthy region, or disable the feature flag tied to the change? Understanding "why" can come after the immediate damage stops, not before.

## Narrow the blast radius with evidence, not guesses

Once things are stable, I resist the urge to start changing code based on a hunch. Instead: what changed recently (deploys, config, traffic patterns, third-party dependencies)? What do the error rates and latency graphs actually show, and when did they start diverging from normal? A timeline built from logs and metrics beats intuition every time, especially when the obvious suspect ("it's probably the database") is often wrong.

## One change at a time, always

Under pressure, there's a strong temptation to apply three fixes at once because each seems plausible and time is short. Resist it. If you change three things and the incident resolves, you've learned nothing about which one mattered, and you've potentially introduced two unnecessary changes into a system that's already unstable.

## The postmortem is the actual deliverable

The incident itself is mostly noise — what matters is whether the postmortem produces a concrete action that prevents the same class of failure from recurring. "We'll be more careful" is not an action. "We added a circuit breaker on this dependency and a canary deploy step" is. I've started judging the success of an incident response less by how fast we recovered and more by whether the postmortem changed anything real.

Staying calm during an outage isn't a personality trait — it's what happens when you trust your process more than your panic.
