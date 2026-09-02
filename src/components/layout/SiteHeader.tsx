import { Link } from 'react-router-dom'
import { Button, Container } from '@/components'
import { cn } from '@/lib/cn'
import CaretDown from '@/components/icons/CaretDown'
import TypeBLogo from '@/components/icons/TypeBLogo'

/**
 * Site header — shared by every page. Figma ships two variants:
 *   navigation-main  node 3390:26593 (homepage)
 *   navigation-dark  node 3605:1436  (What We Do and every light-hero page)
 *
 * Figma's names describe the *elements*, not the ground: "navigation-dark" is
 * the ink-on-cream variant. `tone` here names the ground instead — `onLight`
 * renders navigation-dark — because that is what a caller actually knows about
 * its own hero.
 *
 * Every part of the mark inverts between the two, not just the links:
 *
 *   |         | onDark (navigation-main) | onLight (navigation-dark) |
 *   |---------|--------------------------|---------------------------|
 *   | logo    | cream                    | ink                       |
 *   | links   | cream @ 80%              | ink @ 80%   (3605:1458)   |
 *   | CTA     | cream pill, ink label    | ink pill, cream label     |
 *
 * The CTA was the part that had been missed: a cream pill was carried over to
 * the light nav, where it reads as a hole punched in the page. The artboard
 * fills it `#040E19` with `#F6F2EC` text (node 3605:1472/1473) — which is
 * exactly `Button variant="primary" tone="onLight"`.
 */
/**
 * Nav items carry their route where one exists. The rest stay inert until their
 * page is built — better an honest dead link than one that 404s.
 */
const NAV_LINKS: { label: string; to?: string }[] = [
  { label: 'What we do', to: '/what-we-do' },
  { label: 'Industries' },
  { label: 'Case studies' },
  { label: 'Who we are' },
  { label: 'Publications' },
]

export type SiteHeaderTone = 'onDark' | 'onLight'

export function SiteHeader({ tone = 'onDark' }: { tone?: SiteHeaderTone }) {
  const onDark = tone === 'onDark'
  const linkColour = onDark ? 'text-on-dark-muted' : 'text-on-light'
  return (
    <header className="absolute inset-x-0 top-0 z-50 pt-xl">
      <Container>
        <nav className="flex items-center justify-between" aria-label="Primary">
          {/*
            The ramp ends, not the semantic text tokens: both artboard exports
            bake the mark at exactly `neutral-50` / `neutral-900`, and
            `text-on-dark` resolves to `paper` (#F6F6F6), which would drift the
            homepage mark a shade off its own nav links.
          */}
          <Link
            to="/"
            className={cn('shrink-0', onDark ? 'text-neutral-50' : 'text-neutral-900')}
            aria-label="Type B Digital — home"
          >
            <TypeBLogo />
          </Link>

          <ul className="hidden items-center gap-lg opacity-muted lg:flex">
            {NAV_LINKS.map((link) => {
              const content = (
                <>
                  {link.label}
                  <CaretDown className="size-lg shrink-0" />
                </>
              )
              const classes = cn(
                'flex items-center gap-xs text-nav-link transition-opacity duration-fast ease-out hover:opacity-muted',
                linkColour,
              )
              return (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className={classes}>
                      {content}
                    </Link>
                  ) : (
                    <span className={classes}>{content}</span>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Inverts with the ground: cream pill on dark, ink pill on light. */}
          <Button as="a" href="#contact" variant="primary" tone={tone}>
            Let’s talk!
          </Button>
        </nav>
      </Container>
    </header>
  )
}

export default SiteHeader
