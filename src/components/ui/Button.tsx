import type { LucideIcon } from 'lucide-react'
import type { ButtonHTMLAttributes, Ref } from 'react'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'outline' | 'lime' | 'dark' | 'ghost'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  fullWidth?: boolean
  ref?: Ref<HTMLButtonElement>
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'whitespace-nowrap transition-colors motion-reduce:transition-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ' +
  'focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600',
  outline: 'border border-hairline bg-surface text-ink hover:bg-neutral-50',
  lime: 'bg-cta text-cta-ink hover:bg-cta-hover',
  dark: 'bg-neutral-900 text-white hover:bg-neutral-800',
  ghost: 'text-muted hover:bg-neutral-100 hover:text-ink',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  fullWidth = false,
  type,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={cn(
        BASE,
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {LeftIcon && <LeftIcon className="size-4 shrink-0" aria-hidden />}
      {children}
      {RightIcon && <RightIcon className="size-4 shrink-0" aria-hidden />}
    </button>
  )
}
