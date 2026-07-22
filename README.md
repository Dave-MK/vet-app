# Andale Care Hub

Practice-operations app for Andale Veterinary Centre. Built on Next.js (App Router).

The UI is the build of `docs/design/prototype-iteration-2.html` — see
[docs/design/ui-review-iteration-2-changelog.md](docs/design/ui-review-iteration-2-changelog.md)
for how the screens map back to the design review, and `docs/discovery/` for the research
the screens are answering.

## Getting started

```bash
npm run dev
```

Open http://localhost:3000 — `/` redirects to `/today`.

## Routes

| Route             | Screen                                                              |
| ----------------- | ------------------------------------------------------------------- |
| `/today`          | Four role variants: reception, vet, nursing, director exceptions     |
| `/tasks`          | Task queues and shift handover with acknowledgements                 |
| `/intake`         | Phone and walk-in intake, with the red-flag booking lock             |
| `/patient`        | Patient record — provenance on every fact                            |
| `/rx`             | Repeat-prescription queue and the vet-review gates                   |
| `/hospital`       | Nursing and hospital board (ward mode enlarges it for the wall)      |
| `/consult`        | Consultation workspace + scribe — **Phase 3 concept, not in MVP**    |
| `/diagnostics`    | Placeholder — not designed yet                                       |
| `/administration` | Placeholder — Practice Director only                                 |

## How it is put together

- `app/globals.css` — the whole design system: semantic colour tokens, the controlled status
  vocabulary (red is clinical-only), and every breakpoint. Hand-authored, no Tailwind preflight,
  so this file is the single source of truth for styling.
- `components/app-shell.tsx` — sidebar, topbar, and the off-canvas drawer used below 820px.
- `components/providers.tsx` — demo role switching and the two global dialogs (escalation,
  sign-and-complete), both reachable from every screen.
- `components/ui.tsx` — presentational primitives (cards, pills, rows, stats).
- `components/interactive.tsx` — the client-side behaviour: acknowledge, red-flag lock, tabs,
  ward mode, escalation entry points.
- `lib/nav.ts` — navigation model and the demo staff list.

Role switching is a demo affordance in the sidebar; in the real product it comes from the session.

## Status

Concept UI. Clinical workflows, permissions and terminology still require validation with the
Andale team, and the data on every screen is a plausible Tuesday, not real records.
