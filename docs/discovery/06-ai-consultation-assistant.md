# Part 9 — AI Speech-to-Text Consultation Assistant: Product & Safety Design

> Governing sources: RCVS "Using AI in practice" advice (April 2026) [REG-GUID]; BVA AI position (Dec 2025) [PROF-GUID]; ICO DPIA and AI guidance, DUAA 2025 Arts. 22A–22D [REG]; UK GDPR Arts. 6/9/28 [REG]. Andale-specific constraint: **the data controller is Independent Vetcare Ltd** [FACT] — nothing in this section deploys at Andale without IVC DPO sign-off. Full detail in Appendices A & B.

## 9.0 Build vs buy — answer first

[FACT] Veterinary scribes are a commodity: VetRec £75/vet/mo (UK, ICO-registered, SOC 2, no-training-on-customer-data claims), ScribbleVet, Scribenote, HappyDoc, CoVet, Talkatoo, Digitail. **[REC] Do not build speech-to-text or transcription infrastructure.** The defensible layer is scribe-output-into-workflow (tasks, estimates, discharge notes, client summaries generated from the signed record). Realistic paths: (a) integrate a vetted commercial scribe and own the post-transcription workflow; (b) build the structured-note + decision-support layer over a commodity STT API (Deepgram/Azure/AssemblyAI, UK/EU region). Decide in Phase 3 procurement; the safety design below applies to either.

## 9.1 Automation risk tiers (the brief asked for clear separation)

| Tier | Function | Autonomy allowed |
|---|---|---|
| **T1 Low-risk admin** | Recording-consent logging; note formatting; filing signed notes; generating follow-up task *suggestions*; appointment-summary emails from signed content | Auto-execute with human-visible log |
| **T2 Documentation support** | Transcription; speaker separation; structured draft note; extraction of meds/durations/measurements mentioned; low-confidence highlighting; client-friendly summary draft from **signed** note | Draft-only; mandatory human edit+sign before it becomes the record [REG RCVS "verified manually"] |
| **T3 Decision support** | Differential *prompts*; dose *cross-checks* against formulary + patient (species/weight/age/meds/allergies); contraindication flags; protocol citations; missing-information prompts ("no weight recorded today") | Suggestion panel only; never enters the record unless the clinician actively accepts; every suggestion carries provenance, inputs considered, uncertainty, and outstanding human checks (brief §7.4 — adopt verbatim) |
| **T4 Never automate** | Diagnosis; prescribing; dosage approval; consent; euthanasia discussions; client-facing clinical comms before sign-off; triage dispositions; anything altering the signed record | Prohibited by design (enforced: AI service identity has no such capabilities — Part 8) |

## 9.2 Consent & lawful-basis model [REC, per ICO guidance]

- **Layered model:** (1) **Legitimate interests** (with documented LIA) for *processing audio to produce the clinical note* — this is note-taking, which happens anyway; consent would be artificial (ICO cautions against consent where processing is inherent). (2) **Explicit opt-out honoured absolutely**: client told before recording starts (verbal script + waiting-room/consult-room signage + privacy notice), can decline with zero effect on care (brief's rule; also fairness requirement); decline → manual notes, logged. (3) **Consent (opt-in)** reserved for anything beyond note-taking: audio retention beyond verification, any model-improvement use (default OFF — brief's rule matches RCVS advice), research.
- **Staff dimension (missed by the brief):** clinicians and nurses are recorded too — ICO employment-monitoring guidance applies; consult staff, include in employment privacy notice, and make clinician participation voluntary in pilot [REG].
- **Special-category caution:** consult-room audio can capture client health disclosures ("since my chemo…") — Art. 9 data. Mitigations: prompt-engineered exclusion of client-personal content from drafts; "irrelevant personal conversation removed" review step (brief §7.5.3); short audio retention.
- **DPIA is mandatory** (innovative tech + audio of identifiable people) [REG ICO]. Complete before any pilot; at Andale, IVC's DPO owns it. Ship a DPIA template with the product.

## 9.3 Privacy notice & transparency artefacts (shippable pack)

Client-facing one-pager + poster + verbal script covering: what's processed, whether audio is stored and for how long, which suppliers process it and where, training-use (none by default), right to decline, contact. Active-recording indicator on the consult-room screen, plus pause/resume that actually cuts the stream (not a UI fiction). All notice-events logged (who was told, when, declined?).

## 9.4 Technical design points

- **Transcription/diarisation:** 2-speaker minimum (clinician/client), tolerate a third (second staff member); UK accents/vet vocabulary evaluation in vendor selection (drug names are the stress test); confidence scores surfaced, low-confidence spans visibly marked in drafts (brief §7.2, adopt).
- **Examination findings rule (brief §7.2, adopt verbatim and enforce structurally):** objective findings section of the draft is populated **only** from explicit clinician dictation ("dictate mode") or structured entry — never inferred from conversation. The template marks the section "No findings dictated" otherwise. This is the single most important anti-hallucination control because omitted-exam inference is the likeliest route to a fabricated normal.
- **Draft structure:** brief §7.3's 16 sections adopted; sections 5 (objective findings) and 13 (medication instructions) get differential treatment — mandatory-review highlighting even at high confidence, because dose errors are the highest-severity failure [FACT sector accuracy commentary: drug/dose hallucination is the documented worst-case].
- **Finalisation (brief §7.5 adopted):** signed-version-only enters the record; audit log stores model + version, prompt/template version, draft hash, per-edit diff, approver, timestamps [REG RCVS audit expectations]. Client summary generated only from the signed note, itself requiring release.
- **Failure handling:** STT vendor down → recording-off banner + manual template, zero workflow blockage (reliable manual fallback, brief's safeguard); partial audio → draft flagged incomplete; never silently degrade.

## 9.5 Hosting & vendor assessment

- **[REC] UK/EU-region private cloud (managed API with region pinning and no-training contractual terms) over both extremes.** On-prem/local models: unrealistic ops burden for a 21-person practice and weaker models; US-region third-party APIs: lawful via UK-US Data Bridge or IDTA+TRA [REG] but adds transfer risk and DPO friction — prefer UK/EU endpoints (Azure UK South OpenAI/Speech, AWS eu-west-2 Bedrock/Transcribe, Deepgram EU, or a UK-hosted vet scribe vendor).
- **Vendor due-diligence checklist:** Art. 28 DPA + sub-processor list with change notification; region pinning; no-training-by-default in contract (not just policy); retention configurability to zero; SOC 2 / ISO 27001; breach SLAs; exit/data-return; published accuracy evaluation (BVA principle — demand it; the market's validation transparency is documented-poor [FACT Frontiers 2026]).

## 9.6 Retention options [REC]

| Artefact | Default | Options |
|---|---|---|
| Raw audio | **Delete on note sign-off** (or 72h max if sign-off lags) | 30-day retention only under explicit client consent + stated purpose |
| Verbatim transcript | 30 days post-sign (correction window), then delete | Keep-with-consent for QA sampling |
| Draft + edit diffs | Life of clinical record (they are the audit trail of the record's creation) | — |
| Signed note | Clinical-record retention (5–7y+, Part 7) | — |
| Metrics (correction rates, aggregated) | 2 years, de-identified | — |

## 9.7 Evaluation metrics & measurement method

- **Correction rate:** % of draft content edited before sign (per section; auto-computed from diffs).
- **Omission rate:** items present in consultation but absent from draft — measured by (a) clinician flag-at-review button ("missed something") and (b) monthly sampled transcript-vs-draft audits by a second clinician.
- **Hallucination rate:** draft statements with no basis in transcript/entered findings — same sampling audit; **dose/medication hallucinations tracked as a separate zero-tolerance class**.
- Plus: WER on a curated UK-vet audio test set (vendor selection); time-per-note before/after; same-day sign-off %; client decline rate; staff trust survey; safety incidents (near-miss reporting category "AI").

## 9.8 Pilot design

- **Entry criteria:** DPIA approved (IVC DPO at Andale); workflow platform already adopted (scribe is Phase 3 for a reason); 2–3 volunteer clinicians (candidates: Clare Crook as clinical lead + one vet; nurse-clinic pilot with Head RVN later); consultation types limited to routine/wellness and chronic re-checks first — **excluded: euthanasia, new critical illness, contentious/complaint-risk consults**; client materials printed; manual fallback drilled.
- **Success targets (8-week pilot):** correction rate <25% and falling; omission flags <5% of consults; **zero unreviewed drafts entering records** (structural, verify via audit); zero dose hallucinations reaching a signed note; note time −40%; client decline <15%; clinician would-recommend ≥4/5.
- **Stop conditions (automatic pause, clinical lead + Director to restart):** any dose/medication hallucination signed into a record; any client-facing content released unsigned; DPIA assumptions broken (vendor sub-processor change, breach); decline rate >30% (acceptability failure); correction rate rising 2 consecutive weeks; any RCVS/ICO adverse contact. Full stop and vendor review if a safety incident causes patient harm.
- **Reporting:** weekly metric pack to clinical lead; incident log; end-of-pilot go/no-go with published summary to all staff (trust-building; BVA transparency principle).

## 9.9 Information-governance summary

Controller: practice entity (IVC corporate at Andale) → Processor: platform vendor → Sub-processors: STT/LLM, hosting (pinned, contractual). Records of processing updated; privacy notices (client + staff) updated; retention schedule implemented in software, not policy-only; SAR path covers transcripts/audio while they exist; AI-use policy template + staff training log shipped (RCVS: don't delegate AI use to untrained staff [REG-GUID]).
