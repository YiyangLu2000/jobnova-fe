import { useContext } from 'react'
import type { JobInteractionsValue } from '@/features/job-board/context/JobInteractionsProvider'
import { JobInteractionsContext } from '@/features/job-board/context/JobInteractionsProvider'

export function useJobInteractions(): JobInteractionsValue {
  const value = useContext(JobInteractionsContext)
  if (!value) {
    throw new Error(
      'useJobInteractions must be used within a JobInteractionsProvider',
    )
  }
  return value
}
