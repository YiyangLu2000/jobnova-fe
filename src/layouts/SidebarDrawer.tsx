import { useEffect } from 'react'
import { X } from 'lucide-react'
import { BrandLogo } from '@/components/BrandLogo'
import { cn } from '@/lib/cn'
import { SidebarNav } from './SidebarNav'

export interface SidebarDrawerProps {
  open: boolean
  onClose: () => void
}

/** Mobile / tablet nav — slides in from the left over a dimmed backdrop. */
export function SidebarDrawer({ open, onClose }: SidebarDrawerProps) {
  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      inert={!open}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close navigation"
        tabIndex={-1}
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-black/40 transition-opacity duration-200 motion-reduce:transition-none',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        className={cn(
          'absolute inset-y-0 left-0 flex w-72 max-w-[80%] flex-col bg-surface p-4 shadow-xl transition-transform duration-200 motion-reduce:transition-none',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <BrandLogo variant="full" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-full p-1.5 text-muted transition-colors hover:bg-neutral-100 hover:text-ink"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <SidebarNav onNavigate={onClose} />
        </div>
      </div>
    </div>
  )
}
