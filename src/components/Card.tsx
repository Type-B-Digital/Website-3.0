import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Card — an image panel at one of the design's three aspect ratios, with
 * optional overlaid content.
 *
 * Figma samples on the token board:
 *   card-vertical-medium     410x560   node 3373:25078
 *   card-horizontal-medium   519x311   node 3389:26338
 *   card-horizontal-small    410x287   node 3373:25072
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3373-25078
 *
 * The design has no shadows — depth comes from the scrim over the image
 * (Figma: node 3390:26457). Radius is `md` (8px) on every card in the file.
 */
export type CardAspect = 'verticalMedium' | 'horizontalMedium' | 'horizontalSmall'

/** Ratios are the Figma frame dimensions, not rounded approximations. */
const aspectClasses: Record<CardAspect, string> = {
  verticalMedium: 'aspect-[410/560]',
  horizontalMedium: 'aspect-[519/311]',
  horizontalSmall: 'aspect-[410/287]',
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
      className={cn(
        'relative w-full overflow-hidden rounded-md',
        aspectClasses[aspect],
        className,
      )}
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
      {children && <div className="absolute inset-0 p-xl">{children}</div>}
    </div>
  )
}

export default Card
