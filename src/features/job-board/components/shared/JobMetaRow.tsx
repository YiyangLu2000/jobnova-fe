import { MapPin, Rss } from 'lucide-react'
import type { WorkArrangement } from '@/features/job-board/types'
import { WORK_ARRANGEMENT_LABEL } from '@/features/job-board/lib/labels'
import { cn } from '@/lib/cn'

export interface JobMetaRowProps {
  location: string
  workArrangement: WorkArrangement
  className?: string
}

/**
 * Location + work-arrangement line. The Figma uses one broadcast-style glyph
 * for every arrangement, so `Rss` stands in for on-site / remote / hybrid.
 */
export function JobMetaRow({
  location,
  workArrangement,
  className,
}: JobMetaRowProps) {
  return (
    <span
      className={cn(
        'inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted',
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <MapPin className="size-4 shrink-0" aria-hidden />
        {location}
      </span>
      <span aria-hidden className="text-neutral-300">
        •
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Rss className="size-4 shrink-0" aria-hidden />
        {WORK_ARRANGEMENT_LABEL[workArrangement]}
      </span>
    </span>
  )
}
