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

export interface SidebarNavProps {
  /** Forwarded to every nav item; closes the mobile drawer on navigation. */
  onNavigate?: () => void
}

/** Nav content shared by the persistent sidebar and the mobile drawer. */
export function SidebarNav({ onNavigate }: SidebarNavProps) {
  return (
    <div className="flex h-full flex-col gap-6">
      <nav className="flex flex-col gap-1">
        {PRIMARY_NAV.map((item) => (
          <SidebarNavItem key={item.to} {...item} onSelect={onNavigate} />
        ))}
      </nav>
      <hr className="border-hairline" />
      <nav className="flex flex-col gap-1">
        {ACCOUNT_NAV.map((item) => (
          <SidebarNavItem key={item.to} {...item} onSelect={onNavigate} />
        ))}
      </nav>
      <hr className="border-hairline" />
      <nav className="flex flex-col gap-1">
        {BILLING_NAV.map((item) => (
          <SidebarNavItem key={item.to} {...item} onSelect={onNavigate} />
        ))}
      </nav>
      <div className="mt-auto">
        <UpgradePlanCard />
      </div>
    </div>
  )
}
