import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import Typography from './Typography'

/**
 * Eyebrow — the small chip that labels each section.
 *
 * Figma: "label-eyebrow" — node 3383:25390
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3383-25390
 *
 * On light bands the chip is `#F7DDC1` (amber.100) with ink text (nodes
 * 3390:26431 / 3390:26437); on the accent band it is `#13505D` with cream text
 * (node 3390:26567).
 *
 * NOTE: the artboard sets this text at Regular weight, while `typography.eyebrow`
 * is SemiBold — taken from the token board's own sample, which disagrees with
 * every in-page instance. Left as the token; logged in BUILD_LOG.
 */
export type EyebrowTone = 'onLight' | 'onAccent'

const toneClasses: Record<EyebrowTone, string> = {
  onLight: 'bg-chip-light text-on-light',
  onAccent: 'bg-accent-600 text-on-dark-muted',
}

export function Eyebrow({
  children,
  tone = 'onLight',
  className,
}: {
  children: ReactNode
  tone?: EyebrowTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-sm px-sm py-xs',
        toneClasses[tone],
        className,
      )}
    >
      <Typography variant="eyebrow" muted>
        {children}
      </Typography>
    </span>
  )
}

export default Eyebrow
