# Retention Lab · Day 4

**Customer Retention & Buying Behaviour in B2B IT Sales · Module 2, Day 2 of 2.**
*Emotional sales control, personalisation and long-term customer retention.*
A self-study companion: study material with interactive instruments, two tasks and two working documents, in **English and German**
(EN | DE in the top bar, `../CLAUDE.md` #32). It carries the shared standards `../CLAUDE.md` #1 to #28, the two-route form of #30
and the German version of #32.

The case company is **CloudTech Solutions GmbH**, a German provider of cloud hosting, backup and managed IT for the Mittelstand
(about 1,500 customers): *retention is low, the offers look interchangeable, there is little differentiation, and data protection is
critical* (the plan's case). Route 1 works it with **€180,000 and six months**; Route 2 puts the learner in the Chief Customer
Officer's chair with **€240,000 and twelve months** (Case assumption). The worked-example company of every diagram is Brenner
Netzwerke, so a task answer is never printed.

This repo was bootstrapped from `day3` (chrome, primitives, store pattern, tokens) and its content was replaced; the German
mechanism was taken over from `day5`. Nothing of SecureIT Systems remains in the tree.

> **Before you push:** this folder is not a git repository yet. Create the `aion-cs-day4` repository and set the remote first
> (`../CLAUDE.md` #17). Nothing was committed or pushed.

## Routes

| Route | Content | Export |
|---|---|---|
| `/route-1/` **Levels 1 + 2** | **Materi A**: seven cards, 60 min (A1 feeling first, A2 four emotions, A3 three triggers and the three honesty tests, A4 behavioural targeting and consent, A5 loyalty programmes, A6 touchpoints and six needs, A7 scoring measures and the loyalty concept). **Task 1, Retention Plan**: *Part 1 · Understand the emotional effect:* 1.1 sort eight customer statements into four emotions, 1.2 name the trigger in eight sales lines and choose the lines you would not send, 1.3 three approaches on three different emotions, 1.4 reach, rebate and cost per customer (F1–F3), the main risk of each measure, one sentence, 1.5 coaching reflection. *Part 2 · Analyse and act:* 2.1 tag twelve touchpoints with a need, 2.2 name the four needs, rate them, say what the file cannot tell you, 2.3 choose three of nine measures, score them, order them, 2.4 design a loyalty concept inside the same budget. | `1-{name}-day4-l1l2-retention-plan.html` |
| `/route-2/` **Level 3** | **Materi B**: six cards, 60 min (B1 levers and the target vision, B2 the personalisation ladder, B3 a loyalty system, B4 risks of misjudging the customer, B5 the architecture, B6 deciding when the data is unclear). **Task 2, Strategy Memo**, assembling beside the questions: 3.1 vision, 3.2 the three behaviour levers, 3.3 personalisation level per group, 3.4 three loyalty building blocks rated on four tests, 3.5 three risks with a trigger, 3.6 fund, sequence and own the architecture, 3.7 the decision, three assumptions, the tripwire and the board's challenge. | `2-{name}-day4-l3-strategy-memo.html` |

Minutes: Materi A 60 + Task 1 72 (7 + 7 + 7 + 10 + 4 + 8 + 9 + 11 + 9), Materi B 60 + Task 2 59 (5 + 8 + 8 + 10 + 8 + 10 + 10).
All in `lib/routes.ts`.

## German version (CLAUDE.md #32)

- `lib/lang.ts`: the active language as a module value, `tt(en, de)` for inline text, `t(en, de)` + `bi(...)` for data files (every
  bilingual field becomes a getter, so nothing is frozen at import), and number formats (`1.234,5`, `12.345 €`, `12 %`).
- `lib/i18n.tsx`: `LangProvider` (sets the language before rendering and remounts on change) and `LangSwitch` (EN | DE in the top bar,
  on every page). The choice is `ui.lang` in the persisted store. Pages are client components for this reason.
- Every page, card, diagram, task, clue, missing list, the glossary panel and both exported documents follow the switch.
- Common technical terms stay English in German sentences (Touchpoint, Retention, Renewal, Onboarding, Trigger, Scarcity, Social
  Proof, Authority, Behavioral Targeting, Loyalty, Opt-in, Tripwire, Baseline, Owner…); every explanation is German, formal "Sie".
  The German glossary (`data/glossary.ts`, a `de` block per entry) keeps the English term as the title and explains it in German.
- Mentor tools (mentor bar, answer keys, worked answers) stay English. "Fill all model answers" enters German free text while the site
  is in German (`data/mentorKey.ts`). Stored answers are ids, so a switch mid-task keeps every answer and every check.
- File names stay English in both languages.

## Stack

Next.js 14 App Router · TypeScript strict · Tailwind (CS tokens) · Zustand + `persist` (key `cs-d4-v1`, version 1, `skipHydration` +
`StoreHydrator`, deep `mergeDefaults`) · static export. No animation, drag-and-drop, PDF or chart library.

```bash
npm install
npm run dev          # http://localhost:3000
npx tsc --noEmit
npm run verify:calc  # re-derives every figure and rule of both routes from the data files
npm run build        # writes the static site to out/  (stop `npm run dev` first)
```

## What is in the data

- `needs.ts`, `feelings.ts`, `triggers.ts`, `approaches.ts`: the four emotions and six needs (test question, pair tests, what answers
  each), eight customer statements, eight sales lines with the three honesty tests, the approach frame ("so that … because …").
- `custBase.ts`: 1,500 customers, €12,000 revenue a year, 40% agreed to usage analysis, 75% of those have usable data. Measure A
  newsletter €12,000; B usage-based offers €36,000 + €9,000 review; C bonus programme 50% join, 2% rebate, 6 months.
  **F1 = 450** customers reached; **F2 = €90,000** rebate cost; **F3 = €100** per customer reached.
- `touchpoints.ts`: twelve touchpoints; tally Trust 3 (High), Relevance 3 (Mid), Security 2 (Mid), Belonging 2 (Low), Status 1, Timing 1;
  points = touchpoints + those followed by a customer leaving (≥ 5 High, 3–4 Mid, ≤ 2 Low).
- `measures.ts`: nine measures scored effect × acceptance (capped by the data class) × scalability (from the effort). Model: references,
  the value review and usage-based offers.
- `loyalty.ts`: types, benefits, opt-in and horizon; cost = €18,000 set-up + members × cost per member × months ÷ 12; model concept
  €45,000, whole plan €174,000 of €180,000.
- `route2.ts`: visions, three behaviour levers, the personalisation ladder L0–L4 for three groups (caps A → 3, B → 2, C → 1; model 140
  responders, engine €75,000), seven loyalty building blocks (choose 3), eight risks (choose 3), the architecture (three blocks +
  engine + consent foundation + dashboard; budget €240,000; model €237,000, dashboard €36,000 postponed; consent first), decisions,
  KPIs with baselines, the board's challenge (objections doubled in month 4).
- `mentorKey.ts`: every model answer, in the active language.

## Mentor bar

The first element on every page. `muchson123` once fills every model answer of both routes (and a participant name), so each export
downloads at once; verified in the browser in both languages. The unlock shows answer keys next to every fixed-option exercise and a
worked answer (with arithmetic) under every other question, in rust, never exported. A reload locks it.

## Notes on deviations from the brief and the shared rules

1. **Two routes (CLAUDE.md #30).** The plan's Level 1 Task 1 (emotional factors and approaches for CloudTech), Level 1 Task 2
   (personalisation vs mass communication, effort and risk) and the case (CloudTech Solutions) are merged on CloudTech. The coaching
   focus is Block 1.5 (why emotional triggers work stronger than facts, when personalisation tips into rejection, which measures
   change behaviour). The Level 3 transfer project (vision, levers, personalisation, loyalty system, risks, architecture, decision
   although the data is unclear) is Task 2, Blocks 3.1 to 3.7.
2. **Every figure beyond the brief is a Case assumption**: statements, sales lines, touchpoints, costs, response rates, the Route 2
   budget (€240,000), baselines and regret-table payoffs. The brief gives the role, the situation and the constraints only.
3. **Mechanism labels.** The four emotions are the plan's; the six needs add Relevance and Timing (two communication needs) and are
   labelled as practitioner categories.
4. **German by the user's standing request (#32)**, which changes CURRICULUM-GUIDE §1 ("English only"); English stays the default.
5. **Sources to re-check before teaching:** citations are given by their usual details; the current wording of § 5 and § 7 UWG,
   Art. 5–7 and 21 GDPR and the Planet49 judgment should be verified with the legal team before teaching.
6. **Word documents (#31)** live in `../materi-task-docx/` (English), built with the guide's pipeline.
7. **Core/Optional collapsing on Route 1, by explicit user request (2026-09-28).** The user asked to shorten Route 1 to
   2 Core blocks per level without changing any question. Core: **1.1** (sort what customers feel) and **1.4** (weigh
   three measures) for Level 1; **2.1** (twelve touchpoints) and **2.4** (the loyalty concept) for Level 2 — one clean
   diagnose → emotion → target-within-constraints → build-loyalty thread. Optional (collapsed by default via
   `components/ui/OptionalSection.tsx`, one click to open, never removed — CLAUDE.md #6): **1.2, 1.3, 1.5, 2.2, 2.3**,
   each of which deepens or repeats a skill a Core block already teaches. Materi cards **A1** and **A3** are collapsed
   the same way, since no Core block cites them (`data/materialIndex.ts`'s `optional` flag; a card any Core block
   needs stays required even if an Optional block also cites it). The dossier ring, the page map's done/total count
   and the Retention Plan's missing list all count Core only (`lib/progress.ts` `OPTIONAL_BLOCKS`/`isOptionalBlock`),
   mirroring the Friday day's Core/Optional split (#29) applied here to an ordinary day at the user's request.

   **Route 2 got the same treatment on request (2026-09-28).** Route 2's seven blocks form one sequential chain
   (vision → levers → personalisation ladder → loyalty system → risks → architecture → decision), so Core here is the
   three that connect most directly to the route's own objective ("decide, in writing, before the data is clear"):
   **3.1** (target vision), **3.4** (the loyalty system — the day's running theme, Core in both routes) and **3.7**
   (the decision) — set the target → design what is built → decide. Optional: **3.2, 3.3, 3.5, 3.6**, each a deeper
   design question the decision does not strictly require. Materi: **B1, B3, B6** stay required (cited by a Core
   block); **B2, B4, B5** are collapsed.

   **Now a standing rule (CLAUDE.md #35, from 2026-09-28): every route on every future day gets this Core/Optional
   split** — the smallest connected thread to that route's own stated objective stays Core, the rest collapses,
   picked per route (no fixed count) and never by changing a question. The tag appears in **two** places, per the
   rule: the page map (#28), `Core`/`Optional` always visible on both the wide-screen pill rail and the mobile
   list, and **on the card or block itself** — a `CorePill` (`components/ui/AnswerBlock.tsx`) next to every
   material card's id badge and every answer block's `OBJECTIVE`/`JUDGED` pill, Core in teal, Optional reusing
   `OptionalSection`'s own neutral pill so the wording can never drift. Verified live in the browser, both routes,
   both languages.
8. **Two always-live rust "still missing" notices (CLAUDE.md #34, standing rule from 2026-09-28).** Every answer block
   (`components/ui/BlockMissing.tsx`) and the Export bar itself now show a live, rust "still missing" note whenever
   something in them is incomplete — no Check, no click on Export needed first — and both disappear automatically the
   moment the gap is closed. This reports completeness only (empty, too short, wrong count), never a classification's
   correctness, so #4's "clue, not answer" is unaffected. Verified live across both routes, EN and DE.
9. **Three fixes ported from Day 3, and folded into the standing rules (2026-09-28).** Checking Day 3 (which had
   independently built the same Core/Optional idea, plus a fix to #23) turned up three gaps in Day 4's own build:
   - **`MentorGuide.example` (CLAUDE.md #23's Day-3 update) was documented but never wired up here.** `answer` is
     safe to show verbatim for an open, reflective field, but not for a field whose answer *is* the case's own
     calculated result or a small fixed-set pick (a felt-cost/order comparison, which measures are funded, which
     lever is greatest). `sentenceGuide` (1.4), `behaviourGuide` (2.2), `whyGuide` (2.3) and `mainWhyGuide`,
     `weighGuide` (Route 2, 3.3–3.4) now carry a bilingual `example`: the same method, a different company and
     different numbers, ending by pointing back at the learner's own inputs. `ExampleAnswer` prefers `example`
     over `answer` when set, and says so plainly. Verified live in both languages; the mentor's own gated panel is
     unaffected (it still reads the real `answer`).
   - **Optional open/closed state moved from local `useState` to a shared, session-only `store/useOptionalOpen.ts`**
     (a bare `create()`, not persisted), so `PageNav`'s jump handler can `show(id)` a collapsed Optional item
     before scrolling to it (CLAUDE.md #12: a jump never lands on a closed container) — Day 4's own PageNav did
     not do this before. `OptionalSection` also gained a "Hide" control once opened, so collapsing is reversible
     without a reload, matching Day 3's `OptionalReveal`.
   - **The wide-screen page map pill only showed `Core`/`Optional` inside its hover/focus tooltip**, while the
     mobile list already showed it inline and always visible — an inconsistency the user caught directly. Both
     screen sizes now show it without needing to hover; CLAUDE.md #35 was tightened to require this explicitly.
   All three verified live (EN/DE, both routes); `npx tsc --noEmit` and `npm run verify:calc` pass.

## Coverage: where each task block is taught

| Block | Taught in | Help while answering |
|---|---|---|
| 1.1 emotions | A1, A2 (four emotions, pair tests, worked sort) | Test questions · check (count) + clue per item · reasoning after two checks · undo/redo |
| 1.2 triggers, lines not to send | A3 (trigger table, three honesty tests, checker) | Test questions · check (count) · the three tests |
| 1.3 approaches | A2, A3 (emotion first, then the action) | The frame · check (distinct emotion, trigger choice, a reason) + clue |
| 1.4 F1–F3, sentence, risks | A4 (five-step worked example on Brenner), A5 | Where the numbers are · formula + calculator with per-part clues · What to check |
| 1.5 reflection | A1, A4, A5 (coaching focus) | Worked answers for the mentor |
| 2.1 touchpoints | A6 (six needs, pair tests, worked example) | Test questions · check (count) + clue · reasoning · undo/redo |
| 2.2 needs, gaps | A6 (points rule, four kinds of gap) | Own tally · check against own tally · gap check |
| 2.3 measures | A7 (matching table, three score rules, budget) | Test questions · budget bar · coverage · check · order check |
| 2.4 loyalty concept | A5, A7 (four tests, cost formula) | Test questions · cost formula · check with clues |
| 3.1 vision | B1 (three tests of a vision) | Check + clue |
| 3.2 levers | B1 (question, signal, phase, system move) | Check (count) + clue |
| 3.3 ladder | B2 (data limit, responders, marginal test) | The ladder table · live responders and cost · check + clue |
| 3.4 loyalty system | B3 (four tests, limits a rating must respect) | Printed facts · check · reading of own choices |
| 3.5 risks | B4 (assumption, signal, trigger) | Grid of own risks · check + clue |
| 3.6 architecture | B5 (owner, start, trigger tests; consent first) | Owner test · budget bar · check (two rules) |
| 3.7 decision | B6 (regret, tripwire, pre-mortem) | Baselines · check (wait, metric, threshold) |
