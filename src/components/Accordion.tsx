import { useId, useState } from 'react'
import { AnimatePresence, motion as fm, useReducedMotion } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'
import { cn } from '@/lib/cn'
import Typography from './Typography'
import ChevronDown from './icons/ChevronDown'

/**
 * Accordion — a disclosure list. Figma: the Industries FAQ, node 2894:14479.
 *
 * The artboard only draws the collapsed state, so the open state and the
 * transition are authored, like the rest of `motion`.
 *
 * Accessibility is the reason this is a component rather than markup repeated
 * per page: each row is a real `<button>` carrying `aria-expanded` and
 * `aria-controls`, and the panel is a labelled region. A `<div>` with a click
 * handler would look identical and be unreachable by keyboard.
 *
 * `height: auto` is animatable by Framer (it measures the target box), which is
 * what allows the panel to open to its content height without a magic number.
 * Under `prefers-reduced-motion` the panel simply appears.
 */
export type AccordionItem = {
  question: string
  answer: string
}

export type AccordionProps = {
  items: readonly AccordionItem[]
  /**
   * Which ground the list sits on. Only the rule colour changes: accent.500 at
   * 40% reads on cream but is nearly invisible over ink, so the dark variant
   * steps one lighter on the ramp. Measured from the Careers artboard.
   */
  tone?: 'onLight' | 'onDark'
  /**
   * Index open on mount, or `null` for all closed. The artboard shows every
   * row collapsed, so that is the default.
   */
  defaultOpen?: number | null
  /**
   * One row open at a time. Defaults to true: the answers are long enough that
   * several open at once buries the list.
   */
  single?: boolean
  className?: string
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
  tone,
}: {
  item: AccordionItem
  isOpen: boolean
  onToggle: () => void
  tone: 'onLight' | 'onDark'
}) {
  const prefersReduced = useReducedMotion()
  const id = useId()
  const panelId = `${id}-panel`
  const buttonId = `${id}-button`
  const { duration, easing } = motionTokens

  return (
    <div
      className={cn(
        'border-t last:border-b',
        tone === 'onDark' ? 'border-accent-soft-dark' : 'border-accent-soft',
      )}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          /*
            The chevron stops 24px short of the content edge on the artboard
            (node 2894:14484 ends at 1256 of 1280), so the row is padded rather
            than pushing the marker flush right.
          */
          className={cn(
            'flex w-full items-center justify-between gap-xl py-lg pr-lg text-left',
            'transition-opacity duration-fast ease-out hover:opacity-subtle',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
            tone === 'onDark' ? 'focus-visible:outline-on-dark' : 'focus-visible:outline-accent-500',
          )}
        >
          {/*
            copyLarge, not copyMedium: the artboard's question row is 31 tall
            (the chevron is centred at y=3.5 of it), which with py-lg gives the
            79px row pitch every FAQ on the site is drawn on.
          */}
          <Typography variant="copyLarge" as="span">
            {item.question}
          </Typography>
          <fm.span
            aria-hidden
            className="shrink-0"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: duration.base, ease: [...easing.inOut] }
            }
          >
            <ChevronDown className="size-lg" />
          </fm.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <fm.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={prefersReduced ? undefined : { height: 0, opacity: 0 }}
            animate={prefersReduced ? undefined : { height: 'auto', opacity: 1 }}
            exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: duration.base, ease: [...easing.inOut] }}
            className="overflow-hidden"
          >
            {/* Padding lives on the inner box: the animated box's height is
                what moves, and padding on it would jump at 0. */}
            <div className="max-w-[880px] pb-lg pr-lg">
              <Typography variant="copyMedium" muted>
                {item.answer}
              </Typography>
            </div>
          </fm.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Accordion({
  items,
  tone = 'onLight',
  defaultOpen = null,
  single = true,
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<number[]>(defaultOpen === null ? [] : [defaultOpen])

  const toggle = (i: number) =>
    setOpen((prev) => {
      if (prev.includes(i)) return prev.filter((n) => n !== i)
      return single ? [i] : [...prev, i]
    })

  return (
    <div className={cn('flex w-full flex-col', className)}>
      {items.map((item, i) => (
        <AccordionRow
          key={item.question}
          item={item}
          isOpen={open.includes(i)}
          onToggle={() => toggle(i)}
          tone={tone}
        />
      ))}
    </div>
  )
}

export default Accordion
