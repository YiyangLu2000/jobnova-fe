import type { LucideIcon } from 'lucide-react'
import {
  BadgeDollarSign,
  Briefcase,
  Clock,
  Target,
  TrendingUp,
} from 'lucide-react'
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
  /** `inline` = wrapped pill row (list); `grid` = icon + label grid (detail). */
  layout?: 'inline' | 'grid'
  className?: string
}

interface Attribute {
  key: string
  label: string
  icon: LucideIcon
}

function experienceLabel(years: number): string {
  return `${years}+ ${years === 1 ? 'year' : 'years'} exp`
}

function attributes(job: Job): Attribute[] {
  const list: Attribute[] = [
    {
      key: 'employment',
      label: EMPLOYMENT_TYPE_LABEL[job.employmentType],
      icon: Briefcase,
    },
  ]
  if (job.experienceYears != null) {
    list.push({
      key: 'experience',
      label: experienceLabel(job.experienceYears),
      icon: Clock,
    })
  }
  list.push({
    key: 'seniority',
    label: SENIORITY_LABEL[job.seniority],
    icon: TrendingUp,
  })
  const salary = formatSalary(job.salary)
  if (salary) {
    list.push({ key: 'salary', label: salary, icon: BadgeDollarSign })
  }
  return list
}

export function AttributeChipList({
  job,
  layout = 'inline',
  className,
}: AttributeChipListProps) {
  const attrs = attributes(job)
  const { matched, total } = job.matchScore.skills

  if (layout === 'grid') {
    return (
      <dl
        className={cn(
          'grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3',
          className,
        )}
      >
        <div className="flex items-center gap-2 text-muted">
          <Target className="size-4 shrink-0" aria-hidden />
          <dd className="text-ink">
            {matched} of {total} skills match
          </dd>
        </div>
        {attrs.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-center gap-2 text-muted">
            <Icon className="size-4 shrink-0" aria-hidden />
            <dd className="text-ink">{label}</dd>
          </div>
        ))}
      </dl>
    )
  }

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
      {formatSalary(job.salary) && (
        <AttributeChip label={formatSalary(job.salary)!} />
      )}
    </div>
  )
}
