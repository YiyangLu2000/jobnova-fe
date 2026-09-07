import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router'
import { cn } from '@/lib/cn'

export interface SidebarNavItemProps {
  to: string
  icon: LucideIcon
  label: string
  badge?: number
  /** Called after the link is activated — used to close the mobile drawer. */
  onSelect?: () => void
}

export function SidebarNavItem({
  to,
  icon: Icon,
  label,
  badge,
  onSelect,
}: SidebarNavItemProps) {
  return (
    <NavLink
      to={to}
      end
      onClick={onSelect}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
          isActive
            ? 'bg-brand-500 text-white'
            : 'text-ink hover:bg-neutral-100',
        )
      }
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      <span className="flex-1">{label}</span>
      {badge != null && (
        <span className="rounded-full bg-cta px-1.5 text-xs font-semibold text-cta-ink">
          {badge}
        </span>
      )}
    </NavLink>
  )
}
