# Job Board List View — Component Breakdown & Build Plan

## Context

Jobnova is a greenfield take-home. Everything under `src/` is empty `.gitkeep`
scaffold — no components, types, hooks, api, router, or icon library; `App.tsx`
is still the stock Vite counter. This plan defines the **component breakdown for
the job board list view** (screenshot 1): the app shell (left sidebar nav, top
Matched/Liked/Applied tabs, right AI-mock promo rail) plus the center job list.
It also covers the supporting plumbing needed to make it run — shared TS types, a
mock async `api/` layer, a match scorer, data hooks, and `react-router` for the
list + detail routes. Interactivity is full: save/like, Apply, tab switching,
sort, "Change Job Reference", and card → detail navigation, all in-memory (no
persistence).

Detail view (screenshot 2) is **not** built here, but shared components
(`components/shared/`) are designed so the detail page reuses them.

### Confirmed decisions

- **Icons:** install `lucide-react` (tree-shakeable, React 19, thin-stroke style
  matches Figma). Keep `public/icons.svg` for footer social icons only.
- **Router:** install `react-router` v7 (import from `react-router`; the `-dom`
  package is merged in).
- **Data fetching:** plain hooks over the mock `api/` layer — no react-query, no
  router loaders.
- **"Change Job Reference":** each click cycles to the next reference-job fixture,
  wrapping after the last, and recalculates match scores on all cards. No picker.
- **Companies & logos:** fixtures use exactly 4 companies — Google, Cursor, Backd
  Business Funding, Simons Foundation — reused across the ~10–12 job listings.
  Logos are local static files the user provides at `public/logos/google.svg`,
  `/cursor.svg`, `/backd.svg`, `/simons-foundation.svg` (no external logo API /
  hotlinking). `Company.logoUrl` holds these `/logos/*.svg` paths; `CompanyLogo`
  still renders an initials fallback if a file is missing.
- **saved / applied state:** one React Context mounted in the layout route (above
  `<Outlet/>`) so it survives list ⇄ detail navigation.
- **tab / sort state:** URL search params (`/?tab=liked&sort=recent`).
- **Brand tokens:** `@theme` block in `src/index.css` (no `tailwind.config.js` in
  Tailwind v4).

### Stack constraints to respect

- `verbatimModuleSyntax` → all type imports use `import type`.
- `erasableSyntaxOnly` → no `enum`; use string-literal unions / `as const`.
- `noUnusedLocals` / `noUnusedParameters` on. Prettier: no semicolons, single
  quotes, trailing commas, printWidth 80.
- Path aliases live in **both** `tsconfig.app.json` and `vite.config.ts` — keep in
  sync. No new alias needed (`@/features/job-board/...` resolves via `@/*`).
- PostToolUse hooks auto-run Prettier + oxlint on every write.
- `npm run build` (`tsc -b && vite build`) is the only compile check.

---

## Component tree

```
main.tsx  →  RouterProvider
└─ AppShell                          src/layouts/                shell, shared with detail
   ├─ Sidebar                        src/layouts/
   │  ├─ BrandLogo                   src/components/
   │  ├─ SidebarNavItem  (×N)        src/layouts/                icon + label, active purple pill
   │  └─ UpgradePlanCard             src/layouts/                gradient promo + Subscription button
   ├─ AppHeader                      src/layouts/
   │  ├─ BrandLogo                   src/components/
   │  └─ TabNav                      src/layouts/                Matched / Liked (n) / Applied (n)
   │     └─ Pill / Badge             src/components/ui/          lime count badge
   └─ JobInteractionsProvider        src/features/job-board/context/
      └─ <Outlet/>
         └─ JobBoardPage             src/features/job-board/pages/     index route "/"
            ├─ JobBoardToolbar       …/components/board/
            │  ├─ ChangeReferenceButton   …/components/board/    full-width purple, refresh icon
            │  └─ SortMenu                …/components/board/    white "Top matched" button + menu
            ├─ JobList               …/components/board/
            │  ├─ JobListSkeleton    …/components/board/         loading stack
            │  └─ JobCard  (×N)      …/components/shared/        SHARED (variant prop)
            │     ├─ MatchRing              …/components/shared/  SHARED
            │     ├─ SaveButton             …/components/shared/  SHARED (heart, fills purple)
            │     ├─ ShareButton            …/components/shared/  SHARED (copy job URL)
            │     ├─ CompanyIdentity        …/components/shared/  SHARED
            │     │  └─ CompanyLogo         …/components/shared/  SHARED (img + initials fallback)
            │     ├─ JobMetaRow             …/components/shared/  SHARED (location • arrangement)
            │     ├─ AttributeChipList      …/components/shared/  SHARED (layout: inline | grid)
            │     │  ├─ AttributeChip       …/components/shared/  SHARED
            │     │  └─ SkillMatchChip      …/components/shared/  SHARED ("0 of 3 skills match")
            │     └─ JobCardFooter          …/components/board/   list-only
            │        ├─ PostedTimePill      …/components/shared/  SHARED (clock + relative time)
            │        ├─ ApplicantCountText  …/components/shared/  SHARED
            │        ├─ Button (Apply)      src/components/ui/
            │        └─ MockInterviewButton src/features/mock-interview/components/
            └─ MockInterviewPromoPanel      src/features/mock-interview/components/   right rail
               ├─ MockInterviewFeatureList  src/features/mock-interview/components/
               └─ Button (dark)             src/components/ui/
```

**Folder rationale**

- `src/layouts/` — `AppShell`, `Sidebar`, `SidebarNavItem`, `UpgradePlanCard`,
  `AppHeader`, `TabNav`: app-level nav shell shared by list + detail, not
  job-board domain.
- `src/components/ui/` — `Button`, `Pill`/`Badge`, `Spinner`: brand primitives,
  cross-feature. `src/components/BrandLogo.tsx` — wordmark.
- `src/features/job-board/components/shared/` — everything the detail view also
  renders.
- `src/features/job-board/components/board/` — list-only composition.
- `src/features/mock-interview/components/` — promo panel + feature list + the
  "Mock Interview" button (separate product area per CLAUDE.md). Buttons no-op /
  navigate to a placeholder for now.

---

## Props / interface sketches

`SHARED` = also consumed by the detail view.

### Shell / layout

```ts
// AppShell — no props; renders Sidebar + AppHeader + JobInteractionsProvider>Outlet
// Sidebar — no props; nav items are a local `as const` array; active from useLocation

interface SidebarNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
}

interface UpgradePlanCardProps {
  onUpgrade?: () => void; // default: navigate to placeholder
}

type JobTab = "matched" | "liked" | "applied";

interface TabNavProps {
  activeTab: JobTab;
  counts: Record<JobTab, number>;
  onTabChange: (tab: JobTab) => void;
}

interface BrandLogoProps {
  variant?: "full" | "mark";
  className?: string;
}
```

### UI primitives — `src/components/ui/`

```ts
type ButtonVariant = "primary" | "outline" | "lime" | "dark" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // default 'primary' (purple)
  size?: ButtonSize;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  fullWidth?: boolean;
}

interface PillProps {
  tone?: "purple" | "lime" | "neutral" | "outline";
  size?: "sm" | "md";
  children: React.ReactNode;
}

interface SpinnerProps {
  size?: number;
  label?: string;
}
```

### Shared job components — `components/shared/`

```ts
interface MatchRingProps {
  // SHARED — list md, detail lg
  score: number; // 0–100
  band?: MatchBand; // optional override; else scoreToBand(score)
  size?: "sm" | "md" | "lg";
  label?: string; // default 'Match'
  showValue?: boolean; // default true
}

interface JobCardProps {
  // SHARED — detail passes variant='detail', omits footer
  job: Job;
  saved: boolean;
  applied: boolean;
  onToggleSave: (jobId: string) => void;
  onApply: (jobId: string) => void;
  onOpen: (jobId: string) => void; // navigate to /jobs/:id (list only)
  onStartMockInterview: (jobId: string) => void;
  variant?: "list" | "detail"; // default 'list'
  className?: string;
}

interface CompanyIdentityProps {
  company: Company;
  size?: "sm" | "md";
} // SHARED
interface CompanyLogoProps {
  // SHARED
  name: string;
  logoUrl: string | null;
  size?: "sm" | "md" | "lg";
}
interface JobMetaRowProps {
  location: string;
  workArrangement: WorkArrangement;
} // SHARED

interface AttributeChipListProps {
  // SHARED — list: inline pills; detail: icon+label grid
  job: Job;
  layout?: "inline" | "grid"; // default 'inline'
}
interface AttributeChipProps {
  icon?: LucideIcon;
  label: string;
  tone?: "neutral" | "accent";
} // SHARED
interface SkillMatchChipProps {
  matched: number;
  total: number;
} // SHARED

interface SaveButtonProps {
  // SHARED
  saved: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
  label?: string; // aria-label, default 'Save job'
}
interface ShareButtonProps {
  // SHARED
  jobId: string;
  onShare?: (jobId: string) => void; // default: copy `${origin}/jobs/${jobId}`
  size?: "sm" | "md";
}
interface PostedTimePillProps {
  postedAt: string;
} // SHARED — ISO 8601
interface ApplicantCountTextProps {
  count: number;
} // SHARED
```

### Board-only — `components/board/`

```ts
interface JobBoardToolbarProps {
  referenceJob: ReferenceJob;
  onChangeReference: () => void; // cycle to next reference fixture, wrap at end
  sort: JobSort;
  onSortChange: (sort: JobSort) => void;
}
interface ChangeReferenceButtonProps {
  referenceTitle?: string;
  onClick: () => void;
}
interface SortMenuProps {
  value: JobSort;
  options: ReadonlyArray<{ id: JobSort; label: string }>;
  onChange: (id: JobSort) => void;
}
interface JobListProps {
  jobs: Job[];
  savedIds: ReadonlySet<string>;
  appliedIds: ReadonlySet<string>;
  onToggleSave: (jobId: string) => void;
  onApply: (jobId: string) => void;
  onOpenJob: (jobId: string) => void;
  onStartMockInterview: (jobId: string) => void;
  emptyMessage?: string; // varies by active tab
}
interface JobListSkeletonProps {
  count?: number;
} // default 4
interface JobCardFooterProps {
  job: Job;
  applied: boolean;
  onApply: (jobId: string) => void;
  onStartMockInterview: (jobId: string) => void;
}
```

### Mock-interview — `src/features/mock-interview/components/`

```ts
interface MockInterviewPromoPanelProps {
  contextJobId?: string; // list: undefined
  onStart?: (jobId?: string) => void;
}
interface MockInterviewFeatureListProps {
  items?: ReadonlyArray<{ title: string; body: string }>; // default: the 3 from design, as const
}
interface MockInterviewButtonProps {
  jobId?: string;
  onClick?: (jobId?: string) => void;
  variant?: "lime" | "dark"; // card: 'lime', panel: 'dark'
  size?: "sm" | "md";
}
```

---

## Shared TS types — `src/features/job-board/types/index.ts`

Domain types are job-board-specific → live in the feature (`src/types/` stays
reserved for genuinely cross-feature types). `import type` everywhere; unions not
enums.

```ts
export type EmploymentType =
  "full-time" | "part-time" | "contract" | "internship" | "temporary";
export type WorkArrangement = "on-site" | "remote" | "hybrid";
export type Seniority =
  "intern" | "entry" | "junior" | "mid" | "senior" | "lead" | "principal";
export type MatchBand = "low" | "medium" | "high"; // drives ring color

export interface Company {
  id: string;
  name: string;
  logoUrl: string | null; // local `/logos/*.svg`; 4 fixed companies (see Confirmed decisions)
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string; // 'USD'
  period: "year" | "month" | "hour";
}

export interface SkillMatch {
  matched: number;
  total: number;
  matchedSkills?: string[]; // reserved for detail
  missingSkills?: string[];
}

export interface MatchScore {
  score: number;
  band: MatchBand;
  skills: SkillMatch;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  workArrangement: WorkArrangement;
  employmentType: EmploymentType;
  seniority: Seniority;
  experienceYears: number | null;
  salary: SalaryRange | null;
  skills: string[]; // required skills → scorer input
  postedAt: string; // ISO 8601
  applicantCount: number;
  description: string; // detail view
  matchScore: MatchScore; // attached by api layer, never authored in fixtures
}

export interface ReferenceJob {
  id: string;
  title: string;
  skills: string[];
  seniority: Seniority;
  experienceYears: number | null;
}

export type JobTab = "matched" | "liked" | "applied";
export type JobSort = "top-matched" | "recent";
```

Label maps live in `features/job-board/lib/labels.ts` (`WORK_ARRANGEMENT_LABEL`,
`EMPLOYMENT_TYPE_LABEL`, `SENIORITY_LABEL` — `as const` objects), not in `types`.

---

## Mock `api/` layer — `src/features/job-board/api/`

Files: `jobs.ts` (functions), `fixtures.ts` (~10–12 raw jobs + 3 reference jobs;
4 shared `Company` records — Google / Cursor / Backd Business Funding / Simons
Foundation — each `logoUrl` a `/logos/*.svg` path, companies repeated across
listings), plus `src/lib/delay.ts` (`delay(ms): Promise<void>`) and
`src/lib/cn.ts` (class-name join).

```ts
// api/jobs.ts
import type { Job, ReferenceJob, JobSort } from "@/features/job-board/types";

export interface JobListParams {
  sort?: JobSort; // default 'top-matched'
  referenceJobId?: string; // default: first reference fixture
}
export interface JobListResponse {
  jobs: Job[];
  referenceJob: ReferenceJob;
  total: number;
}

export function getJobs(params?: JobListParams): Promise<JobListResponse>;
export function getJob(id: string): Promise<JobResponse>; // detail — stubbed now
export function getReferenceJobs(): Promise<ReferenceJob[]>; // for reference cycling
```

Implementation shape:

- Each fn `await delay(250–400)` then returns **cloned** fixture data (callers
  can't mutate module state).
- `getJobs`: resolve reference job → map raw jobs through
  `computeMatchScore(job, referenceJob)` to attach `matchScore` → apply `sort` →
  return.
- **Sorting is an API param** (`'top-matched'` = score desc; `'recent'` =
  `postedAt` desc) — applied in the mock so a real endpoint swaps in cleanly.
- **Tab filtering is client-only** — `matched` / `liked` / `applied` depend on
  in-memory interaction state; `JobBoardPage` filters the returned list and
  derives counts.
- `getJob` rejects with a typed `JobNotFoundError` on unknown id (detail
  not-found state, later).

### Scorer & formatters — `src/features/job-board/lib/`

- `computeMatchScore.ts` — `computeMatchScore(job, ref): MatchScore`.
  Deterministic weighted heuristic: skill-overlap ratio vs `ref.skills`
  (dominant), seniority distance (index delta on the union), experience delta,
  small title-token-overlap bonus → clamp 0–100 → round.
- `matchBand.ts` — `scoreToBand(score): MatchBand` (proposed cutoffs `<65` low /
  `65–79` medium / `≥80` high) and `BAND_RING_CLASS: Record<MatchBand, string>`
  → Tailwind classes backed by `@theme` vars `--color-match-low/medium/high`.
  **Exact cutoffs + hex per band are a build-time decision** (design only gives
  "amber ≈ 64%, lime ≥ 80%"; lime CTA `#c6f24e` known).
- `formatSalary.ts` (`SalaryRange` → `"$65k/yr – $70k/yr"`),
  `formatRelativeTime.ts` (`"1 hour ago"`), `labels.ts`.

---

## Hooks & context — `src/features/job-board/`

```ts
// context/JobInteractionsProvider.tsx — mounted in AppShell, above <Outlet/>
// useState<Set<string>> for saved + applied; memoized value; Set identity swap on change
interface JobInteractionsValue {
  savedIds: ReadonlySet<string>;
  appliedIds: ReadonlySet<string>;
  isSaved: (id: string) => boolean;
  isApplied: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  markApplied: (id: string) => void;
}

// hooks/useJobInteractions.ts — useContext wrapper; throws outside provider
// hooks/useJobs.ts
function useJobs(params: { sort: JobSort; referenceJobId?: string }): {
  jobs: Job[];
  referenceJob: ReferenceJob | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};
// useEffect → getJobs; race-safe via incrementing request id / "ignore stale"
// flag; must tolerate StrictMode double-invoke.

// hooks/useJobTab.ts   — [tab, setTab]  wrapping useSearchParams, key 'tab', default 'matched'
// hooks/useJobSort.ts  — [sort, setSort] wrapping useSearchParams, key 'sort', default 'top-matched'
// hooks/useReferenceJob.ts — holds current reference id + cycleReference()
//   (rotate through getReferenceJobs result, wrap at end) + setReference(id)
```

**Why Context, not lifted `useState` / `useSyncExternalStore`:** `JobBoardPage`
unmounts on navigation to `/jobs/:id`, so page-level state would lose
saved/applied. Context in the **layout route** persists. A module store +
`useSyncExternalStore` also works but is more ceremony than a take-home needs for
~12 cards.

**Counts:** `matched` = `jobs.length`, `liked` = `savedIds.size`, `applied` =
`appliedIds.size`. Header reads `liked`/`applied` from context; `matched` shown
unlabeled (matches screenshot).

---

## Routing — `react-router` v7

```ts
// main.tsx
createBrowserRouter([
  {
    element: <AppShell />,                       // layout: sidebar + header + JobInteractionsProvider>Outlet
    children: [
      { index: true,         element: <JobBoardPage /> },   // "/"  = list
      { path: 'jobs/:jobId', element: <JobDetailPage /> },  // placeholder now
      { path: '*',           element: <NotFound /> },
    ],
  },
])
// <RouterProvider router={router} /> inside <StrictMode> in main.tsx
```

- `RouterProvider` replaces `<App/>` in `main.tsx`; `App.tsx` is deleted (or
  reduced to nothing).
- **List route** `/` (index). Sidebar "Jobs" `NavLink` → `/`. Sort/tab are
  `?sort=` / `?tab=` search params on that path.
- **Detail route** `/jobs/:jobId`. `JobCard.onOpen(id)` → page `useNavigate()` →
  ``navigate(`/jobs/${id}?${searchParams.toString()}`)`` so returning preserves
  tab/sort.
- **Back** (detail): `navigate(-1)` with fallback to `/` on direct deep link.
- **State across navigation:** `JobInteractionsProvider` in the layout route does
  not unmount switching `/` ⇄ `/jobs/:id` → saved/applied persist; tab/sort
  persist via URL.
- **Share:** `ShareButton` copies `${window.location.origin}/jobs/${jobId}`.
- **Aliases:** no new alias required. If `@/features` is added for convenience,
  update **both** `tsconfig.app.json` `paths` and `vite.config.ts`
  `resolve.alias`.

---

## Build order

Conventional Commits; each step compiles clean (`npm run build`). Presentational
components can land before their consumers — an unused _export_ does not trip
`noUnusedLocals`.

1. `style: add brand theme tokens` — `@theme` block in `src/index.css` (brand
   purples, lime/blue accents, `--color-match-low/medium/high`, radii, font).
   Trim `App.tsx` to a minimal placeholder.
2. `feat(job-board): add domain types` — `features/job-board/types/index.ts`.
3. `feat(job-board): add mock fixtures` — `api/fixtures.ts` (10–12 raw jobs + 3
   reference jobs), typed against step 2. Exactly 4 `Company` records (Google,
   Cursor, Backd Business Funding, Simons Foundation), reused across listings,
   `logoUrl` = `/logos/{google,cursor,backd,simons-foundation}.svg`. Logo files
   are supplied by the user under `public/logos/` — not created in this step.
4. `feat(lib): add shared utils` — `src/lib/delay.ts`, `src/lib/cn.ts`.
5. `feat(job-board): add scorer and formatters` — `lib/computeMatchScore.ts`,
   `lib/matchBand.ts`, `lib/formatSalary.ts`, `lib/formatRelativeTime.ts`,
   `lib/labels.ts`.
6. `feat(job-board): add async mock api` — `api/jobs.ts` (`getJobs`, `getJob`,
   `getReferenceJobs`) wiring fixtures + scorer + delay.
7. `chore: add lucide-react` — dependency only.
8. `feat(ui): add Button, Pill, Spinner, BrandLogo` — `src/components/ui/*`,
   `src/components/BrandLogo.tsx`.
9. `feat(job-board): add shared job primitives` — `components/shared/`:
   `MatchRing`, `CompanyLogo`, `CompanyIdentity`, `JobMetaRow`, `AttributeChip`,
   `SkillMatchChip`, `AttributeChipList`, `SaveButton`, `ShareButton`,
   `PostedTimePill`, `ApplicantCountText`.
10. `feat(job-board): add JobCard` — `components/shared/JobCard.tsx` +
    `components/board/JobCardFooter.tsx`, composing step 9. Driven by static
    props.
11. `feat(job-board): add JobList and toolbar` — `components/board/`: `JobList`,
    `JobListSkeleton`, `JobBoardToolbar`, `ChangeReferenceButton`, `SortMenu`.
12. `feat(mock-interview): add promo panel` —
    `src/features/mock-interview/components/`: `MockInterviewPromoPanel`,
    `MockInterviewFeatureList`, `MockInterviewButton` (static; buttons no-op).
13. `chore: add react-router` — dependency only.
14. `feat(app): add AppShell, Sidebar, AppHeader` — `src/layouts/`: `AppShell`,
    `Sidebar`, `SidebarNavItem`, `UpgradePlanCard`, `AppHeader`, `TabNav`.
15. `feat(job-board): add interactions context and data hooks` —
    `context/JobInteractionsProvider.tsx`, `hooks/useJobInteractions.ts`,
    `hooks/useJobs.ts`, `hooks/useJobTab.ts`, `hooks/useJobSort.ts`,
    `hooks/useReferenceJob.ts`.
16. `feat(job-board): assemble JobBoardPage` — `pages/JobBoardPage.tsx`:
    `useJobs` + tab/sort/reference hooks, in-memory tab filter,
    loading/error/empty states, renders toolbar + list + promo panel.
17. `feat(app): wire router entrypoint` — `main.tsx` → `createBrowserRouter` +
    `RouterProvider`; layout route → `JobBoardPage` at `/`, placeholder
    `JobDetailPage` at `/jobs/:jobId`, `NotFound` at `*`. List view runs end to
    end.
18. `feat(job-board): wire list interactivity` — save/like toggle, Apply, tab
    switching + counts, sort → `useJobs`, "Change Job Reference" cycling
    (wrap at end), card click → `navigate('/jobs/:id')`, `ShareButton`
    clipboard.
19. `feat(job-board): responsive list view` — mobile adaptation (original art
    direction, no Figma frame): sidebar → drawer / bottom bar, right rail
    collapses below the list (or hidden `<lg`), card reflow, tab nav scroll.
20. `polish: a11y and states` — focus rings, `aria-pressed` on `SaveButton`,
    `aria-current` tabs, per-tab skeleton/empty copy, reduced-motion for the
    ring.

---

## Verification

- **Compile:** `npm run build` after every step (no test framework). Lint:
  `npm run lint`. Format: `npm run format` (also runs via PostToolUse hook).
- **Manual, after step 17:** `npm run dev` →
  - list renders ~10–12 cards, each with a colored match ring, company identity,
    meta row, attribute chips, and footer; only the 4 known companies appear,
    and each shows its `/logos/*.svg` (initials fallback until the user drops the
    files into `public/logos/`);
  - rings sorted high→low under "Top matched"; switching sort to "Recent"
    reorders by posted time.
- **Manual, after step 18:**
  - clicking a card's heart fills it purple and moves the card into the "Liked"
    tab; the Liked count badge increments;
  - clicking "Apply" moves the card into "Applied" and increments that badge;
  - "Change Job Reference" click changes the toolbar's reference title and all
    match percentages recompute; clicking past the last fixture wraps to the
    first;
  - clicking a card body navigates to `/jobs/:id`; browser Back returns with the
    same tab + sort still applied and saved/applied state intact;
  - "Share" copies `<origin>/jobs/<id>` to the clipboard.
- **Responsive check (step 19):** narrow the viewport to ~375px — sidebar
  collapses, right rail drops below the list, cards remain readable with no
  horizontal scroll.

---

## Open questions / build-time decisions

Not blockers for starting; flag if a reviewer should weigh in:

- **Match-ring band cutoffs & exact hex** — design only implies "amber ≈ 64%,
  lime ≥ 80%". Proposed `<65 / 65–79 / ≥80`; amber/mid hex to be chosen.
- **Match-score algorithm** — an invented deterministic heuristic (skills /
  seniority / experience weights). Assumed acceptable for a take-home vs a "real"
  recommender.
- **Tab semantics** — "Matched" assumed to mean all fetched jobs (screenshot
  shows no count), not "jobs above a score threshold".
- **"Mock Interview" button target** — placeholder / no-op for now
  (mock-interview flow is out of scope).
- **Work-arrangement icon** — which lucide glyph for the wifi/broadcast mark
  (`on-site` / `remote` / `hybrid`).
- **Sidebar secondary items** (Subscription, Extra Credits, Setting) &
  `UpgradePlanCard` — assumed decorative / placeholder links.
- **Mobile breakpoints** — no mobile frame; sidebar-as-drawer, right-rail
  placement, card density are design decisions to be made.
