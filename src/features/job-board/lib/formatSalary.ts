import type { SalaryRange } from '@/features/job-board/types'

const PERIOD_SUFFIX: Record<SalaryRange['period'], string> = {
  year: '/yr',
  month: '/mo',
  hour: '/hr',
}

/** Yearly figures are shown in thousands ($161K); shorter periods are literal. */
function amount(value: number, period: SalaryRange['period']): string {
  if (period === 'year') return `$${Math.round(value / 1000)}K`
  return `$${value.toLocaleString('en-US')}`
}

/**
 * Format a salary range like the Figma design: `$110K/yr - $150K/yr`,
 * `$45/hr - $55/hr`. Returns null when no salary is provided (the caller
 * omits the chip). Currency symbol is fixed to `$` — fixtures are USD only.
 */
export function formatSalary(salary: SalaryRange | null): string | null {
  if (!salary) return null
  const suffix = PERIOD_SUFFIX[salary.period]
  return `${amount(salary.min, salary.period)}${suffix} - ${amount(
    salary.max,
    salary.period,
  )}${suffix}`
}
