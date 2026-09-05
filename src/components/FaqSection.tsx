import { cn } from '@/lib/cn'
import Accordion, { type AccordionItem } from './Accordion'
import Reveal from './Reveal'
import Section from './Section'
import Typography from './Typography'

/**
 * "FAQ" over an expandable list.
 *
 * Figma: node 2894:14484 (Industries), 2767:2074 (Careers), 3605:2190 (service
 * pages), 3614:6859 (Financial Services) — identical everywhere: a 48px
 * heading, 40px of air, then the rows on a 79px pitch.
 *
 * ⚠ Was three copies. Consolidated 2026-09-04. Only the ground tone and the
 * section rhythm differed.
 */
export function FaqSection({
  items,
  tone = 'onLight',
  className,
}: {
  items: readonly AccordionItem[]
  tone?: 'onLight' | 'onDark'
  /** Section padding, where a page needs something other than the 80/80 default. */
  className?: string
}) {
  const dark = tone === 'onDark'
  return (
    <Section
      tone="none"
      spacing="none"
      className={cn(dark ? 'text-on-dark' : 'text-on-light', className ?? 'py-4xl')}
    >
      <div className="flex flex-col gap-2xl">
        <Reveal>
          <Typography variant="h2" className={cn('text-h3 md:text-h2', dark && 'text-white')}>
            FAQ
          </Typography>
        </Reveal>
        <Reveal index={1}>
          <Accordion items={items} tone={tone} />
        </Reveal>
      </div>
    </Section>
  )
}

export default FaqSection
