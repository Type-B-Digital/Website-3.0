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
  /** Ink -> turquoise -> amber -> peach. Hero background. */
  b1:
    `linear-gradient(230.52deg, ${palette.neutral[900]} 3.19%, ${palette.turquoise[400]} 54.91%, ` +
    `${palette.amber[300]} 85.88%, ${palette.orange[200]} 110.67%)`,
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
    /** Page ground for light sections. Figma: "bg-white" — node 3390:26422 */
    surface: unmapped.white,
    /** Accent band — "How we partner". Figma: "bg-turquoise" — node 3390:26776 */
    accent: palette.turquoise[600],
    /** Eyebrow chip on accent grounds. Figma: 3390:26567 */
    chipAccent: palette.turquoise[600],
    /** Tag pill on light grounds — neutral.200 @ 40%. Figma: 3390:26451 */
    tag: 'rgba(198, 196, 194, 0.4)',
    /** Scrim over case-study thumbnails — neutral.900 @ 40%. Figma: 3390:26457 */
    scrim: 'rgba(4, 14, 25, 0.4)',
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
    /**
     * Unfilled state of the scroll-fill statement — the grey the copy sits at
     * before the white sweep reaches it. Figma: node 3390:26579
     */
    onDarkDim: palette.neutral[800],
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
  },
} as const

/* ------------------------------------------------------------------ *
 * OPACITY
 * The design leans on a small set of repeated alpha values.
 * ------------------------------------------------------------------ */
export const opacity = {
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
    /** Linear, for continuous motion (marquee). */
    linear: [0, 0, 1, 1],
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
  /** Distance an element rises into place on scroll reveal. */
  reveal: {
    distance: 32,
    stagger: 0.08,
  },
  /** Viewport trigger point for scroll reveals. */
  viewport: { amount: 0.25, once: true },
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
  elevation,
} as const

export default tokens
