import type { ReactNode } from 'react'
import {
  Container,
  Eyebrow,
  HeroIntro,
  HeroStats,
  Reveal,
  Section,
  Testimonial,
  Typography,
  ValuesMarquee,
  type HeroStat,
  type TestimonialQuote,
} from '@/components'
import { PageShell } from '@/components/layout'
import { asset } from '@/lib/asset'

/**
 * The case study template — Figma "4.4 Casestudy", node 2887:7099.
 *
 * Built as components rather than one page because every case study runs the
 * same eleven slots in the same order; a study is its copy and its six images.
 * Ferry Pay is the one the artboard draws in full.
 *
 * The page rhythm is a flat 160 between every section, so each block carries
 * `py-4xl` and the two that follow a flush full-bleed band carry 160 on top
 * instead.
 */

/* ------------------------------------------------------------------ *
 * Shell
 * ------------------------------------------------------------------ */

export function CaseStudyPage({
  children,
  testimonial,
}: {
  children: ReactNode
  testimonial: TestimonialQuote
}) {
  return (
    <PageShell headerTone="onLight">
      <div className="bg-surface">
        {children}
        {/*
          240 between the closing figure and the quote (8160 -> 8400), of which
          the figure supplies 80 and `Testimonial`'s loose rhythm 120.
        */}
        <div className="pt-2xl">
          <Testimonial {...testimonial} glow spacing="loose" />
        </div>
        <ValuesMarquee />
      </div>
    </PageShell>
  )
}

/* ------------------------------------------------------------------ *
 * Hero — Figma nodes 2887:7158 (copy), 3707:10938 (stats), 2887:7169 (band)
 * ------------------------------------------------------------------ */

/**
 * Eyebrow, name, one-line claim, the proof numbers, then a full-bleed 1440x800
 * photograph. Dark type on cream — the band sits below the copy, not behind it.
 *
 * The stats are `HeroStats`, the same block Culture's hero uses, at the client's
 * request. See that file for why the alignment is the grid's and not the
 * artboard's.
 */
export function CaseHero({
  sector,
  name,
  claim,
  stats,
  image,
  imageAlt,
}: {
  /** The industry pill — "Fintech" on Ferry Pay. */
  sector: string
  name: string
  claim: string
  stats: readonly HeroStat[]
  image: string
  imageAlt: string
}) {
  return (
    <HeroIntro>
      {/* Fades up on load; see HeroIntro. */}
      <Section tone="none" spacing="none" bare className="relative text-on-light">
        <Container className="flex flex-col gap-2xl pt-[232px]">
          <Reveal>
            <div className="flex max-w-[834px] flex-col items-start gap-md">
              <Eyebrow tone="slate">{sector}</Eyebrow>
              <Typography variant="h1" className="max-w-[800px] text-h2 md:text-h1">
                {name}
              </Typography>
              <Typography variant="copyLarge" muted>
                {claim}
              </Typography>
            </div>
          </Reveal>
          <HeroStats stats={stats} />
        </Container>

        {/* 40 below the stats, then full-bleed. */}
        <div className="pt-2xl">
          <img
            src={asset(image)}
            alt={imageAlt}
            className="aspect-[1440/800] w-full object-cover"
          />
        </div>
      </Section>
    </HeroIntro>
  )
}

/* ------------------------------------------------------------------ *
 * Full-bleed band — Figma nodes 2887:7188, 2894:10909
 * ------------------------------------------------------------------ */

/** A photograph the full width of the page, between two content sections. */
export function CaseBand({
  image,
  alt,
  /** 1440x800 on the artboard, 1440x804 for the second one. */
  ratio = '1440/800',
}: {
  image: string
  alt: string
  ratio?: string
}) {
  return (
    <Section tone="none" spacing="none" bare className="py-4xl">
      <Reveal>
        <img
          src={asset(image)}
          alt={alt}
          className="w-full object-cover"
          style={{ aspectRatio: ratio }}
        />
      </Reveal>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * Two-up gallery — Figma node 3707:10934
 * ------------------------------------------------------------------ */

/** Two 628x515 frames side by side inside the content column. */
export function CaseGallery({ images }: { images: readonly { src: string; alt: string }[] }) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="grid gap-lg md:grid-cols-2">
        {images.map((image, i) => (
          <Reveal key={image.src} index={i}>
            <img
              src={asset(image.src)}
              alt={image.alt}
              className="aspect-[628/515] w-full rounded-md object-cover"
            />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * Inset figure — Figma node 2887:7296
 * ------------------------------------------------------------------ */

/** A 1280x711 frame in the content column rather than full-bleed. */
export function CaseFigure({ image, alt }: { image: string; alt: string }) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <Reveal>
        <img
          src={asset(image)}
          alt={alt}
          className="aspect-[1280/711] w-full rounded-md object-cover"
        />
      </Reveal>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * The challenge — Figma node 2887:7171
 * ------------------------------------------------------------------ */

export type CasePoint = { title: string; body: string }

/**
 * A header block on four columns with a rule-separated list on five.
 *
 * The list column starts at x=761 of the content width — column 8 of 12 — and
 * each row is title, 16, body, then 24 above and below its rule.
 */
export function CaseChallenge({
  eyebrow,
  heading,
  points,
}: {
  eyebrow: string
  heading: string
  points: readonly CasePoint[]
}) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="grid items-start gap-lg lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="flex max-w-[411px] flex-col items-start gap-lg">
            <Eyebrow tone="onLight">{eyebrow}</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              {heading}
            </Typography>
          </div>
        </Reveal>

        <Reveal index={1} className="lg:col-span-5 lg:col-start-8">
          <ul className="flex flex-col divide-y divide-divider">
            {points.map((point) => (
              <li key={point.title} className="flex flex-col gap-md py-lg first:pt-0 last:pb-0">
                <Typography variant="copyLarge" as="h3" className="leading-[1.3]">
                  {point.title}
                </Typography>
                <Typography variant="copyMedium" muted>
                  {point.body}
                </Typography>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * The solution — Figma node 2887:7192
 * ------------------------------------------------------------------ */

/**
 * A header on six columns with a paragraph on five, then the roles deployed as
 * a three-across grid that wraps to a second row.
 *
 * ⚠ The artboard's role grid is 894 wide with an 87px gutter, which is off the
 * 8-based spacing scale; this uses the nearest token (80), the same call the
 * footer's 96px gutter got. Cards come out 244.67 against 240.
 *
 * The paragraph is offset 45 from the top on the artboard so it aligns with the
 * heading rather than the eyebrow above it.
 */
export function CaseSolution({
  eyebrow,
  heading,
  body,
  roles,
}: {
  eyebrow: string
  heading: string
  body: string
  roles: readonly CasePoint[]
}) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      {/* 160 between the header and the roles grid (165 -> 325), 80 between
          the grid's two rows. */}
      <div className="flex flex-col gap-[calc(theme(spacing.4xl)*2)]">
        <div className="grid items-start gap-lg lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <div className="flex max-w-[628px] flex-col items-start gap-lg">
              <Eyebrow tone="onLight">{eyebrow}</Eyebrow>
              <Typography variant="h2" className="text-h3 md:text-h2">
                {heading}
              </Typography>
            </div>
          </Reveal>
          <Reveal index={1} className="lg:col-span-5 lg:col-start-8 lg:pt-[45px]">
            <Typography variant="copyMedium" muted className="max-w-[519px]">
              {body}
            </Typography>
          </Reveal>
        </div>

        <ul className="grid max-w-[894px] gap-x-4xl gap-y-4xl md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, i) => (
            <li key={role.title}>
              <Reveal index={i}>
                <div className="flex flex-col gap-md">
                  <Typography variant="copyLarge" as="h3" className="leading-[1.3]">
                    {role.title}
                  </Typography>
                  <Typography variant="copyMedium" muted>
                    {role.body}
                  </Typography>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * Our impact — Figma node 2887:7219
 * ------------------------------------------------------------------ */

export type CaseOutcome = { claim: string; body: string }

/**
 * A header, then the outcomes as a rule-separated list: the headline number on
 * the left, what produced it on the right.
 *
 * ⚠ The artboard's rows are hand-placed, not auto-laid-out — the pitch runs
 * 144, 144, 144, 144, 144, 120, 120 with no relation to the body height inside
 * (two of the seven bodies are three lines, and they are not the tall rows).
 * Built as a regular list at 40 above and below instead, which lands the block
 * at 952 against the artboard's 960.
 *
 * The list is inset to column 5 and runs to the right edge, which is where the
 * artboard's 880-wide rules sit.
 */
export function CaseImpact({
  eyebrow,
  heading,
  outcomes,
}: {
  eyebrow: string
  heading: string
  outcomes: readonly CaseOutcome[]
}) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      {/*
        The artboard's header-to-list gap is 107, between the 80 and 120 tokens.
        120 is the one that lands the section on the artboard's 1232 (+4) and
        keeps everything below it where the artboard has it; 80 came out -36.
      */}
      <div className="flex flex-col gap-5xl">
        <Reveal>
          <div className="flex max-w-[676px] flex-col items-start gap-lg">
            <Eyebrow tone="onLight">{eyebrow}</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              {heading}
            </Typography>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12">
          <ul className="flex flex-col lg:col-span-8 lg:col-start-5">
            {outcomes.map((outcome, i) => (
              <li key={outcome.claim} className="border-t border-divider last:border-b">
                <Reveal index={i}>
                  <div className="grid gap-x-2xl gap-y-md py-2xl md:grid-cols-[minmax(0,1fr)_320px]">
                    <Typography variant="subHeaderSmall" as="h3" className="leading-[1.2]">
                      {outcome.claim}
                    </Typography>
                    <Typography variant="copyMedium" muted>
                      {outcome.body}
                    </Typography>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
