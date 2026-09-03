import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion as fm, useReducedMotion } from 'framer-motion'
import { motion as motionTokens } from '@/tokens'
import { cn } from '@/lib/cn'
import Typography from './Typography'

/**
 * Toast — a transient confirmation. Nothing in Figma specifies it; authored.
 *
 * A dark pill rather than the usual green: this palette has no green, and
 * introducing one for a single component would put a hue on the page that
 * appears nowhere else in the design system. The tick and the wording carry
 * the "success" meaning instead. See `colors.feedback`.
 *
 * Announcement is the part that is easy to get wrong. `role="status"` with
 * `aria-live="polite"` means a screen reader reports the message when it
 * appears without interrupting whatever is being read — the right register
 * for a confirmation. `role="alert"` would be assertive and is for problems.
 *
 * It is rendered `fixed`, so appearing never reflows the page under the
 * pointer — and through a portal to `document.body`, which is what actually
 * makes `fixed` mean "the viewport" here. `position: fixed` resolves against
 * the nearest ancestor carrying a transform, filter or perspective, and this
 * toast is mounted inside a `Reveal`, which leaves a framer-motion transform
 * on its wrapper even at rest. Without the portal the toast pins to the middle
 * of the form instead of the corner of the screen.
 */
export type ToastProps = {
  open: boolean
  title: string
  description?: string
  /** Auto-dismiss delay in ms; pass 0 to require a manual dismiss. */
  duration?: number
  onDismiss: () => void
}

export function Toast({ open, title, description, duration = 6000, onDismiss }: ToastProps) {
  const prefersReduced = useReducedMotion()
  const { duration: d, easing } = motionTokens

  useEffect(() => {
    if (!open || duration <= 0) return
    const t = window.setTimeout(onDismiss, duration)
    // Cleared on close as well as on unmount, or a re-open inherits the old
    // timer and dismisses early.
    return () => window.clearTimeout(t)
  }, [open, duration, onDismiss])

  // Client-only app, but guard anyway so this never throws during a prerender.
  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <fm.div
          role="status"
          aria-live="polite"
          initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: 16 }}
          transition={{ duration: d.fast, ease: [...easing.out] }}
          className={cn(
            'fixed inset-x-md bottom-lg z-[100] mx-auto flex max-w-[420px] items-start gap-md',
            'rounded-md bg-canvas px-lg py-md text-on-dark shadow-lg',
            'sm:inset-x-auto sm:right-lg',
          )}
        >
          <span
            aria-hidden
            className="mt-[2px] flex size-lg shrink-0 items-center justify-center rounded-full bg-accent-400"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M3 7.5L5.5 10L11 4.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div className="flex min-w-0 flex-col gap-xs">
            <Typography variant="copyMedium" as="p" className="font-semibold">
              {title}
            </Typography>
            {description && (
              <Typography variant="copySmall" as="p" className="opacity-subtle">
                {description}
              </Typography>
            )}
          </div>

          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss notification"
            className={cn(
              'ml-auto shrink-0 rounded-sm p-xs opacity-subtle',
              'transition-opacity duration-fast ease-out hover:opacity-100',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-on-dark',
            )}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </fm.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default Toast
