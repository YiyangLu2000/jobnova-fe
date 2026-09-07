import { useCallback } from 'react'
import { useSearchParams } from 'react-router'
import type { JobSort } from '@/features/job-board/types'

const SORTS: JobSort[] = ['top-matched', 'recent']
const DEFAULT_SORT: JobSort = 'top-matched'

function parseSort(value: string | null): JobSort {
  return SORTS.includes(value as JobSort) ? (value as JobSort) : DEFAULT_SORT
}

/** Active list sort, mirrored to the `?sort=` search param. */
export function useJobSort(): [JobSort, (sort: JobSort) => void] {
  const [params, setParams] = useSearchParams()
  const sort = parseSort(params.get('sort'))

  const setSort = useCallback(
    (next: JobSort) => {
      setParams(
        (prev) => {
          const updated = new URLSearchParams(prev)
          if (next === DEFAULT_SORT) updated.delete('sort')
          else updated.set('sort', next)
          return updated
        },
        { replace: true },
      )
    },
    [setParams],
  )

  return [sort, setSort]
}
