import { SidebarNav } from './SidebarNav'

/** Persistent left rail — desktop (lg) and up. */
export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-hairline bg-surface p-4 lg:sticky lg:top-0 lg:block lg:h-screen lg:self-start lg:overflow-y-auto">
      <SidebarNav />
    </aside>
  )
}
