import type { CSSProperties, ReactNode } from 'react'
import { FaqSection, Testimonial, ValuesMarquee } from '@/components'
import { PageShell } from '@/components/layout'
import { palette } from '@/tokens'
import type { AccordionItem } from '@/components'
import type { TestimonialQuote } from '@/components/Testimonial'

/**
 * The shell shared by the service pages and the industry sub-pages: one ground
 * behind the whole body, then the FAQ, an optional testimonial, and the values
 * marquee. A page is its own sections plus this.
 *
 * Was `ServicePage`, taking a required testimonial and hard-coding the service
 * gradient. The Financial Services artboard (3162:283) has no testimonial and
 * a flat cream body under an 880px hero band, so both are now props.
 */

/**
 * The service pages' body ground. Sampled down the artboard's left gutter,
 * landing on three exact ramp values, as on Industries, Contact and Careers:
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

export type ContentPageProps = {
  /** Everything above the FAQ. */
  children: ReactNode
  faq: readonly AccordionItem[]
  /** Omitted on the industry pages, which do not draw one. */
  testimonial?: TestimonialQuote
  /**
   * The body ground. Defaults to the service pages' vertical gradient; the
   * industry pages pass nothing and paint cream, because their hero band
   * carries the colour instead.
   */
  ground?: CSSProperties
}

export function ContentPage({
  children,
  faq,
  testimonial,
  ground = { backgroundImage: SERVICE_GRADIENT },
}: ContentPageProps) {
  return (
    <PageShell headerTone="onLight">
      <div style={ground}>
        {children}
        <FaqSection items={faq} />
        {testimonial && <Testimonial {...testimonial} />}
        <ValuesMarquee />
      </div>
    </PageShell>
  )
}

export default ContentPage
