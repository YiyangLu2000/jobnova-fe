import type { MatchBand } from '@/features/job-board/types'
import {
  BAND_RING_CLASS,
  scoreToBand,
} from '@/features/job-board/lib/matchBand'
import { cn } from '@/lib/cn'

export interface MatchRingProps {
  /** 0–100. */
  score: number
  /** Override the score-derived color band. */
  band?: MatchBand
  size?: 'sm' | 'md' | 'lg'
  label?: string
  showValue?: boolean
  className?: string
}

const SIZES = {
  sm: { box: 48, stroke: 5, value: 'text-xs', label: 'text-[8px]' },
  md: { box: 76, stroke: 7, value: 'text-lg', label: 'text-[10px]' },
  lg: { box: 96, stroke: 8, value: 'text-xl', label: 'text-xs' },
} as const

export function MatchRing({
  score,
  band,
  size = 'md',
  label = 'Match',
  showValue = true,
  className,
}: MatchRingProps) {
  const s = SIZES[size]
  const pct = Math.max(0, Math.min(100, score))
  const radius = (s.box - s.stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - pct / 100)
  const center = s.box / 2

  return (
    <div
      className={cn(
        'relative grid shrink-0 place-items-center',
        BAND_RING_CLASS[band ?? scoreToBand(score)],
        className,
      )}
      style={{ width: s.box, height: s.box }}
    >
      <svg
        width={s.box}
        height={s.box}
        viewBox={`0 0 ${s.box} ${s.box}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={s.stroke}
          className="stroke-neutral-200"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={s.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500 motion-reduce:transition-none"
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        {showValue && (
          <span className={cn('font-bold text-ink', s.value)}>
            {Math.round(pct)}%
          </span>
        )}
        <span className={cn('font-medium text-muted', s.label)}>{label}</span>
      </span>
    </div>
  )
}
