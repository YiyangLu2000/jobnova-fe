import { cn } from '@/lib/cn'

export interface ApplicantCountTextProps {
  count: number
  className?: string
}

export function ApplicantCountText({
  count,
  className,
}: ApplicantCountTextProps) {
  return (
    <span className={cn('text-sm text-muted', className)}>
      {count.toLocaleString('en-US')} applicant{count === 1 ? '' : 's'}
    </span>
  )
}
