# Andale Vets — Practice Operations Platform: Discovery & Critical Review

Full critical review of the all-in-one practice-operations platform concept for Andale Veterinary Centre (Widnes), produced 2026-07-20 from live website research, UK regulatory research and vet-tech market research. All claims are labelled: **[FACT]** (verified, cited) · **[REG]** (regulatory requirement) · **[REC]** (product recommendation) · **[ASSUMPTION]** (requires validation in discovery).

## Headline findings

1. **Andale is an IVC Evidensia practice** — its PMS (likely MWI Merlin), booking (My Vet Account, *not* Vetstoria), health plan (Pet Health Club), payments and OOH provider (Vets Now) are all group-owned or group-procured, and the data controller is Independent Vetcare Ltd. The practice cannot unilaterally adopt a data-integrated third-party platform. This is the project's gating question (Gate G1).
2. **The CMA veterinary market Order (final report March 2026, in force ~Sept 2026)** makes estimate versioning, prescription fee caps/SLAs, itemised invoicing, price-list publication and complaint timers *enforceable obligations* — converting much of the proposed "pricing engine" into a compliance-workflow product with a time-limited market wedge.
3. **The recommended direction:** a workflow/coordination platform (tasks, handovers, hospital whiteboard, queues, timers, audit) that works at zero PMS integration, piloted at/with Andale, aimed commercially at independent UK practices. The AI scribe is a Phase-4 differentiator (the scribe market is commoditised at ~£75/vet/month); the mandatory-human-sign-off design is dictated by RCVS AI advice (April 2026) and a mandatory DPIA.

## Document map

| File | Contents (brief Parts) |
|---|---|
| [01-executive-assessment.md](01-executive-assessment.md) | Part 1 executive assessment · Part 2 existing systems · Part 3 stakeholder map |
| [02-role-journeys.md](02-role-journeys.md) | Part 4 — all 13 roles reviewed against the real 21-person team, plus missing roles |
| [03-service-blueprints.md](03-service-blueprints.md) | Part 5 — 16 service blueprints with failure points, safeguards, automation |
| [04-information-and-data-architecture.md](04-information-and-data-architecture.md) | Part 6 IA · Part 7 data architecture, source-of-truth constitution, Mermaid ERD, retention, classifications |
| [05-permissions-model.md](05-permissions-model.md) | Part 8 — RBAC matrix (12 roles × capabilities), Schedule 3 ceilings, competency flags, locum/break-glass/AI modes |
| [06-ai-consultation-assistant.md](06-ai-consultation-assistant.md) | Part 9 — scribe safety design: risk tiers, consent/lawful basis, DPIA, hosting, retention, metrics, pilot, stop conditions |
| [07-mvp-and-technical-architecture.md](07-mvp-and-technical-architecture.md) | Part 10 MVP (5 screens, stories, criteria) · Part 11 technical architecture (modular monolith, Next.js/Postgres, UK hosting) |
| [08-roadmap-interviews-recommendation.md](08-roadmap-interviews-recommendation.md) | Part 12 roadmap with gates · Part 13 interview guide · Part 14 final recommendation + next ten actions |
| [research/andale-website-findings.md](research/andale-website-findings.md) | Appendix C — verbatim site extraction: team, prices, systems, flows |
| [research/regulatory-findings.md](research/regulatory-findings.md) | Appendix A — RCVS, VMD, Schedule 3, VetGDP, ICO/UK GDPR/DUAA, CMA, cascade (cited) |
| [research/systems-landscape-findings.md](research/systems-landscape-findings.md) | Appendix B — IVC ownership evidence, Merlin/MWI APIs, labs, Vets Now, scribe market, insurance rails |

## How to use this set

- **Before anything else:** action list in Part 14 — item 1 (the G1/IVC question) gates all build work.
- **For discovery interviews:** Part 13, plus the [ASSUMPTION] tags throughout as a verification checklist.
- **For UX design:** Parts 4–6 (journeys → blueprints → IA) and the five MVP screens in Part 10.
- **For engineering:** Parts 7, 8, 11 (source-of-truth rules, RBAC, architecture) — note the repo warning in Part 11.2 about this Next.js version's breaking changes.
