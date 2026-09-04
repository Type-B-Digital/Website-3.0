import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, useMotionValue, type AnimationPlaybackControls } from 'framer-motion'
import { geoOrthographic, geoPath, type GeoProjection } from 'd3-geo'
import { motion as motionTokens, palette } from '@/tokens'
import { cn } from '@/lib/cn'
import land from '@/data/land-110m.json'

/**
 * Globe — the top cap of a rotating Earth. Figma: node 3672:9750 on Culture.
 *
 * The artboard draws a wireframe with invented coastlines. This is the real
 * thing: Natural Earth's 110m land outline, orthographically projected, so the
 * continents are where they actually are and a city rotates to where it
 * actually is. `scripts/build-land.mjs` converts the source TopoJSON once into
 * `src/data/land-110m.json` (75KB, 5,123 points), which is why only `d3-geo`
 * ships — `world-atlas` and `topojson-client` stay devDependencies.
 *
 * ## Geometry
 *
 * The sphere is as wide as the container and its centre sits a full radius
 * below the top edge, so only the cap shows — the artboard's 1440x327 band is
 * the top 327px of a 1440px-diameter globe.
 *
 * That makes "rotate a city into view" different from the usual globe: a city
 * rotated to the projection centre would land a radius below the visible strip.
 * Instead each city is rotated `TILT` degrees *north* of centre, which lifts it
 * to `R - R*sin(TILT)` from the top — about 200px on the artboard's 720px
 * radius. Hence `rotate([-lon, -lat + TILT])`.
 *
 * ## Drawing
 *
 * Canvas, not SVG: 5,000 points re-projected per frame is one path fill on a
 * canvas and 5,000 DOM nodes in SVG. Redraws are coalesced into one rAF and
 * only happen while something is actually moving, so a globe at rest costs
 * nothing.
 */

/** Degrees north of the projection centre to lift the active city into the cap. */
const TILT = 46

export type GlobeLocation = {
  name: string
  /** Real coordinates — the point of using a real projection. */
  lat: number
  lon: number
}

export type GlobeProps = {
  locations: readonly GlobeLocation[]
  /** Index to rotate to. */
  active: number
  className?: string
}

/** Shortest way round the sphere: -170 -> 170 is 20 degrees, not 340. */
function shortestTurn(from: number, to: number) {
  let delta = ((to - from + 180) % 360) - 180
  if (delta < -180) delta += 360
  return from + delta
}

export function Globe({ locations, active, className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [marker, setMarker] = useState<{ x: number; y: number; visible: boolean } | null>(null)

  const target = locations[active] ?? locations[0]
  const lambda = useMotionValue(target ? -target.lon : 0)
  const phi = useMotionValue(target ? -target.lat + TILT : 0)
  const frame = useRef<number | null>(null)
  const runs = useRef<AnimationPlaybackControls[]>([])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /** Build the projection for the current rotation. */
  const project = useCallback((): GeoProjection | null => {
    if (!size.w) return null
    const radius = size.w / 2
    return geoOrthographic()
      .scale(radius)
      .translate([size.w / 2, radius])
      .rotate([lambda.get(), phi.get()])
      .clipAngle(90)
  }, [size.w, lambda, phi])

  const draw = useCallback(() => {
    frame.current = null
    const canvas = canvasRef.current
    const projection = project()
    if (!canvas || !projection || !size.w || !size.h) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    if (canvas.width !== size.w * dpr || canvas.height !== size.h * dpr) {
      canvas.width = size.w * dpr
      canvas.height = size.h * dpr
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, size.w, size.h)

    // Coastlines only — the artboard draws outlines, not filled land.
    ctx.beginPath()
    geoPath(projection, ctx)(land as never)
    ctx.strokeStyle = palette.amber[100]
    ctx.globalAlpha = 0.55
    ctx.lineWidth = 1
    ctx.lineJoin = 'round'
    ctx.stroke()

    // The limb: the sphere's own edge, which is the arc across the artboard.
    ctx.beginPath()
    ctx.arc(size.w / 2, size.w / 2, size.w / 2 - 0.5, 0, Math.PI * 2)
    ctx.globalAlpha = 0.7
    ctx.stroke()
    ctx.globalAlpha = 1

    if (target) {
      const p = projection([target.lon, target.lat])
      // `clipAngle(90)` returns null for a point on the far side, which is what
      // keeps a marker from being painted through the planet.
      setMarker(p ? { x: p[0], y: p[1], visible: true } : { x: 0, y: 0, visible: false })
    }
  }, [project, size.w, size.h, target])

  /** Coalesce every change into one frame. */
  const schedule = useCallback(() => {
    if (frame.current === null) frame.current = requestAnimationFrame(draw)
  }, [draw])

  useEffect(() => {
    const stops = [lambda.on('change', schedule), phi.on('change', schedule)]
    schedule()
    return () => {
      stops.forEach((s) => s())
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current)
        /*
          Reset the handle, not just the frame. `schedule` no-ops while this
          holds a value, so leaving a cancelled id here wedges the canvas: the
          only frame that ever ran was the one queued at size 0, and every
          redraw after the ResizeObserver reported real dimensions was
          silently dropped.
        */
        frame.current = null
      }
    }
  }, [lambda, phi, schedule])

  // Rotate to the active location.
  useEffect(() => {
    if (!target) return
    runs.current.forEach((r) => r.stop())
    const { duration, easing } = motionTokens
    const spec = { duration: duration.slow, ease: [...easing.inOut] as const }
    runs.current = [
      animate(lambda, shortestTurn(lambda.get(), -target.lon), spec),
      animate(phi, -target.lat + TILT, spec),
    ]
    return () => runs.current.forEach((r) => r.stop())
  }, [target, lambda, phi])

  return (
    <div ref={wrapRef} className={cn('relative w-full', className)}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={target ? `Globe centred on ${target.name}` : 'Globe'}
        style={{ width: size.w, height: size.h }}
        className="block"
      />
      {marker?.visible && (
        <span
          aria-hidden
          className="globe-pin pointer-events-none absolute"
          style={{ left: marker.x, top: marker.y }}
        />
      )}
    </div>
  )
}

export default Globe
