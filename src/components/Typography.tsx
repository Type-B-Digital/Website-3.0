import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
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
  navPanelLink: 'text-nav-panel-link',
  numeral: 'text-numeral',
}

/**
 * `text-wrap: balance` evens the line lengths of a short block — right for a
 * headline, wrong for a paragraph. Applied to body copy it pulls the text in
 * from its own measure, so a column that should fill 330px wraps at 220 and
 * gains a line. That was happening to every paragraph on the site.
 *
 * Headings balance; everything else gets `pretty`, which only avoids leaving a
 * single word on the last line.
 */
/**
 * A caller's own wrapping class has to win, and without this it silently did
 * not. `text-balance` and `text-pretty` both set `text-wrap`, which resets
 * `text-wrap-mode`; Tailwind emits them AFTER `whitespace-nowrap`, so at equal
 * specificity the default here overrode every caller that asked for nowrap.
 *
 * Five call sites were affected and none of them looked broken enough to
 * chase: both values marquees (`variant="h1"`, so `text-balance`), two chips on
 * What We Do, and the city chips on Culture. The marquees were wrapping mid-
 * phrase at their own measure rather than running as one line.
 *
 * So: if the caller names a wrapping utility, this component does not add one.
 */
const WRAP_UTILITY = /(?:^|\s)(?:whitespace-\S+|text-(?:nowrap|wrap|balance|pretty))(?:\s|$)/

const BALANCED: ReadonlySet<TypographyVariant> = new Set([
  'h1',
  'h2',
  'h3',
  'display',
  'numeral',
])

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
  navPanelLink: 'span',
  // Decorative by default — the Careers carousel numeral is a graphic.
  numeral: 'span',
}

/**
 * Remaining props pass through to the rendered element. Needed for the
 * attributes that make a form usable: an error message has to carry the `id`
 * that its input's `aria-describedby` points at, and a form-level failure has
 * to carry `role="alert"`. Without pass-through those have to be hand-rolled
 * with literal type classes, which is how off-scale sizes creep in.
 */
export type TypographyProps = {
  variant: TypographyVariant
  children: ReactNode
  /** Override the rendered element without changing the visual style. */
  as?: ElementType
  /** Apply the design's 80% body-copy alpha. Figma uses this on nearly all prose. */
  muted?: boolean
  className?: string
} & Omit<ComponentPropsWithoutRef<'p'>, 'children' | 'className'>

export function Typography({
  variant,
  children,
  as,
  muted = false,
  className,
  ...rest
}: TypographyProps) {
  const Component = as ?? defaultElement[variant]
  return (
    <Component
      className={cn(
        variantClass[variant],
        muted && 'opacity-muted',
        !WRAP_UTILITY.test(className ?? '') &&
          (BALANCED.has(variant) ? 'text-balance' : 'text-pretty'),
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Typography
