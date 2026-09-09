import { Link } from 'react-router-dom'
import {
  Container,
  Eyebrow,
  HeroIntro,
  Reveal,
  Section,
  Tag,
  Testimonial,
  Typography,
  ValuesMarquee,
} from '@/components'
import { PageShell } from '@/components/layout'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'
import { FEATURED, ROW_TAGS, WORK } from './work-content'

/**
 * Our Work — Figma node 2865:5797
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2865-5797
 *
 * No page title: the artboard opens straight into the featured case study on a
 * full-bleed 880px band, then runs nine work rows, the industries grid, and the
 * shared testimonial.
 *
 * ⚠ The nine row thumbnails are grey placeholder blocks — the artboard's are
 * unfinished exports. The hero photograph is real (node 3707:10655).
 */

/**
 * Figma: node 3707:10847. Six cards, two rows of three.
 *
 * `to` is this file's addition: each card names an industry that now has a
 * page, and the artboard's Real Estate copy even ends with an unresolved
 * "{Explore real estate and proptech}" note asking for exactly this link. That
 * fragment is dropped from the copy and answered with the link instead.
 */
const INDUSTRIES = [
  {
    title: 'Fintech & Financial Services',
    to: '/industries/financial-services',
    body: 'We build AI platforms where every number is audited: payments, wealth, insurance claims, and the compliance evidence. Ferry Pay, RFL Wealth, and Dome all shipped inside real regulatory constraints.',
  },
  {
    title: 'Health',
    to: '/industries/healthcare',
    body: 'Mid-market providers, payers, and digital-health companies, with PHI treated as a design input rather than a review-stage surprise. MatchDay Health runs three of our agents in production.',
  },
  {
    title: 'Manufacturing',
    to: '/industries/manufacturing',
    body: 'We map the physical process and the people behind each step before recommending software, then digitize it. UDM went from paper cards to a purpose-built ERP in eight weeks with 100% staff adoption.',
  },
  {
    title: 'Real Estate',
    to: '/industries/real-estate',
    body: 'Proptech products and investment platforms, engineered so quality survives volume. Mave AI ships roughly 45% faster with QA coverage up from 20% to 80%.',
  },
  {
    title: 'Trade',
    to: '/industries/manufacturing',
    body: 'Cross-border compliance is a cost center that scales with every shipment unless something changes. Class.fi classifies products in seconds instead of hours, at 70% lower compliance cost.',
  },
  {
    title: 'Legal & Professional Services',
    to: '/industries/legal',
    body: 'Grounded document AI with citations a professional can verify, a privilege enforced in the architecture of what we build rather than a 50 slide deck in a drawer or a policy memo.',
  },
]

/* ================================================================== *
 * SECTIONS
 * ================================================================== */

/**
 * A placeholder for a thumbnail that does not exist yet.
 *
 * Deliberately flat and obviously empty rather than a blurred stand-in: the
 * point is that the client can see at a glance which slots still need art.
 */
function Placeholder({ className }: { className?: string }) {
  return <div aria-hidden className={cn('rounded-md bg-neutral-200/60', className)} />
}

/**
 * Hero — the featured case study on a full-bleed 880px band.
 *
 * Figma: image at node 3707:10655 (1584 wide against the 1440 frame, so it
 * bleeds), copy at 3707:10695. White heading, cream body at 80%, and the tags
 * inverted to ink pills with cream labels because they sit on the photo.
 */
function Hero() {
  return (
    <HeroIntro>
      {/* Fades up on load; see HeroIntro. */}
      <Section tone="none" spacing="none" bare className="relative overflow-hidden text-on-dark">
        {/*
          Node 3707:10655, 1584x880 on a 1440 frame so it bleeds right. Dark
          enough in the copy region to carry white type without a scrim —
          measured 5.37:1 over the left 628px, against 4.5 for body text.
        */}
        <img
          src={asset('/images/work/our-work-hero.jpg')}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 size-full object-cover"
        />
        <Container className="relative z-10 flex min-h-[880px] flex-col justify-center">
          <div className="flex max-w-[628px] flex-col items-start gap-md">
            <Eyebrow tone="onAccent">Featured</Eyebrow>
            <Typography variant="h1" className="text-h2 text-neutral-50 md:text-h1">
              {FEATURED.name}
            </Typography>
            {/* 40 between the paragraph and the tag row, as on every row below. */}
            <div className="flex flex-col items-start gap-2xl">
              <Typography variant="copyLarge" muted>
                {FEATURED.description}
              </Typography>
              <ul className="flex flex-wrap gap-sm">
                {FEATURED.tags.map((tag) => (
                  <li key={tag}>
                    {/* Ink pill, cream label — node 3707:10702. */}
                    <Tag tone="onDark">{tag}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </HeroIntro>
  )
}

/**
 * One work row: copy on five columns, thumbnail on seven.
 *
 * The artboard's row is 1280x441 with a 519 copy column at x=0 and a 737 image
 * at x=543 — five and seven columns of the twelve with the standard 24 gutter
 * (5 -> 519.3, 7 -> 736.7). Copy is top-aligned, not centred: every left column
 * sits at y=0 whatever its height, which runs 169 to 269.
 *
 * ⚠ The title is 24px Regular on 1.2 leading, which is not a step on the type
 * scale (`subHeaderSmall` is the same size on 1.5), so the leading is set here.
 * Four of the nine rows draw it 2px taller on the artboard; built at one size,
 * since that reads as authoring drift rather than intent.
 */
function WorkRow({ work }: { work: (typeof WORK)[number] }) {
  return (
    <div className="grid items-start gap-lg lg:grid-cols-12">
      <Reveal className="lg:col-span-5">
        <div className="flex max-w-[519px] flex-col items-start gap-md">
          <Typography variant="subHeaderSmall" as="h3" className="leading-[1.2]">
            {work.name}
          </Typography>
          <div className="flex flex-col items-start gap-2xl">
            <Typography variant="copyLarge" muted>
              {work.description}
            </Typography>
            <ul className="flex flex-wrap gap-sm">
              {ROW_TAGS.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
            {work.stat && (
              <Typography variant="copyLarge" muted className="tracking-[-0.2px]">
                {work.stat}
              </Typography>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal index={1} className="lg:col-span-7">
        {/* 737 x 441 on the artboard. Six of the nine rows have art; the rest
            keep the flat block so the empty slots stay obvious. */}
        {work.thumb ? (
          <img
            src={asset(work.thumb)}
            alt=""
            aria-hidden="true"
            className="aspect-[737/441] w-full rounded-md object-cover"
          />
        ) : (
          <Placeholder className="aspect-[737/441] w-full" />
        )}
      </Reveal>
    </div>
  )
}

/** Nine rows on a 465 pitch: 441 tall with a 24 gap. */
function Work() {
  return (
    <Section
      tone="none"
      spacing="none"
      /* 160 above: the hero band is flush at 880 and the first row is at 1040. */
      className="pb-4xl pt-[calc(theme(spacing.4xl)*2)] text-on-light"
    >
      <div className="flex flex-col gap-lg">
        {WORK.map((work) => (
          <WorkRow key={work.name} work={work} />
        ))}
      </div>
    </Section>
  )
}

/**
 * Industries we serve — Figma node 3707:10845.
 *
 * Three 390px columns on a 48px gutter, each opened by a rule. Two rows, 80
 * apart. The card title is 20px on `normal` leading with -0.2px tracking, which
 * again is not a scale step, so the leading is set here.
 */
function Industries() {
  return (
    <Section tone="none" spacing="none" className="py-4xl text-on-light">
      <div className="flex flex-col gap-4xl">
        <Reveal>
          <Typography variant="h2" className="text-h3 md:text-h2">
            Industries we serve
          </Typography>
        </Reveal>

        <ul className="grid gap-x-3xl gap-y-4xl md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, i) => (
            <li key={industry.title}>
              <Reveal index={i}>
                <div className="flex flex-col gap-md border-t border-divider pt-md">
                  <Typography
                    variant="copyLarge"
                    as="h3"
                    className="leading-[1.3] tracking-[-0.2px]"
                  >
                    <Link to={industry.to} className="hover:underline">
                      {industry.title}
                    </Link>
                  </Typography>
                  <Typography variant="copyMedium" muted>
                    {industry.body}
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

export function OurWorkPage() {
  return (
    <PageShell headerTone="onDark">
      <Hero />
      <div className="bg-surface">
        <Work />
        <Industries />
        {/*
          240 between the industries grid and the quote (5887 -> 6127), where
          `Testimonial`'s own loose rhythm supplies 120 and the grid 80. The
          remaining 40 sits here rather than in the shared component, which is
          right at 120 on Contact and Culture.
        */}
        <div className="pt-2xl">
          <Testimonial
            quote="“Type B offers customers a comprehensive team and exceptional value. There’s a significant turnkey capability that Type B brings to engagements.”"
            name="Fauad Sheriff"
            role="CEO, Class.fi"
            glow
            spacing="loose"
          />
        </div>
        <ValuesMarquee />
      </div>
    </PageShell>
  )
}

export default OurWorkPage
