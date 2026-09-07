import type { BenefitItem } from '@/features/job-board/types'

export interface BenefitListProps {
  items: BenefitItem[]
}

export function BenefitList({ items }: BenefitListProps) {
  return (
    <ul className="space-y-2 text-sm text-ink">
      {items.map((item) => (
        <li key={item.label} className="flex gap-2">
          <span aria-hidden className="shrink-0">
            {item.icon}
          </span>
          <span>
            <strong className="font-semibold">{item.label}:</strong> {item.text}
          </span>
        </li>
      ))}
    </ul>
  )
}
