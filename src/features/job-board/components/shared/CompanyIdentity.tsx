import type { Company } from '@/features/job-board/types'
import { cn } from '@/lib/cn'
import { CompanyLogo } from './CompanyLogo'

export interface CompanyIdentityProps {
  company: Company
  size?: 'sm' | 'md'
}

export function CompanyIdentity({
  company,
  size = 'md',
}: CompanyIdentityProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <CompanyLogo name={company.name} logoUrl={company.logoUrl} size={size} />
      <span
        className={cn(
          'font-medium text-muted',
          size === 'md' ? 'text-sm' : 'text-xs',
        )}
      >
        {company.name}
      </span>
    </span>
  )
}
