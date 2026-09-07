import type { MouseEvent } from 'react'
import type { Job } from '@/features/job-board/types'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { ApplicantCountText } from '@/features/job-board/components/shared/ApplicantCountText'
import { PostedTimePill } from '@/features/job-board/components/shared/PostedTimePill'

export interface JobCardFooterProps {
  job: Job
  applied: boolean
  onApply: (jobId: string) => void
  onStartMockInterview: (jobId: string) => void
  className?: string
}

/** List-only card footer: posted time + applicants, and the two CTAs. */
export function JobCardFooter({
  job,
  applied,
  onApply,
  onStartMockInterview,
  className,
}: JobCardFooterProps) {
  const stop = (fn: () => void) => (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    fn()
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <PostedTimePill postedAt={job.postedAt} />
        <ApplicantCountText count={job.applicantCount} />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          disabled={applied}
          onClick={stop(() => onApply(job.id))}
        >
          {applied ? 'Applied' : 'Apply'}
        </Button>
        <Button
          variant="lime"
          onClick={stop(() => onStartMockInterview(job.id))}
        >
          Mock Interview
        </Button>
      </div>
    </div>
  )
}
