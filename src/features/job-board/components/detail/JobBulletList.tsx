export interface JobBulletListProps {
  items: string[]
}

export function JobBulletList({ items }: JobBulletListProps) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm text-ink marker:text-neutral-400">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
