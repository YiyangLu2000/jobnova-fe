import { useState } from 'react'
import { Outlet } from 'react-router'
import type { JobTab } from '@/features/job-board/types'
import { AppHeader } from './AppHeader'
import { Sidebar } from './Sidebar'

// The active tab and tab counts are held in local state until the data hooks
// and JobInteractionsProvider are wired in (steps 15–16).
const PLACEHOLDER_COUNTS: Record<JobTab, number> = {
  matched: 0,
  liked: 0,
  applied: 0,
}

export function AppShell() {
  const [tab, setTab] = useState<JobTab>('matched')

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <AppHeader
        activeTab={tab}
        counts={PLACEHOLDER_COUNTS}
        onTabChange={setTab}
      />
      <div className="flex flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
