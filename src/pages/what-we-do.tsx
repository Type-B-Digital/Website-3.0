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
import {
  Button,
  Eyebrow,
  Reveal,
  Section,
  Typography,
} from '@/components'
import { PageShell } from '@/components/layout'
import { gradients } from '@/tokens'
import { cn } from '@/lib/cn'

/* ================================================================== *
 * CONTENT — copy verbatim from the artboard
 * ================================================================== */

/** Figma: nodes 3604:1012 / 1058 / 1104 */
const SERVICES = [
  {
    title: 'Advisory',
    body:
      'Gives leadership teams an honest technical read and a plan they can execute: AI ' +
      'strategy and roadmaps, technology due diligence for M&A and investment, and the ' +
      'change management that makes a transformation stick. Everything we recommend is ' +
      'something our own delivery teams could build, which keeps the advice honest.',
    image: '/images/services/advisory.png',
    offerings: [
      { name: 'Architecture Audit & Roadmap', audience: 'Software rebuild & scale' },
      { name: 'Diligence & 90-Day Roadmap', audience: 'PE, VC & M&A deal teams' },
      { name: 'Fractional Leadership', audience: 'Funded scale-ups & regulated mid-market' },
    ],
    study: {
      name: 'Mave AI',
      result: '~45% faster delivery, QA coverage from 20% to 80%.',
      thumb: '/images/work/case-1.png',
    },
  },
  {
    title: 'Product & Development',
    body:
      'Brilliant product thinking coupled with end-to-end AI systems: the data ' +
      'underneath, the guardrails around it, and the agents and products people actually ' +
      'use. We also build brand, websites, and durable engineering across web and mobile. ' +
      'Type B builds AI solutions of every kind, from agents and RAG to workflow ' +
      'automation and analytics. Sovereign AI is our specialty: the version we build when ' +
      'your data cannot leave your boundary.',
    image: '/images/services/product.png',
    offerings: [
      { name: 'AI Assessment or Discovery', audience: 'Mid-market & funded startups' },
      { name: 'Product Build or AI Safety Net', audience: 'Funded scale-ups' },
      { name: 'Sovereign AI Platform', audience: 'Mid-market' },
    ],
    study: {
      name: 'Class.fi',
      result: '70% lower compliance cost, seconds to classify, not hours.',
      thumb: '/images/work/case-4.png',
    },
  },
  {
    title: 'Teams',
    body:
      'Senior engineering, design, and data talent who ship with agents day to day, ' +
      'sourced and fully managed by us. You get our team as an added layer ensuring their ' +
      'success, as industry experts, not just recruiters. A North America-based delivery ' +
      'lead owns the outcome, and build-operate-transfer is there for when you want the ' +
      'team in-house.',
    image: '/images/services/teams.png',
    offerings: [
      { name: 'Pod Starter', audience: 'Funded scale-ups' },
      { name: 'Delivery Pod', audience: 'Scale-ups' },
      { name: 'Managed Delivery Squad', audience: 'Enterprise & Mid-Market' },
    ],
    study: {
      name: 'Case Study',
      result: 'Case study long title can fit here in two lines',
      thumb: '/images/work/case-6.png',
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
const MATRIX_COLUMNS = ['AI', 'Strategy', 'Design', 'Build', 'Teams']

/** Figma: node 3604:1261 */
const PACKAGES = [
  {
    title: 'Type B Digital',
    note: 'Build the agent workflows.',
    items: ['Advisory', 'Product & AI Development', 'Teams'],
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
const PROCESS = [
  'Source',
  'Screen',
  'Assess',
  'Tech Interview',
  'Client Interview',
  'Contract',
  'Onboard',
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
    <section
      className="relative flex h-[720px] items-center overflow-hidden"
      style={{ backgroundImage: `linear-gradient(116.67deg, ${gradients.b2Stops})` }}
    >
      <img
        src="/vectors/hero-circles.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[1440px] max-w-none -translate-x-1/2 -translate-y-1/2"
      />
      {/* 120px inset on the artboard, wider than the 80px page margin. */}
      <div className="relative w-full px-md md:px-xl xl:pl-[120px] xl:pr-4xl">
        <Reveal>
          <div className="flex max-w-[720px] flex-col gap-md text-on-light">
            <Typography variant="h1" className="text-h2 md:text-h1">
              What We Do
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
  )
}

/** One offering row inside a service block. Figma: node 3604:1028 et al. */
function OfferingRow({ name, audience }: { name: string; audience: string }) {
  return (
    <li className="flex items-center justify-between gap-lg border-t border-divider py-md">
      <span className="flex items-center gap-md">
        {/* icon-circle-grey, node 3604:1030 — placeholder mark for the icon instance */}
        <span
          aria-hidden
          className="flex size-xl shrink-0 items-center justify-center rounded-full bg-neutral-900/8"
        >
          <span className="size-sm rounded-full bg-neutral-900/32" />
        </span>
        <Typography variant="copyMedium" as="span">
          {name}
        </Typography>
      </span>
      <Typography variant="copyXSmall" as="span" muted className="text-right">
        {audience}
      </Typography>
    </li>
  )
}

/**
 * Service block — Advisory, Product & Development, Teams.
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
              <Typography variant="h2" className="text-h3 md:text-h2">
                {service.title}
              </Typography>
              <Typography variant="copyMedium" muted>
                {service.body}
              </Typography>
            </div>
            <Button as="a" href="#" variant="tertiary" tone="onLight" className="shrink-0">
              Learn more
            </Button>
          </div>
        </Reveal>

        <div className="grid items-start gap-4xl lg:grid-cols-[628px_1fr]">
          <Reveal index={1}>
            <img
              src={service.image}
              alt={`${service.title} — project imagery`}
              className="aspect-[628/375] w-full rounded-md object-cover"
            />
          </Reveal>

          <Reveal index={2}>
            <div className="flex max-w-[519px] flex-col gap-4xl">
              <div className="flex flex-col gap-md">
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
                <div className="flex w-[200px] flex-col gap-sm rounded-md bg-neutral-900/4 px-md py-sm">
                  <span className="flex items-center justify-between gap-sm">
                    <Typography variant="copyXSmall" as="span">
                      {service.study.name}
                    </Typography>
                    <span aria-hidden className="text-copy-x-small">
                      ↗
                    </span>
                  </span>
                  <Typography variant="copyXSmall" as="span" muted>
                    {service.study.result}
                  </Typography>
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
 * Why we exist — Figma node 3604:1187. Competitor rows down the left, capability
 * columns across.
 *
 * ⚠ The artboard marks each cell with one of several screenshot placeholders, so
 * which cells read as "covered" is not recoverable from the file. Every cell is
 * drawn the same here; the per-cell state needs a spec.
 */
function WhyWeExist() {
  return (
    <Section tone="light" spacing="loose">
      <div className="flex flex-col gap-4xl">
        <Reveal>
          <div className="flex max-w-[490px] flex-col items-start gap-md">
            <Eyebrow tone="onLight">Why we exist</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              One accountable team instead of four
            </Typography>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="grid gap-4xl lg:grid-cols-[193px_1fr]">
            <ul className="flex flex-col gap-xl">
              {MATRIX_ROWS.map((row) => (
                <li key={row.name} className="flex flex-col gap-sm">
                  <Typography variant="copyLarge" as="span">
                    {row.name}
                  </Typography>
                  <Typography variant="copyMedium" as="span" muted>
                    {row.note}
                  </Typography>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-xl">
              {MATRIX_ROWS.map((row) => (
                <div key={row.name} className="flex items-center gap-sm">
                  {MATRIX_COLUMNS.map((column, c) => (
                    <span key={column} className="flex flex-1 items-center gap-sm">
                      <span
                        aria-hidden
                        className="size-lg shrink-0 rounded-full border border-on-light"
                      />
                      {c < MATRIX_COLUMNS.length - 1 && (
                        <span aria-hidden className="h-px flex-1 bg-divider" />
                      )}
                    </span>
                  ))}
                </div>
              ))}
              <div className="flex items-center gap-sm">
                {MATRIX_COLUMNS.map((column) => (
                  <Typography key={column} variant="copyMedium" as="span" muted className="flex-1">
                    {column}
                  </Typography>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/**
 * How we package it — Figma node 3604:1255. Four 280px columns; the first names
 * the three practices and the rest are the Entry / Core / Expanded tiers.
 *
 * ⚠ The artboard uses icon-set instances (Chart_Line, House_02, Heart_01,
 * Mobile_Button) that are not exported here; each column shows a placeholder mark.
 */
function Packaging() {
  return (
    <Section tone="light" spacing="loose">
      <div className="flex flex-col gap-4xl">
        <Reveal>
          <div className="flex max-w-[549px] flex-col items-start gap-md">
            <Eyebrow tone="onLight">How we package it</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              Three lines. Entry, Core, or Expanded.
            </Typography>
          </div>
        </Reveal>

        <ul className="grid gap-lg md:grid-cols-2 xl:grid-cols-4">
          {PACKAGES.map((pkg, i) => (
            <li key={pkg.title}>
              <Reveal index={i}>
                <div
                  className={cn(
                    'flex h-full flex-col gap-4xl py-lg',
                    // Only the tiers carry rules on the artboard; the lead column does not.
                    !pkg.lead && 'border-y border-divider',
                  )}
                >
                  <span aria-hidden className="size-lg rounded-sm bg-neutral-900/12" />
                  <div className="flex flex-col gap-4xl">
                    <div className="flex flex-col gap-sm">
                      <Typography variant="copyLarge" as="h3">
                        {pkg.title}
                      </Typography>
                      <Typography variant="copySmall" muted>
                        {pkg.note}
                      </Typography>
                    </div>
                    <ul className="flex flex-col gap-lg">
                      {pkg.items.map((item) => (
                        <li key={item}>
                          <Typography variant="copyMedium" as="span">
                            {item}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
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
        <Reveal>
          <div className="flex flex-col items-center gap-md">
            <Eyebrow tone="onLight">Senior teams</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              We manage end-to-end
            </Typography>
          </div>
        </Reveal>
        <Reveal index={1}>
          <Typography variant="copyMedium" muted className="max-w-[720px]">
            We source senior talent who ship with agents day to day. Every engineer clears a
            technical assessment, a lead-led interview, and communication screening before they
            touch a client’s code, and then comes the step most vendors skip: we onboard them,
            manage their performance, and stay accountable for their output for the life of the
            engagement.
          </Typography>
        </Reveal>
        <ol className="flex w-full flex-wrap items-start justify-between gap-lg">
          {PROCESS.map((step, i) => (
            <li key={step} className="flex flex-col items-center gap-md">
              <Reveal index={i}>
                <div className="flex flex-col items-center gap-md">
                  <span
                    aria-hidden
                    className="size-[80px] rounded-md bg-neutral-900/8"
                  />
                  <Typography variant="copyMedium" as="span" className="whitespace-nowrap">
                    {step}
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
      {SERVICES.map((service) => (
        <ServiceBlock key={service.title} service={service} />
      ))}
      <WhyWeExist />
      <Packaging />
      <ManagedEndToEnd />
    </PageShell>
  )
}

export default WhatWeDoPage
