import type { ReactNode } from 'react'
import { motion as fm, useReducedMotion } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'

/**
 * Reveal — fade and rise on first scroll into view.
 *
 * ⚠ Like ParallaxSection, the timings here are authored rather than extracted:
 * Figma documents no motion tokens. Values live in `tokens.motion` so a single
 * edit re-times the whole site once design signs off.
 *
 * `index` staggers siblings without a parent orchestrator, which keeps each
 * item's trigger tied to its own position rather than the group's.
 */
export type RevealProps = {
  children: ReactNode
  /** Position in a group; multiplies the stagger delay. */
  index?: number
  className?: string
}

export function Reveal({ children, index = 0, className }: RevealProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) return <div className={className}>{children}</div>

  return (
    <fm.div
      className={className}
      initial={{ opacity: 0, y: motionTokens.reveal.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={motionTokens.viewport}
      transition={{
        duration: motionTokens.duration.base,
        ease: motionTokens.easing.out,
        delay: index * motionTokens.reveal.stagger,
      }}
    >
      {children}
    </fm.div>
  )
}

export default Reveal
