import type { LucideIcon } from 'lucide-react'
import {
  BadgeDollarSign,
  Briefcase,
  Clock,
  MapPin,
  Rss,
  TrendingUp,
} from 'lucide-react'
import type { JobDetail } from '@/features/job-board/types'
import {
  EMPLOYMENT_TYPE_LABEL,
  SENIORITY_LABEL,
  WORK_ARRANGEMENT_LABEL,
} from '@/features/job-board/lib/labels'
import { formatSalary } from '@/features/job-board/lib/formatSalary'

export interface JobMetaGridProps {
  job: JobDetail
}

export function JobMetaGrid({ job }: JobMetaGridProps) {
  const cells: { icon: LucideIcon; label: string }[] = [
    { icon: MapPin, label: job.country },
    { icon: Briefcase, label: EMPLOYMENT_TYPE_LABEL[job.employmentType] },
    { icon: Rss, label: WORK_ARRANGEMENT_LABEL[job.workArrangement] },
  ]
  if (job.experienceYears != null) {
    const years = job.experienceYears
    cells.push({
      icon: Clock,
      label: `${years}+ ${years === 1 ? 'year' : 'years'} exp`,
    })
  }
  const salary = formatSalary(job.salary)
  if (salary) cells.push({ icon: BadgeDollarSign, label: salary })
  cells.push({ icon: TrendingUp, label: SENIORITY_LABEL[job.seniority] })

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-3 border-y border-hairline py-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
      {cells.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-muted">
          <Icon className="size-4 shrink-0" aria-hidden />
          <span className="text-ink">{label}</span>
        </div>
      ))}
    </div>
  )
}
