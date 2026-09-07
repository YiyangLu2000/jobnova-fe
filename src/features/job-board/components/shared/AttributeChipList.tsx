import type { Job } from '@/features/job-board/types'
import {
  EMPLOYMENT_TYPE_LABEL,
  SENIORITY_LABEL,
} from '@/features/job-board/lib/labels'
import { formatSalary } from '@/features/job-board/lib/formatSalary'
import { cn } from '@/lib/cn'
import { AttributeChip } from './AttributeChip'
import { SkillMatchChip } from './SkillMatchChip'

export interface AttributeChipListProps {
  job: Job
  className?: string
}

function experienceLabel(years: number): string {
  return `${years}+ ${years === 1 ? 'year' : 'years'} exp`
}

export function AttributeChipList({ job, className }: AttributeChipListProps) {
  const { matched, total } = job.matchScore.skills
  const salary = formatSalary(job.salary)

  return (
    <div
      className={cn(
        // Mobile: single swipeable row. sm and up: wrap freely.
        '-mx-1 flex items-center gap-2 overflow-x-auto px-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden [&>*]:shrink-0',
        className,
      )}
    >
      <AttributeChip label={EMPLOYMENT_TYPE_LABEL[job.employmentType]} />
      <SkillMatchChip matched={matched} total={total} />
      {job.experienceYears != null && (
        <AttributeChip label={experienceLabel(job.experienceYears)} />
      )}
      <AttributeChip label={SENIORITY_LABEL[job.seniority]} />
      {salary && <AttributeChip label={salary} />}
    </div>
  )
}
