import { cn } from '@/lib/cn'
import Marquee from './Marquee'
import Typography from './Typography'

/**
 * The brand values marquee that closes every page above the CTA band.
 *
 * Figma: node 3390:26810 on the homepage, repeated verbatim on What We Do
 * (3604:1339), Industries (2894:14556), Contact (3617:9112), Careers
 * (2767:2100), Culture (3679:10606) and each service artboard.
 *
 * ⚠ This existed as six near-identical copies, one per page, differing only in
 * the accent shade and whether the wrapper painted its own ground. Consolidated
 * 2026-09-04; the differences are now the two props.
 *
 * Spacing is part of the component because it is part of the artboard: 240
 * above (the preceding section supplies 80 of it) and 16 below, which is the
 * gap to the CTA band on every artboard that draws both.
 */

export const VALUES = [
  'Wise',
  'Curious',
  'Reliable',
  'Relentless',
  'Adaptable',
  'Optimistic',
  'Approachable',
] as const

/** `deep` is the type colour on cream; `soft` is the one used on the warm ground. */
export type ValuesMarqueeTone = 'deep' | 'soft'

const toneClasses: Record<ValuesMarqueeTone, string> = {
  deep: 'text-accent-300',
  soft: 'text-accent-800',
}

export function ValuesMarquee({
  tone = 'deep',
  className,
}: {
  tone?: ValuesMarqueeTone
  /** For a page that needs the strip to paint its own ground (Culture). */
  className?: string
}) {
  return (
    <div className={cn('pb-md pt-[calc(theme(spacing.4xl)*2)]', className)}>
      <Marquee speed="marqueeSlow" gapClassName="gap-lg" className={toneClasses[tone]}>
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
  )
}

export default ValuesMarquee
