import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface ChangeReferenceButtonProps {
  /** Current reference job title, shown as a subtle suffix. */
  referenceTitle?: string
  onClick: () => void
}

export function ChangeReferenceButton({
  referenceTitle,
  onClick,
}: ChangeReferenceButtonProps) {
  return (
    <Button variant="primary" fullWidth leftIcon={RotateCcw} onClick={onClick}>
      Change Job Reference
      {referenceTitle && (
        <span className="font-normal opacity-80">· {referenceTitle}</span>
      )}
    </Button>
  )
}
