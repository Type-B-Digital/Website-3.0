import { motion as fm, useReducedMotion } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'
import { cn } from '@/lib/cn'
import Typography from './Typography'

/**
 * DivergeConverge — the five-stage design-thinking figure.
 * Figma: nodes 3672:9733 (the row) and 3672:9734 (the diamonds).
 *
 * The whole point of the graphic is that it is one shape seen through five
 * windows, so the parts have to line up exactly:
 *
 * **The silhouette diverges then converges.** Five blocks, 236.8px wide on a
 * 260.8px pitch, heights 80 / 160 / 240 / 160 / 80, each centred in a 240px
 * row. The top edges step down and the bottom edges step up, so the outline of
 * the row is itself a diamond — the headline, drawn.
 *
 * **The diamonds are continuous across the blocks.** Two 489.413px squares
 * rotated -45 degrees, 1px white border at 32%, 8px radius, centred at 346.07px
 * and 933.93px of the 1280px row and vertically centred in it. They are drawn
 * *inside every block* at the same absolute position, so the diagonals read as
 * one motif passing behind the row rather than five unrelated marks. Verified
 * against the artboard: a column sampled in the gap between two blocks is flat
 * cream, so the figure exists only where a block reveals it.
 *
 * This is why each block owns a copy of the layer, offset by its own left edge,
 * instead of one layer sitting behind everything: the blocks are opaque
 * gradients, so a shared layer behind them would be completely hidden.
 *
 * **Ideate glows.** A warm bloom bleeding about 90px past the block on every
 * side — measured on the artboard, symmetric, falling to nothing by 110px.
 *
 * Every gradient is a pair of exact palette values, and together the five walk
 * the brand's ramps out and back: ink to turquoise, turquoise to orange, orange
 * to amber, amber to ink, then neutral to neutral.
 */

const ROW_WIDTH = 1280
const ROW_HEIGHT = 240
const BLOCK_WIDTH = 236.8
const BLOCK_PITCH = 260.8
/** 489.413px square rotated -45deg. Centres relative to the row. */
const DIAMOND_SIZE = 489.413
const DIAMOND_CENTRES = [346.07, 933.93]

export type DivergeStage = {
  label: string
  description: string
  /** Block height in the 240px row — the diverge/converge silhouette. */
  height: number
  /** `from` and `to` are palette values; the fill runs left to right. */
  from: string
  to: string
  glow?: boolean
}

/**
 * The two diamonds, positioned in row coordinates. Rendered inside each block
 * and shifted by `-offsetX` so the figure stays continuous across the row.
 */
function DiamondLayer({ offsetX }: { offsetX: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0"
      style={{ left: -offsetX, width: ROW_WIDTH }}
    >
      {DIAMOND_CENTRES.map((cx) => (
        <div
          key={cx}
          className="absolute top-1/2 rounded-md border border-white/[0.32]"
          style={{
            width: DIAMOND_SIZE,
            height: DIAMOND_SIZE,
            left: cx,
            transform: 'translate(-50%, -50%) rotate(-45deg)',
          }}
        />
      ))}
    </div>
  )
}

export function DivergeConverge({
  stages,
  className,
}: {
  stages: readonly DivergeStage[]
  className?: string
}) {
  const prefersReduced = useReducedMotion()
  const { duration, easing, reveal } = motionTokens

  return (
    <div className={cn('flex w-full flex-col gap-lg', className)}>
      {/*
        The row keeps the artboard's proportions at any width: 1280x240 is
        16:3, and the blocks are sized as percentages of it so the diamonds,
        which are absolutely placed in the same coordinate space, stay aligned.
      */}
      <div
        className="relative grid w-full"
        style={{
          aspectRatio: `${ROW_WIDTH} / ${ROW_HEIGHT}`,
          gridTemplateColumns: `repeat(${stages.length}, ${(BLOCK_WIDTH / ROW_WIDTH) * 100}%)`,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {stages.map((stage, i) => {
          const offsetX = i * BLOCK_PITCH
          return (
            <fm.div
              key={stage.label}
              className="relative"
              style={{ height: `${(stage.height / ROW_HEIGHT) * 100}%` }}
              initial={
                prefersReduced
                  ? undefined
                  : { opacity: 0, y: reveal.distance, filter: `blur(${reveal.feather}px)` }
              }
              whileInView={
                prefersReduced ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              viewport={motionTokens.viewport}
              transition={{
                duration: duration.reveal,
                ease: [...easing.inOut],
                delay: reveal.lag + i * reveal.stagger,
              }}
            >
              {stage.glow && (
                /*
                  Sits behind the block and bleeds past it. `-inset-[90px]` is
                  the measured extent; the blur is what makes the falloff match
                  the artboard rather than showing a hard radial edge.
                */
                <span
                  aria-hidden
                  className="diverge-glow pointer-events-none absolute -inset-[90px] -z-10"
                />
              )}
              <div
                className="relative size-full overflow-hidden rounded-md"
                style={{ backgroundImage: `linear-gradient(90deg, ${stage.from}, ${stage.to})` }}
              >
                <DiamondLayer offsetX={offsetX} />
              </div>
            </fm.div>
          )
        })}
      </div>

      {/* Labels share the block columns, so each sits under its own block. */}
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: `repeat(${stages.length}, ${(BLOCK_WIDTH / ROW_WIDTH) * 100}%)`,
          justifyContent: 'space-between',
        }}
      >
        {stages.map((stage) => (
          <div key={stage.label} className="flex flex-col items-center gap-sm text-center">
            <Typography variant="copyLarge" as="h3">
              {stage.label}
            </Typography>
            <Typography variant="copySmall" muted>
              {stage.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DivergeConverge
