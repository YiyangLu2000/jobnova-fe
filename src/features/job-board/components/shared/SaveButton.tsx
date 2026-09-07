import type { MouseEvent } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface SaveButtonProps {
  saved: boolean
  onToggle: () => void
  size?: 'sm' | 'md'
  /** Accessible label; defaults to a save/unsave verb pair. */
  label?: string
}

export function SaveButton({
  saved,
  onToggle,
  size = 'md',
  label,
}: SaveButtonProps) {
  const px = size === 'md' ? 20 : 16
  const ariaLabel = label ?? (saved ? 'Remove from saved jobs' : 'Save job')

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    onToggle()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <Heart
        size={px}
        className={cn(
          'transition-colors motion-reduce:transition-none',
          saved && 'fill-brand-500 text-brand-500',
        )}
        aria-hidden
      />
    </button>
  )
}
