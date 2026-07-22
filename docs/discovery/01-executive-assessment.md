# Part 1 — Executive Assessment

> Labels used throughout this document set:
> **[FACT]** verified on Andale's website or a cited source · **[REG]** regulatory requirement (cited) · **[REC]** product recommendation · **[ASSUMPTION]** requires validation in discovery.

## 1.1 The finding that changes everything

**[FACT] Andale Veterinary Centre is an IVC Evidensia practice.** The site footer names Inspiring Vet Care Limited (company 07746795, registered at IVC's UK head office in Keynsham); the privacy notice names Independent Vetcare Ltd as data controller; the Pet Health Club is IVC's group-wide plan; online booking runs through IVC's own My Vet Account portal; and the out-of-hours provider, Vets Now, is itself part of IVC Evidensia. Andale's Practice Director of record at group level, John Dinsdale, is also IVC's UK Country Medical Director (see Appendix B).

This has four consequences the original brief does not account for:

1. **Andale does not control its own systems.** The PMS (very likely MWI Merlin on IVC's dedicated Vetspace cloud tenant — [ASSUMPTION], high confidence), booking, portal, health plan, payments and website are all group-procured and group-operated. A practice-level decision to adopt a third-party workflow platform that touches client or clinical data is realistically **not Andale's to make alone**.
2. **The data controller is IVC corporate, not the practice.** [FACT] Any processor agreement (UK GDPR Art. 28) for a system holding client/patient data must be signed by Independent Vetcare Ltd. An AI scribe recording clients in an IVC consult room without a corporate-approved DPIA and DPA is a non-starter.
3. **The integration brief inverts.** "Integrate with Vetstoria and MyVetAccount" assumed these are neutral third parties. MyVetAccount has no public API and is IVC's own product; the realistic PMS API surface (MWI's Veterinary Integration Platform, mwiah.dev) is partnership-gated by MWI *and* would need IVC group approval. **Correction:** Andale's booking is MyVetAccount, not Vetstoria (the brief's Vetstoria assumption is wrong for this practice, though IVC does use Vetstoria elsewhere).
4. **The competitive landscape includes the owner.** IVC (Omnivet/My Family Vets) and MWI (Merlin roadmap, MWI Appstore) are both actively building the coordination and client-experience layers this product proposes. A third-party layer competes with the owner's own roadmap.

**None of this kills the product idea. It kills one specific business model** — "build a data-integrated operations platform and sell it to Andale as a single independent customer." The concept itself (a workflow, task, handover and ownership layer; later an AI scribe) addresses real, well-evidenced pain in first-opinion practice. The strategic question becomes *who the customer really is* (§1.5).

## 1.2 Is the concept viable?

**The workflow-coordination concept: yes, with a repositioned scope.** The five central principles (master record, shared timeline, role queues, structured tasks/handovers, clear ownership of next actions) are exactly what legacy PMSs are weakest at. PMSs are records-and-billing systems; the "who is doing what next, and is anything overdue" layer is genuinely underserved, and the brief's instinct to be a coordination layer rather than a PMS replacement is correct.

**The single biggest product risk is the shadow-system trap.** A coordination layer that cannot read from or write to the PMS forces staff to double-enter appointments, patients and clinical context into a second system. Double entry is precisely the pain the product exists to remove; if the product *causes* it, adoption dies in weeks. Worse, a second system holding medication schedules or observation timings that can drift out of sync with the PMS is a **clinical safety hazard** (two sources of truth for "when is the next dose due"). Every scoping decision below is downstream of this risk.

**The AI scribe: viable as a product capability, not as a differentiator on transcription alone.** [FACT] The UK market already offers veterinary AI scribes at ~£75–£150/vet/month (VetRec, ScribbleVet, Scribenote, HappyDoc, CoVet, Talkatoo, Digitail Tails AI), most claiming UK GDPR posture and PMS transfer. [REG] RCVS published AI-in-practice advice (April 2026): clinical decision-making must not be wholly delegated to AI; AI-generated records must be manually verified; clients must be told; developer training-use of practice data without client consent is called out. The differentiator available to this product is *workflow integration* — the scribe's output landing directly in the consultation workspace, generating tasks, estimates and client summaries — not speech-to-text quality.

## 1.3 Strongest value proposition

Ranked:

1. **Ownership and handover.** "Every unresolved action is a task with an owner, a due time and an escalation route." Nothing in the observed stack does this. It is cheap to build, PMS-independent-ish, and attacks the failure mode behind most practice complaints and near-misses (the chased-up lab result, the un-called-back client, the unsigned record, the missed re-check).
2. **The hospital/nursing whiteboard.** Timed observations, medication rounds with due/overdue states, escalation thresholds, discharge criteria. [REG] Maps directly onto RCVS PSS inpatient expectations (nursing responsibility on premises, daily vet exam, complete hospitalisation records). Paper "hospital sheets" are the norm and the pain is universal. [ASSUMPTION: Andale currently uses paper hospital sheets — verify in discovery.]
3. **Compliance-as-a-feature under the CMA Order.** [REG] The CMA's final report (25 March 2026) imposes enforceable remedies expected in force from ~September 2026: written estimates over £500 with re-estimate triggers at +20%/£500; itemised invoices; prescription-right notifications; digital prescriptions within 48 hours; prescription fee caps (£21 first / £12.50 additional); standardised weight-banded price lists; complaint handling with 5-day acknowledgement and 8-week resolution timers; health-plan savings disclosures. Every UK practice — corporate and independent — must operationalise this in months. A workflow product that ships these timers, templates and evidence trails natively has a time-limited, regulation-driven wedge. (For IVC practices, corporate will handle much of this centrally — the wedge is strongest for independents.)
4. **The consultation workspace + scribe** (later phase, §Part 9): reduces the real, measurable pain of note-writing time and same-day sign-off.

## 1.4 Main risks

| # | Risk | Severity | Notes |
|---|---|---|---|
| R1 | **Access/gatekeeping**: IVC + MWI approval needed for any data integration at Andale | Existential for the Andale-specific plan | See §1.1. Validate first, before any build. |
| R2 | **Shadow-system double entry** | Existential for adoption | Mitigations: start with workflows the PMS doesn't do at all (tasks, handover, whiteboard); minimise duplicated master data; treat any un-integrated clinical data entry as a red flag. |
| R3 | **Clinical safety of a second source of truth** | High | Never hold medication *orders* without integration; hold *task mirrors* of them with explicit "source: verbal/PMS" provenance and no auto-sync claims. |
| R4 | **Regulatory load underestimated** | High | Medicines records (5-year retention, batch, cascade), CD registers, Schedule 3 delegation, Ch.13 amendment rules — a "simple" workflow layer that touches prescribing inherits all of it. Keep prescribing out of MVP. |
| R5 | **AI scribe legal exposure** | High | Mandatory DPIA; IVC is controller; RCVS April 2026 advice; recording staff (employment monitoring) as well as clients. |
| R6 | **Tiny-practice economics** | Medium | [FACT] Andale has ~21 staff, 4 vets. A per-seat product for one such practice is not a business; this only works as (a) a design-partner for a multi-practice product or (b) an internal tool with explicitly non-commercial goals. |
| R7 | **CMA remedy details still settling** | Medium | Final Order text/commencement pending as of research date — build compliance features configurable, not hard-coded. |
| R8 | **Brief's role model vs reality** | Low-medium | Single-person "role families" (one graduate, one SVN, one VCA, one client-care) — the org is ~21 people who all multitask; heavyweight per-role dashboards over-serve it. Design role *views*, not role *silos*. |

## 1.5 Strategic options (decide before Phase 0 ends)

- **Option A — Sell to IVC centrally.** Direct route to Andale-with-integration. Realistically requires an enterprise sales motion against IVC's own roadmap. Low probability for a new entrant; do not plan around it.
- **Option B — Andale as discovery partner; product targets independent practices.** Use Andale relationships (if the user has them — [ASSUMPTION]) for shadowing and interviews under NDA; build the workflow layer for the ~40–45% of UK practices that are independent and *can* choose their own software, where Teleos/ezyVet/Provet APIs and VetXML rails are accessible and the CMA compliance wedge is sharpest. **[REC] This is the recommended commercial path.**
- **Option C — Internal-only, PMS-adjacent tool for Andale.** A genuinely useful non-integrated slice (tasks, handover board, hospital whiteboard, triage prompts) that holds *operational* data only, minimal client-identifying data, deployed as a practice-level tool the way practices already use whiteboards and paper diaries. Must still be cleared with IVC IT/DPO once it holds any client/patient identifiers. Viable as a proving ground; not a business by itself.

Options B and C compose: build C's scope as the MVP, with B's market as the destination.

## 1.6 Remove, delay, simplify

**Remove from scope (reject):**
- Full pricing/eligibility engine for PHC entitlements — the plan is IVC's; membership truth lives in IVC systems; the product only ever needs to *display* plan status and apply configured discounts. Post-CMA, price-list publication is needed — but that is a content/compliance feature, not an entitlement engine.
- Payments processing (Stripe page + Merlin invoicing exist); client portal (duplicates MyVetAccount head-on — revisit only for independent-practice market); insurance claims automation ([FACT] the VetEnvoy rail is fragmenting under Allianz/Petios — multi-channel chaos, low leverage); telephony integration (delay indefinitely).
- Automated client-facing triage advice. [REC] Red-flag *prompts for staff* only; the site already publishes a critical-conditions list that can seed the prompt set. No automated reassurance — matches the brief's own safeguard and avoids DUAA Art. 22A-D territory.

**Delay:**
- AI scribe (Phase 3, after workflow adoption is proven; buy-vs-build assessment in Part 9).
- Diagnostics integrations (needs lab/PMS partnership); referral document automation; rota/HR features (use existing rota tooling; ingest shifts read-only).
- Client portal and pre-visit questionnaires.

**Keep and sharpen (the actual MVP surface, Part 10):**
- Task system with ownership, due times, escalation; shift handover with acknowledgement; hospital/nursing whiteboard; reception Today board with waiting states; structured phone-intake with red-flag prompts; communication log; append-only audit trail. CMA complaint/estimate timers as fast-follow.

## 1.7 PMS, integration layer, or workflow platform?

**[REC] A workflow platform — explicitly not a PMS, and only an integration layer where integration is genuinely attainable.**

- *Not a PMS*: replacing Merlin at an IVC practice is impossible, and even for independents, PMS replacement is a rip-and-replace sale with medicines/CD/finance regulatory burden that would consume the roadmap. The moment the product stores prescriptions or invoices as the primary record, it inherits VMR record-keeping, CD registers, labelling and CMA invoicing duties — Part 7 fences this boundary.
- *Integration layer as aspiration, not identity*: integration depth is dictated by gatekeepers (MWI VIP, IDEXX, Covetrus, VetXML). Design adapter seams from day one; sell value that exists even at zero integration.
- *Workflow platform*: the defensible core. It owns what the PMS doesn't: tasks, ownership, handovers, boards, timers, escalation, and the audit trail of coordination. Source-of-truth rules in Part 7 keep it honest.

---

# Part 2 — Existing-System Assessment

## 2.1 What Andale appears to use now

All [FACT] from site inspection (Appendix C) unless marked:

| System | Function | Replace? | Integration prospects |
|---|---|---|---|
| PMS — likely MWI **Merlin** on IVC's Vetspace tenant [ASSUMPTION, high confidence; could be Voyager pending migration] | Clinical records, scheduling, invoicing, reminders, dispensing | **Never** | MWI VIP APIs (11 APIs incl. Calendar, Clinical, Patient, Billing) exist but are partner-gated + need IVC approval |
| **My Vet Account** (IVC Omnivet) | Client portal, online booking, PHC membership view | No | No public API; IVC-internal |
| **Pet Health Club** (IVC; Essential/Plus) | Preventative plan, discounts, member shop | No | IVC-internal; checkout on pethealthclub.com |
| **Stripe** payment page | Online bill payment by invoice ref | No | Irrelevant to MVP |
| Native website forms | New registration; repeat-prescription requests (free-text meds, reCAPTCHA, "in touch when ready"; 6-month re-exam policy stated) | These are the weakest links — the *workflow behind them* is the opportunity | Forms post to IVC's ClinicsView platform; the back-office handling is invisible and likely manual [ASSUMPTION] |
| **Vets Now** Liverpool | OOH emergency (intra-group) | No | Documented flow is report-based, next-morning; no public real-time integration |
| **PawSquad** | 24/7 video vet (PHC benefit) | No | None needed |
| OneTrust / Google (GTM, reCAPTCHA, Maps) | Consent, analytics | No | n/a |

## 2.2 Which systems already perform parts of the proposal

- **Scheduling/booking**: Merlin + My Vet Account already cover appointment booking, the diary and reminders. The brief's "Today and appointment board" partially duplicates the PMS diary — the *waiting-room state machine* (arrived → waiting → in-consult → done, with wait-time visibility) is the part PMSs do badly. [ASSUMPTION: verify what Merlin's day-view actually shows Andale staff.]
- **Clinical records, prescriptions, dispensing, invoicing, insurance claims**: Merlin. Out of MVP scope entirely.
- **Client comms**: Merlin/IVC reminder tooling exists ([ASSUMPTION] likely Virtual Recall or similar in the MWI Appstore). The *internal* comms/callback log is genuinely missing from public view.
- **What nothing observably does**: structured tasks with owners and escalation; shift handover with acknowledgement; hospital whiteboard with timed obs; triage red-flag prompts at reception; complaint timers; estimate-versioning evidence trails; a repeat-prescription request *queue* with states (the current form is fire-and-forget email-equivalent [ASSUMPTION]).

## 2.3 Where the proposed product provides unique value

1. The coordination layer of §2.2's last bullet — uncontested at this practice, per public evidence.
2. CMA-compliance workflow (timers, estimate versions, prescription SLAs) — for independents especially.
3. Scribe-to-workflow integration (Phase 3) — scribes exist; scribes that create tasks, discharge notes and CMA-compliant estimates inside the same workflow do not.

---

# Part 3 — Stakeholder Map

## Internal (practice)

| Stakeholder | People (actual) | Role in product |
|---|---|---|
| Practice Director / Practice Manager | Debbie Roden (RVN background — operational, not a vet) | Primary decision-maker at practice level; owner of ops dashboards; **note: not a clinician — the brief's assumption of a clinically-focused director is wrong here** |
| Clinical lead / Senior vet | Clare Crook | Clinical owner: protocols, escalations, graduate oversight, scribe pilot lead candidate |
| Vets | Gillian Tunney (PT), Matthew Houghton | Primary users: consultation workspace, results, callbacks |
| Graduate vet | Alice Fitzpatrick | Supervised user; VetGDP e-portfolio lives with RCVS, not in-product |
| Head RVN | Catherine Dixon (also clinical coach) | Owner of nursing board, task assignment, SVN supervision sign-offs |
| RVNs ×8 | incl. Rebecca Trimmer (anaesthesia), Caroline Rustage (stock) | Primary users: whiteboard, obs, MAR-mirroring tasks, discharge prep. Stock: existing informal role to respect |
| Student VN | Lauren Wright | Supervised user; sign-off chains (Schedule 3 [REG]) |
| VCA | Helen Evans | Simple task-board user; limited data access |
| Head Receptionist | Natalie Gillan | Owner of Today board, queues, handover |
| Receptionists ×3 | Danielle Shelbourne, Sarah Greenwood, Stephanie Beattie | Primary users: intake, red flags, check-in, callbacks |
| Client Care | Shari Coles | Follow-ups, complaints, insurance admin, bereavement — one person, not a team; her view is a filtered task queue, not a separate module |

## Corporate (the missing layer in the brief)

| Stakeholder | Why they matter |
|---|---|
| **IVC Evidensia group** — regional ops, group clinical board | De facto approver of any practice software; owns PHC, My Vet Account, Vets Now |
| **Independent Vetcare Ltd DPO / IG** | **Data controller** [FACT]; signs any Art. 28 DPA; approves any DPIA (scribe) |
| IVC IT / procurement | Network, devices, SSO, vendor onboarding |
| **MWI Animal Health (Cencora)** | PMS vendor; VIP API gatekeeper |

## External

- **Clients/pet owners** (data subjects; consent for recording; CMA-mandated disclosures). **Patients** (dogs, cats, rabbits, small furries — welfare stakeholder via comfort/handling profiles).
- Labs: IDEXX (VetConnect PLUS), Axiom, NationWide/Finn [ASSUMPTION which Andale uses]; in-house analysers [ASSUMPTION].
- Referral centres (e.g. NW referral hospitals — [ASSUMPTION which]); Vets Now Liverpool (OOH, intra-group); PawSquad (telehealth).
- Insurers (Petplan/Allianz, Agria, Many Pets, Markerstudy brands) via fragmenting eClaims rails; PHC (IVC) as plan provider; medication wholesaler ([ASSUMPTION] MWI, given group alignment).
- Regulators/standards: RCVS (Code, PSS, VetGDP), VMD (medicines, cascade), ICO (UK GDPR/DPA 2018/DUAA), CMA (Order compliance), FCA (credit-related activities — group-level [FACT]).
- Processors (product-side, future): hosting provider, STT/AI vendor, email/SMS provider — each needs Art. 28 terms and appears in the privacy notice.

**Decision-makers, honestly ranked for the Andale deployment:** IVC group IT/DPO ≥ Practice Director ≥ Head RVN/Head Receptionist (adoption gatekeepers) > individual vets. For the independent-practice market (Option B): practice owner/partners, practice manager, head nurse.
