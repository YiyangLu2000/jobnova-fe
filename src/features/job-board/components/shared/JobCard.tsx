import type { HTMLAttributes } from 'react'
import type { Job } from '@/features/job-board/types'
import { cn } from '@/lib/cn'
import { JobCardFooter } from '@/features/job-board/components/board/JobCardFooter'
import { AttributeChipList } from './AttributeChipList'
import { CompanyIdentity } from './CompanyIdentity'
import { JobMetaRow } from './JobMetaRow'
import { MatchRing } from './MatchRing'
import { SaveButton } from './SaveButton'
import { ShareButton } from './ShareButton'

export interface JobCardProps {
  job: Job
  saved: boolean
  applied: boolean
  onToggleSave: (jobId: string) => void
  onApply: (jobId: string) => void
  /** Open the detail view. Only wired for `variant="list"`. */
  onOpen: (jobId: string) => void
  onStartMockInterview: (jobId: string) => void
  variant?: 'list' | 'detail'
  className?: string
}

export function JobCard({
  job,
  saved,
  applied,
  onToggleSave,
  onApply,
  onOpen,
  onStartMockInterview,
  variant = 'list',
  className,
}: JobCardProps) {
  const clickable = variant === 'list'

  const interactiveProps: HTMLAttributes<HTMLElement> = clickable
    ? {
        role: 'button',
        tabIndex: 0,
        onClick: () => onOpen(job.id),
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onOpen(job.id)
          }
        },
      }
    : {}

  return (
    <article
      {...interactiveProps}
      className={cn(
        'rounded-2xl border border-hairline bg-surface p-6',
        clickable &&
          'cursor-pointer transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
        className,
      )}
    >
      <div className="flex gap-4">
        <MatchRing
          score={job.matchScore.score}
          band={job.matchScore.band}
          size="md"
        />
        <div className="min-w-0 flex-1 space-y-1.5">
          <h3 className="text-lg leading-snug font-bold text-ink">
            {job.title}
          </h3>
          <CompanyIdentity company={job.company} />
          <JobMetaRow
            location={job.location}
            workArrangement={job.workArrangement}
          />
        </div>
        <div className="flex shrink-0 items-start gap-1">
          <ShareButton jobId={job.id} />
          <SaveButton saved={saved} onToggle={() => onToggleSave(job.id)} />
        </div>
      </div>

      <AttributeChipList job={job} className="mt-4" />

      {clickable && (
        <JobCardFooter
          job={job}
          applied={applied}
          onApply={onApply}
          onStartMockInterview={onStartMockInterview}
          className="mt-4"
        />
      )}
    </article>
  )
}
