import type {
  EmploymentType,
  Seniority,
  WorkArrangement,
} from '@/features/job-board/types'

export const EMPLOYMENT_TYPE_LABEL = {
  'full-time': 'Full time',
  'part-time': 'Part time',
  contract: 'Contract',
  internship: 'Internship',
  temporary: 'Temporary',
} as const satisfies Record<EmploymentType, string>

export const WORK_ARRANGEMENT_LABEL = {
  'on-site': 'On-site',
  remote: 'Remote',
  hybrid: 'Hybrid',
} as const satisfies Record<WorkArrangement, string>

export const SENIORITY_LABEL = {
  intern: 'Intern',
  entry: 'Entry Level',
  junior: 'Junior',
  mid: 'Mid Level',
  senior: 'Senior',
  lead: 'Lead',
  principal: 'Principal',
} as const satisfies Record<Seniority, string>
