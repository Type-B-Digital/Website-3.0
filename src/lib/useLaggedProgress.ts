import { useSpring, type MotionValue } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'

/**
 * useLaggedProgress — smooth a scroll-linked progress value before it drives
 * anything.
 *
 * Raw scroll progress is a step function: it jumps by whatever the wheel or
 * trackpad reported, so anything bound directly to it tracks the input rigidly,
 * frame for frame. Passing it through a spring first gives the scene a beat of
 * latency and a settle, which is what reads as easing rather than as a value
 * being dragged.
 *
 * Spring constants live in `tokens.motion.scrollLag`, so the whole page shares
 * one feel and can be retuned in one place.
 */
export function useLaggedProgress(progress: MotionValue<number>): MotionValue<number> {
  return useSpring(progress, motionTokens.scrollLag)
}

export default useLaggedProgress
