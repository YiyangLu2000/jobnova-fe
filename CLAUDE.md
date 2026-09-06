# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Jobnova — a job board web app with match/recommendation scoring: each job shows a
"% Match" ring against a reference job, and the job detail page has a "why this is
a good fit for me" breakdown. Built for a take-home assessment; AI-assisted
development is explicitly encouraged by the assignment.

## Tech stack

Vite 8, React 19, TypeScript 6, Tailwind CSS 4 (via `@tailwindcss/vite`). oxlint
for linting — this is Vite's current default and is intentionally not ESLint.
Prettier for formatting.

## Commands

- `npm run build` — `tsc -b` then `vite build`. No test framework is set up, so
  this is how you verify a change compiles.
- `npm run lint` — oxlint (config: `.oxlintrc.json`).
- `npm run format` — Prettier.

## Stack gotchas

- Tailwind CSS v4: there is no `tailwind.config.js`. It's wired via the
  `@tailwindcss/vite` plugin and `@import 'tailwindcss';` in `src/index.css`;
  customize the theme with `@theme` in that file.
- TypeScript 6: do not add `baseUrl` (deprecated). Path aliases resolve relative
  to the tsconfig.
- Path aliases (`@/*` → `src/*`, plus `@/components`, `@/hooks`, `@/lib`,
  `@/types`) are declared in both `tsconfig.app.json` (`paths`) and
  `vite.config.ts` (`resolve.alias`) — keep the two in sync.

## Folder structure

Feature-based under `src/`. There is a single `features/job-board/` feature — it
is deliberately not split into separate `job-board` / `recommendations` features.
The Figma list and detail views share one set of components (MatchRing, JobCard,
company identity, attribute chips, save/share icons); there is no separate
recommendations list or card in the design. "Recommendation" shows up only as
(1) match-score data and sorting layered onto job data, and (2) one distinct
component — the fit-breakdown panel ("Why is this job a good fit for me?") on the
detail page.

```
features/job-board/
  api/  hooks/  pages/  components/board/  components/detail/  components/shared/
```

- Route-level pages live inside the feature at `features/job-board/pages/`, not a
  top-level `src/pages/`.
- `src/{components,hooks,layouts,lib,types}/` are for cross-feature code only.
- Mock-interview promo content lives outside `job-board` (different product area).
- No backend yet: the `api/` layer returns mock data but should be shaped (async
  functions, realistic response types) so a real endpoint can be swapped in later.

## Design & responsive

- Figma MCP access: the connected Figma account does not have edit access to the
  shared design file. Design review was done from screenshots, not live MCP
  queries. Confirm MCP access before assuming a future session can fetch design
  data from this file.
- Desktop layout matches the Figma design exactly.
- Mobile / H5 is an original art-directed adaptation — no mobile Figma frame
  exists. Treat mobile layout as design decisions to be made, not details to be
  inferred from the desktop frame.

## Conventions

- PascalCase component names; one component per file.
- Import via the `@/` path aliases rather than long relative paths.
- Commit directly to `main` (solo take-home, no PRs), using Conventional Commits
  format for messages.
