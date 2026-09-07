const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'always' })

const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY

/**
 * Human relative time for an ISO 8601 timestamp, e.g. `2 hours ago`,
 * `3 days ago`. Future or unparseable inputs collapse to `just now`.
 */
export function formatRelativeTime(
  iso: string,
  now: Date = new Date(),
): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return 'just now'

  const seconds = Math.round((now.getTime() - then) / 1000)
  if (seconds < MINUTE) return 'just now'
  if (seconds < HOUR) return rtf.format(-Math.floor(seconds / MINUTE), 'minute')
  if (seconds < DAY) return rtf.format(-Math.floor(seconds / HOUR), 'hour')
  if (seconds < WEEK) return rtf.format(-Math.floor(seconds / DAY), 'day')
  if (seconds < MONTH) return rtf.format(-Math.floor(seconds / WEEK), 'week')
  if (seconds < YEAR) return rtf.format(-Math.floor(seconds / MONTH), 'month')
  return rtf.format(-Math.floor(seconds / YEAR), 'year')
}
