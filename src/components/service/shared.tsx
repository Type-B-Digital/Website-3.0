import type { ReactNode } from 'react'
import { Eyebrow, Reveal, Section, Typography } from '@/components'
import { cn } from '@/lib/cn'

/**
 * Two sections that already existed on other pages and are reused across the
 * service pages, lifted here so there is one implementation of each.
 */

/* ------------------------------------------------------------------ *
 * Packaging — Figma node 3604:1255 (What We Do), 3605:2277 (Product)
 * ------------------------------------------------------------------ */

export type PackageTier = {
  title: string
  note: string
  items: readonly string[]
  /** The dark lead card naming the practices. */
  lead?: boolean
}

/**
 * Four columns: the first names the three practices on a dark card, the rest
 * are the Entry / Core / Expanded tiers, open with a rule above and below.
 *
 * Each column is icon, title block, then items, with the items pushed to the
 * bottom so all four end on the same line whatever their copy length.
 *
 * ⚠ The artboard uses icon-set instances (Chart_Line, House_02, Heart_01,
 * Mobile_Button) that are not exported; each column shows a placeholder mark.
 */
export function Packaging({
  eyebrow = 'How we package it',
  heading = 'Three lines. Entry, Core, or Expanded.',
  tiers,
}: {
  eyebrow?: string
  heading?: ReactNode
  tiers: readonly PackageTier[]
}) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="flex flex-col gap-4xl">
        <Reveal>
          <div className="flex max-w-[549px] flex-col items-start gap-md">
            <Eyebrow tone="onLight">{eyebrow}</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              {heading}
            </Typography>
          </div>
        </Reveal>

        <ul className="grid items-stretch gap-lg md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier, i) => (
            <li key={tier.title}>
              <Reveal index={i} className="h-full">
                <div
                  className={cn(
                    'flex h-full flex-col justify-between gap-3xl',
                    tier.lead
                      ? 'rounded-md bg-canvas p-lg text-on-dark'
                      : 'border-y border-divider py-lg',
                  )}
                >
                  <div className="flex flex-col gap-3xl">
                    <span
                      aria-hidden
                      className={cn(
                        'size-lg rounded-sm',
                        tier.lead ? 'bg-paper/25' : 'bg-neutral-900/15',
                      )}
                    />
                    <div className="flex flex-col gap-xs">
                      <Typography variant="copyLarge" as="h3">
                        {tier.title}
                      </Typography>
                      <Typography variant="copySmall" muted className="italic">
                        {tier.note}
                      </Typography>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-lg">
                    {tier.items.map((item) => (
                      <li key={item}>
                        <Typography variant="copyMedium" as="span">
                          {item}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * Staggered cards — Figma node 3679:10345 (Culture), 3605:2271 (Product)
 * ------------------------------------------------------------------ */

export type StaggeredCard = {
  /** Optional — Culture's stages are numbered, the Product page's are not. */
  number?: string
  title: string
  body: string
}

/**
 * Four flat cards in a row, with the even ones dropped a card-height so the
 * row reads as a stagger rather than a four-up. The offset is 243px on both
 * artboards and only applies once they are side by side.
 *
 * `rings` draws the four faint circles behind; `glow` adds the warm bloom.
 * Culture has both, the Product page only the rings — its ground is already
 * warm, and a bloom on top of it goes muddy.
 *
 * The offset needs no spacer under it: a grid row is as tall as its tallest
 * item, and `mt-[243px]` on the even cards makes that 302+243 on its own. An
 * added spacer put 243px of nothing between the cards and the footnote.
 */
export function StaggeredCards({
  eyebrow,
  eyebrowTone = 'onAccent',
  heading,
  intro,
  cards,
  footnote,
  rings = true,
  glow = false,
}: {
  eyebrow?: string
  eyebrowTone?: 'onLight' | 'onAccent' | 'ink' | 'white'
  heading: ReactNode
  intro?: string
  cards: readonly StaggeredCard[]
  footnote?: string
  rings?: boolean
  glow?: boolean
}) {
  return (
    <Section tone="none" spacing="none" className="relative overflow-hidden py-4xl text-on-light">
      {(rings || glow) && (
        /*
          z-0, not a negative index — a negative-z child paints behind its own
          section's background, which is how this went invisible the first time.
        */
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {rings &&
            [-1.5, -0.5, 0.5, 1.5].map((n) => (
              <span
                key={n}
                className="absolute top-1/2 size-[860px] -translate-y-1/2 rounded-full border border-on-light/[0.08]"
                style={{ left: `calc(50% + ${n * 460}px)`, marginLeft: -430 }}
              />
            ))}
          {glow && (
            <span className="approach-glow absolute left-1/2 top-1/2 h-[500px] w-[1240px] -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-4xl">
        <Reveal>
          <div className="mx-auto flex max-w-[846px] flex-col items-center gap-md text-center">
            {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
            <Typography variant="h2" className="text-h3 md:text-h2">
              {heading}
            </Typography>
            {intro && (
              <Typography variant="copyLarge" muted>
                {intro}
              </Typography>
            )}
          </div>
        </Reveal>

        <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.title} index={i} className={cn(i % 2 === 1 && 'lg:mt-[243px]')}>
              <div className="flex aspect-square flex-col justify-between rounded-md bg-white p-lg">
                <div className="flex items-baseline gap-sm">
                  {card.number && (
                    <Typography variant="copyLarge" as="span" className="opacity-subtle">
                      {card.number}
                    </Typography>
                  )}
                  <Typography variant="copyLarge" as="h3">
                    {card.title}
                  </Typography>
                </div>
                <Typography variant="copyMedium" muted>
                  {card.body}
                </Typography>
              </div>
            </Reveal>
          ))}
        </div>

        {footnote && (
          <Reveal index={4}>
            <Typography variant="copyMedium" muted className="mx-auto max-w-[846px] text-center">
              {footnote}
            </Typography>
          </Reveal>
        )}
      </div>
    </Section>
  )
}
