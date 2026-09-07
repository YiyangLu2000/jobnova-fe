import type { MouseEvent } from 'react'
import { useState } from 'react'
import { Check, Link2 } from 'lucide-react'

export interface ShareButtonProps {
  jobId: string
  /** Override the default "copy job link to clipboard" behavior. */
  onShare?: (jobId: string) => void
  size?: 'sm' | 'md'
}

export function ShareButton({ jobId, onShare, size = 'md' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const px = size === 'md' ? 20 : 16

  async function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    if (onShare) {
      onShare(jobId)
      return
    }
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/jobs/${jobId}`,
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard unavailable (insecure context / denied) — no-op.
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? 'Job link copied' : 'Copy job link'}
      className="inline-flex items-center justify-center rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      {copied ? (
        <Check size={px} className="text-match-high" aria-hidden />
      ) : (
        <Link2 size={px} aria-hidden />
      )}
    </button>
  )
}
