---
title: "Why I Moved to Tokyo"
date: "2024-03-10"
excerpt: "Leaving Myanmar to build a career in Japan's tech industry — what I expected, what surprised me, and what I'd tell my younger self."
tags: ["Career", "Personal", "Japan"]
status: "published"
---

People ask me why a software engineer from Myanmar ends up writing code in Tokyo. The short answer is opportunity. The longer answer is more interesting, and it took me a few years of actually living here to be able to tell it honestly instead of giving the tidy version I used to give at networking events.

## The decision wasn't really about Japan at first

I wasn't chasing Tokyo specifically. I was chasing a place where I could work on hard engineering problems with a team that pushed me to get better than I was. I grew up in a Lisu community in northern Myanmar, where access to reliable infrastructure, let alone a computer science education, was not something you could take for granted. I taught myself to code on intermittent electricity and a phone with a cracked screen, which meant every project I built early on had to survive interruption, because interruption was simply the default condition I worked under. That turned out to matter more for my career than any single technology I learned.

Japan's tech scene, especially in fintech and infrastructure, turned out to be exactly the kind of environment I was looking for: rigorous, detail-obsessed, unwilling to ship something half-finished. The specifics of "Japan" came later. The direction, toward a place that valued precision and depth over speed for its own sake, came first.

I had other options on the table, roughly summarized here, because I think the comparison is more useful than just saying "I chose Japan":

| Option | What pulled me toward it | What pulled me away |
|---|---|---|
| Stay in Myanmar, remote work | Family, community, lower cost of living | Limited infrastructure, unstable internet, fewer senior engineers to learn from |
| Singapore | English-first, large fintech scene | Felt like an easier version of the same problems I already knew |
| Tokyo | Rigorous engineering culture, fintech depth, total reset of assumptions | Language barrier, visa process, distance from family |

I picked the option that scared me the most, on the theory that the amount of growth available usually correlates with the amount of discomfort you're willing to sit through first.

## The language barrier is real, and it's not just about words

I studied Japanese seriously before moving, enough to pass a respectable proficiency level on paper. I assumed that would translate fairly directly into being able to function on an engineering team. It did not, or at least not as directly as I expected.

Technical fluency and workplace fluency are different skills entirely. Reading a design document is one thing; the vocabulary is mostly consistent and you can look things up. Picking up on the unspoken disagreement in a meeting where everyone is being extremely polite is another skill altogether, and it's not one any textbook prepared me for. In my first few sprint planning meetings, I'd leave thinking everyone had agreed on an approach, only to find out two days later that half the room had reservations they'd expressed so indirectly I'd missed them entirely.

I underestimated how much communication in a Japanese engineering team happens between the lines: a slight pause before agreeing, a "muzukashii kamo shiremasen" (this might be difficult) that actually means "this will not work and I think you know that," a suggestion phrased as a question. I spent the first year mostly listening, taking notes after meetings on what had actually been decided versus what had merely been said out loud, and slowly building a mental dictionary of the gap between the two.

```
 What was said:        "Sore wa chotto..."  (that's a bit...)
 What was meant:        No, and please stop suggesting it.

 What was said:        "Kentou shimasu"      (we'll consider it)
 What was meant:        Depends entirely on tone, pause length,
                         and who said it. Ask a trusted colleague.
```

That second example is, half-jokingly, the most accurate flowchart I can offer for the first year of working in a Japanese office. I leaned heavily on one senior teammate who would, after a meeting, quietly translate not the words but the actual outcome. That relationship probably saved me a year of misunderstandings.

## Being an outsider sharpened my engineering instincts

There's a strange benefit to not sharing every cultural assumption with your team: you ask more "why do we do it this way" questions, because you genuinely don't know the answer and you're not embarrassed to ask. Some of those questions were naive, and I could tell from the slightly surprised looks. A few of them turned out to expose process problems nobody had questioned in years, because everyone who'd been there long enough had stopped seeing them.

One concrete example: our deployment process required a director's manual sign-off for every production release, including one-line copy fixes, a holdover from an incident years earlier that nobody currently on the team had actually been present for. I asked why, expecting a good reason. The honest answer, after some digging, was "that's just how it's done here." We eventually built a tiered approval system where low-risk changes skipped the manual sign-off, and deploy frequency for minor fixes went up noticeably within a month. Nobody on the original team had questioned it, not because they were complacent, but because the assumption was invisible to anyone who'd grown up inside that company's particular history.

Being the person who doesn't have that history is, it turns out, a legitimate engineering asset. It's uncomfortable in the moment and useful in the aggregate.

## The parts nobody warns you about

A few things surprised me that don't fit neatly into "language" or "culture" as categories. The sheer logistics of being a foreign engineer in Japan, the visa renewal cycle, the apartment guarantor requirements that assume a Japanese co-signer, the way every bank and phone contract wants a "hanko" or at minimum a permanent address you don't have yet, ate far more energy in my first six months than any technical problem did. I'd budgeted mental energy for hard system design interviews and difficult onboarding codebases. I had not budgeted for spending an entire Saturday at a ward office trying to explain, in halting Japanese, why my residence card said one thing and my company's HR system said another.

There's also a quieter cultural adjustment around remittances and family obligation that doesn't come up much in expat blog posts. Sending money home, navigating exchange rates, explaining to relatives back home what my job actually involves when "software engineer" doesn't map cleanly onto any job category they're familiar with, all of that is its own ongoing project, separate from anything happening at the office.

## What I'd tell my younger self

Don't wait until your language skills feel "ready." You'll improve faster inside a real engineering team with real stakes, real deadlines, and real consequences for misunderstanding a requirement, than in any classroom, no matter how good the classroom is. I spent more time than I should have delaying the move because my Japanese wasn't "good enough yet." It will never feel good enough in the abstract. It gets good enough through use.

And don't underestimate how much your background, growing up navigating limited resources, unreliable infrastructure, and constant low-level problem-solving, is itself an engineering advantage rather than something to compensate for. Building software with intermittent power and unreliable connectivity teaches you, by necessity, to design for failure as the default case rather than the exception. That instinct turned out to be directly transferable to the kind of resilient, fault-tolerant systems work that fintech infrastructure actually demands. It taught me to build things that work under constraints, and it turns out that's most of the job, regardless of which country you end up doing it in.

I didn't move to Tokyo because Tokyo was the destination. I moved because I was looking for a place that would make the constraints I'd already learned to work around feel less like a disadvantage and more like exactly the right preparation for the work in front of me.
