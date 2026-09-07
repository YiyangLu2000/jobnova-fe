import type { FitBreakdown } from '@/features/job-board/types'
import { cn } from '@/lib/cn'
import { FitInsightItem } from './FitInsightItem'
import { FitScoreGrid } from './FitScoreGrid'

export interface FitBreakdownPanelProps {
  fit: FitBreakdown
  className?: string
}

export function FitBreakdownPanel({ fit, className }: FitBreakdownPanelProps) {
  return (
    <aside
      className={cn(
        'space-y-4 rounded-2xl border border-hairline bg-surface p-5',
        className,
      )}
    >
      <h3 className="text-sm font-bold text-ink">
        Why is this job a good fit for me?
      </h3>
      <FitScoreGrid dimensions={fit.dimensions} />
      <div className="space-y-4">
        {fit.insights.map((insight) => (
          <FitInsightItem key={insight.key} insight={insight} />
        ))}
      </div>
    </aside>
  )
}
