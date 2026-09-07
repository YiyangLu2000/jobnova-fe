import { useCallback } from 'react'
import { useSearchParams } from 'react-router'
import type { JobTab } from '@/features/job-board/types'

const TABS: JobTab[] = ['matched', 'liked', 'applied']
const DEFAULT_TAB: JobTab = 'matched'

function parseTab(value: string | null): JobTab {
  return TABS.includes(value as JobTab) ? (value as JobTab) : DEFAULT_TAB
}

/** Active list tab, mirrored to the `?tab=` search param. */
export function useJobTab(): [JobTab, (tab: JobTab) => void] {
  const [params, setParams] = useSearchParams()
  const tab = parseTab(params.get('tab'))

  const setTab = useCallback(
    (next: JobTab) => {
      setParams(
        (prev) => {
          const updated = new URLSearchParams(prev)
          if (next === DEFAULT_TAB) updated.delete('tab')
          else updated.set('tab', next)
          return updated
        },
        { replace: true },
      )
    },
    [setParams],
  )

  return [tab, setTab]
}
