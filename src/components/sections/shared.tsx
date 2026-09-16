import type { ReactNode } from 'react'
import { Eyebrow, Reveal, Section, Typography } from '@/components'
import type { EyebrowTone } from '@/components'
import { cn } from '@/lib/cn'
import Glyph, { type GlyphName } from '@/components/icons/Glyph'

/**
 * Two sections that already existed on other pages and are reused across the
 * service pages, lifted here so there is one implementation of each.
 */

/* ------------------------------------------------------------------ *
 * Packaging — Figma node 3931:12654, the "three lines" redesign. (The
 * per-page boards it used to cite, 3604:1255 and 3605:2277, were dropped when
 * the file was rebuilt on 2026-09-15.)
 * ------------------------------------------------------------------ */

export type PackageTier = {
  title: string
  note: string
  items: readonly string[]
  /** The dark lead card naming the practices. */
  lead?: boolean
  /**
   * Icon above the title. Optional — a tier that does not name one falls back
   * to `TIER_GLYPHS` by title, so the three tier columns every page already
   * ships get their icon without eight call sites having to be edited.
   */
  icon?: GlyphName
}

/**
 * Which glyph each tier column gets, chosen against the tier's own note rather
 * than its name — Nabeel, 2026-09-15, "make a selection that works based on the
 * copy". The three titles are fixed across every page that uses this section,
 * so a map by title is the whole mechanism.
 *
 *   Entry     "Find out what is true…"       orientation before movement
 *   Core      "The working engagement…"      the middle of the thing
 *   Expanded  "A program we own with you."   the scope opening out
 *
 * ⚠ The redesign at node 3931:12654 still places library defaults here —
 * House_02, Heart_01, Mobile_Button — which is precisely the placeholder
 * Nabeel is describing. A house says nothing about Entry, so these are not
 * adopted. The `lead` entry has no row: it renders as the practices bar.
 *
 * A title that is not in the map keeps the old placeholder square rather than
 * falling back to a default glyph: a wrong icon is worse than an obvious gap,
 * and the gap is what tells the next person to come here and choose one. It
 * also holds the same 24px the glyph would, so an unmapped tier does not shift
 * everything below it up.
 */
const TIER_GLYPHS: Record<string, GlyphName> = {
  Entry: 'compass',
  Core: 'target',
  Expanded: 'expand',
}

/**
 * ⚠ REDESIGNED 2026-09-15 — Figma node 3931:12654, the board Nabeel's note
 * points at ("three lines sections across all relevant pages should follow the
 * redesign in Figma"). Three things moved:
 *
 *   1. THREE columns, not four. Entry / Core / Expanded sit in a row of 280px
 *      columns on a 1080 measure — 120px gutters — and "Type B Digital" is no
 *      longer one of them.
 *   2. Type B Digital was a full-width ink BAR underneath (node 3931:12695).
 *      ⚠ Removed 2026-09-16 at Eduardo's request — see the note in the JSX.
 *   3. The heading is "Entry, Core, & Expanded." — the old one opened "Three
 *      lines." and the board has dropped that sentence.
 *
 * Also from the board, smaller: the columns have no rules above and below any
 * more, and the note under each title is upright rather than italic.
 *
 * Each column is icon, title block, then items, with the items pushed to the
 * bottom so all three end on the same line whatever their copy length. Gaps
 * inside a column come off the board: icon to title 16 (4782 -> 4822 less the
 * 24px icon), title to note 8, title block to items 45, item to item 24.
 *
 * ⚠ The artboard uses icon-set instances (Chart_Line, House_02, Heart_01,
 * Mobile_Button) that are not exported, so each column used to show a grey
 * placeholder square. They are real icons now — see `TIER_GLYPHS` for the
 * selection. The names on the artboard were a placed library component's
 * defaults, not a reading of this copy, so nothing was lost by not matching
 * them: a house and a heart say nothing about Entry and Core.
 */
/** A tier's icon: the chosen glyph, or the placeholder square if none is. */
function TierMark({ tier }: { tier: PackageTier }) {
  const name = tier.icon ?? TIER_GLYPHS[tier.title]
  if (!name) {
    return (
      <span
        aria-hidden
        className={cn('size-lg rounded-sm', tier.lead ? 'bg-paper/25' : 'bg-neutral-900/15')}
      />
    )
  }
  return <Glyph name={name} className={cn('size-lg', tier.lead ? 'text-paper' : 'text-on-light')} />
}

export function Packaging({
  eyebrow = 'How we package it',
  heading = 'Entry, Core, & Expanded.',
  tiers,
  /** What We Do runs the doubled 160/160 rhythm; the service pages run 80/80. */
  spacing = 'service',
  /**
   * Teams draws this chip white (node 3605:2713) rather than the amber.100
   * `onLight` chip, because its page ground is warm and the two sit too close
   * together. Every other page keeps `onLight`.
   */
  eyebrowTone = 'onLight',
}: {
  eyebrow?: string
  heading?: ReactNode
  tiers: readonly PackageTier[]
  spacing?: 'service' | 'loose'
  eyebrowTone?: EyebrowTone
}) {
  /*
    The board splits what used to be one row of four: three tier columns, then
    a practices bar underneath. The bar has since been removed (see below), but
    callers still mark that entry `lead`, so it is filtered out here.
  */
  const columns = tiers.filter((t) => !t.lead)

  return (
    <Section
      tone="none"
      spacing={spacing === 'loose' ? 'loose' : 'none'}
      className={cn('text-on-light', spacing === 'service' && 'py-4xl')}
    >
      <div className="flex flex-col gap-4xl">
        <Reveal>
          <div className="flex max-w-[549px] flex-col items-start gap-md">
            <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              {heading}
            </Typography>
          </div>
        </Reveal>

        {/*
          The three tiers. 280px columns with 120px gutters is the board's
          1080 measure; expressed as a fraction of the track rather than as
          fixed widths, because the page is fluid and 1080 is only what it
          happens to be at 1440.
        */}
        <ul className="grid items-stretch gap-x-[11.1%] gap-y-3xl md:grid-cols-3">
          {columns.map((tier, i) => (
            <li key={tier.title}>
              <Reveal index={i} className="h-full">
                <div className="flex h-full flex-col justify-between gap-[45px]">
                  <div className="flex flex-col gap-md">
                    {/* 24px on the board — see `TierMark` for the selection. */}
                    <TierMark tier={tier} />
                    <div className="flex flex-col gap-sm">
                      <Typography variant="copyLarge" as="h3">
                        {tier.title}
                      </Typography>
                      {/* Upright since the redesign; it was italic before. */}
                      <Typography variant="copySmall" className="text-ink-soft">
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

        {/*
          ⚠ No practices bar. The board draws a full-width ink "Type B Digital"
          strip here (node 3931:12695) and this component rendered it, with the
          three practice names underneath, until Eduardo, 2026-09-16: "remove
          the bottom Type B Digital dark bar under this component on all pages
          where it exists." Removed here, so it is gone from all nine pages at
          once. Callers still mark that entry `lead` in their data; it is
          filtered out of the columns above and now simply not drawn.
        */}
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
  eyebrowTone?: 'onLight' | 'onAccent' | 'ink' | 'cream'
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
              <div className="flex aspect-square flex-col justify-between rounded-md bg-neutral-50 p-lg">
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
