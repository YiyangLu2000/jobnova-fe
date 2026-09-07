import type { ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Button } from '@/components/ui/Button'
import { MockInterviewCallout } from '@/features/mock-interview/components/MockInterviewCallout'
import { BenefitList } from '@/features/job-board/components/detail/BenefitList'
import { CompanyPanel } from '@/features/job-board/components/detail/CompanyPanel'
import { FitBreakdownPanel } from '@/features/job-board/components/detail/FitBreakdownPanel'
import { JobBulletList } from '@/features/job-board/components/detail/JobBulletList'
import { JobDescription } from '@/features/job-board/components/detail/JobDescription'
import { JobDetailActions } from '@/features/job-board/components/detail/JobDetailActions'
import { JobDetailHeader } from '@/features/job-board/components/detail/JobDetailHeader'
import { JobDetailSkeleton } from '@/features/job-board/components/detail/JobDetailSkeleton'
import { JobMetaGrid } from '@/features/job-board/components/detail/JobMetaGrid'
import { JobSection } from '@/features/job-board/components/detail/JobSection'
import { SkillTagList } from '@/features/job-board/components/detail/SkillTagList'
import { useJob } from '@/features/job-board/hooks/useJob'
import { useJobInteractions } from '@/features/job-board/hooks/useJobInteractions'
import { useReferenceJob } from '@/features/job-board/hooks/useReferenceJob'

function DetailNotice({
  title,
  detail,
  action,
}: {
  title: string
  detail: string
  action: ReactNode
}) {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <p className="text-lg font-semibold text-ink">{title}</p>
      <p className="mt-2 text-sm text-muted">{detail}</p>
      <div className="mt-6">{action}</div>
    </div>
  )
}

export function JobDetailPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { referenceJobId } = useReferenceJob()
  const { job, fitBreakdown, isLoading, error, notFound, refetch } = useJob(
    jobId ?? '',
    { referenceJobId },
  )
  const { savedIds, appliedIds, toggleSaved, markApplied } =
    useJobInteractions()

  const id = jobId ?? ''
  const saved = savedIds.has(id)
  const applied = appliedIds.has(id)

  function handleBack() {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

  if (!jobId || notFound) {
    return (
      <DetailNotice
        title="This job posting isn't available"
        detail="It may have been filled or removed."
        action={
          <Link
            to="/"
            className="inline-block rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600"
          >
            Back to jobs
          </Link>
        }
      />
    )
  }

  if (error && !job) {
    return (
      <DetailNotice
        title="Something went wrong"
        detail="We couldn't load this job just now."
        action={
          <Button variant="outline" onClick={refetch}>
            Try again
          </Button>
        }
      />
    )
  }

  if (isLoading && !job) {
    return (
      <div className="mx-auto max-w-6xl">
        <p role="status" className="sr-only">
          Loading job
        </p>
        <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
          <JobDetailSkeleton />
        </div>
      </div>
    )
  }

  if (!job) return null

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <JobDetailActions
        job={job}
        saved={saved}
        applied={applied}
        onToggleSave={() => toggleSaved(job.id)}
        onApply={() => markApplied(job.id)}
        onBack={handleBack}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6 rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
          <JobDetailHeader job={job} />
          <JobMetaGrid job={job} />
          <JobDescription text={job.description} />
          <MockInterviewCallout
            onStart={() => navigate('/ai-mock-interview')}
          />

          {fitBreakdown && (
            <FitBreakdownPanel fit={fitBreakdown} className="lg:hidden" />
          )}

          <hr className="border-hairline" />
          <JobSection title="Qualification" intro={job.qualificationIntro}>
            <SkillTagList skills={job.qualificationSkills} />
          </JobSection>
          <JobSection title="Required">
            <JobBulletList items={job.requirements.required} />
          </JobSection>
          <JobSection title="Preferred">
            <JobBulletList items={job.requirements.preferred} />
          </JobSection>

          <hr className="border-hairline" />
          <JobSection title="Responsibilities">
            <JobBulletList items={job.responsibilities} />
          </JobSection>

          <hr className="border-hairline" />
          <JobSection title="Benefits" intro={job.benefitsIntro}>
            <BenefitList items={job.benefits} />
          </JobSection>

          <hr className="border-hairline" />
          <CompanyPanel company={job.company} />
        </div>

        {fitBreakdown && (
          <div className="hidden lg:block">
            <FitBreakdownPanel
              fit={fitBreakdown}
              className="lg:sticky lg:top-6"
            />
          </div>
        )}
      </div>
    </div>
  )
}
