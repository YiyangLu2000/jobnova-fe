import { Menu } from 'lucide-react'
import type { JobTab } from '@/features/job-board/types'
import { BrandLogo } from '@/components/BrandLogo'
import { TabNav } from './TabNav'

export interface AppHeaderProps {
  activeTab: JobTab
  counts: Record<JobTab, number>
  onTabChange: (tab: JobTab) => void
  /** Opens the mobile nav drawer (hidden lg and up). */
  onMenuClick: () => void
}

export function AppHeader({
  activeTab,
  counts,
  onTabChange,
  onMenuClick,
}: AppHeaderProps) {
  return (
    <header className="flex flex-col gap-3 border-b border-hairline bg-surface px-4 py-3 sm:flex-row sm:items-center sm:gap-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="rounded-full p-1.5 text-muted transition-colors hover:bg-neutral-100 hover:text-ink lg:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
          <BrandLogo variant="full" />
        </div>
      </div>
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
        <TabNav
          activeTab={activeTab}
          counts={counts}
          onTabChange={onTabChange}
        />
      </div>
    </header>
  )
}
