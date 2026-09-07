export interface JobDescriptionProps {
  text: string
}

export function JobDescription({ text }: JobDescriptionProps) {
  return <p className="text-sm leading-relaxed text-ink">{text}</p>
}
