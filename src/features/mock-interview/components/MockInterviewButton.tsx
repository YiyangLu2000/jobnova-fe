import { ScanSearch } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface MockInterviewButtonProps {
  jobId?: string
  onClick?: (jobId?: string) => void
  variant?: 'lime' | 'dark'
  size?: 'sm' | 'md'
  fullWidth?: boolean
  className?: string
}

export function MockInterviewButton({
  jobId,
  onClick,
  variant = 'lime',
  size = 'md',
  fullWidth = false,
  className,
}: MockInterviewButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      leftIcon={variant === 'dark' ? ScanSearch : undefined}
      onClick={(event) => {
        event.stopPropagation()
        onClick?.(jobId)
      }}
    >
      Mock Interview
    </Button>
  )
}
