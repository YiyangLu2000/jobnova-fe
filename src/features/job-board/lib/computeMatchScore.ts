import type {
  MatchScore,
  ReferenceJob,
  Seniority,
} from '@/features/job-board/types'
import { SENIORITY_ORDER } from '@/features/job-board/types'
import { scoreToBand } from './matchBand'

/** Minimum shape the scorer needs — satisfied by both `RawJob` and `Job`. */
export interface Scoreable {
  title: string
  skills: string[]
  seniority: Seniority
  experienceYears: number | null
}

const WEIGHTS = {
  skills: 0.6,
  seniority: 0.2,
  experience: 0.15,
  title: 0.05,
} as const

/** Years of experience gap at which the experience component reaches zero. */
const EXPERIENCE_ZERO_AT = 6

const normalize = (value: string): string => value.trim().toLowerCase()

const tokenize = (value: string): Set<string> =>
  new Set(
    value
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean),
  )

/** How many of the job's required skills the reference job also lists. */
function skillOverlap(
  jobSkills: string[],
  refSkills: string[],
): { matched: number; total: number } {
  const reference = new Set(refSkills.map(normalize))
  const matched = jobSkills.filter((skill) =>
    reference.has(normalize(skill)),
  ).length
  return { matched, total: jobSkills.length }
}

function seniorityComponent(job: Seniority, ref: Seniority): number {
  const span = SENIORITY_ORDER.length - 1
  const distance = Math.abs(
    SENIORITY_ORDER.indexOf(job) - SENIORITY_ORDER.indexOf(ref),
  )
  return 1 - distance / span
}

function experienceComponent(job: number | null, ref: number | null): number {
  if (ref == null) return 1
  const years = job ?? 0
  return Math.max(0, 1 - Math.abs(years - ref) / EXPERIENCE_ZERO_AT)
}

function titleComponent(jobTitle: string, refTitle: string): number {
  const a = tokenize(jobTitle)
  const b = tokenize(refTitle)
  if (a.size === 0 || b.size === 0) return 0
  let intersection = 0
  for (const token of a) {
    if (b.has(token)) intersection += 1
  }
  const union = a.size + b.size - intersection
  return union === 0 ? 0 : intersection / union
}

/**
 * Deterministic heuristic match score for a job against a reference job.
 * Weighted blend of skill overlap (dominant), seniority distance, experience
 * gap, and title similarity. Returns an integer 0–100 plus its band and the
 * skill-match counts used by the UI.
 */
export function computeMatchScore(
  job: Scoreable,
  ref: ReferenceJob,
): MatchScore {
  const skills = skillOverlap(job.skills, ref.skills)
  const skillsComponent = skills.total === 0 ? 1 : skills.matched / skills.total

  const raw =
    WEIGHTS.skills * skillsComponent +
    WEIGHTS.seniority * seniorityComponent(job.seniority, ref.seniority) +
    WEIGHTS.experience *
      experienceComponent(job.experienceYears, ref.experienceYears) +
    WEIGHTS.title * titleComponent(job.title, ref.title)

  const score = Math.max(0, Math.min(100, Math.round(raw * 100)))
  return { score, band: scoreToBand(score), skills }
}
