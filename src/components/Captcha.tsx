import { useCallback, useEffect, useId, useState } from 'react'
import { cn } from '@/lib/cn'
import Typography from './Typography'

/**
 * Captcha — a human-verification challenge for the contact form.
 *
 * ⚠ READ THIS BEFORE RELYING ON IT.
 *
 * This is a *client-side* challenge, and a client-side challenge is a
 * deterrent, not a security control. Everything it checks runs in the
 * browser, where a determined script can simply not run it and POST to the
 * endpoint directly. It will stop the overwhelming majority of drive-by form
 * spam, which is what floods a contact inbox; it will not stop anyone who
 * targets this form specifically.
 *
 * Real protection needs a token the *server* validates. When the form gets a
 * backend, replace this component with Cloudflare Turnstile (or hCaptcha) and
 * verify the token server-side before accepting the submission — the props
 * here (`onVerify`, `error`) are deliberately the same shape those widgets
 * expose, so the swap is local to this file and the form does not change.
 *
 * Nothing in Figma specifies this component; the whole thing is authored, and
 * it is styled to match `Field` so it reads as part of the form.
 *
 * Why arithmetic rather than distorted text: distorted-text captchas are
 * substantially harder for humans than for current machine vision, and they
 * are hostile to screen-reader and low-vision users. A short sum stated as
 * plain text is readable by anyone who can use the rest of the form, and it
 * defeats the naive form-filling bots this is actually aimed at.
 */
export type CaptchaProps = {
  /** Called with true once the challenge is answered correctly. */
  onVerify: (verified: boolean) => void
  /** Message to show; when set, the control renders its error state. */
  error?: string
  className?: string
}

/** Small operands only: this is a speed bump, not a test. */
function makeChallenge() {
  const a = Math.floor(Math.random() * 8) + 2
  const b = Math.floor(Math.random() * 8) + 2
  return { a, b, answer: a + b }
}

export function Captcha({ onVerify, error, className }: CaptchaProps) {
  const id = useId()
  const inputId = `${id}-captcha`
  const errorId = `${inputId}-error`
  const [challenge, setChallenge] = useState(makeChallenge)
  const [entry, setEntry] = useState('')
  const invalid = Boolean(error)

  const regenerate = useCallback(() => {
    setChallenge(makeChallenge())
    setEntry('')
    onVerify(false)
  }, [onVerify])

  useEffect(() => {
    onVerify(entry.trim() !== '' && Number(entry) === challenge.answer)
  }, [entry, challenge, onVerify])

  return (
    <div className={cn('flex w-full flex-col gap-xs', className)}>
      <div
        className={cn(
          'flex w-full items-center justify-between gap-md rounded-sm bg-paper px-md py-sm',
          'border transition-colors duration-fast ease-out',
          invalid ? 'border-danger' : 'border-neutral-200',
        )}
      >
        <label htmlFor={inputId} className="flex items-center gap-sm">
          <Typography variant="copySmall" as="span" muted>
            Quick check: what is
          </Typography>
          {/*
            aria-live so the new sum is announced when it is regenerated —
            otherwise a screen-reader user is answering the previous question.
          */}
          <Typography variant="copySmall" as="span" aria-live="polite">
            <strong className="font-semibold">
              {challenge.a} + {challenge.b}
            </strong>
            ?
          </Typography>
        </label>

        <div className="flex shrink-0 items-center gap-sm">
          <input
            id={inputId}
            name="captcha"
            /*
              `inputMode="numeric"` rather than `type="number"`: number inputs
              add spinners, swallow scroll events over the field, and vary
              between browsers on what counts as a valid intermediate value.
            */
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={entry}
            onChange={(e) => setEntry(e.target.value.replace(/[^\d-]/g, ''))}
            aria-invalid={invalid || undefined}
            aria-describedby={invalid ? errorId : undefined}
            className={cn(
              'h-xl w-[64px] rounded-sm border bg-white px-sm text-center text-copy-small text-on-light',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
              invalid ? 'border-danger focus-visible:ring-danger' : 'border-neutral-200 focus-visible:ring-accent-500',
            )}
          />
          <button
            type="button"
            onClick={regenerate}
            className={cn(
              'rounded-sm px-xs py-xs text-copy-x-small text-on-light opacity-subtle',
              'transition-opacity duration-fast ease-out hover:opacity-100',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-accent-500',
            )}
          >
            New question
          </button>
        </div>
      </div>

      {invalid && (
        <Typography variant="copyXSmall" as="p" id={errorId} className="text-danger">
          {error}
        </Typography>
      )}
    </div>
  )
}

export default Captcha
