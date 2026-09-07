import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/cn'
import { MockInterviewButton } from './MockInterviewButton'
import { MockInterviewFeatureList } from './MockInterviewFeatureList'

export interface MockInterviewPromoPanelProps {
  /** Job context to carry into the mock-interview flow (detail view sets it). */
  contextJobId?: string
  onStart?: (jobId?: string) => void
  className?: string
}

export function MockInterviewPromoPanel({
  contextJobId,
  onStart,
  className,
}: MockInterviewPromoPanelProps) {
  return (
    <aside
      className={cn(
        'rounded-2xl border border-hairline bg-linear-to-b from-surface to-brand-50 p-6',
        className,
      )}
    >
      <Sparkles className="size-6 text-brand-500" aria-hidden />
      <h2 className="mt-3 text-base font-bold text-ink">
        Ace Your Interviews with AI-Powered Mock Sessions!
      </h2>
      <p className="mt-2 text-sm text-muted">
        Struggling with interview nerves or unsure how to prepare? Let our
        cutting-edge AI mock interviews help you shine!
      </p>

      <hr className="my-5 border-hairline" />

      <h3 className="text-sm font-bold text-ink">
        Why Choose Our AI Mock Interviews? ✨
      </h3>
      <div className="mt-3">
        <MockInterviewFeatureList />
      </div>

      <div className="mt-5">
        <MockInterviewButton
          variant="dark"
          fullWidth
          jobId={contextJobId}
          onClick={onStart}
        />
      </div>
    </aside>
  )
}
