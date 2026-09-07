import type { MouseEvent } from 'react'
import type { Job } from '@/features/job-board/types'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { MockInterviewButton } from '@/features/mock-interview/components/MockInterviewButton'
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
        'flex flex-col gap-3 border-t border-hairline pt-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <PostedTimePill postedAt={job.postedAt} />
        <ApplicantCountText count={job.applicantCount} />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button
          variant="outline"
          disabled={applied}
          className="w-full sm:w-auto"
          onClick={stop(() => onApply(job.id))}
        >
          {applied ? 'Applied' : 'Apply'}
        </Button>
        <MockInterviewButton
          variant="lime"
          jobId={job.id}
          className="w-full sm:w-auto"
          onClick={() => onStartMockInterview(job.id)}
        />
      </div>
    </div>
  )
}
