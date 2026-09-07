import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { JobDetail } from '@/features/job-board/types'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { SaveButton } from '@/features/job-board/components/shared/SaveButton'
import { ShareButton } from '@/features/job-board/components/shared/ShareButton'

export interface JobDetailActionsProps {
  job: JobDetail
  saved: boolean
  applied: boolean
  onToggleSave: () => void
  onApply: () => void
  onBack: () => void
}

export function JobDetailActions({
  job,
  saved,
  applied,
  onToggleSave,
  onApply,
  onBack,
}: JobDetailActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        leftIcon={ArrowLeft}
        onClick={onBack}
        aria-label="Back to jobs"
      />
      <Pill tone="purple">{job.applicantCount} applicants</Pill>
      <div className="ml-auto flex items-center gap-2">
        <ShareButton jobId={job.id} />
        <SaveButton saved={saved} onToggle={onToggleSave} />
        <Button
          variant="dark"
          rightIcon={applied ? undefined : ArrowUpRight}
          disabled={applied}
          onClick={onApply}
        >
          {applied ? 'Applied' : 'Apply Now'}
        </Button>
      </div>
    </div>
  )
}
