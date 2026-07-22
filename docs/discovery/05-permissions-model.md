# Part 8 — Permissions Model (RBAC matrix)

## Design rules

1. **[REG] Statutory ceilings first:** prescribing/diagnosis/signing clinical assessments = vet only (Veterinary Surgeons Act; RCVS Code). RVN acts under vet *direction*; Student VN under *supervision* with countersign (Schedule 3). These ceilings are hard-coded and cannot be granted upward in config.
2. **Competency flags restrict below the ceiling** (e.g. an RVN not yet signed off for anaesthesia monitoring isn't offered those tasks). Set by Head RVN / clinical lead; audited.
3. **Delete never means destroy.** "Delete" = redaction flag; originals preserved [REG Ch.13]. Only Admin may redact, with reason.
4. **Export is a privileged, logged action** (SAR packs, case transfer, PSS evidence).
5. Clients are not MVP users; the column shows the future portal ceiling.
6. Legend: ✔ = full · O = own/assigned records only · D = draft requiring countersign · R = read-only · – = none. "Sign" = attributed completion of a record entry; "Approve" = authorise another's proposed action; "Prescribe/Dispense/Administer" shown for the *future integrated/independent-market* build — MVP keeps prescribing in the PMS, where the matrix still governs the **repeat-Rx queue** (review/approve = vet only).

## Matrix

| Capability | Dir | SnrVet | Vet | GradVet | HeadRVN | RVN | StuVN | VCA | HeadRec | Rec | CC | Client |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| View client demographics | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | R | – | ✔ | ✔ | ✔ | O |
| View patient summary/timeline | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | R | R¹ | ✔ | ✔ | ✔ | O² |
| View full clinical content | R | ✔ | ✔ | ✔ | ✔ | ✔ | R | – | R³ | R³ | R³ | O² |
| Create/edit client record | – | O | O | O | – | – | – | – | ✔ | ✔ | ✔ | O⁴ |
| Create/edit patient record | – | O | O | O | O | O | D | – | ✔ | ✔ | ✔ | O⁴ |
| Comfort profile / safety alerts | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | D | – | ✔ | O | O | – |
| Record observations/vitals | – | ✔ | ✔ | ✔ | ✔ | ✔ | **D** | O⁵ | – | – | – | – |
| Countersign SVN/VCA entries | – | ✔ | ✔ | ✔ | ✔ | ✔ | – | – | – | – | – | – |
| Sign clinical encounter | – | O | O | O | –⁶ | –⁶ | – | – | – | – | – | – |
| **Prescribe (POM-V)** | – | ✔ | ✔ | ✔ | – | – | – | – | – | – | – | – |
| Approve repeat-Rx request | – | ✔ | ✔ | ✔ | – | – | – | – | – | – | – | – |
| Dispense/prepare medication | – | ✔ | ✔ | ✔ | ✔ | ✔ | D | – | – | – | – | – |
| Administer medication | – | ✔ | ✔ | ✔ | ✔ | ✔⁷ | D⁷ | – | – | – | – | – |
| Create estimate | – | ✔ | ✔ | ✔ | O | O | – | – | R | R | R | R |
| Approve estimate overrun | – | ✔ | ✔ | ✔ | – | – | – | – | – | – | – | ✔⁸ |
| Record consent | – | ✔ | ✔ | ✔ | ✔ | ✔ | – | – | ✔ | ✔ | ✔ | ✔⁸ |
| Create tasks | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | O | O | ✔ | ✔ | ✔ | – |
| Assign tasks to others | ✔ | ✔ | ✔ | ✔ | ✔ | O⁹ | – | – | ✔ | O⁹ | O⁹ | – |
| Escalate | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | – |
| Acknowledge/resolve escalation | ✔ | ✔ | ✔ | ✔ | ✔ | O | – | – | O¹⁰ | – | O¹⁰ | – |
| Hospital board manage | – | ✔ | ✔ | ✔ | ✔ | O | – | – | R | R | R | – |
| Handover give/acknowledge | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | – |
| Complaints manage | ✔ | O | – | – | – | – | – | – | ✔ | D¹¹ | ✔ | – |
| Booking/waiting states | – | – | – | – | – | – | – | – | ✔ | ✔ | ✔ | O⁴ |
| Payments (record/view) | R | – | – | – | – | – | – | – | ✔ | ✔ | ✔ | O |
| Config (thresholds, templates, roles) | ✔ | O¹² | – | – | O¹² | – | – | – | O¹² | – | – | – |
| Competency flags manage | ✔ | ✔ | – | – | ✔ | – | – | – | – | – | – | – |
| Redact ("delete") | ✔¹³ | – | – | – | – | – | – | – | – | – | – | – |
| Export (records/evidence) | ✔ | O | O | O | O | – | – | – | O¹⁴ | – | O¹⁴ | O² |
| Audit-log view | ✔ | O | – | – | – | – | – | – | – | – | – | – |

Footnotes:
1. VCA sees patient name, species, kennel, handling/infection flags, care tasks — no client contact details, no clinical narrative (data minimisation).
2. Client sees approved summaries and own documents only — never raw clinical notes (brief's rule, correct; raw-record copies on request remain a practice process [REG Ch.13]).
3. Reception/Client Care read clinical content sufficient for their work (discharge status, follow-up needs); sensitive free text can be need-to-know-flagged per entry.
4. Via future portal: request changes/bookings — staff confirm; no direct master-record writes.
5. VCA records only authorised basic observations (eaten/toileted/demeanour) as structured entries flagged to the responsible nurse.
6. RVN signs *nursing* entries fully (Ch.13 applies to nurses too [REG]); "sign clinical encounter" here means the vet's consultation record.
7. Within Schedule 3 scope and under recorded direction; the directing vet is a mandatory field on medication-administration tasks. SVN additionally requires supervisor-present confirmation.
8. Estimate approval by the client = consent to cost, captured with the consent record [REG-CMA re-estimate evidence].
9. Within own team/queue.
10. Operational (non-clinical) escalations only.
11. Reception logs complaints (intake); management/resolution by Head Rec / Client Care / Director.
12. Domain config only: Senior Vet — clinical templates/protocols, escalation reasons; Head RVN — board/obs templates, nursing competencies; Head Rec — reception queues, intake prompts.
13. Redaction requires reason + preserves original in audit store; twice-yearly redaction review [REC].
14. Head Rec / Client Care export non-clinical packs (complaint logs, comms histories); full clinical export is vet/Director.

## Special modes

- **Locum vet/nurse:** time-boxed accounts inheriting Vet/RVN row minus config, minus export, auto-expiring; supervision links assignable.
- **Break-glass:** any clinical staff can open any record in an emergency; access is loudly logged and reviewed weekly by the Director [REC].
- **Graduate-vet policy layer:** identical statutory rights to Vet [REG]; practice-configurable advisory gates (e.g. "notify senior on CD prescribing decisions" or case-type review prompts) — visible to the graduate, framed as support, removable per competency progression.
- **AI (Phase 3) is a non-principal:** the scribe/decision-support service authenticates as a service identity that can only ever create *drafts* attached to a human session; it holds no row in the matrix by design — no sign, no approve, no prescribe, nothing client-facing unreleased [REG RCVS AI advice].
