import type { Job } from '@/features/job-board/types'
import { JobCard } from '@/features/job-board/components/shared/JobCard'

export interface JobListProps {
  jobs: Job[]
  savedIds: ReadonlySet<string>
  appliedIds: ReadonlySet<string>
  onToggleSave: (jobId: string) => void
  onApply: (jobId: string) => void
  onOpenJob: (jobId: string) => void
  onStartMockInterview: (jobId: string) => void
  /** Shown when `jobs` is empty; varies by active tab. */
  emptyMessage?: string
}

export function JobList({
  jobs,
  savedIds,
  appliedIds,
  onToggleSave,
  onApply,
  onOpenJob,
  onStartMockInterview,
  emptyMessage = 'No jobs to show.',
}: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-hairline bg-surface p-12 text-center text-sm text-muted">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          saved={savedIds.has(job.id)}
          applied={appliedIds.has(job.id)}
          onToggleSave={onToggleSave}
          onApply={onApply}
          onOpen={onOpenJob}
          onStartMockInterview={onStartMockInterview}
        />
      ))}
    </div>
  )
}
