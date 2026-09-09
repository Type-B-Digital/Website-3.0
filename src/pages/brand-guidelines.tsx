import { useState } from 'react'
import {
  Accordion,
  Button,
  Card,
  Eyebrow,
  Field,
  HeroIntro,
  HIRING_TRAITS,
  Reveal,
  Section,
  Tabs,
  Tag,
  Typography,
  VALUES,
} from '@/components'
import { CaretDown } from '@/components'
import type { EyebrowTone, TypographyVariant } from '@/components'
import { PageShell } from '@/components/layout'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'
import {
  breakpoints,
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
  colors,
} from '@/tokens'

/**
 * Brand Guidelines — the living companion to BRAND-GUIDELINES.md.
 *
 * ⚠ NOT IN FIGMA. There is no artboard for this page; it is an internal
 * reference built from the system it documents.
 *
 * **Organised as a waterfall, not a flat list.** The first build put brand
 * voice, raw tokens, component demos and the atomic map in sibling bands, which
 * made a strategy statement and a hex value look like peers. They are not: each
 * tier is derived from the one above it, and the page now descends through
 * five of them, from identity down to the shipped code library. The diagram at
 * the top is the spine — every tier links to its own section.
 *
 * **Everything below Tier 1 is derived from `@/tokens` and the real components
 * at runtime.** Swatches map over `palette`, specimens over `typography`, bars
 * over `spacing`, and the gallery renders the same components the site uses.
 * Tier 1 is not invented either: the pillars are `VALUES`, the personality is
 * `HIRING_TRAITS`, and the positioning line is the footer's. Nothing here is
 * transcribed, so the page cannot drift the way `docs/DESIGN_TOKENS.md` did.
 *
 * Deliberately unlinked from the nav and the footer — a working reference, not
 * part of the site's information architecture. The repository and the deployed
 * site are both public, so the URL is unlisted rather than private.
 */

/* ================================================================== *
 * THE WATERFALL
 * ================================================================== */

type Band = 'Foundation' | 'Building Blocks' | 'Unified System'

type Tier = {
  n: number
  id: string
  name: string
  sub: string
  band: Band
  label: string
  blurb: string
}

const TIERS: readonly Tier[] = [
  {
    n: 1,
    id: 'foundations',
    name: 'Brand Foundations',
    sub: 'Strategy, Voice & Vision',
    band: 'Foundation',
    label: 'Tier 1 · Identity Root',
    blurb:
      'Core strategy, positioning, verbal tone, colour philosophy and the pillars that define the personality everything below inherits. Nothing in the tiers beneath is allowed to contradict this one.',
  },
  {
    n: 2,
    id: 'tokens',
    name: 'Design Tokens',
    sub: 'Typography, Color, Spacing',
    band: 'Building Blocks',
    label: 'Tier 2 · Decisions',
    blurb:
      'The identity resolved into named, typed values — the smallest unit a component is allowed to reference. One source of truth in `src/tokens/index.ts`, mirrored to CSS custom properties and the Tailwind theme.',
  },
  {
    n: 3,
    id: 'components',
    name: 'Core UI Components',
    sub: 'Buttons, Inputs, Badges',
    band: 'Building Blocks',
    label: 'Tier 3 · Atoms',
    blurb:
      'The smallest things a page composes. Each owns its shape and its states and holds no colour, size or duration literal — every value routes through Tier 2.',
  },
  {
    n: 4,
    id: 'patterns',
    name: 'Pattern Library',
    sub: 'Navbars, Heroes, Modals',
    band: 'Building Blocks',
    label: 'Tier 4 · Compositions',
    blurb:
      'Recurring arrangements of atoms that carry meaning of their own — the navigation, the hero families, the closing band. A pattern owns its composition; the page still owns its ground.',
  },
  {
    n: 5,
    id: 'system',
    name: 'Design System',
    sub: 'Documentation & Code Library',
    band: 'Unified System',
    label: 'Tier 5 · Delivery & Governance',
    blurb:
      'The four tiers above, shipped: where each level lives, how it is exported, how a change is made, and what is still undesigned. Governance runs back up the chain — a decision here can amend any tier above it.',
  },
]

const BAND_STYLES: Record<Band, { pill: string; dot: string }> = {
  Foundation: { pill: 'border-on-dark bg-paper/[0.06]', dot: 'border-on-dark' },
  'Building Blocks': { pill: 'border-on-dark-subtle', dot: 'border-on-dark-subtle' },
  'Unified System': {
    pill: 'border-accent-400 bg-accent-600',
    dot: 'border-accent-400 bg-accent-600',
  },
}

/**
 * The hierarchy diagram, and the page's table of contents.
 *
 * Drawn on the ink ground rather than the page's cream: it is a diagram of the
 * system rather than a piece of it, and the separation is the point of the
 * rebuild. Each row is a link to its tier.
 */
function Waterfall({ active }: { active: string | null }) {
  return (
    <div className="rounded-md bg-canvas p-lg text-on-dark md:p-4xl">
      <div className="relative mx-auto max-w-[560px]">
        <ol className="flex flex-col items-stretch">
          {TIERS.map((tier, i) => (
            <li key={tier.id} className="flex flex-col items-center">
              <a
                href={`#${tier.id}`}
                className={cn(
                  'group w-full rounded-pill border px-lg py-md text-center transition-colors duration-fast ease-out',
                  BAND_STYLES[tier.band].pill,
                  active === tier.id && 'border-accent-300 bg-paper/10',
                  'hover:border-accent-300',
                )}
              >
                <Typography variant="copyMedium" as="span" className="block font-semibold">
                  {tier.name}
                </Typography>
                <Typography variant="copySmall" as="span" className="block font-mono opacity-muted">
                  {tier.sub}
                </Typography>
              </a>
              {i < TIERS.length - 1 && (
                /* Dotted connector. Decorative — the links above carry the
                   structure for anyone not looking at it. */
                <span aria-hidden className="flex h-2xl flex-col items-center">
                  <span className="w-px flex-1 border-l border-dashed border-on-dark-subtle" />
                  <CaretDown className="-mt-[10px] size-lg shrink-0 text-on-dark-subtle" />
                </span>
              )}
            </li>
          ))}
        </ol>

        {/*
          The governance return path: Tier 5 amends every tier above it. Drawn
          as a bracket down the right, and hidden below `lg` where there is no
          room for it beside the pills — the rule it illustrates is written out
          in Tier 5 either way.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-4xl bottom-[6%] top-[6%] hidden w-4xl rounded-r-md border-y border-r border-dashed border-on-dark-subtle lg:block"
        >
          {/* Centred on the line so it reads as a label ON the path, and
              painted with the panel's own ground so it knocks the dashes out. */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-sm bg-canvas px-sm py-xs">
            <Typography variant="copyXSmall" as="span" className="whitespace-nowrap font-mono">
              Governance
            </Typography>
          </span>
          {/* Points back into Design System: the return path has a direction. */}
          <CaretDown className="absolute -left-[11px] bottom-0 size-lg translate-y-1/2 rotate-90 text-on-dark-subtle" />
        </div>
      </div>

      <ul className="mt-4xl flex flex-wrap items-center justify-center gap-x-2xl gap-y-md border-t border-on-dark-subtle pt-lg">
        {(Object.keys(BAND_STYLES) as Band[]).map((band) => (
          <li key={band} className="flex items-center gap-sm">
            <span className={cn('size-md shrink-0 rounded-sm border', BAND_STYLES[band].dot)} />
            <Typography variant="copyXSmall" as="span" className="font-mono opacity-muted">
              {band}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ================================================================== *
 * TIER CHROME
 * ================================================================== */

function TierBand({ tier, children }: { tier: Tier; children: React.ReactNode }) {
  return (
    <Section
      tone="none"
      spacing="none"
      id={tier.id}
      className="scroll-mt-4xl border-t border-divider py-5xl text-on-light"
    >
      <div className="flex flex-col gap-4xl">
        <Reveal>
          <div className="grid gap-lg lg:grid-cols-[120px_1fr]">
            <Typography variant="h2" as="span" className="text-h3 opacity-subtle md:text-h2">
              0{tier.n}
            </Typography>
            <div className="flex max-w-[720px] flex-col items-start gap-md">
              <div className="flex flex-wrap items-center gap-sm">
                <Eyebrow tone="ink">{tier.label}</Eyebrow>
                <Tag>{tier.band}</Tag>
              </div>
              <Typography variant="h2" className="text-h3 md:text-h2">
                {tier.name}
              </Typography>
              <Typography variant="copyMedium" muted>
                {tier.blurb}
              </Typography>
            </div>
          </div>
        </Reveal>
        {children}
      </div>
    </Section>
  )
}

/** A block inside a tier. Tiers are the spine; these are the vertebrae. */
function Sub({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-lg lg:grid lg:grid-cols-[120px_1fr] lg:gap-lg">
      <div className="lg:pt-xs">
        <Typography variant="copySmall" as="h3" className="font-semibold">
          {title}
        </Typography>
        {note && (
          <Typography variant="copyXSmall" as="p" muted className="pt-xs">
            {note}
          </Typography>
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-lg">{children}</div>
    </div>
  )
}

function Spec({
  name,
  meta,
  children,
}: {
  name: string
  meta?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-sm">
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
            <Typography
              variant="copyXSmall"
              as="span"
              className="font-semibold uppercase opacity-subtle"
            >
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
 * TIER 2 HELPERS
 * ================================================================== */

function readableOn(hex: string): string {
  const v = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(v.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45 ? colors.text.onLight : unmapped.paper
}

function Ramp({ name, ramp, note }: { name: string; ramp: Record<string, string>; note?: string }) {
  return (
    <Spec name={`palette.${name}`} meta={note}>
      <div className="flex flex-wrap gap-xs">
        {Object.entries(ramp).map(([step, hex]) => (
          <div
            key={step}
            /* Bordered: several ramp values sit within a few points of the page
               ground and would have no visible edge on it. */
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
 * TIER 4 HELPERS
 * ================================================================== */

type Pattern = {
  name: string
  composes: string
  where: string
  status: 'Built' | 'Not designed'
}

const PATTERNS: readonly Pattern[] = [
  {
    name: 'Site navigation',
    composes: 'TypeBLogo · Button · CaretDown · nav panel curtain',
    where: 'Every page, via PageShell',
    status: 'Built',
  },
  {
    name: 'Mobile drawer',
    composes: 'MenuIcon · CloseIcon · NavPanelContent',
    where: 'Below lg, replacing the five dropdowns',
    status: 'Built',
  },
  {
    name: 'Site footer',
    composes: 'Typography · Link columns · TypeBMark',
    where: 'Every page, via PageShell',
    status: 'Built',
  },
  {
    name: 'Service hero',
    composes: 'Eyebrow · Typography · Button · image',
    where: 'Advisory, Product & AI Development, Teams',
    status: 'Built',
  },
  {
    name: 'Industry hero',
    composes: 'Typography · gradient band',
    where: 'The five industry pages',
    status: 'Built',
  },
  {
    name: 'Case-study hero',
    composes: 'Eyebrow · Typography · HeroStats · full-bleed image',
    where: 'Ferry Pay',
    status: 'Built',
  },
  {
    name: 'Closing CTA band',
    composes: 'Typography · Button · photographic band',
    where: 'Every page, via PageShell',
    status: 'Built',
  },
  {
    name: 'Testimonial',
    composes: 'Eyebrow · Typography · warm glow',
    where: 'Seven pages',
    status: 'Built',
  },
  {
    name: 'FAQ',
    composes: 'Accordion · accent rules',
    where: 'Service and industry pages, Careers',
    status: 'Built',
  },
  {
    name: 'Values marquee',
    composes: 'Marquee · Typography',
    where: 'Above the closing band on every page',
    status: 'Built',
  },
  {
    name: 'Packaging tiers',
    composes: 'Eyebrow · Typography · lead card',
    where: 'What We Do and every service page',
    status: 'Built',
  },
  { name: 'Modal / dialog', composes: '—', where: 'Nowhere', status: 'Not designed' },
]

/* ================================================================== *
 * THE PAGE
 * ================================================================== */

const EYEBROW_TONES: readonly EyebrowTone[] = [
  'onLight',
  'onAccent',
  'ink',
  'slate',
  'white',
  'solar',
  'ember',
]

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
  const [hovered] = useState<string | null>(null)

  return (
    <PageShell headerTone="onLight" closing={false}>
      <div className="bg-surface">
        {/* ------------------------------------------------------- HERO */}
        <Section tone="none" spacing="none" className="pb-5xl pt-[232px] text-on-light">
          <div className="flex flex-col gap-4xl">
            <HeroIntro>
              <div className="flex max-w-[800px] flex-col items-start gap-md">
                <Eyebrow tone="ink">Internal reference</Eyebrow>
                <Typography variant="h1" className="text-h2 md:text-h1">
                  Brand System
                </Typography>
                <Typography variant="copyLarge" muted>
                  Five tiers, each derived from the one above it — identity at the top, the shipped
                  code library at the bottom. Everything below Tier 1 renders from{' '}
                  <code>@/tokens</code> and the real components at runtime, so this page cannot
                  drift from the code. The written companion is <code>BRAND-GUIDELINES.md</code>.
                </Typography>
              </div>
            </HeroIntro>

            <Reveal index={1}>
              <Waterfall active={hovered} />
            </Reveal>
          </div>
        </Section>

        {/* =============================================== TIER 1 ===== */}
        <TierBand tier={TIERS[0]}>
          <Sub title="Positioning" note="The line the footer closes every page with">
            <Typography variant="subHeaderLarge" as="p" className="max-w-[640px] leading-[1.3]">
              Most partners do one slice. We do the whole stack.
            </Typography>
            <Typography variant="copyMedium" muted className="max-w-[720px]">
              Type B sells to mid-market and regulated buyers — CTOs, VPs of Engineering, COOs,
              CISOs, operating partners. The reader is technical or technical-adjacent, is being
              asked to spend real money, and has been disappointed by a vendor before. Every
              decision below serves that reader.
            </Typography>
          </Sub>

          <Sub
            title="Brand pillars"
            note="Seven, and they are a token — the values marquee reads the same array"
          >
            <ul className="flex flex-wrap gap-sm">
              {VALUES.map((value) => (
                <li key={value}>
                  <Tag>{value}</Tag>
                </li>
              ))}
            </ul>
          </Sub>

          <Sub
            title="Personality"
            note="How the brand behaves, from the hiring criteria it publishes"
          >
            <ul className="grid gap-sm sm:grid-cols-2">
              {HIRING_TRAITS.map((trait) => (
                <li key={trait}>
                  <Typography variant="copyMedium" as="span" muted>
                    {trait}
                  </Typography>
                </li>
              ))}
            </ul>
          </Sub>

          <Sub title="Colour philosophy" note="Why the palette is what it is, before any hex value">
            <Typography variant="copyMedium" muted className="max-w-[720px]">
              Warm, not corporate. The light ground is a cream and the dark ground a deep blue-black
              ink — neither is white or black, and the difference is most of the brand's warmth.
              Three chromatic ramps carry the accent and are interchangeable by design: they are the
              three <em>moods</em>, so a page can run cool or warm without a single component
              changing. Depth never comes from a shadow; the system has none.
            </Typography>
          </Sub>

          <Sub title="Voice">
            <Rules
              rules={[
                {
                  do: 'Name the client and the number.',
                  dont: 'Write unbacked superlatives.',
                  why: '“43% cost reduction, Ferry Pay” beats “world-class delivery”.',
                },
                {
                  do: 'Lead with the reader’s constraint, then the mechanism.',
                  dont: 'Lead with the company’s history.',
                },
                {
                  do: 'Leave a slot visibly empty when the copy is not written.',
                  dont: 'Fill a gap with something that reads as real.',
                  why: 'Five publication cards ship with a visible placeholder headline for exactly this reason.',
                },
              ]}
            />
          </Sub>
        </TierBand>

        {/* =============================================== TIER 2 ===== */}
        <TierBand tier={TIERS[1]}>
          <Sub title="Colour" note="Four ramps; the three chromatic ones are the three moods">
            <Ramp name="turquoise" ramp={palette.turquoise} note="mood: deep — the default" />
            <Ramp name="orange" ramp={palette.orange} note="mood: ember" />
            <Ramp name="amber" ramp={palette.amber} note="mood: solar" />
            <Ramp
              name="neutral"
              ramp={palette.neutral}
              note="six steps — 100/300/500/700 absent by design"
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
                      className="h-[112px] w-full rounded-md"
                      style={{ backgroundImage: gradients[k] }}
                    />
                    <Typography variant="copyXSmall" as="code" muted>
                      gradients.{k}
                    </Typography>
                  </div>
                ))}
                {Object.entries(gradients.service).map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-sm">
                    <div className="h-[112px] w-full rounded-md" style={{ backgroundImage: v }} />
                    <Typography variant="copyXSmall" as="code" muted>
                      service.{k}
                    </Typography>
                  </div>
                ))}
              </div>
            </Spec>
          </Sub>

          <Sub
            title="Typography"
            note={`${fontFamily.sans.split(',')[0].replace(/'/g, '')} — sixteen steps, no literals in any component`}
          >
            <div className="flex flex-col gap-lg">
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
                    className="grid gap-sm border-t border-divider pt-md lg:grid-cols-[180px_1fr]"
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
              <div className="grid gap-sm border-t border-divider pt-md lg:grid-cols-[180px_1fr]">
                <Typography variant="copySmall" as="code" className="font-semibold">
                  numeral
                </Typography>
                <Typography variant="copyMedium" muted>
                  {typography.numeral.fontSize} — a graphic, not reading text. The Careers carousel
                  index, drawn as an outline the slide's subheader deliberately overlaps. Not shown
                  at size.
                </Typography>
              </div>
            </div>
          </Sub>

          <Sub title="Space & shape">
            <div className="grid gap-3xl lg:grid-cols-2">
              <Spec name="spacing">
                <div className="flex flex-col gap-sm">
                  {Object.entries(spacing).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-md">
                      <Typography variant="copyXSmall" as="code" className="w-[72px] shrink-0">
                        {k}
                      </Typography>
                      <div className="h-md shrink-0 rounded-sm bg-canvas" style={{ width: v }} />
                      <Typography variant="copyXSmall" as="span" muted>
                        {v}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Spec>
              <div className="flex flex-col gap-3xl">
                <Spec name="radius">
                  <div className="flex flex-wrap gap-md">
                    {Object.entries(radius).map(([k, v]) => (
                      <div key={k} className="flex flex-col items-center gap-xs">
                        <div className="size-[72px] bg-canvas" style={{ borderRadius: v }} />
                        <Typography variant="copyXSmall" as="code">
                          {k} · {v}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Spec>
                <Spec name="opacity">
                  <div className="flex flex-wrap gap-md">
                    {Object.entries(opacity).map(([k, v]) => (
                      <div key={k} className="flex flex-col gap-xs">
                        <div className="size-[56px] rounded-md bg-canvas" style={{ opacity: v }} />
                        <Typography variant="copyXSmall" as="code">
                          {k} · {v}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Spec>
              </div>
            </div>
          </Sub>

          <Sub
            title="Motion"
            note="⚠ Not in Figma — the whole scale is authored and awaiting sign-off"
          >
            <div className="grid gap-3xl lg:grid-cols-2">
              <Spec name="motion.duration" meta="seconds">
                <div className="flex flex-col">
                  {Object.entries(motionTokens.duration).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between border-t border-divider py-xs"
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
                <div className="flex flex-col">
                  {Object.entries(motionTokens.easing).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-md border-t border-divider py-xs"
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
          </Sub>

          <Sub
            title="Layout & grid"
            note={`${layout.columns} columns · ${layout.frameWidth} frame · ${layout.margin} margin · ${layout.gutter} gutter`}
          >
            <div className="w-full overflow-hidden rounded-md border border-divider">
              <div className="grid grid-cols-12 gap-lg p-md">
                {Array.from({ length: layout.columns }).map((_, i) => (
                  <div key={i} className="h-[72px] rounded-sm bg-canvas/10" />
                ))}
              </div>
            </div>
            <Spec name="breakpoints" meta="⚠ not in Figma — the file is desktop-only at 1440">
              <div className="flex flex-wrap gap-md">
                {Object.entries(breakpoints).map(([k, v]) => (
                  <Tag key={k}>
                    {k} · {v}
                  </Tag>
                ))}
              </div>
            </Spec>
          </Sub>

          <Sub title="Rules">
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
          </Sub>
        </TierBand>

        {/* =============================================== TIER 3 ===== */}
        <TierBand tier={TIERS[2]}>
          <Sub title="Button" note="variant × tone. `tone` names the GROUND, not the colour.">
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
          </Sub>

          <Sub title="Badges" note="Two distinct things, deliberately not merged">
            <Spec
              name="Eyebrow"
              meta="section label — seven tones; solar and ember are the warm page chips"
            >
              <div className="flex flex-wrap items-center gap-md rounded-md border border-divider bg-surface p-lg">
                {EYEBROW_TONES.map((tone) => (
                  <Eyebrow key={tone} tone={tone}>
                    {tone}
                  </Eyebrow>
                ))}
              </div>
            </Spec>
            <Spec name="Tag" meta="pill on a case-study row — two tones">
              <div className="flex flex-wrap gap-md">
                <div className="rounded-md border border-divider bg-surface p-lg">
                  <Tag>onLight</Tag>
                </div>
                <div className="rounded-md bg-canvas p-lg">
                  <Tag tone="onDark">onDark</Tag>
                </div>
              </div>
            </Spec>
          </Sub>

          <Sub
            title="Input"
            note="the label doubles as the placeholder; errors carry an icon and text"
          >
            <div className="flex max-w-[520px] flex-col gap-lg rounded-md border border-divider bg-surface p-lg">
              <Field
                label="Work email"
                name="bg-ok"
                value={demoValue}
                onChange={setDemoValue}
                type="email"
              />
              <Field
                label="Work email"
                name="bg-err"
                value=""
                onChange={() => {}}
                error="Enter a valid email address."
              />
            </div>
          </Sub>

          <Sub
            title="Card"
            note="three aspect ratios; radius md; depth from the scrim, never a shadow"
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
          </Sub>

          <Sub title="Disclosure" note="Tabs and Accordion — both drive real state">
            <div className="grid gap-lg lg:grid-cols-2">
              <div className="rounded-md bg-canvas p-lg">
                <Tabs
                  items={[
                    { id: 'primary', label: 'Primary' },
                    { id: 'secondary', label: 'Secondary' },
                    { id: 'all', label: 'View All', variant: 'plain' },
                  ]}
                  active={tab}
                  onChange={setTab}
                  panelId="bg-tabs-panel"
                  tone="onDark"
                />
                <div id="bg-tabs-panel" className="pt-lg">
                  <Typography variant="copySmall" as="p" className="text-on-dark opacity-muted">
                    Active: {tab}
                  </Typography>
                </div>
              </div>
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
                      'By prop, never by fork, defaulting to the existing behaviour so nothing else moves. headerTone, eyebrowTone, marqueeTone and hubFromBar were all added this way.',
                  },
                ]}
              />
            </div>
          </Sub>

          <Sub title="Rules">
            <Rules
              rules={[
                {
                  do: 'Render every piece of text through <Typography variant="…">.',
                  dont: 'Write text-[32px] or a raw font-semibold on prose.',
                },
                {
                  do: 'Extend a component with an optional prop defaulting to current behaviour.',
                  dont: 'Fork a component to recolour it on one page.',
                },
                {
                  do: 'Pass asset("/images/…") to anything that takes a src.',
                  dont: 'Pass a bare /images/… literal.',
                  why: 'It is emitted verbatim and 404s wherever the site is not served from the domain root.',
                },
              ]}
            />
          </Sub>
        </TierBand>

        {/* =============================================== TIER 4 ===== */}
        <TierBand tier={TIERS[3]}>
          <Sub title="Catalogue" note="What each pattern composes, and where it is used">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-divider">
                    {['Pattern', 'Composes', 'Where', 'Status'].map((h) => (
                      <th key={h} className="py-sm pr-lg align-bottom">
                        <Typography
                          variant="copyXSmall"
                          as="span"
                          className="font-semibold uppercase"
                        >
                          {h}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PATTERNS.map((p) => (
                    <tr key={p.name} className="border-b border-divider align-top">
                      <td className="py-md pr-lg">
                        <Typography variant="copyMedium" as="span">
                          {p.name}
                        </Typography>
                      </td>
                      <td className="py-md pr-lg">
                        <Typography variant="copySmall" as="span" muted>
                          {p.composes}
                        </Typography>
                      </td>
                      <td className="py-md pr-lg">
                        <Typography variant="copySmall" as="span" muted>
                          {p.where}
                        </Typography>
                      </td>
                      <td className="py-md">
                        {p.status === 'Built' ? (
                          <Tag>Built</Tag>
                        ) : (
                          <Eyebrow tone="ember">Not designed</Eyebrow>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Sub>

          <Sub title="The gap" note="Named rather than filled">
            <Typography variant="copyMedium" muted className="max-w-[720px]">
              The reference hierarchy lists <strong>Modals</strong> as a pattern. This system has
              none — there is no dialog anywhere in the codebase and no artboard for one in Figma.
              The nearest thing is the mobile navigation drawer, which is a full-viewport curtain
              rather than a dialog. Building one would mean inventing a pattern the brand has no
              opinion about, so it is listed as a gap and left to design.
            </Typography>
          </Sub>

          <Sub title="Rules">
            <Rules
              rules={[
                {
                  do: 'Let the page paint the ground and the pattern inherit it.',
                  dont: 'Give a shared pattern its own flat fill.',
                  why: 'This defect has shipped twice — once as ink on ink, once as a white band across four gradient pages.',
                },
                {
                  do: 'Keep the nav and the footer listing the same sections.',
                  dont: 'Change one and leave the other.',
                },
                {
                  do: 'Render an inert label where a page does not exist yet.',
                  dont: 'Ship a link that 404s.',
                },
              ]}
            />
          </Sub>
        </TierBand>

        {/* =============================================== TIER 5 ===== */}
        <TierBand tier={TIERS[4]}>
          <Sub title="Where it lives">
            <div className="flex flex-col">
              {[
                {
                  level: 'Design tokens',
                  path: 'src/tokens/index.ts · src/styles/globals.css',
                  tier: 'Tier 2',
                },
                { level: 'Atoms', path: 'src/components/*.tsx · icons/', tier: 'Tier 3' },
                { level: 'Molecules', path: 'src/components/*.tsx', tier: 'Tier 3' },
                {
                  level: 'Organisms',
                  path: 'src/components/layout/ · src/components/sections/',
                  tier: 'Tier 4',
                },
                {
                  level: 'Templates',
                  path: 'PageShell · ContentPage · CaseStudyPage',
                  tier: 'Tier 4',
                },
                {
                  level: 'Pages',
                  path: 'src/pages/*.tsx · content in *-content.ts',
                  tier: 'Tier 5',
                },
              ].map((row) => (
                <div
                  key={row.level}
                  className="grid gap-xs border-t border-divider py-md lg:grid-cols-[180px_1fr_100px]"
                >
                  <Typography variant="copyMedium" as="h4" className="font-semibold">
                    {row.level}
                  </Typography>
                  <Typography variant="copySmall" as="code" muted>
                    {row.path}
                  </Typography>
                  <Typography variant="copyXSmall" as="span" muted className="lg:text-right">
                    {row.tier}
                  </Typography>
                </div>
              ))}
            </div>
          </Sub>

          <Sub title="Exports" note="Three barrels; import from the barrel, never the file">
            <div className="flex flex-wrap gap-sm">
              {['@/components', '@/components/layout', '@/components/sections'].map((b) => (
                <Tag key={b}>{b}</Tag>
              ))}
            </div>
          </Sub>

          <Sub title="Governance" note="How a change moves through the tiers">
            <Typography variant="copyMedium" muted className="max-w-[720px]">
              Governance runs back up the chain: a decision made here can amend any tier above it,
              but only deliberately and only in one place. The five rules below are what keep the
              tiers from drifting apart.
            </Typography>
            <ol className="flex flex-col gap-lg">
              {[
                {
                  t: 'Tokens first.',
                  d: 'No component may contain a colour, size or duration literal. If a value is needed and no token fits, add the token and comment where it came from.',
                },
                {
                  t: 'One source of truth per fact.',
                  d: 'src/tokens/index.ts holds the values; this page and BRAND-GUIDELINES.md render or describe them. Two reference documents drifted badly enough to be retired — that is why they were.',
                },
                {
                  t: 'Extend by prop, never by fork.',
                  d: 'Every variation added here — headerTone, eyebrowTone, marqueeTone, hubFromBar — defaults to prior behaviour so nothing else moves.',
                },
                {
                  t: 'Mark what is not designed.',
                  d: 'Anything without an artboard carries ⚠ NOT IN FIGMA at its definition: breakpoints, the motion scale, feedback colours, the focus ring, every responsive step below xl, and this page. Do not launder an engineering decision into the brand.',
                },
                {
                  t: 'Measure, do not eyeball.',
                  d: 'Contrast, spacing and overflow claims are made against the rendered page, sampling the worst case rather than the mean. A comfortable-looking 10.76:1 mean once hid a label at 1.39:1.',
                },
              ].map((rule, i) => (
                <li
                  key={rule.t}
                  className="grid gap-sm border-t border-divider pt-lg lg:grid-cols-[48px_1fr]"
                >
                  <Typography
                    variant="copyMedium"
                    as="span"
                    className="font-semibold opacity-subtle"
                  >
                    0{i + 1}
                  </Typography>
                  <div className="flex flex-col gap-xs">
                    <Typography variant="copyMedium" as="h4" className="font-semibold">
                      {rule.t}
                    </Typography>
                    <Typography variant="copyMedium" as="p" muted>
                      {rule.d}
                    </Typography>
                  </div>
                </li>
              ))}
            </ol>
          </Sub>

          <Sub title="Documentation" note="Two artefacts, one system">
            <div className="grid gap-lg md:grid-cols-2">
              <div className="flex flex-col gap-sm rounded-md border border-divider p-lg">
                <Typography variant="copyMedium" as="h4" className="font-semibold">
                  BRAND-GUIDELINES.md
                </Typography>
                <Typography variant="copySmall" as="p" muted>
                  The written reference. Rules, reasoning, Figma provenance and the full gradient
                  stop lists. Read this to understand why.
                </Typography>
              </div>
              <div className="flex flex-col gap-sm rounded-md border border-divider p-lg">
                <Typography variant="copyMedium" as="h4" className="font-semibold">
                  /brand-guidelines
                </Typography>
                <Typography variant="copySmall" as="p" muted>
                  This page. The same system rendered from itself at runtime. Open this to see what
                  the rules produce.
                </Typography>
              </div>
            </div>
          </Sub>
        </TierBand>
      </div>
    </PageShell>
  )
}

export default BrandGuidelinesPage
