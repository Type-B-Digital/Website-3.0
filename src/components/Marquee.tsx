import { motion as fm, useReducedMotion } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'
import { cn } from '@/lib/cn'

/**
 * Marquee — continuous horizontal scroll for the values band.
 *
 * Figma: the values line is 2445px wide inside a 1440px frame
 * (node 3390:26760), i.e. authored as overflowing content. A marquee is the
 * standard reading of that; the speed is authored (tokens.motion.duration.marquee).
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3390-26760
 *
 * The content is rendered twice so the loop has no visible seam; the duplicate
 * is hidden from assistive tech.
 */
export function Marquee({ children, className }: { children: React.ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion()

  // Reduced motion drops the animation, NOT the layout — the row keeps its
  // flex/gap so the items stay separated and simply scroll by hand.
  if (prefersReduced) {
    return (
      <div className={cn('w-full overflow-x-auto', className)}>
        <div className="flex w-max gap-4xl">{children}</div>
      </div>
    )
  }

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <fm.div
        className="flex w-max gap-4xl"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: motionTokens.duration.marquee,
          ease: motionTokens.easing.linear,
          repeat: Infinity,
        }}
      >
        <div className="flex shrink-0 gap-4xl">{children}</div>
        <div aria-hidden className="flex shrink-0 gap-4xl">
          {children}
        </div>
      </fm.div>
    </div>
  )
}

export default Marquee
