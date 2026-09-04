import type { ReactNode } from 'react'
import { Accordion, Eyebrow, Marquee, Reveal, Section, Typography } from '@/components'
import { PageShell } from '@/components/layout'
import { palette } from '@/tokens'
import type { AccordionItem } from '@/components'

/**
 * The shell the three service pages share — ground, FAQ, testimonial and
 * marquee — so a page is its own sections plus its content.
 *
 * Figma: the "2.2 Product & AI Development" artboard, node 3141:2722. Advisory
 * and Teams reuse the same structure.
 */

/**
 * The body ground. Sampled down the artboard's left gutter, landing on three
 * exact ramp values, as on Industries, Contact and Careers:
 *
 *   0%      turquoise.100  #C9D5D3
 *   42.7%   neutral.50     #F6F2EC   (artboard y=3950)
 *   98.1%   amber.100      #F7DDC1   (artboard y=9075)
 *
 * Cool at the top, through the brand cream, into warm — the reverse of the
 * Contact page's run.
 */
export const SERVICE_GRADIENT =
  `linear-gradient(180deg, ${palette.turquoise[100]} 0%, ${palette.neutral[50]} 42.7%, ` +
  `${palette.amber[100]} 98.1%)`

const VALUES = [
  'Wise',
  'Curious',
  'Reliable',
  'Relentless',
  'Adaptable',
  'Optimistic',
  'Approachable',
]

export type ServicePageProps = {
  /** Everything above the FAQ. */
  children: ReactNode
  faq: readonly AccordionItem[]
  testimonial: { quote: string; name: string; role: string }
}

export function ServicePage({ children, faq, testimonial }: ServicePageProps) {
  return (
    <PageShell headerTone="onLight">
      <div style={{ backgroundImage: SERVICE_GRADIENT }}>
        {children}

        {/* Figma: node 3605:2190 — the same six-row list as Industries. */}
        <Section tone="none" spacing="none" className="py-4xl text-on-light">
          <div className="flex flex-col gap-2xl">
            <Reveal>
              <Typography variant="h2" className="text-h3 md:text-h2">
                FAQ
              </Typography>
            </Reveal>
            <Reveal index={1}>
              <Accordion items={faq} />
            </Reveal>
          </div>
        </Section>

        {/* Figma: node 3605:2227. */}
        <Section tone="none" spacing="none" className="py-4xl text-on-light">
          <Reveal>
            <div className="mx-auto flex max-w-[800px] flex-col items-center gap-lg text-center">
              <Eyebrow tone="white">Testimonial</Eyebrow>
              <div className="flex flex-col items-center gap-2xl">
                <Typography variant="subHeaderLarge" as="p" className="font-medium">
                  {testimonial.quote}
                </Typography>
                <div className="text-ink-soft">
                  <Typography variant="copyMedium" as="p" className="font-semibold">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="copyMedium" as="p">
                    {testimonial.role}
                  </Typography>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        <div className="pb-md pt-[calc(theme(spacing.4xl)*2)]">
          <Marquee speed="marqueeSlow" gapClassName="gap-lg" className="text-accent-300">
            {VALUES.map((value) => (
              <Typography key={value} variant="h1" as="span" className="whitespace-nowrap">
                {value}
                <span aria-hidden className="pl-lg opacity-muted">
                  ·
                </span>
              </Typography>
            ))}
          </Marquee>
        </div>
      </div>
    </PageShell>
  )
}
