# Andale Care Hub — UI Review, Iteration 1

> Review of the four-screen concept package (`index.html` + PNG mockups, "Andale Care Hub"), 2026-07-20.
> Companion to the discovery pack in [docs/discovery/](../discovery/README.md) — sections already covered there are summarised and cross-referenced, not repeated. Labels: **[FACT]** (Andale website, verified) · **[REG]** (regulatory) · **[REC]** (recommendation) · **[ASSUMPTION]** (validate with staff) · **[BUG]** (defect in the prototype as supplied).

---

## 1. Executive assessment

The concept is materially better than most first-pass practice-software UI: it leads with *work states* rather than records, separates the AI scribe into a visually distinct advisory surface with accept/edit/reject controls, shows responsible professionals on hospital cards, and includes a Patient Comfort Profile — all things commercial PMSs get wrong. The visual language (navy/teal, calm cards, generous radius) is an appropriate foundation.

The five most important problems, in order:

1. **The product's core has no screen.** The discovery pack's central thesis — every unresolved action is a task with an owner, due time and escalation route — has no UI. There is a "+ New task" button and a "Tasks" nav item, but no task queue, no handover view (a "Shift handover" button leads nowhere), and **no escalation affordance anywhere in the prototype**. As drawn, this is a viewing system, not a coordination system.
2. **Role confusion.** The signed-in user is a vet (Dr Rachel Evans), but her home screen is a reception board, and one nav serves all roles. The discovery IA (Part 6) calls for one shell with role-aware Today views; the prototype shows the opposite.
3. **No provenance anywhere.** Nothing distinguishes PMS-mastered data from locally entered data (source-of-truth constitution, Part 7), typed from dictated from AI-drafted content (exam grid — a clinical-safety requirement), or who asserted a fact and when (comfort profile, risk banner, "policy verified").
4. **Alert semantics are decorative.** Red/amber/green pills are used interchangeably for locations ("Theatre 1"), times ("08:55"), states ("Prep"), and genuine clinical alarms ("Review"). An abnormal lab result sits passively in a list, 22 minutes old, with no owner and no acknowledgement. Colour must be a controlled vocabulary or staff will learn to ignore it — alarm fatigue is a patient-safety issue, not a styling one.
5. **Demo data undermines credibility with the practice.** The date is **Sunday 19 July with 34 appointments — Andale is closed on Sundays** [FACT]. Column counts don't match cards (Pre-op says 3, shows 2; Inpatient says 3, shows 2) [BUG]. Several buttons render clipped/overlapping in the mockups ("+ New task", "Check in", "Review & sign", the waiting-room actions) [BUG — fragile fixed-width grid columns in `.schedule-row` and unclamped button labels]. Fix before any staff sees it; practice staff will judge the whole idea on whether the demo understands their week.

Everything else below is refinement. The direction is right; iteration 2 should add the missing coordination surfaces and the provenance/status systems before adding any further polish.

---

## 2. Screen-by-screen critique

### 2.1 Reception Today Board

**Works:** stat tiles with actionable sublabels ("3 due within 30 mins"); waiting room with arrival times and comfort notes ("quiet waiting area requested" — excellent); needs-attention grouping; live pill signalling real-time intent.

**Unclear / missing:**
- **Whose screen is this?** If it's reception's, the waiting room and intake belong in the primary (left) position, with the schedule secondary — reception's question is "who is here and who is calling", not "what is booked". If it's the vet's Today, it should lead with *her* consult list and open loops (results, unsigned notes, callbacks). Split into role variants (discovery Part 6.2).
- **No intake entry point.** Reception's highest-stakes job — answering the phone, capturing the reason, catching red flags (discovery 4.10) — has no UI. This is an essential-MVP screen (see §5).
- **Stats aren't clickable.** Every number must drill to its list or trust erodes (Part 6.3). "Needs attention: 4 / 2 high-priority" shows 3 items — which is the fourth? [BUG]
- **Needs-attention items have no owner, age-escalation or acknowledge control.** "Lab result awaiting review · marked abnormal · 22 mins ago" is a clinical alarm rendered as a passive list row. It needs: named owner (requesting vet), ack button, and an escalation ladder if unacknowledged (Part 6.10).
- Schedule rows: inconsistent actions ("Open" vs "Check in") with no state logic visible; no now-line; no late/no-show state; no scroll affordance beyond 10:20; no walk-in/add button; no per-row wait timer once checked in.
- Waiting room: no wait-duration colour thresholds (the "longest wait 14 mins" stat has no per-patient counterpart); no "in consult/done" transitions; no dog/cat/rabbit waiting-area separation cue despite the comfort note ([FACT] rabbit-friendly positioning).
- Missing tiles reception actually polls all day (discovery 4.9): prescriptions ready for collection vs awaiting review, callbacks due, expected surgical discharges/collections.

**Clinical safety:** "Milo · vomiting · triage complete" — where is the triage record and its outcome? If a red-flag question set was answered, the outcome (and who assessed it) should be one tap away.

**Real-time requirements:** waiting states, schedule changes, needs-attention — all push-updated; the Live pill should reflect actual connection state (stale-data banner on disconnect, Part 7.6's "never silently stale").

**Accessibility:** status conveyed by colour alone on pills; muted 12px meta text is below comfortable for all-day use at reception distance; keyboard-first operation (reception types while on the phone) is unaddressed — every action needs a focus state and a shortcut.

### 2.2 Shared Client & Patient Record

**Works:** identity header with species/neuter/age and PHC chip; comfort profile as first-class card; timeline with author attribution; active-concern banner; quick actions.

**Unclear / missing:**
- **Source-of-truth badges are absent and essential.** Which of these fields are mirrored from Merlin and which are Care-Hub-local (Part 7.1)? Staff must never guess which system to correct. Recommend a small chip per card: "from PMS · synced 10:42" vs "Care Hub".
- **"Allergies: None recorded" is dangerous phrasing.** Clinically, *no known allergies (asked and confirmed)* and *never asked* are different facts. Model as NKA / not-yet-assessed / list, with assessor and date.
- **Medication line has no governance context.** "Apoquel 16 mg once daily" needs: prescriber, last authorisation date, review-due date (the timeline says "review required before next repeat" — that belongs *on the medication line* as a due chip) [REG under-care: assessment currency drives repeat authorisation, discovery 5.4].
- "Insurance: policy verified" — by whom, when, against what? Verification is an event with an actor and date, not a permanent adjective.
- **Comfort profile entries lack dates and authors.** Discovery 4.13 requires factual, dated, attributed, amendable-with-history entries; "Updated 2 months ago" on the card is not per-entry provenance. "Nervous near larger dogs" should also surface as a header chip and a waiting-room cue — it currently lives only here.
- The red **active-concern banner is free text with no author, date, or linked task**. Either it is a clinical alert (structured, owned, reviewable) or it shouldn't look like an alarm.
- Client vs patient conflation: "Core details" mixes the two; the household/client entity (other pets, contact preferences, safety alerts, balance) has no surface. Add a client panel or linked client view (Part 6.5).
- Weight "28.4 kg · stable": show the sparkline; "stable" is a claim the chart should make. Last recorded date matters (Mar 2026 — four months stale for a dermatitis patient).
- Timeline: needs type filters (the Filter button is inert), event-type icons, AI-origin badges (future), and load-more. "Vaccination due 19 Jul 2027" tile is fine; make it open the preventative-care schedule.
- Missing states: deceased (banner + suppression status, discovery 5.12); unlinked-to-PMS warning; open-tasks tile not clickable [BUG-class].
- Quick actions miss the two the discovery pack rates highest: **New task** (contextual to this patient) and **Escalate**. "Request prescription" as a staff action needs role logic (reception logs request; vet authorises).

### 2.3 Veterinary Consultation Workspace

**Works:** three-pane layout (queue / note / scribe); draft status pill and autosave; scribe visually segregated in a dark panel labelled "Administrative support · clinician approval required" — exactly the right framing; accept/edit/reject per suggestion; the suggested action carries a caveat ("Based on spoken findings only. Confirm examination and obtain consent") — genuinely good.

**Gaps — ranked, safety first:**
1. **Examination-field provenance is the missing safety control.** The exam grid shows Temperature 38.4°C, HR 88 — entered how? If the scribe can populate these from conversation, the prototype violates its own rule (no inferred findings; discovery 9.4). Every exam tile needs a provenance chip — **Typed / Dictated / Device** — and AI must be structurally unable to write here. Empty tiles should read "Not examined/not recorded", never default-normal.
2. **Recording controls are inadequate.** "Listening · 08:42" with a pulse is a status, not a control. Required: global persistent recording indicator (visible even when the scribe panel is collapsed), **Pause / Resume / Stop** buttons, a mark-important-moment button, and a dictation-mode toggle for post-exam findings entry (9.4). The consent pill ("Client consent confirmed") must open the consent detail: what basis, what was said, who confirmed, decline path — and the panel must have a visible manual-fallback state ("Scribe unavailable — manual notes, nothing lost").
3. **No low-confidence marking** in the transcript or drafted details — a stated requirement (9.4). Show confidence styling on uncertain spans and a per-suggestion uncertainty line; medication/dose mentions get mandatory-review highlighting even at high confidence.
4. **"Use in plan" inserts advisory content into the record with one tap and no provenance trail.** T3 decision support (9.1) requires each suggestion to show: why it appeared, inputs considered, contraindications checked, what's missing, source/protocol, and remaining human checks — as an expandable detail, with the insertion logged as an AI-review action.
5. **Signing is a button, not a flow.** "Review & sign" must open the completion step: diff of AI-drafted vs edited content, attestation text, then the **post-consult burst** (discovery 5.2's forced choice): follow-up tasks / re-check booking / estimate flag / callbacks — *complete, tasks created, or explicitly none*. This is where the workflow product earns its keep, and it's absent.
6. **No allergy chip in the patient context strip.** Weight and current meds are shown; allergies/adverse reactions must be equally persistent at the point of clinical decision-making.
7. Cost/consent gap: "Cytology offered and accepted" — no estimate surface, no consent capture. Post-CMA [REG], estimate-discussed evidence belongs in this workspace (even as a simple logged flag in MVP).
8. Smaller: presenting concern is a static div while history is an editable textarea (inconsistent affordance) [BUG]; the queue lacks timing/late states; no species/consult-type template switcher; no interruption-proof "resume where I was" cue (Part 4 cross-cutting note 3); three-pane collapse on tablet needs a deliberate design (tabbed panes), not just stacking.

**Also note:** the deployment question. This screen presumes clinical notes live in Care Hub — which is the *independent-practice/integrated* end-state, not the Andale MVP (discovery Part 10 keeps notes in Merlin until write access exists). Keep designing it, but label it Phase-3+ so the prototype doesn't promise the practice something Gate G1 may forbid.

### 2.4 Nursing & Hospital Board

**Works:** columns match the discovery state machine; responsible people on cards; next obs/med times; species variety including rabbits; the honest footer disclaimer.

**Gaps:**
1. **No overdue rendering — the board's whole reason to exist.** "Next obs 09:28" needs states: due-soon (amber outline), **overdue (filled red, count-up timer, auto-escalation to Head RVN per Part 6.10)**. A "next due across the ward" rail at the top would let one nurse triage the room at a glance.
2. **Pill vocabulary is uncontrolled** — "08:55" (time), "Late" (schedule), "Theatre 1" (location), "Prep"/"Stable"/"Monitor"/"Review"/"Ready"/"Docs" (mixed states and alarms). Define three separate slots per card: *stage* (the column), *status pill* (controlled set: OK / Watch / Alert with icon), *time chip* (next action). "Review" as a red pill on Archie is exactly the kind of alarm that must be unmissable, owned, and acknowledgeable — not one of six ambient colour dots.
3. **Progress bars are semantically empty** — 65% of a dental means nothing and invites false reassurance. Replace with a checklist fraction tied to real gates ("Pre-op 3/5: consent ✓ bloods pending…"), or remove.
4. **Escalation is absent.** Every card needs the one-tap escalate control with severity (discovery 4.6) — this is the single most adoption-driving feature for junior staff.
5. Cards show inconsistent people fields (some vet only, some nurse only): per PSS expectations and the discovery model, **every** stay shows responsible vet *and* named nurse [REG-adjacent]; add kennel/location.
6. In-procedure cards ("Anaesthetic: Stable") imply live anaesthesia monitoring — a liability the product must not claim (Part 10.3 rejects anaesthetic charting). Show neutral facts only: started time, staff, "in theatre — contact via theatre".
7. Missing: discharge-criteria state on Discharge cards (criteria met 4/5, vet sign-off pending); "my patients" filter per nurse; handover build from board state (the button exists — design the flow: open items + risks + acknowledgement, discovery 5.12); Saturday-close transfer-to-Vets-Now action generating the transfer pack (5.10/5.11); SVN countersign badges on entries [REG Schedule 3].
8. **Ward mode**: a read-only large-type rotation for a wall screen, and tablet touch targets ≥44px — the current 11px care-lines are desk-density, not kennel-side density.
9. Column counts disagree with visible cards [BUG]; empty columns consume 620px of fixed min-height creating dead scroll on small wards.

---

## 3. Improved information architecture

Covered in [discovery Part 6](../discovery/04-information-and-data-architecture.md). Deltas against this prototype's nav:

- **Add `Handover` as first-class nav** (currently a dead button on the hospital board) and make **`Tasks` a real screen** — my/team/all queues with ageing (6.8).
- **Merge `Consultations` into patient/encounter context** for the Andale MVP (notes live in Merlin until integration); keep the workspace design for Phase 3/independent deployments.
- **`Diagnostics` becomes the open-loops registry** (ordered→reviewed→client-informed states, 5.8) rather than a results browser it can't be without lab integration.
- **`Communications` is a log, not a sender**, in MVP (no double-messaging beside Merlin/IVC comms).
- **`Prescriptions` = the repeat-request queue**, reception + vet views of the same states (5.4).
- Role-visibility: Administration → Director/Head roles; board config → Head RVN; the VCA sees Tasks + Hospital only, with reduced chrome. Hidden-by-permission beats greyed-out.
- Remove from nav until later: Payments/insurance (rejected for MVP), Reports (weekly digest email instead), Schedule (deep-link to Merlin's diary until read integration).

## 4. Role-based dashboards

Fully specified in [discovery Part 4](../discovery/02-role-journeys.md) (per-role: queue, actions, alerts, data, sign-off, escalation, measures). The prototype needs four Today variants built from the same components: **Reception** (waiting + intake + callbacks + collections), **Vet** (consult list + open loops + unsigned + escalations-in), **Nurse** (assigned patients + due obs/meds rail + clinics + countersign queue for coaches), **Director** (exceptions only). VCA gets the task board as home. One shell, one component kit, different queries — do not fork layouts per role.

## 5. Missing screens — priorities

**Essential for MVP** (with the four existing screens, revised):
1. **Task & handover centre** — the core; my/team queues, ageing, escalation routes, handover compose + acknowledge.
2. **Phone intake / triage capture** — <60s form, red-flag prompts (seed from the site's own critical-conditions list [FACT]), escalation card, OOH signposting log.
3. **Repeat-prescription queue** — the 5.4 state machine, vet review screen showing last-assessment date/type + drug-class flags [REG], SLA timers.
4. **Diagnostic open-loops list** — every ordered test as a loop with owner and states; manual "resulted" entry until integration.
5. **Escalation overlay** — not a screen but a global component: raise, route, acknowledge, resolve; reachable from every patient context.

**Important after MVP:** discharge workflow (criteria checklist + pack); surgical admission checklist (consent/fasting/contact-authority capture, incl. "proceed up to £X" [REG-CMA]); complaint & incident management (5-day/8-week timers [REG]); consent & estimate review (versioning evidence); Practice Director exceptions view; registration-verification pipeline (5.1).

**Later:** referral workflow; insurance-claim tracker (workflow-only; rails fragmenting [FACT]); client communication timeline (exists as log earlier, rich view later); client portal (independent-market only, Phase 4+).

**Avoid:** anaesthetic record/charting; procedure clinical record (PMS-owned); payments; rota builder. (Rationale: discovery Part 10.3.)

## 6. End-to-end flows

All thirteen requested flows are mapped with triggers, handoffs, exceptions, failure risks and safeguards in [discovery Part 5](../discovery/03-service-blueprints.md) (sixteen blueprints, including Mermaid-ready state lists) — the UI-relevant additions from this review: every blueprint's custody transfers must exist as *visible state changes on a screen* — the audit is the UI. The two flows the next design iteration should storyboard screen-by-screen are **repeat prescription** (5.4) and **hospital obs → escalation → resolution** (5.9), because they exercise the task, timer, escalation and provenance systems end-to-end.

## 7. Data model

The full ERD, source-of-truth constitution, retention and classifications are in [discovery Part 7](../discovery/04-information-and-data-architecture.md). Entities this prototype surfaces but the model must make explicit: `AI_DRAFT` and `AI_REVIEW_ACTION` (accept/edit/reject events with diffs — feeding the correction-rate metrics, 9.7), `RECORDING_SESSION` (consent basis, notice given, pause spans, deletion date), `ALERT` (owned, acknowledgeable, distinct from Task), and per-field `provenance` on examination/observation values (typed/dictated/device/AI-drafted→human-confirmed).

## 8. Permissions

The 12-role × capability matrix, Schedule 3 ceilings, competency flags, locum/break-glass/AI-service-identity modes are in [discovery Part 8](../discovery/05-permissions-model.md). UI obligations that follow from it: SVN entries render as "draft — awaiting countersign" badges everywhere they appear; the scribe's insert actions are disabled outside a clinician session; VCA views hide client contact data; "Review & sign" is present only for the authoring clinician; board state-transitions are permission-gated (who may move a card to Recovery); every permission denial explains itself ("Requires vet authorisation — escalate?") rather than hiding the button silently in clinical-safety contexts.

## 9. AI scribe — panel redesign

Safety architecture, consent model, retention, hosting, pilot and stop criteria: [discovery Part 9](../discovery/06-ai-consultation-assistant.md). The panel itself should restructure into **four visually distinct zones** (top to bottom):

1. **Session control bar** — recording state + elapsed, Pause/Resume/Stop, mark-moment, dictate-mode toggle, consent chip (opens detail), always visible.
2. **Transcript** (collapsible) — speaker-labelled with tap-to-reattribute, low-confidence spans underlined amber, auto-scroll with pin.
3. **Extracted facts** (draft content for the note) — history summary, owner observations, meds mentioned, durations; each card: confidence level, source-span link ("from 06:12"), Accept/Edit/Reject. Accepted content lands in the note *visibly marked AI-drafted until sign-off*.
4. **Clinical considerations** (T3, colour-and-icon differentiated from zone 3) — each suggestion expandable to: why shown · inputs considered · contraindications checked (and *not* checked) · missing info · source/protocol · uncertainty · remaining human checks. Actions: Use in plan (logged) / Dismiss (logged, with optional reason — feeds evaluation).

**Never generated:** exam findings (zone 3 structurally cannot target the exam grid); doses as insertable text (dose *cross-checks* render as warnings, not suggestions); client-facing content pre-signature; anything after Stop. **Auto-insertable without review:** nothing clinical — only formatting and section scaffolding. **Failure states:** vendor down → grey panel, "manual mode", notes unaffected; partial audio → draft banner "incomplete capture 09:02–09:06". Audit strip at panel foot: model + version, template version, draft hash — one tap to the full log [REG RCVS].

## 10. MVP definition

Unchanged from [discovery Part 10](../discovery/07-mvp-and-technical-architecture.md) (scope, five screens, stories, acceptance criteria, pilot, success measures) — with one revision prompted by this package: the prototype's **Consultation workspace moves from MVP to Phase 3** (it presumes note-mastering the Andale deployment can't have pre-G1), and its slot in the five-screen set is taken by the **Task & handover centre**, which this review identifies as the biggest absence. MVP screens: Reception Today · Patient card · Hospital board · Task & handover centre · My Work (vet/nurse) — with intake and the Rx queue as tabs of Reception Today/My Work.

## 11. Visual system recommendations

- **Semantic colour tokens, enforced:** red = clinical urgency only (alarm; always icon + word, never colour alone); amber = due-soon/attention; green = complete/stable; blue = informational; teal = brand/interactive only — never status. Re-audit every pill in the prototype against this (most fail). Two *severity channels*: clinical (red family, heavier weight, border + fill) vs operational (amber family) so a late arrival can never visually outrank a deteriorating patient.
- **Overdue convention:** due = outline pill; due-soon = amber fill; overdue = red fill + count-up timer; acknowledged = adds avatar of owner. Same convention on every screen — boards, queues, tiles.
- **Typography:** Inter is right. Scale discipline: 28 page titles / 16 card heads / 14 body / 12 meta — nothing below 12; ward-tablet mode scales body to 16 and touch targets to ≥44px. Tabular numerals for all times and weights (`font-variant-numeric: tabular-nums`).
- **Density modes:** reception (compact rows, keyboard focus rings, more rows per viewport) vs clinical (calmer spacing) vs ward/wall (large, glanceable, auto-rotating board). Same components, density tokens.
- **Provenance chips as a first-class component:** `PMS · 10:42` / `Care Hub` / `Typed` / `Dictated` / `AI draft` / `Device` — small, consistent, everywhere data appears.
- **Cards/tables:** current card language is good; give every list a real empty state ("No patients waiting — next arrival 10:20") and a stale-data state. Timeline: type icons, author, AI badge; group by episode.
- **Pet identity:** replace emoji avatars with photo-first (photo exists in the data model) + species-icon fallback; keep the paw brandmark. Emoji reads as toy-like on a clinical screen and fails at identity (two brown dogs).
- **Forms:** per-field provenance + explicit not-recorded states; never prefill clinical normals; preserve state across interruptions (auto-draft everything, resume banners).
- **Accessibility:** WCAG AA contrast audit (muted `#657083` passes body, fails at 11px; several pill text/background pairs are marginal); visible focus states on all interactives (currently none) [BUG]; full keyboard operability for reception; ARIA live regions for waiting-room and alert updates; reduced-motion respect for the pulse animation.
- **Responsive:** consult three-pane → tabs (Note / Scribe) at tablet width; board → snap-scrolling columns + "my patients" filter; the 1100px collapse breakpoint needs an intermediate 1280px layout (current jump is too abrupt) [BUG-adjacent: fixed-width schedule-row columns cause the overlap artefacts visible in the PNGs].

## 12. Top 15 changes for the next iteration

1. Design the **Task & handover centre** — the product's core, currently absent.
2. Add the **global escalation component** (raise → route → acknowledge → resolve) to every patient context.
3. Implement the **overdue/due-soon/acknowledged pill convention** everywhere times appear; add the ward "next due" rail.
4. Split Today into **role variants** (reception/vet/nurse/director) from shared components; fix the signed-in-role mismatch.
5. Add **provenance chips** (PMS/local, typed/dictated/AI) across patient record and exam grid; structurally block AI from exam fields.
6. Give the scribe panel **session controls** (pause/stop/mark/dictate), consent detail, low-confidence marking, and the four-zone layout (§9).
7. Turn "Review & sign" into the **sign-and-complete flow**: AI-diff review, attestation, then forced-choice follow-up tasks.
8. Design **phone intake with red-flag prompts** and the escalation card it fires.
9. Design the **repeat-prescription queue** with the vet review screen (last-assessment date, drug-class flags, SLA timers).
10. Rework hospital cards: controlled status vocabulary, vet + nurse + location on every card, checklist fractions instead of progress bars, discharge-criteria states, escalate button.
11. Make **needs-attention items owned and acknowledgeable**; make every stat tile drill down.
12. Add allergy/adverse-reaction chip to every clinical context header; replace "None recorded" with NKA/not-assessed semantics.
13. Add per-entry **dates + authors to comfort profile and risk banners**; surface handling flags as header chips and waiting-room cues.
14. Fix demo-data credibility: a Tuesday, realistic staff count, matching counts, Andale-consistent species mix, no Sunday clinic [FACT]; fix clipped buttons and focus states [BUG].
15. Produce the two end-to-end screen storyboards (repeat Rx; obs→escalation→resolution) to pressure-test 1–11 before any further visual polish.

---

*Validation note: every [ASSUMPTION] above inherits the discovery pack's verification plan — Part 13 interview guide and the shadowing agenda in Part 12, Phase 0. The fastest way to test this UI is not a demo but a paper walkthrough of yesterday's real workload against screens 1–4 with Natalie Gillan and Catherine Dixon.*
