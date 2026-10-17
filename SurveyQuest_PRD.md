# SurveyQuest — Grade 8 · Data Collection (PRD)

**Grade:** 8 (Singapore Secondary 2) &nbsp;|&nbsp; **Topic:** Data Collection &nbsp;|&nbsp; **Module name:** SurveyQuest
**Clone source for this build:** `angle-on-line-g7-main` (the shipped AngleQuest Grade 7 module, user-supplied). It supersedes the default `G2-Money-Money-main`, per the TRD blueprint's "newer sibling as clone source" clause. UI, UX, layout, viewport and architecture decisions below are taken from it. Where it contradicts the blueprints or breaks at real viewport sizes, the fix is stated and the defect is not cloned (§12).
**Special instructions given:** use the supplied zip as the reference for UI/UX, architecture, layouts and viewports. Nothing else, so all blueprint defaults apply (Tally the Owl, Singaporean-multicultural first names, 10 worlds × 10 questions, the 4-mode practice table).
**Paired document:** `SurveyQuest_TRD.md`

---

## 1. Overview

SurveyQuest is a Grade 8 module on **statistical data collection**. It covers deciding what kind of data you need, where it comes from, who to collect it from, how to ask for it fairly, and how to record it in tally charts and grouped frequency tables.

Two Secondary 2 Student Council members, **Priya** and **Jun Hao**, run the school's *Insight Desk*. Mentored by **Tally the Owl** 🦉, they answer real school decisions (a new canteen stall, recess length, how students travel in, a recycling push) with data. Every world is one stage of a survey project, and the villains are classic data-collection mistakes: the convenience sample, the leading question, the overlapping class interval.

The five-phase **Wonder → Story → Simulate → Practice → Reflect** journey, the XP/Stars/Streak/Badge system, the 100-question procedurally generated bank over 10 worlds and the ElevenLabs-only narration are inherited unchanged from the Intellia Global architecture (PRD blueprint §A).

## 2. Background

SurveyQuest follows the "Grade + Topic in, build-ready PRD/TRD pair out" process used for earlier modules (MoneyQuest … RatioCraft, AngleQuest). It differs from them in two ways:

1. **It is a reasoning topic, not a calculation topic.** Most questions ask the student to *judge a plan* (is this sample fair? is this question leading?). Only a few ask for a number (stratum size, systematic interval, frequency, percentage). The bank templates, distractors and Simulate stations are built around misconceptions rather than arithmetic slips. The central misconception is "a bigger sample is a better sample".
2. **Its diagrams are not geometric.** The reference's `AngleVisual.jsx` is replaced by a `DataVisual.jsx` that draws crowds of dots, tally marks, questionnaire cards, interval number lines and tables (§7, TRD §6.6).

The module sits at the front of the statistics strand. It produces the clean, grouped tables that the next module (histograms, dot diagrams, stem-and-leaf, averages) will consume (§3.2).

## 3. Standards Alignment

### 3.1 What the research found (read this first)

The module is anchored in the Singapore MOE Lower Secondary Mathematics **Statistics** strand. Grade 8 corresponds to Secondary 2, as in the AngleQuest PRD.

**Evidence reviewed.** The official MOE syllabus PDF could not be fetched in this session because the site disallows automated retrieval, so alignment rests on two sources and needs stakeholder confirmation (§16a):
- A Secondary 2 (G2) school content outline lists the statistics chapters as *Dot Diagrams; Histograms for Ungrouped Data; Stem-and-leaf Diagrams; Histograms for Grouped Data; Mean; Median; Mode; Measure of Central Tendency.* It says nothing on data collection or sampling.
- A syllabus summary page lists Sec 2 "Data analysis" as: mean/median/mode, dot diagrams, histograms, stem-and-leaf diagrams, grouped data.

**Consequence.** *Data collection* is not a separately titled Sec 2 chapter in the sources reviewed. The Sec 2 chapters presuppose data that has already been classified, tallied and grouped (ungrouped vs grouped histograms depend on whether the data is discrete or continuous). The module is therefore scoped in three explicit tiers, so the bank does not sprawl:

| Tier | Content | Status |
|---|---|---|
| **Core (curriculum-anchored)** | Data types (categorical / numerical; discrete / continuous); tally marks and frequency tables; relative frequency as a percentage of the total; grouping numerical data into equal-width, non-overlapping class intervals; boundary-value placement. | Directly prerequisite to the Sec 2 histogram chapters. **Tested.** |
| **Statistical-literacy extension** | Primary vs secondary data; collection methods; population, sample, census; sampling methods (simple random, systematic, stratified, convenience); sources of bias; survey-question design; planning a whole collection. | Standard Singapore lower-secondary enrichment and project-work practice, but **not** a titled Sec 2 chapter. **Tested**, and flagged in §16 for confirmation. |
| **Bridge only (not tested)** | Drawing dot diagrams, histograms and stem-and-leaf diagrams; mean/median/mode; quartiles and box plots; pie charts; misleading graphs; probability; margin of error; sample-size formulae; any inference from a sample to a population beyond "it should be representative". | Appears only as one narrative teaser (Story panel 6, Reflect close) and the Station A "estimate" visual, never as a bank question. |

### 3.2 Adjacent skill scoped out (bridge, not tested)

**Representing and analysing data** (dot diagrams, histograms, stem-and-leaf, mean/median/mode) is the next sub-topic in the strand and the natural sequel module (working name *DataQuest* or *HistoQuest*; check the registry, because a module named DataQuest already exists in the product history). SurveyQuest ends by handing the student a tidy grouped frequency table and one teaser line ("next mission: turn tables into pictures"). It never asks for a diagram of the data or an average.

### 3.3 Domain conventions students are expected to know

- **Data-type vocabulary:** *categorical* (qualitative) vs *numerical* (quantitative); numerical data is *discrete* (counted, whole-number steps) or *continuous* (measured, any value in a range). Numerals used as labels (bus numbers, class codes, jersey numbers) are **categorical**.
- **Class-interval notation.** Continuous data uses left-closed, right-open intervals, e.g. `150 ≤ h < 160`, so a value of exactly 160 belongs in `160 ≤ h < 170`. Discrete whole-number data uses inclusive ranges, e.g. `1–5`, `6–10`. *Some Singapore textbooks use `a < x ≤ b`; this is an assumption to confirm (§16b).* It is implemented as a single constant so it can be switched.
- **Tally notation:** groups of five (four strokes crossed by a fifth).
- **Relative frequency / percentage:** frequency ÷ total × 100. The generator only produces totals that give whole-number percentages (§8, rule N1).
- **Stratified sampling:** sample in a stratum = sample size × (stratum size ÷ population size), with clean numbers only (§8, rule N3).
- **Plain-language reasoning is expected.** Students give a reason ("this sample leaves out Sec 4 students"), so every `explanation` names the principle in full words.

## 4. Learning Objectives

By the end of this module, a student should be able to:
1. **Classify data** as categorical or numerical, and numerical data as discrete or continuous, including recognising numerals that are only labels.
2. **Distinguish primary from secondary data** and choose a suitable collection method (questionnaire, interview, observation, experiment/measurement, existing records) for a stated question.
3. **Use population, sample and census vocabulary correctly, and choose and apply a sampling method** (simple random, systematic, stratified, convenience), including finding a systematic interval and proportional stratum sizes.
4. **Identify bias** in a sample or process (convenience, voluntary response, undercoverage, non-response, wrong time or place) and suggest a fix.
5. **Evaluate survey questions and response options:** spot leading, double-barrelled and vague questions, and options that overlap or leave gaps; choose the improved version.
6. **Record data with tally marks and frequency tables,** read totals, work out a percentage of the total and check that frequencies sum to the total.
7. **Group numerical data into equal-width, non-overlapping class intervals,** choose a class width, place values (including boundary values) in the right class and build a grouped frequency table.
8. **Plan and critique a complete data collection** for a real school or community question by combining LO1–LO7.

The order is recall/classify → choose a method → reason about samples → critique → record → organise → plan, which drives both the Story panels (§7.2) and the world sequence (§8).

## 5. Inherited Standards (copied from PRD blueprint §A, not re-derived)

- **Five-phase architecture:** Wonder → Story → Simulate → Play ("Practice" in the UI) → Reflect.
- **Gamification:** XP per question (attempts, hints and streak weighted); Stars 0–3 per world (9–10 correct of 10 = 3★, 7–8 = 2★, 5–6 = 1★, below = 0★); continuous streak tracking; 8 fixed badge triggers (relabelled, §10); Boss Battles (5 questions, 3 lives, one per world, 10 in total).
- **Practice modes (unchanged mechanics):**

| Mode | Questions | Hints | Timed | Lives |
|---|---|---|---|---|
| Guided Practice | 5 | Yes | No | No |
| Independent Practice | 10 | No | No | No |
| Timed Challenge | 8 | No | Yes (60 s) | No |
| Boss Battle | 5 | No | No | Yes (3) |

- **Audio:** ElevenLabs "Alice" (`Xb7hH8MSUJpSbSDYk0k2`), `eleven_multilingual_v2`, six style presets. Pre-generated static `.mp3`s via `generate_audio.js` → `audioMap.js`. Dynamic ElevenLabs generation only for procedurally varying text. **No browser Web Speech fallback under any circumstance**; if audio is unavailable, narration silently skips. Strict 1:1 spoken/on-screen parity. All symbols and notation are spoken as full natural language (§11).
- **Question bank:** 10 worlds × 10 questions = 100, procedurally generated (≥300-run stress test), fixed schema (`id, districtId, category, visual, questionText, options[4], correctAnswer, explanation, hint1, hint2, visualData`). The 10th world (index 9) is always the mixed-review grand finale.
- **Product standards:** React / Vite / Tailwind stack. Pixel-faithful dark glassmorphism per `design-tokens.css`, Fredoka / Nunito fonts. Surgical reuse of every non-topic-specific reference file. Zip delivery excluding `node_modules`/`dist`, with placeholder story art plus an art-brief README.

**Clarifications to inherited rules, decided here** (each is a gap in the blueprint that the reference build handled inconsistently):

| # | Gap | Decision for SurveyQuest |
|---|---|---|
| C1 | Stars are defined "out of 10", but Guided (5 Qs), Timed (8 Qs) and Boss (5 Qs) cannot reach 9–10 correct. The reference awards stars from the raw count, so a 5-question mode tops out at 1★. | Stars use the **score normalised to ten**, `round(correct ÷ questions × 10)`, then the standard thresholds. 5/5 → 3★, 4/5 → 2★, 3/5 → 1★. A world keeps its **best** result across modes. |
| C2 | The "Timed Challenge (60 s)" row is ambiguous. The reference runs one 60 s clock for all 8 questions (about 7 s each), too harsh for reading-heavy scenario questions. | **60 seconds per question**, reset on each question. If time runs out the question counts as incorrect. Kept as one constant (TRD §5.4); confirm in §16e. |
| C3 | World unlock rule (≥1★ in the previous world) and the Reflect gate (all 10 worlds ≥1★) are reference behaviour, not blueprint rules. | Keep both (single functions, TRD §4). Confirm in §16f. |
| C4 | The reference's top nav lets a student jump straight to Practice or Reflect, bypassing the "complete all 4 stations" gate. | Forward jumps are **locked** until the prerequisite is met; completed and current phases stay clickable (§12.3). |
| C5 | Reference world map shows "W1 … W10" while config ids are 0–9. | The UI shows **World 1–10**; ids stay 0–9 internally. The blueprint's "world 9" is the **10th world** (index 9) and appears on screen as *World 10*. |

## 6. Module Identity

- **Name:** SurveyQuest (follows the `{Topic}Quest` convention; distinct from existing DataQuest and LineQuest). Alternatives if stakeholders prefer: *CollectQuest*, *InsightQuest*.
- **Story theme:** *The Student Council Insight Desk* at the fictional **Sunbird Secondary School** (≈1 200 students, Sec 1–4). Each world is a "request ticket" from a school department. The setting suits Sec 2 students (13–14) because it is real, project-like and local. It is not childish and not abstract. The ten tickets are the ten worlds in §8.
- **Characters** (Singaporean-multicultural first names, blueprint default; no override requested): **Priya**, the methodical Insight Desk lead, and **Jun Hao**, the quick, enthusiastic council secretary whose shortcuts ("let's just ask my friends") each create the mistake the world is about. Names differ from AngleQuest's (Amirah, Wei Jie).
- **Mascot:** **Tally the Owl** 🦉 (default retained). The name *is* a data-collection term, so the default is a stronger fit than a swap. Styled in this module as "Tally, Chief of Data", with a clipboard and tally-mark wing feathers. This is a light reskin, not a mascot change.

## 7. Five-Phase Journey Detail

### 7.1 Wonder — "The Great Canteen Vote"
Single hook screen. Jun Hao asked **ten friends at basketball practice** whether the canteen should add a chicken-rice stall. **Nine said yes**, so he announces to the principal: "90% of the school wants it!" Priya isn't convinced. A `DataVisual` crowd shows 1 200 students as dots with Jun Hao's ten highlighted, all in one corner by the court. Tally poses the driving question: *"What if the answer depends more on who you ask than on what the school really thinks?"*
CTA: **Open the Insight Desk →**.

### 7.2 Story — 6 panels
The blueprint default is 4 panels. This module uses **6** because the topic is a pipeline that must be built up in order (type → source → sample → question → record/group), the same reasoning the AngleQuest build used. **Build note for the TRD:** the reference already reads the count from `STORY_PANELS.length`. Re-verify in review that no literal `3`, `5` or `6` has crept in (TRD §1.1 #2).

| # | Title | Concept delivered (LO) | Narrative beat | Pull-quote ("highlight") |
|---|---|---|---|---|
| 1 | "The Council's Big Question" | Why careful data matters; the Plan → Collect → Organise → Show cycle (hook) | The principal asks the Insight Desk: *"Should we add a new canteen stall?"* Jun Hao grabs his phone to ask friends. Priya sketches the four-step cycle on the whiteboard. Today they master the first three. | "Good decisions start with good data, and good data starts with a good plan." |
| 2 | "What Kind of Data Is It?" | Categorical vs numerical; discrete vs continuous (LO1) | Favourite CCA (category), number of CCAs joined (counted → discrete), minutes to walk to school (measured → continuous). Jun Hao tries to call a bus number "numerical". Tally corrects him: a label is still a category. | "Count it or measure it? Counting gives discrete data; measuring gives continuous data." |
| 3 | "Where Does the Data Come From?" | Primary vs secondary data; methods (LO2) | Priya counts students under the covered walkway at recess (observation, primary). Jun Hao digs out last term's canteen sales log (records, secondary). A quick tour of questionnaire, interview, observation, experiment and records. | "Primary data: you collect it yourself. Secondary data: someone already collected it." |
| 4 | "Who Do We Ask?" | Population, sample, census; the four sampling methods; bias (LO3, LO4) | A census of 1 200 students would take weeks. Jun Hao's "basketball friends" is a convenience sample. Priya draws names at random, picks every tenth name from the register, and splits by level (stratified), with clean numbers shown. | "A fair sample gives everyone a chance, and a bigger sample can't fix an unfair one." |
| 5 | "Ask It Fairly" | Question design and response options (LO5) | Jun Hao's draft: *"Don't you agree the canteen food is too expensive?"* Priya shows how leading, double-barrelled and vague questions bend the answer, and why options must not overlap or leave gaps (0–1 / 1–2 hours of homework). | "A good question is neutral, single-minded and clear. Good options never overlap and never leave gaps." |
| 6 | "Tally Time!" | Tally marks, frequency table, grouped intervals; teaser (LO6, LO7) | Survey day: the council tallies 40 responses, then groups 25 heights into `150 ≤ h < 160` style classes and checks the total. Tally hands them the Survey Lab key and teases the next mission: turning tables into pictures. | "Tally as you count, group as you go, and check that the frequencies add up to the total." |

Each panel carries `character` (who speaks), a mascot `bubble` line and a 1024×1024 image (§13).

### 7.3 Simulate — 4 stations (archetype heuristic, PRD blueprint §B.5)
The reference's 2-column shell is kept (station tabs left, activity workspace right, locked/✅ status, gated "Go to Practice" CTA). Four stations follow the documented archetypes. **Every station must be genuinely interactive with live-updating SVG.** Every drag has keyboard −/+ controls. Every station ends in a "Complete Station ✓" panel that calls `onComplete`.

**A · Concept Discovery Lab — "The Sample Lab" 🔬**
- *Premise:* the whole school (200 dots on a school map in five zones: Sports Hall, Canteen, Classrooms, Library, Music Room) secretly has 50% yes-votes for the new stall, but support is much higher near the Sports Hall. The student draws samples and watches what the estimates do.
- *Manipulates:* a **method switch** (Convenience: "ask whoever is nearest the Sports Hall" vs Random: "draw from the full class list") and a **sample-size stepper** (10 / 20 / 40 / 60, with −/+ buttons). Press **Draw sample**.
- *Live feedback:* the chosen students light up on the map, the readout shows "7 of 10 said yes = 70%" and each draw drops a dot onto an accumulating estimate strip (0–100%). Convenience dots pile up around 80% however large the sample gets. Random dots scatter widely at 10 and tighten around 50% at 60. A hidden "true value" line is revealed by **Reveal the whole school** once enough draws are made.
- *Gate (understanding, not scoring):* ≥3 draws in each method, ≥2 different sizes in Convenience, **Reveal** pressed, and then one confirmation MCQ: *"Why did the convenience estimates stay wrong even when the sample got bigger?"* → **"The way students were chosen leaves out many of the school, and a bigger sample doesn't fix that."** (Distractors: "the sample was too small", "the voting was random", "the dots moved".) Wrong answer → Msg + retry, no penalty.

**B · Build-to-Target Challenge — "Bin the Data" 📏**
- *Premise:* the council has 24 raw plant-height readings (cm) from the school garden. Build a grouped frequency table.
- *Manipulates:* **class width** (5 / 10 / 20 via a stepper) and **starting boundary** (stepper, snaps to multiples of the class width), both with −/+ buttons and an optional slider.
- *Live feedback:* a number line shows interval brackets and data dots dropping into their classes. A running table updates frequency and tally per class. A readout shows "6 equal classes · all 24 values placed · total 24". A status ring is **amber** while the number of classes is 4 or 8 (outside the target 5–7) or a value is uncovered, and **green** at target. "Check" accepts only an exact target (tolerance is visual guidance), consistent with the reference.
- *Gate:* 3 successful rounds, each with a different data set and boundary trap (a value sitting exactly on a boundary), each after pressing **New data**. Round 3 requires the student to also say which class a boundary value belongs to (one tap).

**C · Multi-Step / Composite Construction — "Survey Planner" 🧩** (targets LO8, the most advanced objective)
- *Premise:* the council gets a brief (e.g. "How long do Sunbird students take to travel to school?"). The student builds the plan on a four-slot **Plan Card**: ① data type, ② source and method, ③ sampling method (with the number to compute: systematic interval *or* stratum sizes), ④ best-worded question with response options.
- *Manipulates:* picks from 3–4 candidate cards per slot, and adjusts the numeric stepper in slot ③ (e.g. girls in a stratified sample of 50 from 120 boys + 80 girls).
- *Live feedback:* the **Plan Card** fills in as choices are made. A **Plan Health** meter lights four lamps (type / method / sample / question). A virtual "Run the survey" step then plays a short animation. A sound plan produces a neat tally table ("Clean data ✓"). A flawed plan produces a visible failure ("Your sample only reached the Sports Hall") plus the principle in plain words, and the student fixes that slot.
- *Gate:* 2 briefs completed with all four lamps green. Each flawed choice shows an explanation but never blocks, and a slot is only marked green when correct.

**D · Error-Detective — "Inspector Tally's Survey Audit" 🕵️**
- *Premise:* a worked survey report (4 lines: *Aim / Method / Working / Conclusion*) contains **exactly one seeded, realistic mistake**.
- *Manipulates:* tap the faulty line, then choose the corrected line from 3 options.
- *Live feedback:* the faulty line highlights on a correct tap and a short Msg explains the principle.
- *Seeded-flaw pool (each case a different type):* big-but-biased sample ("300 students, all from the basketball team, so it's reliable") — **case 1 is always this one, because it is the module's core misconception**; leading question; overlapping response options; stratified allocation done as an equal split; tally cluster counted as 4; boundary value placed in the wrong class; discrete/continuous mislabel; primary/secondary mislabel.
- *Gate:* 3 cases, all different flaw types, each solved.

### 7.4 Play / Practice
Unchanged mechanics (§5): mode picker (4 modes), World Map of 10 worlds, Boss Battle per world. Practice-world screens reuse the reference's stats bar (streak, XP, lives or timer), question card (concept tag pill, question, enlarged visual, 4 options, optional hint) and feedback overlay. A **rule pill** shows the concept name ("Sampling methods"), never the answer's reason.

### 7.5 Reflect
- **3-question recap quiz** targeting the module's most important and most-misunderstood idea, *a fair sample matters more than a big sample* (the same idea Station A reveals and Station D case 1 audits):
  1. *"Jun Hao surveys 300 students, all from the basketball team. Priya says the result still can't be trusted. Why?"* → **"The students all come from one group, so they don't represent the school. More of them can't fix that."**
  2. *"Which method gives every student in the school an equal chance of being chosen?"* → **"Drawing 100 names at random from the full school list."** (Distractors: first 100 to arrive; volunteers from the school Instagram; friends in the CCA.)
  3. *"Sunbird has 60% lower-secondary and 40% upper-secondary students. Which sample of 100 is representative?"* → **"60 lower-secondary and 40 upper-secondary students."**
- **Scorecard:** Total XP, Stars out of 30, Best Streak, badges earned, and a 10-cell per-world star strip (World 1–10).
- **Reflection prompt** to Tally (≥10 characters to enable completion, reference behaviour): *"Dear Tally, a good sample is one that … because …"*
- **Celebration screen** with confetti and "Insight Desk Chief" (badge 8), restart button.

## 8. World & Question Bank Table

10 worlds, foundational → applied. **The tenth world (index 9) is the mixed-review grand finale.** Data shape is the reference's `{ id, name, emoji, accent, description, conceptFocus, boss: { name, emoji, reward } }`. World accents are the reference's unchanged `--world-0…9` palette.

| id | UI label | Name | Emoji | Accent | conceptFocus | Description | LO | Boss (name · emoji · reward badge) |
|---|---|---|---|---|---|---|---|---|
| 0 | World 1 | Data Desk | 🗂️ | `#f472b6` | `data-types` | Sort data into categorical vs numerical, and discrete vs continuous. | 1 | The Mix-Up Merchant 🌀 · "Type Tracker" |
| 1 | World 2 | Source Street | 🔭 | `#fb923c` | `sources-methods` | Primary or secondary? Pick the right collection method. | 2 | Hearsay Hank 🗣️ · "Source Spotter" |
| 2 | World 3 | Population Plaza | 👥 | `#fbbf24` | `population-sample` | Population, sample and census, and when a census is not practical. | 3 | Everyone-Asker Ed 📣 · "Sample Savvy" |
| 3 | World 4 | Fair Draw Fountain | 🎲 | `#4ade80` | `sampling-methods` | Random, systematic, stratified and convenience sampling, with the numbers. | 3 | Convenience Carl 🛋️ · "Fair Draw Master" |
| 4 | World 5 | Bias Bay | ⚖️ | `#38bdf8` | `bias-spotting` | Spot the flaw in a sample or process and fix it. | 4 | The Cherry Picker 🍒 · "Bias Banisher" |
| 5 | World 6 | Question Quarter | ❓ | `#818cf8` | `question-design` | Leading, double-barrelled and vague questions; options with gaps and overlaps. | 5 | Loaded-Question Lou 🎯 · "Question Crafter" |
| 6 | World 7 | Tally Terrace | ✍️ | `#c084fc` | `tally-frequency` | Tally marks, frequency tables, totals and percentages. | 6 | The Miscounter 🧮 · "Tally Titan" |
| 7 | World 8 | Interval Island | 🏝️ | `#22d3ee` | `grouped-data` | Class intervals, class width, boundary values and grouped tables. | 7 | The Overlapper 🔀 · "Interval Ace" |
| 8 | World 9 | Council Chamber | 🏛️ | `#facc15` | `real-world-planning` | Plan and critique whole data collections for real school questions. | 8 | Rush-Job Rex ⏱️ · "Plan Perfect" |
| 9 | World 10 | Grand Survey Finale | 🏆 | `#f43f5e` | `mixed-review` | Hardest boss; mixes every question type from worlds 1–9. | 1–8 | The Grand Misleader 🎩 · "Insight Desk: Closed" |

**Sample questions** (illustrative only, not the full 100; every world's templates are specified in TRD §6.5):

- **World 1 · Data Desk.** "Which of these is **categorical** data?" → The number of CCAs a student joins / **A student's favourite CCA** / A student's height in centimetres / The time a student takes to walk to school. *Favourite CCA is a name-type answer, not an amount.* — "Bus service numbers (such as 190 and 67) are collected from students' journeys. What type of data is this?" → **Categorical** / Numerical, discrete / Numerical, continuous / Cannot be classified. *Bus numbers are labels; adding or averaging them means nothing.*
- **World 2 · Source Street.** "Priya uses last term's canteen sales records kept by the school office. This is…" → **Secondary data** / Primary data / Categorical data / A sample. *Someone else collected it earlier for another purpose.* — "The council wants to know how many students use the covered walkway during rainy recess. Which method fits best?" → **Observation (counting)** / Questionnaire / Interview / Using sales records.
- **World 3 · Population Plaza.** "Sunbird Secondary has 1 200 students. Priya surveys 120 of them. What is the sample?" → **The 120 students surveyed** / All 1 200 students / The question on the form / The school's 4 levels. — "Why is a census a poor choice for finding out how long each of 5 000 torch batteries lasts?" → **Testing every battery uses them all up** / Batteries can't be counted / It would be too accurate / Batteries have no lifespan.
- **World 4 · Fair Draw Fountain.** "The register has 400 students. Priya wants a systematic sample of 40. How many students apart should she pick?" → **Every 10th** / Every 40th / Every 360th / Every 8th. *400 ÷ 40 = 10.* — "Sec 2 has 200 students: 120 boys and 80 girls. A stratified sample of 50 is needed. How many girls?" → **20** / 25 / 30 / 80. *50 ÷ 200 = ¼; ¼ of 80 = 20.*
- **World 5 · Bias Bay.** "An online poll on the school Instagram asks 'Vote: should recess be longer?' What is the main problem?" → **Only students who feel strongly (and use the app) respond** / The poll is too short / The sample is too large / Nothing; online polls are random.
- **World 6 · Question Quarter.** "Which question about canteen prices is worded most fairly?" → Don't you agree the canteen is too expensive? / **How would you rate the price of canteen food: very low, low, fair, high or very high?** / Surely the new prices are a rip-off? / Do you love the cheap new stall? — "A form asks *How many hours of homework do you do on a weeknight?* with options 0–1, 1–2, 2–3. What is wrong?" → **1 and 2 each fit two options (overlap)** / The options are too wide / There are too few options / Nothing.
- **World 7 · Tally Terrace.** "A tally shows 3 full groups of five and 2 extra strokes. What is the frequency?" → **17** / 15 / 14 / 5. *3 × 5 + 2 = 17; the crossing stroke counts as the fifth.* — "Frequencies are 8, 12, 6 and x. The total is 40. Find x." → **14** / 26 / 12 / 34.
- **World 8 · Interval Island.** "Classes are written `50 ≤ x < 60` and `60 ≤ x < 70`. Which class contains exactly 60?" → **60 ≤ x < 70** / 50 ≤ x < 60 / Both classes / Neither. — "Scores: 12, 18, 21, 25, 29, 30, 34, 37, 41, 45. How many fall in `30 ≤ x < 40`?" → **3** / 4 / 2 / 5.
- **World 9 · Council Chamber.** "Sunbird's Sec 1–4 have 300, 280, 260 and 160 students (1 000 in total). A stratified sample of 100 is taken. How many Sec 3 students?" → **26** / 25 / 28 / 30. — "To learn how students travel to school, the council interviews the first 30 students through the gate each morning. What is the main flaw?" → **Students arriving later are left out, so the sample may not represent the school.**

### Clean-number and statistical-validity constraints (hard rules, carried into the TRD generator)

Because correctness here depends on the **structure** of a sample or table as well as on arithmetic, the generator must enforce *statistical* consistency with dedicated validators in `dataMath.js`, not only correct totals.

| Rule | Constraint |
|---|---|
| **N1 · Whole-number percentages** | Totals for percentage items come from `{10, 20, 25, 50, 100}` only (200 is excluded: an odd frequency out of 200 gives a half-percent). The generator also asserts that every percentage it produces is a whole number. |
| **N2 · Systematic sampling** | Population N and sample n are chosen so that N ÷ n = k is a whole number with k ∈ {4, 5, 8, 10, 20, 25}; the random start is between 1 and k. |
| **N3 · Stratified sampling** | The sampling fraction is one of {1/20, 1/10, 1/5, 1/4}. Every stratum size is a multiple of the fraction's denominator. Allocations are whole numbers ≥ 1 that sum exactly to n. Strata sizes sum to N. |
| **N4 · Grouped data** | Class width ∈ {5, 10, 20}, with interval starts at multiples of the width. Classes are equal-width, contiguous and cover every value. Boundary-value questions use values exactly on a class boundary. At most one empty class per table. |
| **N5 · Tally** | Counts ≤ 25 (at most five groups), so tally art stays legible. |
| **N6 · Totals check** | Any frequency table shown has frequencies that sum to the stated total (validator-asserted). |
| **N7 · Context hygiene** | Survey topics are school-appropriate: no health, weight, income, religion, family or other sensitive topics. No real brands, schools or people. Names come from the Singaporean-multicultural pool. |

## 9. Gamification Mechanics

Fixed per §5 and C1. Per-mode behaviour: Guided shows hint 1 then hint 2 (XP reduced per hint); Independent has no hints; Timed gives 60 s per question (C2); Boss gives 3 lives (a wrong answer costs a life; at 0 lives the session ends and the world is not "won"). On a Boss win, the **world's boss reward badge** (§8) is awarded **in addition to** trigger 6 in §10. The Reflect scorecard shows stars out of 30.

## 10. Gamification Naming (8 fixed triggers, relabelled)

| Trigger (fixed) | Badge id | Badge name |
|---|---|---|
| First correct answer | `first_correct` | First Data Point 📍 |
| 5-answer streak | `streak_5` | Tally of Five ✋ |
| 10-answer streak | `streak_10` | Double Tally ✋✋ |
| All 4 Simulate stations complete | `sim_all` | Survey Kit Complete 📋 |
| Any world scores 3 stars | `world_3star` | Perfect Sample ⭐⭐⭐ |
| Any Boss Battle won | `boss_won` | Survey Boss Beaten 🏆 |
| 20+ questions answered in Practice | `answered_20` | Persistent Pollster 🗳️ |
| Full 5-phase journey complete | `journey_complete` | Insight Desk Chief 🎖️ |

Plus ten **boss reward badges** (§8), shown in the Badges modal under a second heading.

## 11. Audio & Narration Content Rules

Topic-specific terms that must always be spoken in full, never as symbols, abbreviations or digits-only (the universal rule in §5):
- "**percent**" — never the "%" sign sound. Whole numbers are spoken as words: "ninety percent".
- **Class intervals**: `150 ≤ h < 160` is spoken "from one hundred and fifty, up to but not including one hundred and sixty". `1–5` is spoken "one to five". Never "less-than-or-equal" read as symbols, and never "dash".
- "**x**" in a table is "x"; "**n**" is "the sample size" and "**N**" is "the population size". "**≈**" is "about". "**vs**" is "versus". "**e.g.**" and "**i.e.**" never appear in narrated text.
- Units are always spoken in full: "centimetres", "minutes", "seconds", "kilometres".
- Numbers up to 1 200 are spoken as words ("one thousand two hundred"); thousands separators on screen (1 200) never cause "one two hundred". Decimals say "point".
- Fractions of a sample are "out of": "9 out of 10", never "9 slash 10".
- "**tally**" and "**tally mark**" are spoken in full.
- Defined terms are always said whole: "categorical data", "numerical data", "discrete data", "continuous data", "primary data", "secondary data", "census", "population", "sample", "sampling method", "simple random sample", "systematic sample", "stratified sample", "convenience sample", "stratum" / "strata", "frequency table", "class interval", "class width".
- **Pronunciation checks (QA, TRD §12):** *discrete* (must not sound like "discreet"), *stratum/strata*, *census*, *categorical*.

## 12. UI / UX, Layout and Viewport Requirements

This section records what was taken from the reference app, what was found broken in it, and what the new module must do. The reference was built and inspected at 1920×1080, 1366×768, 768×1024 and 390×844.

### 12.1 What is adopted from the reference (do not re-design)
- **Look and feel:** dark cosmic gradient background, glass cards, gold pill CTA buttons, Fredoka One (display) and Nunito (body), floating faint background symbols (re-skinned for data: tally marks, `n = 40`, `%`, `≤`, `N`, `k = 10`).
- **Shell:** a fixed top bar with 🏠 Home pill, a centre capsule of five numbered phase pills (01 Wonder … 05 Reflect) with the active pill in a lit style, a 🔊 Sound On / 🔇 Muted pill and a ✕ button. During Story, a second row shows the progress bar and "Case Panel n of 6" (reworded for this module as "Council File n of 6").
- **Phase layouts:** Intro hero with journey card; Wonder single glass card; Story two-column card (image left, text, pull-quote and mascot bubble right) with Back / dots / Next; Simulate two-column shell; Practice mode tabs + 5×2 world grid; question card with stats bar; Reflect recap, scorecard and reflection.
- **Interaction chrome:** feedback overlay, boss-battle intro modal, badges modal, home-confirmation modal when progress exists, confetti on completion, global tactile click sound.

### 12.2 Defects found in the reference (observed; **must not be cloned**)

| # | Observed behaviour | Where | Required fix (TRD §10 and §5) |
|---|---|---|---|
| U1 | Phase capsule overflows and is clipped: at 768 px wide only Wonder–Simulate are visible; at 390 px only Wonder and half of Story. Practice and Reflect cannot be reached by nav. | TopNav | Responsive nav: below `md`, the capsule collapses to icon-only pills with the active label shown, wrapping to its own row if needed. Never clipped. |
| U2 | Practice mode tabs ("Guided Practice … Boss Battle") are clipped at both edges at 1366 and 768 px. | PlayPhase | Wrap to 2×2 below `lg`; icon + short label. |
| U3 | Story card's mascot speech bubble is cut off at 1366×768; at 390 px narrative text and quote are clipped and the "Next Case Clue" button overflows the right edge. | StoryPhase | Card gets a scrollable text column; image is height-capped; Next/Back use full-width stack on phones. |
| U4 | Simulate sidebar text overlaps the workspace at 768 px (grid switches to two columns at `md` with too little width). At 390 px the workspace is pushed below the fold inside an `overflow-hidden` card and cannot be scrolled to. | SimulatePhase | Two columns only from `lg` (≥1024 px). Below that, stack with a horizontal station tab strip on top and a scrollable workspace. |
| U5 | Intro hero's bottom feature cards are cut off at 1366×768 (no scroll, no header offset). | IntroScreen | Intro root scrolls (`overflow-y-auto`); spacing is height-aware. |
| U6 | The world grid labels "W1…W10" while config ids are 0–9, and the "Needs 1★ in W{n}" copy is off by one. | KingdomMap | Display 1-based labels everywhere (C5). |
| U7 | Hard-coded `vh` heights (`max-h-[92vh]`, `94vh`, `62vh`) ignore mobile browser chrome and the measured header. | Cards | Use `dvh` and the measured `--header-h` (the reference already provides `useHeaderHeight`). |
| U8 | The nav lets students jump forward to any phase, bypassing the "complete all 4 stations" gate. | TopNav / App | C4. |
| U9 | Zero ARIA attributes in the codebase; no `prefers-reduced-motion` handling; SVG pointer drags lack `touch-action: none` and pointer capture, so touch drags scroll the page. | All | §14 accessibility and TRD §7 and §10. |
| U10 | Story art files are named `.png` but contain JPEG data. | assets | Deliver real PNGs (or name them `.jpg` consistently). |

### 12.3 Required behaviour
- **Supported viewports.** *Tier 1 (fully designed and tested):* 1920×1080, 1440×900, 1366×768 (minimum laptop), 1024×768 (tablet landscape), 768×1024 (tablet portrait). *Tier 2 (usable, stacked layouts, scroll allowed):* 390×844 phone portrait. Content must never sit under the header or beyond the right edge at any Tier 1 or Tier 2 size.
- **No unreachable content.** Any card that can exceed the viewport scrolls internally; no `overflow-hidden` ancestor may hide required controls.
- **Phase navigation:** a student may revisit completed phases and the current phase. A forward phase is locked until its prerequisite is met (Story after Wonder; Simulate after Story; Practice after all 4 stations; Reflect after every world has ≥1★). Locked pills show 🔒 and a short tooltip or helper line. Home asks for confirmation if progress exists.
- **Touch:** every interactive target is at least 44×44 CSS px in Simulate and Practice; the map zones in Station A and the interval brackets in Station B are enlarged to match.

## 13. Assets Required

**6 story images at 1024×1024 (real PNG)**, one per Story panel (the reference's shipped dimensions), plus the Intro/hero art if desired. An **art-brief README** describes each panel's scene, characters (Priya, Jun Hao, Tally the Owl) and mood. Placeholders ship with `imageBg`/`imageEmoji` fallbacks so the UI is complete without art.

| Panel | File | Scene | Characters & mood |
|---|---|---|---|
| 1 | `story_1.png` | Student Council Insight Desk room at Sunbird Secondary: a whiteboard with four arrows (Plan → Collect → Organise → Show), a stack of clipboards, a window onto a school courtyard. | Priya drawing on the board, Jun Hao holding a phone; Tally perched on a clipboard. Curious, energetic, warm morning light. |
| 2 | `story_2.png` | Three tiles: a CCA poster wall, a stack of CCA sign-up cards, and a stopwatch at the school gate. | Jun Hao pointing at a bus-number sign; Tally with a "label ≠ amount" sticky note. Playful. |
| 3 | `story_3.png` | Covered walkway at rainy recess, Priya counting with a clicker; Jun Hao beside a filing box of canteen sales logs. | Priya focused, Jun Hao proud of his dusty log; Tally between them with a magnifying glass. Grey-blue rain, warm indoor glow. |
| 4 | `story_4.png` | The school field from above: 1 200 coloured dots, a name-draw box, a register with every 10th name circled, students grouped by level. | Priya with the draw box, Jun Hao pointing at the basketball court crowd; Tally hovering. Bright afternoon, bird's-eye view. |
| 5 | `story_5.png` | A paper questionnaire on an easel with two example questions side by side (one with a red leading-question marker); three answer boxes labelled 0–1, 1–2 and 2–3 hours with the shared numbers circled in red. | Priya presenting; Jun Hao scratching his head; Tally holding a red pen. Thoughtful, bright. |
| 6 | `story_6.png` | Survey day: a long tally board, 40 tally marks being grouped, a ruler laid across plant pots in the school garden, a "Survey Lab" key. | All three celebrating; Tally handing over the key. Triumphant, golden-hour light. |

## 14. Accessibility

- **Enlarged fonts and touch targets** in Simulate and Practice, calibrated to Sec 2: more restrained than the lower-primary modules, but still ≥44 px targets and the reference's enlarged type scale (`--fs-*` clamps).
- **No colour-only encoding.** Crowd dots carry zone labels and a count readout; tally marks and interval brackets carry text labels; Plan Health lamps show ✓/✗ and a word; amber/green rings also show "Almost" / "Exact".
- **Keyboard:** every slider/stepper/drag has explicit −/+ buttons (and arrow keys on focus, Shift = larger step). Every option, station tab, nav pill and modal is reachable by Tab, with visible focus rings.
- **ARIA:** `role="img"` plus `aria-label` summaries on every data visual; `aria-live="polite"` on feedback and readouts; `aria-pressed`/`aria-selected` on toggles and tabs; modals trap focus and return it on close; locked phase pills use `aria-disabled`.
- **Motion:** respect `prefers-reduced-motion` (disable floating background, bouncing CTAs, confetti becomes a static banner).
- **Narration is optional.** All content is readable without audio; the mute control is always visible.

## 15. Success Metrics / Acceptance Criteria

In addition to the fixed criteria (question-bank stress test, audio parity, clean build, full-journey walkthrough):
- **Statistical validity**, not just arithmetic correctness, of every generated item (§8 rules N1–N7), verified by explicit assertions in the ≥300-run (30 000-question) stress test. This covers: percentage items use clean totals; systematic N÷n is whole; stratified allocations are integers that sum to n; grouped tables are equal-width, contiguous, cover every value and sum to the total; boundary items follow the interval convention; each stated answer equals an independent recomputation from `visualData`.
- **Distractor quality.** Every distractor is drawn from the template's documented misconception list (TRD §6.5), not random values. Spot-checked in the stress test by asserting each distractor comes from a named source.
- **All 4 Simulate stations are genuinely interactive**, SVG-driven and gate-complete (§7.3), and are operable by keyboard alone.
- **Viewport pass:** Story (with the progress row), Simulate, the world map and the question card are fully visible and operable at all Tier 1 and Tier 2 viewports (§12.3), with defects U1–U10 verified fixed.
- **Reflect recap** correctly targets "a fair sample beats a big sample".
- **Audio:** every static string has an `audioMap` match, zero `speechSynthesis` references, and the pronunciation list (§11) is listened to once.

## 16. Assumptions & Open Questions

**Assumptions to confirm with stakeholders**
- (a) **Syllabus mapping.** The official MOE syllabus could not be retrieved here (§3.1); alignment relies on a school content outline and a summary page. Please confirm, against the syllabus document, which of the "statistical-literacy extension" items (§3.1) belong at Sec 2 vs elsewhere, and whether "Data Collection" corresponds to a specific school scheme-of-work chapter that should shape the world list.
- (b) **Interval notation:** left-closed `a ≤ x < b` (§3.3) vs the `a < x ≤ b` form some Singapore textbooks use. It is a one-constant switch, but the question wording, narration and visuals all depend on it.
- (c) **Stratified allocation** is treated as in scope with clean numbers only. If it is judged too advanced for Sec 2, World 4 keeps three methods and the allocation items move to World 9.
- (d) **Names and mascot** (Priya, Jun Hao; Tally the Owl as "Chief of Data") are proposed defaults, not yet stakeholder-approved. Fictional school name "Sunbird Secondary School".
- (e) **Timed Challenge clock:** 60 s *per question* (C2) vs one 60 s clock for all 8 questions (reference behaviour).
- (f) **Gating rules:** world unlock at ≥1★ in the previous world, and Reflect only after all 10 worlds have ≥1★ (C3). Both are reference behaviour. Do you want the 10-world Reflect gate loosened?
- (g) **Star normalisation** (C1): stars from the score normalised to ten, best across modes.

**Topic-adjacent skills deliberately scoped out** (candidates for future modules)
- *Representing and analysing data* (dot diagrams, histograms, stem-and-leaf, mean/median/mode): the natural sequel (§3.2).
- *Misleading graphs and misuse of statistics*, *probability and experimental data*, and *inference* (margin of error, sample-size formulae).

**Process notes**
- The reference's `.env.local.example` contains what appears to be a **real ElevenLabs API key**. The new module must ship a placeholder only, and the key in the reference should be rotated by its owner (TRD §1.3, §14 R2).
- The reference's Station D in the running app is `RadiantPointLab`, while the file `CaseFileDetective.jsx` (the documented Error-Detective) is never imported. SurveyQuest must wire the Error-Detective archetype as Station D, as the blueprint requires.
