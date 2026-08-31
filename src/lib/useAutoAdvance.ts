import { useEffect, useRef } from 'react'
import { useMotionValueEvent, type MotionValue } from 'framer-motion'

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
  /** Ms to ignore scrolls for while the programmatic scroll runs. */
  advanceDuration?: number
}

export function useAutoAdvance({
  progress,
  targetId,
  enabled = true,
  armAt = 0.995,
  disarmBelow = 0.9,
  settleDelay = 220,
  advanceDuration = 1100,
}: AutoAdvanceOptions) {
  const armedAt = useRef<number | null>(null)
  const advancing = useRef(false)

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

    const onScroll = () => {
      const y = window.scrollY
      const scrollingDown = y > lastY
      lastY = y

      if (advancing.current || !scrollingDown) return

      const armed = armedAt.current
      if (armed === null || performance.now() - armed < settleDelay) return

      const target = document.getElementById(targetId)
      if (!target) return

      advancing.current = true
      armedAt.current = null
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth',
      })
      window.setTimeout(() => {
        advancing.current = false
        lastY = window.scrollY
      }, advanceDuration)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled, targetId, settleDelay, advanceDuration])
}

export default useAutoAdvance
