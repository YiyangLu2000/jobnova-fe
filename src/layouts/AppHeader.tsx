import type { JobTab } from '@/features/job-board/types'
import { BrandLogo } from '@/components/BrandLogo'
import { TabNav } from './TabNav'

export interface AppHeaderProps {
  activeTab: JobTab
  counts: Record<JobTab, number>
  onTabChange: (tab: JobTab) => void
}

export function AppHeader({ activeTab, counts, onTabChange }: AppHeaderProps) {
  return (
    <header className="flex items-center gap-4 border-b border-hairline bg-surface px-4 py-3 sm:gap-8 sm:px-6">
      <BrandLogo variant="full" />
      <div className="hidden sm:block">
        <TabNav
          activeTab={activeTab}
          counts={counts}
          onTabChange={onTabChange}
        />
      </div>
    </header>
  )
}
