export interface MockInterviewFeatureListProps {
  items?: ReadonlyArray<{ title: string; body: string }>
}

const DEFAULT_ITEMS: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: 'Job-Specific Simulations',
    body: 'Practice with questions tailored to your target role, ensuring relevance and preparation.',
  },
  {
    title: 'Actionable Feedback',
    body: 'Get detailed analysis of your responses and practical, step-by-step improvement suggestions.',
  },
  {
    title: 'Boost Success Rates',
    body: 'Perfect your interview skills and increase your chances of landing the job you want.',
  },
]

export function MockInterviewFeatureList({
  items = DEFAULT_ITEMS,
}: MockInterviewFeatureListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.title} className="space-y-1">
          <p className="text-sm font-semibold text-ink">{item.title}</p>
          <p className="flex gap-2 text-sm text-muted">
            <span aria-hidden className="text-brand-400">
              •
            </span>
            <span>{item.body}</span>
          </p>
        </li>
      ))}
    </ul>
  )
}
