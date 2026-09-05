import type { ReactNode } from 'react'
import { motion as fm, useReducedMotion } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'

/**
 * The page-load entrance, in two parts.
 *
 * `Reveal` is for elements the visitor scrolls to; these two are for what is
 * already on screen when the page paints, which `whileInView` handles badly —
 * it fires immediately and at the same moment for everything above the fold,
 * so the header and the hero pop together.
 *
 * Both honour `prefers-reduced-motion` by rendering the final state directly.
 * Timings live in `tokens.motion.intro`.
 */

/**
 * NavIntro — the header settling in from above, feathered.
 *
 * Lives inside `SiteHeader`, so every page gets it without opting in.
 */
export function NavIntro({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div className={className}>{children}</div>

  const { intro, reveal, easing } = motionTokens
  return (
    <fm.div
      className={className}
      initial={{ opacity: 0, y: -intro.nav.distance, filter: `blur(${reveal.feather}px)` }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: intro.nav.duration,
        ease: [...easing.out],
        delay: intro.nav.lag,
      }}
    >
      {children}
    </fm.div>
  )
}

/**
 * HeroIntro — the hero fading up slowly, without moving.
 *
 * Wraps each page's first section. It does not travel: the hero is what the
 * rest of the page is measured against, and sliding it makes the layout look
 * unsettled. A fade alone, over a longer window than the nav, reads as the
 * page resolving.
 *
 * `as` is here because some heroes are the page's `<section>` and some sit
 * inside one; a wrapper `div` around a full-bleed band would not inherit its
 * stacking or overflow.
 */
export function HeroIntro({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <>{children}</>

  const { intro, easing } = motionTokens
  return (
    <fm.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: intro.hero.duration,
        ease: [...easing.out],
        delay: intro.hero.lag,
      }}
    >
      {children}
    </fm.div>
  )
}

export default HeroIntro
