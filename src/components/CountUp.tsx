import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'

/**
 * CountUp — a number that runs from zero to its target when it comes into view.
 *
 * `start` exists because intersection alone is the wrong trigger inside a pinned
 * scene: the stats are technically on screen from the moment the section begins
 * climbing, while their container is still at opacity 0. Gating on the scene's
 * own reveal means the count is actually watched rather than finishing behind a
 * fade.
 *
 * The number is rendered as text rather than a MotionValue so it can carry a
 * prefix and suffix ("~100", "25+") without splitting into separate nodes, and
 * so the finished value is what a screen reader reads.
 */
export type CountUpProps = {
  to: number
  prefix?: string
  suffix?: string
  /** Hold at zero until this is true. Defaults to firing on intersection alone. */
  start?: boolean
  className?: string
}

export function CountUp({ to, prefix = '', suffix = '', start = true, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (prefersReduced) {
      setValue(to)
      return
    }
    if (!inView || !start) return
    const controls = animate(0, to, {
      duration: motionTokens.countUp.duration,
      ease: [...motionTokens.easing.out],
      onUpdate: (next) => setValue(Math.round(next)),
    })
    return () => controls.stop()
  }, [inView, start, to, prefersReduced])

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${to}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  )
}

export default CountUp
