import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Card — an image panel at one of the design's three aspect ratios, with
 * optional overlaid content.
 *
 * Figma samples on the token board:
 *   card-vertical-medium     410x560   node 3373:25078
 *   card-horizontal-medium   410x287   node 3373:25072
 *   card-horizontal-small    519x311   node 3389:26338
 *
 * ⚠ The two horizontal labels were swapped on 2026-09-09: 519x311 is `small`
 * now and 410x287 is `medium`. Only the NAMES moved — every call site was
 * flipped in the same change, so every card on the site still renders the box
 * it always did. If you are comparing against an older screenshot, compare the
 * ratio, not the prop.
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3373-25078
 *
 * The design has no shadows — depth comes from the scrim over the image
 * (Figma: node 3390:26457). Radius is `md` (8px) on every card in the file.
 */
export type CardAspect = 'verticalMedium' | 'horizontalMedium' | 'horizontalSmall'

/** Ratios are the Figma frame dimensions, not rounded approximations. */
const aspectClasses: Record<CardAspect, string> = {
  verticalMedium: 'aspect-[410/560]',
  horizontalMedium: 'aspect-[410/287]',
  horizontalSmall: 'aspect-[519/311]',
}

/**
 * A Figma image-fill transform, as percentages of the card box. Several cards
 * in the design are crops of one shared source image; reproducing the crop here
 * matches the design exactly and avoids shipping the same bytes many times.
 */
export type CardCrop = {
  width: string
  height: string
  left: string
  top: string
}

export type CardProps = {
  /**
   * Already resolved against the base path — pass `asset('/images/…')`, not a
   * bare literal. `Card` emits this verbatim, so a raw `/images/x.png` 404s
   * wherever the site is not served from the domain root. It cannot resolve
   * the path itself: `asset` is not idempotent, so doing it here would
   * double-prefix every caller that already does it correctly.
   */
  src: string
  alt: string
  /** Reproduce a Figma crop rather than object-cover. */
  crop?: CardCrop
  aspect?: CardAspect
  /** Darken the image so overlaid text stays legible. Figma: node 3390:26457 */
  scrim?: boolean
  /** Content laid over the image — a headline, usually. */
  children?: ReactNode
  className?: string
}

export function Card({
  src,
  alt,
  crop,
  aspect = 'verticalMedium',
  scrim = false,
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-md', aspectClasses[aspect], className)}
    >
      {crop ? (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="absolute max-w-none"
            style={{ width: crop.width, height: crop.height, left: crop.left, top: crop.top }}
          />
        </div>
      ) : (
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
      )}
      {scrim && <div aria-hidden className="absolute inset-0 bg-scrim" />}
      {children && (
        /*
          The vertical card sets its copy bottom-centred; the horizontals keep
          the top-left placement. `p-xl` is the 32px inset on every side, so the
          bottom margin the design asks for falls out of the padding rather than
          being added on top of it.
        */
        <div
          className={cn(
            'absolute inset-0 p-xl',
            aspect === 'verticalMedium' && 'flex flex-col items-center justify-end text-center',
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Card
