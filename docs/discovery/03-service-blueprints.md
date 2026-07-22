# Part 5 — Service Blueprints

> Format per blueprint: **Client** (visible actions) · **Frontstage** (staff-facing-client) · **Backstage** (invisible work) · **Systems** (current [FACT/ASSUMPTION] → proposed) · **Data created** · **Handoffs** (→ = ownership transfer) · **Failure points ⚠** · **Safeguards 🛡** · **Automation ⚙**.
> Current-state systems are labelled: M = Merlin/PMS [ASSUMPTION], MVA = My Vet Account [FACT], W = website forms [FACT], P = paper [ASSUMPTION], V = verbal [ASSUMPTION]. Proposed platform = **PLT**.

## 5.1 New client & pet registration

- **Client:** submits website registration form (species/breed, DOB, previous practice, transfer consent [FACT]) → attends first visit.
- **Frontstage:** reception welcomes, confirms details at first visit, photographs pet [REC].
- **Backstage:** form lands (ClinicsView → ? [ASSUMPTION email/queue]); duplicate check in M; client+patient created in M; previous-history request sent to old practice (email/phone [ASSUMPTION]); history chased; history filed.
- **Systems:** W + M + email → PLT holds a **registration pipeline**: Received → Verified → History requested → History received → Complete; M stays master for the client/patient record.
- **Handoffs:** website→reception (⚠ nobody owns the inbox); reception→old practice (⚠ request sent, never chased — [REG Ch.13: transferring practice must share promptly, but someone must ask]); reception→vet (⚠ first consult happens before history arrives — vet unaware).
- **⚠** duplicate clients (same household, two records); species/breed garbage-in; transfer consent not recorded anywhere queryable.
- **🛡** dedupe suggestions on name+postcode+pet; "history outstanding" banner on the patient card until filed; registration stays open until verified (brief's rule — correct).
- **⚙** auto-chase timer on history requests (7 days → task); pre-visit "still missing: microchip no., insurance" checklist.

## 5.2 Ill-pet consultation

- **Client:** calls/books online → arrives → consults → pays → leaves with plan.
- **Frontstage:** reception intake (<60s form, red-flag prompts, 4.10) → check-in → vet consult → reception books re-check, takes payment.
- **Backstage:** vet pre-brief (summary card); estimate if investigation/treatment ≥ threshold [REG-CMA £500 written estimate]; consent; tests ordered; notes; sign-off; follow-up tasks.
- **Systems:** phone + M + MVA → PLT: intake record, waiting states, escalation, tasks, callback queue. Notes/Rx stay in M (MVP).
- **Handoffs:** reception→vet (presenting complaint — ⚠ lost/garbled: "vomiting" with no duration); vet→nurse (in-visit tests ⚠ verbal); vet→reception (re-check + charges ⚠ walked-out-unbooked); vet→self (results review ⚠ memory).
- **⚠** the classic five: unbooked follow-up, unreviewed result, uncalled callback, unsigned note, undiscussed estimate overrun.
- **🛡** every consult can end only by: complete / tasks-created / explicitly-none (forced choice, one tap); encounter links intake→consult→tasks into one episode (brief's "one encounter" rule — correct).
- **⚙** result-arrival → review task; re-check reminder to reception queue; same-day unsigned-note nudge.

## 5.3 Vaccination (incl. PHC)

- **Client:** reminder → books → attends → (PHC: no payment [FACT included]; else pays).
- **Frontstage:** reception verifies PHC status [⚠ membership lapsed but client believes covered — verify in IVC systems, FACT membership truth is IVC-side]; vet health-check + vaccinate; next-due set.
- **Backstage:** batch recorded [REG VMR]; certificate updated; reminder cycle reset.
- **Systems:** M (+ PHC/IVC for membership) → PLT adds only: lapsed-plan flag task, missed-vaccination recall queue. **Do not rebuild reminders** — M/IVC already send them [ASSUMPTION]; a second reminder stream double-messages clients.
- **⚠** course started, second dose missed (recall gap); kennel-cough given same-day discount logic [FACT £35 rule] misbilled; rabbit VHD2 scheduling confusion [species nuance].
- **🛡/⚙** overdue-course exception list; PHC-status surfaced read-only at check-in.

## 5.4 Repeat prescription — the highest-leverage workflow

Current [FACT]: free-text website form → "we will be in touch". No states, no SLA, no stock check, no med validation; 6-month re-exam policy stated on site.

- **Client:** submits form (or phones) → waits → (maybe) told ready → collects, pays (£37 written-Rx alternative [FACT]).
- **Frontstage:** reception receives collection, takes payment, hands over labelled meds [REG labelling particulars].
- **Backstage:** match request to patient in M (⚠ free-text pet name + client name — mismatch risk); pull med history; **check clinical-assessment currency** [REG under-care: assessment required; practice policy 6-month re-exam [FACT]; antimicrobials need physical exam in all but exceptional circumstances; CDs stricter]; vet authorises/declines/requests-appointment; stock checked; dispensed + batch recorded [REG]; client notified.
- **Proposed states (brief's list adopted, refined):** Received → Matched → Awaiting clinical review → More info needed → Approved / Declined / Re-exam required (auto-books task) → Being prepared → Ready for collection → Collected. Each transition timestamped + owner.
- **Handoffs:** web→reception→vet→dispensary→reception→client — **five ownership transfers on the current invisible rail** ⚠⚠.
- **⚠** request lost in inbox; vet reviews without seeing last-exam date; client arrives before it's ready (top complaint class sector-wide [ASSUMPTION]); CMA 48-hour written-prescription SLA missed [REG once Order in force]; fee above £21/£12.50 caps [REG-CMA pending].
- **🛡** vet-review screen must show: med, last dispense, last clinical assessment date+type, monitoring due (e.g. bloods for chronic meds), drug-class flags (antimicrobial/CD/cascade). Hard-stop if assessment stale per configured policy (default 6 months to match practice's stated policy, per-drug overrides).
- **⚙** SLA timers per state; auto-SMS/email "ready for collection" [FACT email exists; SMS assumption]; prescription-rights notice attached to every confirmation [REG-CMA].

## 5.5 Nurse clinic (nail clips, anal glands, weight, post-op checks)

- Flow: reminder/request → eligibility + PHC check [FACT nail/anal-gland included in plans] → nurse appt → assessment/procedure → record → next-due.
- **⚠** clinic used to smuggle in "can you just look at…" clinical concerns → nurse needs one-tap convert-to-vet-escalation 🛡 [REG: diagnosis is vet-only]; PHC "included" vs "full price £43.78" [FACT] mischarged.
- **⚙** next-due auto-task; weight trend chart flags loss >10% between visits → vet review task.

## 5.6 Dental procedure & 5.7 Surgery (shared blueprint, dental deltas noted)

- **Client:** consult → estimate + consent → pre-op instructions (fasting — species-critical: **rabbits must NOT be fasted** 🛡 species-conditional instruction templates) → drop-off (admission conversation, contact-numbers-today, resus/CPR preference [REC capture explicitly]) → day-of update call → collection + discharge talk → post-op check.
- **Frontstage:** admission nurse walkthrough; consent signature; discharge appointment.
- **Backstage:** theatre list built; pre-op checks (weight today, IV access, pre-GA bloods offered?); premed per vet; anaesthesia (Rebecca Trimmer interest [FACT]) — **anaesthetic record stays paper/PMS in MVP** [REC: real-time anaesthetic charting is a specialist product; do not attempt]; procedure; recovery obs escalating frequency; dental delta: unexpected extractions mid-GA → **client contact for estimate change** [REG-CMA +20%/£500 re-estimate; consent limitation "phone if > £X" captured at admission 🛡]; discharge criteria checklist; meds-to-go labelled [REG].
- **Proposed PLT surface:** the state machine board (4.5), pre-op and discharge checklists, client-update tasks with due times, estimate-version log, consent-limitation field surfaced in theatre.
- **⚠** the mid-GA phone call unanswered (decision stalls — capture fallback authority at admission: "proceed up to £X" 🛡); discharge rushed at 18:00 with no written instructions; post-op check never booked.
- **⚙** "client update due" timer set at admission; discharge-pack template per procedure; post-op task auto-created on discharge.

## 5.8 Diagnostics & lab results

- Flow: vet orders (M or lab portal [ASSUMPTION IDEXX in-house + external reference lab]) → sample collected/labelled ⚠ mislabel → sent → result returns (VetConnect/portal/PDF→M [ASSUMPTION]) → **review** → client informed → follow-up.
- **The brief's rule — "prevent results being returned without review and communication" — is the whole game.** PLT: every ordered test = an open loop with owner (requesting vet) and states Ordered → Sampled → Sent → Resulted → Reviewed → Client informed → Actioned. Loops visible; ageing loops escalate.
- **⚠** result arrives while vet off (part-timers [FACT Gillian PT]) — 🛡 duty-vet reassignment rule; "no news = good news" client assumption — 🛡 informed-state is mandatory, even for normals ⚙ (normal-result comms can be templated, human-sent in MVP; auto-send only with explicit vet release).
- **MVP honesty:** without lab/PMS integration, "Resulted" is set by a human. Still worth it — the loop registry is the value; integration upgrades it later.

## 5.9 Hospital admission & 5.10 discharge (inpatient)

- Admission: care plan (responsible vet + nurse named [REG PSS expectations]) → obs schedule + care tasks → vet review at least daily [REG PSS] → client-update times agreed → discharge criteria set at admission (not invented at 17:45 🛡).
- Board card shows (brief's list adopted): vet, nurse, status, next obs, next med, escalation threshold, client-update due, expected discharge.
- **⚠** obs missed during theatre-busy hours (⚙ overdue rolls up to Head RVN); weekend/OOH — Andale closes Sat 12:00 [FACT]: **any patient not dischargeable transfers to Vets Now** → transfer pack (history summary, meds given, obs chart) 🛡 generated from the board; ⚠ transfer information verbal/phone-only today [ASSUMPTION].
- Discharge: criteria checklist → vet sign-off → meds labelled → written instructions → client walkthrough → post-op/re-check task → (5.11 continuity if transferred).

## 5.11 Out-of-hours emergency (Vets Now Liverpool)

- **Client:** calls practice (closed) → hears/reads Vets Now details [FACT phone + emergency page] → attends L36 3YD → treated → returns to Andale for follow-up.
- **Backstage current [FACT Vets Now public docs]:** notes transferred back "the following morning"; hospitalised-case handover by phone + written history.
- **PLT:** a **morning OOH inbox**: every Vets Now report becomes a triage task (vet reviews → follow-up created → client called). ⚠ today the report lands in email/PMS and urgent follow-ups compete with a full consult list [ASSUMPTION]. Outbound: an end-of-day "at-risk patients" note for foreseeable OOH contacts (recent surgeries, unstable chronics) is a practice-policy option [REC — verify appetite; intra-group data sharing is lawful-basis-clean but still needs documenting].
- **🛡** OOH tasks cannot be closed without a logged client contact or explicit no-action-needed reason.

## 5.12 End-of-life care

- **Client:** QoL discussions (possibly several) → decision → appointment (end-of-day slot, side room [REC quiet-flag on booking]) → consent (incl. aftercare choice: home burial / communal / individual cremation with pricing [REG-CMA cremation transparency]) → procedure → grieving time uninterrupted → payment handled **later or in advance, never in the room** [REC] → ashes return / follow-up.
- **Backstage:** comfort-first room prep; deceased status set same-day → **all reminders + PHC/marketing suppressed** [brief's rule; implement as immediate, automatic, verified 🛡 — the "booster reminder for a dead pet" letter is the sector's most notorious failure]; PHC cancellation task (IVC-side, manual [FACT]); insurance/cremation paperwork tasks; bereavement follow-up card (Shari Coles) after ~1 week [REC].
- **⚠** reminder suppression missed in any one of several systems (M reminders, IVC comms, PLT) — 🛡 deceased-status checklist task enumerating every system until integrations exist.

## 5.13 Complaint

- Flow [REG-CMA: 5-day acknowledgement, 8-week resolution, complaint log, mediation participation]: received (any channel) → logged with owner → acknowledged (timer) → record preserved (freeze/flag related records 🛡) → investigation → response → corrective action → resolution → learning review.
- **⚠** complaints arriving via a receptionist mid-shift and living in her head; escalation to IVC processes above practice [ASSUMPTION exists — verify interplay].
- **⚙** timers with escalation to Practice Director; complaint log export [REG-CMA].

## 5.14 Insurance claim

- Flow: client supplies policy → treatment → claim form (client-portal insurer forms and/or eClaims via PMS [FACT rails fragmenting: VetEnvoy→Petios/Allianz; non-Allianz insurers reverting to portals]) → history + invoice attached → submitted → insurer queries ⚠ → settlement (client or direct).
- **PLT stance [REC]:** do **not** automate submission in MVP (fragmenting rails, PMS-held invoices). Track the *workflow*: claim tasks with states (Docs needed → Submitted → Query → Settled), owner (Shari Coles), and chase timers. ⚠ today: claim status lives in insurer portals and memory [ASSUMPTION].

## 5.15 Health-plan (PHC) interaction

- Join/renew/cancel happen on pethealthclub.com / IVC systems [FACT]. PLT: read-only status display at check-in and on patient card; discrepancy task ("client says member, no record") ⚠ common at desk [ASSUMPTION]; entitlement chips on services (Included / 10% / 20% [FACT price list]); deceased→cancellation task (5.12).
- [REG-CMA] plan savings-disclosure duties fall on IVC corporately — not a practice-product feature; for the independent-market product this becomes a real (small) plan-admin module later.

## Cross-blueprint patterns

1. **Every workflow is a state machine with owners and timers** — the platform is, at core, a typed-workflow engine (Part 7).
2. **The failure points are almost never clinical skill — they are custody transfers.** Five handoffs in a repeat prescription; four in a lab result. Product's unit of value = a custody transfer made explicit.
3. **Species-conditional logic appears everywhere** (rabbit fasting, cat urination red-flag, dog-weight neuter bands [FACT price list]) — encode species awareness in templates from day one.
4. **The CMA Order timers (estimate, prescription, complaint) recur across blueprints** — one shared timer/evidence subsystem, not per-feature clocks.
