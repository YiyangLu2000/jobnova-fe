import { useCallback, useEffect, useState } from 'react'
import type {
  FitBreakdown,
  JobDetail,
  ReferenceJob,
} from '@/features/job-board/types'
import { getJob, JobNotFoundError } from '@/features/job-board/api/jobs'

export interface UseJobResult {
  job: JobDetail | null
  referenceJob: ReferenceJob | null
  fitBreakdown: FitBreakdown | null
  isLoading: boolean
  error: Error | null
  notFound: boolean
  refetch: () => void
}

export function useJob(
  id: string,
  params: { referenceJobId?: string } = {},
): UseJobResult {
  const { referenceJobId } = params
  const [job, setJob] = useState<JobDetail | null>(null)
  const [referenceJob, setReferenceJob] = useState<ReferenceJob | null>(null)
  const [fitBreakdown, setFitBreakdown] = useState<FitBreakdown | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [nonce, setNonce] = useState(0)

  const refetch = useCallback(() => setNonce((value) => value + 1), [])

  useEffect(() => {
    let active = true

    /* oxlint-disable react/set-state-in-effect */
    setIsLoading(true)
    setError(null)
    setNotFound(false)
    /* oxlint-enable react/set-state-in-effect */

    getJob(id, { referenceJobId })
      .then((response) => {
        if (!active) return
        setJob(response.job)
        setReferenceJob(response.referenceJob)
        setFitBreakdown(response.fitBreakdown)
      })
      .catch((cause: unknown) => {
        if (!active) return
        if (cause instanceof JobNotFoundError) {
          setNotFound(true)
          setJob(null)
          setFitBreakdown(null)
          return
        }
        setError(
          cause instanceof Error ? cause : new Error('Failed to load job'),
        )
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [id, referenceJobId, nonce])

  return {
    job,
    referenceJob,
    fitBreakdown,
    isLoading,
    error,
    notFound,
    refetch,
  }
}
