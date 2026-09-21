import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { useRef } from 'react'
import { motion as fm, useReducedMotion, useSpring } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'

/**
 * TiltCard — a card or photograph that leans towards the pointer.
 *
 * ⚠ NOT IN FIGMA. The board draws these blocks flat; this is an authored
 * hover, like everything else in `motion`. Eduardo, 2026-09-21: one tilt on
 * every card and inline image across the site, so it lives here rather than
 * being re-typed per section.
 *
 * A wrapper, not a card: it owns no ground, no radius and no aspect ratio, so
 * whatever it is given keeps the geometry it already had. Drop it around the
 * thing that should lean — an `img`, a `Card`, a `Link`, a gradient panel —
 * and pass the layout classes the wrapped element's parent expects, since the
 * wrapper now sits between them.
 *
 * Three things make it read as a lean rather than a wobble:
 *
 * - rotation is driven by where in the box the pointer is, mapped to ±`maxTilt`
 *   about the centre, so the card follows the hand instead of animating on a
 *   fixed path;
 * - both axes run through springs (`tilt.spring`), so the card trails the
 *   pointer slightly and settles rather than tracking it exactly — an unsprung
 *   tilt is what makes this effect feel cheap;
 * - `z` pushes the card a little further away on enter (`tilt.depth`), which
 *   under the same perspective reads as the card yielding under the pointer.
 *
 * ⚠ MOUSE ONLY. A touch pointer never tilts: on a phone the gesture that
 * would drive it is the one scrolling the page, and claiming it would mean
 * taking `touch-action` off an image the visitor is trying to swipe past.
 * There is no hover on that device to justify the cost.
 *
 * Reduced motion gets a plain `div` with the same classes — no transform, no
 * listeners, no perspective.
 */
export type TiltCardProps = {
  children: ReactNode
  /** Degrees at the edge of the box. Defaults to `motion.tilt.maxTilt`. */
  maxTilt?: number
  className?: string
  style?: CSSProperties
}

export function TiltCard({ children, maxTilt, className, style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { tilt } = motionTokens

  /*
    Hooks run on every render, reduced motion or not — a conditional return
    above them would change the hook order the first time the media query
    flips. They simply go unused in that branch.
  */
  const z = useSpring(0, tilt.spring)
  const rotateX = useSpring(0, tilt.spring)
  const rotateY = useSpring(0, tilt.spring)

  if (prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  const limit = maxTilt ?? tilt.maxTilt

  const follow = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !ref.current) return
    const box = ref.current.getBoundingClientRect()
    /*
      Offsets are taken off the box rather than from `nativeEvent.offsetX`,
      which is relative to whatever child is under the pointer — on a card
      with a caption over the image that makes the tilt jump at the caption's
      edge.
    */
    const x = (event.clientX - box.left) / box.width
    const y = (event.clientY - box.top) / box.height
    rotateX.set(limit * (0.5 - y))
    rotateY.set(limit * (x - 0.5))
  }

  const rest = () => {
    rotateX.set(0)
    rotateY.set(0)
    z.set(0)
  }

  return (
    <fm.div
      ref={ref}
      className={className}
      style={{
        ...style,
        rotateX,
        rotateY,
        z,
        /*
          Perspective on the element itself, not on a parent: these are dropped
          into grids and flex rows all over the site, and a shared `perspective`
          on the row would give every card a different vanishing point
          depending on where it sat in it.
        */
        transformPerspective: tilt.perspective,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onPointerMove={follow}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'mouse') return
        z.set(tilt.depth)
      }}
      onPointerLeave={rest}
      /* A dragged pointer that ends elsewhere never fires `pointerleave`. */
      onPointerCancel={rest}
    >
      {children}
    </fm.div>
  )
}

export default TiltCard
