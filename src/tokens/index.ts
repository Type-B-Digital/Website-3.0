/**
 * Type B Digital — Design Tokens
 *
 * Single source of truth for every visual value in the site. Components must
 * import from here; no component should contain a raw hex, px, or easing value.
 *
 * Extracted from Figma:
 *   File   "TypeB Creative Exploration"
 *          https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration
 *   Board  "design tokens" — node 3366:23051
 *
 * The Figma file defines tokens visually (swatches with hex labels, measured
 * spacing bars, text samples) rather than as Figma Variables — `get_variable_defs`
 * returns {} for this file. Values below were read off those samples via
 * get_design_context. See docs/BUILD_LOG.md for per-token provenance and for the
 * inconsistencies found in the board.
 */

/* ------------------------------------------------------------------ *
 * COLOR — raw ramps
 *
 * Four ramps live on the token board. The three chromatic ramps are the
 * three "mood directions": a mood swaps the accent ramp and leaves the
 * neutral ramp untouched. See `moods` below.
 * Figma: node 3369:24679 (Group 1000003315)
 * ------------------------------------------------------------------ */
export const palette = {
  // Figma: "color-shades-turquoise" — node 3369:24675
  turquoise: {
    100: '#C9D5D3',
    200: '#9DB8BA',
    300: '#709BA0',
    400: '#447E87',
    500: '#17616E',
    600: '#13505D',
    700: '#0F404C',
    800: '#0C2F3B',
    900: '#081F2A',
  },
  // Figma: "color-shades-orange" — node 3369:24676
  orange: {
    100: '#F8D2C1',
    200: '#FAB296',
    300: '#FB936B',
    400: '#FD7340',
    500: '#FF5315',
    600: '#CD4516',
    700: '#9B3717',
    800: '#682A17',
    900: '#361C18',
  },
  // Figma: "color-shades-orange" (second column — amber variant) — node 3369:24677
  amber: {
    100: '#F7DDC1',
    200: '#F9C896',
    300: '#FAB26C',
    400: '#FC9D41',
    500: '#FD8816',
    600: '#CB7017',
    700: '#995717',
    800: '#683F18',
    900: '#362618',
  },
  // Figma: "color-shades-grey" — node 3369:24678. Only six steps exist on the
  // board; the gaps (100/300/500/700) are intentionally absent, not omitted.
  neutral: {
    50: '#F6F2EC',
    200: '#C6C4C2',
    400: '#959798',
    600: '#65696D',
    800: '#343C43',
    900: '#040E19',
  },
} as const

/**
 * Colors used on the homepage that do NOT appear on the token board.
 * Kept separate so they stay visible as debt rather than dissolving into the
 * system. Each needs a decision: promote to the board, or retire in favour of
 * the nearest ramp value. Tracked in docs/BUILD_LOG.md § Deviations.
 */
export const unmapped = {
  /** Hero, footer links, secondary-light CTA. Near-miss for neutral.50 (#F6F2EC). Figma: 3390:26584 */
  paper: '#F6F6F6',
  /** "View our work" CTA border + label. Near-miss for neutral.900 (#040E19). Figma: 3390:26536 */
  inkSoft: '#071B27',
  /** Eyebrow chip background on light sections. Figma: 3390:26431 */
  white: '#FFFFFF',
  /** Footer ground — a shade below the canvas. Figma: node 3483:27261 */
  footerGround: '#030B15',
} as const

/* ------------------------------------------------------------------ *
 * GRADIENTS
 *
 * Eight background gradients, added to the token board on 2026-08-30.
 * Figma styles "Type B BG 1"–"Type B BG 8" — nodes 3430:26778 / 26784 / 26787 /
 * 26792 / 26798 / 26801 / 27208 / 27213.
 *
 * Every stop is an existing ramp value, so these are composed from `palette`
 * rather than restated as hex. Angles and stop positions are Figma's, rounded
 * to 2dp. Stops beyond 100% are intentional — Figma extends the ramp past the
 * box so the final colour is approached but never fully reached.
 * ------------------------------------------------------------------ */
export const gradients = {
  /**
   * b1's colour stops without a direction, so the hero can animate the ANGLE.
   *
   * The sweep needs the dark corner to travel along the top (left to right)
   * while the warm corner travels along the bottom (right to left). That is a
   * rotation of the gradient, not a translation of it: sliding a fixed-angle
   * strip moves the bands but cannot change which diagonal they run along, so
   * one end state or the other always comes out mirrored.
   */
  b1Stops:
    `${palette.neutral[900]} 3.19%, ${palette.turquoise[400]} 54.91%, ` +
    `${palette.amber[300]} 85.88%, ${palette.orange[200]} 110.67%`,
  /** Ink -> turquoise -> amber -> peach. Hero background. */
  b1:
    `linear-gradient(230.52deg, ${palette.neutral[900]} 3.19%, ${palette.turquoise[400]} 54.91%, ` +
    `${palette.amber[300]} 85.88%, ${palette.orange[200]} 110.67%)`,
  /**
   * b2's stops without a direction. The What We Do hero uses the same ramp at
   * 116.67deg (Figma node 3604:1004) where the token board has it at 230.49deg.
   */
  b2Stops:
    `${palette.neutral[50]} 16.13%, ${palette.amber[300]} 53.76%, ` +
    `${palette.orange[400]} 80.65%, ${palette.neutral[800]} 107.53%`,
  /** Cream -> amber -> orange -> slate. */
  b2:
    `linear-gradient(230.49deg, ${palette.neutral[50]} 16.18%, ${palette.amber[300]} 53.93%, ` +
    `${palette.orange[400]} 80.90%, ${palette.neutral[800]} 107.86%)`,
  /** Ink -> deep turquoise -> cream. */
  b3:
    `linear-gradient(50.55deg, ${palette.neutral[900]} 0%, ${palette.turquoise[500]} 63.82%, ` +
    `${palette.neutral[50]} 127.63%)`,
  /** Ink -> orange -> amber. */
  b4:
    `linear-gradient(230.54deg, ${palette.neutral[900]} 0%, ${palette.orange[400]} 75.52%, ` +
    `${palette.amber[300]} 115.50%)`,
  /** Deep turquoise -> pale turquoise -> cream. */
  b5:
    `linear-gradient(50.55deg, ${palette.turquoise[500]} 0%, ${palette.turquoise[100]} 63.82%, ` +
    `${palette.neutral[50]} 127.63%)`,
  /** Cream -> coral -> amber. */
  b6:
    `linear-gradient(230.53deg, ${palette.neutral[50]} 0%, ${palette.orange[300]} 53.37%, ` +
    `${palette.amber[400]} 100%)`,
  /** Burnt amber -> bright amber -> cream. */
  b7:
    `linear-gradient(50.60deg, ${palette.amber[700]} 0%, ${palette.amber[500]} 53.34%, ` +
    `${palette.neutral[50]} 106.67%)`,
  /** Cream -> sand -> warm grey -> turquoise. */
  b8:
    `linear-gradient(230.53deg, ${palette.neutral[50]} 0%, ${palette.amber[200]} 30.73%, ` +
    `${palette.neutral[200]} 63.94%, ${palette.turquoise[300]} 100%)`,
  /* ------------------------------------------------------------------ *
   * Industry row fills — Figma nodes 3276:21593 / 21597 / 21601 / 21605
   * / 21609 on the Industries page.
   *
   * Every stop is an exact palette value, so these are composed rather than
   * shipped as images: `download_assets` returns no `rawImages` for them, only
   * an SVG whose `<linearGradient>` carries the stops.
   *
   * Three of the five are the b3-b6 ramps re-fitted to this 411x320 box, which
   * is why their stop offsets differ from the token board's (b3 runs to
   * 127.63% there because that gradient overruns its own frame).
   *
   * ⚠ Two things the SVG export gets wrong, both verified against the
   * artboard's own pixels rather than trusted:
   *
   * 1. It is MIRRORED horizontally. The export puts cream at the top-right of
   *    the healthcare fill; the artboard renders it at the top-left. Negating
   *    the export's dx and taking `atan2(dx, dy)` in Figma's y-down space
   *    yields the two angles below, which fit the artboard to a mean colour
   *    delta of 21/441 across a 16-point grid on all five rows. (Same class of
   *    defect as the bbb-stroke SVG that exported rotated 90 degrees.)
   * 2. The first `<stop>` carries no `offset` attribute, defaulting to 0. Read
   *    with a regex that requires one, the darkest stop silently vanishes and
   *    the fill reads as a mid-tone wash.
   *
   * The export also bakes an feTurbulence grain into each fill. Left out: the
   * page already carries `.page-grain` above everything, so baking it in again
   * would double it.
   */
  industry: {
    /** Cream -> amber -> orange -> deep turquoise. Node 3276:21593. */
    healthcare:
      `linear-gradient(122.8deg, ${palette.neutral[50]} 15%, ${palette.amber[500]} 50%, ` +
      `${palette.orange[500]} 75%, ${palette.turquoise[500]} 100%)`,
    /** Ink -> turquoise -> cream. The b3 ramp refitted. Node 3276:21597. */
    financial:
      `linear-gradient(302.8deg, ${palette.neutral[900]} 0%, ${palette.turquoise[500]} 50%, ` +
      `${palette.neutral[50]} 100%)`,
    /** Ink -> coral -> amber. The b4 ramp refitted. Node 3276:21601. */
    realEstate:
      `linear-gradient(122.8deg, ${palette.neutral[900]} 0%, ${palette.orange[400]} 65.38%, ` +
      `${palette.amber[300]} 100%)`,
    /** Deep turquoise -> pale turquoise -> cream. The b5 ramp. Node 3276:21605. */
    manufacturing:
      `linear-gradient(302.8deg, ${palette.turquoise[500]} 0%, ${palette.turquoise[100]} 50%, ` +
      `${palette.neutral[50]} 100%)`,
    /** Cream -> coral -> amber. The b6 ramp, same offsets. Node 3276:21609. */
    legal:
      `linear-gradient(122.8deg, ${palette.neutral[50]} 0%, ${palette.orange[300]} 53.37%, ` +
      `${palette.amber[400]} 100%)`,
  },

} as const

export type GradientToken = keyof typeof gradients

/* ------------------------------------------------------------------ *
 * MOOD — accent selection
 *
 * Homepage v1 ships `deep`. The other two ramps are already extracted, so
 * adding a mood is a data change here, not a component change.
 * ------------------------------------------------------------------ */
export const moods = {
  deep: { accent: palette.turquoise },
  ember: { accent: palette.orange },
  solar: { accent: palette.amber },
} as const

export type MoodName = keyof typeof moods
export const defaultMood: MoodName = 'deep'

/* ------------------------------------------------------------------ *
 * SEMANTIC COLOR
 * What a color means, not what it looks like. Components use these.
 * ------------------------------------------------------------------ */
export const colors = {
  background: {
    /** Page ground for dark sections. Figma: homepage hero + stats bands */
    canvas: palette.neutral[900],
    /**
     * Page ground for light sections — `#F6F2EC` (neutral.50).
     *
     * Was `#FFFFFF`, taken from the Figma layer literally named "bg-white"
     * (node 3390:26422). The layer name was misleading: the light body ground
     * is the brand cream. Moving it here also retires one of the three
     * off-board colours in `unmapped`.
     */
    surface: palette.neutral[50],
    /** Accent band — "How we partner". Figma: "bg-turquoise" — node 3390:26776 */
    accent: palette.turquoise[600],
    /**
     * The deeper accent band — Culture's Talent section, where the globe sits.
     * Sampled at exactly `#17616E` (turquoise.500), a step lighter than
     * `accent`. Figma: node 3679:10315.
     */
    accentDeep: palette.turquoise[500],
    /** Eyebrow chip on accent grounds — #13505D. Figma: 3390:26567 */
    chipAccent: palette.turquoise[600],
    /**
     * Eyebrow chip on light grounds — #F7DDC1, i.e. amber.100.
     * Was white, which is invisible on a white section; the artboard uses the
     * warm tint. Figma: nodes 3390:26431 and 3390:26437.
     */
    chipLight: palette.amber[100],
    /** Tag pill on light grounds — neutral.200 @ 40%. Figma: 3390:26451 */
    tag: 'rgba(198, 196, 194, 0.4)',
    /** Scrim over card imagery — neutral.900 @ 40%. Figma: 3390:26457 */
    scrim: 'rgba(4, 14, 25, 0.4)',
    /**
     * Hover scrim on a case-study thumbnail — neutral.900 @ 80%. Heavier than
     * `scrim` because the "Learn more" label sits on top of it and has to hold
     * contrast against photography. Figma: node 3390:26457 (hover state).
     */
    scrimStrong: 'rgba(4, 14, 25, 0.8)',
  },
  text: {
    /** Primary text on dark grounds. Figma: 3390:26584 */
    onDark: unmapped.paper,
    /** Primary text on light grounds. Figma: 3390:26433 */
    onLight: palette.neutral[900],
    /** Cream-toned text on dark — nav links, footer headings. Figma: 3390:26615 */
    onDarkMuted: palette.neutral[50],
    /** Accent display type — "Advisory" / "Teams". Figma: 3390:26552 */
    accent: palette.turquoise[400],

  },
  border: {
    /** Secondary CTA on dark. Figma: 3369:24517 */
    onDark: 'rgba(246, 246, 246, 0.4)',
    /** Secondary CTA on dark, CTA band variant. Figma: 3390:26563 */
    onDarkSubtle: 'rgba(246, 246, 246, 0.24)',
    /** Secondary CTA on light. Figma: 3390:26535 */
    onLight: 'rgba(7, 27, 39, 0.24)',
    /** Divider between case-study rows. Figma: "Line 89" — node 3390:26458 */
    divider: 'rgba(4, 14, 25, 0.12)',
    /**
     * Field border in its error state. Figma documents no error state anywhere,
     * so this is authored — see `colors.feedback`.
     */
    danger: palette.orange[700],
    /**
     * Rule between FAQ questions — the accent at 40%, NOT `divider`.
     *
     * Figma exports "Line 88" (node 2894:14480) as `stroke="#17616E"`,
     * turquoise.500, at 40% opacity. The Industries page ground fades into
     * turquoise.100 by the FAQ, so an ink rule would read as a foreign colour
     * there. Resolved per mood, so it tracks whichever ramp is active.
     */
    accentSoft: 'var(--color-border-accent-soft)',
    /**
     * The same rule where the ground is ink — the Careers FAQ.
     *
     * A step lighter on the ramp than `accentSoft`, because accent.500 at 40%
     * over ink is nearly invisible. Measured off the artboard: the rule there
     * is `#1D3A45`, which is accent.400 at 40% over neutral.900 to within a
     * pixel value. Figma node 3638:9372.
     */
    accentSoftOnDark: 'var(--color-border-accent-soft-dark)',
  },
  /**
   * ⚠ NOT IN FIGMA. The artboards document no error, warning or success state
   * on any page, so this whole group is authored and awaiting design sign-off.
   *
   * Both values are existing ramp ends rather than new hues, so the form still
   * reads as this brand rather than as a generic validation UI:
   *
   * - `danger` is `orange.700`, chosen by contrast rather than by eye. On the
   *   field fill (`paper`, #F5F6F6) it measures **6.57:1**, clearing WCAG AA
   *   for body text. `orange.600` was the first choice and fails at 4.35:1;
   *   `orange.500`, the obvious "error red", is 2.98:1 and would have shipped
   *   unreadable error text.
   * - `success` is the ink canvas, because the confirmation toast is a dark
   *   pill in this palette — introducing a green for one component would put a
   *   hue on the page that appears nowhere in the design system.
   *
   * Colour is never the only signal: each error renders an icon and text, and
   * the toast carries a label.
   */
  feedback: {
    danger: palette.orange[700],
    success: palette.neutral[900],
  },
} as const

/* ------------------------------------------------------------------ *
 * OPACITY
 * The design leans on a small set of repeated alpha values.
 * ------------------------------------------------------------------ */
export const opacity = {
  /**
   * Unfilled state of the scroll-fill statement. Figma sets the whole
   * paragraph to `#F6F6F6` at 16% (node 3390:26579) — the sweep raises each
   * character to full opacity rather than changing its colour.
   */
  dim: 0.16,
  /** Footer column headings. Figma: 3390:26642 */
  subtle: 0.64,
  /** Body copy, eyebrow labels, nav. The most common value in the file. */
  muted: 0.8,
  full: 1,
} as const

/* ------------------------------------------------------------------ *
 * TYPOGRAPHY
 * Figma text samples, nodes 3369:24533 / 3370:24754 / 3386:25398 /
 * 3386:25396 / 3373:24762 / 3373:24758 / 3370:24749 / 3373:24764 / 3373:24760
 * ------------------------------------------------------------------ */
export const fontFamily = {
  sans: "'Reddit Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
} as const

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

export type TypeStyle = {
  fontSize: string
  lineHeight: string | number
  fontWeight: number
  letterSpacing?: string
}

export const typography = {
  /** Hero + section display. Figma: "Header 1" — node 3369:24533 */
  h1: { fontSize: '72px', lineHeight: 1.2, fontWeight: fontWeight.semibold },
  /** Section headings. Figma: "Header 2" — node 3370:24754 */
  h2: { fontSize: '48px', lineHeight: 1.2, fontWeight: fontWeight.semibold },
  /**
   * Figma: "Header 3" — node 3386:25398.
   * Was 48px (identical to h2); corrected to 40px in the Aug 30 2026 board
   * update, along with the sample being renamed text-header-4 -> text-header-3.
   */
  h3: { fontSize: '40px', lineHeight: 1.2, fontWeight: fontWeight.semibold },
  /** Full-bleed CTA band headline. Figma: 3390:26562 */
  display: { fontSize: '64px', lineHeight: 1.2, fontWeight: fontWeight.semibold },
  /** Figma: "Sub-Header Large" — node 3386:25396 */
  subHeaderLarge: { fontSize: '32px', lineHeight: 1.5, fontWeight: fontWeight.regular },
  /** Figma: "Sub-Header Small" — node 3373:24762 */
  subHeaderSmall: { fontSize: '24px', lineHeight: 1.5, fontWeight: fontWeight.regular },
  /** Hero subcopy, case-study titles. Figma: "Large copy" — node 3373:24758 */
  copyLarge: { fontSize: '20px', lineHeight: 1.5, fontWeight: fontWeight.regular },
  /** Default body. Figma: "Medium copy" — node 3370:24749 */
  copyMedium: { fontSize: '16px', lineHeight: 1.5, fontWeight: fontWeight.regular },
  /** Figma: "Small copy" — node 3373:24764 */
  copySmall: { fontSize: '14px', lineHeight: 1.5, fontWeight: fontWeight.regular },
  /** Figma: "Extra small copy" — node 3373:24760 */
  copyXSmall: { fontSize: '12px', lineHeight: 1.5, fontWeight: fontWeight.regular },
  /** Eyebrow chip label. Figma: "label-eyebrow" — node 3383:25390 */
  eyebrow: { fontSize: '14px', lineHeight: 1.2, fontWeight: fontWeight.semibold },
  /** Tag pill label. Figma: "label-tag" — node 3383:25393 */
  tag: { fontSize: '12px', lineHeight: 1.5, fontWeight: fontWeight.regular },
  /** Interactive label — buttons, nav CTA. Figma: 3369:24490 */
  button: { fontSize: '16px', lineHeight: 1.2, fontWeight: fontWeight.semibold },
  /** Nav links carry -0.01em tracking. Figma: 3390:26615 */
  navLink: {
    fontSize: '16px',
    lineHeight: 1.2,
    fontWeight: fontWeight.regular,
    letterSpacing: '-0.01em',
  },
  /**
   * The Careers hero carousel's index numeral — Figma node 3638:9412.
   *
   * Far off the reading scale (which tops out at 72) because it is not read as
   * text: it is a graphic, drawn as an outline with a transparent fill, that
   * the slide's subheader deliberately overlaps. Line height is the artboard's
   * 220px on 240px, which is what pulls the digits tight enough for the
   * overlap to sit where it does.
   */
  numeral: {
    fontSize: '240px',
    lineHeight: 220 / 240,
    fontWeight: fontWeight.bold,
    letterSpacing: '-0.01em',
  },
} as const satisfies Record<string, TypeStyle>

export type TypographyToken = keyof typeof typography

/* ------------------------------------------------------------------ *
 * SPACING
 * Figma: "spacing-vertical" — node 3386:25418. Measured bars: 8/16/24/32/40/48/80.
 * `xs` (4px) is read from the radius board and from chip padding (py-4).
 * ------------------------------------------------------------------ */
export const spacing = {
  xs: '4px',
  sm: '8px',
  /**
   * Tag-pill horizontal padding. NOT on the spacing board — the board documents
   * 8/16/24/32/40/48/80. Named here so components stay literal-free rather than
   * reaching for an arbitrary value. Flagged in docs/BUILD_LOG.md § Deviations.
   * Figma: node 3383:25392
   */
  tag: '12px',
  /**
   * Client logo strip gap. Also off-board — Figma measures 93px between marks.
   * Figma: node 3390:26570
   */
  logoGap: '93px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '40px',
  '3xl': '48px',
  '4xl': '80px',
  /**
   * Section top inset for the offerings scene. Off the board (which tops out at
   * 80px) but 80 + 40, so it sits on the scale rather than beside it.
   */
  '5xl': '120px',
} as const

export type SpacingToken = keyof typeof spacing

/* ------------------------------------------------------------------ *
 * RADIUS
 * Figma: "radius-corner" — node 3386:25427. The board documents 4px and 8px.
 * `pill` (24px) and `tag` (12px) are in active use on the homepage but are not
 * on the board — see docs/BUILD_LOG.md § Deviations.
 * ------------------------------------------------------------------ */
export const radius = {
  sm: '4px',
  md: '8px',
  tag: '12px',
  pill: '24px',
  full: '9999px',
} as const

/* ------------------------------------------------------------------ *
 * LAYOUT
 * Figma: "grid-desktop-12-columns" — node 3386:25446.
 * 1440 frame, 80 margins, 12 columns, 24 gutter → 1280 content width.
 * ------------------------------------------------------------------ */
export const layout = {
  frameWidth: '1440px',
  maxWidth: '1280px',
  margin: '80px',
  gutter: '24px',
  columns: 12,
} as const

/* ------------------------------------------------------------------ *
 * BREAKPOINTS
 *
 * ⚠ NOT IN FIGMA. The file contains desktop-only artboards (1440px) — there
 * are no tablet or mobile frames and no documented breakpoints. These are an
 * engineering decision, chosen so `xl` lands on the 1280px content width and
 * `2xl` on the 1440px frame. Responsive behaviour below `xl` is therefore an
 * interpretation, not a reproduction. Confirm against design before client
 * handoff. See docs/BUILD_LOG.md § Open questions.
 * ------------------------------------------------------------------ */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
} as const

/* ------------------------------------------------------------------ *
 * MOTION
 *
 * ⚠ NOT IN FIGMA. The token board has no duration, easing, or parallax
 * specification — verified against both the full node listing and a render of
 * the complete 1440×10570 board. The homepage brief calls for parallax and
 * smooth scroll, so this scale is authored here to keep motion values out of
 * components and in one place. Every value is a proposal awaiting design
 * sign-off. See docs/BUILD_LOG.md § Open questions.
 * ------------------------------------------------------------------ */
export const motion = {
  duration: {
    instant: 0.15,
    fast: 0.3,
    base: 0.6,
    slow: 0.9,
    /**
     * Scroll reveals. Deliberately long: these are meant to ease in and out
     * rather than pop, so the eye follows them.
     */
    reveal: 1.2,
    /** Values band. */
    marquee: 40,
    /** Client logo strip — slower, so marks read as they pass. */
    marqueeSlow: 60,
  },
  easing: {
    /** Default entrance — decelerating, no overshoot. */
    out: [0.16, 1, 0.3, 1],
    /** Symmetric, for state changes that reverse. */
    inOut: [0.65, 0, 0.35, 1],
    /**
     * Classic ease-in-out, for moving the page itself. Gentler through the
     * middle than `inOut`, which accelerates hard and reads as a lurch when
     * what is moving is the whole viewport rather than one element.
     */
    scroll: [0.42, 0, 0.58, 1],
    /** Linear, for continuous motion (marquee). */
    linear: [0, 0, 1, 1],
  },

  /**
   * Programmatic scroll hand-off between scenes (see lib/useAutoAdvance).
   *
   * The browser's `behavior: 'smooth'` exposes no duration, and its default is
   * far too quick for a full-viewport move — it reads as a jump cut. This is
   * animated by hand instead so the page eases away and eases back in.
   */
  autoAdvance: {
    duration: 1.4,
    /** Grace period after the move before the visitor can retrigger it. */
    settle: 0.25,
  },
  /**
   * Parallax travel as a fraction of the scroll distance through a section.
   * 0 = pinned to page, 1 = moves with the page. Negative moves against scroll.
   */
  parallax: {
    subtle: 0.08,
    base: 0.18,
    strong: 0.32,
  },
  /**
   * Scroll reveal. `lag` is a flat delay on every reveal, which is what gives
   * the section a beat of latency before it starts moving instead of snapping
   * to the trigger. `feather` is the blur it resolves from — the fade arrives
   * soft-edged and sharpens, rather than simply changing opacity.
   */
  /**
   * Careers — the ground crossfade from the warm half into ink, and the slide
   * change in the hero carousel. ⚠ Authored, as everywhere in `motion`.
   *
   * `groundFade` is a sub-range of the boundary marker's entry progress, tuned
   * the same way the homepage's `offeringScene.groundFade` is: late enough that
   * the Bench copy has scrolled off before the ground starts to darken, and
   * finished before the Open Roles heading arrives, so neither section's type
   * is ever on the wrong ground.
   */
  careersGround: {
    /**
     * The ground itself. Late in the window on purpose: at 0.80 the Bench's
     * closing line is just leaving the top of the screen, so its ink type is
     * never sitting on a half-darkened ground.
     */
    fade: { start: 0.8, end: 0.98 },
    /**
     * Open Roles' content fades in *behind* the ground, not with it — the same
     * split the homepage uses for the offerings scene.
     *
     * Without it the section is unreadable for a stretch of the scroll: its
     * heading enters the bottom of the viewport around 0.36, long before the
     * ground darkens, and cream type on a warm ground has almost no contrast.
     * Widening the physical gap instead would need more than a viewport-height
     * between the two sections, against 452px on the artboard.
     */
    contentFade: { start: 0.86, end: 1 },
  },
  reveal: {
    distance: 32,
    stagger: 0.14,
    lag: 0.12,
    feather: 10,
  },

  /**
   * Smoothing applied to scroll-linked progress before it drives anything.
   *
   * Scroll position is a step function — it jumps by whatever the wheel
   * reported. Running it through a spring first is what makes a scene trail the
   * scroll slightly and settle, instead of tracking it rigidly frame for frame.
   */
  scrollLag: { stiffness: 55, damping: 22, mass: 0.45 },
  /** Viewport trigger point for scroll reveals. */
  viewport: { amount: 0.25, once: true },
  /**
   * Schedule and geometry for the pointer-lit "Bold. Brilliant. Beautiful."
   * scene. Figma: bbb-glowing-copy-component, node 3390:26748.
   *
   * ⚠ Timings authored, as everywhere in `motion`. The geometry, though, is
   * from the artboard: `blur` is Figma's own gaussian stdDeviation on the glow
   * ellipses, and `strokeOpacity` is the 40% the outline layer carries.
   */
  glowScene: {
    /** Viewport heights of scroll the scene occupies. Most of it is dwell time
     *  so the pointer interaction can actually be explored. */
    pinLength: 2.75,
    /** Where the ground starts turning into the next section's surface, and
     *  where it finishes — so there is no hard black-to-white seam. */
    fade: { start: 0.62, end: 0.94 },
    /** Blob box, px. Large because it is heavily blurred. */
    blobSize: 900,
    /** Figma gaussian stdDeviation on the glow ellipses (node 3390:26688). */
    blur: 120,
    /**
     * Outline layer opacity. The artboard has 0.4; raised by half at Eduardo's
     * request because the strokes read too faintly in motion.
     */
    strokeOpacity: 0.6,
    /** Ambient haze strength. Tuned against the motion mockups, which read
     *  considerably more muted than a full-strength screen blend. */
    ambientOpacity: 0.5,
    /** Pointer smoothing — the blob trails the cursor rather than snapping. */
    pointer: { stiffness: 90, damping: 24, mass: 0.6 },
    /** Resting position as a fraction of the panel, before the pointer arrives. */
    rest: { x: 0.32, y: 0.52 },
  },

  /**
   * Hero gradient sweep. The first scroll gesture plays this instead of moving
   * the page; the next one scrolls normally.
   */
  heroSweep: {
    /** 3x the original 0.8s, at Eduardo's request. */
    duration: 2.4,
    /** 135deg: dark top-left, warm bottom-right. */
    from: 135,
    /** 225deg: dark top-right, warm bottom-left. */
    to: 225,
  },

  /** Stat numbers counting up from zero when they come into view. */
  countUp: { duration: 1.6 },

  /**
   * Pinned "How we partner" scene. Scroll steps through the three offerings;
   * the ground crossfades from the previous section's surface into the accent
   * band as it arrives, so the two never meet on a hard line.
   *
   * ⚠ Timings authored.
   */
  offeringScene: {
    /** Viewport heights of scroll — roughly one per offering, plus dwell. */
    pinLength: 2.5,
    /**
     * White -> turquoise, measured across the viewport-height of scroll before
     * the offerings panel pins. Both the light band and the scene share one
     * animated ground (see WorkToOfferings), so this is a single crossfade of
     * the whole screen rather than a gradient travelling through it.
     *
     * Starts once the light band's content has largely cleared and finishes just
     * before the panel locks, so there is no stretch of flat white waiting for
     * the colour to arrive.
     */
    groundFade: { start: 0.34, end: 0.92 },
    /**
     * Offerings content fades in behind the ground, not with it. Its type is
     * cream: over a half-transitioned ground it has almost no contrast, so it
     * waits until the turquoise has largely arrived.
     */
    contentFade: { start: 0.72, end: 0.98 },
    /**
     * Offerings start stepping almost immediately now. The light-to-turquoise
     * blend no longer happens inside this scene — see the bridge on the section
     * above — so nothing has to finish before selection can begin.
     */
    selectStart: 0.1,
  },

  /**
   * Schedule for the pinned Manifesto scene, in normalised scroll progress
   * (0 = scene pins, 1 = scene releases).
   *
   * ⚠ Authored, like the rest of `motion`. `pinLength` is how many viewport
   * heights of scroll the scene occupies; raise it to slow the whole scene
   * down without touching the sub-timings.
   *
   * The letter fill and the third image are scheduled to land together at
   * `fill.end`, which is what makes the scene feel finished before it releases.
   * The gap between that and 1.0 is a deliberate hold on the completed frame.
   */
  scene: {
    pinLength: 3,
    fill: { start: 0.06, end: 0.9 },
    /** Per-character overlap; wider = softer sweep, narrower = sharper. */
    fillFeather: 0.06,
    images: { start: 0.06, stagger: 0.28, duration: 0.28 },
    /** Travel distance for an entering image, as % of its own width. */
    imageEnter: 170,
  },
} as const

/* ------------------------------------------------------------------ *
 * ELEVATION
 * ⚠ NOT IN FIGMA. The board defines no shadow tokens and the homepage uses
 * none — depth comes from color and scrims. Declared empty rather than
 * invented, so a future shadow scale has an obvious home.
 * ------------------------------------------------------------------ */
/**
 * Page grain. Eduardo's spec: X 0.5 / Y 0.5 (fine, near per-pixel), 80%
 * density, `#040E19` at 24%.
 *
 * Baked into a 256px tile at `public/images/noise.png` rather than generated
 * with an SVG filter: `feTurbulence` at this frequency is expensive to
 * rasterise across a full page, and a tile costs one decode.
 */
export const grain = {
  tile: '/images/noise.png',
  density: 0.8,
  /** The value Eduardo specified. Kept for reference — see `opacity`. */
  specifiedOpacity: 0.24,
  /**
   * ⚠ REDUCED FROM THE SPECIFIED 0.24, deliberately.
   *
   * The grain is a single dark colour, so composited normally its opacity is a
   * flat tint as much as a texture. At 80% density and 24% it darkens white by
   * ~19% — measured 255 -> 207 — which turns every light section grey. That is
   * arithmetic, not a bug: 0.8 x 0.24 = 0.19.
   *
   * `mix-blend-mode: soft-light` preserves the tone but then the grain is
   * invisible on white (measured: no variance at all), so blending is not the
   * answer either. The only way to keep a dark grain visible AND keep white
   * white is to carry less of it.
   *
   * At 0.08 the tone shift is ~5% and the grain still reads. Raise this back to
   * `specifiedOpacity` if the heavier look is wanted — it is one value.
   */
  opacity: 0.08,
} as const

export const elevation = {
  none: 'none',
} as const

export const tokens = {
  palette,
  unmapped,
  gradients,
  moods,
  colors,
  opacity,
  fontFamily,
  fontWeight,
  typography,
  spacing,
  radius,
  layout,
  breakpoints,
  motion,
  grain,
  elevation,
} as const

export default tokens
