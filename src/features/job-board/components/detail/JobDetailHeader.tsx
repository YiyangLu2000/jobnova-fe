import type { JobDetail } from '@/features/job-board/types'
import { CompanyLogo } from '@/features/job-board/components/shared/CompanyLogo'
import { JobMetaRow } from '@/features/job-board/components/shared/JobMetaRow'
import { MatchRing } from '@/features/job-board/components/shared/MatchRing'
import { PostedTimePill } from '@/features/job-board/components/shared/PostedTimePill'

export interface JobDetailHeaderProps {
  job: JobDetail
}

export function JobDetailHeader({ job }: JobDetailHeaderProps) {
  return (
    <div className="space-y-4 sm:flex sm:items-start sm:gap-5 sm:space-y-0">
      {/* Mobile: logo left, ring right. sm+: this wrapper dissolves so logo
          and the lg ring sit directly in the flex row around the text block. */}
      <div className="flex items-start justify-between gap-4 sm:contents">
        <CompanyLogo
          name={job.company.name}
          logoUrl={job.company.logoUrl}
          size="lg"
        />
        <MatchRing
          score={job.matchScore.score}
          band={job.matchScore.band}
          size="md"
          className="sm:hidden"
        />
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        <PostedTimePill postedAt={job.postedAt} />
        <h1 className="text-xl leading-tight font-bold text-ink sm:text-2xl">
          {job.title}
        </h1>
        <p className="text-sm text-muted">{job.company.name}</p>
        <JobMetaRow
          location={job.location}
          workArrangement={job.workArrangement}
        />
      </div>

      <MatchRing
        score={job.matchScore.score}
        band={job.matchScore.band}
        size="lg"
        className="max-sm:hidden shrink-0"
      />
    </div>
  )
}
