import type { MatchScore, ReferenceJob } from '@/features/job-board/types'
import { scoreToBand } from './matchBand'
import type { Scoreable } from './scoring'
import {
  experienceCloseness,
  seniorityCloseness,
  skillOverlap,
  titleSimilarity,
} from './scoring'

export type { Scoreable }

const WEIGHTS = {
  skills: 0.6,
  seniority: 0.2,
  experience: 0.15,
  title: 0.05,
} as const

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

  const raw =
    WEIGHTS.skills * skills.ratio +
    WEIGHTS.seniority * seniorityCloseness(job.seniority, ref.seniority) +
    WEIGHTS.experience *
      experienceCloseness(job.experienceYears, ref.experienceYears) +
    WEIGHTS.title * titleSimilarity(job.title, ref.title)

  const score = Math.max(0, Math.min(100, Math.round(raw * 100)))
  return {
    score,
    band: scoreToBand(score),
    skills: { matched: skills.matched, total: skills.total },
  }
}
