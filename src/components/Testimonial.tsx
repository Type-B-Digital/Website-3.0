import { cn } from '@/lib/cn'
import Eyebrow from './Eyebrow'
import Reveal from './Reveal'
import Section from './Section'
import Typography from './Typography'

/**
 * Centred pull-quote on an 800px column.
 *
 * Figma: node 3617:9100 (Contact), 3679:10598 (Culture), 3605:2227 (service
 * pages) — the same block on all three.
 *
 * ⚠ Was three copies. Consolidated 2026-09-04; only the section rhythm and the
 * Contact page's warm bloom differed, so both are props.
 *
 * The quote is ink (`text-on-light`) and always has been, so this block always
 * wants a light ground — but it shipped with `tone="none"`, taking whatever an
 * ancestor happened to paint. That worked on the three pages where an ancestor
 * painted cream and failed silently on the two where none did: on Culture the
 * crossfade above it ends on deep turquoise and the section fell through to the
 * body's ink canvas, and Contact did the same. Both rendered `rgb(4, 14, 25)`
 * type on an `rgb(4, 14, 25)` ground — the quote was not dim, it was invisible.
 *
 * So `light` is the DEFAULT, not an opt-in. Inheriting was the bug: three of
 * the five call sites were only correct by the accident of an ancestor, and
 * three of them — Culture, Contact, and every page built on `ContentPage`
 * (Advisory, Product & AI Development, Teams) — were rendering the quote
 * invisibly. Measured on each: ground and text both `rgb(4, 14, 25)`, a
 * luminance gap of 0.
 *
 * Painting the ground here is a no-op on the sites that were already correct,
 * because the cream an ancestor gave them is the same `bg-surface` this paints.
 * `none` stays available for a caller that genuinely owns its own ground — a
 * section inside a crossfade, say — but it has to be asked for now.
 */

export type TestimonialQuote = {
  quote: string
  name: string
  role: string
}

export function Testimonial({
  quote,
  name,
  role,
  /**
   * The 1248px warm blob behind the Contact page's copy (node 3617:9101),
   * isolated by subtracting the fitted page gradient from the artboard pixels.
   */
  glow = false,
  spacing = 'tight',
  tone = 'light',
}: TestimonialQuote & {
  glow?: boolean
  /** `tight` is the 80/80 service rhythm; `loose` the 120/120 one. */
  spacing?: 'tight' | 'loose'
  /**
   * `light` paints the cream this block's ink type needs, and is the default.
   * `none` inherits an ancestor's — only correct where one is actually
   * painted, which is the assumption that broke three pages.
   */
  tone?: 'none' | 'light'
}) {
  return (
    <Section
      tone={tone}
      spacing="none"
      className={cn(
        'relative text-on-light',
        spacing === 'loose' ? 'py-5xl' : 'py-4xl',
      )}
    >
      {/*
        `z-0`, not `-z-10`. `Section` is `relative` with `z-index: auto`, so it
        opens no stacking context and a negatively-stacked child paints behind
        its parent's own background — which was invisible while the section was
        transparent and would have silently swallowed the bloom the moment
        `tone="light"` gave it one. At `z-0` under `relative z-10` content the
        result is identical on a transparent ground and correct on a painted
        one.
      */}
      {glow && (
        <div aria-hidden className="testimonial-glow pointer-events-none absolute inset-0 z-0" />
      )}
      <Reveal className="relative z-10">
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-lg text-center">
          <Eyebrow tone="white">Testimonial</Eyebrow>
          <div className="flex flex-col items-center gap-2xl">
            {/* 32px Medium, not the Regular that subHeaderLarge carries. */}
            <Typography variant="subHeaderLarge" as="p" className="font-medium">
              {quote}
            </Typography>
            <div className="text-ink-soft">
              <Typography variant="copyMedium" as="p" className="font-semibold">
                {name}
              </Typography>
              <Typography variant="copyMedium" as="p">
                {role}
              </Typography>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export default Testimonial
