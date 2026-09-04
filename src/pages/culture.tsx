import { useState } from 'react'
import {
  Button,
  Container,
  DivergeConverge,
  Eyebrow,
  Globe,
  Marquee,
  Reveal,
  Section,
  Typography,
  type DivergeStage,
  type GlobeLocation,
} from '@/components'
import { PageShell } from '@/components/layout'
import { palette } from '@/tokens'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

/**
 * Culture — Figma node 2448:3065 ("5. Culture")
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2448-3065
 *
 * Two pieces carry the brand here and are documented where they live:
 * `DivergeConverge` (the design-thinking figure) and `Globe` (the Talent map).
 */

/** Figma: nodes 3672:9648 / 9655 / 9662. */
const STATS = [
  { value: '100', label: 'Cumulative years of experience' },
  { value: '30+', label: 'Global team members' },
  { value: '25+', label: 'Global customers served' },
  { value: '30%', label: 'Average cost reduction' },
  { value: '50+', label: 'Projects delivered' },
  { value: '25%', label: 'Average productivity increase' },
]

/** Figma: node 3672:9671. */
const PRINCIPLES = [
  {
    title: 'Standard of Excellence',
    copy: 'We hold every engagement to the same standard of rigor and care, from a startup MVP to an enterprise program.',
    image: '/images/culture/showup-1.jpg',
  },
  {
    title: 'Extreme Ownership',
    copy: 'Strong PMO discipline paired with real accountability. We own outcomes against an aligned vision, not just tickets.',
    image: '/images/culture/showup-2.jpg',
  },
  {
    title: 'User-Centric Design Thinking',
    copy: 'Every solution starts by understanding the people who use it: their needs, their pains, and their goals.',
    image: '/images/culture/showup-3.jpg',
  },
]

/** Figma: nodes 3672:9693 / 9699 / 9705 / 9711. Cards 2 and 4 sit a row lower. */
const STAGES = [
  {
    number: '01',
    title: 'Discovery',
    copy: 'Opens with a Framing Workshop, then requirements and epics, flow mapping, personas, and success-criteria workshops.',
  },
  {
    number: '02',
    title: 'Solution Design',
    copy: 'Tailored strategy and design, aligned to user needs and business outcomes.',
  },
  {
    number: '03',
    title: 'Implementation',
    copy: 'We build, with quality held to the agreed vision at every step.',
  },
  {
    number: '04',
    title: 'Launch & Support',
    copy: 'We ship, then support and optimize for the long term.',
  },
]

/**
 * Figma: node 3672:9721. Heights are the diverge/converge silhouette and the
 * gradients are exact palette pairs — sampled off the artboard, and together
 * they walk the brand's ramps out and back.
 */
const DESIGN_THINKING: DivergeStage[] = [
  {
    label: 'Empathize',
    description: 'Understand users deeply through research and observation.',
    height: 80,
    from: palette.neutral[900],
    to: palette.turquoise[600],
  },
  {
    label: 'Define',
    description: 'Articulate the problem clearly from the insights gathered.',
    height: 160,
    from: palette.turquoise[500],
    to: palette.orange[600],
  },
  {
    label: 'Ideate',
    description: 'Generate a wide range of innovative creative solutions.',
    height: 240,
    from: palette.orange[500],
    to: palette.amber[500],
    glow: true,
  },
  {
    label: 'Prototype',
    description: 'Build the best ideas to test feasibility and gather feedback.',
    height: 160,
    from: palette.amber[400],
    to: palette.neutral[800],
  },
  {
    label: 'Test',
    description: 'Evaluate with users, then iterate to refine the solution.',
    height: 80,
    from: palette.neutral[600],
    to: palette.neutral[200],
  },
]

/**
 * Figma: node 3672:9752. Real coordinates, because the globe is a real
 * orthographic projection — a city has to rotate to where it actually is.
 */
const LOCATIONS: GlobeLocation[] = [
  { name: 'Calgary', lat: 51.05, lon: -114.07 },
  { name: 'Toronto', lat: 43.65, lon: -79.38 },
  { name: 'New York', lat: 40.71, lon: -74.01 },
  { name: 'Colombo', lat: 6.93, lon: 79.86 },
  { name: 'Buenos Aires', lat: -34.6, lon: -58.38 },
  { name: 'Istanbul', lat: 41.01, lon: 28.98 },
  { name: 'Hyderabad', lat: 17.39, lon: 78.49 },
]

const VALUES = [
  'Wise',
  'Curious',
  'Reliable',
  'Relentless',
  'Adaptable',
  'Optimistic',
  'Approachable',
]

const HIRING_TRAITS = [
  'Confident, not arrogant.',
  'Kind and approachable.',
  'Chill and creative.',
  'Sharp, modern, and thoughtful.',
  'High-caliber, but still human.',
  'Elegant solving hard problems.',
  'Relentless in your pursuit of excellence.',
]

/* ================================================================== *
 * SECTIONS
 * ================================================================== */

/** Figma: nodes 3672:9643 and the three stat groups. */
function Hero() {
  return (
    <Section tone="light" spacing="none" className="pb-5xl pt-[232px]">
      <div className="flex flex-col gap-5xl">
        <Reveal>
          <div className="flex max-w-[834px] flex-col items-start gap-md">
            <Eyebrow tone="ink">Why We Exist</Eyebrow>
            <Typography variant="h1" className="text-h2 md:text-h1">
              A full-service digital firm
            </Typography>
            <Typography variant="copyLarge" muted>
              We are a senior team of strategists, engineers, and designers who build
              next-generation products with AI; delivering for firms like Deloitte, HP, and
              Medtronic. Our people and agents are deeply embedded in how we research, design, and
              ship, with senior level own every call.
            </Typography>
          </div>
        </Reveal>

        {/*
          The artboard scatters these across three loose groups; the grid keeps
          the same two-row reading order without inheriting positions that only
          hold at 1440.
        */}
        <div className="grid gap-x-4xl gap-y-2xl sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} index={i}>
              <div className="flex flex-col gap-sm">
                <Typography variant="h2" as="p">
                  {stat.value}
                </Typography>
                <Typography variant="copySmall" muted>
                  {stat.label}
                </Typography>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

/** Figma: node 3672:9669. */
function HowWeShowUp() {
  return (
    <Section tone="light" spacing="none" className="py-5xl">
      <div className="flex flex-col gap-2xl">
        <Reveal>
          <Typography variant="h2" className="text-h3 md:text-h2">
            How we show up
          </Typography>
        </Reveal>
        <div className="grid gap-lg md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} index={i}>
              <div className="flex flex-col gap-2xl">
                <img
                  src={asset(p.image)}
                  alt=""
                  aria-hidden="true"
                  className="aspect-[411/280] w-full rounded-md object-cover"
                />
                <div className="flex max-w-[346px] flex-col gap-md">
                  <Typography variant="copyLarge" as="h3">
                    {p.title}
                  </Typography>
                  <Typography variant="copyMedium" muted>
                    {p.copy}
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

/** Figma: nodes 3672:9687 onward. */
function OurApproach() {
  return (
    <Section tone="light" spacing="none" className="relative overflow-hidden py-5xl">
      {/* Warm bloom and the two faint rings the artboard sets behind the cards. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="stages-glow absolute left-1/2 top-1/2 size-[820px] -translate-x-1/2 -translate-y-1/2" />
        <span className="absolute left-1/2 top-1/2 size-[900px] -translate-x-[85%] -translate-y-1/2 rounded-full border border-on-light/[0.08]" />
        <span className="absolute left-1/2 top-1/2 size-[900px] -translate-x-[15%] -translate-y-1/2 rounded-full border border-on-light/[0.08]" />
      </div>

      <div className="flex flex-col gap-4xl">
        <Reveal>
          <div className="flex flex-col items-center gap-md text-center">
            <Eyebrow tone="onAccent">Four stages</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              Our Approach
            </Typography>
          </div>
        </Reveal>

        {/*
          Cards 2 and 4 sit a row lower on the artboard (y=2132 against 1889),
          which is what keeps the row from reading as a plain four-up. The
          offset only applies once they are side by side.
        */}
        <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.number} index={i} className={cn(i % 2 === 1 && 'lg:mt-[243px]')}>
              <div className="flex aspect-square flex-col justify-between rounded-md bg-white p-lg shadow-lg">
                <div className="flex items-baseline gap-sm">
                  <Typography variant="copyLarge" as="span" className="opacity-subtle">
                    {stage.number}
                  </Typography>
                  <Typography variant="copyLarge" as="h3">
                    {stage.title}
                  </Typography>
                </div>
                <Typography variant="copyMedium" muted>
                  {stage.copy}
                </Typography>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Clears the offset column so the closing line is not pulled up. */}
        <Reveal index={4} className="lg:mt-[243px]">
          <Typography variant="copyMedium" muted className="mx-auto max-w-[846px] text-center">
            Every week, not every milestone: daily stand-ups, weekly written status, sprint demos,
            and open lines on phone, email, Zoom, and Slack. On-time delivery is cited in six of
            our seven Clutch reviews.
          </Typography>
        </Reveal>
      </div>
    </Section>
  )
}

/** Figma: node 3672:9727. The figure itself lives in `DivergeConverge`. */
function DesignThinking() {
  return (
    <Section tone="light" spacing="none" className="py-5xl">
      <div className="flex flex-col gap-4xl">
        <Reveal>
          <div className="mx-auto flex max-w-[800px] flex-col items-center gap-md text-center">
            <Eyebrow tone="onLight">Design thinking</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              We diverge. Then converge.
            </Typography>
            <Typography variant="copyLarge" muted>
              Our strategists set the vision, designers translate insights into experience, and
              technologists prove feasibility, moving through five stages that widen for due
              diligence before narrowing down to execute.
            </Typography>
          </div>
        </Reveal>
        <DivergeConverge stages={DESIGN_THINKING} />
      </div>
    </Section>
  )
}

/**
 * Figma: nodes 3672:9716 / 9752 / 9750.
 *
 * The globe answers the chips: hovering or focusing a city rotates it into the
 * visible cap and pins it. Each chip is a real `<button>` so this works from
 * the keyboard, and `active` is held here rather than inside `Globe` so the
 * chip and the pin can never disagree about which city is current.
 */
function Talent() {
  const [active, setActive] = useState(0)

  return (
    <Section
      tone="none"
      spacing="none"
      bare
      className="relative overflow-hidden bg-accent-500 pt-5xl text-on-dark"
    >
      <Container className="flex flex-col gap-4xl">
        <Reveal>
          <div className="mx-auto flex max-w-[800px] flex-col items-center gap-md text-center">
            <Eyebrow tone="white">Talent</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              Global by design
            </Typography>
            <Typography variant="copyLarge" muted>
              Our delivery engine is Sri Lanka and Turkey, with reach into Buenos Aires,
              Hyderabad, and Cairo. Teams align to North American, MENA, or European hours.
            </Typography>
          </div>
        </Reveal>

        <Reveal index={1}>
          <ul className="flex flex-wrap items-start justify-center gap-x-2xl gap-y-lg">
            {LOCATIONS.map((location, i) => {
              const isActive = i === active
              return (
                <li key={location.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={cn(
                      'flex w-[88px] flex-col items-center gap-sm rounded-sm py-xs',
                      'transition-opacity duration-fast ease-out',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                      'focus-visible:outline-on-dark',
                      isActive ? 'opacity-100' : 'opacity-subtle hover:opacity-100',
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'size-2xl rounded-full border transition-colors duration-fast ease-out',
                        isActive ? 'border-on-dark bg-on-dark/20' : 'border-on-dark-subtle',
                      )}
                    />
                    <Typography variant="copySmall" as="span" className="whitespace-nowrap">
                      {location.name}
                    </Typography>
                  </button>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>

      {/*
        Full-bleed, which is why the section is `bare` and only the copy above
        is wrapped: the artboard's globe spans the page, not the content
        column, and only its top cap shows.
      */}
      <div className="pointer-events-none relative mt-5xl w-full">
        <Globe locations={LOCATIONS} active={active} className="aspect-[1440/327]" />
      </div>
    </Section>
  )
}

/** Figma: node 3672:9774. */
function Testimonial() {
  return (
    <Section tone="light" spacing="none" className="py-5xl">
      <Reveal>
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-lg text-center">
          <Eyebrow tone="white">Testimonial</Eyebrow>
          <div className="flex flex-col items-center gap-2xl">
            <Typography variant="subHeaderLarge" as="p" className="font-medium">
              “Type B offers customers a comprehensive team and exceptional value. There’s a
              significant turnkey capability that Type B brings to engagements.”
            </Typography>
            <div className="text-ink-soft">
              <Typography variant="copyMedium" as="p" className="font-semibold">
                Fauad Sheriff
              </Typography>
              <Typography variant="copyMedium" as="p">
                CEO, Class.fi
              </Typography>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/** Figma: node 3672:9855 — the same block as the Contact page. */
function Hiring() {
  return (
    <Section tone="light" spacing="none" className="py-5xl">
      <div className="grid items-start gap-lg lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <img
            src={asset('/images/hiring.jpg')}
            alt="A Type B engineer working from a plant-filled studio"
            className="aspect-square w-full rounded-md object-cover"
          />
        </Reveal>
        <Reveal index={1} className="lg:col-span-5 lg:col-start-8">
          <div className="flex flex-col items-start gap-2xl">
            <Typography variant="h2" className="text-h3 md:text-h2">
              We’re Hiring!
            </Typography>
            <div className="flex flex-col gap-md">
              <Typography variant="copyMedium" muted>
                If you are:
              </Typography>
              <ul className="flex flex-col">
                {HIRING_TRAITS.map((trait) => (
                  <li key={trait}>
                    <Typography variant="subHeaderSmall" as="span">
                      {trait}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
            <Button as="a" href="/careers" variant="secondary" tone="onLight">
              Come work with us!
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function ValuesMarquee() {
  return (
    <div className="bg-surface pb-md pt-[calc(theme(spacing.4xl)*2)]">
      <Marquee speed="marqueeSlow" gapClassName="gap-lg" className="text-accent-300">
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

export function CulturePage() {
  return (
    <PageShell headerTone="onLight">
      <Hero />
      <HowWeShowUp />
      <OurApproach />
      <DesignThinking />
      <Talent />
      <Testimonial />
      <Hiring />
      <ValuesMarquee />
    </PageShell>
  )
}

export default CulturePage
