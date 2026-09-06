import { Link } from 'react-router-dom'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'
import Button from './Button'
import Reveal from './Reveal'
import Section from './Section'
import Typography from './Typography'

/**
 * "We're Hiring!" — a square photograph beside the trait list.
 *
 * Figma: node 3617:9086 (Contact) and 3679:10586 (Culture), identical.
 *
 * ⚠ Was two copies. Consolidated 2026-09-04.
 */

export const HIRING_TRAITS = [
  'Confident, not arrogant.',
  'Kind and approachable.',
  'Chill and creative.',
  'Sharp, modern, and thoughtful.',
  'High-caliber, but still human.',
  'Elegant solving hard problems.',
  'Relentless in your pursuit of excellence.',
] as const

/**
 * `tone="light"`, not `none`. This block's type is ink, and with `none` it took
 * whatever an ancestor painted — which on both of its call sites, Culture and
 * Contact, was nothing, so it fell through to the body's ink canvas and
 * rendered "We're Hiring!" at `rgb(4, 14, 25)` on `rgb(4, 14, 25)`. The same
 * defect `Testimonial` had, found while fixing that one.
 */
export function Hiring({ className }: { className?: string }) {
  return (
    <Section tone="light" spacing="none" className={cn('text-on-light', className ?? 'py-5xl')}>
      <div className="grid items-start gap-lg lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <img
            src={asset('/images/hiring.jpg')}
            alt="A Type B engineer working from a plant-filled studio"
            className="aspect-square w-full rounded-md object-cover"
          />
        </Reveal>

        {/* Copy column starts at x=845 of the content width — column 8. */}
        <Reveal index={1} className="lg:col-span-5 lg:col-start-8">
          <div className="flex flex-col items-start gap-2xl">
            <Typography variant="h2" className="text-h3 md:text-h2">
              We’re Hiring!
            </Typography>
            <div className="flex flex-col gap-md">
              <Typography variant="copyMedium" muted>
                If you are:
              </Typography>
              {/* A list, because it is one — the artboard's line breaks are the items. */}
              <ul className="flex flex-col">
                {HIRING_TRAITS.map((trait) => (
                  <li key={trait}>
                    <Typography variant="subHeaderSmall" as="span">
                      {trait}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
            <Button as={Link} to="/careers" variant="secondary" tone="onLight">
              Come work with us!
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

export default Hiring
