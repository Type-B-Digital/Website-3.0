import { useEffect, useRef } from 'react'
import { animate, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'

/**
 * useAutoAdvance — once a pinned scene has finished playing, send the next
 * downward scroll straight to the top of the following section.
 *
 * Why: a full-viewport sticky panel releases into a stretch where the outgoing
 * scene and the incoming one are both half visible, with a hard edge between
 * them. Rather than let the visitor rest there, the next deliberate scroll
 * carries them to the next section's start in one movement.
 *
 * This does take over one scroll gesture, so it is deliberately narrow:
 *
 * - It arms only once the scene is essentially complete (`armAt`).
 * - It ignores the gesture that armed it — `settleDelay` means a fresh scroll
 *   is required, not the tail of the one already in progress.
 * - It fires once, then disarms. Scrolling back up past `disarmBelow` re-arms it
 *   so the transition still works on a second pass.
 * - Upward scrolls never trigger it.
 * - An upward scroll DURING the move cancels it, so the visitor can always
 *   overrule the page.
 *
 * The move itself is animated by hand rather than with `behavior: 'smooth'`,
 * which exposes no duration and is far too quick for a full-viewport travel —
 * it reads as a jump cut. Duration and easing come from
 * `tokens.motion.autoAdvance` and `tokens.motion.easing.scroll`.
 */
export type AutoAdvanceOptions = {
  /** Scene progress, 0-1. */
  progress: MotionValue<number>
  /** `id` of the element to scroll to. */
  targetId: string
  /** Pass false to disable entirely — e.g. under reduced motion. */
  enabled?: boolean
  /** Progress at which the scene counts as finished. */
  armAt?: number
  /** Scrolling back above this progress re-arms it. */
  disarmBelow?: number
  /** Ms to wait after arming before a scroll can trigger the jump. */
  settleDelay?: number
  /** Seconds the move takes. Defaults to `motion.autoAdvance.duration`. */
  duration?: number
}

export function useAutoAdvance({
  progress,
  targetId,
  enabled = true,
  armAt = 0.995,
  disarmBelow = 0.9,
  settleDelay = 220,
  duration = motionTokens.autoAdvance.duration,
}: AutoAdvanceOptions) {
  const armedAt = useRef<number | null>(null)
  const advancing = useRef(false)
  const playback = useRef<{ stop: () => void } | null>(null)

  useMotionValueEvent(progress, 'change', (value) => {
    if (value >= armAt && armedAt.current === null && !advancing.current) {
      armedAt.current = performance.now()
    } else if (value < disarmBelow) {
      armedAt.current = null
    }
  })

  useEffect(() => {
    if (!enabled) return

    let lastY = window.scrollY

    const finish = () => {
      playback.current = null
      advancing.current = false
      lastY = window.scrollY
      document.documentElement.style.scrollBehavior = ''
    }

    const onScroll = () => {
      const y = window.scrollY
      const scrollingDown = y > lastY
      lastY = y

      if (advancing.current || !scrollingDown) return

      const armed = armedAt.current
      if (armed === null || performance.now() - armed < settleDelay) return

      const target = document.getElementById(targetId)
      if (!target) return

      const from = window.scrollY
      const to = target.getBoundingClientRect().top + from
      if (Math.abs(to - from) < 2) return

      advancing.current = true
      armedAt.current = null

      // The stylesheet sets `scroll-behavior: smooth` globally, which would
      // make every per-frame scrollTo start its own animation and fight this
      // one. Suspend it for the duration.
      document.documentElement.style.scrollBehavior = 'auto'

      playback.current = animate(from, to, {
        duration,
        ease: [...motionTokens.easing.scroll],
        onUpdate: (value) => window.scrollTo(0, value),
        onComplete: finish,
        onStop: finish,
      })
    }

    // An upward gesture mid-move hands control straight back to the visitor.
    const onWheel = (event: WheelEvent) => {
      if (advancing.current && event.deltaY < 0) playback.current?.stop()
    }
    const onTouch = () => playback.current?.stop()
    const onKey = (event: KeyboardEvent) => {
      if (['ArrowUp', 'PageUp', 'Home', 'Escape'].includes(event.key)) {
        playback.current?.stop()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('keydown', onKey)
      playback.current?.stop()
      document.documentElement.style.scrollBehavior = ''
    }
  }, [enabled, targetId, settleDelay, duration])
}

export default useAutoAdvance
