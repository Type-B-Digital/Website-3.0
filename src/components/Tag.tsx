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
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-tag bg-tag-bg px-tag py-xs text-on-light',
        className,
      )}
    >
      <Typography variant="tag">{children}</Typography>
    </span>
  )
}

export default Tag
