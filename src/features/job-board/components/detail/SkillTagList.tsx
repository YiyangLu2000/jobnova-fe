import { Pill } from '@/components/ui/Pill'

export interface SkillTagListProps {
  skills: string[]
}

export function SkillTagList({ skills }: SkillTagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Pill key={skill} tone="neutral" size="md">
          {skill}
        </Pill>
      ))}
    </div>
  )
}
