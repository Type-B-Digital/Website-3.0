import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion as fm, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { breakpoints, spacing } from '@/tokens'
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
   * Page margin the row starts at, in px. Defaults to the CURRENT page margin,
   * which is device-dependent since the grid went fluid — see `pageMargin`.
   * Pass a number to pin it.
   */
  inset?: number
  /** Gap between items. */
  gapClassName?: string
  /** Fraction of the row's viewport pass spent moving. */
  range?: [number, number]
  /**
   * Below `lg`, lay the items out as a grid instead of a sliding row — one
   * column on a phone, two on a small tablet.
   *
   * ⚠ Added 2026-09-21 (Eduardo, for "What sets us apart"). The slide is a
   * desktop gesture: it is driven by VERTICAL scroll and the overflow past the
   * right edge is the point, which on a 390px phone meant four 410px cards
   * mostly off-screen with no scrollbar and no way to reach them except by
   * scrolling the page to exactly the right place. A grid shows all four.
   *
   * `lg` is the boundary because that is what this build means by "small
   * tablet and mobile" — see the footer wordmark note in the build log.
   *
   * The transform stays wired at every width and simply resolves to zero when
   * stacked: `travel` is `scrollWidth + inset - innerWidth` clamped at 0, and
   * a grid that fits its wrapper can never exceed that.
   */
  stack?: boolean
  className?: string
}

/**
 * The page margin in force at the current viewport width — the same three steps
 * `Container` paints (16 / 24 / 80), read back as a number.
 *
 * The row starts flush with that margin, so the fixed 80 this used to default
 * to left a 64px indent on a phone where the page itself only holds 16px off
 * the edge. Resolved at measure time rather than at module scope: `measure`
 * already re-runs on resize, so crossing a breakpoint re-reads it for free.
 */
function pageMargin() {
  const width = window.innerWidth
  if (width >= Number.parseFloat(breakpoints.xl)) return Number.parseFloat(spacing['4xl'])
  if (width >= Number.parseFloat(breakpoints.lg)) return Number.parseFloat(spacing.lg)
  return Number.parseFloat(spacing.md)
}

export function ScrollTrack({
  children,
  inset,
  gapClassName = 'gap-lg',
  range = [0.2, 0.8],
  stack = false,
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
      const needed = track.scrollWidth + (inset ?? pageMargin()) - window.innerWidth
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
      <div className={cn('w-full px-md lg:px-lg xl:px-4xl', className)}>
        <ul
          className={cn(
            stack ? 'grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-wrap' : 'flex flex-wrap',
            gapClassName,
          )}
        >
          {children}
        </ul>
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className={cn('w-full overflow-hidden', className)}>
      {/*
        The starting indent is painted by the same three utilities `Container`
        uses, so it crosses a breakpoint with the rest of the page rather than
        after a resize event has fired. `pageMargin()` above only has to agree
        with these for the TRAVEL to be measured right; a pinned `inset` still
        wins on both sides.
      */}
      <fm.ul
        ref={trackRef}
        className={cn(
          'will-change-transform',
          /*
            Stacked, this is an ordinary grid and needs a RIGHT margin too —
            the sliding row deliberately has none, because it runs off that
            edge. Both are dropped at `lg`, where the row takes over.
          */
          stack ? 'grid grid-cols-1 md:grid-cols-2 lg:flex lg:w-max' : 'flex w-max',
          inset === undefined && 'pl-md lg:pl-lg xl:pl-4xl',
          stack && inset === undefined && 'pr-md md:pr-md lg:pr-0',
          gapClassName,
        )}
        style={{ x, ...(inset === undefined ? null : { paddingLeft: inset }) }}
      >
        {children}
      </fm.ul>
    </div>
  )
}

export default ScrollTrack
