import { Bot } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { MockInterviewFeatureList } from './MockInterviewFeatureList'

export interface MockInterviewCalloutProps {
  onStart?: () => void
  className?: string
}

/** The lime "Maximize your interview success" block on the job detail page. */
export function MockInterviewCallout({
  onStart,
  className,
}: MockInterviewCalloutProps) {
  return (
    <div className={cn('rounded-2xl bg-cta p-6 text-ink', className)}>
      <div className="flex items-start gap-4">
        <Bot className="size-8 shrink-0" aria-hidden />
        <div>
          <h3 className="text-base font-bold">
            Maximize your interview success
          </h3>
          <p className="mt-1 text-sm text-neutral-700">
            Our platform simulates real interview scenarios, helping you refine
            your responses and boost your confidence.
          </p>
        </div>
      </div>

      <hr className="my-5 border-black/10" />

      <MockInterviewFeatureList layout="row" />

      <div className="mt-5 flex justify-end">
        <Button variant="dark" onClick={onStart}>
          Start Interview
        </Button>
      </div>
    </div>
  )
}
