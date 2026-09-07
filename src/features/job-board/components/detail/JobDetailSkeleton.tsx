const BAR = 'animate-pulse rounded bg-neutral-200 motion-reduce:animate-none'

export function JobDetailSkeleton() {
  return (
    <div className="space-y-6" aria-hidden>
      <div className="flex gap-4">
        <div className={`size-12 shrink-0 rounded-md ${BAR}`} />
        <div className="flex-1 space-y-3 pt-1">
          <div className={`h-5 w-24 rounded-full ${BAR}`} />
          <div className={`h-6 w-2/3 ${BAR}`} />
          <div className={`h-4 w-1/3 ${BAR}`} />
          <div className={`h-4 w-1/2 ${BAR}`} />
        </div>
        <div className={`size-20 shrink-0 rounded-full ${BAR}`} />
      </div>

      <div className="grid grid-cols-2 gap-3 border-y border-hairline py-4 sm:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className={`h-4 w-28 ${BAR}`} />
        ))}
      </div>

      <div className="space-y-2">
        <div className={`h-4 w-full ${BAR}`} />
        <div className={`h-4 w-full ${BAR}`} />
        <div className={`h-4 w-4/5 ${BAR}`} />
      </div>

      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="space-y-2">
          <div className={`h-5 w-40 ${BAR}`} />
          <div className={`h-4 w-full ${BAR}`} />
          <div className={`h-4 w-11/12 ${BAR}`} />
        </div>
      ))}
    </div>
  )
}
