import type { ReactNode } from 'react'
import { createContext, useCallback, useMemo, useState } from 'react'

export interface JobInteractionsValue {
  savedIds: ReadonlySet<string>
  appliedIds: ReadonlySet<string>
  isSaved: (id: string) => boolean
  isApplied: (id: string) => boolean
  toggleSaved: (id: string) => void
  markApplied: (id: string) => void
}

// eslint-disable-next-line react-refresh/only-export-components -- context + provider are paired here by design
export const JobInteractionsContext =
  createContext<JobInteractionsValue | null>(null)

/**
 * Holds the in-memory saved / applied job sets. Mounted in the layout route
 * (above the router Outlet) so the state survives list <-> detail navigation.
 * Not persisted.
 */
export function JobInteractionsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<ReadonlySet<string>>(() => new Set())
  const [appliedIds, setAppliedIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  )

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const markApplied = useCallback((id: string) => {
    setAppliedIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const value = useMemo<JobInteractionsValue>(
    () => ({
      savedIds,
      appliedIds,
      isSaved: (id) => savedIds.has(id),
      isApplied: (id) => appliedIds.has(id),
      toggleSaved,
      markApplied,
    }),
    [savedIds, appliedIds, toggleSaved, markApplied],
  )

  return (
    <JobInteractionsContext.Provider value={value}>
      {children}
    </JobInteractionsContext.Provider>
  )
}
