import { Fragment } from 'react'
import type { JobTab } from '@/features/job-board/types'
import { cn } from '@/lib/cn'

export interface TabNavProps {
  activeTab: JobTab
  counts: Record<JobTab, number>
  onTabChange: (tab: JobTab) => void
}

const TABS: { id: JobTab; label: string }[] = [
  { id: 'matched', label: 'Matched' },
  { id: 'liked', label: 'Liked' },
  { id: 'applied', label: 'Applied' },
]

export function TabNav({ activeTab, counts, onTabChange }: TabNavProps) {
  return (
    <div className="flex items-center">
      {TABS.map((tab, index) => (
        <Fragment key={tab.id}>
          {index > 0 && (
            <span className="mx-2 h-4 w-px bg-hairline" aria-hidden />
          )}
          <button
            type="button"
            aria-current={activeTab === tab.id ? 'page' : undefined}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'border border-brand-300 text-brand-700'
                : 'border border-transparent text-muted hover:text-ink',
            )}
          >
            {tab.label}
            {tab.id !== 'matched' && (
              <span className="rounded-full bg-cta px-1.5 text-xs font-semibold text-cta-ink">
                {counts[tab.id]}
              </span>
            )}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
