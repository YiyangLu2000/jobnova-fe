import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface SpinnerProps {
  size?: number
  label?: string
  className?: string
}

export function Spinner({
  size = 20,
  label = 'Loading',
  className,
}: SpinnerProps) {
  return (
    <span role="status" className={cn('inline-flex text-brand-500', className)}>
      <LoaderCircle size={size} className="animate-spin" aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  )
}
