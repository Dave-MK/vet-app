# Andale Care Hub — Iteration 2 changelog

> What changed from the concept package to [`prototype-iteration-2.html`](prototype-iteration-2.html), mapped to the top-15 list in [ui-review-iteration-1.md](ui-review-iteration-1.md) §12.
> Still a concept prototype: static HTML, demo data, no backend. Labels as before — **[FACT]** (Andale website), **[REG]** (regulatory), **[REC]** (recommendation), **[BUG]** (defect fixed from iteration 1).

## How to view

Open [`prototype-iteration-2.html`](prototype-iteration-2.html) in any browser. Use the **"Viewing as"** switcher (top-left) to change role — the Today screen and nav change with it. The left nav moves between the seven screens. "▲ Escalate" (top bar, and on patient/board cards) opens the global escalation flow; "Review & sign" on the Consultation screen opens the sign-and-complete flow.

## Top-15 status

| # | Iteration-1 change | Status | Where |
|---|---|---|---|
| 1 | **Task & handover centre** — the product's core | **Built** | New `Tasks & Handover` screen: my/team/all tabs, overdue/due-today/this-week grouping, per-task owner + due chip + escalate; handover build (auto-pulled open items + risk notes) with acknowledgement tracking |
| 2 | **Global escalation component** | **Built** | Modal reachable from top bar, patient record, every hospital card, and intake outcomes: patient, reason category (discovery 4.2 set), severity, note, and a live **route preview** with the time-laddered escalation path |
| 3 | **Overdue / due-soon / acknowledged pill convention + ward "next due" rail** | **Built** | Time chips now: `due` (outline) → `due-soon` (amber) → `overdue` (red fill + count-up like `+7m`) → `acked`. Hospital board and nurse Today both open with a "Next due across the ward" rail |
| 4 | **Split Today into role variants; fix signed-in-role mismatch** | **Built** | Four Today variants (Reception / Vet / Nurse / Director) from one shell via `data-role`; role switcher drives them. Vet no longer lands on a reception board |
| 5 | **Provenance chips; block AI from exam fields** | **Built** | `Merlin` / `Care Hub` / `Typed` / `Dictated` / `Device` / `AI draft` chips across the patient record and consultation. Exam grid is labelled clinician-only; the scribe's "never generated here" card names exam findings/doses/diagnoses explicitly |
| 6 | **Scribe session controls + four-zone layout** | **Built** | Sticky control bar (REC timer, Pause/Stop/Mark/Dictate, consent chip); four zones: Transcript (with a low-confidence span) → Drafted facts (confidence + source-span + Accept/Edit/Reject) → Clinical considerations (expandable "why shown / checked / not checked / source / uncertainty") → audit strip (model + template + draft hash) |
| 7 | **"Review & sign" → sign-and-complete flow** | **Built** | Modal: AI-vs-edited diff review, attestation text, then a forced-choice follow-up block (create task / book recheck / callback / none-with-reason) — discovery 5.2's post-consult burst |
| 8 | **Phone intake with red-flag prompts + escalation card** | **Built** | New `Intake` screen: <60s contact capture, the eight safety questions seeded from the practice's own critical-conditions list [FACT], a red-flag **lock** that disables booking and arms escalation, and an intake log |
| 9 | **Repeat-prescription queue + vet review screen** | **Built** | New `Prescriptions` screen: 7-stage pipeline, "awaiting review" list with drug-class flags (POM-V, antimicrobial, controlled), and a vet review panel showing last-assessment date/type, monitoring status, repeats-used, and decision buttons that record the reason [REG under-care / VMR] |
| 10 | **Rework hospital cards** | **Built** | Controlled 3-slot card model: stage (column) · status (OK/Watch/Alert, icon+word) · time chip. Checklist fractions replace progress bars; **vet + nurse + kennel on every card**; escalate on every card; in-theatre cards show facts only (no anaesthetic charting) [REC] |
| 11 | **Owned/acknowledgeable needs-attention; drillable stats** | **Built** | Needs-attention rows carry a named owner + ladder + working Acknowledge; stat tiles are buttons with drill sublabels |
| 12 | **Allergy chip everywhere; NKA vs not-assessed** | **Built** | `NKA ✓` header chip on the record and consultation context strip; allergies line reads "No known allergies — asked & confirmed \<date\> · \<vet\>" not "None recorded" |
| 13 | **Dates + authors on comfort profile / risk banners; handling flags as chips + waiting-room cues** | **Built** | Every comfort entry and the active-concern banner now carry date + author; "nervous near larger dogs" surfaces as a header chip, a waiting-room cue, and the consult context strip |
| 14 | **Fix demo-data credibility + clipped buttons/focus states** | **Fixed** | Now **Tuesday 21 July 2026**, 26 appointments, real Andale staff names [FACT], matching column/card counts [BUG], visible `:focus-visible` rings, flex layouts that don't clip labels [BUG] |
| 15 | **Two end-to-end screen storyboards (repeat Rx; obs→escalation→resolution)** | **Partial** | The *screens* each flow needs now exist (Rx queue + review; hospital board + escalation modal + acknowledged state). The step-by-step storyboard sequence is the remaining iteration-2 design task |

## Also changed

- **Consultation demoted to Phase 3** [REC]: a persistent banner marks it as assuming Care-Hub-mastered notes, which the Andale deployment can't do before integration Gate G1. Nav carries a `PHASE 3` flag. MVP nav leads with Today / Tasks / Intake / Patients / Rx / Hospital.
- **Semantic colour tokens** [REC §11]: red reserved for clinical urgency (always icon + word), amber for operational attention, green for complete, blue informational, teal for brand/interactive only. Every iteration-1 pill that used colour decoratively was re-mapped.
- **Role-based nav visibility**: Administration hidden for non-director/-head roles; role switch also swaps the signed-in user identity.
- **Ward mode** toggle on the hospital board (larger type for a wall screen); reduced-motion respected on the record pulse.

## Known limits (deliberate, for a concept prototype)

- Static demo data; buttons are illustrative except navigation, role switch, acknowledge, red-flag lock, and the two modals.
- Not built here: Diagnostics open-loops list, discharge checklist screen, complaint/incident timers, Director drill-downs beyond the exception list. These are the "important after MVP" set from review §5.
- Accessibility pass is partial (focus rings, tabular numerals, reduced-motion in; a full WCAG AA contrast audit of every pill pair is still owed).

## Suggested next steps

1. **Paper-walkthrough test** (fastest, cheapest): run yesterday's real workload through these seven screens with Natalie Gillan (reception) and Catherine Dixon (Head RVN) — discovery Part 13 interview guide. This validates the [ASSUMPTION]s before any more build.
2. **Storyboard the two flows** (#15) as click-through sequences to pressure-test the task/timer/escalation/provenance systems end-to-end.
3. Resolve **Gate G1** (IVC Evidensia / MWI Merlin integration standing) — it determines whether the Consultation screen is ever reachable for Andale and gates the whole roadmap (discovery Part 8).
