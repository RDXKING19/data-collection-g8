# SurveyQuest — Grade 8 · Data Collection (TRD)

**Companion to:** `SurveyQuest_PRD.md` · **Repo name:** `G8-SurveyQuest-main`
**Clone source:** `angle-on-line-g7-main` (the shipped AngleQuest build; user-supplied; overrides the default `G2-Money-Money-main` per the TRD blueprint's "newer sibling as clone source" clause).
**Section order (per blueprint):** 1 Reference Analysis Notes → 2 Tech Stack → 3 Folder Structure → 4 State Management → 5 Component Specs (UI/UX, layouts, viewports) → 6 Data Layer → 7 Simulate Station Specs → 8 Audio Pipeline → 9 Gamification → 10 Design Tokens & Viewport → 11 Build/Deploy → 12 QA Plan → 13 Delivery Checklist → 14 Risks → Appendices.

**How this document was verified.** The reference zip was unpacked, read file by file and **built and run**. It was screenshotted at 1920×1080, 1366×768, 768×1024 and 390×844. The TRD's core logic (`dataMath.js`, the Station A population model, the `speak()` transform) was prototyped and unit-tested before being written in here (§6.4, §7, §8.2), and the blueprint dependency versions were installed and built against the reference. Findings marked **[verified]** were observed, not assumed.

---

## 1. Reference Analysis Notes

The reference ships with its own `docs/AngleQuest_PRD.md` and `docs/AngleQuest_TRD.md`, which describe an *intended* build. The **running code differs from those documents in places** (see 1.2), so this TRD takes the code as the source of truth for UI/UX, layout and architecture. The rule applied throughout: **take UI/UX, layout, viewport and component-chrome patterns from the reference; where the reference contradicts a fixed rule in the PRD/TRD blueprints or breaks at a supported viewport, the blueprint wins and the defect is not cloned.**

### 1.1 Blueprint §1 gotcha check — results against the actual repo

| # | Gotcha | Finding in reference **[verified]** | Action |
|---|---|---|---|
| 1 | Dead duplicate `src/features/*` | **No `features/` tree.** But three **orphaned files** exist: `simulations/CaseFileDetective.jsx` (never imported; the running Station D is `RadiantPointLab`), `hooks/useViewport.js` and `hooks/useAudio.js` (never imported). The reducer also carries dead state (`storyPanel`, `simStation`, `mode`, `questions`, `lives`, …) that no component reads. | Do not clone orphans. Wire the **Error-Detective as Station D** (blueprint §B.5.4). Delete `useViewport`/`useAudio` unless used (§5.1). Make Story/Simulate read their index from the reducer (§4). |
| 2 | Hard-coded story-panel count | **Already dynamic.** `StoryPhase.jsx` and the `NEXT_STORY_PANEL` reducer case use `STORY_PANELS.length`. `ADVANCE_SIM_STATION` hard-codes `Math.min(3, …)` (stations are fixed at 4). | Keep dynamic; SurveyQuest has **6 panels**. Replace the literal `3` with an exported `STATION_COUNT − 1`. |
| 3 | Static vs procedural bank | **Procedural** (`generateQuestion(world, slot, rng)`, seeded mulberry32 in `rng.js`, `generateBank(seed)` + `scripts/stress_test_bank.js`). **But** `PlayPhase` never uses `generateBank`/`questionBank`; it calls `generateQuestion` per session, so the 100-question bank is only exercised by the stress test. | Keep procedural + seeded RNG + stress test. Make `generateWorld`/`generateSession` the **single code path used by both the app and the tests** (§6.5), so the tested generator *is* the shipped one. |
| 4 | Viewport clipping (`top: 70px` / `100vh`) | **Root cause fixed:** `100dvh`, `useHeaderHeight` → `--header-h`, `main.app-main { padding-top: var(--header-h) }`, `zoom` removed. **Residual defects remain** (U1–U10 in PRD §12.2): hard-coded `vh` caps (`92vh`/`94vh`/`62vh`), a nav capsule that overflows below ~1000 px, a Simulate grid that goes two-column at `md` (768 px), cards with `overflow-hidden` that trap content on phones, an intro screen that cannot scroll. | Keep the dvh + measured-header foundation; apply the full fix list in §10. |
| 5 | Leftover branding strings | `index.html` and `README` are clean for AngleQuest, but `IntroScreen`, `ReflectPhase` (`CelebrationScreen`: "Singapore MOE Grade 7 Geometry Mastered!"), `TopNav` ("Case Panel n of 6", "Keep Investigating"), `PlayPhase` ("10 MOE Geometry Districts"), `package.json` (`angle-quest`), `docs/*` and `README` are AngleQuest-specific. The sentence "Singapore MOE-aligned" appears in several user-facing strings. | Rewrite every string (§13 `grep -ri` list). Do **not** claim "MOE-aligned" in user-facing copy until the syllabus mapping is confirmed (PRD §16a). |
| 6 | *(new)* Committed secret | `.env.local.example` contains what looks like a **real ElevenLabs key** (`sk_…`). | Ship a placeholder only; the reference's owner should **rotate that key** (§14 R2). |
| 7 | *(new)* Proxy path with no proxy | `audio.js` falls back to `POST /api/elevenlabs` when no `VITE_` key is set, but **no `api/` function exists** in the repo (a `vercel.json` rewrite even excludes `api/`). Without a key, dynamic narration silently 404s. | Implement `api/elevenlabs.js` (§8.4). |
| 8 | *(new)* Audio shipped | `public/assets/audio/` holds **27** pre-generated clips; `audioMap.js` maps them; all other lines are live-fetched. | Regenerate for SurveyQuest after content lock (§8.3). |

### 1.2 Code-level defects found in the reference (do not clone) **[verified by reading the code]**

| # | Defect | Effect | SurveyQuest decision |
|---|---|---|---|
| D1 | `PlayPhase.handleOptionSelect` calls `checkBadges({ totalCorrect: (onUpdateScore.totalCorrect \|\| 0) + 1, … })`. `onUpdateScore` is a **function**, so `.totalCorrect` is `undefined`; `totalAnswered` is also always 1; `simCompleted`, `worldResults` and `bossesDefeated` are never passed. | **Four of the eight badges can never unlock** (`sim_all`, `world_3star`, `boss_won`, `answered_20`); `streak_*` and `first_correct` only work via the passed `streak`. | One central **badge evaluator** effect in `App.jsx` over the reducer state (§4.3, §9). |
| D2 | Stars computed from the **raw** correct count (`calcStars(correct)`), but Guided/Boss have 5 questions and Timed 8. | A 5-question mode can never exceed 1★; thresholds are meaningless there. | `calcStarsNormalised(correct, total)` (PRD C1). |
| D3 | Timed Challenge uses one 60 s clock for the whole session, and `finishQuizSession` is called from inside an interval closure (`correctInSession` may be stale). | About 7 s per question; possible stale-count bug. | 60 s **per question**, session logic in the reducer (PRD C2, §4, §5.4). |
| D4 | Boss loss (lives = 0) just closes the quiz with no result and no message; a boss "win" is `lives > 0` read from state after the last answer. | Silent failure; races. | Explicit `boss-lost` / `boss-won` result screen from the reducer (§5.4). |
| D5 | `App` nav `goPhase` allows any forward jump. | Stations gate and world gate are bypassable (U8). | `furthestPhase` gating (§4.2). |
| D6 | `AngleSlider` hard-codes `°` and "Decrease 5°" titles. | Not reusable. | Generalise to `Stepper` (§3, §7). |
| D7 | `ProtractorWorkshop` drag uses window pointer events with no `touch-action: none` and no pointer capture. | Touch drags scroll the page (U9). | SurveyQuest stations need **no free dragging**: every control is a tap, stepper or native range input (§7). |
| D8 | `FeedbackOverlay`, modals and nav have no focus trap, no ARIA, no Escape handling; 0 `aria-*` attributes in the codebase; no `prefers-reduced-motion`. | Accessibility gaps (U9). | §5.8 and PRD §14. |
| D9 | `BossBattleModal` accepts `lives` but ignores it; reward text says "capture the suspect" (angles wording). | Dead prop; copy. | Use the prop; reword. |
| D10 | Story narration is hand-written separately from the on-screen `text`/`highlight`. | Spoken/on-screen drift risk (blueprint's "strict 1:1 parity"). | Narration is **derived from the same strings** through `speak()` (§8.2). |
| D11 | Story art: `story_N.png` files contain **JPEG** data (and `.jpg` twins exist). | Wrong MIME inference; duplicated assets. | Real PNGs only (§13). |

### 1.3 Reference patterns explicitly **adopted**

Glass-card / phase-band visual system and phase colour tokens; fluid `clamp()` type and spacing scale; the `TopNav` capsule with numbered phase pills, mute pill, Home and ✕, plus the Story progress track and the home-confirmation modal (R8 of the AngleQuest TRD); `FloatingSymbols` background (re-skinned); Story carousel with image fallback; Simulate 2-column shell with station tabs and gated CTA; the `Panel / Node / Msg / GoldBtn / GhostBtn` tone-kit; the practice stats bar (🔥 streak · ✨ XP · ❤️ lives · ⏱️ timer); the 10-world grid with "unlock if the previous world ≥ 1★"; `canvas-confetti` on completion; `say / ask / cheer / emphasize / think / instruct / celebrate` segment helpers; static-map → live-fetch → next-segment-preload playback queue; the Web-Audio click sound; seeded `rng.js`; `useHeaderHeight`.

### 1.4 Stack verification **[verified]**
- The reference as shipped (React 18.3.1, Vite 5.4, framer-motion 11, `@vitejs/plugin-react` 4) does `npm install && vite build` cleanly (dist ≈ 287 kB JS).
- The **blueprint's newer stack** (React `^19.2.7` → resolves 19.3.0; Vite `^8.1.0` → 8.3.4; `@vitejs/plugin-react` `^6.0.2` → 6.1.2; framer-motion `^12.42.0` → 12.43.0; Tailwind `^3.4.4` → 3.4.19; oxlint `^1.69.0` → 1.87.0) was installed over the reference and **also builds cleanly with no source changes** (dist ≈ 367 kB JS; `oxlint` reports warnings only). The blueprint's versions are therefore safe to adopt.
- `framer-motion` and `lucide-react` are declared in the reference's `package.json` but **imported nowhere**. Decision in §2.

---

## 2. Tech Stack

```json
{
  "name": "survey-quest",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "canvas-confetti": "^1.9.4",
    "framer-motion": "^12.42.0",
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  },
  "devDependencies": {
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.2",
    "autoprefixer": "^10.5.2",
    "dotenv": "^17.4.2",
    "node-fetch": "^3.3.2",
    "oxlint": "^1.69.0",
    "postcss": "^8.5.16",
    "tailwindcss": "^3.4.4",
    "vite": "^8.1.0"
  },
  "scripts": {
    "dev": "vite", "build": "vite build", "preview": "vite preview",
    "lint": "oxlint src scripts",
    "test": "node --test scripts/",
    "test:bank": "node scripts/stress_test_bank.js",
    "audit:audio": "node scripts/audio_parity.js",
    "generate-audio": "node scripts/generate_audio.js",
    "clean-audio": "node scripts/clean_audio.js"
  }
}
```

- **`lucide-react` is dropped** (blueprint lists it, the reference never imports it; emoji and inline SVG are the icon language). **`framer-motion` is kept and actually used**: `AnimatePresence` for modals/overlays/toasts and `useReducedMotion` for the motion preference (§5.7). If a stakeholder wants `lucide-react` retained, it is a one-line `package.json` change.
- `canvas-confetti` is kept (used on Reflect/Celebration).
- **Tests use Node's built-in runner** (`node --test`), so no new test dependency is added. Station logic is kept in pure `.js` modules (`dataMath.js`, `sampleModel.js`, `data/briefs.js`, `data/auditCases.js`) precisely so it can be tested without a DOM.
- `vite.config.js` (`base: '/'`, `server.port 3000`), `tailwind.config.js` (extend `fontFamily`, `fontSize` scale, phase and world colours as in the reference — reuse as is), `postcss.config.js`, `.oxlintrc.json` — reuse. `vercel.json`: keep the SPA rewrite `"/((?!assets/|api/).*)" → "/"` (it already excludes `api/`, which now exists, §8.4).
- Commit the generated `package-lock.json`.

---

## 3. Folder Structure

### 3.1 Target tree (NEW = write, MOD = modify from reference, REUSE = copy verbatim)

```
G8-SurveyQuest-main/
├── api/
│   └── elevenlabs.js                  # NEW  serverless TTS proxy (§8.4)
├── docs/                              # MOD  SurveyQuest_PRD.md, SurveyQuest_TRD.md, audio_generation_pipeline.md (reuse text)
├── public/
│   ├── favicon.svg                    # MOD  (survey/tally icon)
│   └── assets/{audio/, story/}        # story_1.png … story_6.png (1024×1024, true PNG)
├── scripts/
│   ├── generate_audio.js              # REUSE  (phrases = getAllNarration(), 500 ms rate limit, --force)
│   ├── clean_audio.js                 # REUSE
│   ├── stress_test_bank.js            # MOD  new assertions (§12.1)
│   ├── audio_parity.js                # NEW  (§12.3)
│   ├── viewport_check.mjs             # NEW  dev-only Playwright script (§12.5)
│   └── *.test.js                      # NEW  node:test unit tests (§12.2)
├── src/
│   ├── assets/story/                  # placeholders (imageBg/imageEmoji fallbacks in storyContent)
│   ├── components/
│   │   ├── TopNav.jsx                 # MOD  responsive + locked pills + a11y (§5.2)
│   │   ├── IntroScreen.jsx            # MOD  copy; scrollable root (§5.3)
│   │   ├── shared/
│   │   │   ├── Mascot.jsx             # MOD  copy only
│   │   │   ├── FeedbackOverlay.jsx    # MOD  a11y (focus trap, aria-live), 'badge' variant used
│   │   │   ├── FloatingSymbols.jsx    # MOD  data symbols, reduced-motion aware
│   │   │   ├── DataVisual.jsx         # NEW  replaces AngleVisual.jsx (§6.6)
│   │   │   ├── visuals/               # NEW  one small component per visual type
│   │   │   │   ├── TypeTree.jsx  SourceCard.jsx  DotCrowd.jsx  SystematicRow.jsx
│   │   │   │   ├── StrataBlocks.jsx  SurveyCard.jsx  TallyMarks.jsx  FreqTable.jsx
│   │   │   │   ├── IntervalLine.jsx  GroupedTable.jsx  PlanChecklist.jsx
│   │   │   └── Modal.jsx  useFocusTrap.js   # NEW  shared dialog shell used by all modals
│   │   ├── gamification/
│   │   │   ├── KingdomMap.jsx         # MOD  1-based labels, flex scroll, responsive grid
│   │   │   ├── BadgesModal.jsx        # MOD  adds boss-reward section
│   │   │   └── StarRating.jsx         # REUSE
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx   # MOD  swap visual; clamp() visual height; 'none' visual collapses
│   │   │   └── BossBattleModal.jsx    # MOD  uses `lives`; copy
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx        # MOD  content + DotCrowd hook visual
│   │   │   ├── StoryPhase.jsx         # MOD  controlled by reducer; responsive layout (§5.4)
│   │   │   ├── SimulatePhase.jsx      # MOD  4 new stations; lg two-column / tab-strip below (§5.5)
│   │   │   ├── PlayPhase.jsx          # MOD  reducer-driven session, 4 modes, per-question timer (§5.6)
│   │   │   └── ReflectPhase.jsx       # MOD  new recap + copy; CelebrationScreen copy
│   │   └── simulations/
│   │       ├── kit.jsx                # MOD  Panel/Node/Msg/GoldBtn/GhostBtn + Stepper (replaces AngleSlider)
│   │       ├── SampleLab.jsx          # NEW  Station A · Concept Discovery
│   │       ├── BinTheData.jsx         # NEW  Station B · Build-to-Target
│   │       ├── SurveyPlanner.jsx      # NEW  Station C · Composite
│   │       ├── SurveyAudit.jsx        # NEW  Station D · Error-Detective
│   │       └── Stations.css           # MOD  tally, dot-map and plan-card classes
│   ├── config/
│   │   ├── worlds.config.js           # MOD  PRD §8
│   │   ├── characters.config.js       # MOD  Priya / Jun Hao / Tally
│   │   └── audio.config.js            # REUSE
│   ├── hooks/
│   │   ├── useHeaderHeight.js         # REUSE
│   │   └── useMedia.js                # NEW  tiny matchMedia hook (replaces unused useViewport) — only if a component needs JS breakpoints
│   ├── data/
│   │   ├── storyContent.js            # MOD  6 panels (Appendix A)
│   │   ├── questionBank.js            # MOD  procedural 100 Qs (§6.5)
│   │   ├── pools.js                   # NEW  curated scenario/phrase pools (single-defensible-answer, reviewed)
│   │   ├── briefs.js                  # NEW  Station C briefs (§7.3)
│   │   ├── auditCases.js              # NEW  Station D case generators (§7.4)
│   │   └── recap.js                   # NEW  Reflect 3 recap questions (Appendix B)
│   ├── utils/
│   │   ├── audio.js                   # REUSE  (already has no speechSynthesis)
│   │   ├── audioMap.js                # auto-generated — never hand-edit
│   │   ├── narration.js               # MOD  speak() extended; derived story narration (§8.2)
│   │   ├── badgeEngine.js             # MOD  relabelled badges + boss rewards (§9)
│   │   ├── scoring.js                 # MOD  adds calcStarsNormalised
│   │   ├── rng.js                     # MOD  adds sample(arr,k), pickUnique helpers
│   │   ├── shuffle.js                 # REUSE
│   │   ├── dataMath.js                # NEW  statistical single source of truth (§6.4)
│   │   └── sampleModel.js             # NEW  Station A population model (§7.1)
│   ├── styles/
│   │   ├── design-tokens.css          # REUSE + data-visual tokens (§10)
│   │   └── globals.css                # MOD  viewport/layout fixes (§10)
│   ├── App.jsx                        # MOD  reducer, gating, badge evaluator (§4)
│   ├── main.jsx  index.css            # REUSE
├── index.html  package.json  vite.config.js  tailwind.config.js  postcss.config.js
├── vercel.json  .oxlintrc.json  .gitignore  .env.local.example  README.md
```
Do **not** create `src/features/`. Do **not** copy `AngleVisual.jsx`, `angleMath.js`, `ProtractorWorkshop.jsx`, `MatchTheMissingAngle.jsx`, `IntersectionPuzzle.jsx`, `RadiantPointLab.jsx`, `CaseFileDetective.jsx`, `useViewport.js`, `useAudio.js`, `.jpg` story twins, or the real key in `.env.local.example`.

### 3.2 Reference → target mapping
| Reference | Target |
|---|---|
| `components/shared/AngleVisual.jsx` | `shared/DataVisual.jsx` + `visuals/*` (rewritten, SVG) |
| `utils/angleMath.js` | `utils/dataMath.js` (+ `sampleModel.js`) |
| `simulations/ProtractorWorkshop` (A) | `SampleLab` (concept discovery) |
| `simulations/MatchTheMissingAngle` (B) | `BinTheData` (build-to-target) |
| `simulations/IntersectionPuzzle` (C) | `SurveyPlanner` (composite) |
| `simulations/RadiantPointLab` / `CaseFileDetective` (D) | `SurveyAudit` (error-detective) |
| `kit.jsx` `AngleSlider` | `kit.jsx` `Stepper` |
| `data/questionBank.js` (angle templates) | `data/questionBank.js` (survey templates) + `data/pools.js` |

---

## 4. State Management (`App.jsx`)

### 4.1 Reducer — fixed action set, plus documented additions
The blueprint's fixed set is kept **verbatim and actually used**: `SET_PHASE, NEXT_STORY_PANEL, PREV_STORY_PANEL, ADVANCE_SIM_STATION, PREV_SIM_STATION, COMPLETE_SIM_STATION, LOAD_QUESTIONS, ANSWER_CORRECT, ANSWER_INCORRECT, USE_HINT, CLEAR_FEEDBACK, PREV_QUESTION, NEXT_QUESTION, UNLOCK_BADGE, COMPLETE_PHASE, TOGGLE_AUDIO, RESET_SESSION`.
**Additions** (the reference already added `UPDATE_WORLD_RESULT`): `START_SESSION`, `FINISH_SESSION` (replaces `UPDATE_WORLD_RESULT`), `DISMISS_TOAST`, `GO_PHASE` (gated navigation, replaces raw `SET_PHASE` for nav clicks).

```js
export const STORY_COUNT = STORY_PANELS.length;   // 6 — never a literal
export const STATION_COUNT = 4;
export const PHASES = ['wonder', 'story', 'simulate', 'practice', 'reflect'];

const INITIAL_STATE = {
  phase: 'intro',                 // 'intro' | PHASES[i]
  furthestPhase: -1,              // index into PHASES; gates forward navigation (§4.2)
  storyPanel: 0,                  // controlled by StoryPhase
  simStation: 0, simCompleted: [false, false, false, false],
  worldResults: Array(10).fill(null),   // best stars per world; null = never finished
  session: null,                  // see 4.4
  xp: 0, streak: 0, bestStreak: 0,
  totalCorrect: 0, totalAnswered: 0, bossesDefeated: 0,
  badges: [],                     // trigger badge ids
  bossRewards: [],                // world indices whose boss reward has been earned
  toasts: [],                     // badge/boss toasts waiting to show
  audioEnabled: true, journeyComplete: false,
};
```
Rules:
- **Panel end:** `if (state.storyPanel >= STORY_COUNT - 1)` → `phase: 'simulate'`. Never a literal.
- **Streak** increments on `ANSWER_CORRECT`, resets on `ANSWER_INCORRECT`; `bestStreak = max(bestStreak, streak)`. Never derived from stars (the AngleQuest-era bug).
- **Stars:** `FINISH_SESSION` computes `calcStarsNormalised(correct, total)` and stores `max(previous ?? 0, stars)` (PRD C1).
- `RESET_SESSION` (Home/Restart) clears progress and keeps `audioEnabled`. The nav's Home button asks for confirmation whenever any XP, star or badge exists (reference behaviour, retained).

### 4.2 Phase gating (fixes U8 / D5)
`furthestPhase` is advanced only by the legitimate transitions: Wonder CTA → `1`, Story last panel → `2`, "Go to Practice" (needs `simCompleted.every(Boolean)`) → `3`, "Go to Reflect" (needs every world ≥ 1★) → `4`. `GO_PHASE` is a no-op for `index > furthestPhase`. `TopNav` renders pills for `index > furthestPhase` as locked (`aria-disabled`, 🔒). World-unlock and Reflect-gate rules live in two pure functions so stakeholders can change them in one place (PRD §16f):
```js
export const isWorldUnlocked = (results, i) => i === 0 || (results[i - 1] ?? 0) > 0;
export const canEnterReflect = results => results.every(r => (r ?? 0) > 0);
```

### 4.3 Central badge evaluator (fixes D1)
```js
useEffect(() => {
  for (const b of checkBadges(state)) dispatch({ type: 'UNLOCK_BADGE', payload: b.id });
}, [state.totalCorrect, state.totalAnswered, state.bestStreak, state.simCompleted,
    state.worldResults, state.bossesDefeated, state.journeyComplete]);
```
`UNLOCK_BADGE` is idempotent, appends to `badges` and pushes a toast (`FeedbackOverlay` `status="badge"`, non-blocking, auto-dismiss 4 s, `DISMISS_TOAST`). Boss reward badges are pushed by `FINISH_SESSION` (`bossRewards`), not by the evaluator. `COMPLETE_PHASE('reflect')` sets `journeyComplete` only; the evaluator awards `journey_complete`.

### 4.4 Practice session in the reducer (fixes D3/D4)
```js
session = {
  worldIdx, mode,                     // 'guided' | 'independent' | 'timed' | 'boss'
  questions,                          // generated for this session (§6.5)
  qIdx, correct, lives, hintLevel,
  answered: null,                     // { selected, isCorrect, timedOut } while feedback is open
  status: 'boss-intro' | 'quiz' | 'result',
  result: null,                       // { stars, correct, total, bossWon, bossLost }
};
```
`START_SESSION` builds `session` (and `status: 'boss-intro'` for boss); `ANSWER_*` records `answered`, adjusts `correct`/`lives`/`xp`/`streak`; `NEXT_QUESTION` advances or calls `FINISH_SESSION` (also when a boss has 0 lives or the last question is done); `USE_HINT` bumps `hintLevel` (Guided only, max 2). XP uses the reference `calcXP({ attempts: 1, hintsUsed: hintLevel, streak })` (single attempt per MCQ). Per-question **timer** state is local to `PlayPhase` (a `useEffect` keyed on `qIdx`) and dispatches `ANSWER_INCORRECT { timedOut: true }` at 0 (PRD C2).

---

## 5. Component Specs — UI/UX, Layouts and Viewports

All components keep the reference's visual language (§1.3). This section specifies **structure, responsive behaviour and a11y**; styling tokens are in §10.

### 5.1 Layout shell
```
<div.app-container>                 100dvh, flex-col, overflow hidden, cosmic background
  <TopNav/>                         position: fixed; height measured → --header-h
  <main.app-main>                   flex-1; min-h-0; padding-top: var(--header-h)
     <phase component/>             each phase root: flex-1 min-h-0, scrolls internally where needed
```
Rules: (1) **no `vh`** anywhere — use `dvh` or flex `min-h-0`; (2) every card that can exceed its container sets `overflow-y: auto` on the **card or its content column**, never `overflow-hidden` over required controls; (3) the intro root scrolls; (4) phase containers add `padding-bottom: env(safe-area-inset-bottom)`; the viewport meta already has `viewport-fit=cover`.

### 5.2 `TopNav` (fixes U1, U8)
- **≥ 1024 px:** reference layout — Home pill (left), centre capsule of 5 pills with `01…05` badges, icons and labels, Sound pill + ✕ (right).
- **640–1023 px:** pills keep numbers + icons; **labels shown only on the active pill**; capsule stays on the main row; Sound pill collapses to an icon button.
- **< 640 px:** two rows. Row 1: Home, Sound icon, ✕. Row 2: the capsule at full width, icon-only pills + the active label, `overflow-x: auto` with `scroll-snap-type: x proximity` as a last-resort safety net. The Story progress row ("Council File n of 6") sits below as in the reference.
- Pills: `button` elements, `aria-current="step"` on the active one, `aria-disabled="true"` + 🔒 on locked ones (click announces "Finish the previous phase first" via `aria-live`). Completed phases show ✓.
- `useHeaderHeight(ref)` re-measures on every size change, so the `--header-h` offset always matches the real header.
- Home confirmation modal uses the shared `Modal` (§5.8). Copy: "Return Home? Returning Home restarts your session and resets your streak." Buttons "Keep Going" / "Confirm Reset".

### 5.3 `IntroScreen`
Reference hero card (curriculum pill "✨ Grade 8 · Data Collection", title **Survey**Quest, mascot speech pill, journey flow card, Begin button, three feature cards: *Sampling & Bias*, *Survey Lab*, *10 Worlds*). Root container `overflow-y: auto`; content `min-h-full flex flex-col justify-center`. On heights < 720 px the three feature cards simply scroll below the fold instead of being clipped (fixes U5).

### 5.4 `WonderPhase` and `StoryPhase`
**Wonder.** Single glass card (reference layout), `max-w-2xl`, scrollable inside on short viewports. Content per PRD §7.1. Visual: `DotCrowd` (`N=200` dots representing the school; Jun Hao's 10 highlighted in the Sports Hall corner) with the stat line "9 of 10 friends said YES!". CTA "Open the Insight Desk →".

**Story (fixes U3).** Controlled by the reducer (`state.storyPanel`; the `onSlideChange` state hack in the reference is removed — `TopNav` reads progress directly).
```
.story-card   display:grid; gap; overflow-y:auto; max-height: calc(100dvh - var(--header-h) - var(--story-nav-h) - 16px)
  < lg:   1 column — image (aspect-square, max-height: min(40dvh, 360px)) above text
  ≥ lg:   2 columns — image left, text column right (text column scrolls if needed)
.story-nav    Back · dots · Next — flex-wrap; on < sm: Back/Next at 50% width each, dots on their own row; Next label "Next →" (full label from sm up)
```
Image: `/assets/story/story_N.png` with `onError` → `imageBg`/`imageEmoji` fallback (reference behaviour). `alt` = a short description from `storyContent` (`imageAlt`). The pull-quote and the mascot bubble are always visible by scrolling the text column — never clipped. Narration: `storyNarration(slideIdx)`; changing panel stops the previous clip.

### 5.5 `SimulatePhase` (fixes U4)
- **≥ 1024 px (`lg`):** reference 12-column grid — sidebar (4 cols: 4 station tabs + gated CTA) and workspace (8 cols). Tab: icon, "Station A: The Sample Lab", sub-line, status (🔓 / ✅ — not overlapping text; `truncate` + fixed-width status slot).
- **< 1024 px:** single column. A horizontal **station tab strip** (4 buttons: letter + icon, ✅ when done) sits above the workspace; the **whole card scrolls** (`overflow-y:auto`); the gated CTA is a footer under the workspace.
- Tabs are freely clickable (reference), but the CTA is gated by `simCompleted.every(Boolean)`; helper text "Complete all 4 stations to unlock Practice (n/4 done)" is visible whenever the CTA is disabled.
- Each station renders as `<Station key={i} onComplete={fn} audioEnabled={bool} />`; `COMPLETE_SIM_STATION` is dispatched with the station index. `simStationIntro(i)` narrates on tab change.
- Station minimum target size 44 px; station text ≥ 16 px (14 px only for secondary captions).

### 5.6 `PlayPhase` (fixes U2, D2–D4)
**Views:** (1) map + mode picker, (2) boss intro modal, (3) quiz, (4) result. All driven by `state.session`.

**Mode picker.** `grid-cols-2 lg:grid-cols-4`, icon + short name (Guided · Independent · Timed · Boss), `role="tablist"`. Helper line shows the selected mode's rules ("5 questions · hints on · no timer").

**World map (`KingdomMap`).** `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`; the grid's parent is a `flex-1 min-h-0 overflow-y-auto` region (no `max-h-[62vh]`). Tile: `World n` (1-based), emoji (🔒 when locked), name, boss name, `★` row, "Needs 1★ in World n−1". Tiles are `button`s (disabled when locked) with `aria-label="World 3, Population Plaza, 2 stars"`.

**Modes** (single source in `PlayPhase`/`config`):
```js
export const MODES = {
  guided:      { name: 'Guided Practice',      questions: 5,  slots: [0,1,2,3,4],           hints: true,  timed: false, lives: null },
  independent: { name: 'Independent Practice', questions: 10, slots: [0,1,2,3,4,5,6,7,8,9], hints: false, timed: false, lives: null },
  timed:       { name: 'Timed Challenge',      questions: 8,  slots: [2,3,4,5,6,7,8,9],     hints: false, timed: true,  lives: null },
  boss:        { name: 'Boss Battle',          questions: 5,  slots: [5,6,7,8,9],           hints: false, timed: false, lives: 3 },
};
export const TIMED_SECONDS_PER_QUESTION = 60;   // PRD C2 — one constant
export const TIMED_MODE = 'per-question';       // or 'session' (reference behaviour)
```
`slots` select which of the world's 10 generated questions are asked (slots 0–4 foundational, 5–9 harder, §6.5), so Guided is gentle and Boss is demanding while the world bank stays at exactly 10 questions. Each session regenerates the world with a fresh seed.

**Quiz view.** Stats bar (← Map · World name · Q n/total · 🔥 streak · ✨ XP · ❤️ lives or ⏱️ timer); `QuestionRenderer`; feedback overlay (correct/wrong + `explanation` + XP gained + any badge). Timer: turns rose and pulses at ≤ 10 s; reduced-motion users get no pulse.
**Result view.** Stars earned (normalised), correct n/total, best-so-far, boss result (won → reward badge name, lost → "Try again"), buttons "Back to Map" / "Try again". Lives lost, timed-out and hint counts are shown for Guided/Timed/Boss.

### 5.7 `QuestionRenderer`
Order: concept pill (`question.category` prettified — never the reason) → question text (`font-display`, `--fs-question-text`) → visual → hint banner (Guided) → 4 options → hint trigger. `<DataVisual type={question.visual} data={question.visualData} />` sits in a container `height: clamp(150px, 26dvh, 250px)`; when `visual === 'none'` the container is not rendered at all (many reasoning questions are text-only; a blank box is worse than none). Options: `grid-cols-1 md:grid-cols-2`, each ≥ 56 px tall, lettered A–D, `role="radiogroup"` / `role="radio"` with `aria-checked`, selectable by `1–4`/`A–D` keys. Text > 90 characters wraps at ≥ 16 px; no truncation. Maximum question length guideline: **35 words** (pool authoring rule, §12.2).

### 5.8 Modals, overlays and accessibility primitives
`Modal.jsx` (dialog shell used by Home-confirm, Boss intro, Badges, Feedback): `role="dialog"`, `aria-modal="true"`, labelled by its title, **focus trap** (`useFocusTrap`), `Escape` closes where closing is safe (Badges, Home-confirm; **not** the feedback overlay), focus returns to the trigger, `max-height: calc(100dvh - 2rem)` with internal scroll. Feedback and readouts use `aria-live="polite"`. `framer-motion` `AnimatePresence` animates open/close; if `useReducedMotion()` is true, transitions are instant. `FloatingSymbols` and bouncing CTAs are disabled under reduced motion.

### 5.9 `ReflectPhase` and `CelebrationScreen`
Reference flow: 3-question recap (Appendix B) → scorecard (Total XP, ⭐ n/30, 🔥 best streak, badges row, 10-cell World 1–10 strip) → reflection textarea (min 10 characters) → "Complete Mission 🎖️" → `CelebrationScreen` (confetti, "Insight Desk Chief!", XP and stars, "Start again"). The reflect card is `overflow-y: auto` within the measured content area. The celebration screen uses `h-full` of the app container, not `h-screen`.

### 5.10 Viewport behaviour matrix

| Viewport | Class | Nav | Story | Simulate | Map/mode tabs | Notes |
|---|---|---|---|---|---|---|
| 1920×1080 | Tier 1 | Full labels | 2 col, large image | 2 col | 5×2 grid, 4 tabs in a row | Cards cap at `max-w-6xl` |
| 1440×900 | Tier 1 | Full | 2 col | 2 col | 5×2, 4 tabs | — |
| **1366×768** (min laptop) | Tier 1 | Full | 2 col; text column scrolls; bubble visible | 2 col; compact paddings | 5×2, 4 tabs (no clipping) | Header ≈ 56–96 px; verified |
| 1024×768 (tablet land.) | Tier 1 | Full (`lg`) | 2 col | 2 col | 5×2, 4 tabs | `lg` = 1024 |
| **768×1024** (tablet port.) | Tier 1 | Icons + active label | 1 col | tab strip + workspace | 3×4 grid, 2×2 tabs | Stacked everywhere (fixes U1–U4) |
| **390×844** (phone port.) | Tier 2 | 2 rows | 1 col, image ≤ 40dvh | tab strip + scrolling card | 2×5 grid, 2×2 tabs | Everything reachable by scroll |

Pass criterion for every cell: no horizontal page scroll; no control under the header; every primary CTA reachable (visible, or inside a scroll container that can reach it); tap targets ≥ 44 px (Simulate/Practice).

---

## 6. Data Layer

### 6.1 `config/worlds.config.js`
Ten entries in the fixed shape `{ id, name, emoji, accent, description, conceptFocus, boss: { name, emoji, reward } }`, populated verbatim from PRD §8. Accents are the reference's unchanged `--world-0…9` values.

```js
export const WORLDS = [
  { id: 0, name: 'Data Desk',           emoji: '🗂️', accent: '#f472b6', conceptFocus: 'data-types',
    description: 'Sort data into categorical vs numerical, and discrete vs continuous.',
    boss: { name: 'The Mix-Up Merchant', emoji: '🌀', reward: 'Type Tracker' } },
  { id: 1, name: 'Source Street',       emoji: '🔭', accent: '#fb923c', conceptFocus: 'sources-methods',
    description: 'Primary or secondary? Pick the right collection method.',
    boss: { name: 'Hearsay Hank', emoji: '🗣️', reward: 'Source Spotter' } },
  { id: 2, name: 'Population Plaza',    emoji: '👥', accent: '#fbbf24', conceptFocus: 'population-sample',
    description: 'Population, sample and census, and when a census is not practical.',
    boss: { name: 'Everyone-Asker Ed', emoji: '📣', reward: 'Sample Savvy' } },
  { id: 3, name: 'Fair Draw Fountain',  emoji: '🎲', accent: '#4ade80', conceptFocus: 'sampling-methods',
    description: 'Random, systematic, stratified and convenience sampling, with the numbers.',
    boss: { name: 'Convenience Carl', emoji: '🛋️', reward: 'Fair Draw Master' } },
  { id: 4, name: 'Bias Bay',            emoji: '⚖️', accent: '#38bdf8', conceptFocus: 'bias-spotting',
    description: 'Spot the flaw in a sample or process and fix it.',
    boss: { name: 'The Cherry Picker', emoji: '🍒', reward: 'Bias Banisher' } },
  { id: 5, name: 'Question Quarter',    emoji: '❓', accent: '#818cf8', conceptFocus: 'question-design',
    description: 'Leading, double-barrelled and vague questions; options with gaps and overlaps.',
    boss: { name: 'Loaded-Question Lou', emoji: '🎯', reward: 'Question Crafter' } },
  { id: 6, name: 'Tally Terrace',       emoji: '✍️', accent: '#c084fc', conceptFocus: 'tally-frequency',
    description: 'Tally marks, frequency tables, totals and percentages.',
    boss: { name: 'The Miscounter', emoji: '🧮', reward: 'Tally Titan' } },
  { id: 7, name: 'Interval Island',     emoji: '🏝️', accent: '#22d3ee', conceptFocus: 'grouped-data',
    description: 'Class intervals, class width, boundary values and grouped tables.',
    boss: { name: 'The Overlapper', emoji: '🔀', reward: 'Interval Ace' } },
  { id: 8, name: 'Council Chamber',     emoji: '🏛️', accent: '#facc15', conceptFocus: 'real-world-planning',
    description: 'Plan and critique whole data collections for real school questions.',
    boss: { name: 'Rush-Job Rex', emoji: '⏱️', reward: 'Plan Perfect' } },
  { id: 9, name: 'Grand Survey Finale', emoji: '🏆', accent: '#f43f5e', conceptFocus: 'mixed-review',
    description: 'Hardest boss; mixes every question type from worlds 1–9.',
    boss: { name: 'The Grand Misleader', emoji: '🎩', reward: 'Insight Desk: Closed' } },
];
export const worldLabel = i => `World ${i + 1}`;      // UI is 1-based (PRD C5); ids stay 0–9
```

### 6.2 `config/characters.config.js`
```js
export const CHARACTERS = {
  priya:  { name: 'Priya',  role: 'Insight Desk Lead',   emoji: '👧', colour: '#f472b6', mascotEmoji: '🦉',
            bio: 'Methodical planner who never trusts a result until she knows how the data was collected.' },
  junhao: { name: 'Jun Hao', role: 'Council Secretary',  emoji: '👦', colour: '#38bdf8', mascotEmoji: '🦉',
            bio: 'Quick and enthusiastic; his shortcuts keep creating the mistakes the team has to fix.' },
  tally:  { name: 'Tally the Owl', role: 'Chief of Data', emoji: '🦉', colour: '#facc15', mascotEmoji: '🦉',
            bio: 'Clipboard-carrying mentor with tally-mark wing feathers.' },
};
export const MASCOT = { name: 'Tally', title: 'Tally the Owl', emoji: '🦉', badge: 'Insight Desk' };
```
`characterEmoji` in story panels comes from this file. (No name collision with the reference's `amirah/weijie`.)

### 6.3 `data/storyContent.js`
`STORY_PANELS` — **length 6**. Fixed shape `{ panel, title, text, highlight, character, characterEmoji, imageBg, imageEmoji }` **plus** the reference's optional `image`, `bubble` and a new `imageAlt` (a11y). Full copy is in **Appendix A**; titles and concepts follow PRD §7.2. On-screen text may use `%`, `≤`, `<`, `–`; every string reaches narration through `speak()` (§8.2), so spoken and written text cannot drift.

### 6.4 `utils/dataMath.js` — single source of statistical truth
Pure functions used by the **generator, the Simulate stations and the validators**, so each rule exists in exactly one place. The code below is **prototype-verified**: it was run against a 300-seed × 50-draw stress loop (systematic, stratified, percentage), grouping/boundary assertions, and a 300-seed × 3-round check of the Station B generator (target is "exact"; every other class width is *not* exact; boundary traps present; a start above the minimum leaves values uncovered).

```js
// utils/dataMath.js — single source of statistical truth (prototype for TRD §6.4)
export const INTERVAL_CONVENTION = 'left-closed'; // 'left-closed': a ≤ x < b | 'right-closed': a < x ≤ b
export const CLEAN_TOTALS = [10, 20, 25, 50, 100];
export const SAMPLING_FRACTIONS = [{ num: 1, den: 20 }, { num: 1, den: 10 }, { num: 1, den: 5 }, { num: 1, den: 4 }];
export const SYSTEMATIC_K = [4, 5, 8, 10, 20, 25];
export const CLASS_WIDTHS = [5, 10, 20];
export const MAX_TALLY = 25;

export const sum = a => a.reduce((s, x) => s + x, 0);
export const isInt = Number.isInteger;

/* ---------- percentages ---------- */
export function percentOf(freq, total) {
  const p = (freq * 100) / total;
  if (!isInt(p)) throw new Error(`percentOf(${freq},${total}) is not a whole number`);
  return p;
}

/* ---------- systematic sampling (rule N2) ---------- */
export function systematicInterval(N, n) {
  if (!isInt(N) || !isInt(n) || n <= 0 || N % n !== 0) throw new Error(`N=${N} not divisible by n=${n}`);
  return N / n;
}
export function genSystematic(rng) {
  const k = rng.pick(SYSTEMATIC_K);
  const nPool = [20, 25, 30, 40, 50].filter(n => n * k <= 1200);
  const n = rng.pick(nPool);
  const N = n * k;
  const start = rng.int(1, k);
  return { N, n, k, start, picks: Array.from({ length: n }, (_, i) => start + i * k) };
}
export function validateSystematic({ N, n, k, start, picks }) {
  return SYSTEMATIC_K.includes(k) && N === n * k && start >= 1 && start <= k &&
    picks.length === n && picks.every((p, i) => p === start + i * k) && picks[n - 1] <= N;
}

/* ---------- stratified sampling (rule N3) ---------- */
export function stratifiedAllocation(sizes, n) {
  const N = sum(sizes);
  return sizes.map(s => {
    const a = (s * n) / N;
    if (!isInt(a)) throw new Error(`Allocation ${s}×${n}/${N} is not whole`);
    return a;
  });
}
export function genStrata(rng, count = 3, maxN = 1200) {
  const frac = rng.pick(SAMPLING_FRACTIONS);
  const mMin = 4;                                           // each stratum contributes ≥ 4 sampled students
  const mMax = Math.min(40, Math.floor(maxN / frac.den / count));
  const mult = Array.from({ length: count }, () => rng.int(mMin, mMax));
  const sizes = mult.map(m => m * frac.den);
  const N = sum(sizes);
  const n = (N * frac.num) / frac.den;
  const alloc = sizes.map(s => (s * frac.num) / frac.den);
  return { sizes, N, n, alloc, frac };
}
export function validateStratified({ sizes, N, n, alloc }) {
  return sum(sizes) === N && alloc.every(a => isInt(a) && a >= 1) && sum(alloc) === n &&
    alloc.every((a, i) => a * N === sizes[i] * n);
}

/* ---------- class intervals (rule N4) ---------- */
export function makeClasses(start, width, count) {
  return Array.from({ length: count }, (_, i) => ({ lo: start + i * width, hi: start + (i + 1) * width }));
}
export function classLabel(c, kind = 'continuous', v = 'x', conv = INTERVAL_CONVENTION) {
  if (kind === 'discrete') return `${c.lo}–${c.hi - 1}`;
  return conv === 'left-closed' ? `${c.lo} ≤ ${v} < ${c.hi}` : `${c.lo} < ${v} ≤ ${c.hi}`;
}
export function classIndex(value, classes, conv = INTERVAL_CONVENTION) {
  return classes.findIndex(c => (conv === 'left-closed' ? value >= c.lo && value < c.hi : value > c.lo && value <= c.hi));
}
export function binData(data, classes, conv = INTERVAL_CONVENTION) {
  const counts = classes.map(() => 0);
  const uncovered = [];
  for (const v of data) {
    const i = classIndex(v, classes, conv);
    if (i < 0) uncovered.push(v); else counts[i]++;
  }
  return { counts, uncovered, total: sum(counts) };
}
export function validateClasses(classes) {
  if (!classes.length) return false;
  const w = classes[0].hi - classes[0].lo;
  return w > 0 && classes.every((c, i) => c.hi - c.lo === w && (i === 0 || classes[i - 1].hi === c.lo));
}
export function validateGrouping({ data, classes, counts }, conv = INTERVAL_CONVENTION) {
  const b = binData(data, classes, conv);
  return validateClasses(classes) && b.uncovered.length === 0 && b.total === data.length &&
    counts.length === classes.length && counts.every((c, i) => c === b.counts[i]) &&
    counts.filter(c => c === 0).length <= 1;
}

/* ---------- tally / frequency tables (rules N5, N6) ---------- */
export const tallyGroups = n => ({ fives: Math.floor(n / 5), rest: n % 5 });
export const validateFreqTable = (freqs, total) => freqs.every(f => isInt(f) && f >= 0) && sum(freqs) === total;
export const validateTally = n => isInt(n) && n >= 1 && n <= MAX_TALLY;

/* ---------- binning-station evaluator + generator (Station B) ---------- */
// The student controls `start` and `width`; the number of classes is derived so the last class always reaches the maximum.
export function evaluateBinning({ data, start, width }, conv = INTERVAL_CONVENTION) {
  const max = Math.max(...data);
  const count = max >= start ? Math.floor((max - start) / width) + 1 : 1;
  const classes = makeClasses(start, width, count);
  const { counts, uncovered } = binData(data, classes, conv);
  const covered = uncovered.length === 0;
  const empties = counts.filter(c => c === 0).length;
  let status = 'off';
  if (covered && count >= 5 && count <= 7 && empties <= 1) status = 'exact';
  else if (covered && (count === 4 || count === 8) && empties <= 1) status = 'near';
  return { classes, counts, uncovered, covered, count, status };
}
export function genBinData(rng, round = 1, size = 24) {
  const width = round === 3 ? 5 : rng.pick([10, 20]);
  const count = rng.int(5, 7);
  const start = width * rng.int(0, 3);
  const lo = start, hi = start + width * count;              // data lie in [lo, hi)
  const boundaries = Array.from({ length: count - 1 }, (_, i) => start + (i + 1) * width);
  const nBoundary = round === 3 ? 2 : 1;                      // trap values sitting exactly on class boundaries
  for (let tries = 0; tries < 500; tries++) {
    const data = [lo, hi - 1];                                 // pin the extremes so the target class count is unambiguous
    for (let k = 0; k < nBoundary; k++) data.push(rng.pick(boundaries));
    while (data.length < size) data.push(rng.int(lo, hi - 1));
    const shuffled = rng.shuffle(data);
    const ev = evaluateBinning({ data: shuffled, start, width });
    if (ev.status === 'exact') return { data: shuffled, target: { start, width, count } };
  }
  throw new Error('genBinData exhausted');
}

/* ---------- distractors ---------- */
export function makeDistractors(correct, candidates, rng, count = 3, { valid = () => true, step = 1 } = {}) {
  const out = [];
  for (const c of candidates) {
    if (c != null && c !== correct && valid(c) && !out.includes(c)) out.push(c);
    if (out.length === count) return out;
  }
  for (let k = 1; out.length < count && k < 50; k++) {
    for (const c of [correct + k * step, correct - k * step]) {
      if (valid(c) && c !== correct && !out.includes(c)) out.push(c);
      if (out.length === count) break;
    }
  }
  return out.slice(0, count);
}
```
**Hard rules** (PRD §8 N1–N7): (1) percentage items use `CLEAN_TOTALS` only (200 was removed during prototyping: an odd frequency out of 200 gives a half-percent); (2) systematic N ÷ n is a whole `k ∈ SYSTEMATIC_K`; (3) strata sizes are multiples of the fraction's denominator, so allocations are whole and sum to n; (4) all classes are equal-width, contiguous and cover every value; the interval convention is the single `INTERVAL_CONVENTION` constant (PRD §16b); (5) tally counts ≤ 25; (6) any frequency table shown sums to its stated total; (7) pool text passes the context-hygiene review (§12.2).

On screen, numbers ≥ 1 000 are formatted with a **narrow no-break space** (`1 200`, U+202F) by `fmtNum()` so `speak()` can tell a thousands separator from two adjacent numbers (§8.2).

### 6.5 `data/questionBank.js` — procedural generation

**API** (the tested generator *is* the shipped generator):
```js
export const DISTRICTS = WORLDS.map(w => ({ id: w.id, name: w.name, icon: w.emoji, accent: w.accent,
                                            conceptFocus: w.conceptFocus, description: w.description, boss: w.boss }));
export function generateWorld(worldId, rng, { withMeta = false } = {})  // → 10 questions (slots 0–9)
export function generateBank(seed = 12345, opts)                         // → 100 questions, world-major
export function generateSession(worldId, modeId, rng)                    // → MODES[modeId].slots.map(s => world[s])
```
`PlayPhase` calls `generateSession`; `scripts/stress_test_bank.js` calls `generateBank` (which calls `generateWorld`). There is no second code path.

**Output schema (fixed, do not change):**
```js
{ id, districtId, category, visual, questionText, options: [String ×4], correctAnswer,
  explanation, hint1, hint2, visualData }
```
`id = "w{world}-s{slot}"`, `districtId = worldId`, `category = WORLDS[world].conceptFocus`, `visual` equals the `DataVisual` type (or `'none'`). **Templates also return `_meta`** (`{ template, slot, tier, distractors: [{ value, src }] }`), kept only when `withMeta` is true; the stress test uses it and the app never sees it, so the schema stays fixed.

**Slot tiers.** Slots 0–4 are *foundation* and 5–9 are *challenge*; `MODES[...].slots` (§5.6) picks which are asked. Each template is assigned fixed slots (table below) so every world always contains both tiers.

**Authoring rules for every template**
1. Numeric inputs come from the clean pools in §6.4; scenario text comes from `data/pools.js` (curated, each entry having **one defensible answer** and a `rationale`); never free-form random text.
2. Exactly 4 options: 1 correct + 3 distractors, each distractor tagged with a **misconception id** from the registry below (at most **one** `M40 arith-neighbour` filler per question).
3. Within a world, `questionText` is unique across the 10 slots (pool cursor draws without replacement, `rng.sample`).
4. `explanation` states the value/answer **and** the principle in full words; `hint1` names the idea or first step; `hint2` walks the working. Neither hint ever states the answer.
5. Question text ≤ 35 words; no real brands, schools or people; no sensitive survey topics (PRD N7).
6. Option text is symmetric in length/shape where possible (so the correct option is not the longest).

**Misconception registry** (every distractor's `src` must be one of these; asserted in §12.1)

| id | Misconception | id | Misconception |
|---|---|---|---|
| M01 | Label numerals treated as numerical (bus no., jersey no.) | M22 | Adds groups + strokes instead of 5 × groups + strokes |
| M02 | Rounded measurement treated as discrete | M23 | Wrong subtraction when completing a total |
| M03 | Discrete/continuous swapped | M24 | Percentage inverted (total ÷ frequency × …) |
| M04 | "I read it, so I collected it" (secondary → primary) | M25 | Percentage of the wrong base |
| M05 | Method mismatch (questionnaire for a behaviour count, etc.) | M26 | Boundary value put in the lower class |
| M06 | Sample and population confused | M27 | Counts classes instead of class width |
| M07 | "Ask everyone is always best" (census) | M28 | Class width read as the upper boundary |
| M08 | Bigger sample fixes bias | M29 | Gapped classes accepted for continuous data |
| M09 | Systematic interval = n | M30 | Overlapping classes accepted |
| M10 | Systematic interval = N − n | M31 | Bias type mislabelled (voluntary ↔ convenience ↔ undercoverage ↔ non-response) |
| M11 | Stratified allocation as an equal split | M32 | "Online polls are random" |
| M12 | Stratum size used as the allocation | M33 | "Random means unplanned / convenient" |
| M13 | Sampling fraction inverted (N ÷ n) | M34 | Wrong time/place accepted as representative |
| M14 | Leading question not recognised | M35 | Secondary data assumed to be always inferior / always better |
| M15 | Double-barrelled question not recognised | M36 | Discrete mislabelled as categorical (numerals) |
| M16 | Overlapping options not recognised | M37 | Primary data = "uses numbers" |
| M17 | Gaps in options not recognised | M38 | Tally grouping misread (rest ignored) |
| M20 | Tally group counted as 4 | M39 | "More options is always better" |
| M21 | Counts groups only, ignores extra strokes | **M40** | Arithmetic neighbour (±step filler, ≤ 1 per question) |

**Template catalogue** (slot assignments; `T` = tier, F = slots 0–4, C = slots 5–9)

| World | Template (slots) | Visual | Answer logic | Main distractor sources |
|---|---|---|---|---|
| **0 Data Desk** | `whichIsCategorical` (0,3) | `none` | one categorical among 3 numerical variables from pools (or the reverse for "numerical") | M01, M03 |
| | `labelNumeral` (1,5) | `type-tree` | numerals used as labels (bus no., jersey no., locker no., class code) → Categorical | M01, M36 |
| | `discreteOrContinuous` (2,4,6) | `type-tree` | counted → discrete, measured → continuous | M03, M01 |
| | `roundedMeasurement` (7,8) | `type-tree` | measured then rounded (height to nearest cm) → continuous | M02, M03 |
| | `classifyFromList` (9) | `none` | which of 4 listed variables is numerical-discrete | M01, M02, M03 |
| **1 Source Street** | `primaryOrSecondary` (0,1,5,8) | `source-card` | collected first-hand vs existing records | M04, M37, M35 |
| | `bestMethod` (2,3,4,6) | `source-card` | scenario → questionnaire / interview / observation / experiment / records | M05 |
| | `methodFits` (7) | `none` | which situation suits an interview best | M05 |
| | `sourceDrawback` (9) | `none` | one real drawback of secondary data (collected for another purpose, may be out of date) | M35, M37 |
| **2 Population Plaza** | `identifySample` (0,1,4) | `dot-crowd` | N students, n surveyed → name the sample / population | M06 |
| | `whyNotCensus` (2,3,6) | `none` | destructive testing, too large/slow/costly | M07, M06 |
| | `sampleOrPopulation` (5,7) | `none` | classify a statement as describing a sample or the population | M06 |
| | `samplingFraction` (8,9) | `dot-crowd` | n of N as a whole percent (N ∈ {200,400,500,1 000,1 200}, n = 5/10/20/25 %) | M13, M24, M23 |
| **3 Fair Draw** | `whichMethod` (0,1,2) | `none` / `dot-crowd` | description → random / systematic / stratified / convenience | M33, M14→M31 |
| | `systematicK` (3,5,7) | `systematic-row` | k = N ÷ n | M09, M10 |
| | `stratifiedAlloc` (4,6,8,9) | `strata-blocks` | allocation for one stratum | M11, M12, M13 |
| **4 Bias Bay** | `nameTheBias` (0,1,3,5) | `none` | scenario → convenience / voluntary response / undercoverage / non-response | M31, M32 |
| | `whyUnreliable` (2,4,7) | `dot-crowd` | big but biased sample ("why can't it be trusted?") — **the core misconception** | M08, M34 |
| | `bestFix` (6,8,9) | `none` | which change makes the sample fairer | M08, M34, M33 |
| **5 Question Quarter** | `fairestQuestion` (0,1,4) | `survey-card` | choose the neutral wording / identify the leading one | M14 |
| | `doubleBarrelled` (2,5) | `survey-card` | question asking two things at once | M15 |
| | `optionsFlaw` (3,6,8) | `survey-card` | overlap or gap in options (marks revealed only in the explanation) | M16, M17 |
| | `betterOptions` (7,9) | `survey-card` | pick the exhaustive, non-overlapping set | M16, M17, M39 |
| **6 Tally Terrace** | `readTally` (0,1,4) | `tally` | frequency from a tally (≤ 25) | M20, M21, M22 |
| | `missingFrequency` (2,5,8) | `freq-table` | total − known frequencies | M23, M40 |
| | `percentOfTotal` (3,6) | `freq-table` | whole-number percent from `CLEAN_TOTALS` | M24, M25 |
| | `largestCategory` (7) | `freq-table` | category with the highest frequency | M38 |
| | `extendTally` (9) | `tally` | add k more strokes → new frequency | M22, M40 |
| **7 Interval Island** | `classOfValue` (0,1,3) | `interval-line` | which class holds a value (boundary-heavy) under the active convention | M26 |
| | `classWidth` (2,4) | `grouped-table` | hi − lo | M27, M28 |
| | `frequencyInClass` (5,7) | `grouped-table` | count from a data list (12–16 values) | M26, M40 |
| | `validClasses` (6,8) | `interval-line` | the set with no gaps/overlaps covering the data | M29, M30 |
| | `chooseClassWidth` (9) | `grouped-table` | width giving 5–7 classes for the range | M27, M40 |
| **8 Council Chamber** | `flawInPlan` (0,2,4,7) | `plan-checklist` | plan text → the main flaw | M08, M34, M33, M31 |
| | `planFor` (1,3,6) | `plan-checklist` | brief → best data type / method / sampling | M05, M01, M03 |
| | `strataContext` (5,8) | `strata-blocks` | stratified numbers in a school context (e.g. 300/280/260/160 → Sec 3 = 26) | M11, M12, M13 |
| | `systematicContext` (9) | `systematic-row` | k from a register size and sample size | M09, M10 |
| **9 Grand Finale** | `mixed` (0–7) | per source | weighted draw from worlds 0–8 templates (≥ 5 distinct source worlds) | as source |
| | `integrated` (8,9) | `plan-checklist` | two-step items (e.g. stratified allocation **and** which sampling method it is) | M11, M12, M31 |

**Bank invariants** (asserted in §12.1): 100 questions; 10 distinct `questionText` per world; world 9 contains items from ≥ 5 source worlds; every `correctAnswer ∈ options`; no `NaN`/`undefined` in any string.

### 6.6 `shared/DataVisual.jsx` (+ `visuals/*`)
`<DataVisual type data compact />` — pure SVG (HTML table for `freq-table`/`grouped-table`), default `viewBox="0 0 320 220"`, colours from CSS variables only, `role="img"` with an `aria-label` generated from `data`. `compact` reduces stroke and label size for the Play inline context. `type: 'none'` renders nothing.

| `type` | `data` | Renders |
|---|---|---|
| `type-tree` | `{ variable, path: ['numerical','discrete'] }` | Data → Categorical / Numerical → Discrete / Continuous, with the correct path lit and the variable named |
| `source-card` | `{ source: 'primary'\|'secondary', method, caption }` | Icon card (clipboard, speech bubble, eye, flask/stopwatch, filing box) with a Primary/Secondary tag |
| `dot-crowd` | `{ N, highlight?: ids\|{zone}, zones?: bool, label }` | Grid of up to 200 dots (1 dot = N/200 students when N > 200, caption says so); highlighted subset in the accent colour; optional labelled zones |
| `systematic-row` | `{ N, n, k, start }` | A row of numbered slots showing the first few picks (start, start+k, …) then "…" and the last pick |
| `strata-blocks` | `{ strata: [{ name, size, alloc? }], n, unknownIdx? }` | Proportional-width blocks per stratum; the unknown allocation shown as "?" |
| `survey-card` | `{ question, options: [...], reveal?: [{ type: 'overlap'\|'gap', at }] }` | A questionnaire card; `reveal` marks are drawn **only after the answer** (in the feedback explanation) |
| `tally` | `{ count }` | Strokes in groups of five (four strokes + diagonal), ≤ 25, with text "tally" label |
| `freq-table` | `{ rows: [{ label, freq\|null }], total, unknownIdx? }` | Frequency table with an optional "?" cell and total row |
| `interval-line` | `{ classes, marker?, convention }` | Number line with `[`/`)` (or `(`/`]`) brackets per convention and a marker for the value |
| `grouped-table` | `{ classes, counts\|null, data?, kind }` | Class-interval table (labels via `classLabel`), optional raw data strip |
| `plan-checklist` | `{ steps: [{ label, status }] }` | Four-step plan card with ✓/✗/… statuses |

Every region/cell carries a **text label**; colour is never the only signal (PRD §14). `visualData` is whatever the visual needs — nothing in it states the answer unless the question's wording already does.

---

## 7. Simulate Station Specs

**Contract (all four)** — unchanged from the blueprint and the reference:
```jsx
<Station onComplete={fn} audioEnabled={bool} />
```
Self-contained state; live SVG visuals themed with CSS variables (never hard-coded colours); a `station-success` panel with a **"Complete Station ✓"** button calling `onComplete`; wrapped in the `kit.jsx` `Panel`. **No free-drag interaction is required anywhere** — every control is a tap, a `Stepper` (−/+ buttons plus a native `<input type="range">` where a slider helps) or a keyboard-operable option — which removes the reference's touch-drag problem (D7) and makes every station operable by keyboard alone (arrow keys on a focused range/stepper; `Shift` = larger step). Interactive targets ≥ 44 px. Readouts use `aria-live="polite"`.

`kit.jsx` generalises `AngleSlider` into:
```jsx
<Stepper label unit min max step value onChange />   // −  [range]  +   ·  aria-valuetext = `${value} ${unit}`
```

### 7.1 Station A · `SampleLab` — Concept Discovery ("The Sample Lab")
**Model** (`utils/sampleModel.js`, prototype-verified: 400 draws per cell — Convenience ≈ **80 %** at every size with spread shrinking 12.6 → 2.6 points from n = 10 to 60; Random ≈ **50 %** with spread 16.1 → 5.5):

```js
// utils/sampleModel.js — Station A population (prototype)
export const ZONES = [
  { id: 'hall',  name: 'Sports Hall',  size: 40, yes: 36 },
  { id: 'cant',  name: 'Canteen',      size: 40, yes: 28 },
  { id: 'class', name: 'Classrooms',   size: 40, yes: 20 },
  { id: 'lib',   name: 'Library',      size: 40, yes: 12 },
  { id: 'music', name: 'Music Room',   size: 40, yes: 4 },
];
export const SIZES = [10, 20, 40, 60];
export const CONVENIENCE_POOL_ZONES = ['hall', 'cant'];
export function buildPopulation() {
  const pop = []; let id = 0;
  for (const z of ZONES) for (let i = 0; i < z.size; i++) pop.push({ id: id++, zone: z.id, yes: i < z.yes });
  return pop;
}
export const truth = pop => pop.filter(p => p.yes).length / pop.length;
export function draw(pop, mode, n, rng) {
  const pool = mode === 'convenience' ? pop.filter(p => CONVENIENCE_POOL_ZONES.includes(p.zone)) : pop;
  const idx = rng.shuffle(pool.map((_, i) => i)).slice(0, n);
  const chosen = idx.map(i => pool[i]);
  return { chosen, yes: chosen.filter(p => p.yes).length, pct: Math.round(100 * chosen.filter(p => p.yes).length / n) };
}
```
- 200 students in five zones; the true yes-share is exactly 50 %; the Convenience pool (Sports Hall + Canteen, 80 students) is 80 % yes. **Bigger Convenience samples stay at ≈ 80 %, only more precisely**, which is the misconception the station dismantles.
- `rng` is created once per mount with a random seed; the gate logic never depends on the particular values drawn.

**State:** `mode` ('convenience' | 'random'), `size` (10/20/40/60), `draws: [{ mode, size, pct }]`, `revealed`, `quizAnswer`, `done`.
**UI:** left — school map (`DotCrowd` with zone labels, chosen students lit); right — readout ("7 of 10 said yes = 70 %") and the **estimate strip** (0–100 %, one dot per draw, colour/shape differs by mode, legend text labels). Controls: mode toggle (two large buttons, `aria-pressed`), size `Stepper` (steps through [10,20,40,60]), **Draw sample**, **Reveal the whole school** (disabled until the gate below is met; draws the hidden 50 % line and the 80 % convenience-pool line), **Clear draws**.
**Gate (understanding):** ≥ 3 draws in each mode **and** ≥ 2 distinct sizes among the convenience draws **and** Reveal pressed → the confirmation MCQ appears: *"Why did the convenience estimates stay wrong even when the sample got bigger?"* → **"The way students were chosen leaves out many of the school, and a bigger sample doesn't fix that."** (Distractors: "The sample was still too small." / "The voting was random." / "The dots moved.") Wrong → `Msg tone="rose"` with a nudge ("Look at where the convenience dots sit as the sample grows"), retry, no penalty. Correct → success panel + **Complete Station ✓**.
**Reduced motion:** dot "drop" animation is replaced by an instant placement.

### 7.2 Station B · `BinTheData` — Build-to-Target ("Bin the Data")
**Evaluator and generator** are in `dataMath.js` (§6.4): `evaluateBinning({ data, start, width })` derives the class count from the maximum, so the student only controls `start` and `width`; `genBinData(rng, round)` builds 24 integer values with pinned extremes, 1 (rounds 1–2) or 2 (round 3) values exactly on class boundaries, and **a unique sensible width** (the other candidate widths give < 5 or > 7 classes).
**State:** `round` (1–3), `data`, `start`, `width`, `confirmed` boundary answer (round 3), `solved[round]`, `done`.
**UI:** a number line (`IntervalLine`) with class brackets and data dots falling into place; a live table (`GroupedTable`) with tally strokes per class; readout "6 equal classes · all 24 values placed · total 24". Controls: **class width** `Stepper` over [5, 10, 20]; **starting boundary** `Stepper` (steps of the current width, `min = 0`); **Check**; **New data**.
**Status ring** (also text): **Exact** (green) — covered, 5–7 classes, ≤ 1 empty class; **Almost** (amber) — covered with 4 or 8 classes; **Not yet** (rose) — otherwise, with the reason ("2 values fall below the first class", "too many classes"). **Check** accepts only **Exact** (tolerance is guidance, not acceptance — reference behaviour). Round 3 adds a one-tap question after Check: "Which class holds the value *k* that sits exactly on a boundary?" (answers from `classLabel` under the active convention).
**Gate:** 3 solved rounds (each after **New data**), round 3's boundary question answered correctly.

### 7.3 Station C · `SurveyPlanner` — Composite ("Survey Planner")
**Data** (`data/briefs.js`): each brief is
```js
{ id, title, question, slots: {
    type:       { options: [{ text, correct, src }], why },
    method:     { options: [...], why },
    sampling:   { options: [...], why, numeric?: { kind: 'stratified'|'systematic', facts, prompt, answer } },
    instrument: { options: [...], why },
}, runNotes: { good: '…', byFlaw: { [src]: '…' } } }
```
Three briefs (all numbers from `dataMath` pools; wording from `pools.js`):

| Brief | ① Data type | ② Source & method | ③ Sampling (+ number) | ④ Instrument |
|---|---|---|---|---|
| **1 · Travel time to school** | **Numerical, continuous** ✓ / numerical discrete / categorical / cannot classify | **Questionnaire to students (primary)** ✓ / last year's bus-tap data only (secondary, bus riders only) / interview teachers / watch the gate for one morning | **Stratified by level, sample 100 from 300/280/260/160 — Sec 3 gets 26** ✓ (stepper) / first 100 at the gate / Sec 1 only / Instagram volunteers | **"How long does your journey usually take?" with *Less than 15 min · 15 to under 30 · 30 to under 45 · 45 or more*** ✓ / overlapping `0–15, 15–30, 30–45, 45+` / leading "Isn't your long journey exhausting?" / double-barrelled "How long and how tiring…?" |
| **2 · Weeknight homework hours** | **Numerical, continuous** ✓ … | **Questionnaire (primary)** ✓ / national report (secondary, not our students) / observe students at home / experiment | **Systematic: register of 240, sample 30 → every 8th** ✓ (stepper) / every 30th / every 210th / first 30 names | **Options *Less than 1 h · 1 to under 2 · 2 to under 3 · 3 or more*** ✓ / `0–1, 1–2, 2–3` overlap / `0–1, 2–3` gap / leading |
| **3 · Recycling-bin use at recess** | **Numerical, discrete** (a count) ✓ … | **Observation at the bins (primary)** ✓ / questionnaire "do you recycle?" / last year's bin-purchase records / interview the cleaner | **Observe on 10 randomly chosen school days across the term** ✓ / the first Monday only / rainy days only / one minute | **Tally sheet with time bands `10:00–10:09 · 10:10–10:19 · 10:20–10:29`** ✓ / overlapping bands / bands with a gap / one box "lots" |

**State:** `briefIdx` (0–1 cycle through 2 of 3 briefs, chosen at random), `picks`, `lamps[4]` (`'idle'|'ok'|'bad'`), `numericAnswer`, `run` (null | result), `completed`.
**UI:** a **Plan Card** (four slots ①–④ filled live), the picker for the active slot (3–4 option cards, tap to choose; slot ③ also shows the numeric `Stepper` with its facts), **Plan Health** (four lamps with ✓/✗ and words), **Run the survey** (enabled once all four slots are chosen). `runPlan(plan)` is a pure function returning `{ health: [bool×4], notes: [...] }`: a sound plan plays a short "Clean data ✓" tally animation; each flawed slot shows its `runNotes.byFlaw[src]` ("Your sample only reached people near the Sports Hall") and the principle in full words, and the student re-picks that slot. **A flawed choice never blocks**; a lamp turns green only when the slot (and, for ③, the number) is correct.
**Gate:** 2 briefs completed with all four lamps green. Reduced motion: the animation is a static result card.

### 7.4 Station D · `SurveyAudit` — Error-Detective ("Inspector Tally's Survey Audit")
A worked report (4 lines: **Aim / Method / Working / Conclusion**) with exactly one seeded flaw. Generators live in `data/auditCases.js` and are **prototype-verified** (300 seeds × 8 flaws: 4 lines; one faulty line in 1–4; exactly one correct fix and 3 distinct texts; the wrong working is provably wrong from its `facts` and the correct fix provably right — equal split ≠ proportional allocation; `5g + r` vs `4g + r`; boundary value's true class ≠ the stated class; overlap options really share an endpoint; type/source labels really differ).

```js
// data/auditCases.js — Station D seeded-flaw generators (prototype for TRD §7.4)
import { genStrata, stratifiedAllocation, makeClasses, classIndex, classLabel, sum } from './dataMath.js';

export const FLAW_KEYS = ['big-biased', 'leading', 'overlap-options', 'equal-split', 'tally-cluster', 'boundary-class', 'type-mislabel', 'source-mislabel'];
const L = (n, label, text) => ({ n, label, text });
const mk = (flaw, title, lines, faultyLine, rightFix, wrongFixes, explanation, facts = {}) =>
  ({ flaw, title, lines, faultyLine, fixes: [{ text: rightFix, correct: true }, ...wrongFixes.map(t => ({ text: t, correct: false }))], explanation, facts });

const GROUPS = ['basketball team', 'robotics club', 'choir', 'library prefects'];
const BUILDERS = {
  'big-biased': rng => {
    const g = rng.pick(GROUPS), n = rng.pick([100, 150, 200, 300, 400]);
    return mk('big-biased', 'The Big but Biased Survey',
      [L(1, 'Aim', 'Find the favourite CCA of the whole school.'), L(2, 'Method', `Survey ${n} students, all from the ${g}.`),
       L(3, 'Working', `${n} is a very large sample, so the result is reliable.`), L(4, 'Conclusion', `The ${g} is the school's favourite CCA.`)],
      3, 'Large is not enough: students must be chosen fairly from the whole school, because one group does not represent everyone.',
      [`Survey even more students from the ${g}.`, `Survey only 10 students so the result is easier to check.`],
      'How a sample is chosen matters more than how big it is.', { n, group: g });
  },
  'leading': rng => {
    const topic = rng.pick([['canteen food', 'too expensive'], ['recess', 'far too short'], ['school bags', 'too heavy']]);
    return mk('leading', 'The Pushy Question',
      [L(1, 'Aim', `Find out what students think about ${topic[0]}.`), L(2, 'Method', `Ask: "Don't you agree the ${topic[0]} is ${topic[1]}?"`),
       L(3, 'Working', 'Record how many students answer yes.'), L(4, 'Conclusion', `Most students think the ${topic[0]} is ${topic[1]}.`)],
      2, `Ask a neutral question: "How would you rate the ${topic[0]}?" with options from very poor to very good.`,
      [`Ask: "Surely the ${topic[0]} is ${topic[1]}, isn't it?"`, `Ask: "Do you hate the ${topic[0]}?"`],
      'A leading question pushes people towards one answer.', { topic });
  },
  'overlap-options': rng => {
    const a = rng.pick([1, 2]);
    const wrong = [[0, a], [a, a + 1], [a + 1, a + 2]];
    return mk('overlap-options', 'The Overlapping Options',
      [L(1, 'Aim', 'Find how many hours of homework students do on a weeknight.'),
       L(2, 'Method', `Options: ${wrong.map(([x, y]) => `${x}–${y}`).join(', ')} hours.`),
       L(3, 'Working', 'Tick one option per student.'), L(4, 'Conclusion', 'Report the number of ticks per option.')],
      2, `Use options that never overlap: less than ${a} hour, ${a} to less than ${a + 1} hours, ${a + 1} hours or more.`,
      [`Use fewer options: 0–${a + 2} hours only.`, `Use options with gaps: 0–${a - 1 < 0 ? 0 : a - 1}, ${a + 1}–${a + 2} hours.`],
      'Options must not overlap or leave gaps, so every answer fits exactly one option.', { wrong });
  },
  'equal-split': rng => {
    let st; do { st = genStrata(rng, rng.int(3, 4)); } while (new Set(st.alloc).size === 1);
    const eq = st.n / st.sizes.length;
    return mk('equal-split', 'The Equal Split',
      [L(1, 'Aim', `Take a stratified sample of ${st.n} from levels of ${st.sizes.join(', ')} students.`),
       L(2, 'Method', `Sample from each level in proportion to its size.`),
       L(3, 'Working', `Take ${eq} students from every level.`), L(4, 'Conclusion', 'The sample represents every level fairly.')],
      3, `Proportional sizes: ${st.alloc.join(', ')} students from the levels in order.`,
      [`Take ${st.sizes.map(s => s / 10).join(', ')} students from the levels in order.`, `Take ${st.n} students from the biggest level only.`],
      'Stratified samples match each group’s share of the population, not an equal split.', { sizes: st.sizes, n: st.n, alloc: st.alloc, eq });
  },
  'tally-cluster': rng => {
    const g = rng.int(2, 4), r = rng.int(1, 4);
    return mk('tally-cluster', 'The Short Tally',
      [L(1, 'Aim', 'Find how many students chose chicken rice.'), L(2, 'Method', `The tally shows ${g} full groups and ${r} extra strokes.`),
       L(3, 'Working', `${g} × 4 + ${r} = ${4 * g + r}`), L(4, 'Conclusion', `${4 * g + r} students chose chicken rice.`)],
      3, `Each full group counts 5, so ${g} × 5 + ${r} = ${5 * g + r}.`,
      [`${g} + ${r} = ${g + r}`, `${g} × 5 = ${5 * g}`],
      'A full tally group has four strokes crossed by a fifth, so it counts 5.', { g, r, wrong: 4 * g + r, right: 5 * g + r });
  },
  'boundary-class': rng => {
    const w = rng.pick([5, 10, 20]), i = rng.int(1, 3), v = w * (i + 2) ;
    const classes = makeClasses(w * 2, w, 5);
    const right = classIndex(v, classes);
    return mk('boundary-class', 'The Boundary Blunder',
      [L(1, 'Aim', 'Group the scores into equal classes.'), L(2, 'Method', `Classes: ${classes.map(c => classLabel(c, 'continuous')).join(', ')}.`),
       L(3, 'Working', `The score ${v} goes in ${classLabel(classes[right - 1], 'continuous')}.`), L(4, 'Conclusion', `Add one to the frequency of ${classLabel(classes[right - 1], 'continuous')}.`)],
      3, `${v} goes in ${classLabel(classes[right], 'continuous')}, because the lower boundary is included.`,
      [`${v} goes in both classes.`, `${v} goes in no class.`],
      'With left-closed classes, a boundary value belongs to the class that starts at it.', { v, right, wrong: right - 1, classes });
  },
  'type-mislabel': rng => {
    const [item, wrongT, rightT, why] = rng.pick([
      ['the number of siblings', 'continuous', 'discrete', 'it is counted'],
      ['the time to walk to school', 'discrete', 'continuous', 'it is measured'],
      ['a student’s height to the nearest centimetre', 'discrete', 'continuous', 'it is measured, then rounded'],
    ]);
    return mk('type-mislabel', 'The Mixed-Up Type',
      [L(1, 'Aim', `Classify ${item}.`), L(2, 'Method', `It is numerical data.`),
       L(3, 'Working', `It is ${wrongT} data.`), L(4, 'Conclusion', `Record it as ${wrongT} data.`)],
      3, `It is ${rightT} data, because ${why}.`,
      [`It is categorical data, because it has a name.`, `It is ${wrongT} data, because it is a number.`],
      'Counting gives discrete data; measuring gives continuous data.', { item, wrongT, rightT });
  },
  'source-mislabel': rng => {
    const [act, wrongT, rightT] = rng.pick([
      ['Priya reads last term’s canteen sales log', 'primary', 'secondary'],
      ['Jun Hao counts students at the walkway himself', 'secondary', 'primary'],
    ]);
    return mk('source-mislabel', 'The Source Swap',
      [L(1, 'Aim', 'Decide where the data comes from.'), L(2, 'Method', `${act}.`),
       L(3, 'Working', `So this is ${wrongT} data.`), L(4, 'Conclusion', `Label the data ${wrongT}.`)],
      3, `This is ${rightT} data: ${rightT === 'primary' ? 'the collector gathers it first-hand' : 'someone else collected it earlier'}.`,
      [`This is ${wrongT} data because it uses numbers.`, `This is neither primary nor secondary data.`],
      'Primary data is collected first-hand; secondary data was collected by someone else.', { act, wrongT, rightT });
  },
};
export const buildCase = (flaw, rng) => BUILDERS[flaw](rng);
```
**Flaw types** (PRD §7.3): `big-biased` (**case 1 is always this**), `leading`, `overlap-options`, `equal-split`, `tally-cluster`, `boundary-class`, `type-mislabel`, `source-mislabel`. Cases 2–3 are drawn from the remaining seven, so the three cases always have **different flaw types**.
**State:** `caseIdx`, `step` (`'find'|'fix'|'solved'`), `selectedLine`, `solved[]`.
**UI:** the report card with tappable lines (`role="button"`, 44 px rows), then three fix options. Tapping a sound line → `Msg tone="amber"` ("That line is fine — inspect the others"); tapping the faulty line → `Msg tone="emerald"` and the fix options appear; a wrong fix → `Msg tone="rose"` with the *principle*, not the answer. On solving: the `explanation` is shown and **Next case** appears.
**Gate:** 3 cases solved.

`SimulatePhase` wires `[SampleLab, BinTheData, SurveyPlanner, SurveyAudit]` into `STATIONS` (§5.5); the CTA is gated on `simCompleted.every(Boolean)`; the final station completion triggers the evaluator's `sim_all` badge (§4.3).

---

## 8. Audio Pipeline

### 8.1 Mechanics (reuse as-is)
`utils/audio.js` is **already compliant** (ElevenLabs only; no `speechSynthesis`, no `speakFallback`): `VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'` (Alice), `MODEL_ID = 'eleven_multilingual_v2'`, style presets (`statement`, `instruction`, `question`, `encouragement`, `emphasis`, `thinking`, `celebration`) in `config/audio.config.js`, `getAudioUrl` (static `audioMap` → dynamic fetch with an in-memory cache), `warmStatic`, `narrate()` with next-segment preload, `setMuted`, `stopNarration`, and the synthesized Web-Audio click. If a URL is missing or playback fails, `narrate` skips to the next segment or returns silently. **Do not add any browser-voice fallback.**

### 8.2 `utils/narration.js`
Function **bodies** are rewritten; the exported names stay exactly those the reference already uses (they match the blueprint): `wonderNarration`, `storyNarration(panelIdx)`, `simStationIntro(stationIdx)`, `playQuestionNarration(q)`, `playCorrectNarration(n)`, `playWrongNarration(n)`, `playHint1Narration(text)`, `playHint2Narration(text)`, `districtCompleteNarration(name)`, `bossStartNarration(name)`, `bossWinNarration(name)`, `reflectNarration()`, `reflectCompleteNarration()`, plus `getAllNarration()`.

**Parity by construction (fixes D10).** Story, Wonder and station-intro narration is **derived from the same strings the UI renders**: `storyNarration(i)` = sentence-split `speak(STORY_PANELS[i].text)` as `say(...)` segments, then `emphasize(speak(highlight))`. The mascot `bubble` is decorative and not narrated. Static clips are generated from `getAllNarration()`, which enumerates every derived and fixed string, so the audio map cannot drift from the screen.

**Number and symbol rendering.** `speak(text)` converts on-screen strings to spoken words *before* they reach ElevenLabs **and** before they become `audioMap` keys. Prototype-verified on: `90%`, `150 ≤ h < 160`, `1 200` (U+202F), `5–8`, `152.5 cm`, `45 min`, `50 ÷ 200 = 1`, `vs` / `e.g.`:

```js
// utils/narration.js — number & symbol → spoken-words (prototype for TRD §8.2)
const ONES = ['', 'one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS = ['', '', 'twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
export function numberToWords(n) {
  const num = parseInt(n, 10);
  if (Number.isNaN(num)) return String(n);
  if (num === 0) return 'zero';
  if (num < 0) return 'minus ' + numberToWords(-num);
  if (num < 20) return ONES[num];
  if (num < 100) return TENS[Math.floor(num / 10)] + (num % 10 ? '-' + ONES[num % 10] : '');
  if (num < 1000) { const r = num % 100; return ONES[Math.floor(num / 100)] + ' hundred' + (r ? ' and ' + numberToWords(r) : ''); }
  if (num < 1_000_000) { const r = num % 1000; return numberToWords(Math.floor(num / 1000)) + ' thousand' + (r ? (r < 100 ? ' and ' : ' ') + numberToWords(r) : ''); }
  return String(num);
}
const digits = s => s.split('').map(d => (d === '0' ? 'zero' : ONES[+d])).join(' ');
const NUM = '(\\d+(?:\\.\\d+)?)';
const spokenNum = t => (t.includes('.') ? numberToWords(t.split('.')[0]) + ' point ' + digits(t.split('.')[1]) : numberToWords(t));
export function speak(text, { convention = 'left-closed' } = {}) {
  if (!text) return '';
  let s = String(text);
  s = s.replace(/(\d) (?=\d{3}(?!\d))/g, '$1');                             // 1 200 (narrow no-break space) → 1200
  s = s.replace(/\be\.g\.,?\s*/gi, 'for example, ').replace(/\bi\.e\.,?\s*/gi, 'that is, ').replace(/\bvs\.?\s/gi, 'versus ');
  s = s.replace(new RegExp(`${NUM}\\s*≤\\s*[a-z]\\s*<\\s*${NUM}`, 'g'), (_, a, b) => `from ${spokenNum(a)}, up to but not including ${spokenNum(b)}`);
  s = s.replace(new RegExp(`${NUM}\\s*<\\s*[a-z]\\s*≤\\s*${NUM}`, 'g'), (_, a, b) => `more than ${spokenNum(a)}, up to and including ${spokenNum(b)}`);
  s = s.replace(/(\d+)\s*[–-]\s*(\d+)/g, '$1 to $2');                              // 5–8 → 5 to 8
  s = s.replace(new RegExp(`${NUM}\\s*%`, 'g'), (_, a) => `${spokenNum(a)} percent`);
  s = s.replace(new RegExp(`${NUM}\\s*cm\\b`, 'g'), (_, a) => `${spokenNum(a)} centimetres`);
  s = s.replace(new RegExp(`${NUM}\\s*min\\b`, 'g'), (_, a) => `${spokenNum(a)} minutes`);
  s = s.replace(/≈/g, ' about ').replace(/×/g, ' times ').replace(/÷/g, ' divided by ').replace(/=/g, ' equals ').replace(/\+/g, ' plus ').replace(/−/g, ' minus ');
  s = s.replace(new RegExp(NUM, 'g'), (_, a) => spokenNum(a));
  return s.replace(/\s+/g, ' ').trim();
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const cases = [
    ['Nine out of 10 friends said yes, so 90% of the school wants it!', 'Nine out of ten friends said yes, so ninety percent of the school wants it!'],
    ['Class 150 ≤ h < 160', 'Class from one hundred and fifty, up to but not including one hundred and sixty'],
    ['A school of 1 200 students', 'A school of one thousand two hundred students'],
    ['Options 5–8 hours', 'Options five to eight hours'],
    ['Heights of 152.5 cm', 'Heights of one hundred and fifty-two point five centimetres'],
    ['The journey takes 45 min', 'The journey takes forty-five minutes'],
    ['50 ÷ 200 = 1', 'fifty divided by two hundred equals one'],
    ['Tally vs frequency, e.g. 17', 'Tally versus frequency, for example, seventeen'],
  ];
  let bad = 0;
  for (const [i, o] of cases) { const r = speak(i); if (r.toLowerCase() !== o.toLowerCase()) { bad++; console.log('MISMATCH\n in :', i, '\n got:', r, '\n exp:', o); } }
  console.log(bad ? bad + ' mismatches' : 'speak(): all ' + cases.length + ' pass');
  console.log(numberToWords(1050), '|', numberToWords(2000), '|', numberToWords(1200));
}
```
Rules for authors: **never use an ASCII hyphen as a minus or range in narrated text** (use `−` and `–`; the range rule only matches `–`/`-` between digits); format thousands with `fmtNum()` (U+202F); keep symbols out of question wording where a word works ("sample size", not "n"); `<`/`>` appear on screen only inside class-interval patterns. Titles/labels that are not narrated need no spoken form.

**What is static vs dynamic.** Static (pre-generated): Wonder, the six story panels (text + highlight), station intros and feedback lines, fixed UI/feedback lines ("Not quite", "Clue solved", boss intro/win, world complete), Reflect lines. **Dynamic** (live ElevenLabs via `getAudioUrl`): procedurally varying question text, option text, explanations and hints. Dynamic clips are cached in memory for the session.

**Spoken-term list** (PRD §11) is enforced two ways: a `PRONOUNCE` map applies spoken-only respellings where a TTS test shows a problem (parity exception, listed in `README`), and `scripts/audio_parity.js` flags any narrated string containing raw `%`, `≤`, `<`, `>`, `×`, `÷`, `=`, `–`, `cm`, or a digit.

### 8.3 Generation
`scripts/generate_audio.js` keeps the reference design (`phrases = getAllNarration()`, 500 ms spacing, skip existing unless `--force`, rewrite `audioMap.js`). After content lock run `npm run generate-audio` then `npm run clean-audio`. The key is read from `.env.local` (`VITE_ELEVENLABS_API_KEY`) **only for this offline script**.

### 8.4 Key handling and the proxy (fixes backlog item 7 and the leaked key)
- `.env.local.example` ships **a placeholder** (`VITE_ELEVENLABS_API_KEY=your_key_here`). `.env.local` is git-ignored.
- **Production builds must not set `VITE_ELEVENLABS_API_KEY`** (it is embedded in the client bundle). Without it, `audio.js` already falls back to `POST /api/elevenlabs`. That function did not exist in the reference; implement it:
```js
// api/elevenlabs.js  (Vercel serverless function; the key lives in the ELEVENLABS_API_KEY env var, never in the client)
const VOICE = 'Xb7hH8MSUJpSbSDYk0k2', MODEL = 'eleven_multilingual_v2';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return res.status(503).json({ error: 'TTS not configured' });
  const { text, voiceId, modelId, voice_settings } = req.body || {};
  if (typeof text !== 'string' || !text.trim() || text.length > 600) return res.status(400).json({ error: 'bad text' });
  if (voiceId !== VOICE || modelId !== MODEL) return res.status(400).json({ error: 'voice/model not allowed' });
  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'audio/mpeg', 'xi-api-key': key },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings }),
  });
  if (!r.ok) return res.status(r.status).end();
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(Buffer.from(await r.arrayBuffer()));
}
```
The function pins the voice/model and caps text length so it cannot be used as a general-purpose TTS endpoint. Add platform rate limiting (Vercel firewall) before public launch (§14 R3).

---

## 9. Gamification

- **`utils/scoring.js`:** keep the reference `calcStars(correctOutOfTen)` and `calcXP({ attempts, hintsUsed, streak })` unchanged (base 10 − 3·(attempts−1) − 2·hints, floor 2, plus a streak bonus of +2 per step above 2, capped at +10) and **add**:
```js
export const calcStarsNormalised = (correct, total) => calcStars(Math.round((correct / total) * 10));
```
Checked: 5/5 → 3★, 4/5 → 2★, 3/5 → 1★, 2/5 → 0★; 8/8 → 3★, 7/8 → 3★ (8.75 → 9), 6/8 → 2★ (7.5 → 8), 5/8 → 1★.
- **`utils/badgeEngine.js`:** `checkBadges(state)` trigger logic is reused (it already reads `totalCorrect, streak, bestStreak, totalAnswered, simCompleted, worldResults, bossesDefeated, journeyComplete, badges`); the evaluator in `App` (§4.3) now **actually supplies all of them** (fixes D1). `BADGES` display strings (PRD §10):

| id | name | description |
|---|---|---|
| `first_correct` | First Data Point 📍 | Answered your first question correctly! |
| `streak_5` | Tally of Five ✋ | Five correct answers in a row, a full tally group! |
| `streak_10` | Double Tally ✋✋ | Ten correct answers in a row! |
| `sim_all` | Survey Kit Complete 📋 | Completed all 4 stations in the Survey Lab! |
| `world_3star` | Perfect Sample ⭐⭐⭐ | Earned 3 stars in any world! |
| `boss_won` | Survey Boss Beaten 🏆 | Won a Boss Battle! |
| `answered_20` | Persistent Pollster 🗳️ | Answered 20 or more questions in Practice! |
| `journey_complete` | Insight Desk Chief 🎖️ | Completed the full 5-phase journey! |

- **Boss reward badges:** `bossRewards: number[]` of world indices; names come from `WORLDS[i].boss.reward`; shown in `BadgesModal` under "Boss rewards" (🔒 until earned). Boss win: 5 questions, 3 lives, ≥ 1 life left after the 5th answer → `FINISH_SESSION { bossWon: true }` → reward badge + `bossesDefeated++`. Boss loss (0 lives) → result screen "Try again", no stars recorded.
- `answered_20` counts questions answered in Practice (`totalAnswered`), including timed-out ones. Toasts use `FeedbackOverlay status="badge"` (non-blocking variant).

---

## 10. Design Tokens, Viewport and Global CSS

### 10.1 Tokens
`styles/design-tokens.css` — keep the reference `:root` block unchanged (cosmic gradient, glass tokens, phase colours, `--world-0…9`, `--space-*`, `--fs-*` clamps, `--header-h: 56px`). **Replace** the `--angle-*` tokens with data-visual tokens:
```css
:root {
  --data-sample:   #38bdf8;   /* chosen / highlighted students */
  --data-pop:      rgba(255,255,255,.28);  /* the rest of the population */
  --data-known:    #facc15;
  --data-unknown:  #f43f5e;
  --data-ok:       #4ade80;
  --data-warn:     #fbbf24;
  --data-zone-0:#f472b6; --data-zone-1:#fb923c; --data-zone-2:#fbbf24; --data-zone-3:#4ade80; --data-zone-4:#38bdf8;
  --tap-min: 44px;
  --story-nav-h: 72px;       /* Story bottom nav row, used in the card max-height */
}
```
Tailwind config: keep `fontFamily`, `fontSize` scale, phase and world colours (reuse).

### 10.2 Viewport/layout CSS (mandatory; extends the reference's existing dvh + `--header-h` foundation)
```css
html, body, #root { height: 100%; margin: 0; }
body, .app-container { height: 100vh; height: 100dvh; max-height: 100dvh; overflow: hidden; }
main.app-main { padding-top: var(--header-h); padding-bottom: env(safe-area-inset-bottom); }

/* one card height rule for every phase card — replaces max-h-[92vh] / 94vh / 62vh */
.phase-card  { max-height: calc(100dvh - var(--header-h) - 16px); overflow-y: auto; }
.story-card  { max-height: calc(100dvh - var(--header-h) - var(--story-nav-h) - 16px); overflow-y: auto; }

/* intro has no header and must scroll */
.intro-root  { overflow-y: auto; }

/* Simulate: two columns only from lg */
.sim-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
@media (min-width: 1024px) { .sim-grid { grid-template-columns: minmax(0,4fr) minmax(0,8fr); } }

/* short laptops: tighten tokens, never clip */
@media (max-height: 800px) and (min-width: 1024px) {
  .sim-card { padding: .75rem 1rem; } .sim-accent { display: none; } .sim-desc { font-size: .9rem; }
}
@media (prefers-reduced-motion: reduce) {
  .floating-bg-item, .fade-in-up, .animate-bounce, .animate-pulse { animation: none !important; }
}
/* visible keyboard focus everywhere */
:where(button, [role="button"], [role="radio"], [role="tab"], input, textarea):focus-visible {
  outline: 3px solid var(--color-gold); outline-offset: 2px;
}
```
Delete the reference's `.sim-card`/`.reflect-card` `calc(100dvh …)` duplicates in favour of `.phase-card`; **never reintroduce `zoom`**; keep the inner scroll containers (`overflow-y:auto`) so nothing is unreachable. `touch-action: manipulation` on all buttons (removes the 300 ms tap delay, prevents double-tap zoom on controls); range inputs use `touch-action: pan-y`.
Breakpoints (Tailwind defaults): `sm 640`, `md 768`, `lg 1024`. Phone = `< sm`; tablet portrait = `sm–md`; tablet landscape/laptop = `≥ lg`.

### 10.3 Test viewports
1920×1080 · 1440×900 · 1366×768 · 1024×768 · 768×1024 · 390×844 (matrix in §5.10; automated in §12.5).

---

## 11. Build / Deploy

- `npm install && npm run build` from a clean extract; `npm run lint`; `npm test`; `npm run test:bank`. Deploy on Vercel (SPA rewrite already excludes `/assets/` and `/api/`; set `ELEVENLABS_API_KEY` in project env, leave `VITE_ELEVENLABS_API_KEY` unset).
- `index.html`: `<title>SurveyQuest · Grade 8 Maths</title>`; description and OG tags about the Insight Desk and data collection (no AngleQuest wording, **no "MOE-aligned" claim** until PRD §16a is confirmed); keep `viewport-fit=cover`; keep the Google Fonts link (Fredoka One, Nunito, Inter); `favicon.svg` is shipped (the reference already includes one — replace the artwork).
- `README.md`: run/build/test/audio commands, module summary, world table, art brief (PRD §13), key-handling note, the reference-defect list's "what was changed" summary. No mention of browser speech.
- `package.json` `name: "survey-quest"`.

---

## 12. QA Plan

### 12.1 Bank stress test (`scripts/stress_test_bank.js`)
≥ **300 seeds × 100 questions (30 000)**, calling `generateBank(seed, { withMeta: true })`. Assert **per question**: schema complete, no empty/`NaN`/`undefined`; exactly 4 distinct options; `correctAnswer ∈ options`; **every distractor has a registered `src`** and ≤ 1 `M40` per question; `id`/`districtId`/`category` consistent with the world; question ≤ 35 words; no characters outside the allowed set in numeric strings. **Per world:** 10 distinct `questionText`; both tiers present. **World 10 (index 9):** items from ≥ 5 source worlds.
**Statistical-validity assertions** (PRD §8 constraints and §15 acceptance): `validateSystematic`, `validateStratified`, `validateGrouping`, `validateFreqTable`, `validateTally` pass on each question's `visualData`; every percentage is a whole number; the stated `correctAnswer` equals an **independent recomputation** from `visualData` (e.g. recompute k = N ÷ n, the allocation, the frequency, the class of a value, the percentage); boundary questions place the value exactly on a boundary under the active `INTERVAL_CONVENTION`; `survey-card` items' hidden `reveal` marks truly mark an overlap/gap (checked with a test-local `rangesOverlap`/gap helper); stratified allocations sum to n.
Output: a pass log (counts per template and per world) attached to the delivery.

### 12.2 Unit tests (`node --test`) and content review
- `dataMath.test.js`: the checks prototyped in §6.4 (systematic, stratified, percent, classes/boundaries under both conventions, binning evaluator, generator uniqueness of width).
- `sampleModel.test.js`: population size, true share 50 %, pool share 80 %, mean estimates within ±3 points over 2 000 draws.
- `auditCases.test.js`: the 8 flaws × 300 seeds invariants (§7.4).
- `briefs.test.js`: exactly one correct option per slot; numeric answers equal recomputation.
- `speak.test.js`: the eight prototype cases plus every `getAllNarration()` string passes the "no raw symbol/digit" rule.
- **Human content review (cannot be unit-tested):** every entry in `data/pools.js` and `data/briefs.js` is read by an educator for (a) a *single* defensible answer, (b) school-appropriate, non-sensitive context (PRD N7), (c) wording ≤ 35 words, (d) distractor plausibility. Record sign-off in the PR.

### 12.3 Audio parity (`scripts/audio_parity.js`)
Every string passed to a narration helper has an exact `audioMap` match or is flagged intentionally dynamic; story/wonder/station text is checked to be *derived* (no hand-copied duplicates); `grep -r speechSynthesis src dist` returns nothing; no narrated string contains raw symbols or digits (§8.2).
**Listening test (once, human):** *discrete* (must not sound like "discreet"), *stratum/strata*, *census*, *categorical*, "percent", the class-interval phrase, and a thousands number. Fix with the `PRONOUNCE` map if needed.

### 12.4 Journey walkthrough
Intro → Wonder → Story (6 panels; nav bar shows "Council File 1/6 … 6/6"; last button "Enter the Survey Lab") → Simulate (4 stations completable; CTA gated; **Station D is the Error-Detective**) → Practice (map, all 4 modes, Boss winnable **and** losable, timer per question, stars normalised, **all 8 badges unlock**, streak independent of stars) → Reflect (recap, scorecard, textarea, confetti) → Celebration → restart. Navigation: forward pills are locked until their prerequisite is met; Home asks for confirmation when progress exists. **Zero console and page errors.**

### 12.5 Viewport and regression (`scripts/viewport_check.mjs`, dev-only Playwright; run with the preinstalled Chromium)
For each Tier 1/Tier 2 viewport and each phase: (1) `document.documentElement.scrollWidth <= innerWidth`; (2) the bottom of the header ≤ the top of the first content element; (3) each phase's primary CTA and the 5 nav pills are reachable (visible, or inside a scroll container that `scrollIntoView` can reach); (4) no element's text is clipped by an `overflow: hidden` ancestor (`scrollWidth > clientWidth` check on pills and tabs); (5) tap targets in Simulate/Practice ≥ 44 px. Take screenshots into `qa/` for the PR. **Regression targets are defects U1–U10** (PRD §12.2): the previous reference failed 1366×768 (Story bubble, mode tabs), 768×1024 (nav, station overlap, mode tabs) and 390×844 (nav, Story text/button, Simulate workspace).

### 12.6 Build and lint
Clean-clone `npm install && npm run build` (blueprint stack verified against the reference, §1.4) and `npm run lint` (warnings acceptable, **errors not**; remove the unused-parameter warnings the reference currently has).

### 12.7 Accessibility
Spot-check with keyboard only: Tab order across nav → content → CTA; every station operable without a pointer; focus trapped and restored in every modal; `aria-live` regions announce feedback and readouts; each `DataVisual` has an `aria-label`; no colour-only encoding (labels present); `prefers-reduced-motion` disables floating background, bounces, pulses and confetti; contrast of text on glass cards ≥ 4.5 : 1 (the muted-slate-on-dark combinations used by the reference's captions are checked).

---

## 13. Delivery Checklist

- [ ] Zip excludes `node_modules/` and `dist/`.
- [ ] `public/assets/story/story_1.png … story_6.png` present as **true 1024×1024 PNG** placeholders (not JPEG data with a `.png` name; no `.jpg` twins); README contains the per-panel art brief (PRD §13).
- [ ] `README.md`, `index.html`, OG tags, `package.json`, `docs/*`, `IntroScreen`, `CelebrationScreen`, `TopNav`, `PlayPhase`, `ReflectPhase` rewritten; `grep -ri` finds none of: `AngleQuest`, `angle`, `Amirah`, `Wei Jie`, `Inspector`, `Detective Lab`, `Grade 7`, `MOE Geometry`, `protractor`, `Zara`, `Robo`, `Working Backwards`.
- [ ] `.env.local.example` is a placeholder; `.env.local` is in `.gitignore`; **no real key anywhere** (`grep -r "sk_"`).
- [ ] `api/elevenlabs.js`, `vercel.json`, `.oxlintrc.json`, `favicon.svg` present.
- [ ] `audioMap.js` regenerated after content lock; `npm run clean-audio` run; listening test signed off.
- [ ] Stress-test pass log, unit-test output, viewport screenshots and the content-review sign-off attached.
- [ ] Orphans absent: no `useViewport.js`/`useAudio.js` (unless used), no `CaseFileDetective`/`RadiantPointLab`/angle files, no `src/features/`.

---

## 14. Risks

| # | Risk | Mitigation |
|---|---|---|
| R1 | Blueprint dependency versions could conflict. | **Resolved by test:** React 19.3.0 / Vite 8.3.4 / plugin-react 6.1.2 / framer-motion 12.43.0 built the reference unchanged. Commit the lockfile; if a future bump breaks, pin to the reference's React 18.3.1 / Vite 5.4 set (also verified). |
| R2 | The reference's `.env.local.example` appears to contain a **real ElevenLabs key**. | Never copy it; ship a placeholder; the owner should **rotate that key** and scan the reference's git history. |
| R3 | A client-side `VITE_` key is exposed in the bundle; the new proxy could be abused as free TTS. | Unset the client key in production; the proxy pins voice/model and caps length; add Vercel rate limiting / allow-listed origin. |
| R4 | **Syllabus alignment is unverified** (official MOE PDF could not be retrieved; no standalone "data collection" chapter found at Sec 2). | PRD §16a: confirm scope and the statistical-literacy extension before content lock; the tiering (PRD §3.1) lets items move without redesign. |
| R5 | Reasoning items can have two defensible answers (e.g. "best method" scenarios). | Curated pools with a `rationale`; human review sign-off (§12.2); one correct option per scenario enforced by construction. |
| R6 | Text-heavy items are slow to read, especially with a timer or on phones. | ≤ 35-word guideline, 60 s **per question** (C2), visual-less questions collapse the visual box, scrollable cards. |
| R7 | Spoken/on-screen drift because symbols and numbers are spelled out. | Derived narration + single `speak()` + parity script (§8.2, §12.3). |
| R8 | TTS mispronounces *discrete*, *stratum*, *census*. | One-time listening test; `PRONOUNCE` map documented as a parity exception. |
| R9 | Interval convention differs from the school's textbook (`a ≤ x < b` vs `a < x ≤ b`). | Single `INTERVAL_CONVENTION` constant; `classLabel`, `classIndex`, `IntervalLine` and narration all read it; PRD §16b. |
| R10 | Station A's randomness feels flaky or a lucky draw spoils the lesson. | Gate logic is value-independent; per-mount seed; 4 sizes × 2 modes give a stable pattern (verified spreads, §7.1). |
| R11 | Progress is wiped by Home/✕ (reference behaviour). | Confirmation modal whenever XP, stars or badges exist (retained). |
| R12 | Reference-defect regression (nav clipping, `vh` caps, nested `overflow-hidden`). | `scripts/viewport_check.mjs` on all six viewports in CI/PR. |
| R13 | World-unlock (≥ 1★ previous) and Reflect gate (all 10 worlds) are inherited, not blueprint rules. | Isolated in `isWorldUnlocked` / `canEnterReflect` (§4.2); PRD §16f. |
| R14 | Stars normalisation (C1) changes the meaning of "3 stars" in short modes. | Documented in PRD §5; one function; stakeholder confirmation PRD §16g. |
| R15 | Tally art becomes illegible above ~25 strokes or at small sizes. | `MAX_TALLY = 25`; text label on every tally; `compact` rendering tested. |

---

## Appendix A — `storyContent.js` copy (build-ready)

Written with `%`, `≤` and `–` on screen; all of it is spoken via `speak()`. `1 200` uses U+202F. `imageBg` / `imageEmoji` are the fallback when the image is missing.

| # | title | character (emoji) | text | highlight | bubble | imageBg · imageEmoji · imageAlt |
|---|---|---|---|---|---|---|
| 1 | The Council's Big Question | Priya 👧 | At Sunbird Secondary School, the principal asks the Student Council a big question: should the canteen add a new stall? Jun Hao grabs his phone to text his friends, but Priya has a better idea. She sketches four steps on the whiteboard: plan, collect, organise and show. Today they will master the first three. | Good decisions start with good data, and good data starts with a good plan. | Plan, collect, organise, show. Let's learn the first three! | `#1e143c` · 🗂️ · Priya draws four steps on a whiteboard while Jun Hao holds up his phone. |
| 2 | What Kind of Data Is It? | Jun Hao 👦 | Priya lists the data the council might collect. A favourite CCA is a category, so it is categorical data. The number of CCAs a student joins is counted, so it is discrete data. The minutes it takes to walk to school are measured, so it is continuous data. Jun Hao calls a bus number numerical, but Tally explains that a bus number is only a label, so it is still categorical. | Count it or measure it? Counting gives discrete data; measuring gives continuous data. | A number that is only a label is still a category! | `#180c3c` · 🏷️ · Jun Hao points at a bus number while Tally holds a sticky note. |
| 3 | Where Does the Data Come From? | Priya 👧 | Priya stands under the covered walkway at recess and counts students herself. That is primary data, because she collects it first-hand. Jun Hao finds last term's canteen sales log in the school office. That is secondary data, because someone else collected it earlier. Data can come from a questionnaire, an interview, observation, an experiment or measurement, or existing records. | Primary data: you collect it yourself. Secondary data: someone already collected it. | Match the method to the question you want to answer. | `#201040` · 🔭 · Priya counts students on a rainy walkway; Jun Hao holds a dusty sales log. |
| 4 | Who Do We Ask? | Jun Hao 👦 | The school has 1 200 students, so asking everyone, a census, would take weeks. The council needs a sample. Jun Hao suggests his basketball friends, but that is a convenience sample and leaves out most of the school. Priya draws names at random, picks every tenth name on the register, or splits the sample by level in proportion to each group's size. | A fair sample gives everyone a chance, and a bigger sample can't fix an unfair one. | Always ask who is missing from your sample! | `#160a36` · 👥 · A bird's-eye view of the school field with a crowd of dots and a name-draw box. |
| 5 | Ask It Fairly | Priya 👧 | Jun Hao's first question is: don't you agree the canteen food is too expensive? Priya shows that this question pushes people towards yes. A good question is neutral, asks one thing at a time and is clear. Response options must not overlap, like 0–1 hours and 1–2 hours, and must not leave gaps. | A good question is neutral, single-minded and clear. Good options never overlap and never leave gaps. | If two options both fit, the options overlap! | `#1f1048` · ❓ · A questionnaire on an easel with a leading question marked in red. |
| 6 | Tally Time! | Tally 🦉 | Survey day! The council tallies 40 responses, writing four strokes and crossing them with a fifth. Then they group 25 plant heights into classes such as 150 ≤ h < 160, and check that the frequencies add up to the total. Tally hands over the Survey Lab key and teases the next mission: turning tables into pictures. | Tally as you count, group as you go, and check that the frequencies add up to the total. | Next mission: turn tables into pictures! | `#221150` · ✍️ · A long tally board and a ruler laid across plant pots. |

**Wonder copy:** title "The Great Canteen Vote"; stat line "9 of 10 friends said YES!"; body "Jun Hao asked ten friends at basketball practice whether the canteen should add a chicken-rice stall. Nine said yes, so he announced that 90% of the school wants it. Priya isn't convinced. Is this good enough data to decide for 1 200 students?"; Tally bubble "What if the answer depends more on who you ask than on what the school really thinks?"; CTA "Open the Insight Desk →".

## Appendix B — `data/recap.js` (Reflect, 3 questions)

| # | Question | Options (correct first) | Explanation |
|---|---|---|---|
| 1 | Jun Hao surveys 300 students, all from the basketball team. Priya says the result still can't be trusted. Why? | **The students all come from one group, so they don't represent the school. More of them can't fix that.** · 300 is too many students to ask. · Basketball players don't know about the canteen. · A survey should only ever ask 10 students. | A sample can only represent the school if it is chosen fairly. A large sample from one group is still biased. |
| 2 | Which method gives every student in the school an equal chance of being chosen? | **Drawing 100 names at random from the full school list** · Asking the first 100 students to arrive at school · Asking for volunteers on the school Instagram · Asking 100 friends from the CCA | Random selection from the full list gives everyone the same chance. |
| 3 | Sunbird has 60% lower-secondary and 40% upper-secondary students. Which sample of 100 is representative? | **60 lower-secondary and 40 upper-secondary students** · 50 lower-secondary and 50 upper-secondary students · 100 lower-secondary students · 40 lower-secondary and 60 upper-secondary students | A representative (stratified) sample matches the school's proportions: 60% and 40% of 100. |

Options are shuffled at render time; the recap header reads "Targets: fair samples" (replacing the reference's "Targets: Line vs. Point vs. Mirror Rules"). Reflection prompt: *"Dear Tally, a good sample is one that … because …"*.

## Appendix C — Traceability (PRD → TRD)

| LO (PRD §4) | World(s) | Templates (§6.5) | Simulate station | Reflect recap |
|---|---|---|---|---|
| 1 Classify data | 1 Data Desk | `whichIsCategorical`, `labelNumeral`, `discreteOrContinuous`, `roundedMeasurement`, `classifyFromList` | C (slot ①), D (`type-mislabel`) | — |
| 2 Source & method | 2 Source Street | `primaryOrSecondary`, `bestMethod`, `methodFits`, `sourceDrawback` | C (slot ②), D (`source-mislabel`) | — |
| 3 Population, sample, sampling methods | 3 Population Plaza, 4 Fair Draw Fountain | `identifySample`, `whyNotCensus`, `sampleOrPopulation`, `samplingFraction`, `whichMethod`, `systematicK`, `stratifiedAlloc` | A (concept), C (slot ③), D (`equal-split`) | Q2, Q3 |
| 4 Bias | 5 Bias Bay | `nameTheBias`, `whyUnreliable`, `bestFix` | **A (core)**, D (`big-biased`) | **Q1** |
| 5 Question design | 6 Question Quarter | `fairestQuestion`, `doubleBarrelled`, `optionsFlaw`, `betterOptions` | C (slot ④), D (`leading`, `overlap-options`) | — |
| 6 Tally & frequency | 7 Tally Terrace | `readTally`, `missingFrequency`, `percentOfTotal`, `largestCategory`, `extendTally` | B (table), D (`tally-cluster`) | — |
| 7 Grouped data | 8 Interval Island | `classOfValue`, `classWidth`, `frequencyInClass`, `validClasses`, `chooseClassWidth` | **B (core)**, D (`boundary-class`) | — |
| 8 Plan & critique | 9 Council Chamber, 10 Grand Survey Finale | `flawInPlan`, `planFor`, `strataContext`, `systematicContext`, `mixed`, `integrated` | **C (core)** | — |
