import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Button — the site's CTA in its three weights.
 *
 * Figma component samples on the token board:
 *   cta-primary-dark      node 3369:24489
 *   cta-secondary-light   node 3369:24517
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3369-24489
 *
 * `tone` is which ground the button sits on, not what colour it is. A primary
 * button is dark-on-light and light-on-dark; the design uses both on the
 * homepage (nav CTA is `primary`/`onDark`, node 3390:26629).
 *
 * Geometry is identical across variants — 40px tall, pill radius, 8px gap to
 * the arrow — and comes from spacing/radius tokens.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type ButtonTone = 'onDark' | 'onLight'

const base =
  'inline-flex h-2xl shrink-0 items-center justify-center gap-sm rounded-pill text-button ' +
  'transition-colors duration-fast ease-out'

const variantClasses: Record<ButtonVariant, Record<ButtonTone, string>> = {
  // Solid. Figma: 3369:24489 (on light) / 3390:26629 (on dark)
  primary: {
    onLight: 'bg-neutral-900 text-neutral-50 pl-lg pr-md hover:bg-neutral-800',
    onDark: 'bg-neutral-50 text-neutral-900 pl-lg pr-md hover:bg-neutral-200',
  },
  // Outlined. Figma: 3369:24517 (on dark) / 3390:26535 (on light)
  secondary: {
    onLight: 'border border-on-light text-ink-soft px-md hover:bg-neutral-900/5',
    onDark: 'border border-on-dark text-paper px-md hover:bg-paper/10',
  },
  // Label + arrow only. Figma: footer / inline links, e.g. node 3390:26633
  tertiary: {
    onLight: 'text-ink-soft hover:opacity-muted',
    onDark: 'text-paper hover:opacity-muted',
  },
}

export type ButtonProps<T extends ElementType> = {
  children: ReactNode
  variant?: ButtonVariant
  tone?: ButtonTone
  /** Trailing arrow. Figma ships it on every CTA; opt out for label-only cases. */
  icon?: boolean
  as?: T
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>

export function Button<T extends ElementType = 'button'>({
  children,
  variant = 'primary',
  tone = 'onDark',
  icon = true,
  as,
  className,
  ...rest
}: ButtonProps<T>) {
  const Component = (as ?? 'button') as ElementType
  return (
    <Component className={cn(base, variantClasses[variant][tone], className)} {...rest}>
      <span>{children}</span>
      {icon && (
        <img
          src="/icons/arrow-right.svg"
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
          className="size-lg shrink-0"
        />
      )}
    </Component>
  )
}

export default Button
