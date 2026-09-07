import { Clock } from 'lucide-react'
import { Pill } from '@/components/ui/Pill'
import { formatRelativeTime } from '@/features/job-board/lib/formatRelativeTime'

export interface PostedTimePillProps {
  /** ISO 8601. */
  postedAt: string
}

export function PostedTimePill({ postedAt }: PostedTimePillProps) {
  return (
    <Pill tone="purple" size="sm">
      <Clock className="size-3.5 shrink-0" aria-hidden />
      {formatRelativeTime(postedAt)}
    </Pill>
  )
}
