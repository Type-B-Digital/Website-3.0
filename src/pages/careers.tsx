import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion as fm,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type AnimationPlaybackControls,
} from 'framer-motion'
import {
  Accordion,
  Eyebrow,
  Marquee,
  Reveal,
  Section,
  Tabs,
  Typography,
} from '@/components'
import { PageShell } from '@/components/layout'
import { colors as colorTokens, motion as motionTokens, palette } from '@/tokens'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'
import { useLaggedProgress } from '@/lib/useLaggedProgress'

/**
 * Careers — Figma node 2767:1908 ("7. Careers")
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2767-1908
 *
 * The page that changes ground mid-scroll: warm at the top, ink from Open Roles
 * down. See `WARM_GRADIENT` and `BenchToRoles`.
 */

/**
 * Exact sRGB mix, so a value read off the artboard can stay derived from the
 * two ramp ends it sits between rather than being pasted in as a literal.
 */
function mix(from: string, to: string, t: number) {
  const ch = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16)
  const v = (i: number) => Math.round(ch(from, i) + (ch(to, i) - ch(from, i)) * t)
  return `#${[0, 1, 2].map((i) => v(i).toString(16).padStart(2, '0')).join('')}`
}

/**
 * Where the warm half of the page ends up. Sampled off the artboard at
 * `#F6EADC` — which is 62% of the way from amber.100 to neutral.50, not
 * neutral.50 itself. Snapping it to the ramp end would lighten the whole Bench
 * section by about 5%.
 */
const BENCH_GROUND = mix(palette.amber[100], palette.neutral[50], 0.62)

/**
 * The warm half only: hero and carousel, amber.100 easing up to BENCH_GROUND.
 *
 * A vertical gradient is right *here* — the two ends are within a few percent
 * of each other, so it reads as one warm ground rather than as two colours on
 * screen at once.
 *
 * It is emphatically wrong for the change into ink, which is why that half is
 * not in this gradient. See `BenchToRoles`.
 */
const WARM_GRADIENT = `linear-gradient(180deg, ${palette.amber[100]} 0%, ${BENCH_GROUND} 100%)`

/**
 * The hero carousel. Copy is Eduardo's; the artboard draws only slide 02
 * (node 3638:9411), and every slide shares the one photograph — the same
 * 628px image the Contact page uses for "We're Hiring" (verified identical,
 * pixel-for-pixel, between the two artboards).
 */
const SLIDES = [
  'Competitive compensation in USD.',
  'Flexible, remote-first work culture.',
  'Global clients and cross-cultural teams.',
  'Support for ongoing learning & growth.',
] as const

/** Seconds each slide holds before advancing. Eduardo's spec. */
const SLIDE_SECONDS = 3

/** Figma: node 3638:9361. */
const BENCH_STAGES = [
  { label: 'Technical assessment', image: '/images/careers/bench-1.jpg' },
  { label: 'Lead-led interview', image: '/images/careers/bench-2.jpg' },
  { label: 'Communication screening', image: '/images/careers/bench-3.jpg' },
] as const

/**
 * Figma: nodes 3638:9419 (tabs) and 3638:9429 (the openings list). The artboard
 * draws only the Engineering set, so Design and Sales are placeholders.
 */
const ROLE_TABS = [
  { id: 'engineering', label: 'Engineering' },
  { id: 'design', label: 'Design' },
  { id: 'sales', label: 'Sales' },
  { id: 'all', label: 'View All', variant: 'plain' as const },
]

const ROLES: Record<string, readonly string[]> = {
  engineering: [
    'Senior full stack developer',
    'Senior backend developer',
    'Senior QA engineer',
  ],
  design: ['Senior product designer', 'Design systems lead'],
  sales: ['Enterprise account executive'],
}

// "View All" is not a category — it is the absence of a filter.
ROLES.all = [...ROLES.engineering, ...ROLES.design, ...ROLES.sales]

/** Figma: nodes 3638:9375 onward. Answers are placeholders. */
const FAQ = [
  {
    question: 'How do I apply?',
    answer:
      'Pick the closest opening above and send us your work — a repository, a shipped product, a case study. We read everything. If nothing fits but you think you belong on the bench, write to us anyway and say what you would want to build. Placeholder copy pending final wording.',
  },
  {
    question: 'Is Type B fully remote?',
    answer:
      'Remote-first, with our core delivery engine in Sri Lanka and Turkey and colleagues across North America, South America, EMEA, and Asia. There is no office you are expected to appear in. Placeholder copy pending final wording.',
  },
  {
    question: 'What is the bar to join the engineering bench?',
    answer:
      'Senior in practice, not just in title: you have owned something in production, you can explain the trade-offs you made, and a client could meet you on day one. Placeholder copy pending final wording.',
  },
  {
    question: 'What does the interview process involve?',
    answer:
      'A technical assessment, a lead-led interview, and a communication screening — the same three stages every engineer on the bench has cleared. Placeholder copy pending final wording.',
  },
  {
    question: 'Does Type B support learning and growth?',
    answer:
      'Yes, and it is one of the four things we promise up front. Budget and time for the learning that makes you better at the work, not for collecting certificates. Placeholder copy pending final wording.',
  },
  {
    question: 'What is it like to work across time zones here?',
    answer:
      'Asynchronous by default, with deliberate overlap where a project needs it. Written handoffs are the norm, so progress does not depend on everyone being awake at once. Placeholder copy pending final wording.',
  },
]

/** Figma: node 3638:9404. */
const VALUES = [
  'Wise',
  'Curious',
  'Reliable',
  'Relentless',
  'Adaptable',
  'Optimistic',
  'Approachable',
]

/* ================================================================== *
 * SECTIONS
 * ================================================================== */

/** Figma: node 3638:9348 — eyebrow and headline, centred. */
function Hero() {
  return (
    <Section tone="none" spacing="none" className="pt-[232px] text-on-light">
      <Reveal>
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-md text-center">
          <Eyebrow tone="ink">Careers</Eyebrow>
          <Typography variant="h1" className="text-h2 md:text-h1">
            Work with the best
          </Typography>
        </div>
      </Reveal>
    </Section>
  )
}

/**
 * The four-slide hero carousel. Figma: nodes 3638:9410 / 9411 / 9435.
 *
 * The progress bar *is* the timer: one motion value runs 0 -> 1 over
 * `SLIDE_SECONDS`, the active bar's width reads off it, and its `onComplete`
 * advances the slide. A `setInterval` alongside a separate width animation
 * would be two clocks that drift apart, and diverge further whenever the tab
 * is backgrounded and rAF throttles.
 *
 * It is driven imperatively, with `animate()` and its playback controls,
 * because the declarative form cannot be paused. Changing a `transition` prop
 * mid-flight does not stop a running animation, so a hover would let the fill
 * run to 100%, suppress the advance at completion, and then leave the carousel
 * stuck with nothing to restart it. `controls.pause()` / `.play()` actually
 * hold the clock where it is.
 *
 * Paused on hover and on focus-within. Auto-advancing content needs a way to
 * stop (WCAG 2.2.2), and reading a slide should not be a race.
 *
 * Under `prefers-reduced-motion` it does not advance at all: the bars become
 * plain controls and the reader drives. Auto-rotating carousels are exactly
 * the motion that setting exists to suppress.
 */
function HeroCarousel() {
  const prefersReduced = useReducedMotion()
  const [index, setIndex] = useState(0) // starts at 01
  const [paused, setPaused] = useState(false)
  const { reveal, duration, easing } = motionTokens

  const advance = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), [])

  /** 0 -> 1 across the active slide's dwell. */
  const progress = useMotionValue(0)
  const controls = useRef<AnimationPlaybackControls | null>(null)
  const fillWidth = useTransform(progress, (v) => `${Math.min(v, 1) * 100}%`)

  // Restart the clock whenever the slide changes, whoever changed it.
  useEffect(() => {
    controls.current?.stop()
    progress.set(0)
    if (prefersReduced) return
    controls.current = animate(progress, 1, {
      duration: SLIDE_SECONDS,
      ease: 'linear',
      onComplete: advance,
    })
    return () => controls.current?.stop()
  }, [index, prefersReduced, progress, advance])

  // Hold the clock rather than the appearance, so resuming picks up the
  // remaining time instead of restarting the slide.
  useEffect(() => {
    if (!controls.current) return
    if (paused) controls.current.pause()
    else controls.current.play()
  }, [paused])

  return (
    <Section tone="none" spacing="none" className="pb-4xl pt-4xl text-on-light">
      <div
        className="grid items-center gap-lg lg:grid-cols-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <Reveal className="lg:col-span-5 lg:col-start-1">
          <div className="flex flex-col items-start">
            {/*
              aria-live so the slide change is announced; the numeral itself is
              hidden from the reader because "02" alone says nothing, and the
              subheader below carries the meaning.
            */}
            <div aria-live="polite" aria-atomic="true" className="flex flex-col items-start">
              {/*
                Each slide arrives with the page's own feather — opacity, a
                short rise, and a blur resolving to zero — rather than swapping
                instantly. Same three properties `Reveal` uses, at
                `duration.base` rather than `duration.reveal`: a 1.2s entrance
                inside a 3s dwell would still be arriving when the slide is
                already half over.

                `mode="wait"` so the outgoing slide is gone before the next
                begins; crossfading two numerals on top of each other turns the
                outline into mush.
              */}
              <AnimatePresence mode="wait" initial={false}>
              {/*
                Outlined, not filled: the artboard sets a transparent fill
                (node 3638:9412) and the outline comes from a 1px ink stroke
                that the Figma export drops. `-webkit-text-stroke` is the only
                way to stroke text in CSS, and is supported everywhere despite
                the prefix.

                The negative bottom margin is what makes the subheader overlap
                the digits — 64px of it, straight off the artboard.
              */}
                <fm.div
                  key={index}
                  className="flex flex-col items-start"
                  initial={
                    prefersReduced
                      ? undefined
                      : { opacity: 0, y: reveal.distance, filter: `blur(${reveal.feather}px)` }
                  }
                  animate={
                    prefersReduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }
                  }
                  exit={
                    prefersReduced
                      ? undefined
                      : {
                          opacity: 0,
                          filter: `blur(${reveal.feather}px)`,
                          // Leaves faster than it arrives. With `mode="wait"`
                          // the two run back to back, and a symmetric 600ms
                          // each would spend 1.2s of a 3s dwell in motion.
                          transition: { duration: duration.fast, ease: [...easing.inOut] },
                        }
                  }
                  transition={{ duration: duration.base, ease: [...easing.inOut] }}
                >
                  <Typography
                    variant="numeral"
                    aria-hidden="true"
                    className="-mb-[64px] select-none text-transparent"
                    style={{ WebkitTextStroke: `1px ${palette.neutral[900]}` }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>

                  <Typography variant="h2" as="p" className="max-w-[519px] text-h3 md:text-h2">
                    {SLIDES[index]}
                  </Typography>
                </fm.div>
              </AnimatePresence>
            </div>

            {/* Progress bars, 48x4 on a 56px pitch (node 3638:9435). */}
            <div className="mt-5xl flex items-center gap-sm">
              {SLIDES.map((slide, i) => {
                const isActive = i === index
                const isPast = i < index
                return (
                  <button
                    key={slide}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show slide ${i + 1}: ${slide}`}
                    aria-current={isActive || undefined}
                    className={cn(
                      'h-[4px] w-3xl overflow-hidden rounded-pill bg-tag-bg',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
                      'focus-visible:outline-accent-500',
                    )}
                  >
                    {/*
                      The active bar tracks the shared clock; the others are
                      simply full or empty. Under reduced motion the active bar
                      shows full, since there is no countdown to depict.
                    */}
                    <fm.span
                      className="block h-full rounded-pill bg-canvas"
                      style={
                        isActive && !prefersReduced
                          ? { width: fillWidth }
                          : { width: isPast || isActive ? '100%' : '0%' }
                      }
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* 628px square, starting at column 8 of 12 (artboard x=732). */}
        <Reveal index={1} className="lg:col-span-6 lg:col-start-7">
          <img
            src={asset('/images/hiring.jpg')}
            alt="A Type B engineer working from a plant-filled studio"
            className="aspect-square w-full rounded-md object-cover"
          />
        </Reveal>
      </div>
    </Section>
  )
}

/** Figma: node 3638:9352. */
function OurBench() {
  return (
    <Section
      tone="none"
      spacing="none"
      className="pb-[calc(theme(spacing.4xl)*2)] pt-4xl text-on-light"
    >
      <div className="flex flex-col gap-2xl">
        <Reveal>
          <div className="flex flex-col items-center gap-md text-center">
            <Typography variant="h2" className="text-h3 md:text-h2">
              Our Bench
            </Typography>
            <Typography variant="copyMedium" muted className="max-w-[720px]">
              A vetted bench of roughly 30 senior engineers, with our core delivery engine in Sri
              Lanka and Turkey and reach across North America, South America, EMEA, and Asia.
            </Typography>
          </div>
        </Reveal>

        <div className="flex flex-col gap-2xl">
          {/* Three 411x280 cards on a 24px gutter (node 3638:9357). */}
          <div className="grid gap-lg md:grid-cols-3">
            {BENCH_STAGES.map((stage, i) => (
              <Reveal key={stage.label} index={i}>
                <div className="flex flex-col items-center gap-2xl">
                  <img
                    src={asset(stage.image)}
                    alt=""
                    aria-hidden="true"
                    className="aspect-[411/280] w-full rounded-md object-cover"
                  />
                  <Typography variant="copyLarge" as="p" className="text-center">
                    {stage.label}
                  </Typography>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal index={3}>
            <Typography variant="copyLarge" muted className="mx-auto max-w-[860px] text-center">
              Then ships agents drafting code and tests under senior review.
            </Typography>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/**
 * Figma: node 3638:9414. The first section on the ink half of the page, so
 * every colour here is the on-dark variant.
 */
function OpenRoles() {
  const [tab, setTab] = useState('engineering')
  const panelId = 'open-roles-panel'
  const roles = ROLES[tab] ?? []

  return (
    <Section
      tone="none"
      spacing="none"
      className="pb-5xl pt-[calc(theme(spacing.4xl)*2)] text-on-dark"
    >
      <div className="grid items-start gap-lg lg:grid-cols-12">
        <Reveal className="lg:col-span-5 lg:col-start-1">
          <div className="flex flex-col items-start gap-2xl">
            <div className="flex max-w-[519px] flex-col gap-md">
              <Typography variant="h2" className="text-h3 text-white md:text-h2">
                Open Roles
              </Typography>
              <Typography variant="copyMedium" muted>
                We hire when we find people we would put in front of a client on day one. Explore
                our current openings below.
              </Typography>
            </div>

            <Tabs
              items={ROLE_TABS}
              active={tab}
              onChange={setTab}
              tone="onDark"
              panelId={panelId}
            />

            <div
              id={panelId}
              role="tabpanel"
              /* -1 so a keyboard user can reach the panel after the tablist. */
              tabIndex={-1}
              className="flex min-w-[192px] flex-col gap-md"
            >
              <Typography variant="copyXSmall" as="h3" muted className="font-semibold">
                Openings
              </Typography>
              {roles.length === 0 ? (
                <Typography variant="copyMedium" muted>
                  No openings on this team right now.
                </Typography>
              ) : (
                <ul className="flex flex-col gap-md">
                  {roles.map((role) => (
                    <li key={role}>
                      <a
                        href="#"
                        className={cn(
                          'text-copy-medium transition-opacity duration-fast ease-out hover:opacity-muted',
                          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                          'focus-visible:outline-on-dark',
                        )}
                      >
                        {role}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Reveal>

        {/* 519px square starting at column 8 (artboard x=841). */}
        <Reveal index={1} className="lg:col-span-5 lg:col-start-8">
          <img
            src={asset('/images/careers/roles.jpg')}
            alt=""
            aria-hidden="true"
            className="aspect-square w-full rounded-md object-cover"
          />
        </Reveal>
      </div>
    </Section>
  )
}

/** Figma: node 3638:9369. Six questions, on ink. */
function Faq() {
  return (
    <Section tone="none" spacing="none" className="pb-5xl text-on-dark">
      <div className="flex flex-col gap-2xl">
        <Reveal>
          <Typography variant="h2" className="text-h3 text-white md:text-h2">
            FAQ
          </Typography>
        </Reveal>
        <Reveal index={1}>
          <Accordion items={FAQ} tone="onDark" />
        </Reveal>
      </div>
    </Section>
  )
}

/**
 * Figma: node 3638:9404. On ink here, so the accent runs dark rather than the
 * accent.300 the light pages use — measured `#19313C` on the artboard, which
 * sits between accent.800 and accent.700; accent.800 is the exact ramp value.
 */
function ValuesMarquee() {
  return (
    <div className="pb-md pt-[calc(theme(spacing.4xl)*2)]">
      <Marquee speed="marqueeSlow" gapClassName="gap-lg" className="text-accent-800">
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

/**
 * OurBench through the marquee share ONE animated ground, so the change from
 * warm to ink happens as a single crossfade across the whole viewport.
 *
 * This is the same construction the homepage uses for white -> turquoise
 * (`WorkToOfferings`), and for the same reason. A vertical gradient cannot do
 * it: however well eased, it puts the warm colour at the top of the screen and
 * the ink at the bottom *simultaneously*, which reads as a hard band travelling
 * down the page — a divider — rather than as the page changing colour. That is
 * exactly what the first version of this page did.
 *
 * The marker is a zero-height element on the boundary. Tracking it from
 * 'start end' to 'start start' gives progress across one viewport-height of
 * scroll before it reaches the top, which is the window the crossfade has to
 * finish in; `motion.careersGround.fade` places the change inside that window
 * so the Bench copy is gone before the ground darkens and the ink has arrived
 * before the Open Roles heading does.
 */
function BenchToRoles() {
  const markerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress: raw } = useScroll({
    target: markerRef,
    offset: ['start end', 'start start'],
  })
  const progress = useLaggedProgress(raw)

  const { fade, contentFade } = motionTokens.careersGround

  const background = useTransform(
    progress,
    [fade.start, fade.end],
    [BENCH_GROUND, colorTokens.background.canvas],
  )
  /*
    Open Roles is cream type. It enters the viewport well before the ground
    darkens, so it is held at zero until the ink has largely arrived — exactly
    the split the homepage's offerings scene uses. Everything below it (FAQ,
    marquee) is far enough down that this has reached 1 long before it matters.
  */
  const contentOpacity = useTransform(
    progress,
    [contentFade.start, contentFade.end],
    [0, 1],
  )

  const tail = (
    <>
      <Faq />
      <ValuesMarquee />
    </>
  )

  // No scroll-linked colour under reduced motion: each half just paints its own.
  if (prefersReduced) {
    return (
      <>
        <div style={{ backgroundColor: BENCH_GROUND }}>
          <OurBench />
        </div>
        <div className="bg-canvas">
          <OpenRoles />
          {tail}
        </div>
      </>
    )
  }

  return (
    <fm.div style={{ backgroundColor: background }}>
      <OurBench />
      {/* Zero-height boundary the crossfade is timed against. */}
      <div ref={markerRef} aria-hidden className="h-0" />
      <fm.div style={{ opacity: contentOpacity }}>
        <OpenRoles />
      </fm.div>
      {tail}
    </fm.div>
  )
}

export function CareersPage() {
  return (
    <PageShell headerTone="onLight">
      {/* Warm half: its own gentle gradient, both ends nearly the same colour. */}
      <div style={{ backgroundImage: WARM_GRADIENT }}>
        <Hero />
        <HeroCarousel />
      </div>
      <BenchToRoles />
    </PageShell>
  )
}

export default CareersPage
