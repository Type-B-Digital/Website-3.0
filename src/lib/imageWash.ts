import { moods, palette } from '@/tokens'
import type { MoodName } from '@/tokens'

/**
 * Image Wash — the tone and colour engine behind the studio tool on the Brand
 * System page.
 *
 * ⚠ NOT IN FIGMA. There is no artboard for an image treatment; this is the
 * brand's colour architecture applied to photography rather than a drawn
 * design. What IS from the system is the only thing that matters here: every
 * colour a washed image can land on comes from `palette` by way of `moods`, so
 * the three washes ARE the three mood directions. Nothing is authored as hex.
 *
 * Runs entirely in the browser. No pixel leaves the machine — designers drop
 * client imagery into this page, and the page is public.
 */

/** A wash is a mood. `deep` is turquoise, `ember` orange, `solar` amber. */
export type WashRamp = MoodName

/**
 * The ramp a wash maps tone onto, shadows first.
 *
 * Derived from `moods[…].accent` rather than restated, so a change to the
 * accent ramp reaches the tool with no edit here. The ends are the brand's two
 * grounds — ink at the black point, cream at the white — which is what keeps a
 * washed photograph sitting on `bg-canvas` or `bg-surface` as if it were cut
 * from it. The four accent steps between them are taken at 800/600/400/200:
 * evenly spaced, and skipping 900/100 because those crowd the neutral ends.
 */
export function rampStops(ramp: WashRamp): readonly string[] {
  const accent = moods[ramp].accent
  return [
    palette.neutral[900],
    accent[800],
    accent[600],
    accent[400],
    accent[200],
    palette.neutral[50],
  ]
}

/* ------------------------------------------------------------------ *
 * ADJUSTMENTS
 * ------------------------------------------------------------------ */

export type Adjustments = {
  exposure: number
  contrast: number
  highlights: number
  shadows: number
  whites: number
  blacks: number
  saturation: number
  /** How far the image is carried onto the brand ramp. 0 = corrected only. */
  wash: number
}

export const NEUTRAL: Adjustments = {
  exposure: 0,
  contrast: 0,
  highlights: 0,
  shadows: 0,
  whites: 0,
  blacks: 0,
  saturation: 0,
  wash: 0,
}

export type AdjustmentField = {
  key: keyof Adjustments
  label: string
  min: number
  max: number
  hint: string
}

/**
 * Slider metadata, in the order a raw developer stacks them — global tone
 * first, then the ends, then colour. The UI renders from this list, so adding
 * a control is a line here plus a line in the pipeline.
 */
export const FIELDS: readonly AdjustmentField[] = [
  {
    key: 'exposure',
    label: 'Exposure',
    min: -100,
    max: 100,
    hint: 'Overall brightness, ±1.5 stops',
  },
  { key: 'contrast', label: 'Contrast', min: -100, max: 100, hint: 'Separation around mid grey' },
  { key: 'highlights', label: 'Highlights', min: -100, max: 100, hint: 'The bright half only' },
  { key: 'shadows', label: 'Shadows', min: -100, max: 100, hint: 'The dark half only' },
  { key: 'whites', label: 'Whites', min: -100, max: 100, hint: 'Where the white point sits' },
  { key: 'blacks', label: 'Blacks', min: -100, max: 100, hint: 'Where the black point sits' },
  { key: 'saturation', label: 'Saturation', min: -100, max: 100, hint: 'Chroma, luminance held' },
]

/* ------------------------------------------------------------------ *
 * ANALYSIS
 * ------------------------------------------------------------------ */

export type WashStats = {
  /** Mean luma, 0–1. */
  mean: number
  /** Standard deviation of luma — the image's own contrast. */
  sd: number
  /** Luma at the 0.25th percentile: where the blacks actually start. */
  black: number
  /** Luma at the 99.75th percentile: where the whites actually stop. */
  white: number
  /** Mean luma below 0.25. 1 when the image has no shadows at all. */
  shadowMean: number
  /** Mean luma above 0.75. 0 when the image has no highlights at all. */
  highlightMean: number
  /** Mean HSV saturation, 0–1. */
  chroma: number
}

// Rec. 709 luma. Used for every mask and for the ramp lookup, so a tonal
// move never shifts hue on its own.
const LR = 0.2126
const LG = 0.7152
const LB = 0.0722

const luma = (r: number, g: number, b: number) => LR * r + LG * g + LB * b

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v)
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

function percentile(hist: Float64Array, total: number, p: number): number {
  const target = total * p
  let seen = 0
  for (let i = 0; i < 256; i++) {
    seen += hist[i]
    if (seen >= target) return i / 255
  }
  return 1
}

/**
 * Read an image's tonal shape.
 *
 * Fully transparent pixels are skipped — a logo on a transparent ground would
 * otherwise read as a black image and get a two-stop exposure push.
 */
export function analyse(pixels: Uint8ClampedArray): WashStats {
  const hist = new Float64Array(256)
  let n = 0
  let sum = 0
  let sumSq = 0
  let chroma = 0
  let shadowSum = 0
  let shadowN = 0
  let highSum = 0
  let highN = 0

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < 8) continue
    const r = pixels[i] / 255
    const g = pixels[i + 1] / 255
    const b = pixels[i + 2] / 255
    const l = luma(r, g, b)

    hist[Math.min(255, (l * 255) | 0)]++
    n++
    sum += l
    sumSq += l * l

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    chroma += max > 0 ? (max - min) / max : 0

    if (l < 0.25) {
      shadowSum += l
      shadowN++
    } else if (l > 0.75) {
      highSum += l
      highN++
    }
  }

  if (n === 0) {
    return { mean: 0.5, sd: 0.2, black: 0, white: 1, shadowMean: 1, highlightMean: 0, chroma: 0.3 }
  }

  const mean = sum / n
  return {
    mean,
    sd: Math.sqrt(Math.max(0, sumSq / n - mean * mean)),
    black: percentile(hist, n, 0.0025),
    white: percentile(hist, n, 0.9975),
    // The empty-bucket defaults are the values that ask for NO correction:
    // shadows that are already light, highlights that are already dark.
    shadowMean: shadowN ? shadowSum / shadowN : 1,
    highlightMean: highN ? highSum / highN : 0,
    chroma: chroma / n,
  }
}

/* ------------------------------------------------------------------ *
 * AUTO
 * ------------------------------------------------------------------ */

/**
 * Targets the auto pass drives an image toward.
 *
 * Not neutral-photographic values — brand ones. The mean sits a little under
 * mid grey and the contrast target is high, because Type B imagery is dark,
 * open-shadowed and high-separation across every artboard in the file. Chroma
 * runs high too; the wash then pulls that chroma onto one hue family, and a
 * flat image reads as muddy rather than moody once it is mapped.
 */
const TARGET_MEAN = 0.46
const TARGET_SD = 0.21
const TARGET_CHROMA = 0.34

/**
 * Turn an analysis into slider positions.
 *
 * Auto is not a separate code path: it produces the same values a person would
 * dial in, so every automatic decision is visible on a slider and can be
 * nudged or undone. Nothing the tool does is hidden from the designer.
 */
export function autoAdjustments(s: WashStats, wash: number): Adjustments {
  return {
    // Stops needed to bring the mean to target, expressed on a ±1.5-stop scale.
    exposure: s.mean > 0.001 ? clamp((Math.log2(TARGET_MEAN / s.mean) / 1.5) * 100, -55, 55) : 0,
    // Short of target adds contrast; over it backs off, but less hard — an
    // already-punchy image is usually punchy on purpose.
    contrast: s.sd > 0.001 ? clamp(((TARGET_SD - s.sd) / TARGET_SD) * 80, -35, 45) : 0,
    // Recovery only. These never push the ends further out.
    highlights: -clamp(((s.highlightMean - 0.82) / 0.18) * 60, 0, 60),
    shadows: clamp(((0.16 - s.shadowMean) / 0.16) * 55, 0, 55),
    // Place the measured end points on 0 and 1. `0.2` is the scale factor the
    // whites/blacks controls use in `toneLut`, so these invert it exactly.
    whites: clamp((1 - s.white) * 500, 0, 45),
    blacks: clamp(-s.black * 500, -45, 0),
    saturation: s.chroma > 0.02 ? clamp((TARGET_CHROMA / s.chroma - 1) * 55, -35, 45) : 0,
    wash,
  }
}

/* ------------------------------------------------------------------ *
 * THE PIPELINE
 * ------------------------------------------------------------------ */

/**
 * Contrast as a tanh curve, and its inverse for the negative half.
 *
 * A straight `0.5 + (v - 0.5) * k` clips: push contrast on an image with any
 * real highlight detail and the top of the histogram flattens into a block of
 * pure white that no later control can bring back. This curve is monotonic,
 * pins 0 and 1, and asymptotes instead of clipping, so contrast steepens the
 * middle and compresses the ends the way a film curve does.
 *
 * `s -> 0` degenerates to the identity, which is why the steepness is scaled
 * from the slider rather than offset from 1.
 */
function contrastCurve(v: number, c: number): number {
  const s = Math.abs(c) * 3
  if (s < 1e-4) return v
  const t = Math.tanh(s)
  if (c > 0) return 0.5 + (0.5 * Math.tanh(s * (2 * v - 1))) / t
  return 0.5 + (0.5 * Math.atanh((2 * v - 1) * t)) / s
}

const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp01((x - e0) / (e1 - e0))
  return t * t * (3 - 2 * t)
}

/**
 * The per-channel half of the pipeline, resolved once into a 256-entry table.
 *
 * Exposure, contrast, blacks and whites depend only on a channel's own value,
 * so they cost one table lookup per channel instead of four transcendental
 * calls per subpixel. On a 12-megapixel export that is the difference between
 * a moment and several seconds.
 */
function toneLut(a: Adjustments): Float32Array {
  const gain = Math.pow(2, (a.exposure / 100) * 1.5)
  const c = a.contrast / 100
  const k = -(a.blacks / 100) * 0.2
  const wp = 1 - (a.whites / 100) * 0.2
  const lut = new Float32Array(256)
  for (let i = 0; i < 256; i++) {
    let v = clamp01((i / 255) * gain)
    v = contrastCurve(v, c)
    v = (v - k) / (1 - k)
    v = v / wp
    lut[i] = clamp01(v)
  }
  return lut
}

/** The wash ramp, resolved to 256 RGB triples in 0–1. */
function rampLut(ramp: WashRamp): Float32Array {
  const stops = rampStops(ramp).map((hex) => [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ])
  const lut = new Float32Array(256 * 3)
  const spans = stops.length - 1
  for (let i = 0; i < 256; i++) {
    const p = (i / 255) * spans
    const lo = Math.min(spans - 1, Math.floor(p))
    const t = p - lo
    for (let ch = 0; ch < 3; ch++) {
      lut[i * 3 + ch] = stops[lo][ch] + (stops[lo + 1][ch] - stops[lo][ch]) * t
    }
  }
  return lut
}

/**
 * Apply a full treatment to an ImageData buffer, in place.
 *
 * Stage order, and why:
 *
 * 1. **Exposure, contrast, blacks, whites** — one table lookup per channel.
 * 2. **Highlights and shadows** — masked by the luma of the result of stage 1,
 *    not of the original. They are recovery controls, so they should act on
 *    what the global moves actually produced; masking on the original lets a
 *    two-stop exposure push blow a highlight that the highlight slider then
 *    cannot see.
 * 3. **Saturation** — around the pixel's own luma, so chroma changes and
 *    brightness does not.
 * 4. **Wash** — the brand ramp, keyed on luma.
 *
 * The wash ends by restoring the pre-wash luma. Without that, mapping onto a
 * ramp re-does the tonal work: a turquoise mid-tone is darker than the grey it
 * replaced, so every corrected image came back a stop down and the exposure
 * slider had to be re-dialled per wash strength. Holding luma makes the wash a
 * colour operation only — tone is settled by the time it runs, and the wash
 * slider moves hue alone.
 */
export function applyWash(data: Uint8ClampedArray, a: Adjustments, ramp: WashRamp): void {
  const tone = toneLut(a)
  const map = rampLut(ramp)
  const sh = a.shadows / 100
  const hi = a.highlights / 100
  const sat = a.saturation / 100
  const w = clamp01(a.wash / 100)

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue

    let r = tone[data[i]]
    let g = tone[data[i + 1]]
    let b = tone[data[i + 2]]

    if (sh !== 0 || hi !== 0) {
      const l = luma(r, g, b)
      // Each control owns one half of the range and fades out by mid grey, so
      // the two never fight over the same pixel.
      const ms = sh * (1 - smoothstep(0, 0.5, l))
      const mh = hi * smoothstep(0.5, 1, l)
      // Headroom-weighted: a lift moves a channel a fraction of the way to
      // white, a pull a fraction of the way to black. Neither can overshoot.
      r = clamp01(r + ms * (sh > 0 ? 1 - r : r) + mh * (hi > 0 ? 1 - r : r))
      g = clamp01(g + ms * (sh > 0 ? 1 - g : g) + mh * (hi > 0 ? 1 - g : g))
      b = clamp01(b + ms * (sh > 0 ? 1 - b : b) + mh * (hi > 0 ? 1 - b : b))
    }

    if (sat !== 0) {
      const l = luma(r, g, b)
      r = clamp01(l + (r - l) * (1 + sat))
      g = clamp01(l + (g - l) * (1 + sat))
      b = clamp01(l + (b - l) * (1 + sat))
    }

    if (w > 0) {
      const l = luma(r, g, b)
      const at = Math.min(255, (l * 255) | 0) * 3
      let rr = r + (map[at] - r) * w
      let gg = g + (map[at + 1] - g) * w
      let bb = b + (map[at + 2] - b) * w
      const lm = luma(rr, gg, bb)
      // Guarded: near black the ratio explodes, and a 2x ceiling keeps a
      // deep shadow from being dragged into the mid-tones by rounding.
      if (lm > 0.02) {
        const s = clamp(l / lm, 0.5, 2)
        rr *= s
        gg *= s
        bb *= s
      }
      r = clamp01(rr)
      g = clamp01(gg)
      b = clamp01(bb)
    }

    data[i] = r * 255
    data[i + 1] = g * 255
    data[i + 2] = b * 255
  }
}
