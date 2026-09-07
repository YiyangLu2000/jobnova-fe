/**
 * Mock async data layer for the job-board feature.
 *
 * Shaped like a real endpoint (async, typed responses, artificial latency) so
 * a live API can be swapped in later. Match scores are attached here against
 * the active reference job; sorting is a server-side concern (a query param),
 * while tab filtering (matched / liked / applied) stays on the client.
 */

import type {
  FitBreakdown,
  Job,
  JobDetail,
  JobSort,
  ReferenceJob,
} from '@/features/job-board/types'
import { computeFitBreakdown } from '@/features/job-board/lib/computeFitBreakdown'
import { computeMatchScore } from '@/features/job-board/lib/computeMatchScore'
import { delay } from '@/lib/delay'
import { rawJobs, referenceJobs, type RawJob } from './fixtures'
import { companyProfiles, jobDetailExtras } from './jobDetailFixtures'

const LATENCY_MS = 320

export interface JobListParams {
  /** Defaults to `top-matched`. */
  sort?: JobSort
  /** Defaults to the first reference fixture. */
  referenceJobId?: string
}

export interface JobListResponse {
  jobs: Job[]
  referenceJob: ReferenceJob
  total: number
}

export interface JobResponse {
  job: JobDetail
  referenceJob: ReferenceJob
  fitBreakdown: FitBreakdown
}

/** Thrown by `getJob` when the id matches no fixture. */
export class JobNotFoundError extends Error {
  readonly jobId: string

  constructor(jobId: string) {
    super(`Job not found: ${jobId}`)
    this.name = 'JobNotFoundError'
    this.jobId = jobId
  }
}

const SORTERS: Record<JobSort, (a: Job, b: Job) => number> = {
  'top-matched': (a, b) => b.matchScore.score - a.matchScore.score,
  recent: (a, b) => Date.parse(b.postedAt) - Date.parse(a.postedAt),
}

function resolveReference(referenceJobId?: string): ReferenceJob {
  const found =
    referenceJobId != null
      ? referenceJobs.find((ref) => ref.id === referenceJobId)
      : undefined
  return found ?? referenceJobs[0]
}

/** Clone the fixture and attach a fresh match score. */
function scoreJob(raw: RawJob, ref: ReferenceJob): Job {
  return { ...structuredClone(raw), matchScore: computeMatchScore(raw, ref) }
}

export async function getJobs(
  params: JobListParams = {},
): Promise<JobListResponse> {
  await delay(LATENCY_MS)
  const referenceJob = resolveReference(params.referenceJobId)
  const sort = params.sort ?? 'top-matched'
  const jobs = rawJobs
    .map((raw) => scoreJob(raw, referenceJob))
    .sort(SORTERS[sort])
  return { jobs, referenceJob, total: jobs.length }
}

export async function getJob(
  id: string,
  params: { referenceJobId?: string } = {},
): Promise<JobResponse> {
  await delay(LATENCY_MS)
  const raw = rawJobs.find((job) => job.id === id)
  const extras = raw ? jobDetailExtras[id] : undefined
  const profile = raw ? companyProfiles[raw.company.id] : undefined
  if (!raw || !extras || !profile) throw new JobNotFoundError(id)

  const referenceJob = resolveReference(params.referenceJobId)
  const scored = scoreJob(raw, referenceJob)
  const job: JobDetail = {
    ...scored,
    ...structuredClone(extras),
    company: { ...scored.company, ...structuredClone(profile) },
  }

  return {
    job,
    referenceJob,
    fitBreakdown: computeFitBreakdown(job, referenceJob),
  }
}

export async function getReferenceJobs(): Promise<ReferenceJob[]> {
  await delay(LATENCY_MS)
  return referenceJobs.map((ref) => structuredClone(ref))
}
