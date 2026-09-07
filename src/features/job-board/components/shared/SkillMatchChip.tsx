import { Pill } from '@/components/ui/Pill'

export interface SkillMatchChipProps {
  matched: number
  total: number
}

/** "N of M skills match" — purple when the majority of skills line up. */
export function SkillMatchChip({ matched, total }: SkillMatchChipProps) {
  const strong = total > 0 && matched / total >= 0.6
  return (
    <Pill tone={strong ? 'purple' : 'outline'} size="sm">
      {matched} of {total} skills match
    </Pill>
  )
}
