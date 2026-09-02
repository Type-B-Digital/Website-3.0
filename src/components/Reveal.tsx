import type { ReactNode } from 'react'
import { motion as fm, useReducedMotion } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'

/**
 * Reveal — fade and rise on first scroll into view.
 *
 * ⚠ Timings are authored; Figma documents no motion tokens.
 *
 * Three things make this read as easing rather than popping:
 *
 * - a long duration (`duration.reveal`) on a symmetric ease, so it accelerates
 *   and settles rather than snapping to a stop;
 * - `reveal.lag`, a flat delay before anything moves, which stops the animation
 *   feeling welded to the scroll position that triggered it;
 * - `reveal.feather`, a blur it resolves from, so the element arrives
 *   soft-edged and sharpens instead of just changing opacity.
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

  const { reveal, duration, easing, viewport } = motionTokens

  return (
    <fm.div
      className={className}
      initial={{
        opacity: 0,
        y: reveal.distance,
        filter: `blur(${reveal.feather}px)`,
      }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={viewport}
      transition={{
        duration: duration.reveal,
        ease: [...easing.inOut],
        delay: reveal.lag + index * reveal.stagger,
      }}
    >
      {children}
    </fm.div>
  )
}

export default Reveal
