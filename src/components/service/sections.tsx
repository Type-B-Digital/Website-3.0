import { Fragment, type ReactNode } from 'react'
import { Eyebrow, Reveal, Section, Tag, Typography } from '@/components'
import ArrowRight from '@/components/icons/ArrowRight'
import { asset } from '@/lib/asset'

/**
 * The sections shared by the three service pages — Advisory, Product & AI
 * Development, and Teams. Figma: the "2.2 Product & AI Development" artboard,
 * node 3141:2722, which is the one drawn in full; the other two reuse it.
 *
 * Everything here is data-driven, so a page is its content plus these.
 * Geometry comes from the artboard and is noted per section, because these
 * pages are dense and the alignment is what holds them together.
 */

/* ------------------------------------------------------------------ *
 * Ideal Customer Profiles — Figma node 3605:1998
 * ------------------------------------------------------------------ */

export type CustomerProfile = {
  title: string
  /** Short capability list. */
  points: readonly string[]
  /** The situation the profile is in. */
  body: string
  /** Who signs. */
  roles: readonly string[]
}

/**
 * Two columns of profile blocks, each closed by a rule.
 *
 * The artboard's grid is 1224 wide inside the 1280 content column, not the
 * full width: two 572px columns with an 80px gutter, leaving 56px unused on
 * the right. That is deliberate enough to keep — the blocks are dense, and the
 * short measure is what stops the bullet lists running too wide to scan.
 * Rows are 278 tall on a 326 pitch.
 */
export function IdealCustomerProfiles({
  heading = 'Ideal Customer Profiles',
  profiles,
}: {
  heading?: string
  profiles: readonly CustomerProfile[]
}) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="flex flex-col gap-2xl">
        <Reveal>
          <Typography variant="h2" className="text-h3 md:text-h2">
            {heading}
          </Typography>
        </Reveal>

        <div className="grid max-w-[1224px] gap-x-4xl gap-y-3xl md:grid-cols-2">
          {profiles.map((profile, i) => (
            <Reveal key={profile.title} index={i}>
              {/*
                `h-full` + `justify-between` so the rule closing each block sits
                on the row's baseline rather than immediately under whichever
                block happens to be shorter.
              */}
              <div className="flex h-full flex-col justify-between gap-lg border-b border-divider pb-lg">
                <div className="flex flex-col gap-md">
                  <Typography variant="copyLarge" as="h3">
                    {profile.title}
                  </Typography>
                  <ul className="flex list-disc flex-col pl-lg">
                    {profile.points.map((point) => (
                      <li key={point}>
                        <Typography variant="copyMedium" as="span">
                          {point}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  <Typography variant="copyMedium" muted>
                    {profile.body}
                  </Typography>
                </div>
                <ul className="flex flex-wrap gap-sm">
                  {profile.roles.map((role) => (
                    <li key={role}>
                      <Tag>{role}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * Capability grid — Figma node 3605:2110
 * ------------------------------------------------------------------ */

export type Capability = { title: string; body: string }

/**
 * Three across, two down, each headed by a 48px chip.
 *
 * The chip holds a `Dummy_Square_Circle` instance on the artboard, so the mark
 * inside is a placeholder — but a visible one, which is the same call the What
 * We Do offering rows needed: a chip at low opacity on this ground renders as
 * nothing at all.
 */
export function CapabilityGrid({
  eyebrow,
  heading,
  capabilities,
}: {
  eyebrow: string
  heading: ReactNode
  capabilities: readonly Capability[]
}) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="flex flex-col gap-4xl">
        <Reveal>
          <div className="mx-auto flex max-w-[800px] flex-col items-center gap-md text-center">
            <Eyebrow tone="white">{eyebrow}</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              {heading}
            </Typography>
          </div>
        </Reveal>

        {/* 403px columns on a 35px gutter — 3 x 403 + 2 x 35 = 1280. */}
        <div className="grid gap-x-[35px] gap-y-4xl md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => (
            <Reveal key={capability.title} index={i}>
              <div className="flex flex-col gap-lg">
                <span
                  aria-hidden
                  className="flex size-3xl shrink-0 items-center justify-center rounded-full bg-white"
                >
                  <span className="size-sm rounded-[2px] border border-on-light" />
                </span>
                <div className="flex flex-col gap-md">
                  <Typography variant="copyLarge" as="h3">
                    {capability.title}
                  </Typography>
                  <Typography variant="copyMedium" muted>
                    {capability.body}
                  </Typography>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * Engagement steps — Figma node 3605:2155
 * ------------------------------------------------------------------ */

export type EngagementStep = { number: string; title: string; body: string }

/**
 * Three steps with an arrow between them.
 *
 * The arrows are their own grid columns rather than absolutely placed, so they
 * stay on the step's centre line at any width; below `lg` the row stacks and
 * they are hidden, since an arrow pointing right between vertically stacked
 * items says the wrong thing.
 */
export function EngagementSteps({
  heading,
  intro,
  steps,
  footnote,
}: {
  heading: ReactNode
  intro?: string
  steps: readonly EngagementStep[]
  footnote?: string
}) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="flex flex-col gap-3xl">
        <Reveal>
          <div className="mx-auto flex max-w-[800px] flex-col items-center gap-md text-center">
            <Typography variant="h2" className="text-h3 md:text-h2">
              {heading}
            </Typography>
            {intro && (
              <Typography variant="copyMedium" muted>
                {intro}
              </Typography>
            )}
          </div>
        </Reveal>

        {/*
          Steps and arrows are siblings in one flex row rather than a grid the
          steps are mapped into — three items dropped into a five-column grid
          land in columns 1, 2, 3, which is how the arrows went missing
          entirely on the first pass.

          The arrow sits on the number chip's centre line (28px of padding plus
          half of a 48px chip = 52px from the top), not the card's, because the
          cards are unequal heights and centring on them makes the arrows
          wander.
        */}
        <div className="flex flex-col gap-lg lg:flex-row lg:items-start lg:gap-0">
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              {i > 0 && (
                <span
                  aria-hidden
                  className="hidden shrink-0 px-lg pt-[52px] text-on-light opacity-subtle lg:block"
                >
                  <ArrowRight className="size-lg" />
                </span>
              )}
              <Reveal index={i} className="flex-1">
                <div className="flex flex-col gap-sm p-lg">
                  <div className="flex flex-col gap-lg">
                    <span className="flex size-3xl items-center justify-center rounded-sm bg-white">
                      <Typography variant="copyLarge" as="span">
                        {step.number}
                      </Typography>
                    </span>
                    <Typography variant="copyLarge" as="h3">
                      {step.title}
                    </Typography>
                  </div>
                  <Typography variant="copyMedium" muted>
                    {step.body}
                  </Typography>
                </div>
              </Reveal>
            </Fragment>
          ))}
        </div>

        {footnote && (
          <Reveal index={3}>
            <Typography variant="copyMedium" muted className="mx-auto max-w-[846px] text-center">
              {footnote}
            </Typography>
          </Reveal>
        )}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * Levels list — Figma node 3605:2241
 * ------------------------------------------------------------------ */

export type Level = { number: string; label: string }

/**
 * Heading left, a ruled list right.
 *
 * Rules run above and below every row (six for five rows on the artboard), so
 * the list is `border-t` per row with a `border-b` on the last — not a divider
 * between rows, which would leave the ends open.
 */
export function LevelsList({ heading, levels }: { heading: ReactNode; levels: readonly Level[] }) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="grid items-start gap-lg lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <Typography variant="h2" className="max-w-[361px] text-h3 md:text-h2">
            {heading}
          </Typography>
        </Reveal>

        {/* The list starts at x=761 of the content column — column 8 of 12. */}
        <Reveal index={1} className="lg:col-span-5 lg:col-start-8">
          <ul className="flex flex-col">
            {levels.map((level) => (
              <li
                key={level.number}
                className="flex items-center gap-lg border-t border-divider py-lg last:border-b"
              >
                <span className="flex size-3xl shrink-0 items-center justify-center rounded-sm bg-white">
                  <Typography variant="copyLarge" as="span">
                    {level.number}
                  </Typography>
                </span>
                <Typography variant="copyLarge" as="span">
                  {level.label}
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
 * Featured case study — Figma node 3605:2181
 * ------------------------------------------------------------------ */

export function FeaturedCase({
  name,
  claim,
  body,
  image,
}: {
  name: string
  claim: string
  body: string
  image: string
}) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      {/* Copy is centred against the 560px image, which is what the artboard's
          141.5px offset on the text block amounts to. */}
      <div className="grid items-center gap-lg lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <div className="flex max-w-[628px] flex-col items-start gap-md">
            <Eyebrow tone="onAccent">Featured</Eyebrow>
            <Typography variant="h1" className="text-h2 md:text-h1">
              {name}
            </Typography>
            <div className="flex flex-col gap-xl">
              <Typography variant="copyLarge" as="p">
                {claim}
              </Typography>
              <Typography variant="copyMedium" muted>
                {body}
              </Typography>
            </div>
          </div>
        </Reveal>

        <Reveal index={1} className="lg:col-span-5 lg:col-start-8">
          <img
            src={asset(image)}
            alt=""
            aria-hidden="true"
            className="aspect-[519/560] w-full rounded-md object-cover"
          />
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * Related services — Figma node 3605:2399
 * ------------------------------------------------------------------ */

export type RelatedService = { title: string; body: string; image: string; to?: string }

/** Three across: a 120px square, then a 240px copy column beside it. */
export function RelatedServices({ services }: { services: readonly RelatedService[] }) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="flex flex-col gap-2xl">
        <Reveal>
          <Typography variant="h2" className="text-h3 md:text-h2">
            Related Services
          </Typography>
        </Reveal>
        <div className="grid gap-lg md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} index={i}>
              <div className="flex items-start gap-lg">
                <img
                  src={asset(service.image)}
                  alt=""
                  aria-hidden="true"
                  className="size-[120px] shrink-0 rounded-md object-cover"
                />
                <div className="flex max-w-[240px] flex-col gap-sm">
                  <Typography variant="copyLarge" as="h3">
                    {service.title}
                  </Typography>
                  <Typography variant="copyMedium" muted>
                    {service.body}
                  </Typography>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * Hero — Figma nodes 3605:1988 / 1997
 * ------------------------------------------------------------------ */

export function ServiceHero({
  eyebrow,
  heading,
  body,
  cta,
  image,
}: {
  eyebrow: string
  heading: ReactNode
  body: string
  cta: ReactNode
  image: string
}) {
  return (
    <Section tone="none" spacing="none" className="pb-5xl pt-[192px] text-on-light">
      <div className="flex flex-col gap-5xl">
        <Reveal>
          <div className="flex max-w-[800px] flex-col items-start gap-md">
            <Eyebrow tone="onAccent">{eyebrow}</Eyebrow>
            <Typography variant="h1" className="text-h2 md:text-h1">
              {heading}
            </Typography>
            <Typography variant="copyLarge" muted>
              {body}
            </Typography>
            <div className="pt-lg">{cta}</div>
          </div>
        </Reveal>
        <Reveal index={1}>
          <img
            src={asset(image)}
            alt=""
            aria-hidden="true"
            className="aspect-[1280/711] w-full rounded-md object-cover"
          />
        </Reveal>
      </div>
    </Section>
  )
}

/** Shared by all three pages, so the arrow icon has one home. */
export { ArrowRight }
