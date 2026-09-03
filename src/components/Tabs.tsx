import { useId, useRef } from 'react'
import { cn } from '@/lib/cn'
import Typography from './Typography'

/**
 * Tabs — a filter row. Figma: the Careers "Open Roles" tabs, node 3638:9419.
 *
 * Implements the ARIA tabs pattern properly, which is the reason this is a
 * component rather than a row of buttons:
 *
 * - the row is a `tablist`, each control a `tab` carrying `aria-selected`, and
 *   the panel a `tabpanel` wired back with `aria-controls` / `aria-labelledby`;
 * - only the selected tab is in the tab order (`tabIndex -1` on the rest), and
 *   Left/Right/Home/End move between them. That is what the pattern requires:
 *   a tablist is one tab stop, and arrows move within it. Leaving every tab
 *   focusable makes a keyboard user tab through all four to reach the content.
 *
 * `variant` on an item covers the artboard's odd one out: the three category
 * tabs are pills, "View All" is drawn with no pill at all (node 3638:9427) —
 * it reads as "no filter" rather than as another category.
 */
export type TabItem = {
  id: string
  label: string
  /** `plain` drops the pill; the artboard uses it for "View All". */
  variant?: 'pill' | 'plain'
}

export type TabsProps = {
  items: readonly TabItem[]
  active: string
  onChange: (id: string) => void
  /** Which ground the row sits on. */
  tone?: 'onDark' | 'onLight'
  /** Id of the element the panel content lives in, for `aria-controls`. */
  panelId: string
  className?: string
}

export function Tabs({
  items,
  active,
  onChange,
  tone = 'onDark',
  panelId,
  className,
}: TabsProps) {
  const baseId = useId()
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  const onKeyDown = (e: React.KeyboardEvent) => {
    const order = items.map((i) => i.id)
    const at = order.indexOf(active)
    let next: number | null = null
    if (e.key === 'ArrowRight') next = (at + 1) % order.length
    if (e.key === 'ArrowLeft') next = (at - 1 + order.length) % order.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = order.length - 1
    if (next === null) return
    e.preventDefault()
    const id = order[next]
    onChange(id)
    // Follow focus, so the arrow keys move the visible selection *and* the
    // focus ring together rather than leaving them out of step.
    refs.current[id]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label="Filter open roles by team"
      onKeyDown={onKeyDown}
      className={cn('flex flex-wrap items-center gap-tag', className)}
    >
      {items.map((item) => {
        const selected = item.id === active
        const plain = item.variant === 'plain'
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[item.id] = el
            }}
            id={`${baseId}-${item.id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            className={cn(
              'rounded-pill px-tag py-xs transition-colors duration-fast ease-out',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              tone === 'onDark'
                ? 'focus-visible:outline-on-dark'
                : 'focus-visible:outline-accent-500',
              // A selected tab inverts; an unselected one is outlined, except
              // the plain variant which carries no box at all.
              selected && !plain && tone === 'onDark' && 'bg-white text-on-light',
              selected && !plain && tone === 'onLight' && 'bg-canvas text-on-dark',
              !selected && !plain && tone === 'onDark' && 'border border-on-dark-subtle text-on-dark',
              !selected && !plain && tone === 'onLight' && 'border border-on-light text-on-light',
              plain && tone === 'onDark' && 'text-on-dark hover:opacity-muted',
              plain && tone === 'onLight' && 'text-on-light hover:opacity-muted',
              // The plain variant still needs a selected state, or "View All"
              // gives no feedback at all when it is the active filter.
              plain && selected && 'underline underline-offset-4',
            )}
          >
            <Typography variant="copySmall" as="span" className="font-medium">
              {item.label}
            </Typography>
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
