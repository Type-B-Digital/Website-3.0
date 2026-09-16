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
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import {
  AnimatePresence,
  cubicBezier,
  motion as fm,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowRight,
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
import { PageShell } from '@/components/layout'
import { cn } from '@/lib/cn'
import useLaggedProgress from '@/lib/useLaggedProgress'
import {
  colors as colorTokens,
  gradients as gradientTokens,
  motion as motionTokens,
} from '@/tokens'
import { Link } from 'react-router-dom'
import { asset } from '@/lib/asset'
import { HOMEPAGE_WORK, ROW_TAGS } from './work-content'

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
  /*
    ⚠ No `leftRatio` and no `liftRatio` any more. The board draws the words
    off-centre at x=121 and the previous build lifted them to clear a stats row
    sitting underneath. Both are gone: the stats scroll OVER the words now
    rather than sharing the frame with them, so there is nothing to clear, and
    Eduardo asked for the copy centred on the section. GlowText centres both
    axes when neither ratio is given.
  */
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

/**
 * Figma: nodes 3390:26543 / 26544 / 26545
 *
 * ⚠ `to` is null on all three. Nabeel, 2026-09-15: these cards should be
 * "clickable to their individual page (to be designed & built)" — so the pages
 * are commissioned and do not exist yet.
 *
 * The site's standing rule is that a label with nowhere to go stays inert
 * rather than 404ing, and that applies to a card as much as to a footer row.
 * So the card is built as the control it is about to be — one focusable
 * element, its own hover and press states, the arrow affordance that says it
 * leads somewhere — and `to` is the single thing still missing. When the three
 * pages land this is one string each and nothing else changes.
 *
 * The suggested routes are written down rather than left to be re-decided: they
 * follow `/industries/*`, the one existing family of sibling pages hanging off
 * a homepage card row.
 */
const STAGES: { title: string; src: string; to: string | null }[] = [
  { title: 'Founders & Startups', src: asset('/images/stage-founders.png'), to: null },
  { title: 'Scaleups', src: asset('/images/stage-scaleups.png'), to: null },
  { title: 'Enterprise & Mid Market', src: asset('/images/stage-enterprise.png'), to: null },
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
/**
 * ⚠ Was six placeholder rows — "Medtronic", "Ferry", then "Project Name" four
 * times, all sharing "Project description and details here." and tags reading
 * "Tag 1"/"Tag 2"/"Tag 3" — while Our Work carried the nine real ones. The two
 * pages showed a different body of work. Both now read `work-content.ts`.
 */
const CASE_STUDIES = HOMEPAGE_WORK.map((work) => ({
  ...work,
  tags: ROW_TAGS,
  thumb: asset(work.thumb ?? ''),
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
 * ── Ambient, not scroll-armed (Nabeel, 2026-09-15) ───────────────────────
 *
 * The sweep used to be paid for with a scroll gesture: the first downward
 * wheel or swipe at the top of the page was swallowed and played the sweep
 * instead of moving the page. That worked, and it cost the visitor their first
 * gesture to find out the hero did anything at all — "instead of having to
 * scroll there could be something happening in the background".
 *
 * It now runs on its own clock from load: a very slow sweep left to right,
 * a beat at the end, then the same sweep back, indefinitely. Nothing listens
 * to the wheel any more, so the first gesture on the page scrolls the page.
 * See `motion.heroSweep` for why it reverses rather than looping.
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
  const groundRef = useRef<HTMLDivElement>(null)
  /*
    Whether the gradient layer is on screen. A ref, not state: it is read inside
    the frame callback and must never cause a render of its own.
  */
  const onScreen = useRef(true)

  useEffect(() => {
    const ground = groundRef.current
    if (!ground) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        /*
          A zero-area box has not been laid out yet. The browser reports it as
          not intersecting, which is true and useless — believing it parks the
          hero while it is plainly on screen.
        */
        const { width, height } = entry.boundingClientRect
        if (width === 0 && height === 0) return
        onScreen.current = entry.isIntersecting
      },
      /* Any sliver counts — the hero is taller than the viewport. */
      { threshold: 0 },
    )
    observer.observe(ground)
    return () => observer.disconnect()
  }, [])

  /*
    The sweep, driven from the frame clock.

    `useAnimationFrame` rather than `animate(angle, to, { repeat: Infinity,
    repeatType: 'mirror', repeatDelay: hold })`, which is the shorter way to
    write it. Two reasons, neither of them that the tween does not work:

    - The HOLD at each end is part of one explicit cycle here — out, hold, back,
      hold — instead of a `repeatDelay` interacting with a mirrored repeat.
    - Nothing is written at all while the hero is off screen. That matters more
      than it looks: every write rebuilds the gradient STRING and repaints a
      full-viewport four-stop gradient, because there is no transform that
      rotates a gradient (see the note in the markup below). A sweep that never
      stops would otherwise repaint the top of the page every frame for the life
      of the tab, including while the visitor is reading the footer. Skipping
      the write is a cheaper and less stateful way to get that than pausing and
      resuming playback on the observer.

    ⚠ The callback is memoised because it has to be: `useAnimationFrame`
    re-subscribes whenever the function identity changes, so an inline arrow
    would cancel and re-register on every render of this component.
  */
  const ease = useMemo(() => cubicBezier(...motionTokens.easing.inOut), [])

  const sweep = useCallback(
    (elapsed: number) => {
      if (prefersReduced || !onScreen.current) return

      const { from, to, duration, hold } = motionTokens.heroSweep
      const travel = duration * 1000
      const pause = hold * 1000
      /* out, hold, back, hold */
      const cycle = (travel + pause) * 2
      const phase = elapsed % cycle

      let progress: number
      if (phase < travel) progress = ease(phase / travel)
      else if (phase < travel + pause) progress = 1
      else if (phase < travel * 2 + pause) progress = 1 - ease((phase - travel - pause) / travel)
      else progress = 0

      angle.set(from + (to - from) * progress)
    },
    [prefersReduced, angle, ease],
  )

  useAnimationFrame(sweep)

  /* Reduced motion: parked at the end state, which is the one the artboard draws. */
  useEffect(() => {
    if (prefersReduced) angle.set(motionTokens.heroSweep.to)
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
          would not. That is the only way to rotate a gradient's direction, and
          it is why the effect above pauses the sweep once this element leaves
          the viewport.
        */}
        <fm.div
          ref={groundRef}
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundImage }}
        />
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
    /* 93px between marks — measured off node 3390:26570. Held here as a
       composition literal since `spacing.logoGap` was retired: it is one
       strip's gap, not a step anyone else should reach for. */
    <Marquee speed="marqueeSlow" gapClassName="gap-[93px]" className="opacity-muted">
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
 * artboard offset.
 *
 * ⚠ Was scroll-driven — each image had its own window of a pinned scene's
 * progress and moved only while the wheel moved. It now plays itself, on a
 * timer, the first time the stack comes into view (Nabeel, 2026-09-15).
 *
 * ⚠ The `whileInView` trigger is on the PARENT (see `Manifesto`), and these
 * inherit it through variants rather than each declaring their own. That is
 * not a style preference — it is the only arrangement that works here. An
 * image starts 170% of its own width to the right of where it lands, which is
 * outside the row's `overflow-hidden`, so an observer watching the image itself
 * never sees it intersect, never fires, and the image stays parked off-stage
 * forever. The parent is on screen, so the parent is what gets watched.
 *
 * The stagger is a per-image delay. Later images also take slightly longer, so
 * the three do not arrive locked together — the same intent the old per-image
 * spring damping had, expressed as duration now that there is no scroll value
 * to spring against.
 */
function StackImage({ image, index }: { image: (typeof MANIFESTO_STACK)[number]; index: number }) {
  const { scene, easing } = motionTokens
  const delay = scene.start + index * scene.stagger

  return (
    <fm.img
      src={image.src}
      alt=""
      aria-hidden="true"
      className="absolute max-w-none rounded-md will-change-transform"
      style={{
        left: image.left,
        top: image.top,
        width: image.width,
        height: image.height,
        zIndex: index,
      }}
      variants={{
        hidden: { x: `${scene.imageEnter}%`, opacity: 0 },
        visible: {
          x: '0%',
          opacity: 1,
          transition: {
            duration: scene.duration + index * 0.04,
            delay,
            ease: [...easing.inOut],
            opacity: { duration: motionTokens.duration.fast, delay },
          },
        },
      }}
    />
  )
}

/**
 * Manifesto — the introduction band.
 *
 * Figma: "introduction-component" — node 3431:27216 (statement 3390:26579 at
 * 640px wide, image group 3431:27215). The artboard shows the end state, which
 * is now the only state the copy has.
 *
 * ── Unpinned (Nabeel, 2026-09-15) ────────────────────────────────────────
 *
 * This was a three-viewport scroll-pinned scene: a sticky panel held the frame
 * still while scroll drove the statement filling in a character at a time from
 * 16% opacity, and the three images sliding in from the right. "Instead of
 * scrolling to fill in the copy and slide in images, the copy can be static
 * (white) and the images can slide in automatically at a medium pace."
 *
 * Both halves of that follow:
 *
 * - The statement is plain cream type at full opacity. `ScrollFillText` is no
 *   longer used here — it is still exported, and the brand system page still
 *   documents it, but nothing on the homepage drives it any more.
 * - The images play themselves when they come into view; see `StackImage`.
 *
 * With nothing left on the scroll clock the pin has no work to do, so the
 * section is an ordinary band in normal flow — which also gives the page back
 * two viewport heights of scroll it was spending on one frame. The layout is
 * the one `prefers-reduced-motion` was already falling back to.
 *
 * The statement column is pinned to 640px because that is the artboard's text
 * width, and the line breaks depend on it. It only holds that measure once
 * there is room for it and the stack side by side.
 */
function Manifesto() {
  const prefersReduced = useReducedMotion()

  const stack = (
    <fm.div
      data-scene="manifesto-stack"
      className="relative shrink-0"
      style={{ width: STACK_BOX.width, height: STACK_BOX.height }}
      /* The trigger for all three images — see the note on StackImage. */
      initial={prefersReduced ? undefined : 'hidden'}
      whileInView={prefersReduced ? undefined : 'visible'}
      viewport={motionTokens.viewport}
    >
      {MANIFESTO_STACK.map((image, i) =>
        prefersReduced ? (
          <img
            key={image.src}
            src={image.src}
            alt=""
            aria-hidden="true"
            className="absolute max-w-none rounded-md"
            style={{
              left: image.left,
              top: image.top,
              width: image.width,
              height: image.height,
              zIndex: i,
            }}
          />
        ) : (
          <StackImage key={image.src} image={image} index={i} />
        ),
      )}
    </fm.div>
  )

  // 1240px is the artboard's introduction-component width: 640 text + 178 gap
  // + 422 stack. justify-between reproduces that gap at the designed width.
  return (
    /*
      ⚠ `tone="none"` and its own padding, rather than `tone="dark"` with the
      loose rhythm.

      The ground is painted by `IntroToHighlight` now, because the glow that
      starts here has to run underneath this section AND the one below it; an
      opaque `bg-canvas` on this section would cover it.

      The top padding is 40, not the loose 80/160 it used to inherit. Eduardo,
      2026-09-16: "make sure the logos in the introduction section has 40px top
      padding from the hero." The board agrees — the hero rectangle ends at
      y=880 (node 3944:732) and the logo row starts at 920 (node 3944:722).
    */
    <Section tone="none" spacing="none" bare className="relative pb-4xl pt-2xl xl:pb-[160px]">
      <div className="flex flex-col gap-4xl">
        <ClientLogos />
        <Container>
          {/*
            `overflow-hidden` on the row, not on a pinned panel: the images start
            170% of their own width to the right and have to be clipped by
            something on the way in. It used to be the sticky frame.

            ⚠ Which makes the row the one place on this page where content that
            does not fit DISAPPEARS rather than wrapping. The statement column is
            therefore `flex-1` with the artboard's 640 as a MAXIMUM, not as a
            fixed width: 640 + 80 + the stack's 422 is 1142, and the fluid grid
            only clears that above about 1300px. At 1266 the fixed version put
            the stack 36px past the right edge, where the clip ate it whole.
          */}
          <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-4xl overflow-hidden lg:flex-row">
            <Reveal className="w-full lg:max-w-[640px] lg:flex-1">
              <Typography variant="h2" as="p" className="leading-[1.2]">
                {MANIFESTO_TEXT}
              </Typography>
            </Reveal>
            {stack}
          </div>
        </Container>
      </div>
    </Section>
  )
}

/**
 * Introduction -> Highlight. One ground, one glow, two sections.
 *
 * Eduardo, 2026-09-16: "start the glow effect from the introduction section
 * down to the Bold Brilliant Beautiful section." The glow used to live inside
 * `GlowText`, which meant it could not exist above the top of that component —
 * and the old build had to fade the whole scene in late precisely to hide the
 * hard edge where it stopped.
 *
 * So the bloom is hoisted here, to a wrapper that spans both sections, and this
 * is also what paints `bg-canvas` for the pair. Neither section carries an
 * opaque ground of its own any more; an opaque section would cover the glow it
 * is supposed to be lit by.
 *
 * The glow is a STATIC wash, not the pointer-following blob. That blob is still
 * inside `GlowText` lighting the letterforms, which is a different effect and
 * has to stay bound to the artwork it masks into.
 */
function IntroToHighlight() {
  return (
    <div className="relative bg-canvas">
      {/*
        Sits behind both sections. Anchored to the top of the introduction and
        running most of the way down the highlight, so the bloom rises through
        the logo row and is at full strength behind the words.
      */}
      <div
        aria-hidden
        className="intro-glow pointer-events-none absolute inset-x-0 top-0 h-[70%]"
      />
      <Manifesto />
      <BoldBrilliantBeautiful />
    </div>
  )
}

/**
 * Bold. Brilliant. Beautiful. — the page's centrepiece.
 *
 * Figma: "bbb-glowing-copy-component" node 3390:26748, stats nodes 3944:753 /
 * 756 / 759.
 *
 * ── Unpinned, with the stats travelling over it (Eduardo, 2026-09-16) ─────
 *
 * This was a 2.75-viewport pinned scene: the page stopped, the words and a
 * right-hand stat column held still, and the ground crossfaded on the way out.
 * "Instead of scroll locking the entire Bold Brilliant Beautiful section, make
 * the stats scroll across the page, once they reach the top, continue with the
 * background transition to the next section."
 *
 * So the page never stops here any more. Three things do the work:
 *
 *  1. The words sit on a ZERO-HEIGHT sticky host. A `sticky top-0` element
 *     with `h-0` pins itself to the top of the viewport while contributing
 *     nothing to the flow, and its `h-screen` child hangs below it. That is
 *     what lets the words hold behind the section without the section having to
 *     be taller than its content, which is what a pin costs.
 *  2. The stats are ordinary flow content ON TOP, staggered left / centre /
 *     right so they cross the page as they rise — the arrangement the board
 *     now draws (x=182, 749, 1123 on a 1440 frame, 195px apart).
 *  3. The ground fades to the next section's surface over the LAST stretch of
 *     the section's travel. See `glowScene.fade` for why that window moved.
 *
 * The fade is a cream overlay at ramping ALPHA rather than an interpolation
 * between two colours. ⚠ That is NOT because it avoids a grey midpoint — an
 * earlier version of this note claimed so and it is simply wrong: compositing
 * cream at 50% over ink gives the same sRGB value as mixing the two 50/50, so
 * the halfway point is the same neutral either way. A dark ground turning into
 * a light one passes through a mid-tone; there is no arrangement of two colours
 * that does not.
 *
 * The real reasons for the overlay are structural. It has to be OPAQUE by the
 * end, because it is what covers the shared glow behind this section before the
 * cream band below begins — an interpolated `backgroundColor` on the section
 * would sit behind that glow instead of over it. And an overlay can be given
 * its own place in the z-order, which a section background cannot.
 */
function BoldBrilliantBeautiful() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { glowScene } = motionTokens

  /*
    0 when the section's top reaches the top of the viewport, 1 when its BOTTOM
    does — so 1 is the moment the last stat has left the screen. The pin used
    `end end`, which measured something else entirely.
  */
  const { scrollYProgress: rawProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end start'],
  })
  const scrollYProgress = useLaggedProgress(rawProgress)

  /*
    Gate the count-up on the section actually being on screen. It no longer has
    to wait for a pin to lock, so this fires as the section is half-way up the
    viewport rather than at the end of a long entry fade.
  */
  const { scrollYProgress: rawEntry } = useScroll({
    target: sceneRef,
    offset: ['start end', 'start center'],
  })
  const [revealed, setRevealed] = useState(false)
  useMotionValueEvent(rawEntry, 'change', (value) => {
    if (value > 0.4) setRevealed(true)
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

  const { fade } = glowScene
  /* Cream at ramping alpha — see the note above on why this is not a colour mix. */
  const groundAlpha = useTransform(scrollYProgress, [fade.start, fade.end], [0, 1])
  const ground = useMotionTemplate`rgba(246, 242, 236, ${groundAlpha})`
  const contentOpacity = useTransform(scrollYProgress, [fade.start, fade.end], [1, 0])

  const words = (
    <GlowText
      solidSrc={asset('/vectors/bbb-solid.svg')}
      strokeSrc={asset('/vectors/bbb-stroke.svg')}
      label="Bold. Brilliant. Beautiful."
      aspect={BBB_ARTWORK.aspect}
      widthRatio={BBB_ARTWORK.widthRatio}
      /* No leftRatio: GlowText centres the artwork when none is given. */
      /* The haze comes from the shared .intro-glow now — see IntroToHighlight. */
      ambient={false}
      pointerX={pointerX}
      pointerY={pointerY}
    />
  )

  /*
    Left, centre, right on a flat 80px rhythm — the board's x=182 / 749 / 1123
    on a 1440 frame, expressed as alignment so it stays put as the page widens.
    Each block is held to a measure so a long label wraps inside its own column
    instead of running the width of the screen.
  */
  const ALIGN = ['self-start text-left', 'self-center text-center', 'self-end text-right'] as const

  const stats = (
    <Container>
      <ul className="flex flex-col gap-4xl">
        {STATS.map((stat, i) => (
          <li key={stat.label} className={cn('flex max-w-[380px] flex-col gap-sm', ALIGN[i % 3])}>
            <Typography variant="h1" as="p" className="text-h2 text-on-dark-muted xl:text-h1">
              <CountUp to={stat.to} prefix={stat.prefix} suffix={stat.suffix} start={revealed} />
            </Typography>
            <Typography variant="copyMedium" as="p" muted className="text-on-dark-muted">
              {stat.label}
            </Typography>
          </li>
        ))}
      </ul>
    </Container>
  )

  // Reduced motion: no sticky, no crossfade, blob parked at its resting spot.
  if (prefersReduced) {
    return (
      <section id={HIGHLIGHT_ID} className="relative w-full overflow-hidden text-on-dark">
        <div ref={panelRef} className="relative h-screen">
          {words}
        </div>
        <div className="relative py-4xl">{stats}</div>
      </section>
    )
  }

  return (
    /*
      No min-height: the content below sets the section's height, because the
      crossfade has to be timed against where the stats actually END and a
      height fixed in viewport units makes that ratio move with the viewport.

      `overflow-clip`, NOT `overflow-hidden`. The two sticky hosts below are
      zero-height, so they stay pinned right down to this section's bottom edge
      and their `h-screen` children hang a full viewport past it — over the top
      of Stages, hiding its heading for ~800px of scroll. Clip cuts that off;
      hidden would also do so but makes this a scroll container, which kills
      the sticky.
    */
    <section id={HIGHLIGHT_ID} ref={sceneRef} className="relative w-full overflow-clip text-on-dark">
      {/*
        Zero-height sticky host. It pins to the top and adds nothing to the
        flow, so the `h-screen` child below it holds the words on screen while
        the stats — which start at this same flow position — scroll over them.
      */}
      <div className="sticky top-0 z-0 h-0">
        <div
          ref={panelRef}
          onPointerMove={handlePointerMove}
          className="relative h-screen w-full overflow-hidden"
        >
          <fm.div className="absolute inset-0" style={{ opacity: contentOpacity }}>
            {words}
          </fm.div>
        </div>
      </div>

      {/* The crossfade to the cream band below, and the cover for the glow. */}
      <fm.div
        aria-hidden
        className="pointer-events-none sticky top-0 z-10 h-0"
        style={{ opacity: 1 }}
      >
        <fm.div className="h-screen w-full" style={{ backgroundColor: ground }} />
      </fm.div>

      {/*
        Stats: ordinary flow, over the words — then a tail the words hold
        through while the ground turns cream.

        The tail is what makes the crossfade possible at all. A `sticky` child
        cannot outlive its containing block, so once the section's bottom edge
        rises into the viewport the words panel starts being cut off from below.
        Everything the reader should see happen — the ground going cream behind
        the words — therefore has to be FINISHED by then. 1.2 viewports of tail
        buys that: the fade completes at 0.54 of the section (see
        `glowScene.fade`) and the bottom edge does not arrive until 0.545.

        `min-h-screen` on the stats block rather than padding alone, so the
        three of them are centred in a full screen at any height and the
        proportion the fade is timed against stays put.
      */}
      <fm.div className="relative z-20" style={{ opacity: contentOpacity }}>
        <div className="flex min-h-screen flex-col justify-center py-[20vh]">{stats}</div>
        <div aria-hidden className="h-[120vh]" />
      </fm.div>
    </section>
  )
}

/** Figma: "Frame 1000003355" — node 3390:26429, cards nodes 3390:26539 … 26549 */
function Pillars() {
  return (
    // `bare` so the card row can run full-bleed past the content width; the
    // header keeps its own Container and normal 80px margins.
    /*
      TOP trimmed to 80px so that with Stages' 80px bottom the boundary between
      them is 160px total, matching the artboard (cards end y=3416, the next
      frame starts y=3569). Two `loose` sections would otherwise stack to 320.

      ⚠ This was `pb` until the two sections swapped on 2026-09-15. The trim
      belongs to the boundary the two share, so it followed the boundary rather
      than staying on this section — leaving it on the bottom would have put 160
      between Pillars and Work, and 320 between Stages and Pillars.
    */
    <Section tone="light" spacing="loose" bare className="pt-4xl xl:pt-4xl">
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
                  aspect="horizontalMedium"
                  scrim
                >
                  {/*
                    Bolder than the artboard's regular weight — Nabeel,
                    2026-09-15, "bolder headers inside the cards". The size and
                    the ramp are unchanged; only the weight moves, so the four
                    cards still sit in the same boxes as the three above them.
                  */}
                  <Typography
                    variant="subHeaderSmall"
                    as="h3"
                    className="font-semibold text-on-dark"
                  >
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

/**
 * One "Built for all stages" card.
 *
 * Nabeel, 2026-09-15: these should be clickable through to their own page. The
 * pages do not exist yet (see `STAGES`), so this builds the control and leaves
 * the destination out:
 *
 * - it is ONE interactive element wrapping the whole card, not a link on the
 *   title, so the target is the card the eye is already aiming at;
 * - the image scales and the scrim deepens on hover and on focus, which is the
 *   treatment the case-study rows in `Work` already use — the page has one idea
 *   of what a hover on a piece of artwork does;
 * - an arrow sits beside the title, so the card says it leads somewhere before
 *   anyone puts a pointer on it.
 *
 * With no route it renders as a plain `div` — not a disabled button and not a
 * link to `#`. A control that takes focus and then does nothing is worse than
 * no control: it is in the tab order, it is announced as a button, and it lies.
 * The hover treatment goes with it, for the same reason.
 */
function StageCard({ stage }: { stage: (typeof STAGES)[number] }) {
  const card = (
    <Card src={stage.src} alt={stage.title} aspect="verticalMedium" scrim>
      <div className="flex size-full items-end justify-center">
        <Typography
          variant="subHeaderSmall"
          as="h3"
          className="flex items-center gap-sm text-on-dark"
        >
          {stage.title}
          {stage.to && (
            <ArrowRight className="size-lg shrink-0 transition-transform duration-fast ease-out group-hover:translate-x-1" />
          )}
        </Typography>
      </div>
    </Card>
  )

  if (!stage.to) return card

  return (
    <Link
      to={stage.to}
      className={cn(
        'group block overflow-hidden rounded-md',
        // The image lifts inside the card's own `overflow-hidden` box.
        '[&_img]:transition-transform [&_img]:duration-slow [&_img]:ease-out',
        'hover:[&_img]:scale-105 focus-visible:[&_img]:scale-105',
      )}
    >
      {card}
    </Link>
  )
}

/**
 * Figma: "Frame 1000003413" — node 3390:26435
 *
 * ⚠ Sits BEFORE Pillars since 2026-09-15, and the 80px trim moved from its top
 * to its bottom with it — see the note in `HomePage`.
 */
function Stages() {
  return (
    <Section tone="light" spacing="loose" className="pb-4xl xl:pb-4xl">
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
                  <StageCard stage={stage} />
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
              <Button as={Link} to="/our-work" variant="secondary" tone="onLight">
                View all work
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
                        {/*
                          The SHORT line, not the full description — node
                          3944:582 gives each row one line under the name. The
                          long one is Our Work’s, where the row has room for it.
                        */}
                        <Typography variant="copyMedium" muted>
                          {project.short}
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

  /*
    ⚠ There is no `useScroll` over the scene's own range any more. It drove the
    selected offering: `scrollYProgress` was mapped to an index, so scrolling
    through the pinned panel stepped through the three offerings and clicking
    one scrolled the page to the position that selected it. Nabeel, 2026-09-15:
    "remove the scroll-through-tabs functionality and make them clickable only."

    So selection is now ordinary component state and nothing about the offering
    row is on the scroll clock. The one scroll value left is the entry fade
    below, which is about the shared ground rather than about the offerings.
  */

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
                  onClick={() => setIndex(i)}
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

        {/*
          Figma: 302x302, node 3390:26553 — the size at the designed 1440 width.

          ⚠ Fluid since 2026-09-15: "make the right-side images size fluid so it
          adjusts based on the browser width." 302px was a fixed box, which was
          fine inside a 1440 frame and is not now that the page itself is fluid —
          on a wide display the square stayed 302 while the row around it grew,
          so it shrank against its own section.

          `clamp` rather than breakpoint steps: the width it is balancing
          against changes continuously, so the image should too. The floor keeps
          it from collapsing at the bottom of `lg`, and the ceiling stops it
          outgrowing the copy column on a very wide screen. Below `lg` the row
          stacks and the square goes back to the artboard's 302.
        */}
        <div className="relative aspect-square w-full max-w-[302px] shrink-0 lg:w-[clamp(240px,24vw,420px)] lg:max-w-none">
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
      {/* One ground and one glow across the two of them — see IntroToHighlight. */}
      <IntroToHighlight />
      {/*
        ⚠ Stages BEFORE Pillars — Nabeel, 2026-09-15: "switch the order of the
        three vertical cards section with the four cards section so it shows
        right after the Bold. Brilliant. Beautiful. section." The artboard has
        them the other way round.

        The 160px boundary the two sections share moved with them: Pillars used
        to trim its bottom and Stages its top, and now it is the reverse. See
        the note on each.
      */}
      <Stages />
      <Pillars />
      <WorkToOfferings />
    </PageShell>
  )
}

export default HomePage
