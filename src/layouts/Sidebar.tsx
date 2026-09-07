import { SidebarNav } from './SidebarNav'

/** Persistent left rail — desktop (lg) and up. */
export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-hairline bg-surface p-4 lg:block">
      <SidebarNav />
    </aside>
  )
}
