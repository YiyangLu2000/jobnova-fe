import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

export interface BrandLogoProps {
  /** `full` = wordmark, `mark` = bolt glyph only. */
  variant?: 'full' | 'mark'
  className?: string
}

const SRC: Record<'full' | 'mark', string> = {
  full: asset('logos/jobnova.svg'),
  mark: asset('favicon.svg'),
}

export function BrandLogo({ variant = 'full', className }: BrandLogoProps) {
  return (
    <img
      src={SRC[variant]}
      alt="JobNova"
      className={cn(variant === 'full' ? 'h-8 w-auto' : 'size-8', className)}
    />
  )
}
