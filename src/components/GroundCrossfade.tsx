import { useRef, type ReactNode } from 'react'
import { motion as fm, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLaggedProgress } from '@/lib/useLaggedProgress'

/**
 * The whole-page ground crossfade used at three section boundaries: Work ->
 * Offerings on the homepage, Our Bench -> Open Roles on Careers, and Design
 * Thinking -> Talent on Culture.
 *
 * ⚠ Was three hand-rolled copies. Consolidated 2026-09-04.
 *
 * The mechanism, and why it is this and not a gradient: a vertical gradient
 * cannot express a whole-viewport colour change. It puts both colours on screen
 * at once and reads as a travelling band. What is wanted is the *entire* ground
 * changing as you pass the boundary, so the colour is animated on one wrapper:
 *
 * - a zero-height marker sits exactly on the boundary;
 * - `useScroll` with `offset: ['start end', 'start start']` runs 0 -> 1 as that
 *   marker travels from the bottom of the viewport to the top;
 * - `useLaggedProgress` springs it, so the change settles instead of tracking
 *   the wheel frame for frame;
 * - `backgroundColor` interpolates over the `fade` window.
 *
 * `contentFade` is the paired half: where the incoming section is cream type on
 * the darkening ground, it has to be held at zero opacity until the ink has
 * largely arrived, or it enters the viewport as cream-on-cream. It fades in
 * *behind* the darkening ground rather than alongside it.
 *
 * Under `prefers-reduced-motion` there is no scroll-linked colour at all: each
 * half simply paints its own ground.
 */

export type FadeWindow = { start: number; end: number }

export function GroundCrossfade({
  from,
  to,
  fade,
  contentFade,
  above,
  below,
  tail,
}: {
  /** Ground before the boundary, as a colour `useTransform` can interpolate. */
  from: string
  /** Ground after it. */
  to: string
  fade: FadeWindow
  /** Set when `below` is light type on a darkening ground. */
  contentFade?: FadeWindow
  above: ReactNode
  below: ReactNode
  /** Sections after `below` that ride the finished ground (FAQ, marquee). */
  tail?: ReactNode
}) {
  const markerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress: raw } = useScroll({
    target: markerRef,
    offset: ['start end', 'start start'],
  })
  const progress = useLaggedProgress(raw)

  const background = useTransform(progress, [fade.start, fade.end], [from, to])
  /*
    Always created — a hook cannot be called conditionally. When there is no
    `contentFade` the window is the full range and the value is a constant 1,
    which `fm.div` treats as no animation at all.
  */
  const contentOpacity = useTransform(
    progress,
    contentFade ? [contentFade.start, contentFade.end] : [0, 1],
    contentFade ? [0, 1] : [1, 1],
  )

  if (prefersReduced) {
    return (
      <>
        <div style={{ backgroundColor: from }}>{above}</div>
        <div style={{ backgroundColor: to }}>
          {below}
          {tail}
        </div>
      </>
    )
  }

  return (
    <fm.div style={{ backgroundColor: background }}>
      {above}
      {/* Zero-height boundary the crossfade is timed against. */}
      <div ref={markerRef} aria-hidden className="h-0" />
      {contentFade ? <fm.div style={{ opacity: contentOpacity }}>{below}</fm.div> : below}
      {tail}
    </fm.div>
  )
}

export default GroundCrossfade
