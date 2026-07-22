# Research Appendix A — UK Regulatory & Data-Protection Findings

> Raw research output gathered 2026-07-19 for the Andale practice-operations platform concept.
> Legend: **[LAW]** statutory requirement · **[REG-GUID]** regulator guidance (RCVS Code / supporting guidance — enforced via professional conduct) · **[PROF-GUID]** professional-body guidance (BVA/BSAVA — advisory) · **[UNCERTAIN]** flagged where verification is needed.

---

## 1. RCVS Code — Clinical records (Supporting Guidance Chapter 13)

Source: <https://www.rcvs.org.uk/setting-standards/advice-and-guidance/code-of-professional-conduct-for-veterinary-surgeons/supporting-guidance/clinical-and-client-records/>

- **[REG-GUID]** 13.1: Vets AND vet nurses "must keep clear, accurate and adequately detailed records" — both professions make entries.
- **[REG-GUID]** 13.2: Records must give a complete, relevant account of clinical history: examinations, treatments, test results, investigation plans, who provided care, and advice given to the client.
- **[REG-GUID]** 13.8: Records should typically include the names of the veterinary surgeons AND veterinary nurses who provided care (author attribution).
- **[REG-GUID]** 13.9 Amendments: permitted only to correct errors/factual inaccuracies; amendments must be dated, identify who made them, and must NOT obscure the original entry (audit-trail requirement).
- **[REG-GUID]** 13.6/13.7: Copies of records must be provided at client request; on case transfer, clinical information must be shared promptly.
- **[REG-GUID]** 13.10 Retention: RCVS sets no fixed period — "as long as necessary" (medicines records = 5 years; common practice 6–7+ years for limitation periods — convention, not regulation).
- **[REG-GUID]** 13.11: Client records are personal data under UK GDPR/DPA 2018; subject access rights apply.
- Record ownership: convention treats records as practice property, clients entitled to copies/SAR. **[UNCERTAIN — convention, not stated in Ch.13.]**
- Chapter 13 was substantially revised April 2026 — re-verify paragraph numbering before hard-coding references. See <https://www.rcvs.org.uk/veterinary-professionals/conduct-and-guidance/resources-and-updates/standards-and-advice-spring-2026-update>

**Design implication:** per-entry author identity (vet vs RVN vs student), immutable append-only versioning with dated attributed amendments preserving originals, one-click full-record export, configurable retention with a 5-year floor for anything touching medicines.

## 2. RCVS "under care" / prescribing (Chapter 4, in force 1 Sept 2023)

Sources: <https://www.rcvs.org.uk/veterinary-professionals/conduct-and-guidance/supporting-guidance/4-veterinary-medicines> · <https://www.rcvs.org.uk/about-us/our-policies/under-care-guidance> · <https://www.rcvs.org.uk/veterinary-professionals/conduct-and-guidance/resources-and-updates/prescribing-pom-vs-joint-guidance-from-the-rcvs-and-vmd>

- **[REG-GUID]** 4.13 "Under care": vet accepts responsibility; must be able 24/7 to physically examine the animal or arrange for this.
- **[REG-GUID]** 4.16–4.17: POM-V only after a "clinical assessment"; assessment may be in-person OR remote since Sept 2023.
- **[REG-GUID]** 4.20: Antimicrobials (antibiotics, antifungals, antivirals) require physical examination "in all but exceptional circumstances".
- **[REG-GUID]** 4.21 Controlled drugs: initial physical exam required in all but exceptional circumstances; repeats may follow a clinical assessment confirming safety.
- **[REG-GUID]** Repeat prescriptions: prescribing decision recorded on the record may permit further dispensings; a 12-month outer window is widely applied. **[UNCERTAIN: 12-month figure not confirmed in fetched Ch.4 text — design as configurable per-drug review interval, 12-month default ceiling, shorter defaults for CDs/antimicrobials.]**
- **[REG-GUID]** Written prescriptions (Ch.9/Ch.10): clients may request a written prescription and buy elsewhere; "reasonable" fee; no fee discrimination. Now hardened by the CMA Order (see §10: fee caps, mandatory notification, issuance deadlines).

**Design implication:** repeat-prescription engine must model per medicine: drug-class flags (antimicrobial? CD schedule?), date/type of last clinical assessment (physical vs remote), prescriber-set authorisation window and repeat count, hard-stop gates forcing vet review when assessment is stale or class requires physical exam; plus a written-prescription generation path with CMA-compliant fees and timing.

## 3. Veterinary Medicines Regulations — dispensing, labelling, records, CDs, SQPs

Sources: <https://www.legislation.gov.uk/uksi/2013/2033/contents> · VMD Guidance Note 14 <https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/424670/VMGNote14.PDF> · <https://www.gov.uk/guidance/retail-of-veterinary-medicines>

- **[LAW]** Records of receipt AND supply of POM-V, POM-VPS and cascade medicines kept ≥ **5 years**: date, product name, batch number, quantity, supplier/recipient name and address, prescriber details. Companion animals: batch may be recorded on delivery or first use.
- **[LAW]** At least an annual medicines stock reconciliation/audit (VMD GN14). **[Slightly UNCERTAIN post-2024 VMR amendments.]**
- **[LAW]** Dispensed-medicine labelling: owner/animal ID, practice details, date, "For animal treatment only", "Keep out of reach of children", dosage/directions, withdrawal period where relevant, cascade warning statement when applicable.
- **[LAW]** Controlled drugs (Misuse of Drugs Regs 2001): Schedule 2 CDs require a CD Register (bound or compliant electronic), chronological entries within 24 hours, register kept ≥ 2 years from last entry (5 years recommended given VMR). Sch 2 locked CD cabinet (RCVS 4.54); Sch 3 securely locked (4.56). Running balances = RCVS/PSS good practice. **[UNCERTAIN: exact Sch 3 register exemptions — verify against SI.]**
- **[LAW]** SQPs (AMTRA/Vetpol/VetSkill-registered) may prescribe/supply POM-VPS and supply NFA-VPS from authorised premises. RQP types: vet, pharmacist, SQP.

**Design implication:** medicines ledger with immutable in/out records retained 5+ years; electronic CD-register mode with running balances and reconciliation; statutory label printing incl. cascade statement; role-typing of who may prescribe/supply each product class.

## 4. Schedule 3, Veterinary Surgeons Act 1966 — RVN/SVN permissions

Sources: <https://www.rcvs.org.uk/veterinary-professionals/conduct-and-guidance/resources-and-updates/advice-on-schedule-3> · <https://www.rcvs.org.uk/veterinary-professionals/conduct-and-guidance/supporting-guidance/18-delegation-to-veterinary-nurses>

- **[LAW]** RVNs may give medical treatment or minor surgery NOT involving entry into a body cavity, to animals under their employer's care, under the **direction** of a vet (vet instructs, need not be present).
- **[LAW]** Student VNs: same scope plus **supervision** (vet or RVN on premises, able to respond); minor surgery requires "direct, continuous and personal" supervision (physically present, undivided attention).
- **[REG-GUID]** RCVS "SUPERB" delegation checklist: Specific procedure, Under care, Person suitable, Experience, Risks considered, Be there.
- **[LAW]** Diagnosis, prescribing (POM-V) and surgery entering a body cavity are vet-only; no delegation of acts of veterinary surgery to lay staff beyond narrow statutory exemptions.

**Design implication:** RBAC must encode vet / RVN / student VN / SQP / lay staff with task-level gates (only a vet signs a prescription or diagnosis; RVN tasks require a linked directing vet; SVN tasks require a recorded supervisor); delegation events captured in the record (who directed, who performed).

## 5. RCVS Practice Standards Scheme (PSS)

Sources: <https://www.rcvs.org.uk/practices/practice-standards-scheme> · <https://www.rcvs.org.uk/document-library/small-animal-modules/>

- Voluntary accreditation (~two-thirds of UK practices). Tiers: Core Standards → General Practice → Veterinary Hospital; modules include Medicines and Medical Records.
- Medicines module aligns with VMD requirements (VMD accepts PSS accreditation in lieu of separate premises inspection); CD storage/register, cold chain, stock audit.
- Inpatient standards (higher tiers): person directly responsible for nursing care on premises at all times, minimum daily vet examination of all inpatients, completed hospitalisation records.
- **[UNCERTAIN: clause numbering varies by module version — fetch current small-animal PDF for compliance checklists.]**

**Design implication:** inpatient module supports timestamped hospitalisation sheets, daily-vet-exam prompts, treatment tasks with sign-off identity, exportable evidence packs mapped to PSS clauses.

## 6. RCVS VetGDP (graduate vets)

Source: <https://www.rcvs.org.uk/veterinary-professionals/learning-and-development/training-and-development-for-veterinary-surgeons/veterinary-graduate-development-programme-vetgdp>

- **[REG-GUID]** All newly registered vets complete VetGDP (~12–18 months) at an RCVS-Approved Graduate Development Practice with a named VetGDP Adviser (≥3 years on Register, trained, employer-protected time). E-portfolio of EPAs/reflections; ~monthly documented adviser meetings.
- VetGDP does **not** legally restrict what a graduate may do (a registered graduate is a full MRCVS) — the practice commits to support/oversight.

**Design implication:** "graduate" flag linked to a named adviser, protected-time scheduling, case-discussion logging. Do NOT build hard clinical restrictions for graduates (none exist in law) — supervision/support workflows only.

## 7. UK GDPR / DPA 2018 (ICO)

Sources: <https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/> · <https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/when-do-we-need-to-do-a-dpia/> · <https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/international-transfers/adequacy-regulations/how-does-the-uk-extension-to-the-eu-us-data-privacy-framework-work/>

- Pet clinical data linked to an identifiable owner IS personal data. Animal data alone is not, but is inseparable from owner identifiers in practice.
- **[LAW]** Lawful bases: **contract** (core clinical/billing), **legitimate interests** (reminders, service comms, audio capture for note-taking — requires documented LIA + easy opt-out), **consent** only where genuinely optional (marketing; AI-training reuse), **legal obligation** (VMR 5-year records, HMRC). Consent is a poor basis where processing would happen anyway.
- Special category data: pet data is not Art. 9 data, but free-text notes capturing CLIENT health/disability/bereavement ARE — needs an additional condition (DPA 2018 Sch.1) or product design that discourages recording it.
- **[LAW]** DPIA mandatory for likely-high-risk processing; ICO's list includes "innovative technology" (explicitly AI/ML) combined with another criterion — an AI consultation scribe very likely triggers a **mandatory DPIA**. Voiceprints only special category if used for identification (transcription is not) — flag in DPIA regardless.
- Audio recording of consultations: a data-protection matter, not a wiretap one. Requirements: transparency before recording (signage, verbal notice, privacy notice), lawful basis (LI + LIA, or consent), minimisation (delete raw audio promptly after transcript verification), staff-facing fairness (employees also recorded — ICO employment monitoring guidance). ICO treats audio as more intrusive than video. **[UNCERTAIN: reported Jan 2026 ICO voice-data guidance refresh — verify.]**
- Controller/processor: practice = controller; platform/scribe vendor = processor (Art. 28 written contract: instructions, confidentiality, security, sub-processor approval, deletion/return). Vendor training its models on practice data becomes a controller for that purpose and needs its own basis.
- International transfers: US-hosted AI backends need UK-US Data Bridge (UK Extension to EU-US DPF, in force 12 Oct 2023) or IDTA / SCCs + UK Addendum, plus a transfer risk assessment. EU/EEA covered by adequacy.
- SARs: 1-month response; per-category retention schedule; privacy notices required.

**Design implication:** recording-notification UX with audit of notice given; configurable raw-audio auto-deletion after human verification; per-purpose data flags (no AI-training reuse by default); Art. 28-ready processor architecture with pinned sub-processors, region-pinning / DPF-certified US vendors; shipped DPIA template; redaction tooling for client-health free text.

## 8. ICO — AI and automated decision-making (Art. 22 → DUAA Arts. 22A–22D)

Sources: <https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/> · <https://www.twobirds.com/en/insights/2026/ico-launches-consultation-on-draft-guidance-on-automated-decision-making-and-profiling>

- **[LAW — recently changed]** Data (Use and Access) Act 2025 repealed Art. 22 and replaced it with Arts. 22A–22D: solely-automated decisions with legal/similarly-significant effects are permitted subject to safeguards (transparency, contest route, human intervention on request, risk assessment, record-keeping). "Meaningful human involvement" takes a decision outside the ADM regime. **[UNCERTAIN: final ICO ADM guidance status as of July 2026 — was in consultation.]**
- ICO test for meaningful human involvement: human reviews AFTER the automated output, with real authority and ability to change the outcome; rubber-stamping does not count.
- A scribe + decision support where the vet always decides is NOT solely-automated ADM. But client-facing automation (auto-declining a repeat prescription or plan eligibility with no human review) could have "similarly significant effects" and fall under Arts. 22A–22D.

**Design implication:** named human decision-maker in every consequential loop; log the human's opportunity and authority to override; any fully automated client-affecting decision needs Art. 22C-style safeguards (notice, contest route, human re-review), recorded.

## 9. RCVS / BVA positions on AI (2024–2026) — directly governs the scribe

Sources: <https://www.rcvs.org.uk/veterinary-professionals/conduct-and-guidance/resources-and-updates/using-artificial-intelligence-ai-in-practice-advice-for-the-profession> (Standards Committee, approved April 2026) · <https://www.bva.co.uk/take-action/our-policies/artificial-intelligence-in-the-veterinary-profession/> (Dec 2025) · Veterinary AI Transparency Alliance framework: <https://www.rcvs.org.uk/about-us/news-and-views/news/transparency-alliance-consults-the-veterinary-professions-on-responsible-ai-framework>

RCVS advice **[REG-GUID]**:
- "Professional and clinical decision making must not be wholly delegated to AI"; the professional remains accountable for outputs used.
- AI-generated clinical records/scribe transcripts "should be verified manually" and edited contemporaneously to meet Ch.13 standards; clinical judgement decides which AI differential-diagnosis output enters the record.
- Be open and honest with clients about AI use; clarify whether the developer accesses practice data or uses it for training without explicit client consent; comply with ICO guidance.
- Do not delegate AI-tool use to staff lacking appropriate knowledge/training.

BVA position **[PROF-GUID]** (Dec 2025): 8 principles — AI supports not replaces vets; AI literacy; vet involvement in validation; bias management; currency; data privacy and client consent; human oversight and responsibility; explainability. Every workplace should have an AI use policy and risk assessment; developers should publish validation data. Survey: 21% of clinical vets already use AI.

**Design implication:** mandatory human verification/sign-off before an AI note becomes the record; AI-drafted vs verified status flagged in the audit trail; ship client-notice materials, a practice AI-use policy template, and published validation/accuracy data; decision support presented as suggestions requiring vet confirmation.

## 10. CMA veterinary market investigation — pricing/prescriptions (CRITICAL for pricing engine)

Sources: <https://www.gov.uk/government/news/cma-concludes-market-investigation-with-major-reforms-to-veterinary-sector> · <https://www.gov.uk/guidance/what-veterinary-businesses-and-vets-need-to-do-following-the-cmas-final-vets-report> · <https://www.bva.co.uk/resources-support/competition-and-markets-authority/>

Status: market investigation opened March 2024; **final decision report published 25 March 2026**; remedies implemented via CMA Order expected in force ~September 2026, staged compliance (large groups ≥15 first-opinion practices: 3–9 months; smaller: 6–12 months; full compliance by early 2027). **[LAW once the Order is made — CMA-enforceable.]**

Remedies most relevant to the software:
- **Standard price lists** for defined services (consults, procedures, diagnostics, end-of-life) in standardised weight categories, published online/in-premises.
- Price lists for most-commonly-sold **parasiticides** with links to the VMD Product Register.
- **Pet Health/Care Plan transparency**: disclose included services, frequencies, standalone prices, and how claimed savings are calculated.
- **Written estimates for treatment over £500**; updated estimate if cost rises by 20% or £500 (whichever lower).
- **Itemised invoices**: every medicinal product, good/service, and third-party charge line-itemed.
- **Prescription right notification**: owners must be told (posters, email confirmations, oral prompts) they can request a written prescription and that medicines may be cheaper elsewhere.
- **Prescription timing**: hard copy by end of consultation, or digital within 48 hours.
- **Prescription fee caps**: max **£21** first prescription per consultation; **£12.50** per additional medicine in the same consultation.
- Generic/Reference Product disclosure; repeat-dispensing savings flyer/email each time repeats are dispensed.
- Ownership disclosure (group branding), data submission to enhanced RCVS Find-a-Vet comparison platform, clinical-freedom written policies, cremation options and pricing, **complaints process (5-day acknowledgement, 8-week resolution, complaint log)**, mediation participation.
- **[UNCERTAIN: final Order text and commencement dates pending as of 2026-07-19 — track the CMA case page.]**

**Design implication:** the pricing/eligibility engine should natively produce: standardised weight-banded price lists; estimates with automatic re-estimate triggers at +20%/+£500; itemised invoices; prescription-fee-cap enforcement (configurable £21/£12.50); 48-hour digital prescription SLA tracking; prescription-rights messaging in booking confirmations and dispensing flows; health-plan savings disclosures; complaint logging with 5-day/8-week timers. This is a near-complete compliance feature list.

## 11. Cascade (off-licence) prescribing records

Sources: VMD GN13 <https://assets.publishing.service.gov.uk/media/6825f946b2527e8de9b014f5/VMGN_13_Guidance_on_the_use_of_the_Cascade.pdf> · VMD GN14 · RCVS Ch.4 §4.32

- **[LAW]** Cascade prescriptions require, kept ≥5 years: date of examination; owner name/address; identification and number of animals; clinical-assessment result; product trade name; batch number; name and quantity of active substance; doses; duration; withdrawal period (food species).
- **[LAW/REG-GUID]** Cascade medicines treated as POM-V; RCVS 4.32 requires informed (written) owner consent noting potential side effects; dispensing label carries the cascade statement. Records available to VMD inspectors / PSS assessors.

**Design implication:** cascade flag per prescription that enforces the extended data set, triggers owner e-consent capture, and applies the cascade label statement automatically.

---

## Cross-cutting uncertainties to re-verify before build

1. Ch.13 and RCVS AI advice revised April 2026 — re-verify paragraph numbers before embedding in product text.
2. The 12-month repeat-prescription window is convention — configurable, not hard-coded.
3. DUAA 2025 ADM regime (Arts. 22A–22D); ICO final ADM guidance may still be in consultation.
4. CMA Order final text/commencement (~Sept 2026) — fee caps and deadlines are from the final report and GOV.UK compliance guidance.
5. VMR 2013 amended 2024 (GB) — check consolidated text for changed record particulars.
6. CD register statutory retention (2 years per MDR 2001, 5 recommended) — verify against the SI.
