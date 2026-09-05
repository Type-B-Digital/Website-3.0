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
}: TestimonialQuote & {
  glow?: boolean
  /** `tight` is the 80/80 service rhythm; `loose` the 120/120 one. */
  spacing?: 'tight' | 'loose'
}) {
  return (
    <Section
      tone="none"
      spacing="none"
      className={cn(
        'relative text-on-light',
        spacing === 'loose' ? 'py-5xl' : 'py-4xl',
      )}
    >
      {glow && (
        <div aria-hidden className="testimonial-glow pointer-events-none absolute inset-0 -z-10" />
      )}
      <Reveal>
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
