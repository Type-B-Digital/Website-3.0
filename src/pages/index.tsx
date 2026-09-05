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
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import {
  AnimatePresence,
  animate,
  motion as fm,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
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
  CountUp,
  Eyebrow,
  GlowText,
  GroundCrossfade,
  HeroIntro,
  Marquee,
  Reveal,
  ScrollTrack,
  Section,
  Tag,
  Typography,
  VALUES,
} from '@/components'
import type { CardCrop } from '@/components'
import ScrollFillText from '@/components/ScrollFillText'
import { PageShell } from '@/components/layout'
import { cn } from '@/lib/cn'
import useLaggedProgress from '@/lib/useLaggedProgress'
import {
  colors as colorTokens,
  gradients as gradientTokens,
  motion as motionTokens,
} from '@/tokens'
import { asset } from '@/lib/asset'

/* ================================================================== *
 * CONTENT
 * Copy lifted verbatim from the artboard. Kept at the top of the file so
 * a content edit never means touching layout.
 * ================================================================== */

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
].map((logo, i) => ({ ...logo, src: asset(`/images/logos/logo-${i + 1}.png`) }))

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

/**
 * Figma: nodes 3390:26720 / 26724 / 26727.
 * Split into prefix/number/suffix so the numeral can count up while the
 * surrounding characters stay put.
 */
const STATS = [
  { to: 100, prefix: '~', suffix: '', label: 'Collective years building products & brands' },
  { to: 25, prefix: '', suffix: '+', label: 'Global customers served' },
  { to: 7, prefix: '', suffix: '', label: 'Countries in our delivery network' },
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
  { title: 'Founders & Startups', src: asset('/images/stage-founders.png') },
  { title: 'Scaleups', src: asset('/images/stage-scaleups.png') },
  { title: 'Enterprise & Mid Market', src: asset('/images/stage-enterprise.png') },
]

/**
 * Figma: nodes 3390:26445 … 26519. Each row has its OWN thumbnail — they were
 * all sharing one image, which made the hover preview identical whichever row
 * you were on.
 *
 * Three of the six fills (rows 2, 3 and 5) export from Figma as single-colour
 * images, and row 4's thumbnail is a composite rather than one fill. All four
 * come from `download_assets` at scale 4 instead, which renders the node as
 * composed — see docs/BUILD_LOG.md.
 */
const CASE_STUDIES = [
  { name: 'Medtronic', description: 'Daily payout on autopilot mode.' },
  { name: 'Ferry', description: 'Project description and details here.' },
  { name: 'Project Name', description: 'Project description and details here.' },
  { name: 'Project Name', description: 'Project description and details here.' },
  { name: 'Project Name', description: 'Project description and details here.' },
  { name: 'Project Name', description: 'Project description and details here.' },
].map((c, i) => ({
  ...c,
  tags: ['Tag 1', 'Tag 2', 'Tag 3'],
  thumb: asset(`/images/work/case-${i + 1}.png`),
}))

/**
 * Figma: words node 3390:26751, copy node 3390:26555, image node 3390:26553.
 *
 * ⚠ The artboard only provides copy and imagery for ONE selected state (Product
 * is the one drawn), so all three entries currently share that placeholder
 * lorem and that image. The selection mechanism is complete — filling in real
 * per-offering content is one line each here and nothing else.
 */
const OFFERING_PLACEHOLDER_COPY =
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis at the ' +
  'praesentium voluptatum deleniti.'

const OFFERINGS = [
  {
    label: 'Advisory',
    copy: OFFERING_PLACEHOLDER_COPY,
    image: asset('/images/partner/offering-1.png'),
  },
  {
    label: 'Product',
    copy: OFFERING_PLACEHOLDER_COPY,
    image: asset('/images/partner/offering-1.png'),
  },
  {
    label: 'Teams',
    copy: OFFERING_PLACEHOLDER_COPY,
    image: asset('/images/partner/offering-1.png'),
  },
]

/* ================================================================== *
 * SECTIONS
 * ================================================================== */

/**
 * Figma: "Frame 1000003409" — node 3390:26582
 * Background: gradient `b1` — Figma style "Type B BG 1", node 3430:26778
 *
 * Fills the viewport, full-bleed, so the hero is the whole first screen.
 *
 * The gradient sweeps once. The first downward gesture plays an 800ms sweep
 * instead of moving the page; the next one scrolls normally.
 *
 * The sweep ROTATES the gradient from 135deg to 225deg rather than sliding it.
 * The dark corner has to travel along the top from left to right while the warm
 * corner travels along the bottom from right to left — that is a change of which
 * diagonal the bands run along, and translating a fixed-angle strip cannot do it
 * (it moves the bands but leaves their orientation alone, so one end state or
 * the other always comes out mirrored). Rotating passes through 180deg, where
 * dark sits across the top and warm across the bottom, which is the midpoint of
 * exactly the movement described.
 *
 * This does swallow one gesture, so it is bounded hard: it only ever arms at the
 * very top of the page, only on a downward gesture, and only once per load. It
 * blocks scrolling only for the length of the sweep. Note this is prevention,
 * not a programmatic scroll — nothing is animating `scrollY` against the
 * browser's momentum, which is what made the old section hand-off oscillate.
 */
function Hero() {
  const prefersReduced = useReducedMotion()
  // Widened: `as const` on the tokens narrows `from` to the literal 135,
  // which would make the value unassignable to the end angle.
  const angle = useMotionValue<number>(motionTokens.heroSweep.from)
  const backgroundImage = useMotionTemplate`linear-gradient(${angle}deg, ${gradientTokens.b1Stops})`
  const played = useRef(false)
  const sweeping = useRef(false)

  useEffect(() => {
    if (prefersReduced) {
      angle.set(motionTokens.heroSweep.to)
      played.current = true
      return
    }

    const play = (event: Event, goingDown: boolean) => {
      if (played.current) return
      // Only at the very top; if the visitor is already past the hero, retire it.
      if (window.scrollY > 4) {
        played.current = true
        return
      }
      if (!goingDown) return
      event.preventDefault()
      if (sweeping.current) return
      sweeping.current = true
      animate(angle, motionTokens.heroSweep.to, {
        duration: motionTokens.heroSweep.duration,
        ease: [...motionTokens.easing.inOut],
      }).then(() => {
        played.current = true
        sweeping.current = false
      })
    }

    const onWheel = (event: WheelEvent) => play(event, event.deltaY > 0)
    let touchY = 0
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (event: TouchEvent) => {
      play(event, (event.touches[0]?.clientY ?? 0) < touchY)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [prefersReduced, angle])

  return (
    <HeroIntro>
      {/* Fades up on load; see HeroIntro. */}
      <Section
        tone="dark"
        spacing="none"
        className="relative flex min-h-screen items-center overflow-hidden py-4xl"
      >
        {/*
          The gradient layer is a sibling BEFORE the content rather than a `-z-10`
          layer: negative z-index would put it behind the Section's own
          `bg-canvas`, which then paints over it. As an earlier child it lands on
          top of that background colour, which stays as the fallback.

          Rebuilding the gradient string each frame repaints, where a transform
          would not — acceptable for a single 800ms one-shot, and the only way to
          rotate a gradient's direction.
        */}
        <fm.div aria-hidden className="absolute inset-0" style={{ backgroundImage }} />
        <div className="relative mx-auto flex max-w-[880px] flex-col items-center gap-3xl text-center">
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
    </HeroIntro>
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
  {
    src: asset('/images/stack/stack-1.png'),
    left: 3.13,
    top: 1.92,
    width: 417.209,
    height: 494.243,
  },
  { src: asset('/images/stack/stack-2.png'), left: 11.74, top: 9.05, width: 400, height: 480 },
  { src: asset('/images/stack/stack-3.png'), left: 0, top: 0, width: 421.806, height: 498.014 },
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

  const travel = useTransform(progress, [start, end], [scene.imageEnter, 0])
  /*
    A spring per image, on top of the scene's already-smoothed progress. The
    scene lag makes the whole frame trail the scroll; this makes each card
    settle on its own, so the three do not arrive locked together. Damping
    rises slightly with index so later cards settle a touch softer.
  */
  const lagged = useSpring(travel, {
    ...motionTokens.scrollLag,
    damping: motionTokens.scrollLag.damping + index * 3,
  })
  const x = useTransform(lagged, (value) => `${value}%`)
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
  const { scrollYProgress: rawProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })
  // Smoothed so the fill and the stack trail the scroll and settle.
  const scrollYProgress = useLaggedProgress(rawProgress)

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
        <Typography variant="h2" as="p" className="w-[640px] leading-[1.2]">
          {MANIFESTO_TEXT}
        </Typography>
      ) : (
        <ScrollFillText
          text={MANIFESTO_TEXT}
          progress={scrollYProgress}
          className="w-[640px] text-h2 leading-[1.2] text-on-dark"
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
        {/* 40px from the top, per the artboard. */}
        <div className="shrink-0 pt-2xl">
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

  const { scrollYProgress: rawProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })
  const scrollYProgress = useLaggedProgress(rawProgress)

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
  const { scrollYProgress: rawEntry } = useScroll({
    target: sceneRef,
    offset: ['start end', 'start start'],
  })
  const entryProgress = useLaggedProgress(rawEntry)
  // Deliberately late and short: the scene stays fully hidden while the section
  // climbs, so during entry it is indistinguishable from the canvas band above
  // it, then arrives over the last stretch. Widening this range brings the
  // clipped-glow edge back.
  const entryOpacity = useTransform(entryProgress, [0.88, 1], [0, 1])

  // Gate the stat count-up on the scene actually being visible: the numbers are
  // technically on screen the whole time the section climbs, behind opacity 0.
  const [revealed, setRevealed] = useState(false)
  useMotionValueEvent(entryProgress, 'change', (value) => {
    if (value > 0.92) setRevealed(true)
  })

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
            <CountUp to={stat.to} prefix={stat.prefix} suffix={stat.suffix} start={revealed} />
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
      solidSrc={asset('/vectors/bbb-solid.svg')}
      strokeSrc={asset('/vectors/bbb-stroke.svg')}
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
      <section
        id={HIGHLIGHT_ID}
        className="relative min-h-screen w-full overflow-hidden bg-canvas text-on-dark"
      >
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
      /*
        `snap-start` plus `scroll-snap-type: y proximity` on the root hands the
        introduction-to-highlight boundary to the browser's own snapping, so it
        arrives in place rather than being crawled through. Native snapping
        cooperates with trackpad momentum; the JS hand-off this replaces fought
        it and oscillated.
      */
      className="relative snap-start"
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
    // `bare` so the card row can run full-bleed past the content width; the
    // header keeps its own Container and normal 80px margins.
    /*
      Bottom trimmed to 80px so that with the next section's 80px top the
      boundary is 160px total, matching the artboard (cards end y=3416, the next
      frame starts y=3569). Two `loose` sections would otherwise stack to 320.
    */
    <Section tone="light" spacing="loose" bare className="pb-4xl xl:pb-4xl">
      <div className="flex flex-col gap-3xl">
        <Container>
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
        </Container>

        {/*
          Figma: cards at x=80/514/948/1382, the last ending at 1792 — past the
          1440 frame. The row starts on the left margin and slides left as the
          page scrolls; no scroll container, so no scrollbar.
        */}
        <ScrollTrack>
          {PILLARS.map((pillar, i) => (
            <li key={pillar.title} className="w-[410px] shrink-0">
              <Reveal index={i}>
                <Card
                  src={asset('/images/scene.png')}
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
        </ScrollTrack>
      </div>
    </Section>
  )
}

/** Figma: "Frame 1000003413" — node 3390:26435 */
function Stages() {
  return (
    <Section tone="light" spacing="loose" className="pt-4xl xl:pt-4xl">
      <div className="flex flex-col items-center gap-3xl">
        <Reveal>
          <div className="flex flex-col items-center gap-md text-center">
            <Eyebrow tone="onLight">Who we serve</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              Built for all stages
            </Typography>
          </div>
        </Reveal>

        {/*
          Amber glow behind the cards. Figma node 3601:536 — a soft ellipse at
          mix-blend-hard-light. Built from gradients for the same reason as the
          footer glow: the exported SVG's falloff clips when scaled.
        */}
        <div className="relative w-full">
          <div
            aria-hidden
            className="stages-glow pointer-events-none absolute inset-x-[-6%] top-[8%] h-[70%]"
          />
          <ul className="relative grid w-full gap-lg md:grid-cols-3">
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
      </div>
    </Section>
  )
}

/**
 * Figma: "Frame 1000003574" — node 3390:26750, hover CTA node 3390:26633.
 *
 * Hovering a case study on the right does two things: its thumbnail takes a
 * heavy scrim with a "Learn more" CTA over it, and the same image appears large
 * in the left column. There is deliberately NO preview at rest — the left
 * column below the CTA is empty until a row is hovered.
 *
 * Focus drives the same state as hover, so the preview works for anyone moving
 * through the list with a keyboard rather than a pointer.
 */
function Work() {
  const [active, setActive] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()
  const activeCase = active === null ? null : CASE_STUDIES[active]

  // Only clear if the row leaving is the one that set it — otherwise moving
  // between adjacent rows can blank the preview on the way past.
  const clear = (index: number) => setActive((current) => (current === index ? null : current))

  const transition = prefersReduced
    ? { duration: 0 }
    : { duration: motionTokens.duration.fast, ease: [...motionTokens.easing.out] }

  return (
    /* Ground comes from WorkToOfferings, which crossfades it into the accent. */
    <Section tone="none" spacing="loose" id="work" className="relative text-on-light">
      <div className="relative grid gap-4xl lg:grid-cols-[519px_1fr]">
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

          {/*
            Hover preview — card-horizontal-medium, 519x311 (Figma node
            3390:26538). The box is always in the layout so nothing reflows when
            an image arrives; only the image itself fades.
          */}
          <div className="relative hidden aspect-[519/311] w-full lg:block">
            <AnimatePresence>
              {activeCase && (
                <fm.div
                  key={activeCase.thumb}
                  className="absolute inset-0 overflow-hidden rounded-md"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transition}
                >
                  <img
                    src={activeCase.thumb}
                    alt={`${activeCase.name} — project preview`}
                    className="size-full object-cover"
                  />
                </fm.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ul className="flex flex-col">
          {CASE_STUDIES.map((project, i) => {
            const isActive = active === i
            return (
              <li key={`${project.name}-${i}`} className="border-b border-divider">
                <Reveal index={i}>
                  <a
                    href="#"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => clear(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => clear(i)}
                    className="flex items-center justify-between gap-lg py-md"
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

                    <div className="relative hidden h-[120px] w-[201px] shrink-0 overflow-hidden rounded-md sm:block">
                      <img
                        src={project.thumb}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 size-full object-cover"
                      />
                      {/* Scrim + CTA. `as="span"` because this sits inside the row link. */}
                      <fm.div
                        className="absolute inset-0 flex items-center justify-center bg-scrim-strong"
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={transition}
                      >
                        <Button as="span" variant="tertiary" tone="onDark">
                          Learn more
                        </Button>
                      </fm.div>
                    </div>
                  </a>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

/**
 * How we partner — a pinned scene that steps through the three offerings.
 *
 * Figma: nodes 3390:26754 / 26776; row layout node 3390:26753 (copy 302 /
 * words 291 / image 302, which `justify-between` reproduces at the 1280 content
 * width). Values line node 3390:26760, arc node 3390:26557.
 *
 * Laid out as a column rather than a centred block: header pinned to the top on
 * a 120px inset, the offerings row taking the space between, and the values
 * marquee riding the bottom edge over its arc.
 *
 * The ground is solid accent. The light-to-turquoise blend happens in the
 * section ABOVE via a gradient bridge, which is what removes both the dividing
 * line and the stretch of white that used to sit between the two.
 *
 * Scroll selects each offering in turn; clicking one scrolls to the middle of
 * its segment rather than just setting state, so scroll stays the single source
 * of truth and a click cannot be undone by the next flick of the wheel.
 */
function Partner() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { offeringScene } = motionTokens
  const [index, setIndex] = useState(0)

  const { scrollYProgress: rawProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  })
  const scrollYProgress = useLaggedProgress(rawProgress)

  // Entry progress, for fading the content in once the shared ground has
  // actually turned turquoise — cream type over a pale ground is unreadable.
  const { scrollYProgress: rawEntry } = useScroll({
    target: sceneRef,
    offset: ['start end', 'start start'],
  })
  const entryProgress = useLaggedProgress(rawEntry)
  const contentOpacity = useTransform(
    entryProgress,
    [offeringScene.contentFade.start, offeringScene.contentFade.end],
    [0, 1],
  )

  const { selectStart } = offeringScene
  const fractionFor = (target: number) =>
    selectStart + (1 - selectStart) * ((target + 0.5) / OFFERINGS.length)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const local = (value - selectStart) / (1 - selectStart)
    const next = Math.floor(Math.max(0, Math.min(0.999, local)) * OFFERINGS.length)
    setIndex(Math.max(0, Math.min(OFFERINGS.length - 1, next)))
  })

  const goTo = (target: number) => {
    const scene = sceneRef.current
    if (!scene || prefersReduced) {
      setIndex(target)
      return
    }
    const range = scene.offsetHeight - window.innerHeight
    window.scrollTo({ top: scene.offsetTop + range * fractionFor(target), behavior: 'smooth' })
  }

  const active = OFFERINGS[index]
  const swap = { duration: prefersReduced ? 0 : motionTokens.duration.fast }

  const header = (
    <Container>
      <div className="flex max-w-[351px] flex-col items-start gap-md">
        <Eyebrow tone="onAccent">Core offerings</Eyebrow>
        <Typography variant="h2" className="text-h3 md:text-h2">
          How we partner
        </Typography>
      </div>
    </Container>
  )

  const row = (
    <Container>
      <div className="flex flex-col items-center justify-between gap-4xl lg:flex-row">
        {/* Copy for the selected offering. Fixed box so switching cannot reflow. */}
        <div className="relative min-h-[72px] w-full lg:w-[302px]">
          <AnimatePresence mode="wait">
            <fm.div
              key={`copy-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={swap}
            >
              <Typography variant="copyMedium">{active.copy}</Typography>
            </fm.div>
          </AnimatePresence>
        </div>

        <ul className="flex w-full flex-col items-center gap-lg text-center lg:w-[291px]">
          {OFFERINGS.map((offering, i) => {
            const selected = i === index
            return (
              <li key={offering.label}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={selected ? 'true' : undefined}
                  className={cn(
                    'text-h2 transition-colors duration-fast ease-out md:text-h1',
                    selected ? 'text-on-dark-muted' : 'text-accent-400 hover:text-accent-300',
                  )}
                >
                  {offering.label}
                </button>
              </li>
            )
          })}
        </ul>

        {/* Figma: 302x302, node 3390:26553. */}
        <div className="relative aspect-square w-full max-w-[302px] shrink-0">
          <AnimatePresence>
            <fm.img
              key={`image-${index}`}
              src={active.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full rounded-md object-cover object-bottom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={swap}
            />
          </AnimatePresence>
        </div>
      </div>
    </Container>
  )

  /* Values line — Figma node 3390:26760, riding the arc at node 3390:26557. */
  const values = (
    <div className="relative">
      <img
        src={asset('/vectors/values-arc.svg')}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 w-[70%] -translate-x-1/2"
      />
      {/* Same colour as an unselected offering, so the band reads as one family. */}
      <Marquee speed="marqueeSlow" gapClassName="gap-lg" className="relative pb-md text-accent-400">
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

  // Reduced motion: no pin, the accent ground applied directly.
  if (prefersReduced) {
    return (
      <Section tone="accent" spacing="none" bare className="pb-4xl pt-4xl">
        <div className="flex flex-col gap-4xl">
          {header}
          {row}
          {values}
        </div>
      </Section>
    )
  }

  return (
    <div
      ref={sceneRef}
      className="relative"
      style={{ height: `${offeringScene.pinLength * 100}vh` }}
    >
      {/* No ground here either — WorkToOfferings paints it. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden text-on-dark-muted">
        {/*
          Header and marquee are pinned to the panel's edges and the row is
          centred on the panel itself, rather than all three sharing a
          `justify-between` column. In that column the row centres in whatever
          space is LEFT OVER between header and marquee — and since the header
          is taller than the marquee, that midpoint sits below the section's own
          middle, which read as the row hanging low.
        */}
        <fm.div className="relative size-full" style={{ opacity: contentOpacity }}>
          <div className="absolute inset-x-0 top-0 pt-4xl">{header}</div>
          <div className="flex size-full items-center">{row}</div>
          <div className="absolute inset-x-0 bottom-0">{values}</div>
        </fm.div>
      </div>
    </div>
  )
}

/**
 * Work -> Offerings. The ground goes cream to accent as the boundary between
 * the two sections crosses the viewport; see `GroundCrossfade`.
 */
function WorkToOfferings() {
  return (
    <GroundCrossfade
      from={colorTokens.background.surface}
      to={colorTokens.background.accent}
      fade={motionTokens.offeringScene.groundFade}
      above={<Work />}
      below={<Partner />}
    />
  )
}

/* ================================================================== *
 * PAGE
 * ================================================================== */

export function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Manifesto />
      <BoldBrilliantBeautiful />
      <Pillars />
      <Stages />
      <WorkToOfferings />
    </PageShell>
  )
}

export default HomePage
