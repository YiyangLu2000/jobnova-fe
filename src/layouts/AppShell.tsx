import { Outlet } from 'react-router'
import { JobInteractionsProvider } from '@/features/job-board/context/JobInteractionsProvider'
import { useJobInteractions } from '@/features/job-board/hooks/useJobInteractions'
import { useJobTab } from '@/features/job-board/hooks/useJobTab'
import { AppHeader } from './AppHeader'
import { Sidebar } from './Sidebar'

function ShellHeader() {
  const [tab, setTab] = useJobTab()
  const { savedIds, appliedIds } = useJobInteractions()

  return (
    <AppHeader
      activeTab={tab}
      counts={{
        matched: 0,
        liked: savedIds.size,
        applied: appliedIds.size,
      }}
      onTabChange={setTab}
    />
  )
}

export function AppShell() {
  return (
    <JobInteractionsProvider>
      <div className="flex min-h-screen flex-col bg-canvas">
        <ShellHeader />
        <div className="flex flex-1">
          <Sidebar />
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </JobInteractionsProvider>
  )
}
