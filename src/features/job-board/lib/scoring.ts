import type { Seniority } from '@/features/job-board/types'
import { SENIORITY_ORDER } from '@/features/job-board/types'

/** Minimum shape the scorers need — satisfied by RawJob, Job, and JobDetail. */
export interface Scoreable {
  title: string
  skills: string[]
  seniority: Seniority
  experienceYears: number | null
}

/** Years-of-experience gap at which the experience component reaches zero. */
export const EXPERIENCE_ZERO_AT = 6

const normalize = (value: string): string => value.trim().toLowerCase()

const tokenize = (value: string): Set<string> =>
  new Set(
    value
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean),
  )

/** How many of the job's skills the reference also lists, plus the ratio. */
export function skillOverlap(
  jobSkills: string[],
  refSkills: string[],
): { matched: number; total: number; ratio: number } {
  const reference = new Set(refSkills.map(normalize))
  const matched = jobSkills.filter((skill) =>
    reference.has(normalize(skill)),
  ).length
  const total = jobSkills.length
  return { matched, total, ratio: total === 0 ? 1 : matched / total }
}

/** 1 when the seniorities match, decreasing with distance on SENIORITY_ORDER. */
export function seniorityCloseness(a: Seniority, b: Seniority): number {
  const span = SENIORITY_ORDER.length - 1
  const distance = Math.abs(
    SENIORITY_ORDER.indexOf(a) - SENIORITY_ORDER.indexOf(b),
  )
  return 1 - distance / span
}

/** 1 when experience matches; 0 once the gap reaches EXPERIENCE_ZERO_AT years. */
export function experienceCloseness(
  job: number | null,
  ref: number | null,
): number {
  if (ref == null) return 1
  const years = job ?? 0
  return Math.max(0, 1 - Math.abs(years - ref) / EXPERIENCE_ZERO_AT)
}

/** Jaccard similarity of the two titles' word sets (0–1). */
export function titleSimilarity(a: string, b: string): number {
  const ta = tokenize(a)
  const tb = tokenize(b)
  if (ta.size === 0 || tb.size === 0) return 0
  let intersection = 0
  for (const token of ta) {
    if (tb.has(token)) intersection += 1
  }
  const union = ta.size + tb.size - intersection
  return union === 0 ? 0 : intersection / union
}
