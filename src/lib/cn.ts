type ClassValue = string | number | false | null | undefined

/**
 * Join truthy class names with a single space. Intentionally minimal — no
 * Tailwind conflict resolution; order your classes so the last wins.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
