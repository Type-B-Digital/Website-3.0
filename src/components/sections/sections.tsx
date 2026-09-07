import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Eyebrow, HeroIntro, Reveal, Section, Tag, Typography } from '@/components'
import type { EyebrowTone } from '@/components'
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
      <div className="flex flex-col gap-3xl">
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
          <div className="mx-auto flex max-w-[800px] flex-col items-center gap-lg text-center">
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
          <div className="mx-auto flex max-w-[800px] flex-col items-center gap-lg text-center">
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
                  className={cn(
                    'hidden shrink-0 pt-[52px] text-on-light opacity-subtle lg:block',
                    /*
                      The artboard gutters the arrow by 24 a side for three
                      steps (378.67 each) and 8 for four (290 each); both come
                      to exactly 1280, so the count picks the gutter.
                    */
                    steps.length > 3 ? 'px-sm' : 'px-lg',
                  )}
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
export function LevelsList({
  heading,
  intro,
  image,
  levels,
}: {
  heading: ReactNode
  intro?: string
  /**
   * A 628x375 photograph under the heading, which is what the Financial
   * Services artboard puts there instead of an intro paragraph (node
   * 3614:6735 — the metadata reports y=539 inside a 539-tall frame, but it
   * renders at 163, i.e. 48 below the heading).
   */
  image?: string
  levels: readonly Level[]
}) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="grid items-start gap-lg lg:grid-cols-12">
        {/*
          Six columns, not five: the artboard's heading frame is 628 wide
          (3605:2765 on Teams, 3614:6733 on Financial Services), and five
          columns is 519. The `max-w` below never bit while this was 5, so the
          Financial Services photograph rendered 519 wide instead of 628.
        */}
        <Reveal className="lg:col-span-6">
          {/*
            16 above an intro paragraph (116 -> 132 on Teams), 48 above a
            photograph (116 -> 163 on Financial Services). The two never
            co-occur, so the gap follows whichever is present.
          */}
          <div className={cn('flex max-w-[628px] flex-col', image ? 'gap-3xl' : 'gap-md')}>
            <Typography variant="h2" className="text-h3 md:text-h2">
              {heading}
            </Typography>
            {intro && (
              <Typography variant="copyMedium" muted>
                {intro}
              </Typography>
            )}
            {image && (
              <img
                src={asset(image)}
                alt=""
                aria-hidden="true"
                className="aspect-[628/375] w-full rounded-md object-cover"
              />
            )}
          </div>
        </Reveal>

        {/* The list starts at x=761 of the content column — column 8 of 12. */}
        <Reveal index={1} className="lg:col-span-5 lg:col-start-8">
          <ul className="flex flex-col">
            {levels.map((level) => (
              <li key={level.number} className="border-t border-divider last:border-b">
                {/*
                  The rules span the full 519 column but the row content is 472
                  of it (node 3614:7288), which after the 48 chip and its 24 gap
                  leaves the label exactly 400. Without the cap two of Real
                  Estate's labels fit on one line where the artboard wraps them.
                */}
                <div className="flex max-w-[472px] items-center gap-lg py-lg">
                  <span className="flex size-3xl shrink-0 items-center justify-center rounded-sm bg-white">
                    <Typography variant="copyLarge" as="span">
                      {level.number}
                    </Typography>
                  </span>
                  <Typography variant="copyLarge" as="span">
                    {level.label}
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ *
 * Split feature — Figma nodes 3605:2181 (Featured), 3614:6799 / 6912 / 6921
 * ------------------------------------------------------------------ */

/**
 * A 519x560 image beside a 628 copy column, the copy vertically centred
 * against the image.
 *
 * One block, four uses. On the service pages it is the Featured case study;
 * the Financial Services artboard draws it three times — once with the image
 * on the left ("What can AI do for a mid-market insurer?", no eyebrow and no
 * claim), once with an eyebrow and a claim line ("Our Specialty"), and once as
 * the same Featured case. So eyebrow, claim and side are all props, and the
 * geometry — which is identical on all four — is not.
 *
 * `heading` carries `h1` when the block is a case study (the name is the
 * headline) and `h2` when it is a section (a question or a statement); the
 * artboard sets 86px line boxes for the first and 58px for the second.
 */
export function SplitFeature({
  eyebrow,
  heading,
  headingLevel = 'h1',
  claim,
  body,
  image,
  reverse = false,
}: {
  eyebrow?: string
  heading: string
  headingLevel?: 'h1' | 'h2'
  /** The bold line above the paragraph, where the artboard draws one. */
  claim?: string
  /**
   * Optional: the Healthcare featured case is a claim line with no paragraph
   * under it (node 3614:5893).
   */
  body?: string
  image: string
  /** Image on the left instead of the right. */
  reverse?: boolean
}) {
  const copy = (
    <Reveal index={reverse ? 1 : 0} className={cn('lg:col-span-6', reverse && 'lg:col-start-7')}>
      <div className="flex max-w-[628px] flex-col items-start gap-md">
        {eyebrow && <Eyebrow tone="onAccent">{eyebrow}</Eyebrow>}
        {headingLevel === 'h1' ? (
          <Typography variant="h1" className="text-h2 md:text-h1">
            {heading}
          </Typography>
        ) : (
          <Typography variant="h2" className="text-h3 md:text-h2">
            {heading}
          </Typography>
        )}
        {/* 32 between the claim and the paragraph; 62-30 on the artboard. */}
        <div className="flex flex-col gap-xl">
          {claim && (
            <Typography variant="copyLarge" as="p">
              {claim}
            </Typography>
          )}
          {body && (
            <Typography variant="copyMedium" muted>
              {body}
            </Typography>
          )}
        </div>
      </div>
    </Reveal>
  )

  const picture = (
    <Reveal
      index={reverse ? 0 : 1}
      className={cn('lg:col-span-5', reverse ? 'lg:col-start-1' : 'lg:col-start-8')}
    >
      <img
        src={asset(image)}
        alt=""
        aria-hidden="true"
        className="aspect-[519/560] w-full rounded-md object-cover"
      />
    </Reveal>
  )

  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      {/* Copy is centred against the 560px image, which is what the artboard's
          117.5-154px offset on the text block amounts to. */}
      <div className="grid items-center gap-lg lg:grid-cols-12">
        {reverse ? (
          <>
            {picture}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {picture}
          </>
        )}
      </div>
    </Section>
  )
}

/**
 * The service pages' Featured case study, which is `SplitFeature` with the
 * eyebrow it always carries.
 */
export function FeaturedCase(props: { name: string; claim: string; body?: string; image: string }) {
  const { name, ...rest } = props
  return <SplitFeature eyebrow="Featured" heading={name} {...rest} />
}

/* ------------------------------------------------------------------ *
 * Related services — Figma node 3605:2399
 * ------------------------------------------------------------------ */

export type RelatedService = {
  title: string
  body: string
  image: string
  to?: string
}

/** A link when the card names a route we have, a plain row when it does not. */
function RelatedShell({ to, children }: { to?: string; children: ReactNode }) {
  const className = 'group flex items-start gap-lg'
  return to ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  )
}

/** Three across: a 120px square, then a 240px copy column beside it. */
export function RelatedServices({ services }: { services: readonly RelatedService[] }) {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="flex flex-col gap-3xl">
        <Reveal>
          <Typography variant="h2" className="text-h3 md:text-h2">
            Related Services
          </Typography>
        </Reveal>
        <div className="grid gap-lg md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} index={i}>
              {/*
                The artboard draws these as flat cards, but they name other
                pages on the site, so where we have a route they navigate.
                `group` + underline-on-hover is the only visual addition.
              */}
              <RelatedShell to={service.to}>
                <img
                  src={asset(service.image)}
                  alt=""
                  aria-hidden="true"
                  className="size-[120px] shrink-0 rounded-md object-cover"
                />
                <div className="flex max-w-[240px] flex-col gap-sm">
                  <Typography
                    variant="copyLarge"
                    as="h3"
                    className={cn(service.to && 'group-hover:underline')}
                  >
                    {service.title}
                  </Typography>
                  <Typography variant="copyMedium" muted>
                    {service.body}
                  </Typography>
                </div>
              </RelatedShell>
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
  /**
   * The chip colour. Advisory and Product keep the accent chip; Teams draws
   * amber.500 (node 3605:2526), which is the ramp its whole page runs on.
   */
  eyebrowTone = 'onAccent',
}: {
  eyebrow: string
  heading: ReactNode
  body: string
  cta: ReactNode
  image: string
  eyebrowTone?: EyebrowTone
}) {
  return (
    <HeroIntro>
      {/* Fades up on load; see HeroIntro. */}
      <Section tone="none" spacing="none" className="pb-2xl pt-[192px] text-on-light">
        <div className="flex flex-col gap-4xl">
          <Reveal>
            <div className="flex max-w-[800px] flex-col items-start gap-md">
              <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
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
    </HeroIntro>
  )
}

/** Shared by all three pages, so the arrow icon has one home. */
export { ArrowRight }
