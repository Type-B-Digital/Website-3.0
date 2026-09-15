import { cn } from '@/lib/cn'

/**
 * Glyph — the line-icon set.
 *
 * ⚠ NOT IN FIGMA, and deliberately so. The artboards place icon-set instances
 * that are not exported from the file — `Dummy_Square_Circle` in the What We Do
 * offering rows and the capability chips, and `Chart_Line` / `House_02` /
 * `Heart_01` / `Mobile_Button` on the packaging columns, which are the default
 * names of a placed library component rather than a choice anyone made about
 * this copy. Every one of them shipped as a grey square or ring.
 *
 * Nabeel, 2026-09-15: "add appropriate icons where there are placeholders
 * currently — make a selection that works based on the copy." So these are
 * drawn here, and the selection is made against the words each icon sits
 * beside; see the maps in `sections/` for which glyph each row gets and why.
 *
 * Drawn to the conventions the existing `icons/` files already follow, so the
 * set sits with `ArrowRight` and `CaretDown` rather than beside them:
 *
 * - a 24x24 box, so an icon can be sized with `size-*` and land on the grid;
 * - `currentColor` on a 1.5px round-capped, round-joined stroke, so an icon
 *   takes the colour of the type next to it — the reason these are inline SVG
 *   rather than `<img>`, which is the note `ArrowRight` already carries;
 * - `aria-hidden`, because every one of them sits next to a real heading. None
 *   of these is the only name for anything.
 *
 * 1.5px rather than the 2px `ArrowRight` uses: an arrow is two strokes and
 * these are up to six, and at 2px the denser glyphs (route, flow, team) fill
 * in around their joins at the 24px they are drawn at.
 */
export type GlyphName =
  | 'speech'
  | 'agent'
  | 'search'
  | 'scan'
  | 'flow'
  | 'chart'
  | 'layers'
  | 'compass'
  | 'target'
  | 'expand'
  | 'route'
  | 'shield'
  | 'person'
  | 'team'
  | 'lock'

/**
 * Path data per glyph. Strokes only — no fills — except the three dots that
 * would otherwise be invisible at this size (`target`'s centre, `route`'s two
 * endpoints), which are drawn as filled circles.
 */
const GLYPHS: Record<GlyphName, JSX.Element> = {
  /** Conversational & Voice — a speech bubble carrying a level meter. */
  speech: (
    <>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.2 7.6L3.5 20.5l1.4-4.8A8.5 8.5 0 1 1 20.5 11.5Z" />
      <path d="M9 10v3M12 8.5v6M15 10v3" />
    </>
  ),
  /** Autonomous Agents — one actor reaching out across three systems. */
  agent: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="12" cy="4" r="1.8" />
      <circle cx="19" cy="17" r="1.8" />
      <circle cx="5" cy="17" r="1.8" />
      <path d="M12 9.4V5.8M13.9 13.6l3.6 2.2M10.1 13.6l-3.6 2.2" />
    </>
  ),
  /** Search & RAG — the magnifier, over nothing in particular. */
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.9-4.9" />
    </>
  ),
  /** Document & Vision AI — a page being read, corner brackets and a sweep. */
  scan: (
    <>
      <path d="M4 8.5V6a2 2 0 0 1 2-2h2.5M15.5 4H18a2 2 0 0 1 2 2v2.5M20 15.5V18a2 2 0 0 1-2 2h-2.5M8.5 20H6a2 2 0 0 1-2-2v-2.5" />
      <path d="M4 12h16" />
    </>
  ),
  /** Workflow Automation — one step handing off to the next. */
  flow: (
    <>
      <rect x="3" y="3.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="14.5" y="14" width="6.5" height="6.5" rx="1.5" />
      <path d="M9.5 6.75h4.25a2 2 0 0 1 2 2V14" />
      <path d="m13.75 12.25 2 1.75 2-1.75" />
    </>
  ),
  /** Analytics & Forecast — a trend line leaving the frame upward. */
  chart: (
    <>
      <path d="M4 3.5v16a1 1 0 0 0 1 1h15" />
      <path d="m7.5 15.5 3.5-4 3 2.5 5.5-6" />
      <path d="M15.5 8h4v4" />
    </>
  ),
  /** Type B Digital — the whole stack, which is the tagline's own claim. */
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </>
  ),
  /** Entry — "find out what is true": orientation before movement. */
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2.2 5.3-5.3 2.2 2.2-5.3 5.3-2.2Z" />
    </>
  ),
  /** Core — "the working engagement most clients run": the middle of the thing. */
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
    </>
  ),
  /** Expanded — "a program we own with you": the scope opening out. */
  expand: (
    <>
      <path d="M8.5 3.5H5.5a2 2 0 0 0-2 2v3M15.5 3.5h3a2 2 0 0 1 2 2v3M20.5 15.5v3a2 2 0 0 1-2 2h-3M3.5 15.5v3a2 2 0 0 0 2 2h3" />
    </>
  ),
  /** A roadmap — a route with a start and an end on it. */
  route: (
    <>
      <path d="M5 19c5.5 0 3.5-7 9-7" />
      <path d="M19 5c-5.5 0-3.5 7-9 7" />
      <circle cx="5" cy="19" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="19" cy="5" r="1.75" fill="currentColor" stroke="none" />
    </>
  ),
  /** Diligence, assurance, a safety net — something checked and held. */
  shield: (
    <>
      <path d="M12 20.8s7.5-3.6 7.5-9.3V5.4L12 3 4.5 5.4v6.1c0 5.7 7.5 9.3 7.5 9.3Z" />
      <path d="m9 11.5 2.2 2.2L15.5 9.5" />
    </>
  ),
  /** One named person accountable — fractional leadership. */
  person: (
    <>
      <circle cx="12" cy="8" r="3.75" />
      <path d="M4.75 20.5v-.75a5.25 5.25 0 0 1 5.25-5.25h4a5.25 5.25 0 0 1 5.25 5.25v.75" />
    </>
  ),
  /** A pod or a squad — more than one, and they arrived together. */
  team: (
    <>
      <circle cx="9.5" cy="8.5" r="3.25" />
      <path d="M3 20.5v-.75A4.75 4.75 0 0 1 7.75 15h3.5a4.75 4.75 0 0 1 4.75 4.75v.75" />
      <path d="M16.5 5.6a3.25 3.25 0 0 1 0 5.8" />
      <path d="M18 15h.75A4.25 4.25 0 0 1 23 19.25v1.25" />
    </>
  ),
  /** Sovereign — the data stays where the contract says it stays. */
  lock: (
    <>
      <rect x="4" y="10" width="16" height="10.5" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
}

export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {GLYPHS[name]}
    </svg>
  )
}

export default Glyph
