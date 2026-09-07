import type { LucideIcon } from 'lucide-react'
import { Pill } from '@/components/ui/Pill'

export interface AttributeChipProps {
  icon?: LucideIcon
  label: string
  tone?: 'neutral' | 'accent'
}

/** A single job attribute rendered as an outline pill (accent = purple fill). */
export function AttributeChip({
  icon: Icon,
  label,
  tone = 'neutral',
}: AttributeChipProps) {
  return (
    <Pill tone={tone === 'accent' ? 'purple' : 'outline'} size="sm">
      {Icon && <Icon className="size-3.5 shrink-0" aria-hidden />}
      {label}
    </Pill>
  )
}
