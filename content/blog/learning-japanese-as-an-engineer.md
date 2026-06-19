---
title: "Learning Japanese as an Engineer"
date: "2024-12-05"
excerpt: "How studying technical Japanese is different from conversational Japanese, and the study habits that actually moved the needle for me."
tags: ["Personal", "Japan", "Language"]
status: "published"
---

Conversational Japanese and the Japanese you need to function on an engineering team turned out to be two different languages that happen to share the same grammar. I moved to Tokyo with three years of self-taught Japanese that let me order food, navigate the train system, and have a passable small-talk conversation with a neighbor. None of that prepared me for my first design review, where I understood every individual word someone said and still had no idea what they meant.

Growing up, I'd already lived through one version of this gap. I'm Lisu, from a community that straddles the borderlands of Myanmar, and I grew up moving between Lisu at home, Burmese at school, and English from textbooks and, later, the internet, because that's where the technical material was. Three languages, three different registers, three different versions of how directly you're allowed to disagree with someone older than you. I didn't think of that as language training for a future career in Tokyo at the time. It just felt like how life worked. But it meant that by the time I hit the wall with technical Japanese, I already had a kind of intuition that fluency in a language and fluency in a specific professional culture are not the same skill, and you can have a lot of one without much of the other.

## Textbook Japanese doesn't cover code review

No language course teaches you how to politely disagree with a senior engineer's design decision in a design review, or how to interpret the difference between "検討します" (we'll consider it) meaning genuine consideration versus a polite no. I learned more about workplace Japanese from sitting silently in meetings for the first six months, just listening to patterns, than from any classroom exercise.

The specific moment this clicked for me: a design review where I proposed an approach, a senior engineer said "それも一つの考え方ですね" (that's one way to think about it too), and I left the meeting thinking my idea had been received as reasonable. It took a teammate explaining afterward, gently, that this phrase is almost always the opening of a polite redirect, not an endorsement. In Burmese workplace culture, and to some extent in how I'd learned to navigate disagreement with elders growing up, indirectness was also the norm, just calibrated differently. I had the instinct that something indirect was happening. I didn't yet have the specific vocabulary of cues, this exact phrase, this particular pause, this tone, that tells you which kind of indirect statement you're hearing.

What actually helped wasn't more textbook study. It was building a mental map of the specific phrases that show up in technical meetings and what they actually mean in context, as opposed to their dictionary definition.

| Phrase (textbook meaning) | What it usually signals in a design review |
|---|---|
| 検討します ("we'll consider it") | Often a soft no, rarely genuine commitment |
| それも一つの考え方ですね ("that's one way to see it") | Polite redirect incoming, not agreement |
| 難しいかもしれません ("it might be difficult") | Functionally "no," stated as a possibility |
| 確認します ("I'll check") | Genuinely open, often followed by real follow-up |
| なるほど ("I see") | Neutral acknowledgment, not agreement either way |

I built this table for myself slowly, almost entirely from getting it wrong first and having a patient colleague explain afterward what had actually been communicated. There's no shortcut to that part. The pattern-matching only sharpens with repeated exposure to real meetings, ideally with someone willing to debrief you afterward when you ask.

## Build a personal glossary, not a generic vocabulary list

Generic vocabulary apps teach you words evenly distributed across topics you'll rarely need. I kept a running glossary of terms that actually came up in my work, 障害 (incident/outage), 仕様 (specification), 負荷分散 (load balancing), 後方互換性 (backward compatibility), 障害対応 (incident response), and reviewed that list daily. A narrow, relevant vocabulary you actually use beats a broad one you don't.

The glossary started as a Notes app list and eventually became a spaced-repetition deck, but the source of new entries never changed: anything I heard in a meeting and didn't fully understand went into the list that same day, with the sentence it appeared in, not just the bare word. Context mattered more than definition. Knowing that 切り戻し means "rollback" is useful. Knowing that it specifically gets used in incident channels, as in "とりあえず切り戻しましょう" (let's roll back for now, we'll figure out why later), told me something about how the team handles incidents under pressure: stabilize first, root-cause later, and that's a completely acceptable thing to say out loud mid-incident.

Roughly four months into doing this consistently, I noticed I'd stopped translating in my head during standups. The words were just landing as meaning, the same way 負荷 (load) or デプロイ (deploy, a loanword) had become non-events to parse. That was the real signal that the glossary approach was working, not a test score, just the absence of the little half-second lag where I used to be silently translating instead of listening.

## A rough timeline, in hindsight

I didn't track this formally at the time, but reconstructing it afterward roughly looked like this:

| Time in Tokyo | Milestone |
|---|---|
| Month 1–3 | Could survive logistics; lost in any meeting with more than two speakers |
| Month 4–6 | Understood individual words in meetings; missed the actual point being made |
| Month 7–9 | Started building the phrase glossary; began catching indirect "no"s in real time |
| Month 10–12 | Spoke up unprompted in a design review for the first time |
| Year 2 | Read internal documentation in Japanese by default, not as an exercise |
| Year 2.5+ | Stopped noticing which language a meeting was in until afterward |

The jump between month six and month ten was the hardest stretch and also the most important one. Comprehension was rising faster than the confidence to participate, which created a strange period where I understood almost everything being said and contributed almost nothing, which from the outside probably looked like I understood less than I did. Nobody could see the gap between comprehension and participation. They could only see the silence.

## Read documentation in Japanese on purpose

Once I had basic fluency, I started deliberately reading Japanese technical documentation and internal wikis instead of defaulting to English sources, even when it was slower. The friction was the point. It forced vocabulary and sentence patterns to stick in a way that passive study never did.

This was a deliberate trade against short-term productivity. Reading an internal incident postmortem in Japanese took me three times as long as reading the English summary someone had kindly translated for international team members. For the first several months, I genuinely lost time doing this. But the vocabulary and grammar patterns that show up in postmortems, root cause analysis language, mitigation language, the specific way Japanese technical writing sequences cause and effect, don't show up in casual conversation practice at all. You only absorb them by reading the real thing, repeatedly, even slowly.

A smaller habit that compounded over time: I stopped asking for English translations of Slack threads I could mostly follow, even when someone offered, because asking for the translation meant skipping the one rep that would have made the next thread easier to read unassisted.

## Mistakes are cheaper early than you think

I avoided speaking up in meetings for longer than I should have, worried about getting the grammar wrong in front of colleagues. In hindsight, the cost of staying quiet, not contributing, not being understood, not building relationships, was much higher than the cost of an awkward sentence. Nobody remembers your conjugation mistake from eight months ago; they remember whether you showed up and tried.

I think about this in relation to growing up moving between Lisu, Burmese, and English, because the fear of getting it wrong in front of someone you respect isn't a Japan-specific feeling for me, it's a pattern I recognize from childhood, sitting quietly at a Burmese-language school assembly, conscious that my accent or word choice marked me as someone who'd learned the formal register from books rather than absorbed it natively. The instinct to stay quiet until you're sure you'll get it right is protective in the short term and expensive in the long term. It took me until adulthood, in a different country and a different language, to actually act on that realization instead of just intellectually agreeing with it.

The turning point for speaking up at work wasn't a fluency milestone. It was a specific incident where staying quiet had a real cost: I'd noticed a likely race condition in a design being discussed, understood the Japanese well enough to know it was relevant, and said nothing because I wasn't confident I could phrase the concern correctly. The bug shipped. It was exactly the race condition I'd suspected, and fixing it in production cost more than a clumsy sentence in a meeting ever would have. After that, the calculation changed permanently: an imperfectly phrased correct concern beats a perfectly silent one, every time.

Language learning as an adult professional isn't really about hitting some fluency benchmark. It's about lowering the friction between you and the people you work with, one conversation at a time.
