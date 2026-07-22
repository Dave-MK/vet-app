# Part 12 — Implementation Roadmap

> Gates are explicit because the Andale/IVC constraint (Part 1) makes sequencing a risk-control tool, not a Gantt decoration.

## Phase 0 — Discovery (4–6 weeks)

- **Objectives:** validate every [ASSUMPTION] in this document set; establish whether Andale can lawfully and practically host anything (G1); map current systems/forms/paper/spreadsheets; quantify baseline metrics.
- **Activities:** the brief's shadowing list (adopted in full — reception shift, consult block, surgical admission→discharge, nurse clinics, one prescription end-to-end, one lab result end-to-end) + Part 13 interviews + artefact collection (photograph every whiteboard, sheet, sticky-note system, with permission) + **the G1 conversation: Practice Director → IVC route for a practice-level operational tool; identify who at IVC says yes, and to what.**
- **Deliverables:** current-state system map; assumption-validation log; baseline metric sheet (Rx turnaround, callback latency, note sign-off lag, obs timing adherence); G1 written answer.
- **Exit criteria / Gate G1:** either (a) IVC clearance path exists for a bounded internal tool → proceed Option C scope at Andale, or (b) it does not → Andale becomes interview-and-shadow design partner only; recruit 2–3 **independent** practices for the pilot (Option B). *Do not write product code before G1 resolves.*
- **Risks:** goodwill ≠ authority; shadowing observer effect; staff fearing surveillance — state up front that the exercise measures *system* failure, not people.

## Phase 1 — Validation & prototype (3–4 weeks, overlaps 0)

- Clickable prototype of the five MVP screens from real observed scenarios; corridor-test with each role; kill features nobody recognises. **Exit:** each pilot role can complete their top-3 daily actions in the prototype unaided; champions signed up.

## Phase 2 — Internal MVP build & pilot (10–14 weeks)

- Build Part 10 scope on Part 11 architecture; 2-week shadow setup (data seeding, tablets, Wi-Fi check); 8-week live pilot (nursing+reception → vets); weekly metric review vs baseline.
- **Exit:** Part 10.6 success criteria met; go/no-go on continued daily use; decision log of everything cut.
- **Risks:** double-entry fatigue (tracked weekly); champion absence; scope creep from enthusiastic users (park in backlog publicly).

## Phase 3 — Integrations (timing gated on partnerships)

- **Objectives:** kill re-keying. Priority order: PMS day-list read (even file-based) → patient/client read + ID-linking → lab result-arrival events → comms send → (much later) PMS write-back.
- **Activities:** MWI VIP partnership application (Andale/IVC route) and/or Teleos/ezyVet/Provet API onboarding (independent route); adapter build against Part 7.6 seams; conflict-resolution UX.
- **Exit:** duplicated-entry minutes/day measurably down; sync-staleness SLOs met. **Risks:** partner timelines are not yours — never block Phase 2 value on Phase 3 promises.

## Phase 4 — AI scribe pilot (after Phase 2 success; Part 9.8 is the plan)

- Buy-vs-build decision → DPIA → vendor DPA → 2–3 clinicians, 8 weeks, metrics and stop conditions per Part 9. **Exit:** targets met → staged rollout; else documented stop.

## Phase 5 — Client-facing (independent-market product only)

- Appointment + Rx request forms feeding the queues; approved summaries; estimates/consent. Not at Andale (My Vet Account owns that relationship).

## Phase 6 — Wider rollout / productisation

- Multi-tenant hardening, onboarding playbooks, CMA-compliance pack marketing, Cyber Essentials Plus, support model, pricing (per-practice flat beats per-seat for ≤30-staff practices [REC]).

---

# Part 13 — Discovery Interview Guide

> Method: 30–45 min semi-structured, one role at a time, never with a manager present for non-managers; open with "walk me through yesterday, from clocking in"; the numbered questions probe what the walkthrough misses. Record artefacts, not just answers ("show me the sheet"). The universal screener (ask everyone, verbatim from the brief — it's excellent): **"What information do you repeatedly search for, type twice, wait for, chase someone for, or discover too late?"**

## Practice Director (Debbie Roden)
1. Which decisions are yours alone vs IVC's? (pricing, staffing, software, complaint resolution) — *scopes G1.*
2. What do you currently check every morning, and where does each number live?
3. Walk me through the last complaint end-to-end: where is its paper trail now? Who else touched it?
4. What does IVC already give you (dashboards, reports, comms tools)? What's mandated vs optional?
5. When did something last "fall through a crack" badly enough that you changed a process? What was the fix, and did it stick?
6. What would make you veto a new system? (surveillance fears, IT burden, training time)
7. Where does the CMA Order work currently stand — what has IVC centralised, what lands on you?

## Veterinary surgeons (Crook, Tunney, Houghton, Fitzpatrick — separately; graduate alone)
1. When do you finish notes, honestly? What interrupts them?
2. Show me how you know a lab result has come back. What happens if you're off that day? (part-time coverage — Tunney)
3. How do you track "call Mrs X about Bella's bloods"? What happened the last time one was missed?
4. Repeat prescriptions: walk me through this morning's pile. How do you check last-exam dates? How long does one authorisation take?
5. How do estimates get updated mid-procedure? Who phones? What if no answer? (consent limitations)
6. What do you re-type between systems in a normal day?
7. [Graduate] When you want a second opinion, what do you do right now? What stops you asking?
8. [Senior] What escalations reach you, how, and what never reaches you that should?
9. If a scribe drafted your notes for review, what would make you trust or bin it?

## Veterinary nurses (Head RVN + 2–3 RVNs + SVN; SVN alone)
1. Show me the hospital sheet/whiteboard for today. Who updates it, when does it drift from reality?
2. How do you know an obs or med is due? What happens during a busy theatre block?
3. Walk me through this morning's handover. What got written down? What was verbal-only?
4. Last time an inpatient deteriorated — how did the vet find out, and how fast?
5. What do you record twice (paper sheet → PMS)? Show me.
6. Discharges: what's the checklist, where does it live, what gets forgotten at 18:00?
7. [SVN] What can you do unsupervised? Who countersigns your entries and how quickly?
8. [Head RVN] How do you assign the day? What do you know about each nurse's competencies that a system wouldn't?
9. Theatre lists: who builds them, on what, and when do they change?

## Reception (Head + receptionists; Client Care separately)
1. Take me through a phone booking, keystroke by keystroke. (Count the systems and re-typed fields.)
2. When someone calls with an emergency-sounding problem, what exactly do you do? What's written down about what counts as urgent?
3. Where do callbacks live? Show me the pile/notebook/screen. What's the oldest one right now?
4. Repeat-prescription requests: where do the website forms arrive? Who checks? What do clients complain about?
5. What can't you see that clients assume you can? (surgery status, "is my dog awake?", Rx readiness)
6. Check-in to being-seen: how do vets know someone's waiting? How do you know they're running late?
7. [Client Care] Insurance claims: walk one through. Where does its status live? What do you chase weekly?
8. [Client Care] After a euthanasia, what do you do in the systems, step by step? Has a reminder ever gone out for a deceased pet?
9. What happens at Saturday 11:55 with a full waiting room?

## VCA (Helen Evans)
1. How do you get your task list, and how do you say "done"?
2. What patient information do you need that you have to ask for?
3. Last equipment/supply problem — who did you tell, and did it get fixed?

## Clients (3–5, recruited via the practice, incentivised)
1. Last time you called — what for, how long, resolved in one call?
2. Repeat prescriptions: what happens between requesting and collecting? Ever arrived before it was ready?
3. After surgery/illness: did you know what to watch for and who'd call whom?
4. What do you use My Vet Account / PHC for? What do you wish worked?
5. How would you feel about a consultation being transcribed by an AI tool for note-taking, with the vet reviewing? (verbatim reactions — pilot decline-rate signal)

## Cross-cutting probes (weave in everywhere)
- "Show me" beats "tell me" — every claimed workaround gets photographed/screenshotted.
- For every delay found: is it a *knowing* delay (visible, chosen) or a *blind* one (nobody knew)? Blind delays are the product's target list.
- For every paper artefact: what happens when it's full/lost/illegible/at-home-in-a-pocket?
- Adoption: "What was the last new system/process here, and how did it go?"

---

# Part 14 — Final Recommendation

## The strongest product direction

**A workflow-and-coordination platform for UK first-opinion practices — tasks, handovers, boards, timers and CMA-compliance evidence — designed to sit beside any PMS, with Andale as the design-truth source and independent practices as the commercial market.** Not a PMS, not (initially) an integration play, not a scribe company. The scribe becomes a Phase-4 differentiator *because* the workflow layer exists to receive its output.

## The clearest initial value proposition

"Nothing falls through the cracks: every request, result, callback and overnight patient has an owner, a due time and an escalation path — and when the CMA inspector or a complainant asks, the evidence is one export away."

## The safest MVP

Part 10's scope: tasks + Today board + intake red-flags + repeat-Rx queue + hospital whiteboard + handover + audit trail. It touches no prescribing, no payments, no clinical record mastering, no client-facing automation; its worst failure mode is reversion to the current paper process, which must remain drilled as the fallback.

## The most dangerous assumptions (ranked)

1. **"Andale can choose this software."** [Likely false as scoped — IVC controls the stack and the data. Resolve at Gate G1 before any build.]
2. **"Integration with existing systems is achievable."** MyVetAccount: no public API; Merlin: partner+corporate gated; VetEnvoy: fragmenting. Plan for zero integration; treat any as upside.
3. **"A coordination layer reduces work."** Only if daily minutes-in-product < minutes-saved; unmeasured, it silently becomes a second burden and dies. Instrument this from pilot day one.
4. **"Staff will record honestly into a system managers can see."** Surveillance perception kills candour (obs backfilled, tasks closed unfinished). Design norms: no per-person league tables in v1, loud shared safety-net framing.
5. **"The scribe market gap exists."** Transcription is commoditised at £75/mo; only workflow depth differentiates. Validate before building any AI.
6. **"Pricing complexity needs an engine."** The plan's complexity is IVC's; for Andale you need *display and disclosure*, not computation.

## Features most likely to create adoption

The hospital whiteboard with due/overdue obs (nurses evangelise it); one-tap escalation with guaranteed acknowledgement (junior staff safety net); the repeat-Rx queue with "ready" notifications (kills the #1 desk complaint class); handover acknowledgement (Head RVN/Head Rec love accountability they can see); the Friday sweep.

## Features most likely to create resistance

Anything requiring double entry of PMS data; per-person performance metrics visible to management; mandatory structured intake fields that slow live calls; graduate-vet hard gates (a qualified MRCVS being system-blocked); the scribe if introduced before trust in the platform exists; notifications that nag rather than mirror real work.

## The next ten practical actions

1. **Resolve the relationship question:** confirm what standing you/Andale's Practice Director actually have to run this exercise, and book the G1 conversation about IVC's policy on practice-level operational tools. (Everything sequences behind this.)
2. Book Phase-0 shadowing: one reception shift, one consult block, one surgery day admission→discharge, within the next 3 weeks.
3. Run the Part 13 interviews with Debbie Roden, Catherine Dixon and Natalie Gillan first (the three adoption gatekeepers).
4. Follow one real repeat-prescription request and one lab result end-to-end with timestamps; photograph every artefact. These two baselines justify (or kill) the MVP.
5. Verify the PMS (Merlin vs Voyager vs other), what its screens already show, and whether a day-list export exists.
6. Write the assumption-validation log from this document set (every [ASSUMPTION] tagged, owner, verification method) — it is the discovery checklist.
7. Build the five-screen clickable prototype from observed scenarios only — no code, one week, corridor-test it in the staff room.
8. Track the CMA Order's publication (~Sept 2026) and map each remedy to a feature flag; note IVC will centralise some — the delta is your independent-market pitch.
9. Decide Option B vs C explicitly after G1; if B, identify 2–3 independent Merseyside/Cheshire practices for pilot recruitment (they share Vets Now OOH patterns and CMA deadlines).
10. Park the scribe: write the one-page buy-vs-build criteria now (Part 9.0), revisit only after the workflow pilot's week-8 review.

## Verdict

The brief is unusually strong — its five principles, safeguards and workflow instincts are right, and most of its proposals survive contact with the evidence. What changes on contact: the practice's corporate ownership inverts the integration strategy and the buyer; the CMA Order converts "pricing engine" into "compliance evidence"; the team's real size converts eleven role apps into one shared workspace with role views; and the scribe converts from centrepiece to phase-four differentiator. Proceed — through Gate G1 first.
