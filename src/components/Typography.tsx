import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { TypographyToken } from '@/tokens'

/**
 * Typography — the whole type scale, one component.
 *
 * Every variant maps 1:1 to a token in `tokens.typography`, which maps to a
 * Tailwind `text-*` class generated from that same token. There is no size,
 * weight, or line-height literal anywhere in this file.
 *
 * Figma: type samples on the token board — node 3366:23051
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3366-23051
 *   h1                node 3369:24533     h2               node 3370:24754
 *   h3                node 3386:25398     subHeaderLarge   node 3386:25396
 *   subHeaderSmall    node 3373:24762     copyLarge        node 3373:24758
 *   copyMedium        node 3370:24749     copySmall        node 3373:24764
 *   copyXSmall        node 3373:24760     eyebrow          node 3383:25390
 */
export type TypographyVariant = TypographyToken

/** camelCase token name -> the kebab-case Tailwind class the config generates. */
const variantClass: Record<TypographyVariant, string> = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  display: 'text-display',
  subHeaderLarge: 'text-sub-header-large',
  subHeaderSmall: 'text-sub-header-small',
  copyLarge: 'text-copy-large',
  copyMedium: 'text-copy-medium',
  copySmall: 'text-copy-small',
  copyXSmall: 'text-copy-x-small',
  eyebrow: 'text-eyebrow',
  tag: 'text-tag',
  button: 'text-button',
  navLink: 'text-nav-link',
}

/** Sensible default element per variant; override with `as`. */
const defaultElement: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  display: 'h2',
  subHeaderLarge: 'p',
  subHeaderSmall: 'p',
  copyLarge: 'p',
  copyMedium: 'p',
  copySmall: 'p',
  copyXSmall: 'p',
  eyebrow: 'span',
  tag: 'span',
  button: 'span',
  navLink: 'span',
}

export type TypographyProps = {
  variant: TypographyVariant
  children: ReactNode
  /** Override the rendered element without changing the visual style. */
  as?: ElementType
  /** Apply the design's 80% body-copy alpha. Figma uses this on nearly all prose. */
  muted?: boolean
  className?: string
}

export function Typography({
  variant,
  children,
  as,
  muted = false,
  className,
}: TypographyProps) {
  const Component = as ?? defaultElement[variant]
  return (
    <Component
      className={cn(variantClass[variant], muted && 'opacity-muted', 'text-balance', className)}
    >
      {children}
    </Component>
  )
}

export default Typography
