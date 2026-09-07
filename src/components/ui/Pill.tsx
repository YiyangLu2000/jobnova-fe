import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type PillTone = 'purple' | 'lime' | 'neutral' | 'outline'
export type PillSize = 'sm' | 'md'

export interface PillProps {
  tone?: PillTone
  size?: PillSize
  className?: string
  children: ReactNode
}

const TONES: Record<PillTone, string> = {
  purple: 'bg-brand-50 text-brand-700',
  lime: 'bg-cta text-cta-ink',
  neutral: 'bg-neutral-100 text-neutral-600',
  outline: 'border border-hairline bg-surface text-ink',
}

const SIZES: Record<PillSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

/** Rounded label chip — also covers count badges (tone="lime" size="sm"). */
export function Pill({
  tone = 'neutral',
  size = 'md',
  className,
  children,
}: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap',
        TONES[tone],
        SIZES[size],
        className,
      )}
    >
      {children}
    </span>
  )
}
