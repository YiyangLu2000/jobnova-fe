import type { JobSort, ReferenceJob } from '@/features/job-board/types'
import { ChangeReferenceButton } from './ChangeReferenceButton'
import { SortMenu } from './SortMenu'

export interface JobBoardToolbarProps {
  referenceJob: ReferenceJob
  /** Cycle to the next reference-job fixture (wraps at the end). */
  onChangeReference: () => void
  sort: JobSort
  onSortChange: (sort: JobSort) => void
}

const SORT_OPTIONS = [
  { id: 'top-matched', label: 'Top matched' },
  { id: 'recent', label: 'Most recent' },
] as const satisfies ReadonlyArray<{ id: JobSort; label: string }>

export function JobBoardToolbar({
  referenceJob,
  onChangeReference,
  sort,
  onSortChange,
}: JobBoardToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex-1">
        <ChangeReferenceButton
          referenceTitle={referenceJob.title}
          onClick={onChangeReference}
        />
      </div>
      <SortMenu value={sort} options={SORT_OPTIONS} onChange={onSortChange} />
    </div>
  )
}
