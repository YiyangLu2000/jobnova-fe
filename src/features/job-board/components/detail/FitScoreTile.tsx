import { MatchRing } from '@/features/job-board/components/shared/MatchRing'

export interface FitScoreTileProps {
  label: string
  score: number
}

export function FitScoreTile({ label, score }: FitScoreTileProps) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-hairline p-3 text-center">
      <MatchRing score={score} size="sm" label="" />
      <span className="text-xs font-medium text-muted">{label}</span>
    </div>
  )
}
