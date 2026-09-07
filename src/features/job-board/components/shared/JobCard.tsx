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
  /** Open the detail view. */
  onOpen: (jobId: string) => void
  onStartMockInterview: (jobId: string) => void
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
  className,
}: JobCardProps) {
  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`View ${job.title} at ${job.company.name}`}
      onClick={() => onOpen(job.id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(job.id)
        }
      }}
      className={cn(
        'cursor-pointer rounded-2xl border border-hairline bg-surface p-4 transition-shadow motion-reduce:transition-none hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 sm:p-6',
        className,
      )}
    >
      <div className="flex gap-3 sm:gap-4">
        <MatchRing
          score={job.matchScore.score}
          band={job.matchScore.band}
          size="sm"
          className="sm:hidden"
        />
        <MatchRing
          score={job.matchScore.score}
          band={job.matchScore.band}
          size="md"
          className="max-sm:hidden"
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

      <JobCardFooter
        job={job}
        applied={applied}
        onApply={onApply}
        onStartMockInterview={onStartMockInterview}
        className="mt-4"
      />
    </article>
  )
}
