import type { FitStatus } from '@/features/job-board/types'

export interface FitTemplateVars {
  jobTitle: string
  refTitle: string
  years: number | null
}

type InsightKey = 'relevantExperience' | 'seniority' | 'education'

const TEMPLATES: Record<InsightKey, Record<FitStatus, string>> = {
  relevantExperience: {
    good:
      'Your background as a {refTitle} lines up well with the {jobTitle} ' +
      'role — the core skills this job asks for are ones you already work ' +
      'with regularly.',
    warning:
      'Your background as a {refTitle} only partly overlaps with what the ' +
      '{jobTitle} role asks for. Expect to ramp up on several of the listed ' +
      'skills.',
  },
  seniority: {
    good:
      'With around {years} years of experience you comfortably meet the ' +
      'seniority bar for this role.',
    warning:
      'The seniority this role targets is a step away from your {years} ' +
      'years of experience — it may stretch you, or under-use you.',
  },
  education: {
    good: 'Your education meets the formal requirement for this position.',
    warning:
      'Your degree may not line up with the fields this role calls out. ' +
      "It's worth checking whether the requirement is firm.",
  },
}

export function renderInsight(
  key: InsightKey,
  status: FitStatus,
  vars: FitTemplateVars,
): string {
  const years = vars.years == null ? 'several' : String(vars.years)
  return TEMPLATES[key][status]
    .replace('{jobTitle}', vars.jobTitle)
    .replace('{refTitle}', vars.refTitle)
    .replace('{years}', years)
}
