import { useCallback, useEffect, useState } from 'react'
import type { Job, JobSort, ReferenceJob } from '@/features/job-board/types'
import { getJobs } from '@/features/job-board/api/jobs'

export interface UseJobsParams {
  sort: JobSort
  referenceJobId?: string
}

export interface UseJobsResult {
  jobs: Job[]
  referenceJob: ReferenceJob | null
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

export function useJobs({
  sort,
  referenceJobId,
}: UseJobsParams): UseJobsResult {
  const [jobs, setJobs] = useState<Job[]>([])
  const [referenceJob, setReferenceJob] = useState<ReferenceJob | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [nonce, setNonce] = useState(0)

  const refetch = useCallback(() => setNonce((value) => value + 1), [])

  useEffect(() => {
    let active = true

    // Reflect the fetch lifecycle when params change. This is a genuine
    // "synchronize with an external system" effect, so the synchronous status
    // reset is intentional.
    /* oxlint-disable react/set-state-in-effect */
    setIsLoading(true)
    setError(null)
    /* oxlint-enable react/set-state-in-effect */

    getJobs({ sort, referenceJobId })
      .then((response) => {
        if (!active) return
        setJobs(response.jobs)
        setReferenceJob(response.referenceJob)
      })
      .catch((cause: unknown) => {
        if (!active) return
        setError(
          cause instanceof Error ? cause : new Error('Failed to load jobs'),
        )
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [sort, referenceJobId, nonce])

  return { jobs, referenceJob, isLoading, error, refetch }
}
