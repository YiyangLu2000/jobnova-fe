import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { Button } from '@/components/ui/Button'

/** Placeholder — the full detail view is built in a later step. */
export function JobDetailPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-3xl">
      <Button variant="ghost" leftIcon={ArrowLeft} onClick={() => navigate(-1)}>
        Back
      </Button>
      <div className="mt-4 rounded-2xl border border-hairline bg-surface p-12 text-center text-sm text-muted">
        Job detail for <span className="font-medium text-ink">{jobId}</span> —
        coming in a later step.
      </div>
    </div>
  )
}
