import { useState } from 'react'
import { cn } from '@/lib/cn'

export interface CompanyLogoProps {
  name: string
  logoUrl: string | null
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: 'size-5 text-[9px]',
  md: 'size-6 text-[10px]',
  lg: 'size-12 text-base',
} as const

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join('')
}

export function CompanyLogo({ name, logoUrl, size = 'md' }: CompanyLogoProps) {
  const [failed, setFailed] = useState(false)
  const showImage = logoUrl != null && !failed

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 font-semibold text-neutral-500',
        SIZES[size],
      )}
    >
      {showImage ? (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="size-full object-contain p-0.5"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
    </span>
  )
}
