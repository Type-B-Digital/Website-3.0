import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion as fm, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { spacing } from '@/tokens'
import { cn } from '@/lib/cn'
import useLaggedProgress from '@/lib/useLaggedProgress'

/**
 * ScrollTrack — a row that starts flush with the page margin, runs off the
 * right edge, and slides left as the page scrolls past it.
 *
 * Figma draws these rows overflowing the 1440 frame: the four "What sets us
 * apart" cards sit at x=80/514/948/1382 and the last one ends at x=1792, well
 * past the frame edge (nodes 3390:26539 / 26546 / 26548 / 26540). That overflow
 * is the design intent, so the row is full-bleed rather than clipped to the
 * content width, and the travel is driven by vertical scroll rather than by a
 * scrollbar.
 *
 * Travel is measured, not hard-coded: `scrollWidth + inset - viewportWidth`.
 * That lands the last card exactly on the right margin at the end of the
 * movement, at any viewport width, and clamps to zero when everything already
 * fits (so on a wide display the row simply sits still).
 *
 * No scroll container, so no scrollbar — the wrapper is `overflow-hidden` and
 * the track is moved with a transform.
 */
export type ScrollTrackProps = {
  children: ReactNode
  /**
   * Page margin the row starts at, in px. Defaults to the 80px layout margin.
   */
  inset?: number
  /** Gap between items. */
  gapClassName?: string
  /** Fraction of the row's viewport pass spent moving. */
  range?: [number, number]
  className?: string
}

export function ScrollTrack({
  children,
  inset = Number.parseFloat(spacing['4xl']),
  gapClassName = 'gap-lg',
  range = [0.2, 0.8],
  className,
}: ScrollTrackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const prefersReduced = useReducedMotion()
  const [travel, setTravel] = useState(0)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      const needed = track.scrollWidth + inset - window.innerWidth
      setTravel(Math.max(needed, 0))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [inset])

  // Progress across the row's own pass through the viewport, so the row is at
  // its start position when it arrives and at its end before it leaves.
  const { scrollYProgress: rawProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  })
  // Smoothed like the other scroll-driven scenes, so the row trails and settles.
  const scrollYProgress = useLaggedProgress(rawProgress)
  const x = useTransform(scrollYProgress, range, [0, -travel])

  // Reduced motion: no sliding and no hidden overflow — the cards wrap instead,
  // so everything stays reachable without a scrollbar or a transform.
  if (prefersReduced) {
    return (
      <div className={cn('w-full px-md md:px-xl xl:px-4xl', className)}>
        <ul className={cn('flex flex-wrap', gapClassName)}>{children}</ul>
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className={cn('w-full overflow-hidden', className)}>
      <fm.ul
        ref={trackRef}
        className={cn('flex w-max will-change-transform', gapClassName)}
        style={{ x, paddingLeft: inset }}
      >
        {children}
      </fm.ul>
    </div>
  )
}

export default ScrollTrack
