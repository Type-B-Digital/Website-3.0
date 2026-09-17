/**
 * Flag outlines for the Culture page's delivery cities.
 *
 * ⚠ NOT IN FIGMA. Eduardo, 2026-09-16: "add flag outline illustrations in the
 * global by design section for each of the cities." Drawn here as line art to
 * sit with the site's other stroke icons: one 1.25 stroke in `currentColor`, no
 * fills, on a 3:2 frame. Each flag is reduced to the few shapes that identify
 * it at 44px — bands, the canton, the emblem outline — not a reproduction.
 */
export type FlagCountry = 'canada' | 'usa' | 'sri-lanka' | 'argentina' | 'turkey' | 'india'

/** Points around (cx, cy), alternating outer and inner radius. */
function starPoints(cx: number, cy: number, outer: number, inner: number, rotation = -90) {
  return Array.from({ length: 10 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner
    const a = ((rotation + i * 36) * Math.PI) / 180
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`
  }).join(' ')
}

/** Spokes from `inner` to `outer` radius, evenly spaced. */
function spokes(cx: number, cy: number, inner: number, outer: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i * 2 * Math.PI) / count
    return (
      <line
        key={i}
        x1={cx + inner * Math.cos(a)}
        y1={cy + inner * Math.sin(a)}
        x2={cx + outer * Math.cos(a)}
        y2={cy + outer * Math.sin(a)}
      />
    )
  })
}

const EMBLEMS: Record<FlagCountry, JSX.Element> = {
  /* Two side bands and the maple leaf. */
  canada: (
    <>
      <line x1="13" y1="1" x2="13" y2="31" />
      <line x1="35" y1="1" x2="35" y2="31" />
      <polygon points="24,6 26,10 28.5,9 27.5,14 31,12.5 30.5,15 33,16 28,20 28.5,22 24.6,21.5 24.6,26 23.4,26 23.4,21.5 19.5,22 20,20 15,16 17.5,15 17,12.5 20.5,14 19.5,9 22,10" />
    </>
  ),
  /* The canton, the stripes either side of it, a few stars. */
  usa: (
    <>
      <rect x="1" y="1" width="21" height="16" />
      {[5.6, 10.2, 14.8].map((y) => (
        <line key={y} x1="22" y1={y} x2="47" y2={y} />
      ))}
      {[19.4, 24, 28.6].map((y) => (
        <line key={y} x1="1" y1={y} x2="47" y2={y} />
      ))}
      {[
        [6, 5.5],
        [11.5, 5.5],
        [17, 5.5],
        [8.75, 9],
        [14.25, 9],
        [6, 12.5],
        [11.5, 12.5],
        [17, 12.5],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.7" />
      ))}
    </>
  ),
  /* The border, the two hoist bands, the main panel and its corner leaves. */
  'sri-lanka': (
    <>
      <rect x="3.5" y="3.5" width="41" height="25" rx="0.5" />
      <line x1="9" y1="3.5" x2="9" y2="28.5" />
      <line x1="14.5" y1="3.5" x2="14.5" y2="28.5" />
      <rect x="17" y="6" width="25" height="20" rx="0.5" />
      <circle cx="19.5" cy="8.5" r="1" />
      <circle cx="39.5" cy="8.5" r="1" />
      <circle cx="19.5" cy="23.5" r="1" />
      <circle cx="39.5" cy="23.5" r="1" />
      {/* The lion, reduced to its raised sword. */}
      <line x1="29.5" y1="11" x2="29.5" y2="21" />
      <line x1="27.5" y1="18.5" x2="31.5" y2="18.5" />
    </>
  ),
  /* Three bands and the Sun of May. */
  argentina: (
    <>
      <line x1="1" y1="11.3" x2="47" y2="11.3" />
      <line x1="1" y1="20.7" x2="47" y2="20.7" />
      <circle cx="24" cy="16" r="2.4" />
      {spokes(24, 16, 3.3, 4.3, 8)}
    </>
  ),
  /*
    Crescent and star. The crescent is the outer circle (19,16 r8) less the
    inner (21.5,16 r6.4); they cross at x=24.858, y=16±5.448.
  */
  turkey: (
    <>
      <path d="M24.858 10.552A8 8 0 1 0 24.858 21.448A6.4 6.4 0 1 1 24.858 10.552Z" />
      <polygon points={starPoints(31.5, 16, 3.6, 1.45, 180)} />
    </>
  ),
  /* Three bands and the Ashoka Chakra. */
  india: (
    <>
      <line x1="1" y1="11.3" x2="47" y2="11.3" />
      <line x1="1" y1="20.7" x2="47" y2="20.7" />
      <circle cx="24" cy="16" r="3.9" />
      {spokes(24, 16, 0, 3.9, 12)}
    </>
  ),
}

export function FlagOutline({ country, className }: { country: FlagCountry; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="1" y="1" width="46" height="30" rx="2" />
      {EMBLEMS[country]}
    </svg>
  )
}

export default FlagOutline
