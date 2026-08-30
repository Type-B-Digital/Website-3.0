/**
 * Type B Digital — Homepage
 *
 * Figma: "1. Homepage" — node 2761:1214
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2761-1214
 *
 * Section order follows the artboard top to bottom. Each section below carries
 * the Figma node it was built from, so any band can be traced back in one hop.
 *
 * Responsive note: the Figma file contains desktop artboards only (1440px). Every
 * breakpoint below `xl` is an engineering interpretation, not a reproduction of a
 * design. See docs/BUILD_LOG.md § Open questions.
 */
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Marquee,
  ParallaxSection,
  Reveal,
  Section,
  Tag,
  Typography,
} from '@/components'
import type { CardCrop } from '@/components'
import CaretDown from '@/components/icons/CaretDown'

/* ================================================================== *
 * CONTENT
 * Copy lifted verbatim from the artboard. Kept at the top of the file so
 * a content edit never means touching layout.
 * ================================================================== */

const NAV_LINKS = ['What we do', 'Industries', 'Case studies', 'Who we are', 'Publications']

/**
 * Figma: node 3390:26570. Each logo carries its own dimensions from the
 * artboard — they are not a uniform height, and normalising them distorts the
 * wordmarks and overflows the row.
 */
const CLIENT_LOGOS = [
  { name: 'Deloitte', width: 95, height: 19, blend: '' },
  { name: 'Equinox', width: 140, height: 18, blend: 'mix-blend-lighten' },
  { name: 'HP', width: 47, height: 47, blend: '' },
  { name: 'Oracle', width: 121, height: 20, blend: 'mix-blend-lighten' },
  { name: 'Medtronic', width: 121, height: 20, blend: 'mix-blend-screen' },
  { name: 'Bell', width: 41, height: 23, blend: '' },
  { name: 'PCL Construction', width: 73, height: 47, blend: '' },
  { name: 'BDO', width: 60, height: 23, blend: '' },
].map((logo, i) => ({ ...logo, src: `/images/logos/logo-${i + 1}.png` }))

/** Figma: nodes 3390:26720 / 26724 / 26727 */
const STATS = [
  { value: '~100', label: 'Collective years building products & brands' },
  { value: '25+', label: 'Global customers served' },
  { value: '7', label: 'Countries in our delivery network' },
]

/**
 * Figma: nodes 3390:26539 / 26546 / 26548 / 26540.
 * All four are crops of one source image; the crop percentages are Figma's own
 * image-fill transforms, reproduced rather than re-exported.
 */
const PILLARS: { title: string; crop: CardCrop }[] = [
  {
    title: 'AI-native across the stack',
    crop: { width: '588.23%', height: '469.02%', left: '-38.23%', top: '-21.43%' },
  },
  {
    title: 'End-to-end, one accountable team',
    crop: { width: '604.01%', height: '481.61%', left: '-329.6%', top: '-136.43%' },
  },
  {
    title: 'Proven and honest outcomes',
    crop: { width: '588.23%', height: '469.02%', left: '-449.28%', top: '-240.48%' },
  },
  {
    title: 'Senior talent from markets others miss',
    crop: { width: '588.23%', height: '469.02%', left: '-39.08%', top: '-240.11%' },
  },
]

/** Figma: nodes 3390:26543 / 26544 / 26545 */
const STAGES = [
  { title: 'Founders & Startups', src: '/images/stage-founders.png' },
  { title: 'Scaleups', src: '/images/stage-scaleups.png' },
  { title: 'Enterprise & Mid Market', src: '/images/stage-enterprise.png' },
]

/** Figma: nodes 3390:26445 … 26519 */
const CASE_STUDIES = [
  { name: 'Medtronic', description: 'Daily payout on autopilot mode.' },
  { name: 'Ferry', description: 'Project description and details here.' },
  { name: 'Project Name', description: 'Project description and details here.' },
  { name: 'Project Name', description: 'Project description and details here.' },
  { name: 'Project Name', description: 'Project description and details here.' },
  { name: 'Project Name', description: 'Project description and details here.' },
].map((c) => ({ ...c, tags: ['Tag 1', 'Tag 2', 'Tag 3'], thumb: '/images/work-feature.png' }))

/** Figma: node 3390:26751 — the accent word alternates with the cream one. */
const OFFERINGS = [
  { label: 'Advisory', accent: true },
  { label: 'Product', accent: false },
  { label: 'Teams', accent: true },
]

/** Figma: node 3390:26760 */
const VALUES = [
  'Wise',
  'Curious',
  'Reliable',
  'Relentless',
  'Adaptable',
  'Optimistic',
  'Approachable',
]

/** Figma: node 3390:26640 */
const FOOTER_COLUMNS = [
  {
    heading: 'What We Do',
    links: ['Advisory', 'Product & AI Development', 'Teams', 'Industries'],
  },
  {
    heading: 'Case Studies',
    links: ['Ferry Pay', 'Class-fi', 'MatchDay Health', 'Mave AI', 'View All'],
  },
  { heading: 'Who We Are', links: ['About Us', 'We’re Hiring!', 'Contact'] },
  {
    heading: 'Publications',
    links: ['News', 'Substack', 'Linkedin', 'Clutch (4.9)', 'Privacy Policy'],
  },
]

/* ================================================================== *
 * SECTIONS
 * ================================================================== */

/** Figma: "Frame 106" — node 3390:26593 */
function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 pt-xl">
      <Container>
        <nav className="flex items-center justify-between" aria-label="Primary">
          <a href="#" className="shrink-0" aria-label="Type B Digital — home">
            <img src="/icons/type-b-logo.svg" alt="Type B Digital" width={97} height={32} />
          </a>

          <ul className="hidden items-center gap-lg opacity-muted lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="flex items-center gap-xs text-nav-link text-on-dark-muted transition-opacity duration-fast ease-out hover:opacity-muted"
                >
                  {link}
                  <CaretDown className="size-lg shrink-0" />
                </a>
              </li>
            ))}
          </ul>

          <Button as="a" href="#contact" variant="primary" tone="onDark">
            Let’s talk!
          </Button>
        </nav>
      </Container>
    </header>
  )
}

/**
 * Figma: "Frame 1000003409" — node 3390:26582
 * Background: gradient `b1` — Figma style "Type B BG 1", node 3430:26778
 *
 * Fills the viewport, full-bleed, so the hero is the whole first screen and the
 * next band arrives on scroll.
 *
 * `min-h-screen` (100vh) is the conventional desktop unit and resolves to the
 * exact viewport height. Once a mobile design exists, `100svh` is the better
 * choice there — it avoids the hero overshooting by the height of a collapsing
 * URL bar.
 *
 * `tone="dark"` still applies `bg-canvas` underneath: the gradient is a
 * background-image over it, so the ink ground is the fallback if it fails.
 */
function Hero() {
  return (
    <Section
      tone="dark"
      spacing="none"
      className="flex min-h-screen items-center bg-gradient-b1 py-4xl"
    >
      <div className="mx-auto flex max-w-[880px] flex-col items-center gap-3xl text-center">
        <div className="flex flex-col items-center gap-md">
          <Reveal>
            <Typography variant="h1" className="text-h2 md:text-h1">
              Most partners do one slice.
              <br />
              We do the whole stack.
            </Typography>
          </Reveal>
          <Reveal index={1}>
            <Typography variant="copyLarge" muted>
              We are a senior AI and product firm for scale-ups and regulated mid-market
              companies: advisory, product and AI development, and managed teams, from one
              accountable partner.
            </Typography>
          </Reveal>
        </div>
        <Reveal index={2}>
          <Button as="a" href="#work" variant="secondary" tone="onDark">
            See our work
          </Button>
        </Reveal>
      </div>
    </Section>
  )
}

/** Figma: "Frame 1000003366" — node 3390:26570 */
function LogoStrip() {
  return (
    <Section tone="dark" spacing="compact">
      <Reveal>
        {/* Figma's 93px gap is off the spacing scale; nearest token is 80px. */}
        <ul className="flex flex-wrap items-center justify-center gap-x-4xl gap-y-xl opacity-muted">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.src} className="shrink-0">
              <img
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                style={{ width: logo.width, height: logo.height }}
                className={`object-contain ${logo.blend}`}
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}

/**
 * Figma: statement node 3390:26579 + image stack nodes 3390:26679 / 26680 / 26681
 * The three stacked images sit at slightly different offsets in the design; here
 * they travel at different parallax speeds, which is what the stagger implies.
 */
function Manifesto() {
  return (
    <Section tone="dark" spacing="loose">
      <div className="grid items-center gap-4xl lg:grid-cols-2">
        <Reveal>
          <Typography variant="h2" className="text-h3 md:text-h2">
            We bring hope and expert execution to bold innovators, guiding ambitious visions
            into brilliant outcomes with a relentless drive.
          </Typography>
        </Reveal>

        <div className="relative aspect-[400/480] w-full">
          <ParallaxSection speed="subtle" className="absolute inset-0">
            <img
              src="/images/stack/stack-1.png"
              alt=""
              aria-hidden="true"
              className="size-full rounded-md object-cover"
            />
          </ParallaxSection>
          <ParallaxSection speed="base" className="absolute inset-0 translate-x-md translate-y-lg">
            <img
              src="/images/stack/stack-2.png"
              alt=""
              aria-hidden="true"
              className="size-full rounded-md object-cover"
            />
          </ParallaxSection>
          <ParallaxSection
            speed="strong"
            className="absolute inset-0 -translate-x-md translate-y-2xl"
          >
            <img
              src="/images/stack/stack-3.png"
              alt="Type B Digital team at work"
              className="size-full rounded-md object-cover object-bottom"
            />
          </ParallaxSection>
        </div>
      </div>
    </Section>
  )
}

/** Figma: "Frame 1000003403" — node 3390:26720 */
function Stats() {
  return (
    <Section tone="dark" spacing="loose">
      <dl className="grid gap-4xl md:grid-cols-3">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} index={i}>
            <div className="flex flex-col gap-sm md:text-right">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="flex flex-col gap-sm">
                <Typography variant="h1" as="span" className="text-h2 md:text-h1">
                  {stat.value}
                </Typography>
                <Typography variant="copyMedium" as="span" muted>
                  {stat.label}
                </Typography>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  )
}

/** Figma: "Frame 1000003355" — node 3390:26429, cards nodes 3390:26539 … 26549 */
function Pillars() {
  return (
    <Section tone="light" spacing="loose">
      <div className="flex flex-col gap-3xl">
        <Reveal>
          <div className="flex flex-col items-start gap-lg lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col items-start gap-md">
              <Eyebrow tone="onLight">We do things different</Eyebrow>
              <Typography variant="h2" className="text-h3 md:text-h2">
                What sets us apart
              </Typography>
            </div>
            <Typography variant="copyMedium" muted className="max-w-[411px]">
              We work AI at four layers: the tools your whole team uses every day, the data
              pipelines that make AI possible, and the agents and products that run on top.
            </Typography>
          </div>
        </Reveal>

        {/* The row overflows the 1440 frame in Figma — it scrolls horizontally. */}
        <ul className="-mx-md flex snap-x snap-mandatory gap-lg overflow-x-auto px-md pb-md xl:mx-0 xl:px-0">
          {PILLARS.map((pillar, i) => (
            <li key={pillar.title} className="w-[410px] shrink-0 snap-start">
              <Reveal index={i}>
                <Card
                  src="/images/scene.png"
                  alt=""
                  crop={pillar.crop}
                  aspect="horizontalSmall"
                  scrim
                >
                  <Typography variant="subHeaderSmall" as="h3" className="text-on-dark">
                    {pillar.title}
                  </Typography>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/** Figma: "Frame 1000003413" — node 3390:26435 */
function Stages() {
  return (
    <Section tone="light" spacing="loose">
      <div className="flex flex-col items-center gap-3xl">
        <Reveal>
          <div className="flex flex-col items-center gap-md text-center">
            <Eyebrow tone="onLight">Who we serve</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              Built for all stages
            </Typography>
          </div>
        </Reveal>

        <ul className="grid w-full gap-lg md:grid-cols-3">
          {STAGES.map((stage, i) => (
            <li key={stage.title}>
              <Reveal index={i}>
                <Card src={stage.src} alt={stage.title} aspect="verticalMedium" scrim>
                  <div className="flex size-full items-end justify-center">
                    <Typography variant="subHeaderSmall" as="h3" className="text-on-dark">
                      {stage.title}
                    </Typography>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/** Figma: "Frame 1000003574" — node 3390:26750 */
function Work() {
  return (
    <Section tone="light" spacing="loose" id="work">
      <div className="grid gap-4xl lg:grid-cols-[519px_1fr]">
        <div className="flex flex-col gap-3xl">
          <Reveal>
            <div className="flex flex-col items-start gap-3xl">
              <Typography variant="h1" className="text-h2 md:text-h1">
                We solve
                <br />
                real problems
              </Typography>
              <Button as="a" href="#" variant="secondary" tone="onLight">
                View our work
              </Button>
            </div>
          </Reveal>
          <Reveal index={1}>
            <ParallaxSection speed="subtle">
              <Card
                src="/images/work-feature.png"
                alt="Featured project"
                aspect="horizontalMedium"
              />
            </ParallaxSection>
          </Reveal>
        </div>

        <ul className="flex flex-col">
          {CASE_STUDIES.map((project, i) => (
            <li key={`${project.name}-${i}`} className="border-b border-divider">
              <Reveal index={i}>
                <a
                  href="#"
                  className="flex items-center justify-between gap-lg py-md transition-opacity duration-fast ease-out hover:opacity-muted"
                >
                  <div className="flex flex-col gap-lg">
                    <div className="flex flex-col gap-sm">
                      <Typography variant="copyLarge" as="h3">
                        {project.name}
                      </Typography>
                      <Typography variant="copyMedium" muted>
                        {project.description}
                      </Typography>
                    </div>
                    <div className="flex flex-wrap items-center gap-sm">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                  <img
                    src={project.thumb}
                    alt=""
                    aria-hidden="true"
                    className="hidden h-[120px] w-[201px] shrink-0 rounded-md object-cover sm:block"
                  />
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/** Figma: "Frame 1000003577" on the bg-turquoise band — nodes 3390:26754 / 26776 */
function Partner() {
  return (
    <Section tone="accent" spacing="loose">
      <div className="flex flex-col gap-[68px]">
        <Reveal>
          <div className="flex max-w-[351px] flex-col items-start gap-md">
            <Eyebrow tone="onAccent">Core offerings</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              How we partner
            </Typography>
          </div>
        </Reveal>

        <div className="grid items-center gap-4xl lg:grid-cols-3">
          <Reveal>
            <Typography variant="copyMedium" className="max-w-[302px]">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis at the
              praesentium voluptatum deleniti.
            </Typography>
          </Reveal>

          <Reveal index={1}>
            <ul className="flex flex-col items-center gap-lg text-center">
              {OFFERINGS.map((offering) => (
                <li key={offering.label}>
                  <Typography
                    variant="h1"
                    as="span"
                    className={
                      offering.accent
                        ? 'text-h2 text-accent-400 md:text-h1'
                        : 'text-h2 text-on-dark-muted md:text-h1'
                    }
                  >
                    {offering.label}
                  </Typography>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={2}>
            <ParallaxSection speed="subtle">
              <img
                src="/images/partner-visual.png"
                alt=""
                aria-hidden="true"
                className="aspect-square w-full rounded-md object-cover object-bottom"
              />
            </ParallaxSection>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/** Figma: node 3390:26760 — 2445px of copy inside a 1440px frame. */
function Values() {
  return (
    <Section tone="accent" spacing="compact" bare>
      <Marquee>
        {VALUES.map((value) => (
          <Typography key={value} variant="h1" as="span" className="whitespace-nowrap">
            {value}
            <span aria-hidden className="pl-4xl opacity-muted">
              ·
            </span>
          </Typography>
        ))}
      </Marquee>
    </Section>
  )
}

/** Figma: "Frame 1000003433" over the full-bleed band — nodes 3390:26561 / 26559 */
function ClosingCta() {
  return (
    <Section tone="dark" spacing="none" bare id="contact">
      <div className="relative isolate flex min-h-[720px] items-center justify-center overflow-hidden">
        {/*
          scene.png is a 4x4 contact sheet; Figma selects one cell via an
          image-fill transform. Reproduced here rather than object-cover, which
          would show the whole grid. Figma: node 3390:26559
        */}
        <ParallaxSection speed="base" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/scene.png"
              alt=""
              aria-hidden="true"
              className="absolute max-w-none"
              style={{
                width: '501.69%',
                height: '470.7%',
                left: '-256.03%',
                top: '-351.57%',
              }}
            />
          </div>
        </ParallaxSection>
        <div aria-hidden className="absolute inset-0 -z-10 bg-scrim" />

        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-3xl text-center">
              <Typography variant="display" className="text-h2 md:text-display">
                We believe in
                <br />
                what you’re building
              </Typography>
              <Button as="a" href="#" variant="secondary" tone="onDark">
                Let’s talk!
              </Button>
            </div>
          </Reveal>
        </Container>
      </div>
    </Section>
  )
}

/** Figma: "Frame 1000003406" — node 3390:26636 */
function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-canvas pt-4xl text-on-dark">
      <Container>
        {/* Figma: 440px statement column, nav columns to its right — node 3390:26636 */}
        <div className="grid gap-4xl lg:grid-cols-[minmax(0,440px)_1fr]">
          <div className="flex flex-col gap-lg">
            <img src="/icons/type-b-logo.svg" alt="Type B Digital" width={97} height={32} />
            <Typography variant="subHeaderSmall" className="max-w-[440px]">
              Most partners do one slice. We do the whole stack.
            </Typography>
            <Typography variant="copyXSmall" muted>
              © 2026 Type B Digital. All Rights Reserved.
            </Typography>
          </div>

          {/*
            Columns size to their content and never wrap a link, matching the
            artboard. Figma's 96px column gap is off the 8-based spacing scale,
            so this uses the nearest token (80px). Logged in BUILD_LOG.md.
          */}
          <nav className="flex flex-wrap gap-x-4xl gap-y-xl" aria-label="Footer">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} className="flex w-max max-w-[124px] flex-col gap-md">
                <Typography variant="copySmall" as="h2" className="opacity-subtle">
                  {column.heading}
                </Typography>
                <ul className="flex flex-col gap-md">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-copy-medium text-paper transition-opacity duration-fast ease-out hover:opacity-muted"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </Container>

      {/* Oversized wordmark bleeding off both edges. Figma: node 3390:26763 */}
      <ParallaxSection speed="subtle" className="mt-4xl">
        <img
          src="/icons/wordmark.svg"
          alt=""
          aria-hidden="true"
          className="w-full min-w-frame px-md"
        />
      </ParallaxSection>
    </footer>
  )
}

/* ================================================================== *
 * PAGE
 * ================================================================== */

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <LogoStrip />
        <Manifesto />
        <Stats />
        <Pillars />
        <Stages />
        <Work />
        <Partner />
        <Values />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  )
}

export default HomePage
