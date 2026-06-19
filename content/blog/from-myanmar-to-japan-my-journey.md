---
title: "From Myanmar to Japan: My Journey"
date: "2024-08-14"
excerpt: "Growing up in Myanmar as part of the Lisu people, and how that path led to a career building software in Tokyo."
tags: ["Personal", "Myanmar", "Career"]
status: "published"
---

My path into software engineering didn't start with a computer. It started with curiosity about how things worked, and a lot of improvisation, growing up as part of the Lisu people in Myanmar. There wasn't a single moment where I decided to become an engineer. It was more like a long series of small, stubborn decisions to keep figuring things out, even when the next step wasn't obvious and nobody around me had taken that path before.

## Where I started

The Lisu are a minority within Myanmar, scattered across the northern hill regions, and growing up in that context meant a particular relationship with infrastructure that I didn't have a name for until much later. Electricity wasn't a constant. Internet, when it existed at all, was slow, shared, and unreliable enough that you learned not to depend on anything finishing the first time you tried it. If you wanted to download something, you started it before dinner and checked back after, and if it failed at 90%, you just started again and didn't waste energy being frustrated about it, because frustration didn't make the connection faster.

I mention this not to make it sound harder than it was day to day — it was simply normal, the water I swam in — but because it shaped a habit of mind that turned out to be unexpectedly useful later: assume things will fail, and design around that assumption from the start, rather than treating failure as an exception to handle later.

## Constraints as a teacher

That habit showed up everywhere once I started actually working with computers. The first time I tried to learn programming, it was from a borrowed laptop and a connection that dropped every twenty minutes or so. I remember downloading a programming tutorial video in fragments over three days, watching each piece as it finished, taking notes by hand because I didn't trust the connection to stay up long enough to open a second tab and look something up.

Years later, sitting in a meeting in Tokyo where a colleague described "designing for unreliable networks" as an advanced systems engineering concept — something you'd cover in a senior-level systems design interview — I had to suppress a small laugh. Not because the concept was wrong, but because I'd been living inside that constraint long before I had a vocabulary for it. Retry logic, exponential backoff, offline-first design, graceful degradation when a request times out: these weren't abstractions I learned from a textbook. They were just what it took to get anything done on a connection that might disappear at any moment.

```
A connection you can't trust teaches you to design
for the failure, not the happy path:

  request sent -----> [?] -----> response?
                        |
                        +--> times out --> retry
                        +--> drops       --> queue, resume later
                        +--> succeeds    --> proceed (the lucky case)
```

## Finding software by accident, then on purpose

I didn't grow up with a clear path to becoming an engineer. There was no school counselor pointing toward computer science, no relative in tech to ask for advice, no bootcamp with a clean curriculum and a cohort of people going through the same thing at the same time. Access to formal computer science education was limited, so most of what I learned came from documentation, forums, and a lot of trial and error on borrowed hardware, often shared with siblings or friends who needed the same machine for their own schoolwork.

What started as curiosity, fixing a friend's computer here, figuring out why a website looked broken on a particular browser there, slowly turned into something more deliberate. I remember the specific feeling of getting a single function to work after an evening of failed attempts: not relief exactly, more like a door opening onto a room I hadn't known was there. That feeling is, honestly, still the thing that keeps me doing this work more than a decade later.

That self-taught foundation made me comfortable with ambiguity in a way I didn't fully appreciate until I started working alongside engineers who'd come up through more conventional, structured paths. When there's no professor or curriculum to tell you the "right" way, you get used to figuring things out from first principles, reading the actual documentation instead of waiting for someone to explain it to you, and trusting that you can eventually understand something even when the first three explanations you find don't make sense.

## The move to Japan

Moving to Tokyo wasn't a single clean transition. It was visas, paperwork, a language I had to learn fast enough to function in technical meetings, and the particular disorientation of being competent at your job in one language and a beginner at daily life in another. I'd walk out of a code review where I'd just explained a tricky concurrency bug in clear, confident English, and then spend ten minutes at a convenience store trying to figure out which trash bin a plastic wrapper belonged in, because Japan's waste sorting rules are detailed and unforgiving to a newcomer.

That contrast, fluent at work, a beginner everywhere else, took some getting used to. But it also clarified something: competence and belonging aren't the same thing, and you can have a lot of one while still building the other. I leaned on the same instincts that got me through learning to program without a formal path. Watch carefully before assuming. Ask the literal question instead of the polite indirect one when you genuinely don't know something. Accept that looking like a beginner in public is just the cost of eventually not being one.

## Carrying identity into a new country

Moving from Myanmar to Japan meant navigating two layers of being an outsider — culturally Burmese, but also Lisu within Myanmar itself, a minority within a minority. Even within Burmese communities abroad, I sometimes found myself needing to explain who the Lisu are before a conversation about home could really start. It's a strange kind of double translation: explaining your country to people unfamiliar with it, and then explaining your own community within that country to people who only had one mental category for "Burmese" to begin with.

I've come to see that as an asset rather than something to smooth over. It's given me practice at adapting quickly, listening before assuming, and finding common ground with people whose context is completely different from mine. On an engineering team in Tokyo with colleagues from half a dozen countries, nobody shares a single default cultural assumption about how meetings should run, how directly to disagree with a senior engineer, or how much context to give before getting to the point. You either develop the skill of reading the room and adjusting, or you spend a lot of energy being quietly frustrated that other people aren't doing things "the normal way." I'd already had a lot of practice with the former, out of necessity, well before I ever set foot in Japan.

## A rough shape of the path

People sometimes ask for the short version, so here's roughly how the timeline breaks down, though the real version was messier and slower than any table can capture:

| Period | What was happening |
|---|---|
| Childhood, northern Myanmar | Growing up Lisu, unreliable power and internet as the norm |
| Teens | Self-taught programming on borrowed hardware, learning from documentation and forums |
| Early career | First professional development work, building comfort with formal engineering practice |
| Transition | Visa process, intensive language study, preparing for the move to Japan |
| Tokyo | Full-stack and mobile engineering work, adjusting to a new language and culture in parallel |

The gaps in that table are where most of the actual life happened: the specific failures, the months that felt like nothing was working, the small wins that mattered disproportionately because of how hard-won they were. No table captures that, and I'm suspicious of any version of this story that makes it sound more linear than it was.

## Why I share this

Engineering blogs tend to skip the personal context that shapes how someone actually thinks about problems. The "about me" section gets reduced to a list of languages and frameworks, as if the way someone approaches a system design problem has nothing to do with where they grew up or what they had to learn without help.

Mine isn't separate from how I write code or design systems. It's the reason I default to building for constraints instead of assuming ideal conditions, the reason I'm suspicious of solutions that only work when everything goes right, and the reason I take it seriously when a junior engineer on my team is figuring things out without a clear roadmap, because I remember exactly what that felt like and I know it isn't a sign of being behind. It's just a different way of arriving at the same place, and some of the best engineers I've worked with arrived that way too.
