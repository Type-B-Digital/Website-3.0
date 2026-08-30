import type { ReactNode } from 'react'
import { motion as fm, useReducedMotion } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'
import { cn } from '@/lib/cn'

/**
 * Marquee — continuous horizontal scroll.
 *
 * Used by the values band (Figma node 3390:26760, authored as 2445px of copy
 * inside a 1440px frame) and by the client logo strip.
 *
 * The content is rendered twice so the loop has no visible seam; the duplicate
 * is hidden from assistive tech. Because the track animates 0% -> -50%, the
 * second copy is exactly where the first started when the cycle repeats, which
 * is what makes items appear to enter from the right edge continuously.
 *
 * Speeds come from `tokens.motion.duration` and are authored, not from Figma.
 */
export type MarqueeSpeed = 'marquee' | 'marqueeSlow'

export type MarqueeProps = {
  children: ReactNode
  /** Which duration token to use. Higher duration = slower travel. */
  speed?: MarqueeSpeed
  /** Gap between items. Defaults to the values-band rhythm. */
  gapClassName?: string
  className?: string
}

export function Marquee({
  children,
  speed = 'marquee',
  gapClassName = 'gap-4xl',
  className,
}: MarqueeProps) {
  const prefersReduced = useReducedMotion()

  // Reduced motion drops the animation, NOT the layout — the row keeps its
  // flex/gap so items stay separated and simply scroll by hand.
  if (prefersReduced) {
    return (
      <div className={cn('w-full overflow-x-auto', className)}>
        <div className={cn('flex w-max items-center', gapClassName)}>{children}</div>
      </div>
    )
  }

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <fm.div
        className={cn('flex w-max items-center', gapClassName)}
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: motionTokens.duration[speed],
          ease: motionTokens.easing.linear,
          repeat: Infinity,
        }}
      >
        <div className={cn('flex shrink-0 items-center', gapClassName)}>{children}</div>
        <div aria-hidden className={cn('flex shrink-0 items-center', gapClassName)}>
          {children}
        </div>
      </fm.div>
    </div>
  )
}

export default Marquee
