import { Container, HeroIntro, Reveal, Section, Typography } from '@/components'
import { cn } from '@/lib/cn'

/**
 * The three sections the industry sub-pages introduce.
 *
 * Figma: the "3.2 Financial Services & Insurance" artboard, node 3162:283 —
 * the one drawn in full. Everything else on that page is a section that
 * already existed for the service pages.
 */

/* ------------------------------------------------------------------ *
 * Hero band — Figma nodes 3614:6575 (ground) and 3614:6584 (copy)
 * ------------------------------------------------------------------ */

/**
 * A full-bleed 880px band with the page title centred on it. No eyebrow, no
 * CTA, no photograph — the gradient is the whole treatment.
 *
 * The copy block is centred on the page (x=303, 834 wide, so 303 + 834/2 =
 * 720) and starts at y=301, which is 261 below the 40px navigation. The
 * heading's own measure is 800 while the body's is the full 834, so the two
 * are separate widths rather than one column.
 */
export function IndustryHero({
  heading,
  body,
  gradient,
  tone = 'onLight',
}: {
  heading: string
  body: string
  /** A full `linear-gradient(...)`; see `gradients` in tokens. */
  gradient: string
  /**
   * Four of the five bands run cream-to-warm and carry ink type. Real Estate
   * mirrors b4, whose ink end lands top-left, so that one is light type —
   * `#f5f6f6` on the artboard (node 3614:7138), with the body at 80%.
   */
  tone?: 'onLight' | 'onDark'
}) {
  return (
    <HeroIntro>
      {/* Fades up on load; see HeroIntro. */}
      <Section
        tone="none"
        spacing="none"
        bare
        className={cn(
          'relative overflow-hidden',
          tone === 'onDark' ? 'text-on-dark' : 'text-on-light',
        )}
      >
        <div aria-hidden className="absolute inset-0 z-0" style={{ backgroundImage: gradient }} />
        <Container className="relative z-10 flex min-h-[880px] flex-col justify-center">
          <Reveal>
            <div className="mx-auto flex max-w-[834px] flex-col items-center gap-lg text-center">
              <Typography variant="h1" className="max-w-[800px] text-h2 md:text-h1">
                {heading}
              </Typography>
              <Typography variant="copyLarge" muted>
                {body}
              </Typography>
            </div>
          </Reveal>
        </Container>
      </Section>
    </HeroIntro>
  )
}

/* ------------------------------------------------------------------ *
 * Statement — Figma node 3614:6587
 * ------------------------------------------------------------------ */

/**
 * One paragraph over a 954px measure, left-aligned, with nothing around it.
 * The artboard sets it as a single text run — the opening sentence reads as a
 * heading but is not one, so this is a `<p>`, not an `<h2>` with a body under
 * it.
 *
 * `h3` type, not `subHeaderLarge`: 40px SemiBold on 1.2 (node 3614:5656).
 * Both give 48px line boxes, which is why the block heights looked right on the
 * first pass — but 32px fits far more characters per line, and every one of the
 * five pages came out one or two lines short of the artboard. Measured, not
 * eyeballed.
 */
export function Statement({ children }: { children: string }) {
  return (
    <Section
      tone="none"
      spacing="none"
      /* 160 above: the hero band is flush at 880 and the copy starts at 1040. */
      className="pb-4xl pt-[calc(theme(spacing.4xl)*2)] text-on-light"
    >
      <Reveal>
        <Typography variant="h3" as="p" className="max-w-[954px]">
          {children}
        </Typography>
      </Reveal>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * Stat band — Figma node 3614:6901
 * ------------------------------------------------------------------ */

export type IndustryStat = { value: string; body: string }

/**
 * A heading on the left with proof numbers to the right of it.
 *
 * The grid is the Packaging one: four 302px columns on a 326px pitch (4 x 302
 * + 3 x 24 = 1280). The heading spans the first two and the stats take the
 * last two, which is why they start at x=652 and x=978 on the artboard rather
 * than anywhere on the 12-column grid. The stats need no explicit start: with
 * the heading spanning two columns they flow into three and four on their own.
 *
 * Numerals are `h2`, the same 58px line box as the heading beside them, so the
 * three tops align.
 */
export function StatBand({ heading, stats }: { heading: string; stats: readonly IndustryStat[] }) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-4">
        <Reveal className="lg:col-span-2">
          <Typography variant="h2" className="max-w-[519px] text-h3 md:text-h2">
            {heading}
          </Typography>
        </Reveal>
        {stats.map((stat, i) => (
          <Reveal key={stat.value} index={i + 1}>
            {/* 74 - 58 = 16 between the numeral and its line of proof. */}
            <div className="flex flex-col gap-md">
              <Typography variant="h2" as="p" className="text-h3 md:text-h2">
                {stat.value}
              </Typography>
              <Typography variant="copyMedium" muted>
                {stat.body}
              </Typography>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
