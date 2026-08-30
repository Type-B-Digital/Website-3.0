import { Fragment, useMemo } from 'react'
import { motion as fm, useTransform, type MotionValue } from 'framer-motion'
import { colors, motion as motionTokens } from '@/tokens'
import { cn } from '@/lib/cn'

/**
 * ScrollFillText — copy that fills from dim to bright, character by character,
 * driven by a scroll progress value rather than by time.
 *
 * Figma: the statement at node 3390:26579. The artboard shows only the end
 * state; the fill behaviour comes from Eduardo's motion mockup.
 *
 * Each character owns a narrow window of the progress range and interpolates
 * its colour across it. Windows overlap by `fillFeather`, which is what makes
 * the sweep read as a smooth wipe instead of a row of discrete flips.
 *
 * Words are kept whole (`inline-block` + `whitespace-nowrap`) so the line still
 * wraps on word boundaries; only the characters inside a word are split.
 */
export type ScrollFillTextProps = {
  text: string
  /** Normalised scroll progress for the surrounding scene. */
  progress: MotionValue<number>
  /** Progress at which the first character starts to fill. */
  start?: number
  /** Progress at which the last character finishes. */
  end?: number
  className?: string
}

function Char({
  char,
  progress,
  from,
  to,
}: {
  char: string
  progress: MotionValue<number>
  from: number
  to: number
}) {
  const color = useTransform(progress, [from, to], [colors.text.onDarkDim, colors.text.onDark])
  return <fm.span style={{ color }}>{char}</fm.span>
}

export function ScrollFillText({
  text,
  progress,
  start = motionTokens.scene.fill.start,
  end = motionTokens.scene.fill.end,
  className,
}: ScrollFillTextProps) {
  // Precompute each character's window once; the schedule depends only on the
  // string, not on scroll position.
  const words = useMemo(() => {
    const total = text.replace(/\s/g, '').length
    const feather = motionTokens.scene.fillFeather
    // Reserve the feather at the tail so the final character reaches full
    // brightness exactly at `end`, not `end + feather`. Without this the copy
    // finishes after the images and the scene stops feeling synchronised.
    const span = Math.max(end - feather - start, 0)
    let seen = 0

    return text.split(' ').map((word, wordIndex) => ({
      key: `${wordIndex}-${word}`,
      chars: [...word].map((char) => {
        // Position of this character in the fill order, ignoring whitespace so
        // spaces do not consume part of the sweep.
        const at = start + (seen / Math.max(total - 1, 1)) * span
        seen += 1
        return { char, from: at, to: at + feather }
      }),
    }))
  }, [text, start, end])

  return (
    <p className={cn(className)} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={word.key}>
          <span aria-hidden className="inline-block whitespace-nowrap">
            {word.chars.map((c, j) => (
              <Char key={j} char={c.char} progress={progress} from={c.from} to={c.to} />
            ))}
          </span>
          {/* A real space, outside the nowrap span, so lines still break here. */}
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </p>
  )
}

export default ScrollFillText
