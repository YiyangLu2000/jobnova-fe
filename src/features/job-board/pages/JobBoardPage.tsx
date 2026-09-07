import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import type { JobTab } from '@/features/job-board/types'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { cn } from '@/lib/cn'
import { JobBoardToolbar } from '@/features/job-board/components/board/JobBoardToolbar'
import { JobList } from '@/features/job-board/components/board/JobList'
import { JobListSkeleton } from '@/features/job-board/components/board/JobListSkeleton'
import { useJobInteractions } from '@/features/job-board/hooks/useJobInteractions'
import { useJobs } from '@/features/job-board/hooks/useJobs'
import { useJobSort } from '@/features/job-board/hooks/useJobSort'
import { useJobTab } from '@/features/job-board/hooks/useJobTab'
import { useReferenceJob } from '@/features/job-board/hooks/useReferenceJob'
import { MockInterviewPromoPanel } from '@/features/mock-interview/components/MockInterviewPromoPanel'

const EMPTY_MESSAGE: Record<JobTab, string> = {
  matched: 'No matched jobs right now — try a different job reference.',
  liked: 'No saved jobs yet. Tap the heart on a job to save it here.',
  applied: 'No applications yet. Apply to a job to see it here.',
}

export function JobBoardPage() {
  const [tab] = useJobTab()
  const [sort, setSort] = useJobSort()
  const { referenceJobId, cycleReference } = useReferenceJob()
  const { jobs, referenceJob, isLoading, error, refetch } = useJobs({
    sort,
    referenceJobId,
  })
  const { savedIds, appliedIds, toggleSaved, markApplied } =
    useJobInteractions()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const visibleJobs = useMemo(() => {
    if (tab === 'liked') return jobs.filter((job) => savedIds.has(job.id))
    if (tab === 'applied') return jobs.filter((job) => appliedIds.has(job.id))
    return jobs
  }, [jobs, tab, savedIds, appliedIds])

  // First load shows a skeleton; a re-fetch (sort / reference change, retry)
  // keeps the current list on screen and just dims it.
  const firstLoad = isLoading && jobs.length === 0
  const refreshing = isLoading && jobs.length > 0
  const showError = error != null && jobs.length === 0

  function openJob(jobId: string) {
    const query = searchParams.toString()
    navigate(query ? `/jobs/${jobId}?${query}` : `/jobs/${jobId}`)
  }

  function startMockInterview() {
    navigate('/ai-mock-interview')
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4">
        {referenceJob && (
          <JobBoardToolbar
            referenceJob={referenceJob}
            onChangeReference={cycleReference}
            sort={sort}
            onSortChange={setSort}
          />
        )}

        {firstLoad && <JobListSkeleton />}

        {showError && (
          <div className="rounded-2xl border border-hairline bg-surface p-12 text-center">
            <p className="text-sm text-muted">
              Something went wrong loading jobs.
            </p>
            <Button variant="outline" className="mt-4" onClick={refetch}>
              Try again
            </Button>
          </div>
        )}

        {!firstLoad && !showError && (
          <div className="relative" aria-busy={refreshing}>
            {refreshing && (
              <div className="absolute right-0 -top-9 flex items-center">
                <Spinner size={16} label="Updating results" />
              </div>
            )}
            <div
              className={cn(
                refreshing &&
                  'pointer-events-none opacity-60 transition-opacity',
              )}
            >
              <JobList
                jobs={visibleJobs}
                savedIds={savedIds}
                appliedIds={appliedIds}
                onToggleSave={toggleSaved}
                onApply={markApplied}
                onOpenJob={openJob}
                onStartMockInterview={startMockInterview}
                emptyMessage={EMPTY_MESSAGE[tab]}
              />
            </div>
          </div>
        )}
      </div>

      <div className="hidden lg:block">
        <MockInterviewPromoPanel />
      </div>
    </div>
  )
}
