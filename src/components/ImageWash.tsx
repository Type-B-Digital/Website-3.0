import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Button from './Button'
import Tabs from './Tabs'
import Tag from './Tag'
import Typography from './Typography'
import { cn } from '@/lib/cn'
import { analyse, applyWash, autoAdjustments, FIELDS, NEUTRAL, rampStops } from '@/lib/imageWash'
import type { Adjustments, WashRamp } from '@/lib/imageWash'

/**
 * Image Wash — drop any photograph in, get it back in Type B's colour.
 *
 * ⚠ NOT IN FIGMA, and not an atom either. It sits in Tier 3 because that is
 * where the team looks for the things they use, but it is a studio tool rather
 * than a component a page composes: nothing on the site renders it except this
 * one demo. The engine it drives — `@/lib/imageWash` — is the systemic part,
 * and every colour it can produce comes from `palette` by way of `moods`.
 *
 * What it does, in order:
 *
 * 1. Reads the image's histogram and sets exposure, contrast, highlights,
 *    shadows, whites, blacks and saturation to bring it onto the brand's
 *    tonal targets. Auto writes slider values, so every decision is visible
 *    and can be nudged — there is no hidden second pass.
 * 2. Maps the corrected tone onto one of the three mood ramps, holding
 *    luminance so the wash moves colour and nothing else.
 *
 * **No pixel leaves the browser.** Decode, analysis, preview and export are
 * all local; there is no upload and no network call anywhere in this file.
 * That is a requirement rather than an optimisation — this page is public, and
 * designers will drop unreleased client photography into it.
 *
 * Preview runs on a downscaled copy so a slider drag stays interactive; the
 * download re-runs the identical pipeline over the full-resolution original.
 */

/** Longest edge of the working copy the sliders drive. */
const PREVIEW_MAX = 1200

/** Where the wash slider starts: brand-tinted, still recognisably the photo. */
const DEFAULT_WASH = 45

const RAMPS: readonly { id: WashRamp; label: string; note: string }[] = [
  { id: 'deep', label: 'Deep', note: 'Turquoise — the default mood' },
  { id: 'ember', label: 'Ember', note: 'Orange — warm, high-energy' },
  { id: 'solar', label: 'Solar', note: 'Amber — warm, softer' },
]

type Loaded = {
  image: HTMLImageElement
  url: string
  name: string
  width: number
  height: number
}

export function ImageWash({ className }: { className?: string }) {
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  const [adjustments, setAdjustments] = useState<Adjustments>(NEUTRAL)
  const [ramp, setRamp] = useState<WashRamp>('deep')
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)

  /** The downscaled original. Every preview render starts from a copy of this. */
  const baseRef = useRef<ImageData | null>(null)
  /** Slider values for the export, read outside React's render cycle. */
  const liveRef = useRef({ adjustments, ramp })
  const beforeRef = useRef<HTMLCanvasElement | null>(null)
  const afterRef = useRef<HTMLCanvasElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const uid = useId()

  liveRef.current = { adjustments, ramp }

  // The object URL outlives the render that made it, so it is revoked when the
  // image is replaced or the page unmounts rather than in the loader.
  useEffect(() => {
    if (!loaded) return
    return () => URL.revokeObjectURL(loaded.url)
  }, [loaded])

  const openFile = useCallback((file: File) => {
    setError(null)
    if (!file.type.startsWith('image/')) {
      setError('That is not an image file.')
      return
    }
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      const scale = Math.min(1, PREVIEW_MAX / Math.max(image.naturalWidth, image.naturalHeight))
      const w = Math.max(1, Math.round(image.naturalWidth * scale))
      const h = Math.max(1, Math.round(image.naturalHeight * scale))

      const work = document.createElement('canvas')
      work.width = w
      work.height = h
      const ctx = work.getContext('2d', { willReadFrequently: true })
      if (!ctx) {
        setError('This browser will not give the page a 2D canvas.')
        return
      }
      ctx.drawImage(image, 0, 0, w, h)
      const base = ctx.getImageData(0, 0, w, h)
      baseRef.current = base

      setLoaded({
        image,
        url,
        name: file.name.replace(/\.[^.]+$/, ''),
        width: w,
        height: h,
      })
      setAdjustments(autoAdjustments(analyse(base.data), DEFAULT_WASH))
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      // HEIC is the common one: Finder shows a thumbnail, Chrome cannot decode it.
      setError('That image would not decode. JPEG, PNG and WebP all work; HEIC does not.')
    }
    image.src = url
  }, [])

  // Paint the untouched reference once per image.
  useEffect(() => {
    const base = baseRef.current
    const canvas = beforeRef.current
    if (!loaded || !base || !canvas) return
    canvas.width = base.width
    canvas.height = base.height
    canvas.getContext('2d')?.putImageData(base, 0, 0)
  }, [loaded])

  // Re-render the treated preview, coalesced to one frame — a slider drag
  // fires far faster than the pipeline can run, and without this the queue of
  // stale renders is what makes a tool like this feel laggy.
  useEffect(() => {
    const base = baseRef.current
    const canvas = afterRef.current
    if (!loaded || !base || !canvas) return
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null
      const out = new ImageData(new Uint8ClampedArray(base.data), base.width, base.height)
      applyWash(out.data, adjustments, ramp)
      canvas.width = base.width
      canvas.height = base.height
      canvas.getContext('2d')?.putImageData(out, 0, 0)
    })
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [loaded, adjustments, ramp])

  const set = (key: keyof Adjustments, value: number) =>
    setAdjustments((prev) => ({ ...prev, [key]: value }))

  const reAuto = () => {
    const base = baseRef.current
    if (!base) return
    setAdjustments(autoAdjustments(analyse(base.data), adjustments.wash))
  }

  const download = () => {
    const current = loaded
    if (!current || exporting) return
    setExporting(true)
    // Two frames: one to paint the disabled button, one to run the export.
    // The full-resolution pass is synchronous and blocks the main thread, so
    // without the gap the label never changes and the page looks hung.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        try {
          const { image } = current
          const canvas = document.createElement('canvas')
          canvas.width = image.naturalWidth
          canvas.height = image.naturalHeight
          const ctx = canvas.getContext('2d', { willReadFrequently: true })
          if (!ctx) throw new Error('no context')
          ctx.drawImage(image, 0, 0)
          const full = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const live = liveRef.current
          applyWash(full.data, live.adjustments, live.ramp)
          ctx.putImageData(full, 0, 0)
          canvas.toBlob((blob) => {
            if (blob) {
              const href = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = href
              a.download = `${current.name}--type-b-${live.ramp}.png`
              a.click()
              URL.revokeObjectURL(href)
            } else {
              setError('The export could not be encoded. The image may be too large.')
            }
            setExporting(false)
          }, 'image/png')
        } catch {
          setError('The export failed. The image may be larger than this browser allows.')
          setExporting(false)
        }
      }),
    )
  }

  const startOver = () => {
    baseRef.current = null
    setLoaded(null)
    setAdjustments(NEUTRAL)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) openFile(file)
  }

  return (
    <div className={cn('flex flex-col gap-lg', className)}>
      <input
        ref={inputRef}
        id={`${uid}-file`}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) openFile(file)
        }}
      />

      {!loaded ? (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            'flex flex-col items-center gap-md rounded-md border border-dashed p-4xl text-center',
            'transition-colors duration-fast ease-out',
            dragging ? 'border-accent-500 bg-accent-100' : 'border-divider bg-surface',
          )}
        >
          <Typography variant="copyMedium" as="p" className="max-w-[420px]">
            Drop an image here, or choose one, and it comes back exposed, graded and washed in
            Type&nbsp;B&nbsp;colour.
          </Typography>
          <Typography variant="copyXSmall" as="p" muted className="max-w-[420px]">
            JPEG, PNG or WebP. Everything runs in this browser — the file is never uploaded.
          </Typography>
          <Button as="label" htmlFor={`${uid}-file`} variant="primary" tone="onLight" icon={false}>
            Choose an image
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-md">
            <Tabs
              items={RAMPS.map(({ id, label }) => ({ id, label }))}
              active={ramp}
              onChange={(id) => setRamp(id as WashRamp)}
              tone="onLight"
              panelId={`${uid}-preview`}
              label="Choose a wash"
            />
            <div className="flex flex-wrap items-center gap-sm">
              {rampStops(ramp).map((hex) => (
                <span
                  key={hex}
                  aria-hidden
                  className="h-lg w-lg rounded-sm border border-divider"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </div>

          <div id={`${uid}-preview`} className="grid gap-lg md:grid-cols-2">
            {(
              [
                { ref: beforeRef, label: 'Original', alt: 'The image as uploaded' },
                { ref: afterRef, label: 'Washed', alt: `The image washed in the ${ramp} ramp` },
              ] as const
            ).map((pane) => (
              <div key={pane.label} className="flex flex-col gap-sm">
                <Tag className="self-start">{pane.label}</Tag>
                <div className="overflow-hidden rounded-md bg-canvas">
                  <canvas
                    ref={pane.ref}
                    role="img"
                    aria-label={pane.alt}
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-lg rounded-md border border-divider bg-surface p-lg md:grid-cols-2">
            <Slider
              id={`${uid}-wash`}
              label="Wash"
              hint={RAMPS.find((r) => r.id === ramp)?.note ?? ''}
              min={0}
              max={100}
              value={adjustments.wash}
              onChange={(v) => set('wash', v)}
              className="md:col-span-2"
            />
            {FIELDS.map((field) => (
              <Slider
                key={field.key}
                id={`${uid}-${field.key}`}
                label={field.label}
                hint={field.hint}
                min={field.min}
                max={field.max}
                value={adjustments[field.key]}
                onChange={(v) => set(field.key, v)}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-md">
            <Button variant="primary" tone="onLight" onClick={download} disabled={exporting}>
              {exporting
                ? 'Exporting…'
                : `Download PNG · ${loaded.image.naturalWidth}×${loaded.image.naturalHeight}`}
            </Button>
            <Button variant="secondary" tone="onLight" icon={false} onClick={reAuto}>
              Re-run auto
            </Button>
            <Button
              variant="tertiary"
              tone="onLight"
              icon={false}
              onClick={() => setAdjustments({ ...NEUTRAL, wash: 0 })}
            >
              Clear all
            </Button>
            <Button variant="tertiary" tone="onLight" icon={false} onClick={startOver}>
              Start over
            </Button>
          </div>
        </>
      )}

      {error && (
        <Typography variant="copySmall" as="p" className="text-danger">
          {error}
        </Typography>
      )}
    </div>
  )
}

/** One labelled range, with its value shown — a slider with no readout is a guess. */
function Slider({
  id,
  label,
  hint,
  min,
  max,
  value,
  onChange,
  className,
}: {
  id: string
  label: string
  hint: string
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-xs', className)}>
      <div className="flex items-baseline justify-between gap-sm">
        <label htmlFor={id}>
          <Typography variant="copySmall" as="span" className="font-semibold">
            {label}
          </Typography>
        </label>
        <Typography variant="copyXSmall" as="span" muted>
          {Math.round(value)}
        </Typography>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        aria-describedby={`${id}-hint`}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          'w-full cursor-pointer accent-accent-500',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-accent-500',
        )}
      />
      <Typography variant="copyXSmall" as="span" id={`${id}-hint`} muted>
        {hint}
      </Typography>
    </div>
  )
}

export default ImageWash
