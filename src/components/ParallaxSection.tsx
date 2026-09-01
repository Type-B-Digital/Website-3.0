import { useRef, type ReactNode } from 'react'
import { motion as fm, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'
import { cn } from '@/lib/cn'

/**
 * ParallaxSection — moves its children against the scroll as the section
 * crosses the viewport.
 *
 * ⚠ There is no parallax specification in Figma. The token board documents no
 * motion values at all (verified against the full node listing and a render of
 * the complete board). Speeds come from `tokens.motion.parallax` and are a
 * proposal, not a reproduction — see docs/BUILD_LOG.md § Open questions.
 *
 * `speed` is the fraction of the element's own height it travels across the
 * full scroll pass. `subtle` (0.08) is right for large images; `strong` (0.32)
 * reads as an obvious effect and should be used sparingly.
 *
 * Positioning: the wrapper defaults to `relative`, but a caller passing its own
 * `absolute`/`fixed`/`sticky` gets that instead. Emitting both is not harmless —
 * Tailwind orders `.relative` after `.absolute` in the stylesheet, so `relative`
 * would silently win and collapse the wrapper to zero height, taking any
 * `size-full` child with it.
 */
const POSITIONED = /(^|\s)(absolute|fixed|sticky)(\s|$)/
export type ParallaxSpeed = keyof typeof motionTokens.parallax

export type ParallaxSectionProps = {
  children: ReactNode
  speed?: ParallaxSpeed
  /** Travel horizontally instead — used by the values marquee band. */
  axis?: 'y' | 'x'
  className?: string
}

export function ParallaxSection({
  children,
  speed = 'base',
  axis = 'y',
  className,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // 'start end' -> section top hits viewport bottom; 'end start' -> section
  // bottom leaves viewport top. So progress spans the whole pass-through.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const travel = motionTokens.parallax[speed] * 100
  const offset = useTransform(scrollYProgress, [0, 1], [`${travel / 2}%`, `${-travel / 2}%`])

  const wrapper = cn(!POSITIONED.test(className ?? '') && 'relative', className)

  // Honour the OS-level reduced-motion setting: render static, no transform.
  if (prefersReduced) {
    return (
      <div ref={ref} className={wrapper}>
        {children}
      </div>
    )
  }

  return (
    <div ref={ref} className={wrapper}>
      <fm.div
        style={axis === 'y' ? { y: offset } : { x: offset }}
        className="size-full will-change-transform"
      >
        {children}
      </fm.div>
    </div>
  )
}

export default ParallaxSection
