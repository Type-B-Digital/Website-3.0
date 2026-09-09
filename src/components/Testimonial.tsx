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
 * `light` was the DEFAULT for two days as a result. That fixed the invisible
 * quote and introduced a second, quieter fault: on every page whose body is a
 * GRADIENT — Advisory, Product & AI Development, Teams, Contact — a flat
 * `#F6F2EC` band was being painted straight across it, reading as a white
 * stripe interrupting the page. Measured behind each call site:
 *
 *   /our-work            ancestor rgb(246, 242, 236)   flat cream, no-op
 *   /our-work/ferry-pay  ancestor rgb(246, 242, 236)   flat cream, no-op
 *   /advisory            ancestor linear-gradient(…)   BAND
 *   /product-development ancestor linear-gradient(…)   BAND
 *   /teams               ancestor linear-gradient(…)   BAND
 *   /contact             ancestor linear-gradient(…)   BAND
 *   /culture             ancestor rgb(4, 14, 25)       ink — needs a ground
 *
 * So the default is `none` again, and the ground is the PAGE's job. Six of the
 * seven call sites already paint one and now show it through; Culture is the
 * one that did not, and its tail is wrapped in `bg-surface` there instead of
 * every section on the site carrying its own band. That keeps the fix where
 * the fault is: the quote is ink, so a page that ends on ink has to say what
 * the quote sits on.
 *
 * The glow is on by default for the same reason — it is the treatment the
 * design gives this block everywhere it appears over a gradient, and passing
 * it per call site is how three pages ended up without it.
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
  glow = true,
  spacing = 'tight',
  tone = 'none',
}: TestimonialQuote & {
  glow?: boolean
  /** `tight` is the 80/80 service rhythm; `loose` the 120/120 one. */
  spacing?: 'tight' | 'loose'
  /**
   * `none` inherits the page's ground and is the default — this block's ink
   * type needs a light one, and every page that draws it paints one. `light`
   * paints flat cream, which is only right where the page ground IS flat
   * cream; over a gradient it reads as a band.
   */
  tone?: 'none' | 'light'
}) {
  return (
    <Section
      tone={tone}
      spacing="none"
      className={cn('relative text-on-light', spacing === 'loose' ? 'py-5xl' : 'py-4xl')}
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
          <Eyebrow tone="cream">Testimonial</Eyebrow>
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
