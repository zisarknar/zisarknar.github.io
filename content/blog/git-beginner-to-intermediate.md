---
title: "Git ကို အခြေခံကနေ အလယ်အလတ်အဆင့်ထိ"
date: "2026-06-18"
excerpt: "commit၊ branch ကနေ rebase၊ cherry-pick အထိ — Git ကို တကယ်နားလည်အောင် တစ်ဆင့်ချင်း လေ့လာကြမယ်။"
tags: ["Git", "Engineering", "Tutorial"]
status: "published"
---

Git ကို နှစ်ပေါင်းများစွာ သုံးနေပေမယ့် `add`, `commit`, `push` သုံးခုကိုသာ tools အနေနဲ့ memorize ထားပြီး၊ underlying concept ကို နားမလည်တဲ့ engineer တွေ အများကြီးတွေ့ဖူးပါတယ်။ ပြဿနာတက်တဲ့အခါ (merge conflict ကြီးတစ်ခု၊ history ကို ပြန်ပြင်ရတဲ့အခါ) ဒီလူတွေက "ဘာဖြစ်နေလဲ" ကို နားမလည်တော့ဘဲ google ထဲမှာ command ကို copy-paste လုပ်ပြီး run ကြတယ်။ ဒါက အန္တရာယ်ရှိတယ်။ Git ရဲ့ data model ကို တကယ်နားလည်ထားရင် ပြဿနာအသစ်တွေ့တိုင်း ဖြေရှင်းနည်း ကိုယ်တိုင် တွေးနိုင်ပါတယ်။

## Git ရဲ့ အခြေခံ Concept သုံးခု

Git ကို နားလည်ရန် အရေးကြီးဆုံး concept သုံးခုက repository, commit, နဲ့ branch ဖြစ်ပါတယ်။

| Concept | ဆိုလိုသည် |
|---|---|
| Repository | project တစ်ခုလုံးရဲ့ history ကို သိမ်းထားတဲ့ database |
| Commit | အချိန်တစ်ခုမှာ project state ကို snapshot ရိုက်ထားတာ |
| Branch | commit history ကို ညွှန်ပြထားတဲ့ pointer (label) တစ်ခုသာ |

Branch ဆိုတာ folder တစ်ခု copy ထားတာ မဟုတ်ပါ။ commit တစ်ခုကို ညွှန်ပြထားတဲ့ label တစ်ခုပါ။ ဒီအချက်ကို နားလည်ထားရင် branch create လုပ်တာ ဘာကြောင့် instant ဖြစ်တယ်ဆိုတာ ရှင်းပါလိမ့်မယ်။

```
main:     A───B───C
                   ↑
                  main (pointer)

git branch feature ပြုလုပ်ပြီးနောက်:

main:     A───B───C
                   ↑       ↑
                  main   feature
              (နှစ်ခုလုံး commit C ကို ညွှန်နေတယ်)
```

## Working Directory, Staging Area, Repository — အလွှာသုံးထပ်

Git command တွေ ရှုပ်ထွေးနေတယ်ဆိုရင် အများစုက ဒီအလွှာသုံးထပ်ကို မရှင်းလင်းတာကြောင့်ပါ။

```
[Working Directory]  ──git add──►  [Staging Area]  ──git commit──►  [Repository]
  (file တွေ ပြင်နေတဲ့     (commit လုပ်ဖို့              (history ထဲ
   နေရာ)                  ရွေးချယ်ထားတဲ့ file)            အပြီးသတ် သိမ်းထား)
```

- `git status` — အလွှာသုံးထပ်ထဲ ဘာတွေ ကွဲနေလဲ ကြည့်တာ
- `git add <file>` — Working Directory ကနေ Staging Area ကို တင်တာ
- `git commit` — Staging Area ထဲက အရာတွေကို Repository ထဲ permanent သိမ်းတာ
- `git diff` — Working Directory နဲ့ Staging Area ကို နှိုင်းယှဉ်တာ
- `git diff --staged` — Staging Area နဲ့ နောက်ဆုံး commit ကို နှိုင်းယှဉ်တာ

## အခြေခံ Command များ

| Command | ရည်ရွယ်ချက် |
|---|---|
| `git init` | repository အသစ်တည်ဆောက်ခြင်း |
| `git clone <url>` | repository တစ်ခုကို copy ယူခြင်း |
| `git status` | လက်ရှိ state ကို ကြည့်ခြင်း |
| `git add <file>` | file ကို staging area ထဲ ထည့်ခြင်း |
| `git commit -m "msg"` | snapshot ရိုက်ခြင်း |
| `git log` | commit history ကို ကြည့်ခြင်း |
| `git branch <name>` | branch အသစ် ဖန်တီးခြင်း |
| `git checkout <branch>` / `git switch <branch>` | branch ပြောင်းခြင်း |
| `git push` | local commit တွေကို remote ပေါ်တင်ခြင်း |
| `git pull` | remote ကနေ change အသစ်တွေ ယူခြင်း |

## Merge vs Rebase — ဘယ်အချိန် ဘာသုံးမလဲ

Branch နှစ်ခုကို ပေါင်းချင်တဲ့အခါ နည်းလမ်းနှစ်ခုရှိတယ်။ `merge` က history နှစ်ခုကို ဟိုနေရာအတိုင်းထားပြီး merge commit တစ်ခုနဲ့ ချိတ်တာ။ `rebase` က branch တစ်ခုရဲ့ commit တွေကို ဒုတိယ branch ရဲ့ အဆုံးကနေ ပြန်ထပ်ပြီး "replay" လုပ်တာ၊ history က straight line ဖြစ်သွားတယ်။

```
Merge:
  main:     A───B───C────────M
                     \      /
  feature:            D───E

Rebase:
  main:     A───B───C
  feature (rebase အပြီး):  A───B───C───D'───E'
```

| | Merge | Rebase |
|---|---|---|
| History | branch ပုံစံ ပြသိမ်းထား | straight line ဖြစ်အောင် ပြန်ရေးတယ် |
| Commit hash | မပြောင်း | ပြောင်းသွားတယ် (D' ≠ D) |
| Shared branch မှာ သုံးရင် | safe | အန္တရာယ်ရှိ (history ပြောင်းတဲ့အတွက်) |
| Local feature branch မှာ သုံးရင် | OK | clean history ရအောင် ကောင်း |

အခြေခံစည်းမျဉ်းတစ်ခုက — **shared/public branch ကို rebase မလုပ်ပါနဲ့**။ Team member တစ်ယောက်က ဒီ branch ကို pull ယူထားပြီးဆို rebase လုပ်လိုက်ရင် history ကွဲသွားပြီး လူတိုင်း confused ဖြစ်ကြလိမ့်မယ်။ Local branch ကိုယ်တိုင်အလုပ်လုပ်နေတာဆိုရင်တော့ push မလုပ်ခင် rebase နဲ့ history ကို သန့်ရှင်းအောင် လုပ်တာ ကောင်းပါတယ်။

## Conflict ဖြေရှင်းခြင်း

Merge ဒါမှမဟုတ် rebase လုပ်တဲ့အခါ file တစ်ခုတည်းကို နှစ်ဖက်က ပြောင်းထားရင် conflict ဖြစ်တယ်။ Git က conflict marker တွေနဲ့ ပြထားလိမ့်မယ်။

```
<<<<<<< HEAD
const PORT = 3000;
=======
const PORT = process.env.PORT || 8080;
>>>>>>> feature-branch
```

ဒီနေရာမှာ ဘယ်ဟာ ဆက်ထားမလဲ ကိုယ်တိုင် ဆုံးဖြတ်ပြီး marker တွေ ဖျက်ပြီး `git add` → `git commit` (merge ဆိုရင်) ဒါမှမဟုတ် `git rebase --continue` (rebase ဆိုရင်) ဆက်လုပ်ရပါတယ်။ Conflict ဖြစ်တိုင်း panic မဖြစ်ပါနဲ့ — code နှစ်ဖက်ကို နှိုင်းယှဉ်ကြည့်ပြီး logic အရ ဘယ်ဟာ မှန်လဲ ဆုံးဖြတ်ရုံပါ။

## Intermediate Level Tool များ

Beginner level ကျော်လွန်ပြီးတဲ့အခါ ဒီ command တွေကို သိထားရင် daily work မှာ အများကြီး အကူအညီရပါလိမ့်မယ်။

| Command | အသုံးပြုမှု |
|---|---|
| `git stash` | လက်ရှိအလုပ်ကို မသိမ်းသေးဘဲ ဘေးချသိမ်းထားခြင်း |
| `git cherry-pick <hash>` | branch တစ်ခုက commit တစ်ခုတည်းကို ရွေးယူခြင်း |
| `git rebase -i HEAD~3` | commit သုံးခုကို interactive ပြန်ပြင်ခြင်း |
| `git reflog` | branch pointer ရဲ့ history အားလုံးကို ကြည့်ခြင်း (လွမ်းသွားတဲ့ commit ရှာဖွေရန်) |
| `git bisect` | bug စတင်ဝင်လာတဲ့ commit ကို binary search နည်းနဲ့ ရှာခြင်း |
| `git blame <file>` | line တစ်ကြောင်းစီကို ဘယ် commit က ပြောင်းခဲ့လဲ ကြည့်ခြင်း |

`git stash` ကတော့ daily work မှာ အသုံးအများဆုံးပါ။ Feature တစ်ခု လုပ်နေရင်း urgent bug တစ်ခု fix ပေးရတဲ့အခါ၊ လက်ရှိအလုပ်ကို commit မလုပ်သေးဘဲ stash ချသိမ်းထားပြီး bug fix branch ကို ပြောင်းနိုင်တယ်။

```
လက်ရှိ feature branch မှာ အလုပ်လုပ်နေရင်း:
  git stash                    → လက်ရှိ change တွေ ဘေးချသိမ်း
  git checkout main
  git checkout -b hotfix
  ... fix ...
  git commit -m "hotfix"
  git push
  git checkout feature-branch
  git stash pop                → ဘေးချထားတဲ့ change ပြန်ယူ
```

`git rebase -i` ကတော့ push မလုပ်ခင် commit history ကို သန့်ရှင်းချင်တဲ့အခါ သုံးတယ်။ "wip", "fix typo", "fix typo again" ဆိုတဲ့ commit သုံးလေးခုကို တစ်ခုတည်း squash ပြီး clean commit message တစ်ခု ပြန်ရေးနိုင်တယ်။

## Best Practice အနည်းငယ်

၁။ Commit message ကို "what" မဟုတ်ဘဲ "why" ကို ဦးစားပေးရေးပါ — code diff ကိုယ်တိုင်ကြည့်ရင် what က မြင်ပြီးသားပါ။
၂။ Commit တစ်ခုစီကို logical unit တစ်ခုထားပါ — feature တစ်ခုလုံးကို commit တစ်ခုတည်းနဲ့ မရေးပါနဲ့။
၃။ Force push (`git push --force`) ကို shared branch ပေါ်မှာ မသုံးပါနဲ့ — own feature branch ပေါ်မှာသာ သုံးပါ၊ နဲ့လည်း `--force-with-lease` ကို ပိုသုံးပါ။
၄။ `.gitignore` ကို project စမှာတည်းက သတ်မှတ်ပါ — credential, build artifact, node_modules စတာတွေ commit မလုပ်ဖို့။
၅။ Merge conflict ကြီးတွေ ရှောင်ချင်ရင် feature branch ကို main နဲ့ မကြာခဏ sync လုပ်ပါ — branch ကြာလေ history ကွဲကွာမှု များလေပါ။

## အနှစ်ချုပ်

Git ကို command memorize ထားတာထက် "commit, branch, history graph" ဆိုတဲ့ data model ကို နားလည်ထားတာက ပိုအရေးကြီးပါတယ်။ Beginner level ကနေ intermediate level ကို ကျော်တက်ဖို့အတွက် stash, rebase, cherry-pick, reflog စတဲ့ tool တွေကို သိထားပြီး၊ merge နဲ့ rebase ကြားက trade-off ကို နားလည်ထားရင် team တစ်ခုထဲမှာ confident ဖြစ်အောင် Git ကို သုံးနိုင်ပါလိမ့်မယ်။
