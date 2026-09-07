import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import type { ReferenceJob } from '@/features/job-board/types'
import { getReferenceJobs } from '@/features/job-board/api/jobs'

/** Search-param key for the active match reference (mirrors ?tab= / ?sort=). */
export const REFERENCE_PARAM = 'ref'

export interface UseReferenceJobResult {
  /**
   * The active reference job id from `?ref=`, or undefined when the param is
   * absent — in which case the api layer scores against the default fixture.
   */
  referenceJobId: string | undefined
  referenceJobs: ReferenceJob[]
  /** Advance to the next reference fixture, wrapping after the last. */
  cycleReference: () => void
  setReference: (id: string) => void
}

/**
 * The default reference is the first fixture; `?ref=` is omitted for it so a
 * fresh URL stays clean and a direct load without the param still resolves
 * cleanly (getJobs / getJob fall back to the first fixture).
 */
function withRefParam(
  prev: URLSearchParams,
  id: string | null,
  defaultId: string | undefined,
): URLSearchParams {
  const next = new URLSearchParams(prev)
  if (id == null || id === defaultId) next.delete(REFERENCE_PARAM)
  else next.set(REFERENCE_PARAM, id)
  return next
}

export function useReferenceJob(): UseReferenceJobResult {
  const [params, setParams] = useSearchParams()
  const [referenceJobs, setReferenceJobs] = useState<ReferenceJob[]>([])

  useEffect(() => {
    let active = true
    getReferenceJobs().then((list) => {
      if (active) setReferenceJobs(list)
    })
    return () => {
      active = false
    }
  }, [])

  const setReference = useCallback(
    (id: string) => {
      setParams((prev) => withRefParam(prev, id, referenceJobs[0]?.id), {
        replace: true,
      })
    },
    [setParams, referenceJobs],
  )

  const cycleReference = useCallback(() => {
    if (referenceJobs.length === 0) return
    setParams(
      (prev) => {
        const index = referenceJobs.findIndex(
          (ref) => ref.id === prev.get(REFERENCE_PARAM),
        )
        const nextId =
          referenceJobs[(Math.max(index, 0) + 1) % referenceJobs.length]!.id
        return withRefParam(prev, nextId, referenceJobs[0]?.id)
      },
      { replace: true },
    )
  }, [referenceJobs, setParams])

  return {
    referenceJobId: params.get(REFERENCE_PARAM) ?? undefined,
    referenceJobs,
    cycleReference,
    setReference,
  }
}
