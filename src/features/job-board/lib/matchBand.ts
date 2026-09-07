import type { MatchBand } from '@/features/job-board/types'

/**
 * Map a 0–100 match score to a color band.
 * Cutoffs are provisional (see the plan's open questions): low < 65,
 * medium 65–79, high >= 80.
 */
export function scoreToBand(score: number): MatchBand {
  if (score >= 80) return 'high'
  if (score >= 65) return 'medium'
  return 'low'
}

/**
 * Tailwind text-color class per band, backed by the `--color-match-*` theme
 * tokens. MatchRing renders its arc with `stroke="currentColor"`, so a
 * `text-*` class drives the ring color.
 */
export const BAND_RING_CLASS: Record<MatchBand, string> = {
  low: 'text-match-low',
  medium: 'text-match-medium',
  high: 'text-match-high',
}
