export interface JobListSkeletonProps {
  count?: number
}

const BAR = 'animate-pulse rounded bg-neutral-200 motion-reduce:animate-none'

export function JobListSkeleton({ count = 4 }: JobListSkeletonProps) {
  return (
    <div className="space-y-4" aria-hidden>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-hairline bg-surface p-6"
        >
          <div className="flex gap-4">
            <div className={`size-[76px] shrink-0 rounded-full ${BAR}`} />
            <div className="flex-1 space-y-3 pt-1">
              <div className={`h-5 w-2/3 ${BAR}`} />
              <div className={`h-4 w-1/3 ${BAR}`} />
              <div className={`h-4 w-1/2 ${BAR}`} />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <div className={`h-6 w-20 rounded-full ${BAR}`} />
            <div className={`h-6 w-28 rounded-full ${BAR}`} />
            <div className={`h-6 w-24 rounded-full ${BAR}`} />
          </div>
        </div>
      ))}
    </div>
  )
}
