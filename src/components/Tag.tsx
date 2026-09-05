import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import Typography from './Typography'

/**
 * Tag — pill label on case-study rows.
 *
 * Figma: "label-tag" — node 3383:25393 / in situ node 3390:26451
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3383-25393
 *
 * NOTE: the token-board sample is Inter Medium while every in-page tag is
 * Reddit Sans Regular. This follows the page. See docs/BUILD_LOG.md § Deviations.
 */
export type TagTone = 'onLight' | 'onDark'

/**
 * `tone` rather than a `className` override, because `cn` is a plain join with
 * no Tailwind merge: passing `bg-canvas` alongside the base `bg-tag-bg` leaves
 * both in the class list and lets stylesheet order decide, which is how the Our
 * Work hero's ink pills first rendered as pale ones.
 *
 * `onDark` is the inverted pill the Our Work hero draws over its photograph —
 * ink fill, cream label (Figma node 3707:10702).
 */
const toneClasses: Record<TagTone, string> = {
  onLight: 'bg-tag-bg text-on-light',
  onDark: 'bg-canvas text-paper',
}

export function Tag({
  children,
  tone = 'onLight',
  className,
}: {
  children: ReactNode
  tone?: TagTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-tag px-tag py-xs',
        toneClasses[tone],
        className,
      )}
    >
      <Typography variant="tag">{children}</Typography>
    </span>
  )
}

export default Tag
