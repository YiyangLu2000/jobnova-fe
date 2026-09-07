import { useEffect, useRef, useState } from 'react'
import { ArrowUpDown, Check, ChevronDown } from 'lucide-react'
import type { JobSort } from '@/features/job-board/types'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export interface SortMenuProps {
  value: JobSort
  options: ReadonlyArray<{ id: JobSort; label: string }>
  onChange: (id: JobSort) => void
}

export function SortMenu({ value, options, onChange }: SortMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = options.find((option) => option.id === value) ?? options[0]

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <Button
        variant="outline"
        leftIcon={ArrowUpDown}
        rightIcon={ChevronDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {current.label}
      </Button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-10 mt-2 min-w-44 overflow-hidden rounded-xl border border-hairline bg-surface py-1 shadow-lg"
        >
          {options.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                role="option"
                aria-selected={option.id === value}
                className={cn(
                  'flex w-full items-center justify-between gap-4 px-3 py-2 text-left text-sm hover:bg-neutral-50',
                  option.id === value
                    ? 'font-medium text-brand-700'
                    : 'text-ink',
                )}
                onClick={() => {
                  onChange(option.id)
                  setOpen(false)
                }}
              >
                {option.label}
                {option.id === value && (
                  <Check className="size-4 shrink-0" aria-hidden />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
