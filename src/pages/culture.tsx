import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import {
  Container,
  DivergeConverge,
  Eyebrow,
  Globe,
  GroundCrossfade,
  HeroIntro,
  HeroStats,
  Hiring,
  Reveal,
  Section,
  Testimonial,
  type DivergeStage,
  type GlobeLocation,
  Typography,
  ValuesMarquee,
} from '@/components'
import { PageShell } from '@/components/layout'
import { colors as colorTokens, gradients, motion as motionTokens, palette } from '@/tokens'
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

/** Literal classes — Tailwind never emits a computed `lg:col-start-N`. */
/* ================================================================== *
 * SECTIONS
 * ================================================================== */

/**
 * The hero ground. Figma: `culture-hero-background`, node 3678:10012.
 *
 * Built from the artboard's own definition rather than its 8MB export: the
 * frame is a linear gradient plus a single 8%-opacity path, both of which are
 * a few lines of CSS and a 2.7KB SVG.
 *
 * The stops are exact ramp values — neutral.900, turquoise.500, neutral.50 —
 * but neither the angle nor the offsets are the ones Figma states.
 *
 * **Angle.** Figma runs the gradient from (0, 880) to (1649, -473), which is
 * 50.63 degrees, but the rect carries `matrix(-1 0 0 1 1440 0)` — a horizontal
 * mirror — so the built angle is the reflection, 309.36.
 *
 * **Offsets.** Figma's axis is 2133px long; the CSS gradient line for that
 * angle in a 1440x880 box is only 1671px, and CSS normalises its stops to that
 * line. Copying 0/50/100 across therefore lands the cream end *inside* the box
 * and washes the left half out — measured #DFDEDA at the top-left against the
 * artboard's #7C989A. Rescaled by 2133/1671, the stops are 0 / 63.8 / 127.6,
 * which is why the last one runs past 100% exactly as `gradients.b3` does.
 */
const HERO_GRADIENT = gradients.hero.culture

/**
 * Figma: node 3679:10553 and the three stat groups (3679:10558 / 10565 /
 * 10572).
 *
 * The stats are right-aligned to the 12-column grid, which is the thing that
 * was wrong before. Their right edges on the artboard are 708, 1034 and 1360 —
 * the ends of columns 6, 9 and 12 — so each pair occupies three columns of the
 * right nine, and the numbers line up as a column of right edges rather than
 * floating.
 */
function Hero() {
  return (
    <HeroIntro>
      {/* Fades up on load; see HeroIntro. */}
      <Section tone="none" spacing="none" bare className="relative overflow-hidden text-on-dark">
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{ backgroundImage: HERO_GRADIENT }}
        />
        {/* Circles and rules at 8% — one path, straight off the artboard. */}
        <img
          src={asset('/vectors/culture/hero-grid.svg')}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 size-full object-cover"
        />

        <Container className="relative z-10 flex flex-col gap-5xl pb-5xl pt-[232px]">
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

          <HeroStats stats={STATS} />
        </Container>
      </Section>
    </HeroIntro>
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

/**
 * Figma: nodes 3679:10345 (header block) and 3679:10350 onward (the cards).
 *
 * The artboard reads eyebrow, headline, copy, then cards — the copy sits at
 * y=131 inside the header frame, above the cards, not trailing them.
 *
 * Behind it: four large rings and one warm bloom. Sampled from the artboard,
 * the bloom peaks on the section's centre line (+137 warmth at x=720) and
 * falls to nothing by x=50 and x=1400, so it is a wide, shallow ellipse rather
 * than a circle. The rings are ink at 8%, the same weight as the hero grid.
 *
 * The cards are flat. The artboard has no shadow on them, and the drop shadow
 * the first build added was reading as a lift the design does not have.
 */
function OurApproach() {
  return (
    <Section tone="light" spacing="none" className="relative overflow-hidden py-5xl">
      {/*
        z-0, not a negative index: the section paints `bg-surface`, and a
        negative-z child sits *behind* its own section's background, which is
        why the rings and bloom were invisible. The content takes z-10 instead.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Four rings, evenly spaced about the centre and overlapping. */}
        {[-1.5, -0.5, 0.5, 1.5].map((n) => (
          <span
            key={n}
            className="absolute top-1/2 size-[860px] -translate-y-1/2 rounded-full border border-on-light/[0.08]"
            style={{ left: `calc(50% + ${n * 460}px)`, marginLeft: -430 }}
          />
        ))}
        <span className="approach-glow absolute left-1/2 top-1/2 h-[500px] w-[1240px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 flex flex-col gap-4xl">
        <Reveal>
          <div className="mx-auto flex max-w-[800px] flex-col items-center gap-md text-center">
            <Eyebrow tone="onAccent">Four stages</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              Our Approach
            </Typography>
            <Typography variant="copyLarge" muted>
              Every week, not every milestone: daily stand-ups, weekly written status, sprint demos,
              and open lines on phone, email, Zoom, and Slack. On-time delivery is cited in six of
              our seven Clutch reviews.
            </Typography>
          </div>
        </Reveal>

        {/* Cards 2 and 4 sit 243px lower, as on the artboard (2246 against 2003). */}
        <div className="grid gap-lg md:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.number} index={i} className={cn(i % 2 === 1 && 'lg:mt-[243px]')}>
              <div className="flex aspect-square flex-col justify-between rounded-md bg-neutral-50 p-lg">
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
        {/*
          ⚠ There was a 243px spacer here, on the reasoning that the offset
          column needed clearing. It did not: cards 2 and 4 carry `mt-[243px]`
          INSIDE the grid, so the grid row already measures tall enough to
          contain them — the lowest card bottom and the grid bottom are the
          same line. The spacer was 243 plus the column's own 48 gap of pure
          surplus below it, which put 531px between the cards and "Design
          thinking" where the rhythm elsewhere is 240. Removed; the gap now
          measures exactly 240 (120 closing this section, 120 opening the next)
          and everything below it moved up by 291.
        */}
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
 * Figma: nodes 3679:10374 / 10413 / 10408.
 *
 * A pinned scene, like the homepage's offerings panel: a wrapper
 * `talentScene.pinLength` viewport heights tall with a `sticky top-0 h-screen`
 * panel inside it. The ground crossfade above finishes exactly as the panel
 * locks — the marker it is timed against sits on this wrapper's top edge, so
 * progress reaches 1 at the moment the panel starts sticking — and the globe
 * then holds at full height while the reader works through the cities before
 * the scroll releases to the next section.
 *
 * Hovering or focusing a city rotates it into the visible cap and pins it.
 * Each chip is a real `<button>` so this works from the keyboard, and `active`
 * lives here rather than inside `Globe` so the chip and the pin can never
 * disagree about which city is current.
 */
function Talent() {
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()

  const panel = (
    <>
      {/*
        `flex-1`, so the copy block sits at the top, the globe stays pinned to
        the bottom, and the cities take the space left between them. On a taller
        viewport that space grows and the chips stay centred in it rather than
        staying welded under the paragraph with a widening gap below.
      */}
      <Container className="flex flex-1 flex-col pt-4xl">
        <Reveal>
          <div className="mx-auto flex max-w-[800px] flex-col items-center gap-md text-center">
            <Eyebrow tone="cream">Talent</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              Global by design
            </Typography>
            <Typography variant="copyLarge" muted>
              Our delivery engine is Sri Lanka and Turkey, with reach into Buenos Aires, Hyderabad,
              and Cairo. Teams align to North American, MENA, or European hours.
            </Typography>
          </div>
        </Reveal>

        {/*
          No column `gap` above this — the chips are centred in the space
          between the copy and the globe, and an 80px gap on the container
          would be added on top of that centring rather than being part of it,
          which left them sitting exactly 80 low at every viewport height.
          `py-4xl` restores that 80 as a symmetric floor, so the spacing is
          still there when the space is tight but does not bias the centre.
        */}
        <Reveal index={1} className="flex flex-1 items-center py-4xl">
          <ul className="flex w-full flex-wrap items-start justify-center gap-x-2xl gap-y-lg">
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
                      'flex w-5xl flex-col items-center gap-sm rounded-sm py-xs',
                      'transition-opacity duration-fast ease-out',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                      'focus-visible:outline-on-dark',
                      isActive ? 'opacity-100' : 'opacity-subtle hover:opacity-100',
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'size-4xl rounded-full border transition-colors duration-fast ease-out',
                        isActive ? 'border-on-dark bg-on-dark/20' : 'border-on-dark-subtle',
                      )}
                    />
                    <Typography variant="copyLarge" as="span" className="whitespace-nowrap">
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
      <div className="pointer-events-none relative w-full">
        <Globe locations={LOCATIONS} active={active} className="aspect-[1440/327]" />
      </div>
    </>
  )

  // No pin under reduced motion — a section that holds the page while the
  // scroll runs on is exactly the effect that setting asks to suppress.
  if (prefersReduced) {
    return (
      <Section
        tone="none"
        spacing="none"
        bare
        className="relative flex min-h-screen flex-col justify-between overflow-hidden text-on-dark"
      >
        {panel}
      </Section>
    )
  }

  return (
    <Section
      tone="none"
      spacing="none"
      bare
      className="relative text-on-dark"
      style={{ height: `${motionTokens.talentScene.pinLength * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden">
        {panel}
      </div>
    </Section>
  )
}

/**
 * Design Thinking -> Talent. Cream ground to deep accent, with Talent held at
 * zero until the ink arrives. See `GroundCrossfade`.
 */
function DesignToTalent() {
  const { fade, contentFade } = motionTokens.talentScene
  return (
    <GroundCrossfade
      from={colorTokens.background.surface}
      to={colorTokens.background.accentDeep}
      fade={fade}
      contentFade={contentFade}
      above={<DesignThinking />}
      below={<Talent />}
    />
  )
}

/** Figma: node 3617:9100 / 3679:10598 — the same quote on both pages. */
const QUOTE =
  '“Type B offers customers a comprehensive team and exceptional value. There’s a ' +
  'significant turnkey capability that Type B brings to engagements.”'

export function CulturePage() {
  return (
    <PageShell headerTone="onDark">
      <Hero />
      <HowWeShowUp />
      <OurApproach />
      <DesignToTalent />
      {/*
        The tail's ground, painted once here rather than by each block inside
        it. The Talent crossfade above ends on deep turquoise and nothing below
        paints anything, so this is the page that has to say what the ink type
        underneath sits on — Testimonial, Hiring and the marquee were each
        carrying their own cream band to work around that. See Testimonial.
      */}
      <div className="bg-surface">
        {/* 204 from the globe to the quote (node 3679:10598): Testimonial's
            own `loose` rhythm supplies 120 of it, this the remaining 84. */}
        <div className="pt-[84px]">
          <Testimonial quote={QUOTE} name="Fauad Sheriff" role="CEO, Class.fi" spacing="loose" />
        </div>
        <Hiring />
        <ValuesMarquee />
      </div>
    </PageShell>
  )
}

export default CulturePage
