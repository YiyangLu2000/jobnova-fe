import { Calendar, ExternalLink, Globe, MapPin, Users } from 'lucide-react'
import type { CompanyProfile } from '@/features/job-board/types'
import { CompanyLogo } from '@/features/job-board/components/shared/CompanyLogo'

export interface CompanyPanelProps {
  company: CompanyProfile
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1 text-xs font-medium text-muted transition-colors hover:bg-neutral-50 hover:text-ink focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
    >
      <ExternalLink className="size-3.5" aria-hidden />
      {label}
    </a>
  )
}

export function CompanyPanel({ company }: CompanyPanelProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-ink">Company</h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <CompanyLogo name={company.name} logoUrl={company.logoUrl} size="lg" />
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-base font-bold text-ink">{company.name}</p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4 shrink-0" aria-hidden />
              Founded in {company.foundedYear}
            </span>
            <span aria-hidden className="text-neutral-300">
              •
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0" aria-hidden />
              {company.headquarters}
            </span>
            <span aria-hidden className="text-neutral-300">
              •
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-4 shrink-0" aria-hidden />
              {company.employeeRange}
            </span>
            <span aria-hidden className="text-neutral-300">
              •
            </span>
            <a
              href={company.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-brand-600 hover:underline focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
            >
              <Globe className="size-4 shrink-0" aria-hidden />
              Website
            </a>
          </div>
          <div className="flex items-center gap-2 pt-1">
            {company.socials.x && (
              <SocialLink href={company.socials.x} label="X" />
            )}
            {company.socials.linkedin && (
              <SocialLink href={company.socials.linkedin} label="LinkedIn" />
            )}
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-ink">{company.about}</p>
    </section>
  )
}
