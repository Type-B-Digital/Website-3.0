import { useRef } from 'react'

/**
 * Two passive bot checks that cost a real person nothing.
 *
 * Neither is a security control — see the warning in `Captcha`. Both are
 * cheap, invisible, and catch the naive form-filling scripts that make up
 * almost all contact-form spam.
 *
 * 1. **Honeypot.** A field a person never sees and so never fills. Bots that
 *    walk the DOM and populate every input give themselves away. It is hidden
 *    with an off-screen clip rather than `display: none` or `hidden`, because
 *    the more naive scrapers skip fields that are obviously not rendered —
 *    and it carries `tabIndex={-1}` plus `aria-hidden` so keyboard and
 *    screen-reader users never reach it. It must also be `autoComplete="off"`,
 *    or a browser's own autofill can populate it and lock a real person out.
 *
 * 2. **Time to submit.** A person cannot read four labels, type answers and
 *    solve a sum in under a couple of seconds; a script submits instantly.
 *
 * `MIN_SECONDS` is deliberately low. Set it high and you start rejecting
 * people who paste a prepared message, which is a far worse failure than
 * letting a bot through.
 */
const MIN_SECONDS = 2.5

export type BotGuard = {
  /** Spread onto a hidden text input. */
  honeypotProps: {
    name: string
    tabIndex: number
    autoComplete: string
    'aria-hidden': true
    className: string
  }
  /**
   * True when the submission looks automated. Pass the honeypot's current
   * value; the timing half is measured internally from mount.
   */
  looksAutomated: (honeypotValue: string) => boolean
  /** Seconds since the form mounted, for logging a rejection. */
  elapsed: () => number
}

export function useBotGuard(): BotGuard {
  const mountedAt = useRef(Date.now())

  const elapsed = () => (Date.now() - mountedAt.current) / 1000

  return {
    honeypotProps: {
      // Named like something worth filling, so a bot targets it.
      name: 'website',
      tabIndex: -1,
      autoComplete: 'off',
      'aria-hidden': true,
      className: 'absolute left-[-9999px] top-0 h-px w-px opacity-0',
    },
    looksAutomated: (honeypotValue: string) =>
      honeypotValue.trim() !== '' || elapsed() < MIN_SECONDS,
    elapsed,
  }
}

export default useBotGuard
