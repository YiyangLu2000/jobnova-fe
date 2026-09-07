import { Link } from 'react-router'

export function NotFound() {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <p className="text-5xl font-bold text-brand-500">404</p>
      <p className="mt-2 text-sm text-muted">
        This page doesn&apos;t exist yet.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600"
      >
        Back to jobs
      </Link>
    </div>
  )
}
