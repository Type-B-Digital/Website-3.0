import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Container — horizontal layout frame.
 *
 * Figma: "grid-desktop-12-columns" — node 3386:25446
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3386-25446
 *
 * The grid is 1440 frame / 80px margins / 12 columns / 24px gutter, giving a
 * 1280px content width (tokens.layout).
 *
 * The max-width is the FRAME (1440), not the content width — the 80px margins
 * are padding inside it. Capping at 1280 and then adding padding would yield a
 * 1120px content width and silently narrow every section on the page.
 *
 * The 80px margin only applies at the designed width. Figma has no artboards
 * below 1440px, so the smaller steps are an engineering choice — see
 * docs/BUILD_LOG.md § Open questions.
 */
export type ContainerProps = {
  children: ReactNode
  className?: string
  /** Drop the max-width for full-bleed content that still needs page padding. */
  bleed?: boolean
}

export function Container({ children, className, bleed = false }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-md md:px-xl xl:px-4xl',
        !bleed && 'max-w-frame',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Container
