export interface UpgradePlanCardProps {
  onUpgrade?: () => void
}

export function UpgradePlanCard({ onUpgrade }: UpgradePlanCardProps) {
  return (
    <div className="rounded-2xl bg-linear-to-br from-brand-400 to-brand-600 p-4 text-white">
      <p className="text-sm font-bold">Upgrade Your Plan</p>
      <p className="mt-1 text-xs text-white/80">Boost your success rate now!</p>
      <button
        type="button"
        onClick={onUpgrade}
        className="mt-3 w-full rounded-full bg-white px-3 py-2 text-xs font-semibold text-brand-700 transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-500"
      >
        Subscription
      </button>
    </div>
  )
}
