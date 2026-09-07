import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface JobSectionProps {
  title: string
  intro?: string
  className?: string
  children: ReactNode
}

/** A titled detail-page section: heading + optional intro line + body. */
export function JobSection({
  title,
  intro,
  className,
  children,
}: JobSectionProps) {
  return (
    <section className={cn('space-y-3', className)}>
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {intro && <p className="text-sm text-muted">{intro}</p>}
      {children}
    </section>
  )
}
