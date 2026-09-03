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
 * (node 3390:26567); and on the Industries hero it is solid ink with near-white
 * text (node 2894:14356).
 *
 * `ink` names the chip rather than its ground — it is a second variant that
 * also sits on light, so the `onX` convention cannot separate the two.
 *
 * NOTE: the homepage artboard sets this text at Regular weight, while
 * `typography.eyebrow` is SemiBold — taken from the token board's own sample.
 * The Industries hero (node 2894:14357) is SemiBold, agreeing with the token,
 * so the token stays. Logged in BUILD_LOG.
 */
export type EyebrowTone = 'onLight' | 'onAccent' | 'ink'

const toneClasses: Record<EyebrowTone, string> = {
  onLight: 'bg-chip-light text-on-light',
  onAccent: 'bg-accent-600 text-on-dark-muted',
  ink: 'bg-canvas text-paper',
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
