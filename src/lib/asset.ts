/**
 * Resolve a path to a file in `public/` against the deploy base URL, so static
 * assets referenced from code (not through Vite's asset pipeline) work when the
 * app is served from a sub-path — e.g. `/jobnova-fe/` on GitHub Pages.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
