import { useCallback, useRef, useState } from 'react'
import {
  Button,
  Captcha,
  Eyebrow,
  Field,
  HeroIntro,
  Hiring,
  Reveal,
  Section,
  Testimonial,
  Toast,
  Typography,
  ValuesMarquee,
} from '@/components'
import { PageShell } from '@/components/layout'
import { gradients } from '@/tokens'
import { useBotGuard } from '@/lib/useBotGuard'

/**
 * Contact — Figma node 2894:10698 ("6. Contact")
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2894-10698
 *
 * The nav layer on this artboard is named "navigation-main" but renders the
 * ink-on-light variant — sampled from the artboard, its CTA pill is
 * `#151E28` under the grain, i.e. ink. Same misleading-layer-name trap as the
 * "bg-white" layer that turned out to be brand cream, so the tone comes from
 * the pixels: `onLight`.
 *
 * The form's validation, error states, captcha and toast are all authored —
 * the artboards document a single resting state and no feedback of any kind.
 */

/**
 * The body ground, top to bottom. As on Industries, Figma paints this on the
 * page frame with no node to read, so it was sampled down the left gutter:
 *
 *   0%     neutral.50      #F6F2EC
 *   47%    turquoise.100   #C9D5D3   (artboard y=1080)
 *   100%   amber.100       #F7DDC1   (artboard y=2300)
 *
 * Worst deviation from a three-stop linear fit is 7.7/255, inside the grain's
 * own variance. It is the Industries gradient run in reverse — cool in the
 * middle here, warm in the middle there.
 */
const PAGE_GRADIENT = gradients.page.contact

/* ================================================================== *
 * FORM
 * ================================================================== */

type FormValues = { email: string; company: string; name: string; message: string }
type FormErrors = Partial<Record<keyof FormValues | 'captcha' | 'form', string>>

const EMPTY: FormValues = { email: '', company: '', name: '', message: '' }

/**
 * Field order and required-ness come from the artboard: email, company, name,
 * then message — which is labelled "(Optional)" there (node 3617:9166), so it
 * is the one field that does not block submission.
 */
const REQUIRED: (keyof FormValues)[] = ['email', 'company', 'name']

/**
 * Deliberately permissive: something before an @, something after it, and a
 * dot in the domain. Tighter regexes reject valid addresses (new TLDs,
 * plus-addressing, apostrophes) and the only authority on whether an address
 * works is sending to it.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LABELS: Record<keyof FormValues, string> = {
  email: 'Email Address',
  company: 'Company',
  name: 'Name',
  message: 'Message (Optional)',
}

function validate(values: FormValues, captchaOk: boolean): FormErrors {
  const errors: FormErrors = {}

  for (const key of REQUIRED) {
    if (!values[key].trim()) {
      // Named after what the person sees, not the field key.
      errors[key] = `${LABELS[key]} is required.`
    }
  }
  // A format complaint on an empty field is noise; only check once it has content.
  if (!errors.email && values.email.trim() && !EMAIL.test(values.email.trim())) {
    errors.email = 'Enter an email address in the form name@company.com.'
  }
  if (!captchaOk) {
    errors.captcha = 'Answer the question above so we know you’re human.'
  }
  return errors
}

/** Figma: node 3617:9157. */
function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [captchaOk, setCaptchaOk] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  /*
    Bumped on every successful send and used as the Captcha's `key`, which
    remounts it with a fresh question. Resetting `captchaOk` alone left the
    previous answer sitting in the box looking accepted while the form
    considered it unsolved — so a second message failed validation against a
    field that appeared correctly filled.
  */
  const [sendCount, setSendCount] = useState(0)
  const [honeypot, setHoneypot] = useState('')
  const guard = useBotGuard()
  const formRef = useRef<HTMLFormElement>(null)

  const set = (key: keyof FormValues) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }))
    // Clear as soon as it is fixed — leaving the message up while someone
    // types the correction reads as the form not noticing.
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  // Validate a field when it loses focus, but only if it has been touched, so
  // tabbing through an empty form does not light every field up red at once.
  const blur = (key: keyof FormValues) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }))
    const next = validate(values, captchaOk)
    setErrors((prev) => ({ ...prev, [key]: next[key] }))
  }

  const onVerify = useCallback((ok: boolean) => {
    setCaptchaOk(ok)
    if (ok) setErrors((prev) => ({ ...prev, captcha: undefined }))
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()

    const next = validate(values, captchaOk)
    setErrors(next)
    setTouched({ email: true, company: true, name: true, message: true })

    if (Object.values(next).some(Boolean)) {
      // Move focus to the first field in error so a keyboard or screen-reader
      // user lands on the problem instead of hunting for it.
      const first = (['email', 'company', 'name', 'message'] as const).find((k) => next[k])
      const target = first ?? 'captcha'
      formRef.current?.querySelector<HTMLElement>(`[name="${target}"]`)?.focus()
      return
    }

    if (guard.looksAutomated(honeypot)) {
      /*
        Fails closed and says nothing useful. Telling a bot which check caught
        it is free tuning information; a real person almost never sees this,
        and if they do, retrying works because the timer has moved on.
      */
      setErrors({ form: 'Something went wrong sending that. Please try again.' })
      return
    }

    setSubmitting(true)
    try {
      /*
        ⚠ NO ENDPOINT YET. There is no backend behind this form, so this is a
        simulated round-trip. Replace with the real POST when the endpoint
        exists, and verify the captcha token server-side at the same time —
        see the warning in Captcha.
      */
      await new Promise((r) => setTimeout(r, 900))
      setSent(true)
      setSendCount((n) => n + 1)
      setValues(EMPTY)
      setTouched({})
      setCaptchaOk(false)
      setErrors({})
    } catch {
      setErrors({ form: 'We couldn’t send that just now. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* noValidate: the browser's own bubbles are unstyled, inconsistent
          between engines, and would pre-empt the messages below each field. */}
      <form ref={formRef} onSubmit={submit} noValidate className="relative flex flex-col gap-3xl">
        <div className="flex flex-col gap-md">
          <Field
            label={LABELS.email}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={set('email')}
            onBlur={blur('email')}
            error={touched.email ? errors.email : undefined}
          />
          <Field
            label={LABELS.company}
            name="company"
            autoComplete="organization"
            required
            value={values.company}
            onChange={set('company')}
            onBlur={blur('company')}
            error={touched.company ? errors.company : undefined}
          />
          <Field
            label={LABELS.name}
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={set('name')}
            onBlur={blur('name')}
            error={touched.name ? errors.name : undefined}
          />
          <Field
            label={LABELS.message}
            name="message"
            multiline
            value={values.message}
            onChange={set('message')}
            onBlur={blur('message')}
            error={touched.message ? errors.message : undefined}
          />

          <Captcha key={sendCount} onVerify={onVerify} error={errors.captcha} />

          {/* Invisible to people, attractive to scripts. See useBotGuard. */}
          <input
            {...guard.honeypotProps}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {errors.form && (
          <Typography variant="copySmall" as="p" role="alert" className="text-danger">
            {errors.form}
          </Typography>
        )}

        {/* self-start: a flex column stretches its children, which made this
            span the whole 410px form instead of hugging its label. */}
        <Button
          type="submit"
          variant="primary"
          tone="onLight"
          disabled={submitting}
          className="self-start"
        >
          {submitting ? 'Sending…' : 'Start journey'}
        </Button>
      </form>

      <Toast
        open={sent}
        onDismiss={() => setSent(false)}
        title="Thanks — we’ve got it."
        description="We’ll get back to you shortly, usually within one business day."
      />
    </>
  )
}

/* ================================================================== *
 * SECTIONS
 * ================================================================== */

/** Figma: node 3617:9151 — copy at 520 wide, form at 410, on a 1171 row. */
function HeroAndForm() {
  return (
    <HeroIntro>
      {/* Fades up on load; see HeroIntro. */}
      <Section tone="none" spacing="none" className="pb-5xl pt-[232px] text-on-light">
        {/* gap-lg: the artboard grid is 12 columns on a 24px gutter, which is
            what makes a 4-column block 411px and a 6-column one 628px. */}
        <div className="grid gap-lg lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="flex max-w-[520px] flex-col items-start gap-md">
              <Eyebrow tone="ink">Reach out!</Eyebrow>
              {/*
                ⚠ The artboard sets this at 56px (node 3617:9155), which is off
                the type scale entirely — it runs 48 (h2), 64 (display), 72 (h1).
                Built at h2, which keeps the artboard's two-line wrap at 519px
                wide; display would push it to three. Logged in BUILD_LOG rather
                than adding a one-off size.
              */}
              <Typography variant="h2" className="text-h3 md:text-h2">
                We believe in what you’re building
              </Typography>
              <Typography variant="copyLarge" muted>
                Give us a few details and we’ll get back to you shortly.
              </Typography>
            </div>
          </Reveal>

          {/* Form starts at x=761 of the 1280 content width — column 8 of 12. */}
          <Reveal index={1} className="lg:col-span-4 lg:col-start-8">
            <div className="max-w-[410px]">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </HeroIntro>
  )
}

/** Figma: node 3617:9100 / 3679:10598 — the same quote on both pages. */
const QUOTE =
  '“Type B offers customers a comprehensive team and exceptional value. There’s a ' +
  'significant turnkey capability that Type B brings to engagements.”'

export function ContactPage() {
  return (
    <PageShell headerTone="onLight">
      <div style={{ backgroundImage: PAGE_GRADIENT }}>
        <HeroAndForm />
        <Testimonial quote={QUOTE} name="Fauad Sheriff" role="CEO, Class.fi" glow spacing="loose" />
        {/* Only a top inset here: the marquee below supplies the rest. */}
        <Hiring className="pt-5xl" />
        <ValuesMarquee />
      </div>
    </PageShell>
  )
}

export default ContactPage
