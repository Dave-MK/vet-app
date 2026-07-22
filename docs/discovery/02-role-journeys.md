# Part 4 — Role Journeys (reviewed, challenged, corrected)

> Format per role: goals · entry points · journey (challenged against the brief) · data viewed/created · decisions · tasks in/out · pain points [ASSUMPTION unless observed] · risks · automation · features · permissions · success measures.
> Cross-cutting corrections to the brief first, because they affect every journey:
>
> 1. **[FACT] Andale is ~21 people.** Several "role families" are one person. People multitask (a receptionist covers client care; the VCA was a receptionist; the Practice Director is an RVN by background). Design **role-based views over one shared workspace**, not eleven separate applications. Permissions differ; the data model does not.
> 2. **[REG] Permissions are legal, not just organisational.** Schedule 3 VSA 1966: RVNs act under a vet's *direction*; SVNs additionally under *supervision* (supervisor on premises; "direct, continuous and personal" for minor surgery). Diagnosis, POM-V prescribing and body-cavity surgery are vet-only. The brief's "competency-based permissions" idea is right and should be modelled as *competency flags layered on top of statutory role ceilings* — competency can restrict below the ceiling, never extend above it.
> 3. **The brief over-indexes on dashboards and under-indexes on interruption.** Real practice work is interrupt-driven (walk-ins, phones, deteriorating inpatients). Every journey below needs a "resume where I was" property; long forms that lose state on interruption will be abandoned.

---

## 4.1 Practice Director (Debbie Roden — Practice Manager, RVN background)

**Correction to brief:** this is an operational manager's journey, not a clinical director's. Clinical oversight items (protocol updates, adverse-event review) belong to the Senior Vet (4.2). Financial levers (pricing) are largely IVC-set [ASSUMPTION — verify local pricing latitude in discovery].

- **Goals:** the day runs; nothing overdue is invisible; complaints and incidents are owned; staffing covers demand; compliance evidence exists when asked for.
- **Entry points:** morning exceptions review; complaint arrival; incident report; rota gap; end-of-week review.
- **Journey (revised):** 1) Opens exceptions view — only items breaching thresholds (overdue tasks by team, unsigned records >24h, complaints nearing 5-day acknowledgement [REG-CMA], unresolved callbacks >48h, hospital obs overdue). 2) Drills to the owning person/team. 3) Reassigns or nudges (one action). 4) Reviews trend tiles weekly, not daily. 5) Exports evidence packs (PSS/CMA/complaint log) when needed.
- **Data viewed:** task ageing by team; unsigned-record count; complaint pipeline with timers; waiting-time stats; handover completion; (later) AI correction rates. **Not in MVP:** revenue, discount analysis — Merlin owns finance.
- **Data created:** operational tasks; complaint records + outcomes; incident actions; role/competency configuration; threshold configuration.
- **Decisions:** escalate vs monitor; reassign ownership; approve workarounds; sign off corrective actions.
- **Pain points [ASSUMPTION]:** chasing by walking around; complaint evidence scattered across email/paper; no view of "what didn't happen today".
- **Risks:** dashboard as surveillance — if staff experience metrics as monitoring, adoption dies. Present exceptions as *shared safety net*, not league tables. Keep per-person metrics out of v1.
- **Automation:** threshold alerts; complaint-timer escalation; weekly digest.
- **Permissions:** full operational read; config write; **no clinical signing**; read-only clinical content (she is an RVN but acts in a management role — separation of duties).
- **Success measures:** zero complaints missing 5-day acknowledgement; overdue-task half-life; % handovers acknowledged.

## 4.2 Senior Veterinary Surgeon / Clinical Lead (Clare Crook)

- **Goals:** escalations resolved fast; graduate supported; protocols current; unexpected outcomes reviewed.
- **Journey (brief's version accepted, two changes):** add 0) *she also runs her own full consult list* — seniors at a 4-vet practice are not full-time reviewers; the escalation queue is a sidebar, not a home screen. Change 7) protocol updates are practice-local documents possibly constrained by IVC group protocols [ASSUMPTION — verify].
- **Data viewed:** escalation queue with reason codes (deterioration, estimate exceeded, graduate support, medication/dosage concern, unexpected result, client dissatisfaction, referral consideration); full case context in one click; graduate's question with the case attached.
- **Data created:** senior review notes (in-record when clinical; separate supervision feedback when educational — the brief's separation is correct and matches VetGDP's external e-portfolio); escalation outcomes; protocol documents.
- **Decisions:** accept/modify plan; refer; take over case; approve estimate overrun [REG-CMA: re-estimate trigger at +20%/£500].
- **Pain:** interruptions without context ("can I grab you about the vomiting dog?"); nothing recorded about corridor advice.
- **Automation:** escalation routing with fallback (if senior unavailable in N minutes → next vet); auto-attached case summary on every escalation.
- **Permissions:** everything a vet has + protocol publishing + supervision views + incident review.
- **Success:** escalation time-to-response; % corridor consults captured; graduate escalation trend (should fall over months).

## 4.3 Veterinary Surgeon (Gillian Tunney, Matthew Houghton)

- **Goals:** run 10-15-minute consults on time; complete notes same-day; nothing falls through after the client leaves.
- **Journey — brief's 15 steps are right but are a *documentation* sequence, not a *time* sequence.** In a 10–15-minute consult, steps 4–12 interleave; the workspace must tolerate out-of-order, partial entry with one visible completeness state. Two additions: **0) pre-brief** — 30-second scan of summary card (species/age/weight trend, alerts, allergies, active meds, last visit, outstanding tasks, PHC status, comfort profile); **16) post-consult burst** — the 2 minutes between consults where tests get ordered and tasks created; the UI must make this batch-fast.
- **Data viewed:** the brief's list is complete; prioritise (top card): allergies/adverse reactions, current meds, weight+trend, alerts/handling, reason for visit, outstanding actions. Everything else collapses.
- **Data created:** brief's list correct. In MVP-without-PMS-integration, clinical notes stay in Merlin [REC]; the product captures *tasks, callbacks, follow-ups, escalations, estimates-discussed flags* around the consult. Full consultation workspace activates only with PMS write access or in the independent-practice deployment (Part 10 phasing).
- **Decisions:** differential priorities; investigate-vs-treat; refer; euthanasia discussions; prescribe (vet-only [REG]).
- **Tasks out:** lab submissions (nurse), callbacks (reception/self), re-checks, estimate follow-ups; **tasks in:** results review, repeat-Rx authorisations [REG: clinical assessment currency check — see 5.4], callback outcomes.
- **Pain [ASSUMPTION, well-evidenced sector-wide]:** notes finished after hours; results reviewed in gaps; chasing consent forms; no visibility of whether the client was ever called back.
- **Risks:** anything that adds clicks inside the consult will be rejected — measure clicks-to-complete relentlessly.
- **Automation:** results-arrived → review task auto-created against requesting vet; unsigned-record nudge at day end; (Phase 3) scribe drafting.
- **Permissions:** full clinical read/write; sign own records; prescribe; approve estimates; cannot alter others' signed entries (append-only comments only) [REG Ch.13 amendments].
- **Success:** same-day sign-off %; note time (target −50% with scribe); zero unreviewed results >24h; callback completion.

## 4.4 Graduate Veterinary Surgeon (Alice Fitzpatrick)

- **Correction [REG]:** a registered graduate is a full MRCVS — **no statutory clinical restrictions exist**. VetGDP requires a named adviser, protected time and reflective e-portfolio (held by RCVS, not this product). The brief's "mandatory senior approval for selected procedures" is therefore a *practice policy* option, not a legal requirement — make it configurable, default gentle (advisory review prompts), or it will insult a qualified professional.
- **Journey:** as 4.3 plus: visible named adviser; one-tap "request senior input" that attaches full case context and posts to the senior's queue with urgency; optional case-flagging rules (e.g. first N of a procedure type auto-suggest debrief) set by the clinical lead.
- **Data created (additional):** supervision requests; case-discussion log (exportable summary the graduate can reference when writing their own RCVS e-portfolio entries — do not replicate the portfolio).
- **Separation requirement (brief is right):** supervision feedback lives outside the clinical record; the clinical record shows only clinical facts (including "case discussed with C. Crook; plan agreed" — that *is* clinical).
- **Success:** time-to-senior-response; graduate confidence survey; declining mandatory-review overrides.

## 4.5 Head RVN (Catherine Dixon)

- **Journey:** brief's 7 steps accepted; add **theatre-list coordination with the day's consult diary** (same nurses do both) and **SVN supervision scheduling** (she is the clinical coach; Schedule 3 supervision must be physically possible — the rota and the task assignment interact [REG]).
- **Nursing command board (brief's column list is good).** Refine to state machine: Booked in → Admitted → Pre-op checks → Premed → In theatre → Recovery → Ward (obs/med schedule active) → Ready for discharge → Discharged. Escalation flag orthogonal to state. Assigned nurse + directing vet visible on every card [REG Schedule 3 direction].
- **Data created:** assignments (with competency check), handovers, escalations, sign-offs of SVN entries, equipment/stock issue reports (routed to Caroline Rustage's stock role [FACT she holds it]).
- **Pain [ASSUMPTION]:** paper theatre list + paper hospital sheets + whiteboard; obs timings tracked in heads; handover verbal.
- **Permissions:** assign anyone in nursing; sign-off SVN/VCA entries; edit board config; no prescribing.
- **Success:** overdue obs count; handover acknowledgement rate; % SVN entries countersigned same shift.

## 4.6 RVN (×8)

- **Journey:** brief's 12 steps accepted. Bedside/mobile capture is **the** requirement — a desktop-only product fails here; kennel-side entry on a shared tablet with big tap targets, offline tolerance, and barcode/QR on kennel cards [REC].
- **MAR caution (R3):** without PMS integration the product must not present itself as the authoritative medication administration record. MVP holds *scheduled care tasks* ("give X per vet's direction — recorded in Merlin") with completion evidence; the authoritative MAR stays in the PMS/paper until integration. Two simultaneous MARs is a safety defect, not a feature.
- **Data created:** obs sets (TPR, pain score — recommend Glasgow CMPS-SF for dogs, feline grimace for cats [REC]; stress score), fluids, wounds, feeding/toileting, discharge checklist, escalation notes, client-education notes.
- **Escalation:** one-action escalate-to-vet with severity; if unacknowledged in N minutes, auto-bump to any vet + Head RVN.
- **Success:** obs completed within ±10 min of due; escalation acknowledgement time; discharge checklist completion before client arrival.

## 4.7 Student VN (Lauren Wright)

- **[REG] Schedule 3:** supervisor (vet or RVN) on premises and able to respond; direct continuous personal supervision for minor surgery. Model: every SVN task carries a named supervisor; SVN entries save as **draft pending countersign**; countersign queue for RVNs; the *draft* is still timestamped/attributed (contemporaneity).
- **Competency flags** (set by clinical coach): what she may do unsupervised-in-room vs observed. Flags restrict below the SVN statutory ceiling.
- **Training evidence:** link completed tasks to a personal export (CSV/PDF) she can cite in her college portfolio — do not integrate with awarding-body systems in v1.
- **Success:** % entries countersigned <4h; breadth of competency-tagged activity.

## 4.8 VCA (Helen Evans)

- **Journey:** brief accepted. Simplest possible surface: big-button task board (rooms, cleaning, feeding, sample runs, restock), photo attachment for equipment issues, "concern" button that creates an escalation to the responsible nurse with no free-text required.
- **Privacy [REC]:** VCA view shows patient name/species/kennel/handling flags — not client contact details, not clinical narrative (data minimisation, UK GDPR).
- **Success:** task completion latency; % concerns raised through the system vs verbally-lost.

## 4.9 Head Receptionist (Natalie Gillan)

- **Journey:** brief accepted; add **daily 8:00 board setup** (who's in, which vet is consulting where, expected surgical discharges) and **end-of-day sweep** (unresolved callbacks redistributed before close — Andale closes 18:30 weekdays, 12:00 Saturday [FACT]; Friday sweep matters most because the practice is dark until Monday).
- **Reception overview tiles (brief's list good):** clients waiting (with minutes), late/no-shows, urgent intake awaiting clinical triage, prescriptions awaiting collection vs awaiting review [state model 5.4], discharges expected, callbacks due today, unpaid flags [read-only; Merlin owns money].
- **Permissions:** all reception functions + reassign queues + complaint intake + override booking rules (logged).
- **Success:** average check-in-to-seen time visible; zero silently-dropped callbacks; phone-queue abandonment [ASSUMPTION phone system provides this — do not integrate v1].

## 4.10 Receptionist (×3)

- **Journey:** brief's 12 steps accepted with one restructure: steps 2–7 happen *during a live phone call under time pressure* — the intake form must be completable in <60 seconds: search-as-you-type client/pet match, one-line reason, urgency prompt chips, appointment-type suggestion from reason [REC rule-based, not AI, v1].
- **Red-flag prompts:** brief's list is safe and good; seed additionally from the site's own critical-conditions list [FACT]: breathing difficulty, seizures/fitting, inability to urinate (esp. male cats), ≥5 vomiting/diarrhoea episodes in 12h or blood, inability to stand, swollen abdomen/retching (large dogs), whelping with green/bloody/brown discharge, eye problems. Positive → instant escalation card to duty vet/nurse + on-screen script ("bring the pet now / stay on the line") — **never automated reassurance, never "monitor at home" advice** (brief's safeguard, correct; also keeps humans in the loop per DUAA).
- **Out-of-hours branch:** if red-flag call arrives near close, script offers Vets Now Liverpool details (0151 480 2040) [FACT] — the product should log that referral for morning follow-up (continuity task, workflow 5.9).
- **Data created:** contact notes, appointments [in Merlin until integration — the product logs the *intent* and outcome], escalations, callbacks, check-ins, registration-verification tasks.
- **Success:** intake capture rate (% calls with a logged reason); red-flag escalation acknowledgement <2 min; callback completion same-day.

## 4.11 Client Care (Shari Coles)

- **Correction:** one person, 30+ years front-of-house [FACT]. Not a module — a **filtered task workspace**: follow-ups due, insurance-document chases, complaint actions, bereavement follow-ups, estimate decisions awaited.
- **Relationship view (brief's is right):** told / waiting-on-client / waiting-on-practice / owner / next contact due — implement as task metadata, not a new entity.
- **Bereavement [REC]:** deceased flag suppresses reminders and PHC/marketing comms immediately (the brief's requirement; also basic decency and complaint prevention). Note PHC cancellation is an IVC-side process — create a task, don't pretend to automate it [FACT PHC is IVC's].
- **Success:** zero reminders sent for deceased patients; complaint timer compliance; insurance-chase cycle time.

## 4.12 Client / Pet Owner

- **MVP: not a user.** [REC] The client already has My Vet Account, PHC, Stripe payments, the website forms. A new portal duplicates IVC's stack head-on (Part 1). The client's *experience* still improves via: faster callbacks, working prescription states ("ready for collection" actually meaning ready), discharge instructions on time, complaint acknowledgements inside 5 days.
- **Future portal (independent-practice market, Phase 4):** brief's feature list is sound; sequence: appointment requests + prescription requests + approved summaries + estimates/consent first; messaging last (messaging creates a staffing obligation — an unanswered portal message is a new failure mode; only ship with an owned queue and SLA).

## 4.13 Patient

- Brief's journey and Comfort Profile are excellent and cheap to build — a first-class differentiator for a practice advertising rabbit-friendly care and clinicians with feline-anxiety/dog-friendly interests [FACT team bios].
- **Comfort Profile entries:** factual, dated, attributed, amendable-with-history (matches Ch.13 amendment discipline [REG]); surfaced as chips on every card (waiting room, consult header, kennel card): "dog-reactive — separate waiting", "cover carrier", "food-motivated", "difficult blood draws — use L cephalic, warm compress".
- **Species logic:** rabbits are a stated focus — waiting/kennelling away from predator species, bonded-pair admission notes, gut-stasis vigilance prompts on obs schedules [REC].
- **Deceased handling:** status propagates to comms suppression (4.11), boards, and search (respectful display, not deletion — records must persist [REG]).

---

## Missing roles the brief omitted

| Role | Why it matters |
|---|---|
| **Locum vets/nurses** [ASSUMPTION Andale uses them] | Temporary accounts, fast onboarding, auto-expiry; locums must not inherit standing permissions |
| **Stock/pharmacy role** (Caroline Rustage [FACT]) | Receiving goods, batch recording [REG VMR], reconciliation tasks — even if dispensing stays in Merlin, "stock issue" tasks need an owner |
| **IVC regional/ops manager** [ASSUMPTION] | Occasional read access requests; complaints escalated above practice |
| **External bookkeeper/accounts** [ASSUMPTION] | Read-only exports at most |
| **Cleaner/maintenance contractors** | Not users; VCA task board covers facilities issues |
| **The rota owner** (whoever holds it) | Shift data feeds handover and assignment; ingest read-only from existing rota tool [ASSUMPTION one exists] |
