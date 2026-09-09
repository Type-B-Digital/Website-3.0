import { useState } from 'react'
import {
  Accordion,
  Button,
  Card,
  Eyebrow,
  Field,
  HeroIntro,
  Reveal,
  Section,
  Tabs,
  Tag,
  Typography,
} from '@/components'
import type { EyebrowTone, TypographyVariant } from '@/components'
import { PageShell } from '@/components/layout'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'
import {
  breakpoints,
  colors,
  fontFamily,
  gradients,
  layout,
  motion as motionTokens,
  opacity,
  palette,
  radius,
  spacing,
  typography,
  unmapped,
} from '@/tokens'

/**
 * Brand Guidelines — the living version of BRAND-GUIDELINES.md.
 *
 * ⚠ NOT IN FIGMA. There is no artboard for this page; it is an internal
 * reference built from the system it documents.
 *
 * **Everything on this page is derived from `@/tokens` at runtime.** The
 * swatches map over `palette`, the type specimens map over `typography`, the
 * spacing bars map over `spacing`. Nothing is transcribed, so the page cannot
 * drift from the code the way `docs/DESIGN_TOKENS.md` did — if a token
 * changes, this page changes with it. Any value that IS written out here is a
 * value the tokens do not hold.
 *
 * It is deliberately unlinked from the nav and the footer: it is a working
 * reference for the team, not a page in the site's information architecture.
 * The repository and the deployed site are both public, so treat the URL as
 * shareable-but-unlisted rather than private.
 */

/* ================================================================== *
 * SHELL
 * ================================================================== */

function Band({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <Section tone="none" spacing="none" id={id} className="scroll-mt-4xl py-5xl text-on-light">
      <div className="flex flex-col gap-4xl">
        <Reveal>
          <div className="flex max-w-[720px] flex-col items-start gap-md">
            <Eyebrow tone="ink">{eyebrow}</Eyebrow>
            <Typography variant="h2" className="text-h3 md:text-h2">
              {title}
            </Typography>
            {intro && (
              <Typography variant="copyMedium" muted>
                {intro}
              </Typography>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </Section>
  )
}

/** A labelled specimen box. The label is always the token name, never a description. */
function Spec({
  name,
  meta,
  children,
  className,
}: {
  name: string
  meta?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-sm', className)}>
      <div className="flex flex-wrap items-baseline gap-sm">
        <Typography variant="copySmall" as="code" className="font-semibold">
          {name}
        </Typography>
        {meta && (
          <Typography variant="copyXSmall" as="span" muted>
            {meta}
          </Typography>
        )}
      </div>
      {children}
    </div>
  )
}

/** Do / Don't pair. The rule is the heading; the reason is the body. */
function Rules({ rules }: { rules: readonly { do: string; dont: string; why?: string }[] }) {
  return (
    <ul className="flex flex-col gap-lg">
      {rules.map((rule) => (
        <li key={rule.do} className="grid gap-lg border-t border-divider pt-lg md:grid-cols-2">
          <div className="flex flex-col gap-sm">
            <Typography variant="copyXSmall" as="span" className="font-semibold uppercase">
              Do
            </Typography>
            <Typography variant="copyMedium" as="p">
              {rule.do}
            </Typography>
          </div>
          <div className="flex flex-col gap-sm">
            <Typography variant="copyXSmall" as="span" className="font-semibold uppercase">
              Don't
            </Typography>
            <Typography variant="copyMedium" as="p" muted>
              {rule.dont}
            </Typography>
            {rule.why && (
              <Typography variant="copySmall" as="p" muted className="italic">
                {rule.why}
              </Typography>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ================================================================== *
 * COLOUR
 * ================================================================== */

/** Relative luminance, so each swatch picks a label colour that reads on it. */
function readableOn(hex: string): string {
  const v = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(v.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return l > 0.45 ? colors.text.onLight : unmapped.paper
}

function Ramp({ name, ramp, note }: { name: string; ramp: Record<string, string>; note?: string }) {
  return (
    <Spec name={`palette.${name}`} meta={note}>
      <div className="flex flex-wrap gap-xs">
        {Object.entries(ramp).map(([step, hex]) => (
          <div
            key={step}
            /* A border, because several ramp values are within a few points of
               the page ground and would otherwise have no visible edge. */
            className="flex h-[88px] w-[104px] flex-col justify-between rounded-md border border-divider p-sm"
            style={{ backgroundColor: hex, color: readableOn(hex) }}
          >
            <Typography variant="copyXSmall" as="span" className="font-semibold">
              {step}
            </Typography>
            <Typography variant="copyXSmall" as="span" className="uppercase">
              {hex}
            </Typography>
          </div>
        ))}
      </div>
    </Spec>
  )
}

/* ================================================================== *
 * THE PAGE
 * ================================================================== */

const CONTENTS = [
  { id: 'foundations', label: 'Foundations' },
  { id: 'colour', label: 'Colour' },
  { id: 'typography', label: 'Typography' },
  { id: 'space', label: 'Space & shape' },
  { id: 'motion', label: 'Motion' },
  { id: 'components', label: 'Components' },
  { id: 'layout', label: 'Layout' },
  { id: 'atomic', label: 'Atomic map' },
]

const EYEBROW_TONES: readonly EyebrowTone[] = [
  'onLight',
  'onAccent',
  'ink',
  'slate',
  'white',
  'solar',
  'ember',
]

/** Rendered at their real size; `numeral` is a graphic and is scaled to fit. */
const TYPE_ORDER: readonly TypographyVariant[] = [
  'h1',
  'display',
  'h2',
  'h3',
  'subHeaderLarge',
  'navPanelLink',
  'subHeaderSmall',
  'copyLarge',
  'copyMedium',
  'button',
  'navLink',
  'copySmall',
  'eyebrow',
  'copyXSmall',
  'tag',
]

export function BrandGuidelinesPage() {
  const [tab, setTab] = useState('primary')
  const [demoValue, setDemoValue] = useState('')

  return (
    <PageShell headerTone="onLight" closing={false}>
      <div className="bg-surface">
        {/* ---------------------------------------------------------- HERO */}
        <Section tone="none" spacing="none" className="pb-5xl pt-[232px] text-on-light">
          <HeroIntro>
            <div className="flex max-w-[800px] flex-col items-start gap-md">
              <Eyebrow tone="ink">Internal reference</Eyebrow>
              <Typography variant="h1" className="text-h2 md:text-h1">
                Brand Guidelines
              </Typography>
              <Typography variant="copyLarge" muted>
                The Type B Digital design system, rendered from the system itself. Every swatch,
                specimen and component on this page reads its values from{' '}
                <code>src/tokens/index.ts</code> at runtime — so this page cannot drift from the
                code. The written companion is <code>BRAND-GUIDELINES.md</code>.
              </Typography>
            </div>
          </HeroIntro>

          <nav aria-label="On this page" className="mt-4xl flex flex-wrap gap-sm">
            {CONTENTS.map((c) => (
              <a key={c.id} href={`#${c.id}`}>
                <Tag>{c.label}</Tag>
              </a>
            ))}
          </nav>
        </Section>

        {/* -------------------------------------------------- FOUNDATIONS */}
        <Band
          id="foundations"
          eyebrow="01"
          title="Foundations"
          intro="Type B sells to people who have been disappointed by a vendor before. The copy leads with the constraint rather than the promise, and the design stays quiet enough to let it."
        >
          <Rules
            rules={[
              {
                do: 'Name the client and the number.',
                dont: 'Write unbacked superlatives.',
                why: '“43% cost reduction, Ferry Pay” beats “world-class delivery”.',
              },
              {
                do: 'Leave a slot visibly empty when the copy is not written.',
                dont: 'Fill a gap with something that reads as real.',
                why: 'Five publication cards ship with a visible placeholder headline for exactly this reason.',
              },
              {
                do: 'Use cream as the light ground and ink as the dark one.',
                dont: 'Use #FFFFFF as a page ground.',
                why: 'White appears in this system only as a chip fill.',
              },
              {
                do: 'Keep every surface flat.',
                dont: 'Add a shadow to lift a card.',
                why: 'elevation is declared as `none`; depth comes from scrims and gradient grounds.',
              },
            ]}
          />
        </Band>

        {/* ------------------------------------------------------- COLOUR */}
        <Band
          id="colour"
          eyebrow="02"
          title="Colour"
          intro="Four ramps. The three chromatic ramps ARE the three mood directions — swapping data-mood on the root re-themes the site with no component edits. The neutral ramp is mood-independent."
        >
          <div className="flex flex-col gap-3xl">
            <Ramp name="turquoise" ramp={palette.turquoise} note="mood: deep — the default" />
            <Ramp name="orange" ramp={palette.orange} note="mood: ember" />
            <Ramp name="amber" ramp={palette.amber} note="mood: solar" />
            <Ramp
              name="neutral"
              ramp={palette.neutral}
              note="six steps only — 100/300/500/700 are absent by design"
            />

            <Spec name="unmapped" meta="off-board values still in use — tracked as debt">
              <div className="flex flex-wrap gap-xs">
                {Object.entries(unmapped).map(([k, hex]) => (
                  <div
                    key={k}
                    className="flex h-[88px] w-[136px] flex-col justify-between rounded-md border border-divider p-sm"
                    style={{ backgroundColor: hex, color: readableOn(hex) }}
                  >
                    <Typography variant="copyXSmall" as="span" className="font-semibold">
                      {k}
                    </Typography>
                    <Typography variant="copyXSmall" as="span" className="uppercase">
                      {hex}
                    </Typography>
                  </div>
                ))}
              </div>
            </Spec>

            <Spec
              name="gradients"
              meta="every stop is a ramp value; stops past 100% are intentional"
            >
              <div className="grid gap-lg sm:grid-cols-2 lg:grid-cols-4">
                {(['b1', 'b3', 'b5', 'b8'] as const).map((k) => (
                  <div key={k} className="flex flex-col gap-sm">
                    <div
                      className="h-[128px] w-full rounded-md"
                      style={{ backgroundImage: gradients[k] }}
                    />
                    <Typography variant="copyXSmall" as="code" muted>
                      gradients.{k}
                    </Typography>
                  </div>
                ))}
                {Object.entries(gradients.service).map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-sm">
                    <div className="h-[128px] w-full rounded-md" style={{ backgroundImage: v }} />
                    <Typography variant="copyXSmall" as="code" muted>
                      service.{k}
                    </Typography>
                  </div>
                ))}
              </div>
            </Spec>

            <Rules
              rules={[
                {
                  do: 'Reach for accent-* so a component follows the active mood.',
                  dont: 'Hardcode turquoise-500 where the accent is meant.',
                },
                {
                  do: 'Name a fixed ramp value when a page keeps one element off-mood.',
                  dont: 'Swap data-mood to recolour a single element.',
                  why: 'A mood carries the whole accent ramp — it would take the FAQ rules and chips with it.',
                },
                {
                  do: 'Verify a new semantic colour against its real ground.',
                  dont: 'Pick an error red by eye.',
                  why: 'orange.500 — the obvious error red — measures 2.98:1 on the field fill and would ship unreadable.',
                },
              ]}
            />
          </div>
        </Band>

        {/* --------------------------------------------------- TYPOGRAPHY */}
        <Band
          id="typography"
          eyebrow="03"
          title="Typography"
          intro={`One family: ${fontFamily.sans.split(',')[0].replace(/'/g, '')}. Sixteen steps, each a token that maps 1:1 to a Tailwind class. There are no size, weight or line-height literals in any component.`}
        >
          <div className="flex flex-col gap-2xl">
            {TYPE_ORDER.map((variant) => {
              const t = typography[variant] as {
                fontSize: string
                lineHeight: number
                fontWeight: number
                letterSpacing?: string
              }
              return (
                <div
                  key={variant}
                  className="grid gap-md border-t border-divider pt-lg lg:grid-cols-[200px_1fr]"
                >
                  <div className="flex flex-col gap-xs">
                    <Typography variant="copySmall" as="code" className="font-semibold">
                      {variant}
                    </Typography>
                    <Typography variant="copyXSmall" as="span" muted>
                      {t.fontSize} / {t.lineHeight} / {t.fontWeight}
                      {t.letterSpacing ? ` / ${t.letterSpacing}` : ''}
                    </Typography>
                  </div>
                  <div className="min-w-0 overflow-hidden">
                    <Typography variant={variant} as="p">
                      Most partners do one slice.
                    </Typography>
                  </div>
                </div>
              )
            })}

            <div className="grid gap-md border-t border-divider pt-lg lg:grid-cols-[200px_1fr]">
              <div className="flex flex-col gap-xs">
                <Typography variant="copySmall" as="code" className="font-semibold">
                  numeral
                </Typography>
                <Typography variant="copyXSmall" as="span" muted>
                  {typography.numeral.fontSize} — a graphic, not reading text
                </Typography>
              </div>
              <Typography variant="copyMedium" muted>
                The Careers carousel index. Drawn as an outline the slide's subheader deliberately
                overlaps; the tight line height is what makes that overlap land. Not shown at size.
              </Typography>
            </div>

            <Rules
              rules={[
                {
                  do: 'Render every piece of text through <Typography variant="…">.',
                  dont: 'Write text-[32px] or a raw font-semibold on prose.',
                },
                {
                  do: 'Set an off-scale size inline with a comment naming the Figma node.',
                  dont: 'Bend an existing token to a near-miss size.',
                  why: 'tag is 1.333 line height, not 1.5 — at 1.5 every tag row gains 2px.',
                },
              ]}
            />
          </div>
        </Band>

        {/* ------------------------------------------------ SPACE & SHAPE */}
        <Band
          id="space"
          eyebrow="04"
          title="Space & shape"
          intro="The spacing scale comes off the Figma spacing bars; tag, logoGap and 5xl are off-board and marked as such in the tokens. Radius documents 4 and 8 only — tag and pill are in use but absent from the board."
        >
          <div className="grid gap-3xl lg:grid-cols-2">
            <Spec name="spacing">
              <div className="flex flex-col gap-sm">
                {Object.entries(spacing).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-md">
                    <Typography variant="copyXSmall" as="code" className="w-[72px] shrink-0">
                      {k}
                    </Typography>
                    <div className="h-md rounded-sm bg-canvas" style={{ width: v }} />
                    <Typography variant="copyXSmall" as="span" muted>
                      {v}
                    </Typography>
                  </div>
                ))}
              </div>
            </Spec>

            <Spec name="radius">
              <div className="flex flex-wrap gap-md">
                {Object.entries(radius).map(([k, v]) => (
                  <div key={k} className="flex flex-col items-center gap-xs">
                    <div
                      className="size-[88px] border border-divider bg-canvas"
                      style={{ borderRadius: v }}
                    />
                    <Typography variant="copyXSmall" as="code">
                      {k}
                    </Typography>
                    <Typography variant="copyXSmall" as="span" muted>
                      {v}
                    </Typography>
                  </div>
                ))}
              </div>
            </Spec>
          </div>

          <Spec name="opacity" meta="the design leans on a small set of repeated alphas">
            <div className="flex flex-wrap gap-md">
              {Object.entries(opacity).map(([k, v]) => (
                <div key={k} className="flex flex-col gap-xs">
                  <div className="size-[64px] rounded-md bg-canvas" style={{ opacity: v }} />
                  <Typography variant="copyXSmall" as="code">
                    {k} · {v}
                  </Typography>
                </div>
              ))}
            </div>
          </Spec>
        </Band>

        {/* ------------------------------------------------------- MOTION */}
        <Band
          id="motion"
          eyebrow="05"
          title="Motion"
          intro="⚠ Not in Figma. The design file documents no duration, easing or parallax value anywhere, so the whole scale is authored and awaiting sign-off. Motion here is slow and settles — nothing pops."
        >
          <div className="grid gap-3xl lg:grid-cols-2">
            <Spec name="motion.duration" meta="seconds">
              <div className="flex flex-col gap-xs">
                {Object.entries(motionTokens.duration).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between border-t border-divider pt-xs"
                  >
                    <Typography variant="copySmall" as="code">
                      {k}
                    </Typography>
                    <Typography variant="copySmall" as="span" muted>
                      {v}s
                    </Typography>
                  </div>
                ))}
              </div>
            </Spec>
            <Spec name="motion.easing" meta="cubic-bezier control points">
              <div className="flex flex-col gap-xs">
                {Object.entries(motionTokens.easing).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-md border-t border-divider pt-xs"
                  >
                    <Typography variant="copySmall" as="code">
                      {k}
                    </Typography>
                    <Typography variant="copyXSmall" as="span" muted>
                      [{(v as readonly number[]).join(', ')}]
                    </Typography>
                  </div>
                ))}
              </div>
            </Spec>
          </div>
          <Rules
            rules={[
              {
                do: 'Honour useReducedMotion() in every animated component.',
                dont: 'Ship a pinned scene with no reduced-motion path.',
              },
              {
                do: 'Verify scroll-linked motion with real scroll gestures.',
                dont: 'Conclude from a headless screenshot that a scene is broken.',
                why: 'useScroll never fires under virtual time — the scene is fine, the test is not.',
              },
            ]}
          />
        </Band>

        {/* --------------------------------------------------- COMPONENTS */}
        <Band
          id="components"
          eyebrow="06"
          title="Components"
          intro="Live instances, not screenshots. Each renders from the same component the site uses, so a change to the component changes this gallery."
        >
          <div className="flex flex-col gap-3xl">
            <Spec name="Button" meta="variant × tone. `tone` names the GROUND, not the colour.">
              <div className="grid gap-lg md:grid-cols-2">
                <div className="flex flex-col items-start gap-md rounded-md border border-divider bg-surface p-lg">
                  <Typography variant="copyXSmall" as="span" muted>
                    tone="onLight"
                  </Typography>
                  <div className="flex flex-wrap items-center gap-md">
                    <Button variant="primary" tone="onLight">
                      Primary
                    </Button>
                    <Button variant="secondary" tone="onLight">
                      Secondary
                    </Button>
                    <Button variant="tertiary" tone="onLight">
                      Tertiary
                    </Button>
                    <Button variant="primary" tone="onLight" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-md rounded-md bg-canvas p-lg">
                  <Typography variant="copyXSmall" as="span" className="text-on-dark opacity-muted">
                    tone="onDark"
                  </Typography>
                  <div className="flex flex-wrap items-center gap-md">
                    <Button variant="primary" tone="onDark">
                      Primary
                    </Button>
                    <Button variant="secondary" tone="onDark">
                      Secondary
                    </Button>
                    <Button variant="tertiary" tone="onDark">
                      Tertiary
                    </Button>
                    <Button variant="primary" tone="onDark" disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
              </div>
            </Spec>

            <Spec name="Eyebrow" meta="seven tones — solar and ember are the warm page chips">
              <div className="flex flex-wrap items-center gap-md rounded-md border border-divider bg-surface p-lg">
                {EYEBROW_TONES.map((tone) => (
                  <Eyebrow key={tone} tone={tone}>
                    {tone}
                  </Eyebrow>
                ))}
              </div>
            </Spec>

            <Spec name="Tag">
              <div className="flex flex-wrap gap-md">
                <div className="rounded-md border border-divider bg-surface p-lg">
                  <Tag>onLight</Tag>
                </div>
                <div className="rounded-md bg-canvas p-lg">
                  <Tag tone="onDark">onDark</Tag>
                </div>
              </div>
            </Spec>

            <Spec
              name="Card"
              meta="three aspect ratios; radius md; depth from the scrim, never a shadow"
            >
              <div className="grid gap-lg sm:grid-cols-3">
                <Card
                  src={asset('/images/publications/card-teams.png')}
                  alt=""
                  aspect="verticalMedium"
                  scrim
                >
                  <Typography variant="copyLarge" as="p" className="text-paper">
                    verticalMedium
                  </Typography>
                </Card>
                <Card
                  src={asset('/images/publications/card-mena.png')}
                  alt=""
                  aspect="horizontalMedium"
                  scrim
                >
                  <Typography variant="copyLarge" as="p" className="text-paper">
                    horizontalMedium
                  </Typography>
                </Card>
                <Card
                  src={asset('/images/publications/card-ai-enablement.png')}
                  alt=""
                  aspect="horizontalSmall"
                  scrim
                >
                  <Typography variant="copyLarge" as="p" className="text-paper">
                    horizontalSmall
                  </Typography>
                </Card>
              </div>
            </Spec>

            <div className="grid gap-3xl lg:grid-cols-2">
              <Spec
                name="Field"
                meta="the label doubles as the placeholder; errors carry an icon and text"
              >
                <div className="flex flex-col gap-lg rounded-md border border-divider bg-surface p-lg">
                  <Field
                    label="Work email"
                    name="demo-ok"
                    value={demoValue}
                    onChange={setDemoValue}
                    type="email"
                  />
                  <Field
                    label="Work email"
                    name="demo-error"
                    value=""
                    onChange={() => {}}
                    error="Enter a valid email address."
                  />
                </div>
              </Spec>

              <Spec name="Tabs" meta="pill and plain variants">
                <div className="rounded-md bg-canvas p-lg">
                  <Tabs
                    items={[
                      { id: 'primary', label: 'Primary' },
                      { id: 'secondary', label: 'Secondary' },
                      { id: 'all', label: 'View All', variant: 'plain' },
                    ]}
                    active={tab}
                    onChange={setTab}
                    panelId="brand-tabs-panel"
                    tone="onDark"
                  />
                  <div id="brand-tabs-panel" className="pt-lg">
                    <Typography variant="copySmall" as="p" className="text-on-dark opacity-muted">
                      Active: {tab}
                    </Typography>
                  </div>
                </div>
              </Spec>
            </div>

            <Spec
              name="Accordion"
              meta="one row open at a time; every row collapsed on mount, as drawn"
            >
              <Accordion
                items={[
                  {
                    question: 'Where does a component get its ground?',
                    answer:
                      'From the page. A block used on more than one page must not paint a background — a flat fill becomes a white band on every page whose body is a gradient.',
                  },
                  {
                    question: 'How do I add a variation?',
                    answer:
                      'By prop, never by fork, and defaulting to the existing behaviour so nothing else moves. headerTone, eyebrowTone, marqueeTone and hubFromBar were all added this way.',
                  },
                ]}
              />
            </Spec>

            <Rules
              rules={[
                {
                  do: 'Let the page paint the ground and the block inherit it.',
                  dont: 'Give a shared block its own flat fill.',
                  why: 'This defect has shipped twice — once as ink on ink, once as a white band.',
                },
                {
                  do: 'Extend a component with an optional prop defaulting to current behaviour.',
                  dont: 'Fork a component to recolour it on one page.',
                },
                {
                  do: 'Render an inert label where a page does not exist yet.',
                  dont: 'Ship a link that 404s.',
                },
              ]}
            />
          </div>
        </Band>

        {/* ------------------------------------------------------- LAYOUT */}
        <Band
          id="layout"
          eyebrow="07"
          title="Layout"
          intro={`A ${layout.columns}-column grid on a ${layout.frameWidth} frame: ${layout.margin} margins inside it give the ${layout.maxWidth} content width, on a ${layout.gutter} gutter.`}
        >
          <Spec name="layout" meta="Container caps at the FRAME, not the content width">
            <div className="w-full overflow-hidden rounded-md border border-divider">
              <div className="grid grid-cols-12 gap-lg p-md">
                {Array.from({ length: layout.columns }).map((_, i) => (
                  <div key={i} className="h-[96px] rounded-sm bg-canvas/10" />
                ))}
              </div>
            </div>
          </Spec>

          <Spec name="breakpoints" meta="⚠ not in Figma — the file is desktop-only at 1440">
            <div className="flex flex-col gap-xs">
              {Object.entries(breakpoints).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between border-t border-divider pt-xs"
                >
                  <Typography variant="copySmall" as="code">
                    {k}
                  </Typography>
                  <Typography variant="copySmall" as="span" muted>
                    {v}
                  </Typography>
                </div>
              ))}
            </div>
          </Spec>

          <Rules
            rules={[
              {
                do: 'Cap Container at the 1440 frame and treat the 80 margin as padding inside it.',
                dont: 'Cap at 1280 and then add padding.',
                why: 'That yields a 1120 content width and silently narrows every section by 160px.',
              },
              {
                do: 'Keep an exact non-columnar split as a literal, with the sum in a comment.',
                dont: 'Round it onto the 12-column grid.',
                why: '323 + 99 + 858 = 1280 lands; the nearest column split does not.',
              },
              {
                do: 'Contain decorative bleed with overflow-x: clip on html AND body.',
                dont: 'Use overflow: hidden.',
                why: 'hidden makes a scroll container and position: sticky stops working, breaking every pinned scene.',
              },
            ]}
          />
        </Band>

        {/* ------------------------------------------------------- ATOMIC */}
        <Band
          id="atomic"
          eyebrow="08"
          title="Atomic map"
          intro="Where each level lives, so a generated design system lands in the right place."
        >
          <div className="flex flex-col gap-lg">
            {[
              {
                level: 'Design tokens',
                path: 'src/tokens/index.ts · src/styles/globals.css',
                items:
                  'colour, moods, typography, spacing, radius, elevation, opacity, motion, breakpoints, gradients, grain',
              },
              {
                level: 'Atoms',
                path: 'src/components/',
                items: 'Typography, Button, Eyebrow, Tag, Card, Container, Section, icons/*',
              },
              {
                level: 'Molecules',
                path: 'src/components/',
                items:
                  'Field, Captcha, Toast, Tabs, Accordion, CountUp, HeroStats, Marquee, Reveal, ParallaxSection, ScrollTrack, GroundCrossfade, ScrollFillText, GlowText, Intro',
              },
              {
                level: 'Organisms',
                path: 'src/components/layout/ · sections/',
                items:
                  'SiteHeader, SiteFooter, ClosingCta, Testimonial, Hiring, ValuesMarquee, FaqSection, Globe, DivergeConverge, and the section library',
              },
              {
                level: 'Templates',
                path: 'layout/PageShell · sections/ContentPage · case-study',
                items: 'PageShell, ContentPage, CaseStudyPage',
              },
              {
                level: 'Pages',
                path: 'src/pages/',
                items: 'one file per route; content data beside it in *-content.ts',
              },
            ].map((row) => (
              <div
                key={row.level}
                className="grid gap-sm border-t border-divider pt-lg lg:grid-cols-[180px_1fr]"
              >
                <Typography variant="copyMedium" as="h3" className="font-semibold">
                  {row.level}
                </Typography>
                <div className="flex flex-col gap-xs">
                  <Typography variant="copySmall" as="code" muted>
                    {row.path}
                  </Typography>
                  <Typography variant="copySmall" as="p" muted>
                    {row.items}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </Band>
      </div>
    </PageShell>
  )
}

export default BrandGuidelinesPage
