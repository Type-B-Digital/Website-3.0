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
import { useLayoutEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import {
  motion as fm,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  Button,
  Card,
  Container,
  Eyebrow,
  GlowText,
  Marquee,
  ParallaxSection,
  Reveal,
  Section,
  Tag,
  Typography,
} from '@/components'
import type { CardCrop } from '@/components'
import ScrollFillText from '@/components/ScrollFillText'
import CaretDown from '@/components/icons/CaretDown'
import { cn } from '@/lib/cn'
import useAutoAdvance from '@/lib/useAutoAdvance'
import { colors as colorTokens, motion as motionTokens } from '@/tokens'

/* ================================================================== *
 * CONTENT
 * Copy lifted verbatim from the artboard. Kept at the top of the file so
 * a content edit never means touching layout.
 * ================================================================== */

const NAV_LINKS = ['What we do', 'Industries', 'Case studies', 'Who we are', 'Publications']

/**
 * Figma: node 3390:26570.
 *
 * `box` is the frame size on the artboard. `crop` is Figma's image-fill
 * transform for that frame, as percentages of the box.
 *
 * The crop is not optional decoration: these PNGs are large canvases with the
 * wordmark occupying a small region. Fitting the whole file into the box
 * (object-contain) renders the mark far smaller than the artboard shows, which
 * is exactly what went wrong in v1. Reproducing the transform makes the mark
 * fill its box at the designed size.
 *
 * Logos with no `crop` are already tight to their frame and use object-cover.
 */
const CLIENT_LOGOS = [
  {
    name: 'Deloitte',
    box: { width: 95.2, height: 18.667 },
    crop: { width: '118.95%', height: '609.14%', left: '-11.76%', top: '-254.57%' },
    blend: '',
  },
  {
    name: 'Equinox',
    box: { width: 140, height: 18.143 },
    crop: { width: '100%', height: '144.78%', left: '0%', top: '-23.88%' },
    blend: 'mix-blend-lighten',
  },
  {
    name: 'HP',
    box: { width: 46.756, height: 46.667 },
    crop: { width: '229.01%', height: '113.38%', left: '-64.5%', top: '-6.69%' },
    blend: '',
  },
  {
    name: 'Oracle',
    box: { width: 120.744, height: 19.833 },
    crop: null,
    blend: 'mix-blend-lighten',
  },
  {
    name: 'Medtronic',
    box: { width: 121.052, height: 19.833 },
    crop: { width: '100%', height: '244.83%', left: '0%', top: '-72.41%' },
    blend: 'mix-blend-screen',
  },
  {
    name: 'Bell',
    box: { width: 40.632, height: 23.333 },
    crop: { width: '176.24%', height: '174.14%', left: '-38.12%', top: '-37.07%' },
    blend: '',
  },
  {
    name: 'PCL Construction',
    box: { width: 72.846, height: 46.667 },
    crop: { width: '100%', height: '128%', left: '0%', top: '-0.59%' },
    blend: '',
  },
  {
    name: 'BDO',
    box: { width: 60.459, height: 23.333 },
    crop: null,
    blend: '',
  },
].map((logo, i) => ({ ...logo, src: `/images/logos/logo-${i + 1}.png` }))

/**
 * "Bold. Brilliant. Beautiful." artwork geometry, as fractions of the panel.
 *
 * Figma: the component (node 3390:26748) sits at x=-26 with the words inset
 * 12.74% into its 1153.7px width, i.e. x=121 in the 1440 frame, 1006.72 wide.
 */
const HIGHLIGHT_ID = 'highlight'

const BBB_ARTWORK = {
  aspect: 1006.72 / 622.344,
  widthRatio: 1006.72 / 1440,
  leftRatio: 121 / 1440,
}

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

/**
 * Client logo row — Figma node 3390:26570.
 *
 * Lives inside the pinned scene rather than as its own band, so the marks stay
 * on screen for the whole introduction sequence (they used to scroll away
 * before the copy began filling). Full-bleed and travelling left continuously,
 * marks entering at the right edge; the artboard row already overflows the
 * frame (x=80 to x=1428), so the motion makes that overflow literal.
 */
function ClientLogos() {
  return (
    <Marquee speed="marqueeSlow" gapClassName="gap-logoGap" className="opacity-muted">
      {CLIENT_LOGOS.map((logo) => (
        <div
          key={logo.src}
          className="relative shrink-0 overflow-hidden"
          style={{ width: logo.box.width, height: logo.box.height }}
        >
          {logo.crop ? (
            <img
              src={logo.src}
              alt={logo.name}
              className={cn('absolute max-w-none', logo.blend)}
              style={{
                width: logo.crop.width,
                height: logo.crop.height,
                left: logo.crop.left,
                top: logo.crop.top,
              }}
            />
          ) : (
            <img
              src={logo.src}
              alt={logo.name}
              className={cn('absolute inset-0 size-full object-cover', logo.blend)}
            />
          )}
        </div>
      ))}
    </Marquee>
  )
}

const MANIFESTO_TEXT =
  'We bring hope and expert execution to bold innovators, guiding ambitious ' +
  'visions into brilliant outcomes with a relentless drive.'

/**
 * Figma: "Image-stack-right" — node 3431:27215, a 421.806 x 498.014 group.
 *
 * All three images are 400x480 at heart; two carry a small rotation
 * (-2.09deg and 2.66deg) which enlarges their bounding boxes to 417x494 and
 * 421.8x498. Positions are the group-relative offsets from the artboard, so
 * the three sit stacked and near-centred on one another.
 *
 * The assets are node RENDERS, not fill exports: Figma's fill export for
 * image-stack-3 comes back solid black, which is why only two images appeared
 * in the previous build. Rendering the node returns the real photo with the
 * rotation already baked in — so no CSS rotation is applied here.
 */
const MANIFESTO_STACK = [
  { src: '/images/stack/stack-1.png', left: 3.13, top: 1.92, width: 417.209, height: 494.243 },
  { src: '/images/stack/stack-2.png', left: 11.74, top: 9.05, width: 400, height: 480 },
  { src: '/images/stack/stack-3.png', left: 0, top: 0, width: 421.806, height: 498.014 },
]

const STACK_BOX = { width: 421.806, height: 498.014 }

/**
 * One image in the stack: enters from beyond the right edge and settles at its
 * artboard offset, over its own window of the scene's progress.
 */
function StackImage({
  image,
  index,
  progress,
}: {
  image: (typeof MANIFESTO_STACK)[number]
  index: number
  progress: MotionValue<number>
}) {
  const { scene } = motionTokens
  const start = scene.images.start + index * scene.images.stagger
  const end = start + scene.images.duration

  const x = useTransform(progress, [start, end], [`${scene.imageEnter}%`, '0%'])
  const opacity = useTransform(progress, [start, start + 0.03], [0, 1])

  return (
    <fm.img
      src={image.src}
      alt=""
      aria-hidden="true"
      className="absolute max-w-none will-change-transform"
      style={{
        left: image.left,
        top: image.top,
        width: image.width,
        height: image.height,
        zIndex: index,
        x,
        opacity,
      }}
    />
  )
}

/**
 * Manifesto — a scroll-pinned scene.
 *
 * Figma: "introduction-component" — node 3431:27216 (statement 3390:26579 at
 * 640px wide, image group 3431:27215). The artboard shows only the end state;
 * the behaviour comes from Eduardo's motion mockup.
 *
 * The scene occupies `scene.pinLength` viewport heights of scroll. A sticky
 * panel holds the frame still — logo row at the top, statement and image stack
 * below — while scroll drives two things on one clock: the statement filling
 * from 16% to full opacity a character at a time, and the three images entering
 * from the right one by one. Both land together at `scene.fill.end`, after
 * which the page continues normally.
 *
 * The statement column is pinned to 640px because that is the artboard's text
 * width, and the line breaks depend on it.
 */
function Manifesto() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })

  // Once the copy has filled and the stack has landed, the next scroll carries
  // the visitor to the highlight section rather than leaving them parked in the
  // half-and-half state where both sections are visible at once.
  useAutoAdvance({
    progress: scrollYProgress,
    targetId: HIGHLIGHT_ID,
    enabled: !prefersReduced,
  })

  const stack = (
    <div
      data-scene="manifesto-stack"
      className="relative shrink-0"
      style={{ width: STACK_BOX.width, height: STACK_BOX.height }}
    >
      {MANIFESTO_STACK.map((image, i) =>
        prefersReduced ? (
          <img
            key={image.src}
            src={image.src}
            alt=""
            aria-hidden="true"
            className="absolute max-w-none"
            style={{
              left: image.left,
              top: image.top,
              width: image.width,
              height: image.height,
              zIndex: i,
            }}
          />
        ) : (
          <StackImage key={image.src} image={image} index={i} progress={scrollYProgress} />
        ),
      )}
    </div>
  )

  // 1240px is the artboard's introduction-component width: 640 text + 178 gap
  // + 422 stack. justify-between reproduces that gap at the designed width.
  const row = (
    <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4xl">
      {prefersReduced ? (
        <Typography variant="h2" as="p" className="w-[640px] leading-normal">
          {MANIFESTO_TEXT}
        </Typography>
      ) : (
        <ScrollFillText
          text={MANIFESTO_TEXT}
          progress={scrollYProgress}
          className="w-[640px] text-h2 leading-normal text-on-dark"
        />
      )}
      {stack}
    </div>
  )

  // Reduced motion: no pin, no sweep — the finished frame, in normal flow.
  if (prefersReduced) {
    return (
      <Section tone="dark" spacing="loose" bare>
        <div className="flex flex-col gap-4xl">
          <ClientLogos />
          <Container>{row}</Container>
        </div>
      </Section>
    )
  }

  return (
    <div
      ref={sceneRef}
      className="relative bg-canvas text-on-dark"
      style={{ height: `${motionTokens.scene.pinLength * 100}vh` }}
    >
      {/* overflow-hidden clips entering images at the viewport edge. */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="shrink-0 pt-4xl">
          <ClientLogos />
        </div>
        <div className="flex flex-1 items-center">
          <Container>{row}</Container>
        </div>
      </div>
    </div>
  )
}


/**
 * Bold. Brilliant. Beautiful. — the page's centrepiece.
 *
 * Figma: "bbb-glowing-copy-component" node 3390:26748, stats node 3390:26720.
 *
 * A pinned scene the visitor can play in. A colour blob follows the pointer and
 * lights the words as it passes — see GlowText for how the three layers work.
 * The stats sit right-aligned against the 80px margin (the artboard frame runs
 * x=1051..1360 in a 1440 frame), vertically centred beside the words.
 *
 * Rather than cutting from this near-black band to the white section below, the
 * ground itself crossfades to that surface over the last third of the scene and
 * the content fades with it, so the seam never appears.
 */
function BoldBrilliantBeautiful() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { glowScene } = motionTokens

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })

  /**
   * A second tracker for the ENTRY phase — `scrollYProgress` above is clamped at
   * 0 until the panel pins, so it cannot describe the section rising into view.
   *
   * This matters: the glow is clipped by the section's own box, so while the
   * section is still climbing there is a hard horizontal edge where the glow
   * stops. Fading the whole scene in as it arrives means the section reads as
   * plain canvas during entry — identical to the band above it — and the edge
   * never appears.
   */
  const { scrollYProgress: entryProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'start start'],
  })
  // Deliberately late and short: the scene stays fully hidden while the section
  // climbs, so during entry it is indistinguishable from the canvas band above
  // it, then arrives over the last stretch. Widening this range brings the
  // clipped-glow edge back.
  const entryOpacity = useTransform(entryProgress, [0.88, 1], [0, 1])

  // Pointer in panel pixels. The springs are what make the blob trail the
  // cursor with weight instead of snapping to it.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointerX = useSpring(rawX, glowScene.pointer)
  const pointerY = useSpring(rawY, glowScene.pointer)

  // Rest the blob over the words before the pointer ever arrives, so the
  // section reads as designed on load and on touch devices.
  useLayoutEffect(() => {
    const el = panelRef.current
    if (!el) return
    const rest = () => {
      rawX.jump(el.clientWidth * glowScene.rest.x)
      rawY.jump(el.clientHeight * glowScene.rest.y)
    }
    rest()
    window.addEventListener('resize', rest)
    return () => window.removeEventListener('resize', rest)
  }, [rawX, rawY, glowScene.rest.x, glowScene.rest.y])

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = panelRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    rawX.set(event.clientX - rect.left)
    rawY.set(event.clientY - rect.top)
  }

  const background = useTransform(
    scrollYProgress,
    [glowScene.fade.start, glowScene.fade.end],
    [colorTokens.background.canvas, colorTokens.background.surface],
  )
  const contentOpacity = useTransform(
    scrollYProgress,
    [glowScene.fade.start, glowScene.fade.end],
    [1, 0],
  )

  const stats = (
    <div className="absolute right-4xl top-1/2 flex w-[309px] -translate-y-1/2 flex-col gap-4xl text-right">
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-sm">
          <Typography variant="h1" as="p" className="text-on-dark-muted">
            {stat.value}
          </Typography>
          <Typography variant="copyMedium" as="p" muted className="text-on-dark-muted">
            {stat.label}
          </Typography>
        </div>
      ))}
    </div>
  )

  const words = (
    <GlowText
      solidSrc="/vectors/bbb-solid.svg"
      strokeSrc="/vectors/bbb-stroke.svg"
      label="Bold. Brilliant. Beautiful."
      aspect={BBB_ARTWORK.aspect}
      widthRatio={BBB_ARTWORK.widthRatio}
      leftRatio={BBB_ARTWORK.leftRatio}
      pointerX={pointerX}
      pointerY={pointerY}
    />
  )

  // Reduced motion: no pin, no crossfade, blob parked at its resting spot.
  if (prefersReduced) {
    return (
      <section id={HIGHLIGHT_ID} className="relative min-h-screen w-full overflow-hidden bg-canvas text-on-dark">
        <div ref={panelRef} className="absolute inset-0">
          {words}
          {stats}
        </div>
      </section>
    )
  }

  return (
    <div
      id={HIGHLIGHT_ID}
      ref={sceneRef}
      className="relative"
      style={{ height: `${glowScene.pinLength * 100}vh` }}
    >
      <fm.div
        ref={panelRef}
        onPointerMove={handlePointerMove}
        className="sticky top-0 h-screen w-full overflow-hidden text-on-dark"
        style={{ backgroundColor: background }}
      >
        <fm.div className="absolute inset-0" style={{ opacity: entryOpacity }}>
          <fm.div className="absolute inset-0" style={{ opacity: contentOpacity }}>
            {words}
            {stats}
          </fm.div>
        </fm.div>
      </fm.div>
    </div>
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
        <Manifesto />
        <BoldBrilliantBeautiful />
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
