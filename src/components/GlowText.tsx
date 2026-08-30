import { useLayoutEffect, useRef, useState } from 'react'
import { motion as fm, type MotionValue, useTransform } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'
import { cn } from '@/lib/cn'

/**
 * GlowText — words lit by a colour blob that follows the pointer.
 *
 * Figma: "bbb-glowing-copy-component" — node 3390:26748
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3390-26748
 *
 * Three layers, bottom to top, exactly as the artboard builds them:
 *
 *   1. `bbb-glow-bg` (node 3390:26682) — an ambient colour blob, heavily
 *      blurred, sitting behind everything.
 *   2. `bbb-solid-copy` (node 3390:26719) — the words as a solid `#071B27`
 *      vector. Only a shade off the near-black ground, so they read as barely
 *      there; crucially they sit OVER the ambient blob and occlude it, which is
 *      what gives the letterforms their dark silhouette.
 *   3. `bbb-outline-copy` (node 3390:26687) — cream letter STROKES, revealed by
 *      the blob. On the artboard this is a static composite; here the blob
 *      tracks the pointer, so moving the mouse shines a light across the words.
 *
 * Performance note: the stroke mask is STATIC (the letterforms) and the blob
 * moves inside it on `transform`. The obvious alternative — a moving radial
 * gradient as the mask — repaints the mask every frame. This way the only
 * per-frame work is a composited translate.
 *
 * Geometry is measured rather than expressed in percentages because the mask,
 * the solid layer and the blob all have to agree on one coordinate space.
 */
export type GlowTextProps = {
  /** Solid word artwork — the dark silhouette layer. */
  solidSrc: string
  /** Stroke word artwork — used as the mask that the blob shines through. */
  strokeSrc: string
  /** Artwork aspect ratio (width / height). */
  aspect: number
  /** Words box width, as a fraction of the panel. */
  widthRatio: number
  /** Words box left edge, as a fraction of the panel. */
  leftRatio: number
  /** Pointer position in panel pixels. */
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  /** Accessible text — the artwork is decorative SVG. */
  label: string
  className?: string
}

export function GlowText({
  solidSrc,
  strokeSrc,
  aspect,
  widthRatio,
  leftRatio,
  pointerX,
  pointerY,
  label,
  className,
}: GlowTextProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [panel, setPanel] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const measure = () => setPanel({ width: el.clientWidth, height: el.clientHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const boxWidth = panel.width * widthRatio
  const boxHeight = boxWidth / aspect
  const boxLeft = panel.width * leftRatio
  const boxTop = (panel.height - boxHeight) / 2

  // The blob lives inside the masked box, so its coordinates are box-relative.
  const blobX = useTransform(pointerX, (v) => v - boxLeft)
  const blobY = useTransform(pointerY, (v) => v - boxTop)

  const { blobSize, strokeOpacity, ambientOpacity } = motionTokens.glowScene
  const half = blobSize / 2

  const box = {
    left: boxLeft,
    top: boxTop,
    width: boxWidth,
    height: boxHeight,
  }

  return (
    <div ref={rootRef} className={cn('absolute inset-0', className)}>
      <span className="sr-only">{label}</span>

      {/* 1. Ambient blob — the overall haze. Figma node 3390:26682. */}
      <fm.div
        aria-hidden
        className="bbb-blob bbb-blob--ambient absolute left-0 top-0"
        style={{
          x: pointerX,
          y: pointerY,
          width: blobSize,
          height: blobSize,
          marginLeft: -half,
          marginTop: -half,
          opacity: ambientOpacity,
        }}
      />

      {/* 2. Solid words — dark silhouette, occludes the ambient blob. */}
      <img
        aria-hidden
        src={solidSrc}
        alt=""
        className="absolute max-w-none"
        style={box}
      />

      {/* 3. Lit strokes — a static letterform mask with the blob moving inside. */}
      <div
        aria-hidden
        className="bbb-lit absolute overflow-hidden"
        style={{
          ...box,
          opacity: strokeOpacity,
          WebkitMaskImage: `url("${strokeSrc}")`,
          maskImage: `url("${strokeSrc}")`,
        }}
      >
        <fm.div
          className="bbb-blob absolute left-0 top-0"
          style={{
            x: blobX,
            y: blobY,
            width: blobSize,
            height: blobSize,
            marginLeft: -half,
            marginTop: -half,
          }}
        />
      </div>
    </div>
  )
}

export default GlowText
