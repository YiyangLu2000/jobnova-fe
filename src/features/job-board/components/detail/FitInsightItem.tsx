import type { FitInsight } from '@/features/job-board/types'

export interface FitInsightItemProps {
  insight: FitInsight
}

export function FitInsightItem({ insight }: FitInsightItemProps) {
  const isGood = insight.status === 'good'
  return (
    <div className="space-y-1">
      <h4 className="flex items-center gap-1.5 text-sm font-semibold text-ink">
        {insight.title}
        <span aria-hidden>{isGood ? '✅' : '⚠️'}</span>
        <span className="sr-only">
          {isGood ? '(good match)' : '(needs attention)'}
        </span>
      </h4>
      <p className="flex gap-2 text-sm text-muted">
        <span aria-hidden className="text-brand-400">
          •
        </span>
        <span>{insight.body}</span>
      </p>
    </div>
  )
}
