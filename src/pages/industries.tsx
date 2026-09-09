import { Link } from 'react-router-dom'
import {
  Button,
  Eyebrow,
  FaqSection,
  HeroIntro,
  Reveal,
  Section,
  Typography,
  ValuesMarquee,
} from '@/components'
import { PageShell } from '@/components/layout'
import { gradients } from '@/tokens'
import { cn } from '@/lib/cn'

/**
 * Industries — Figma node 2894:13976 ("3. Industries")
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2894-13976
 *
 * Header, closing CTA and footer come from PageShell; the header runs in
 * navigation-dark, as on What We Do, since this page's ground is light
 * throughout.
 *
 * Two things set this page apart from the first two:
 *
 * - There is no hero artwork. The hero is type on the page ground, so the
 *   section carries no image, scrim or fixed height.
 * - The ground is one continuous gradient down the whole body rather than a
 *   sequence of toned bands. See `PAGE_GRADIENT`.
 */

/**
 * The body ground, top to bottom — Figma paints it on the page frame itself,
 * so there is no node to read it from. Sampled down the left gutter of the
 * artboard at 20px intervals instead, which lands on three exact ramp values:
 *
 *   0%    neutral.50     #F6F2EC
 *   44%   amber.100      #F7DDC1   (artboard y=1700)
 *   96%   turquoise.100  #C9D5D3   (artboard y=3700)
 *
 * A three-stop linear fit reproduces the sampled column to a worst deviation
 * of 7/255, which is inside the page grain's own variance — so the artboard is
 * a plain linear gradient, not a mesh.
 *
 * It stops at 96% because the artboard reaches turquoise.100 at y=3700 and
 * holds it flat into the closing CTA at y=3847.
 */
const PAGE_GRADIENT = gradients.page.industries

/**
 * Column start as literal classes: Tailwind scans source text, so a computed
 * `lg:col-start-${n}` would never be generated and every fill would silently
 * fall back to column 1 — which is exactly the stagger this section exists to
 * show.
 */
const COL_START: Record<number, string> = {
  7: 'lg:col-start-7',
  8: 'lg:col-start-8',
  9: 'lg:col-start-9',
}

/**
 * The five industry rows. Figma nodes 3614:9078 / 9027 / 9028 / 9029 / 9030.
 *
 * `column` is where the fill starts on the 12-column grid, and it is the whole
 * point of the section: the rows step 7 -> 9 -> 8 -> 7 -> 9, so the eye is
 * pulled back and forth across the page instead of running down a straight
 * edge. Measured off the artboard's own pixels, since the exported frame
 * geometry reports each fill one width to the right of where it renders:
 *
 *   row              image left   column
 *   healthcare              732        7
 *   financial               949        9
 *   real estate             840        8
 *   manufacturing           732        7
 *   legal                   949        9
 *
 * With the 1280px content width on 12 columns and a 24px gutter, a column is
 * 84.67px; 4 columns plus 3 gutters is 410.67px, which is the 411px fill. Each
 * measured left edge lands on a column boundary to within a pixel.
 */
const INDUSTRIES = [
  {
    title: 'Healthcare & Life Sciences',
    to: '/industries/healthcare',
    result: 'Three AI agents in production at MatchDay Health, & conversion rose by 20%.',
    gradient: gradients.industry.healthcare,
    column: 7,
  },
  {
    title: 'Financial Services & Insurance',
    result: 'Ferry Pay’s app rating rose from 2.0 to 4.8 while support contacts fell to 4%.',
    gradient: gradients.industry.financial,
    column: 9,
    to: '/industries/financial-services',
  },
  {
    title: 'Real Estate & PropTech',
    to: '/industries/real-estate',
    result: 'Mave AI ships roughly 45% faster with QA coverage up from 20% to 80%.',
    gradient: gradients.industry.realEstate,
    column: 8,
  },
  {
    title: 'Manufacturing, Trade & Logistics',
    to: '/industries/manufacturing',
    result:
      'Class.fi cut compliance cost 70%; UDM digitized 100% of manual workflows in eight weeks.',
    gradient: gradients.industry.manufacturing,
    column: 7,
  },
  {
    title: 'Legal Professional Services',
    to: '/industries/legal',
    result: 'Three AI agents in production at MatchDay Health, & conversion rose by 20%.',
    gradient: gradients.industry.legal,
    column: 9,
  },
] as const

/**
 * FAQ copy — Figma nodes 2894:14483 / 14488 / 14493 supply the questions; the
 * artboard draws every row collapsed and carries no answers, so these are
 * placeholders awaiting Eduardo's copy.
 */
const FAQ = [
  {
    question: 'Which industries does Type B serve?',
    answer:
      'We go deepest in five: healthcare and life sciences, financial services and insurance, real estate and proptech, manufacturing and trade and logistics, and legal and professional services. What they share is regulation, operational complexity, and data that already exists but is not yet working for the business. Placeholder copy pending final wording.',
  },
  {
    question: 'Do you only work in these industries?',
    answer:
      'No. These are the sectors where we hold the deepest domain context and can move fastest, but the underlying work — AI strategy, product and platform build, and senior teams — travels. If your problem looks like the ones above, the shape of the engagement is the same. Placeholder copy pending final wording.',
  },
  {
    question: 'How does an industry engagement start?',
    answer:
      'Almost always with an assessment: a short, fixed-scope engagement that establishes what is true about your data, systems, and constraints before anyone commits to a build. You get an honest technical read and a plan you can execute, whether or not we are the ones who execute it. Placeholder copy pending final wording.',
  },
]

/* ================================================================== *
 * SECTIONS
 * ================================================================== */

/** Figma: node 2894:14354. Type only — this page has no hero artwork. */
function Hero() {
  return (
    <HeroIntro>
      {/* Fades up on load; see HeroIntro. */}
      <Section
        tone="none"
        spacing="none"
        /* Artboard: hero block at y=232, first row at y=697 — a 160px gap
           below the CTA. 160 is 2x the 80px band rhythm, so it is expressed
           through the token rather than as a literal, as Section does. */
        className="pb-[calc(theme(spacing.4xl)*2)] pt-[232px] text-on-light"
      >
        <Reveal>
          {/* gap-xl between the copy block and the CTA; gap-md inside it (2894:14355). */}
          <div className="flex max-w-[800px] flex-col items-start gap-xl">
            <div className="flex flex-col items-start gap-md">
              {/* Ink chip here, not the amber one used elsewhere — node 2894:14356. */}
              <Eyebrow tone="ink">Industry leadership</Eyebrow>
              <Typography variant="h1" className="text-h2 md:text-h1">
                Where we go deepest
              </Typography>
              <Typography variant="copyLarge" muted>
                We build AI and software for regulated and operations-heavy industries: healthcare
                and life sciences, financial services and insurance, real estate, manufacturing and
                trade, and legal and professional services.
              </Typography>
            </div>
            <Button as={Link} to="/contact" variant="secondary" tone="onLight">
              Book an AI assessment
            </Button>
          </div>
        </Reveal>
      </Section>
    </HeroIntro>
  )
}

/**
 * One industry row. Figma: node 3614:9078 et al.
 *
 * The 12-column grid is declared here rather than on a wrapper because the
 * stagger is per-row: the copy always sits in columns 1-4 and only the fill
 * moves. Below `lg` the grid collapses to a single column and the stagger has
 * nowhere to happen, so the fill simply follows its copy.
 */
function IndustryRow({ industry }: { industry: (typeof INDUSTRIES)[number] }) {
  return (
    <Section tone="none" spacing="none" className="text-on-light">
      <div className="grid items-center gap-lg lg:grid-cols-12">
        <Reveal className="lg:col-span-4 lg:col-start-1">
          <div className="flex flex-col items-start gap-2xl">
            <div className="flex flex-col gap-md">
              {/* As on What We Do: plain text, with "Learn more" beside it
                  carrying the link. Five headings, five duplicate targets. */}
              <Typography variant="h2" className="text-h3 md:text-h2">
                {industry.title}
              </Typography>
              <Typography variant="copyMedium" muted>
                {industry.result}
              </Typography>
            </div>
            <Button as={Link} to={industry.to} variant="secondary" tone="onLight">
              Learn more
            </Button>
          </div>
        </Reveal>

        <Reveal index={1} className={cn('lg:col-span-4', COL_START[industry.column])}>
          {/*
            A composed gradient, not an image — see gradients.industry. The
            411x320 artboard fill is 1.284:1, held as an aspect ratio so the
            block scales with the column rather than fixing a height.
          */}
          <div
            aria-hidden
            className="aspect-[411/320] w-full rounded-md"
            style={{ backgroundImage: industry.gradient }}
          />
        </Reveal>
      </div>
    </Section>
  )
}

export function IndustriesPage() {
  return (
    <PageShell headerTone="onLight">
      {/*
        One ground for the whole body. The rows and FAQ are `tone="none"` so
        nothing paints over it — the same technique the homepage uses to make
        the white-to-turquoise crossfade read as a single transition instead of
        a boundary between two coloured boxes.
      */}
      <div style={{ backgroundImage: PAGE_GRADIENT }}>
        <Hero />
        {/* 160px between rows: artboard pitch is 480 on a 320-tall row. */}
        <div className="flex flex-col gap-[calc(theme(spacing.4xl)*2)]">
          {INDUSTRIES.map((industry) => (
            <IndustryRow key={industry.title} industry={industry} />
          ))}
        </div>
        {/* Artboard: last row ends at y=2937, the FAQ heading sits at 3177 —
            a 240px gap, three times the 80px band rhythm. */}
        <FaqSection items={FAQ} className="pb-4xl pt-[calc(theme(spacing.4xl)*3)]" />
        <ValuesMarquee />
      </div>
    </PageShell>
  )
}

export default IndustriesPage
