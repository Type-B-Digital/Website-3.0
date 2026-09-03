import { useId } from 'react'
import { cn } from '@/lib/cn'
import Typography from './Typography'

/**
 * Field — one text input or textarea in the contact form.
 *
 * Figma: nodes 3617:9159 / 9161 / 9163 / 9165. The artboard puts the field name
 * *inside* the box and shows no label above it, so this renders that text as the
 * `placeholder` — and pairs it with a `sr-only` `<label>`.
 *
 * That pairing is deliberate. A placeholder is not a label: it disappears the
 * moment someone types, it is not reliably announced, and it leaves the input
 * nameless for assistive tech. Rendering a visible label instead would change a
 * design that has been signed off, so the visual stays exactly as drawn and the
 * name is supplied to the accessibility tree separately.
 *
 * ⚠ Figma documents no error state on any page, so everything below the box is
 * authored: see `colors.feedback` for how the colour was chosen.
 *
 * Error wiring, all of which the browser and screen readers rely on:
 *
 * - `aria-invalid` marks the control, not just its border.
 * - `aria-describedby` points at the message, so it is read on focus rather
 *   than only being visible.
 * - the message carries an icon as well as colour, so the state does not
 *   depend on hue.
 * - `noValidate` on the form (see contact.tsx) suppresses the browser's own
 *   bubbles in favour of these, which are styled and announced consistently.
 */
export type FieldProps = {
  /** Accessible name, and the placeholder text drawn in the box. */
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  /** Message to show; when set, the field renders its error state. */
  error?: string
  type?: 'text' | 'email'
  /** Renders a textarea instead of an input. */
  multiline?: boolean
  required?: boolean
  autoComplete?: string
  className?: string
}

export function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  multiline = false,
  required = false,
  autoComplete,
  className,
}: FieldProps) {
  const id = useId()
  const inputId = `${id}-${name}`
  const errorId = `${inputId}-error`
  const invalid = Boolean(error)

  /*
    48px tall with 16px padding and a 4px radius, on `paper` with a
    neutral.200 border (node 3617:9159). The textarea is 128px on the
    artboard and starts its text at the top rather than centred.
  */
  const box = cn(
    'w-full rounded-sm bg-paper px-md text-copy-small text-on-light',
    'border transition-colors duration-fast ease-out',
    'placeholder:text-on-light placeholder:opacity-muted',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    invalid
      ? 'border-danger focus-visible:ring-danger'
      : 'border-neutral-200 focus-visible:ring-accent-500',
    multiline ? 'h-[128px] resize-y py-md' : 'h-3xl',
  )

  const shared = {
    id: inputId,
    name,
    value,
    placeholder: label,
    required,
    autoComplete,
    'aria-invalid': invalid || undefined,
    'aria-describedby': invalid ? errorId : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    onBlur,
    className: box,
  }

  return (
    <div className={cn('flex w-full flex-col gap-xs', className)}>
      {/* Visually absent, as the artboard requires; present for assistive tech. */}
      <label htmlFor={inputId} className="sr-only">
        {label}
        {required ? ' (required)' : ''}
      </label>

      {multiline ? <textarea rows={4} {...shared} /> : <input type={type} {...shared} />}

      {invalid && (
        <Typography
          variant="copyXSmall"
          as="p"
          id={errorId}
          className="flex items-start gap-xs text-danger"
        >
          {/* An icon as well as colour: the state must not rely on hue alone. */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className="mt-[2px] shrink-0"
          >
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 5V8.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="8" cy="11" r="0.85" fill="currentColor" />
          </svg>
          <span>{error}</span>
        </Typography>
      )}
    </div>
  )
}

export default Field
