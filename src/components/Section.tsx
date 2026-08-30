import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import Container from './Container'

/**
 * Section — vertical rhythm + ground color for a page band.
 *
 * `tone` sets the background and the text color that reads on it. The homepage
 * alternates dark → light → accent → dark; every band on the page is one of
 * these three.
 *
 * Figma: homepage bands — node 2761:1214
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2761-1214
 */
export type SectionTone = 'dark' | 'light' | 'accent'
export type SectionSpacing = 'none' | 'compact' | 'default' | 'loose'

export type SectionProps = {
  children: ReactNode
  tone?: SectionTone
  spacing?: SectionSpacing
  /** Skip the Container — for bands that manage their own full-bleed layout. */
  bare?: boolean
  className?: string
  id?: string
}

const toneClasses: Record<SectionTone, string> = {
  dark: 'bg-canvas text-on-dark',
  light: 'bg-surface text-on-light',
  accent: 'bg-accent-600 text-on-dark-muted',
}

/** Derived from the gaps between homepage bands (48 / 80 / 80+). */
const spacingClasses: Record<SectionSpacing, string> = {
  none: '',
  compact: 'py-3xl',
  default: 'py-4xl',
  // 2x the 80px band rhythm, expressed through the token rather than as a literal.
  loose: 'py-4xl xl:py-[calc(theme(spacing.4xl)*2)]',
}

export function Section({
  children,
  tone = 'dark',
  spacing = 'default',
  bare = false,
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative w-full', toneClasses[tone], spacingClasses[spacing], className)}
    >
      {bare ? children : <Container>{children}</Container>}
    </section>
  )
}

export default Section
