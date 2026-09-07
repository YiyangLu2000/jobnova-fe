/**
 * Domain types for the job-board feature.
 *
 * These are job-board-specific and intentionally live inside the feature;
 * `src/types/` is reserved for genuinely cross-feature types. String-literal
 * unions are used instead of enums (tsconfig `erasableSyntaxOnly`).
 */

export type EmploymentType =
  'full-time' | 'part-time' | 'contract' | 'internship' | 'temporary'

export type WorkArrangement = 'on-site' | 'remote' | 'hybrid'

export type Seniority =
  'intern' | 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'principal'

/** Ordered low → high; index distance feeds the match scorer. */
export const SENIORITY_ORDER = [
  'intern',
  'entry',
  'junior',
  'mid',
  'senior',
  'lead',
  'principal',
] as const satisfies readonly Seniority[]

/** Drives the match-ring color band. */
export type MatchBand = 'low' | 'medium' | 'high'

export interface Company {
  id: string
  name: string
  /** Local `/logos/*.svg` path, or null to fall back to initials. */
  logoUrl: string | null
}

export interface SalaryRange {
  min: number
  max: number
  currency: string
  period: 'year' | 'month' | 'hour'
}

export interface SkillMatch {
  matched: number
  total: number
  /** Populated for the detail view; the list only needs the counts. */
  matchedSkills?: string[]
  missingSkills?: string[]
}

export interface MatchScore {
  /** Integer 0–100. */
  score: number
  band: MatchBand
  skills: SkillMatch
}

export interface Job {
  id: string
  title: string
  company: Company
  location: string
  workArrangement: WorkArrangement
  employmentType: EmploymentType
  seniority: Seniority
  experienceYears: number | null
  salary: SalaryRange | null
  /** Required skills for the role — scorer input. */
  skills: string[]
  /** ISO 8601. */
  postedAt: string
  applicantCount: number
  description: string
  /** Attached by the api layer against the active reference job. */
  matchScore: MatchScore
}

/** The job a candidate's matches are scored against. */
export interface ReferenceJob {
  id: string
  title: string
  skills: string[]
  seniority: Seniority
  experienceYears: number | null
}

export type JobTab = 'matched' | 'liked' | 'applied'

export type JobSort = 'top-matched' | 'recent'
