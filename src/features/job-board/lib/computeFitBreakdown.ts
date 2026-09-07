import type {
  EducationLevel,
  FitBreakdown,
  FitDimension,
  FitInsight,
  FitStatus,
  JobDetail,
  ReferenceJob,
} from '@/features/job-board/types'
import { EDUCATION_ORDER } from '@/features/job-board/types'
import { renderInsight } from './fitInsightTemplates'
import {
  experienceCloseness,
  seniorityCloseness,
  skillOverlap,
  titleSimilarity,
} from './scoring'

const pct = (ratio: number): number =>
  Math.max(0, Math.min(100, Math.round(ratio * 100)))

const bandOf = (score: number): FitStatus => (score >= 70 ? 'good' : 'warning')

/** 1 when the candidate meets/exceeds the requirement; scaled down by the gap. */
function educationCloseness(
  candidate: EducationLevel,
  required: EducationLevel,
): number {
  const have = EDUCATION_ORDER.indexOf(candidate)
  const need = EDUCATION_ORDER.indexOf(required)
  if (have >= need) return 1
  return Math.max(0, 1 - (need - have) / EDUCATION_ORDER.length)
}

/**
 * Deterministic "why this job fits" breakdown: 4 dimension scores derived from
 * the same signals as the match score (plus an education-level check), and 3
 * short insight paragraphs picked from band-keyed templates.
 */
export function computeFitBreakdown(
  job: JobDetail,
  ref: ReferenceJob,
): FitBreakdown {
  const skills = pct(skillOverlap(job.skills, ref.skills).ratio)
  const experienceLevel = pct(seniorityCloseness(job.seniority, ref.seniority))
  const workExperience = pct(
    experienceCloseness(job.experienceYears, ref.experienceYears),
  )
  const education = pct(
    educationCloseness(ref.educationLevel, job.minEducation),
  )
  const titleFit = pct(titleSimilarity(job.title, ref.title))

  const dimensions: FitDimension[] = [
    { key: 'education', label: 'Education', score: education },
    { key: 'workExperience', label: 'Work Exp', score: workExperience },
    { key: 'skills', label: 'Skills', score: skills },
    { key: 'experienceLevel', label: 'Exp. Level', score: experienceLevel },
  ]

  const vars = {
    jobTitle: job.title,
    refTitle: ref.title,
    years: ref.experienceYears,
  }

  const relevance = bandOf(Math.round(skills * 0.7 + titleFit * 0.3))
  const seniority = bandOf(
    Math.round(experienceLevel * 0.6 + workExperience * 0.4),
  )
  const educationBand = bandOf(education)

  const insights: FitInsight[] = [
    {
      key: 'relevantExperience',
      title: 'Relevant Experience',
      status: relevance,
      body: renderInsight('relevantExperience', relevance, vars),
    },
    {
      key: 'seniority',
      title: 'Seniority',
      status: seniority,
      body: renderInsight('seniority', seniority, vars),
    },
    {
      key: 'education',
      title: 'Education',
      status: educationBand,
      body: renderInsight('education', educationBand, vars),
    },
  ]

  return { dimensions, insights }
}
