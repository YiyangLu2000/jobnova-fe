import type { FitDimension } from '@/features/job-board/types'
import { FitScoreTile } from './FitScoreTile'

export interface FitScoreGridProps {
  dimensions: FitDimension[]
}

export function FitScoreGrid({ dimensions }: FitScoreGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {dimensions.map((dimension) => (
        <FitScoreTile
          key={dimension.key}
          label={dimension.label}
          score={dimension.score}
        />
      ))}
    </div>
  )
}
