import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CloseIcon,
  Eyebrow,
  HeroIntro,
  Reveal,
  Section,
  Typography,
  ValuesMarquee,
} from '@/components'
import { PageShell } from '@/components/layout'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'
import { gradients } from '@/tokens'
import {
  CARDS,
  FILTERS,
  type PublicationCard,
  type PublicationFilter,
} from './publications-content'

/**
 * Publications — Figma node 2887:9631 ("8. Blog")
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2887-9631
 *
 * The destination the footer and the nav panel have been pointing at since
 * 2026-09-06, when both were given a `/publications` link ahead of the page —
 * the one deliberate dead link on the site. It is no longer dead.
 *
 * Header, closing CTA and footer come from PageShell. The header runs
 * navigation-light: the artboard draws its links in ink (#030A12) over a light
 * ground, as on Industries and What We Do.
 *
 * Copy, and which cards are real, live in `publications-content.ts`.
 */

/**
 * The body ground — Figma paints it on the page frame, `linear-gradient(107deg,
 * #C9D5D3 0%, #F7DDC1 100%)`. Both stops are exact ramp values (turquoise.100
 * and amber.100), so this is the whole gradient rather than a fit.
 *
 * It runs to the values marquee and stops there: the CTA band below it paints
 * its own photograph and the footer its own ink.
 */
const PAGE_GRADIENT = gradients.page.publications

/* ================================================================== *
 * THE CARD
 * ================================================================== */

/**
 * A scrim behind the category label, and only behind it.
 *
 * ⚠ This is the one addition to the card. The artboard lays the label straight
 * onto the photograph in paper, and measured against the rendered pixels under
 * its own box it fails on all six cards — 1.25:1 to 2.27:1 in the worst local
 * block, against the 4.5 that 16px regular needs. It is the same ink-on-ink
 * class of defect that was fixed across the site on 2026-09-06, drawn here
 * rather than inherited.
 *
 * A colour swap cannot fix it. Two of the cards (Teams, Operational Rescue)
 * have a hard light-to-dark edge running through the label's box, so ink fails
 * there too (1.39 and 1.12) — neither colour reads on both sides of the edge.
 *
 * A full-card scrim was tried and rejected: it drops the two ink HEADLINES,
 * which are correct as drawn, to 4.19 and 4.54. So this one is the design's
 * own `scrim-strong` (ink at 80%) across the label band, and gone by 55% —
 * still 40px clear of the highest headline, so the headline half of every card
 * is untouched.
 *
 * The four stops are a falloff curve, not a ramp. Two stops put a visible
 * horizontal edge across the pale cards where the gradient ran out; holding
 * the strength through the label and then decaying fast reads as shading on
 * the photograph instead.
 */
const LABEL_SCRIM =
  'linear-gradient(to bottom, rgba(4, 14, 25, 0.8) 0%, rgba(4, 14, 25, 0.72) 14%,' +
  ' rgba(4, 14, 25, 0.28) 32%, rgba(4, 14, 25, 0) 55%)'

/**
 * One publication tile — Figma nodes 3752:439 to 3752:444.
 *
 * 417x341 (a 858 grid, two columns, 24 gutter), 8px radius, the photograph
 * full-bleed behind it and nothing between the two. Inside, a 293-tall column
 * inset 24 on every side with the category at the top and the headline at the
 * bottom: the artboard writes that as 257-287px of padding-top against a
 * fixed-height child, which resolves to the same 24px inset once the child
 * overflows its content box.
 *
 * Headline colour comes from the card and is the artboard's own; the category
 * label keeps the artboard's paper but gains the scrim below it. Both are
 * measured rather than chosen — see the table in `publications-content.ts`.
 */
function PublicationTile({ card, index }: { card: PublicationCard; index: number }) {
  const body = (
    <>
      <img src={asset(card.image)} alt="" className="absolute inset-0 size-full object-cover" />
      <div aria-hidden className="absolute inset-0" style={{ backgroundImage: LABEL_SCRIM }} />
      {/* 24 on every side; category top, headline bottom. */}
      <div className="absolute inset-0 flex flex-col justify-between p-lg">
        <Typography variant="copyMedium" as="p" className="text-paper">
          {card.category}
        </Typography>
        <Typography
          variant="copyLarge"
          as="h2"
          className={card.titleTone === 'ink' ? 'text-on-light' : 'text-paper'}
        >
          {card.title}
        </Typography>
      </div>
    </>
  )

  const shell = 'relative block w-full overflow-hidden rounded-md aspect-[417/341]'

  return (
    <Reveal index={index}>
      {card.slug ? (
        <Link
          to={`/publications/${card.slug}`}
          className={cn(
            shell,
            'transition-opacity duration-fast ease-out hover:opacity-80 focus-visible:opacity-80',
          )}
        >
          {body}
        </Link>
      ) : (
        /*
         * No article behind it yet, so it is not a link. An inert card beats
         * one that 404s — the rule the nav and footer have followed all along.
         */
        <div className={shell}>{body}</div>
      )}
    </Reveal>
  )
}

/* ================================================================== *
 * SECTIONS
 * ================================================================== */

/** Node 2887:9804 — chip, 72px title, 20px standfirst, all left on the margin. */
function Hero() {
  return (
    <HeroIntro>
      <div className="flex flex-col items-start gap-md">
        <Eyebrow tone="ink">Blog</Eyebrow>
        <Typography variant="h1" className="max-w-[800px] text-h2 md:text-h1">
          Publications
        </Typography>
        <Typography variant="copyLarge" muted className="max-w-[834px] tracking-[-0.01em]">
          Practical writing on AI, delivery, and the decisions in between, from the people doing the
          work.
        </Typography>
      </div>
    </HeroIntro>
  )
}

/**
 * The filter rail — Figma node 2887:9854. A 14px SemiBold label at 48% over
 * eight 16px rows on a 16 gap, in a 323 column.
 *
 * ⚠ The artboard draws no selected state, no reset and no empty result, so the
 * behaviour here is authored: a row toggles, the active row takes the
 * ink-and-underline treatment the nav panel already uses to mark the page you
 * are on (node 3729:3602) rather than a new one, and an explicit X appears
 * beside it to clear the selection. Two of the eight filters match no article
 * — see FILTERS.
 *
 * The X is a second control rather than a hint on the first: clicking the
 * active row also clears it, but nothing on screen said so, which left the
 * grid filtered with no visible way back. It is a sibling of the row's button
 * rather than a child, because a button cannot nest inside a button.
 *
 * The "Filter" label is an `Eyebrow` chip. The artboard draws it as bare
 * 48%-opacity text; chips are the site-wide treatment for a section label, and
 * this and the article page's "Outline" were the only two drawn any other way.
 */
function FilterRail({
  active,
  onToggle,
  onClear,
}: {
  active: PublicationFilter | null
  onToggle: (filter: PublicationFilter) => void
  onClear: () => void
}) {
  return (
    <div className="flex flex-col gap-md">
      <div>
        <Eyebrow tone="onLight">Filter</Eyebrow>
      </div>
      <ul className="flex flex-col gap-md">
        {FILTERS.map((filter) => {
          const selected = filter === active
          return (
            <li key={filter} className="flex items-center gap-sm">
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => onToggle(filter)}
                className={cn(
                  'text-left transition-opacity duration-fast ease-out',
                  selected ? 'underline' : 'opacity-muted hover:opacity-full',
                )}
              >
                <Typography variant="copyMedium" as="span">
                  {filter}
                </Typography>
              </button>
              {selected && (
                <button
                  type="button"
                  onClick={onClear}
                  aria-label={`Clear the ${filter} filter`}
                  className="flex size-lg shrink-0 items-center justify-center rounded-full transition-opacity duration-fast ease-out hover:opacity-muted"
                >
                  <CloseIcon className="size-md" />
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Rail and grid — Figma nodes 2887:9854 and 3752:445.
 *
 * The split is exact rather than columnar: 323 rail + 99 gap + 858 grid is the
 * 1280 content width, but none of the three lands on the 12-column grid. Held
 * as literals for that reason. The rail stacks above the grid below `lg`.
 */
function Index() {
  const [active, setActive] = useState<PublicationFilter | null>(null)
  const shown = active ? CARDS.filter((card) => card.category === active) : CARDS

  return (
    <div className="grid gap-2xl lg:grid-cols-[323px_minmax(0,1fr)] lg:gap-x-[99px]">
      <FilterRail
        active={active}
        onToggle={(filter) => setActive((current) => (current === filter ? null : filter))}
        onClear={() => setActive(null)}
      />

      {shown.length > 0 ? (
        <ul className="grid gap-lg sm:grid-cols-2">
          {shown.map((card, i) => (
            <li key={`${card.category}-${card.title}`}>
              <PublicationTile card={card} index={i} />
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="copyLarge" muted>
          Nothing published under {active} yet.
        </Typography>
      )}
    </div>
  )
}

export function PublicationsPage() {
  return (
    <PageShell headerTone="onLight">
      <div style={{ backgroundImage: PAGE_GRADIENT }}>
        {/* 232 to the chip, then 80 down to the rail and the grid. */}
        <Section tone="none" spacing="none" className="pb-4xl pt-[232px] text-on-light">
          <div className="flex flex-col gap-4xl">
            <Hero />
            <Index />
          </div>
        </Section>
        <ValuesMarquee />
      </div>
    </PageShell>
  )
}

export default PublicationsPage
