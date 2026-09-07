import {
  Bookmark,
  Briefcase,
  CirclePlus,
  FileText,
  MonitorPlay,
  Paperclip,
  Settings,
} from 'lucide-react'
import { SidebarNavItem } from './SidebarNavItem'
import { UpgradePlanCard } from './UpgradePlanCard'

const PRIMARY_NAV = [
  { to: '/', icon: Briefcase, label: 'Jobs' },
  { to: '/ai-mock-interview', icon: MonitorPlay, label: 'AI Mock Interview' },
  { to: '/resume', icon: FileText, label: 'Resume' },
] as const

const ACCOUNT_NAV = [
  { to: '/profile', icon: Paperclip, label: 'Profile' },
  { to: '/settings', icon: Settings, label: 'Setting' },
] as const

const BILLING_NAV = [
  { to: '/subscription', icon: Bookmark, label: 'Subscription' },
  { to: '/extra-credits', icon: CirclePlus, label: 'Extra Credits' },
] as const

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-6 border-r border-hairline bg-surface p-4 lg:flex">
      <nav className="flex flex-col gap-1">
        {PRIMARY_NAV.map((item) => (
          <SidebarNavItem key={item.to} {...item} />
        ))}
      </nav>
      <hr className="border-hairline" />
      <nav className="flex flex-col gap-1">
        {ACCOUNT_NAV.map((item) => (
          <SidebarNavItem key={item.to} {...item} />
        ))}
      </nav>
      <hr className="border-hairline" />
      <nav className="flex flex-col gap-1">
        {BILLING_NAV.map((item) => (
          <SidebarNavItem key={item.to} {...item} />
        ))}
      </nav>
      <div className="mt-auto">
        <UpgradePlanCard />
      </div>
    </aside>
  )
}
