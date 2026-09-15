import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Container — horizontal layout frame.
 *
 * Figma: "grid-desktop-12-columns" — node 3386:25446
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3386-25446
 *
 * ── Fluid, not framed (Nabeel, 2026-09-15) ───────────────────────────────
 *
 * The grid is FLUID: the container fills the viewport and the margins hold the
 * content off the edges, so navigation and left/right-aligned content stay
 * pinned to the sides on a large screen instead of detaching from them and
 * floating in the middle of a centred 1440px frame.
 *
 * This replaces the previous `max-w-frame` default. That default was read off
 * the 1440 artboard — correct at the designed width, and the reason a 2560px
 * display drew 560px of dead ground down each side with the nav visibly adrift
 * from the corners it is supposed to sit in.
 *
 * Margins are now specified per device class rather than derived:
 *
 *   Desktop                  xl and up   (>= 1280)   80px
 *   Large tablet             lg to xl    (1024-1279) 24px
 *   Small tablet + mobile    below lg    (< 1024)    16px
 *
 * These come from feedback, not from Figma — the file still has no artboard
 * below 1440 — but they are now a specification rather than an engineering
 * guess, so the `md:` step this used to carry (32px from 768) is gone: 768-1023
 * is small tablet and takes 16px like mobile.
 *
 * A section that genuinely wants a measure caps its own content (most already
 * do, with `max-w-[Npx]` on the block inside) or opts in with `constrain`.
 */
export type ContainerProps = {
  children: ReactNode
  className?: string
  /**
   * Opt back in to the 1440px frame, for a section that is specified as framed
   * rather than fluid. The inverse of the `bleed` escape hatch this replaces —
   * which nothing ever used, because full-bleed bands go `bare` on `Section`
   * and skip the Container entirely.
   */
  constrain?: boolean
}

export function Container({ children, className, constrain = false }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-md lg:px-lg xl:px-4xl',
        constrain && 'max-w-frame',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Container
