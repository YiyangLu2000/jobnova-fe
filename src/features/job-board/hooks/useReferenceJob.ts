import { useCallback, useEffect, useState } from 'react'
import type { ReferenceJob } from '@/features/job-board/types'
import { getReferenceJobs } from '@/features/job-board/api/jobs'

export interface UseReferenceJobResult {
  /** undefined until the reference list has loaded. */
  referenceJobId: string | undefined
  referenceJobs: ReferenceJob[]
  /** Advance to the next reference fixture, wrapping after the last. */
  cycleReference: () => void
  setReference: (id: string) => void
}

export function useReferenceJob(): UseReferenceJobResult {
  const [referenceJobs, setReferenceJobs] = useState<ReferenceJob[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let active = true
    getReferenceJobs().then((list) => {
      if (active) setReferenceJobs(list)
    })
    return () => {
      active = false
    }
  }, [])

  const cycleReference = useCallback(() => {
    setIndex((prev) =>
      referenceJobs.length === 0 ? 0 : (prev + 1) % referenceJobs.length,
    )
  }, [referenceJobs.length])

  const setReference = useCallback(
    (id: string) => {
      const next = referenceJobs.findIndex((ref) => ref.id === id)
      if (next >= 0) setIndex(next)
    },
    [referenceJobs],
  )

  return {
    referenceJobId: referenceJobs[index]?.id,
    referenceJobs,
    cycleReference,
    setReference,
  }
}
