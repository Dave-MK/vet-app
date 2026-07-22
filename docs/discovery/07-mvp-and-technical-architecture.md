# Part 10 — MVP Definition

## 10.1 Scope philosophy

The smallest useful internal MVP is **the coordination layer that works at zero PMS integration**: it must create value on day one purely by replacing paper lists, whiteboards, sticky notes, verbal handovers and the fire-and-forget prescription inbox — while writing nothing clinical that Merlin masters (Part 7 constitution). The brief's 12-item MVP is close but too big; items 2–3 (master record, shared timeline) and 9 (consultation workspace) are cut down below.

## 10.2 Essential features (MVP)

1. **Task engine** — owners, team queues, due times, priorities, escalation routes, custody history, completion evidence.
2. **Reception Today board** — day list (manually entered or CSV-imported from Merlin's diary print [ASSUMPTION such an export exists — verify]; waiting-state machine; check-in; late/no-show flags.
3. **Structured intake + red-flag prompts** — <60-second capture; escalation card to duty clinician; script display; OOH signposting log.
4. **Repeat-prescription queue** — the 5.4 state machine, replacing the form's dead-end (requests keyed in manually from the existing form's output until the form can post to PLT [ASSUMPTION: form backend is IVC's — likely *cannot* be repointed at Andale; humans re-key from email, still net-positive; for independents the form is ours]).
5. **Hospital/nursing whiteboard** — stays, responsible vet+nurse, obs/care schedules with due/overdue, escalation, discharge criteria checklist, kennel-side tablet entry.
6. **Shift handover** — build-from-open-items, risk highlights, explicit acknowledgement, stored history.
7. **Minimal patient/client index** — name, species, breed, age, photo, alert chips, comfort profile; `unlinked/linked` PMS-ID field; **no clinical narrative**.
8. **Communication log** — calls/callbacks with outcomes, linked to patients and tasks.
9. **Escalations** — first-class objects with ack SLAs (Part 6.10).
10. **Append-only audit trail** — from day one (retrofitting audit is impossible).
11. **Auth + roles** — the Part 8 matrix, competency flags, locum accounts, break-glass.

**Fast-follow (weeks 6–12):** complaint log with CMA timers; estimate-version log; deceased-suppression checklist; OOH morning inbox.

## 10.3 Delay / reject

- **Delay:** consultation workspace (needs PMS write or independent-market deployment); lab-loop automation (works manually first); comms sending (log only — avoid double-messaging); reporting suite (weekly exception digest only); scribe (Phase 3); client portal (Phase 4, independent market).
- **Reject (Part 1.6 reasoning):** PHC entitlement engine; payments; insurance-claim submission; telephony; client-facing triage automation; rota building; anaesthetic charting; a second MAR.

## 10.4 Primary screens (five)

1. **Reception Today** — board + intake + callbacks + Rx-collection tiles.
2. **Patient card** — header/chips/timeline/tasks (the shared spine).
3. **Hospital whiteboard** — state columns + kennel-side detail view.
4. **My work** (vet/nurse Today) — consult-adjacent open loops, due obs, escalations, unsigned flags.
5. **Handover** — compose + acknowledge.

(Repeat-Rx queue lives as a tab of Reception Today for reception and of My Work for vets.)

## 10.5 User stories & acceptance criteria (samples binding the design)

- *As a receptionist*, when a caller reports a male cat straining to urinate, I see a red-flag prompt and one tap sends an urgent card to the duty vet. **AC:** escalation created <10s; acknowledged-state visible to me; unacknowledged card auto-bumps to all vets + Head RVN at 2 min; the whole exchange is in the audit log.
- *As an RVN*, kennel-side, I record obs against a due schedule item. **AC:** due items sort by time with overdue loud; entry ≤6 taps for a routine set; SVN entries save as drafts and appear in my countersign queue if I'm the supervisor; completion timestamps are server-side.
- *As a vet*, I approve a repeat-Rx request. **AC:** the review screen shows last-assessment date/type, med class flags, request history; approving with a stale assessment (per configured policy, default 6 months [FACT site policy]) requires an explicit override reason; the client-notification task is auto-created on "Ready".
- *As Head Receptionist*, at close on Friday I run the sweep. **AC:** zero open callbacks can be left unassigned for Monday without an explicit defer-with-reason; the handover records who acknowledged.
- *As the Practice Director*, I export the complaint log. **AC:** CSV/PDF with timers, owners, outcomes; 5-day acknowledgement breaches highlighted [REG-CMA].

## 10.6 Dependencies, risks, pilot

- **Dependencies:** practice Wi-Fi coverage in wards/theatre [ASSUMPTION — verify]; 2–3 shared tablets; a Merlin day-list export route [ASSUMPTION]; **IVC IT/DPO clearance once real client data is entered — the gating dependency; see roadmap gate G1**; a named practice champion per team (candidates: Natalie Gillan, Catherine Dixon).
- **Risks:** double-entry fatigue (mitigate: measure minutes-per-day of PLT entry, cap it, cut features that exceed it); champion dependency; IVC veto late in the day (mitigate: seek clearance *before* build — G1); Saturday-close edge cases.
- **Pilot group [REC]:** start with **nursing + reception** (whiteboard, tasks, handover, intake) — least PMS-coupled, highest daily pain, strongest champions; add vets via the Rx queue and open loops in week 3–4.
- **Duration:** 8 weeks live pilot after a 2-week shadow setup.
- **Success criteria:** ≥80% of inpatient obs recorded in PLT with due/overdue working; 100% of handovers acknowledged in-system; ≥90% of phone intakes logged; repeat-Rx median turnaround measured (baseline → −30%); zero red-flag escalations lost; staff NPS on "would you go back to the old way?" ≥ 8/10 majority; **zero clinical-safety incidents attributable to PLT**.

---

# Part 11 — Technical Architecture

## 11.1 Shape: modular monolith. Unambiguously.

**[REC]** One deployable backend, strict internal module boundaries (workflow, patients/clients, hospital, rx-queue, comms-log, audit, auth, adapters), one Postgres. Microservices at this scale (≤25 concurrent users, one site) buy latency, ops cost and distributed-transaction pain for zero benefit. The seams that matter later (adapters, audit, AI service identity) are module interfaces now, extractable services if the independent-market product ever needs them. Real-time and background work run in-process (or one worker) — not a queue estate.

## 11.2 Stack [REC — matched to this repo]

- **Frontend:** Next.js (this repo, `vet-app`, is already a Next.js project — **note the repo's own warning: this Next.js version has breaking changes; read `node_modules/next/dist/docs/` before writing any code**) + TypeScript. Tablet-first responsive for ward screens; keyboard-first for reception. PWA for kennel-side offline tolerance (queue-and-sync obs entries; server timestamps authoritative, client timestamps recorded).
- **Backend:** Next.js route handlers/server actions for the app tier is acceptable at MVP scale; if separated later, a single Node/TypeScript API service. Domain logic in plain TS modules independent of the framework.
- **Database:** **PostgreSQL** (managed, UK region). Append-only `audit_event` table written via triggers/transactional outbox from every mutation; row-level `created_by/at`; supersede-versioning for amendable records. No document DB — the workflow data is relational to its bones.
- **Auth:** managed IdP (Auth0/Entra ID External/Keycloak) with enforced MFA, short-lived sessions on shared tablets (badge/PIN fast-switch — shared-tablet user switching is *the* ward UX problem; attribution requires per-entry identity [REG]), role/competency claims resolved server-side per Part 8. At Andale, alignment with IVC identity policy is a G1 question.
- **Real-time:** WebSockets/SSE (built-in or a thin layer like Pusher/Ably) for board updates, escalations, waiting states. Polling fallback.
- **Files:** S3-compatible object storage, UK region, private buckets, signed URLs (pet photos, equipment-issue photos, documents).
- **Search:** Postgres FTS + trigram (client/pet fuzzy search) — no Elasticsearch until the multi-practice product needs it.
- **Notifications:** in-app first (mirroring tasks); email digests via a UK/EU ESP; SMS deferred.
- **Integration APIs:** adapter modules (Part 7.6) behind feature flags; MWI VIP client stub written against mwiah.dev docs but disabled pending partnership; CSV/manual importers as the honest MVP adapters.
- **AI services (Phase 3):** separate service identity + isolated module; UK/EU-pinned STT/LLM vendors (Part 9.5); drafts stored with provenance; no AI code paths able to touch signed records.
- **Security:** TLS everywhere; encryption at rest; per-role API authorisation enforced server-side (never UI-only); rate-limited auth; secrets in a managed vault; dependency scanning; annual pen test before real-data go-live [REC]; Cyber Essentials Plus as a sales artefact for the independent market.
- **Hosting:** UK region (AWS eu-west-2 / Azure UK South) — keeps the DPIA and any IVC conversation simple; single-region, multi-AZ.
- **Backup/DR:** automated Postgres PITR + daily snapshots, cross-AZ; object-storage versioning; RPO ≤ 15 min, RTO ≤ 4 h [REC — a practice can run on paper for a morning; design the *paper fallback drill* as part of DR, not just infra]; quarterly restore tests.
- **Observability:** structured logs, error tracking (Sentry-class), uptime checks, and **workflow-level SLO dashboards** (escalation ack times, sync staleness) — the product's own timers are its most important metrics.

## 11.3 Multi-tenancy note

Build single-tenant-simple but keep `practice_id` on every table from day one — the independent-market product (Option B) is multi-practice, and retrofitting tenancy is miserable. Config (thresholds, templates, policies) is per-practice data, not code.
