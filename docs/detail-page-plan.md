# Job Detail Page — Component Breakdown & Build Plan

## Context

The job board **list view is built and shipped** (commits through `64c1fc0`).
`JobDetailPage` currently exists only as a placeholder at `/jobs/:jobId`
(`src/features/job-board/pages/JobDetailPage.tsx`). This plan replaces it with
the full detail view from the Figma (screenshots): a job header, a 6-cell meta
grid, description, a lime "Maximize your interview success" callout, titled
sections (Qualification, Required, Preferred, Responsibilities, Benefits), a
Company panel, and the right-rail **"Why is this job a good fit for me?"**
fit-breakdown panel with 4 mini match rings + 3 insight sections.

Reuse the **shared leaf primitives** (`MatchRing`, `CompanyLogo`, `JobMetaRow`,
`PostedTimePill`, `SaveButton`, `ShareButton`, `AttributeChip`/`Pill`, `Button`,
`Spinner`) wherever the detail view shows the same data. Do **not** reuse the
`JobCard` wrapper — its layout differs materially — reuse its parts via a new
`JobDetailHeader`.

### Confirmed decisions

- **Fit data** — `computeFitBreakdown(job, ref)` derives the 4 ring scores
  deterministically from the same signals as `computeMatchScore` (skill overlap,
  seniority distance, experience gap) plus a new **education-level** match. The 3
  insight paragraphs are generated from band-keyed templates with light
  interpolation (job title, years). Adds `educationLevel` to `ReferenceJob` and
  `minEducation` to the job-detail type.
- **Mobile fit panel** — full-width card between the description/callout and the
  Qualification section (mirrors its desktop rail position near the top).
- **Company social links** — generic lucide icons (`Globe` for Website,
  `ExternalLink` for X / LinkedIn) with visible/`aria` labels "X" and "LinkedIn".
  No new assets (lucide has no brand icons; `public/icons.svg` has only `x-icon`
  and isn't wired into `src/`).
- **Cleanup** — remove the now-unused speculative branches added by the list-view
  plan: `AttributeChipList` `layout='grid'` and `JobCard` `variant='detail'`. The
  detail page gets a dedicated `JobDetailHeader` + `JobMetaGrid` built from the
  shared leaf primitives.

### Stack constraints (unchanged)

- `verbatimModuleSyntax` → `import type`; `erasableSyntaxOnly` → no `enum` (use
  unions / `as const`); `noUnusedLocals`/`noUnusedParameters` on.
- Prettier: no semicolons, single quotes, trailing commas, printWidth 80.
- Import via `@/` aliases. oxlint: `only-export-components` warns unless the
  extra export is a `const` — keep template maps / constants in their own files
  or as bare `const` exports.
- Route `/jobs/:jobId` → `JobDetailPage` is already wired in `main.tsx` under the
  `AppShell` layout route (which provides `JobInteractionsProvider`). **No router
  change needed.**
- `@theme` tokens available: `brand-50..700`, `cta`/`cta-hover`/`cta-ink`,
  `accent`, `match-low/medium/high`, `canvas`/`surface`/`ink`/`muted`/`hairline`,
  `radius-card`/`radius-pill`.
- Per-step: `npm run build` + `npm run lint` green, commit (Conventional Commits
  - `Co-Authored-By` / `Claude-Session` trailers), push.

---

## Data model — `src/features/job-board/types/index.ts`

Add:

```ts
export type EducationLevel =
  "none" | "high-school" | "associate" | "bachelor" | "master" | "doctorate";

export const EDUCATION_ORDER = [
  "none",
  "high-school",
  "associate",
  "bachelor",
  "master",
  "doctorate",
] as const satisfies readonly EducationLevel[];

export interface BenefitItem {
  icon: string; // emoji
  label: string;
  text: string;
}

export interface CompanyProfile extends Company {
  foundedYear: number;
  headquarters: string;
  employeeRange: string; // "1001–5000 employees"
  websiteUrl: string;
  socials: { x?: string; linkedin?: string };
  about: string;
}

export interface JobDetail extends Job {
  company: CompanyProfile; // narrows Job.company (CompanyProfile extends Company)
  country: string;
  minEducation: EducationLevel;
  qualificationIntro: string;
  qualificationSkills: string[];
  requirements: { required: string[]; preferred: string[] };
  responsibilities: string[];
  benefitsIntro: string;
  benefits: BenefitItem[];
}

export type FitDimensionKey =
  "education" | "workExperience" | "skills" | "experienceLevel";
export interface FitDimension {
  key: FitDimensionKey;
  label: string;
  score: number; // 0–100
}
export type FitStatus = "good" | "warning";
export interface FitInsight {
  key: string;
  title: string;
  status: FitStatus;
  body: string;
}
export interface FitBreakdown {
  dimensions: FitDimension[];
  insights: FitInsight[];
}
```

Extend `ReferenceJob` with `educationLevel: EducationLevel`.

---

## Scoring — `src/features/job-board/lib/`

1. **Refactor** `computeMatchScore.ts`: extract its private closeness helpers
   into a new `lib/scoring.ts` — `skillOverlap(jobSkills, refSkills)`,
   `seniorityCloseness(a, b)`, `experienceCloseness(a, b)`,
   `titleSimilarity(a, b)` (all 0–1). `computeMatchScore` imports them; its
   numeric output must be unchanged (spot-check a couple of fixture scores
   before/after).
2. **New** `lib/computeFitBreakdown.ts` —
   `computeFitBreakdown(job: JobDetail, ref: ReferenceJob): FitBreakdown`:
   - `skills` = `round(skillOverlap(job.skills, ref.skills).ratio * 100)`
   - `experienceLevel` = `round(seniorityCloseness(job.seniority, ref.seniority) * 100)`
   - `workExperience` = `round(experienceCloseness(job.experienceYears, ref.experienceYears) * 100)`
   - `education` = `round(educationCloseness(ref.educationLevel, job.minEducation) * 100)`
     where closeness is `1` when the candidate meets/exceeds `minEducation`, else
     scaled down by the `EDUCATION_ORDER` index gap.
   - 3 insights: `relevantExperience` (skills + title signal), `seniority`
     (experienceLevel + workExperience), `education` (education dim).
     `status = score >= 70 ? 'good' : 'warning'`; `body` from
     `lib/fitInsightTemplates.ts` — a
     `Record<insightKey, Record<'good' | 'warning', string>>` with `{jobTitle}` /
     `{refTitle}` / `{years}` placeholders replaced at call time.
   - Reuse `scoreToBand` + `BAND_RING_CLASS` for the mini-ring colors.

---

## API — `src/features/job-board/api/`

`fixtures.ts` (additive — `rawJobs` / `referenceJobs` shapes for the list stay
compatible):

- `companyProfiles: Record<string /* company id */, Omit<CompanyProfile, keyof Company>>`
  — 4 entries (Google, Cursor, Backd Business Funding, Simons Foundation).
- `jobDetailExtras: Record<string /* job id */, Omit<JobDetail, keyof Job | 'company'>>`
  — one entry per fixture job: `country`, `minEducation`, `qualificationIntro`,
  `qualificationSkills`, `requirements`, `responsibilities`, `benefitsIntro`,
  `benefits`. Use a shared `DEFAULT_BENEFITS` constant reused across jobs; write
  3–5 bullets each for `requirements.required` / `.preferred` /
  `responsibilities`.
- Add `educationLevel` to each `referenceJobs` entry.

`jobs.ts`:

- `JobResponse` → `{ job: JobDetail; referenceJob: ReferenceJob; fitBreakdown: FitBreakdown }`.
- `getJob(id, { referenceJobId })`: look up raw job + `jobDetailExtras[id]`
  (throw `JobNotFoundError` if either missing) → build
  `company = { ...companies[x], ...companyProfiles[companyId] }` → attach
  `matchScore` via existing `scoreJob` → `fitBreakdown = computeFitBreakdown(...)`
  → return. `getJobs` / `getReferenceJobs` untouched.

---

## Hook — `src/features/job-board/hooks/useJob.ts`

Mirror `useJobs` (race-safe effect, StrictMode-tolerant, `oxlint-disable
react/set-state-in-effect` on the sync status reset):

```ts
export function useJob(
  id: string,
  params: { referenceJobId?: string },
): {
  job: JobDetail | null;
  referenceJob: ReferenceJob | null;
  fitBreakdown: FitBreakdown | null;
  isLoading: boolean;
  error: Error | null;
  notFound: boolean; // error instanceof JobNotFoundError
  refetch: () => void;
};
```

---

## Shared-component tweaks

- `components/shared/MatchRing.tsx` — guard the label:
  `{label && <span …>{label}</span>}` so `label=""` renders no label (needed by
  the fit tiles). No prop change.
- `mock-interview/components/MockInterviewFeatureList.tsx` — add
  `layout?: 'stack' | 'row'` (default `'stack'`). `'row'` →
  `grid gap-6 sm:grid-cols-3`, no bullet, title as a small heading. Used by the
  callout.
- **Cleanup**: `components/shared/AttributeChipList.tsx` — drop the `layout` prop,
  the `grid` branch, the `Attribute` interface, and now-unused imports (`Target`,
  `LucideIcon`, grid-only lucide icons). `components/shared/JobCard.tsx` — drop
  the `variant` prop and its `detail` branch (always the list card). No other
  files reference these.

---

## New components — `src/features/job-board/components/detail/`

`JobDetailPage` tree:

```
JobDetailPage                       pages/   (replaces placeholder)
├─ JobDetailActions                 detail/  back · "{n} applicants" pill · Share · Save · Apply Now
└─ grid  lg:grid-cols-[minmax(0,1fr)_320px]
   main column  (one white rounded surface, p-6 sm:p-8)
   ├─ JobDetailHeader               detail/  CompanyLogo(lg) · PostedTimePill · <h1> · company name · JobMetaRow · MatchRing(lg, right)
   ├─ JobMetaGrid                   detail/  6 icon+label cells: country, employment, arrangement, experience, salary, seniority
   ├─ JobDescription                detail/  <p> block
   ├─ MockInterviewCallout          mock-interview/  lime box: Bot · <h3> · blurb · MockInterviewFeatureList(row) · dark "Start Interview"
   ├─ FitBreakdownPanel  lg:hidden  detail/  mobile copy, after the callout
   ├─ <hr>
   ├─ JobSection "Qualification"    detail/  intro + SkillTagList
   ├─ JobSection "Required"         detail/  JobBulletList
   ├─ JobSection "Preferred"        detail/  JobBulletList
   ├─ <hr>
   ├─ JobSection "Responsibilities" detail/  JobBulletList
   ├─ <hr>
   ├─ JobSection "Benefits"         detail/  intro + BenefitList
   ├─ <hr>
   └─ CompanyPanel                  detail/  <h2>Company · CompanyLogo(lg) · name · meta row · social links · about
   right column  hidden lg:block
   └─ FitBreakdownPanel  lg:sticky lg:top-6
```

Leaf components + props:

- `JobSection` — `{ title: string; intro?: string; children: ReactNode }` →
  `<section>` with `<h2>` + optional intro `<p>` + body. Dividers placed by the
  page.
- `JobBulletList` — `{ items: string[] }` → `<ul class="list-disc …">`.
- `BenefitList` — `{ items: BenefitItem[] }` → `<ul>`; each `<li>`:
  `<span>{icon}</span> <strong>{label}:</strong> {text}`.
- `SkillTagList` — `{ skills: string[] }` → wrapped `<Pill tone="neutral" size="md">`
  per skill.
- `JobMetaGrid` — `{ job: JobDetail }`. `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`,
  hairline top + bottom. Cells: `MapPin`+`country`, `Briefcase`+`EMPLOYMENT_TYPE_LABEL`,
  `MonitorSmartphone`+`WORK_ARRANGEMENT_LABEL`, `BarChart3`+`{n}+ years exp`,
  `Wallet`+`formatSalary(job.salary)`, `TrendingUp`+`SENIORITY_LABEL`. (Omit a
  cell when its value is null.)
- `JobDetailHeader` — `{ job: JobDetail }`. Flex row: left `CompanyLogo size="lg"`;
  middle column `PostedTimePill` / `<h1 class="text-2xl font-bold">` / company
  name (muted) / `JobMetaRow`; right `MatchRing score={job.matchScore.score} band
size="lg"`. Stacks on mobile (ring drops below the title block).
- `JobDetailActions` —
  `{ job: JobDetail; saved: boolean; applied: boolean; onToggleSave: () => void; onApply: () => void; onBack: () => void }`.
  Ghost back `Button` (`ArrowLeft`, `aria-label="Back"`),
  `<Pill tone="purple">{job.applicantCount} applicants</Pill>`, `ShareButton`,
  `SaveButton`, `Button variant="dark" rightIcon={ArrowUpRight}` → "Apply Now" /
  "Applied" (`disabled` when applied). Wraps on mobile.
- `FitScoreTile` — `{ label: string; score: number }` →
  `<MatchRing size="sm" label="" showValue />` + `<span class="text-xs text-muted">{label}</span>`.
- `FitScoreGrid` — `{ dimensions: FitDimension[] }` → `grid grid-cols-2 gap-3`.
- `FitInsightItem` — `{ insight: FitInsight }` →
  `<h4>{title} {status === 'good' ? '✅' : '⚠️'}</h4>` + bulleted `<p>{body}</p>`.
- `FitBreakdownPanel` — `{ fit: FitBreakdown; className?: string }` → white
  `rounded-2xl border` `<aside>`: `<h3>Why is this job a good fit for me?</h3>` +
  `FitScoreGrid` + `FitInsightItem` list.
- `JobDescription` — `{ text: string }` → `<p class="text-sm leading-relaxed text-ink">`.
- `JobDetailSkeleton` — pulse blocks approximating header + meta grid + a few
  section lines (`motion-reduce:animate-none`).

`src/features/mock-interview/components/MockInterviewCallout.tsx` —
`{ onStart?: () => void; className?: string }`. Lime `bg-cta` rounded box: `Bot`
icon, `<h3>Maximize your interview success</h3>`, blurb, hairline,
`<MockInterviewFeatureList layout="row" />`, then a bottom-right
`<Button variant="dark" onClick={onStart}>Start Interview</Button>` (plain
`Button`, not `MockInterviewButton`, to avoid its `ScanSearch` icon).

---

## Page assembly — `src/features/job-board/pages/JobDetailPage.tsx`

- `const { jobId } = useParams()` → if absent, render `<NotFound />`.
- `const { referenceJobId } = useReferenceJob()`.
- `const { job, referenceJob, fitBreakdown, isLoading, error, notFound, refetch } = useJob(jobId, { referenceJobId })`.
- `const { savedIds, appliedIds, toggleSaved, markApplied } = useJobInteractions()`
  → `saved = savedIds.has(jobId)`, `applied = appliedIds.has(jobId)`.
- `onBack` = `window.history.length > 1 ? navigate(-1) : navigate('/')`
  (heuristic — direct deep links fall back to the list).
- `onStart` (callout) = `navigate('/ai-mock-interview')` (matches the list-view
  placeholder).
- States: `notFound` → inline "This job posting isn't available" + `<Link to="/">`;
  `isLoading && !job` → `<JobDetailSkeleton />`; `error && !job` → message + "Try
  again" (`refetch`); otherwise the full view.
- Outer `mx-auto max-w-6xl space-y-4`; `JobDetailActions` full-width on top; then
  the `grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]` with the main white surface
  and the sticky right-rail `FitBreakdownPanel` (`hidden lg:block`); the
  `lg:hidden` `FitBreakdownPanel` sits in the main column after the callout.

---

## Build order

1. `refactor(job-board): extract scoring helpers` — `lib/scoring.ts`;
   `computeMatchScore` delegates; verify identical scores.
2. `feat(job-board): extend types for job detail` — `EducationLevel` +
   `EDUCATION_ORDER`, `BenefitItem`, `CompanyProfile`, `JobDetail`, `FitBreakdown`
   & friends; `ReferenceJob.educationLevel`.
3. `feat(job-board): add job-detail fixtures` — `companyProfiles`,
   `jobDetailExtras`, `DEFAULT_BENEFITS`, reference `educationLevel`.
4. `feat(job-board): add fit-breakdown scorer` — `computeFitBreakdown` +
   `fitInsightTemplates`.
5. `feat(job-board): extend getJob with detail and fit` — `JobResponse`,
   `getJob` merge.
6. `feat(job-board): add useJob hook`.
7. `refactor(job-board): drop unused grid and detail variants` — trim
   `AttributeChipList`, `JobCard`.
8. `feat(ui): shared tweaks for detail` — `MatchRing` label guard,
   `MockInterviewFeatureList` row layout.
9. `feat(job-board): add detail section primitives` — `JobSection`,
   `JobBulletList`, `BenefitList`, `SkillTagList`, `JobMetaGrid`,
   `JobDescription`.
10. `feat(job-board): add JobDetailHeader and actions`.
11. `feat(mock-interview): add interview-prep callout` — `MockInterviewCallout`.
12. `feat(job-board): add CompanyPanel`.
13. `feat(job-board): add fit-breakdown panel` — `FitScoreTile`, `FitScoreGrid`,
    `FitInsightItem`, `FitBreakdownPanel`.
14. `feat(job-board): add JobDetailSkeleton`.
15. `feat(job-board): assemble JobDetailPage` — replace the placeholder; layout,
    states, wiring.
16. `feat(job-board): responsive detail view` — header stacking, meta-grid
    columns, callout `row`→stack, actions-bar wrap, mobile fit panel + desktop
    sticky rail.
17. `polish: detail a11y and states` — heading hierarchy (`h1` title, `h2`
    sections, `h3` fit panel), focus rings on new buttons, `aria-label` on the
    icon-only back button, reduced-motion on the skeleton, not-found / error
    copy.

---

## Verification

- `npm run build` + `npm run lint` after every step.
- `npm run dev` → from `/`, click a job card → `/jobs/:id`:
  - Header (logo, posted pill, `h1` title, company, meta row, large match ring),
    6-cell meta grid, description, lime callout with a 3-column feature list +
    "Start Interview", Qualification chips, Required / Preferred /
    Responsibilities / Benefits bullets, Company panel with meta + Website / X /
    LinkedIn links + about text.
  - Right rail **"Why is this job a good fit for me?"**: 4 mini rings
    (Education / Work Exp / Skills / Exp. Level) + 3 insight blocks with ✅ / ⚠️.
  - On the list, hit **Change Job Reference**, then open a job → the match ring
    and all fit numbers reflect that reference. (Known limit: the reference isn't
    in the URL, so a direct / fresh load of `/jobs/:id` scores against the
    default reference.)
  - Save (heart) and Apply Now update and still show when navigating back to the
    list (Context lives in `AppShell`). Back returns to the list with `?tab` /
    `?sort` intact; a direct load of `/jobs/:id` → Back goes to `/`.
  - `/jobs/does-not-exist` → not-found state.
  - Narrow to ~375px: actions bar wraps, header stacks, meta grid is one column,
    callout stacks, the fit panel appears as a full-width card after the callout.
- oxlint stays clean — watch `only-export-components` (keep `fitInsightTemplates`
  and any constant maps in their own files or as bare `const` exports).

---

## Files

**New:** `lib/scoring.ts`, `lib/computeFitBreakdown.ts`,
`lib/fitInsightTemplates.ts`, `hooks/useJob.ts`,
`components/detail/{JobDetailActions,JobDetailHeader,JobMetaGrid,JobDescription,JobSection,JobBulletList,BenefitList,SkillTagList,FitScoreTile,FitScoreGrid,FitInsightItem,FitBreakdownPanel,JobDetailSkeleton,CompanyPanel}.tsx`,
`mock-interview/components/MockInterviewCallout.tsx`.

**Modified:** `types/index.ts`, `api/fixtures.ts`, `api/jobs.ts`,
`lib/computeMatchScore.ts`, `components/shared/{MatchRing,AttributeChipList,JobCard}.tsx`,
`mock-interview/components/MockInterviewFeatureList.tsx`,
`pages/JobDetailPage.tsx`.

**Unchanged:** `main.tsx` (route already present), `AppShell.tsx`.
