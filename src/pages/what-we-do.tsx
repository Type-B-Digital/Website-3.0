/**
 * Type B Digital — What We Do
 *
 * Figma: "2. What We Do" — node 2894:10946
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2894-10946
 *
 * The header, closing CTA and footer come from PageShell — the artboard's
 * versions of all three are identical to the homepage's, so they are one
 * component rather than three copies. Page grain and the reveal timing are
 * global (main.tsx and the Reveal component), so this page inherits both
 * without doing anything.
 *
 * ⚠ Placeholder imagery: the comparison-matrix dots, the case-study thumbnails,
 * the packaging icons and the seven process steps are generic screenshots and
 * icon instances on the artboard. They reuse assets already in the repo, marked
 * at each use. The three service photographs ARE the real exports.
 */
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button, Eyebrow, HeroIntro, Reveal, Section, TiltCard, Typography } from '@/components'
import { Packaging } from '@/components/sections'
import Glyph, { type GlyphName } from '@/components/icons/Glyph'
import { PageShell } from '@/components/layout'
import { gradients } from '@/tokens'
import { cn } from '@/lib/cn'
import { asset } from '@/lib/asset'

/* ================================================================== *
 * CONTENT — copy verbatim from the artboard
 * ================================================================== */

/** Figma: nodes 3604:1012 / 1058 / 1104 */
const SERVICES = [
  {
    title: 'Advisory',
    to: '/advisory',
    body:
      'Gives leadership teams an honest technical read and a plan they can execute: AI ' +
      'strategy and roadmaps, technology due diligence for M&A and investment, and the ' +
      'change management that makes a transformation stick. Everything we recommend is ' +
      'something our own delivery teams could build, which keeps the advice honest.',
    ground: gradients.service.advisory,
    /** Height / width of the Advisory page's ground at 1440 (1440x7425). */
    groundAspect: 7425 / 1440,
    offerings: [
      { name: 'Architecture Audit & Roadmap', audience: 'Software rebuild & scale' },
      { name: 'Diligence & 90-Day Roadmap', audience: 'PE, VC & M&A deal teams' },
      { name: 'Fractional Leadership', audience: 'Funded scale-ups & regulated mid-market' },
    ],
    study: {
      name: 'Mave AI',
      result: '~45% faster delivery, QA coverage from 20% to 80%.',
      thumb: asset('/images/work/case-1.png'),
    },
  },
  {
    title: 'Product & AI development',
    to: '/product-development',
    body:
      'Brilliant product thinking coupled with end-to-end AI systems: the data ' +
      'underneath, the guardrails around it, and the agents and products people actually ' +
      'use. We also build brand, websites, and durable engineering across web and mobile. ' +
      'Type B builds AI solutions of every kind, from agents and RAG to workflow ' +
      'automation and analytics. Sovereign AI is our specialty: the version we build when ' +
      'your data cannot leave your boundary.',
    // The Product page passes no ground of its own; ContentPage defaults to this.
    ground: gradients.page.service,
    groundAspect: 9120 / 1440,
    offerings: [
      { name: 'AI Assessment or Discovery', audience: 'Mid-market & funded startups' },
      { name: 'Product Build or AI Safety Net', audience: 'Funded scale-ups' },
      { name: 'Sovereign AI Platform', audience: 'Mid-market' },
    ],
    study: {
      name: 'Class.fi',
      result: '70% lower compliance cost, seconds to classify, not hours.',
      thumb: asset('/images/work/case-4.png'),
    },
  },
  {
    title: 'Teams',
    to: '/teams',
    body:
      'Senior engineering, design, and data talent who ship with agents day to day, ' +
      'sourced and fully managed by us. You get our team as an added layer ensuring their ' +
      'success, as industry experts, not just recruiters. A North America-based delivery ' +
      'lead owns the outcome, and build-operate-transfer is there for when you want the ' +
      'team in-house.',
    ground: gradients.service.teams,
    groundAspect: 7496 / 1440,
    offerings: [
      { name: 'Pod Starter', audience: 'Funded scale-ups' },
      { name: 'Delivery Pod', audience: 'Scale-ups' },
      { name: 'Managed Delivery Squad', audience: 'Enterprise & Mid-Market' },
    ],
    study: {
      name: 'Case Study',
      result: 'Case study long title can fit here in two lines',
      thumb: asset('/images/work/case-6.png'),
    },
  },
]

/** Figma: node 3604:1193 — rows down the left, capability columns across. */
const MATRIX_ROWS = [
  { name: 'AI Shops', note: 'Build the agent' },
  { name: 'Staffing agencies', note: 'Place people, not projects' },
  { name: 'Product studios', note: 'Not AI native' },
  { name: 'Type B Digital', note: 'Able to serve end to end' },
]
const MATRIX_COLUMNS = ['AI', 'Strategy', 'Design', 'Build', 'Teams'] as const

/**
 * Which capabilities each kind of vendor actually covers.
 *
 * ⚠ INFERRED, not extracted. The artboard marks every cell with one of several
 * screenshot placeholders, so the covered/uncovered state is not recoverable
 * from the file. This reading follows each row's own subtitle — AI shops build
 * the agent, staffing agencies place people, product studios are "not AI
 * native" — and the section's argument, which is that only Type B covers all
 * five. Correct the map if the intent differs.
 */
const COVERAGE: Record<string, readonly string[]> = {
  'AI Shops': ['AI'],
  'Staffing agencies': ['Teams'],
  'Product studios': ['Strategy', 'Design', 'Build'],
  'Type B Digital': MATRIX_COLUMNS,
}

/**
 * Figma: node 3604:1261 — identical to the service pages' table, but this page
 * owns the copy since it is the one that introduces the three lines.
 */
const PACKAGES = [
  {
    title: 'Type B Digital',
    note: 'Build the agent workflows.',
    items: ['Advisory', 'Product & AI development', 'Teams'],
    lead: true,
  },
  {
    title: 'Entry',
    note: 'Find out what is true, at a fixed scope.',
    items: ['Architecture Audit & Roadmap (2w)', 'AI Assessment or Discovery', 'Pod Starter'],
  },
  {
    title: 'Core',
    note: 'The working engagement most clients run.',
    items: [
      'Diligence & 90-Day Roadmap',
      'Product Build or AI Safety Net',
      'Delivery Pod (4 to 6 people)',
    ],
  },
  {
    title: 'Expanded',
    note: 'A program we own with you.',
    items: ['Fractional Leadership', 'Sovereign AI Platform', 'Managed Delivery Squad (6+ people)'],
  },
]

/** Figma: node 3604:1172 */
/**
 * The seven intake steps. Each carries an 80x80 block; the artboard uses
 * screenshot placeholders, so these use the brand gradients (b1-b7) in sequence,
 * which reads as a progression and stays on tokens.
 */
const PROCESS = [
  { label: 'Source', gradient: gradients.b1 },
  { label: 'Screen', gradient: gradients.b2 },
  { label: 'Assess', gradient: gradients.b3 },
  { label: 'Tech interview', gradient: gradients.b4 },
  { label: 'Client interview', gradient: gradients.b5 },
  { label: 'Contract', gradient: gradients.b6 },
  { label: 'Onboard', gradient: gradients.b7 },
]

/* ================================================================== *
 * SECTIONS
 * ================================================================== */

/**
 * Hero — Figma node 3604:1004.
 *
 * Fixed 720px rather than the homepage's full viewport. The gradient is b2's
 * ramp at 116.67deg (the token board has the same stops at 230.49deg), and the
 * three r=320 circles sit at cx 240 / 720 / 1200 in a 1440x640 box, so the
 * middle one is centred and all three overlap. Node 3604:1005.
 *
 * The copy block is vertically centred: the artboard puts it at y=264 with a
 * height of 192 in a 720 frame, which centres on 360.
 */
function Hero() {
  return (
    <HeroIntro>
      {/* Fades up on load; see HeroIntro. */}
      <section
        className="relative flex h-[720px] items-center overflow-hidden"
        style={{ backgroundImage: gradients.hero.whatWeDo }}
      >
        <img
          src={asset('/vectors/hero-circles.svg')}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[1440px] max-w-none -translate-x-1/2 -translate-y-1/2"
        />
        {/* 120px inset on the artboard, wider than the 80px page margin. */}
        <div className="relative w-full px-md lg:px-lg xl:pl-[120px] xl:pr-4xl">
          <Reveal>
            <div className="flex max-w-[720px] flex-col gap-md text-on-light">
              <Typography variant="h1" className="text-h2 md:text-h1">
                What we do
              </Typography>
              <Typography variant="copyLarge" muted className="tracking-[-0.01em]">
                We work three ways: Advisory for the plan, Product &amp; AI Development for the
                build, and Teams for senior capacity we stay accountable for. Need all three at
                once? We run advisory, build, and a managed team as one accountable program.
              </Typography>
            </div>
          </Reveal>
        </div>
      </section>
    </HeroIntro>
  )
}

/**
 * Which glyph each offering row gets, read off the offering itself rather than
 * the practice it sits under — Nabeel, 2026-09-15. The nine names are fixed in
 * `SERVICES` above, so a map by name is the whole mechanism.
 *
 *   Architecture Audit & Roadmap   a route, because the deliverable is the plan
 *   Diligence & 90-Day Roadmap     a shield — an independent read before signing
 *   Fractional Leadership          one person, named and accountable
 *   AI Assessment or Discovery     the magnifier: finding out what is there
 *   Product Build or AI Safety Net a shield again, and deliberately: "safety
 *                                  net" is the half of that row that needs a
 *                                  picture, and a hammer would sell the wrong one
 *   Sovereign AI Platform          a lock — the data stays where the contract says
 *   Pod Starter / Delivery Pod /   people, in growing numbers
 *   Managed Delivery Squad
 *
 * An unmapped name keeps the ring placeholder, the same call the packaging
 * columns and the capability chips make.
 */
const OFFERING_GLYPHS: Record<string, GlyphName> = {
  'Architecture Audit & Roadmap': 'route',
  'Diligence & 90-Day Roadmap': 'shield',
  'Fractional Leadership': 'person',
  'AI Assessment or Discovery': 'search',
  'Product Build or AI Safety Net': 'shield',
  'Sovereign AI Platform': 'lock',
  'Pod Starter': 'person',
  'Delivery Pod': 'team',
  'Managed Delivery Squad': 'team',
}

/** One offering row inside a service block. Figma: node 3604:1028 et al. */
function OfferingRow({ name, audience }: { name: string; audience: string }) {
  const glyph = OFFERING_GLYPHS[name]
  return (
    <li className="flex items-center justify-between gap-md border-t border-divider py-tag">
      <span className="flex min-w-0 items-center gap-md">
        {/*
          icon-circle-grey, node 3604:1030. The icon inside was a
          Dummy_Square_Circle instance on the artboard — a placed library
          default — so this drew an empty ring. It draws a real icon now; see
          `OFFERING_GLYPHS`.

          The chip is unchanged, including the ring: at 8% on cream the fill
          alone was invisible, which is why it is 10% with a 15% inset ring.
        */}
        <span
          aria-hidden
          className="flex size-xl shrink-0 items-center justify-center rounded-full bg-neutral-900/10 ring-1 ring-inset ring-neutral-900/15"
        >
          {glyph ? (
            /* 16px inside the 32px chip, matching the ring it replaces. */
            <Glyph name={glyph} className="size-md text-on-light" />
          ) : (
            <span className="size-md rounded-full border border-neutral-900/40" />
          )}
        </span>
        {/* One line, per the artboard — the name never wraps. */}
        <Typography variant="copyMedium" as="span" className="whitespace-nowrap">
          {name}
        </Typography>
      </span>
      {/*
        ⚠ The audience wraps; it used to be `shrink-0` alongside a `whitespace-nowrap`
        name, so neither side would give and the two ran straight through each
        other below about 1340px. "Fractional Leadership / Funded scale-ups &
        regulated mid-market" is the pair that collides first.

        The name keeps `nowrap` because the artboard has it on one line and it is
        the row's subject; the audience is the qualifier, so it is the half that
        breaks. `min-w-0` lets it actually take the wrap rather than establishing
        a min-content floor at its longest word.

        (Pre-existing at the designed 1440 too — it just never showed there,
        because the column is wide enough.)
      */}
      <Typography
        variant="copyXSmall"
        as="span"
        muted
        className="min-w-0 text-right text-copy-x-small"
      >
        {audience}
      </Typography>
    </li>
  )
}

/**
 * Service block — Advisory, Product & AI Development, Teams.
 * Figma nodes 3604:1012 / 1058 / 1104: heading and body over 640, a "Learn more"
 * tertiary CTA on the right, then a 628x375 photograph beside a 519-wide column
 * of offerings and a case-study card. Closed by a full-width rule.
 */
function ServiceBlock({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <Section tone="light" spacing="none" className="border-b border-divider py-4xl">
      <div className="flex flex-col gap-4xl">
        <Reveal>
          <div className="flex flex-col items-start gap-lg lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-[640px] flex-col gap-md">
              {/*
                Plain text, not a link. The heading was linked on the argument
                that it is the larger target, but "Learn more" sits directly
                beside it pointing at the same page, so the row offered two
                controls for one destination and the heading's hover underline
                was the only thing announcing it — it read as an accident on a
                40px headline. The CTA is the affordance; this is the label.
              */}
              <Typography variant="h2" className="text-h2-compact md:text-h2">
                {service.title}
              </Typography>
              <Typography variant="copyMedium" muted>
                {service.body}
              </Typography>
            </div>
            <Button
              as={Link}
              to={service.to}
              variant="secondary"
              tone="onLight"
              className="shrink-0"
            >
              Learn more
            </Button>
          </div>
        </Reveal>

        {/* Even halves at lg: 628 + 80 left the services list 268px, and it clipped. */}
        <div className="grid items-start gap-2xl lg:grid-cols-2 xl:grid-cols-[628px_1fr] xl:gap-4xl">
          <Reveal index={1}>
            {/*
              The service page's own hero gradient, not a photograph — Eduardo,
              2026-09-16: the three blocks should match "the hero gradients of
              their respective pages". `ground` is the same token each page
              paints its hero with, so they cannot drift.

              ⚠ Sized as the PAGE, not the panel. Each service page stretches its
              gradient over the whole page (~7,400-9,100px), so its hero only
              ever shows the top slice. Painting the full gradient into 628x375
              showed every stop at once and looked nothing like the hero. So the
              gradient is laid out on a box with the page ground's own
              proportions, scaled to the panel's width, anchored top: the panel
              then shows the same ~900px band behind the hero heading. Heights
              were measured at 1440; if a page's content changes length a lot,
              re-measure `groundAspect`.
            */}
            <TiltCard>
              <div
                aria-hidden
                className="aspect-[628/375] w-full rounded-md bg-top bg-no-repeat"
                style={{
                  backgroundImage: service.ground,
                  backgroundSize: `100% ${service.groundAspect * (628 / 375) * 100}%`,
                }}
              />
            </TiltCard>
          </Reveal>

          {/*
            The artboard's right column is exactly as tall as the image (375px:
            the case-study card at node 3604:1049 sits at y=279 + 96 = 375), so
            the card's bottom edge meets the image's.

            That falls out of the layout rather than being pinned: the Services
            block plus the card come to ~337px, less than the image, so the
            image drives the row height and `justify-between` pushes the card to
            the bottom of it. The gap is only a floor — a hard `gap-4xl` here
            made the column 409px and overhung the image by 34px.
          */}
          <Reveal index={2} className="h-full">
            <div className="flex h-full max-w-[519px] flex-col justify-between gap-lg">
              <div className="flex flex-col gap-lg">
                <Typography variant="copySmall" as="h3" muted>
                  Services
                </Typography>
                <ul className="flex flex-col border-b border-divider">
                  {service.offerings.map((offering) => (
                    <OfferingRow key={offering.name} {...offering} />
                  ))}
                </ul>
              </div>

              {/* Case-study card, node 3604:1049. Thumbnail is a placeholder. */}
              <a href="#" className="flex items-stretch gap-sm self-end">
                <img
                  src={service.study.thumb}
                  alt=""
                  aria-hidden="true"
                  className="size-[96px] shrink-0 rounded-md object-cover"
                />
                <div className="flex w-[200px] flex-col justify-center gap-sm rounded-md bg-neutral-900/5 px-md py-sm">
                  <span className="flex items-center justify-between gap-sm">
                    <span className="text-copy-x-small">{service.study.name}</span>
                    <span aria-hidden className="text-copy-x-small">
                      ↗
                    </span>
                  </span>
                  <span className="text-copy-x-small opacity-muted">{service.study.result}</span>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/**
 * Why we exist — Figma node 3604:1187. Vendor rows down the left, capability
 * columns across, with the capability labels beneath the grid as on the artboard.
 *
 * Built as one CSS grid so the cells, the row labels and the column labels all
 * share the same column tracks. The first pass positioned each with its own
 * flex row, which is why nothing lined up.
 *
 * Type B's row is filled in the warm accent and the others in ink, so the point
 * of the section — one row covering every column — reads at a glance.
 */
function WhyWeExist() {
  return (
    <Section tone="light" spacing="loose">
      <div className="flex flex-col gap-4xl">
        <Reveal>
          <div className="flex max-w-[490px] flex-col items-start gap-md">
            <Eyebrow tone="onLight">Why we exist</Eyebrow>
            <Typography variant="h2" className="text-h2-compact md:text-h2">
              One accountable team instead of four
            </Typography>
          </div>
        </Reveal>

        <Reveal index={1}>
          {/*
            Below md the five capability columns are ~36px each, so the labels
            under them run vertically (read bottom to top) and the row labels
            give up some width. From md everything is as drawn.
          */}
          <div className="grid grid-cols-[minmax(108px,193px)_repeat(5,minmax(0,1fr))] items-center gap-x-xs gap-y-xl md:gap-x-md">
            {MATRIX_ROWS.map((row) => {
              const covered = COVERAGE[row.name] ?? []
              const isUs = row.name === 'Type B Digital'
              return (
                <Fragment key={row.name}>
                  <div className="flex flex-col gap-xs pr-xs md:pr-md">
                    {/* 16px on phones, 20 from md (Eduardo, 2026-09-16). */}
                    <Typography variant="copyLarge" as="span" className="text-copy-medium md:text-copy-large">
                      {row.name}
                    </Typography>
                    <Typography variant="copySmall" as="span" muted>
                      {row.note}
                    </Typography>
                  </div>
                  {MATRIX_COLUMNS.map((column) => {
                    const on = covered.includes(column)
                    return (
                      <span key={column} className="flex justify-center">
                        <span
                          aria-hidden
                          className={cn(
                            'size-lg rounded-full',
                            on
                              ? isUs
                                ? 'bg-orange-500'
                                : 'bg-neutral-900'
                              : 'border border-neutral-900/20',
                          )}
                        />
                        <span className="sr-only">
                          {`${row.name} ${on ? 'covers' : 'does not cover'} ${column}`}
                        </span>
                      </span>
                    )
                  })}
                </Fragment>
              )
            })}

            {/* Column labels sit below the grid on the artboard (node 3604:1249). */}
            <span aria-hidden />
            {MATRIX_COLUMNS.map((column) => (
              <Typography
                key={column}
                variant="copyMedium"
                as="span"
                muted
                className="rotate-180 justify-self-center text-center text-copy-small [writing-mode:vertical-rl] md:rotate-0 md:text-copy-medium md:[writing-mode:horizontal-tb]"
              >
                {column}
              </Typography>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/**
 * We manage end-to-end — Figma node 3604:1154. Centred, on an 1080 column, with
 * the seven-step intake process across the bottom.
 *
 * ⚠ Step marks are 80px screenshot placeholders on the artboard.
 */
function ManagedEndToEnd() {
  return (
    <Section tone="light" spacing="loose">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-4xl text-center">
        {/*
          Eyebrow, heading and subcopy are ONE block on a 16 rhythm, which is
          what every other centred header on the site does — Our Approach and
          Design thinking on Culture, and the Packaging header here. The
          subcopy was a separate `Reveal` and picked up the column's 80px gap
          instead, so this heading sat five times further from its own copy
          than the same arrangement does anywhere else.
        */}
        <Reveal>
          <div className="flex flex-col items-center gap-md">
            <Eyebrow tone="onLight">Senior teams</Eyebrow>
            <Typography variant="h2" className="text-h2-compact md:text-h2">
              We manage end-to-end
            </Typography>
            <Typography variant="copyMedium" muted className="max-w-[720px]">
              We source senior talent who ship with agents day to day. Every engineer clears a
              technical assessment, a lead-led interview, and communication screening before they
              touch a client’s code, and then comes the step most vendors skip: we onboard them,
              manage their performance, and stay accountable for their output for the life of the
              engagement.
            </Typography>
          </div>
        </Reveal>
        <ol className="flex w-full flex-wrap items-start justify-between gap-lg">
          {PROCESS.map((step, i) => (
            <li key={step.label} className="flex flex-col items-center gap-md">
              <Reveal index={i}>
                <div className="flex flex-col items-center gap-md">
                  <span
                    aria-hidden
                    className="size-[80px] rounded-md"
                    style={{ backgroundImage: step.gradient }}
                  />
                  <Typography variant="copyMedium" as="span" className="whitespace-nowrap">
                    {step.label}
                  </Typography>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

/* ================================================================== *
 * PAGE
 * ================================================================== */

export function WhatWeDoPage() {
  return (
    <PageShell headerTone="onLight">
      <Hero />
      {/*
        One ground for the whole body, as Our Work and Industries do.
        `Packaging` paints nothing of its own — correct on the service pages,
        where it sits over their gradient — and this page was the only one that
        gave it nothing to sit on, so "How we package it" was rendering ink
        type on the body's ink canvas and reading as a gap in the page. The
        sections around it each painted their own cream, which is why the fault
        showed on that one band and nowhere else.
      */}
      <div className="bg-surface">
        {SERVICES.map((service) => (
          <ServiceBlock key={service.title} service={service} />
        ))}
        <WhyWeExist />
        <Packaging tiers={PACKAGES} />
        <ManagedEndToEnd />
      </div>
    </PageShell>
  )
}

export default WhatWeDoPage
