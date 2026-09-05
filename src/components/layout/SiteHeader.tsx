import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion as fm, useReducedMotion } from 'framer-motion'
import { ArrowRight, Button, CaretDown, Container, NavIntro, Typography } from '@/components'
import { cn } from '@/lib/cn'
import TypeBLogo from '@/components/icons/TypeBLogo'
import { layout, motion as motionTokens } from '@/tokens'

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
 *
 * ── The dropdown panels ──────────────────────────────────────────────────
 *
 * Figma section "Navigation & Footer Updates" — node 3731:4239 — adds a
 * dropdown to every top-level item. Five states, one per item:
 *
 *   0.0 What We Do    node 3729:3585      0.1 Industries   node 3728:2907
 *   0.2 Case Studies  node 3729:3810      0.3 Who We Are   node 3729:4056
 *   0.4 Publications  node 3731:4145
 *
 * All five draw the same thing: a 587px cream curtain over the top of the
 * page, the section name at 48px with an arrow to its own page, and the
 * section's pages listed at 32px beneath it. The nav bar sits on top of the
 * curtain, which means it renders as the ink-on-cream variant whenever a panel
 * is open — whatever ground the page underneath has.
 */

/**
 * Nav items carry their route where one exists. The rest stay inert until their
 * page is built — better an honest dead link than one that 404s.
 *
 * `to` is the section's own hub page, reached from the big heading inside the
 * panel; the top-level item itself is now a dropdown trigger rather than a
 * link, which is what its caret has always promised.
 *
 * Labels are Title Case throughout. The section is inconsistent with itself —
 * boards 0.0 and 0.1 carry "What we do" / "Case studies" / "Who we are" while
 * 0.2-0.4 and the whole footer update carry Title Case — so this follows the
 * majority and the footer, the one place both appear side by side.
 */
type NavLink = { label: string; to?: string }

type NavItem = {
  label: string
  /** The section's hub page, where one exists. */
  to?: string
  links: NavLink[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'What We Do',
    to: '/what-we-do',
    links: [
      { label: 'Advisory', to: '/advisory' },
      { label: 'Product & AI Development', to: '/product-development' },
      { label: 'Teams', to: '/teams' },
      { label: 'Industries', to: '/industries' },
    ],
  },
  {
    label: 'Industries',
    to: '/industries',
    links: [
      { label: 'Healthcare', to: '/industries/healthcare' },
      { label: 'Financial', to: '/industries/financial-services' },
      { label: 'Manufacturing', to: '/industries/manufacturing' },
      { label: 'Real Estate', to: '/industries/real-estate' },
    ],
  },
  {
    label: 'Case Studies',
    to: '/our-work',
    links: [
      { label: 'Ferry Pay', to: '/our-work/ferry-pay' },
      { label: 'Class-fi' },
      { label: 'MatchDay Health' },
      { label: 'Mave AI' },
    ],
  },
  {
    // No hub page exists for this section, so its panel heading is plain text.
    label: 'Who We Are',
    links: [
      { label: 'Our Culture', to: '/culture' },
      { label: 'We’re Hiring!', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    label: 'Publications',
    links: [
      { label: 'News' },
      { label: 'Substack' },
      { label: 'Linkedin' },
      { label: 'Clutch (4.9)' },
      { label: 'Privacy Policy' },
    ],
  },
]

export type SiteHeaderTone = 'onDark' | 'onLight'

/* ================================================================== *
 * THE PANEL
 * ================================================================== */

/**
 * One dropdown's contents. Figma puts the heading at 80/120 and the links from
 * 80/202 on a 50px pitch — `Container`'s 80px margin lands both on the
 * artboard's x, so neither is positioned by hand.
 *
 * The artboard draws one link ink-and-underlined (node 3729:3602) while the
 * rest are `neutral.800`. That is a hover state drawn in place, not a fifth
 * colour: it renders here on hover, on focus, and on the row whose page you
 * are already reading.
 */
function NavPanelContent({ item, currentPath }: { item: NavItem; currentPath: string }) {
  return (
    <Container className="pt-5xl">
      <Typography variant="h2" as="h2" className="text-on-light">
        {item.to ? (
          <Link
            to={item.to}
            className="inline-flex w-max items-center gap-sm transition-opacity duration-fast ease-out hover:opacity-muted"
          >
            {item.label}
            <ArrowRight className="size-2xl shrink-0" />
          </Link>
        ) : (
          /* Nothing to navigate to, so no arrow promising that there is. */
          item.label
        )}
      </Typography>

      <ul className="mt-lg flex flex-col gap-sm">
        {item.links.map((link) => {
          const current = link.to === currentPath
          const classes = cn(
            'w-max text-nav-panel-link transition-colors duration-fast ease-out',
            current
              ? 'text-on-light underline decoration-from-font'
              : 'text-neutral-800 hover:text-on-light hover:underline hover:decoration-from-font',
          )
          return (
            <li key={link.label}>
              {link.to ? (
                <Link to={link.to} className={classes} aria-current={current ? 'page' : undefined}>
                  {link.label}
                </Link>
              ) : (
                <span className={cn(classes, 'cursor-default')}>{link.label}</span>
              )}
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

/* ================================================================== *
 * THE HEADER
 * ================================================================== */

export function SiteHeader({ tone = 'onDark' }: { tone?: SiteHeaderTone }) {
  const [openLabel, setOpenLabel] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()
  const { pathname } = useLocation()
  const panelId = useId()
  /** Set when the pointer leaves the header; cancelled if it comes back. */
  const closeTimer = useRef<number | undefined>(undefined)

  const openItem = NAV_ITEMS.find((item) => item.label === openLabel) ?? null

  const cancelClose = useCallback(() => {
    window.clearTimeout(closeTimer.current)
  }, [])

  /**
   * Leaving the header closes the panel, but not immediately: the diagonal
   * from a nav item down to the link you are aiming at leaves the trigger
   * before it reaches the panel, and an instant close eats the gesture.
   */
  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimer.current = window.setTimeout(
      () => setOpenLabel(null),
      motionTokens.navPanel.hoverGrace * 1000,
    )
  }, [cancelClose])

  /* A new route always closes the panel — the link that navigated is inside it. */
  useEffect(() => setOpenLabel(null), [pathname])

  useEffect(() => cancelClose, [cancelClose])

  /* Escape closes, from anywhere: the panel covers the top of the page. */
  useEffect(() => {
    if (!openItem) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenLabel(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openItem])

  /**
   * While a panel is open the nav is drawn over cream, so it takes the light
   * treatment whatever the page underneath is.
   */
  const activeTone = openItem ? 'onLight' : tone
  const onDark = activeTone === 'onDark'
  const linkColour = onDark ? 'text-on-dark-muted' : 'text-on-light'

  const { navPanel, easing } = motionTokens

  return (
    <header
      className="absolute inset-x-0 top-0 z-50"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      {/*
        The curtain. Animated on height rather than transform, so it reads as
        the panel being drawn down over the hero rather than a cream block
        sliding in from off-screen — `overflow-hidden` clips its contents to
        the distance travelled so far.
      */}
      <AnimatePresence>
        {openItem && (
          <fm.div
            key="nav-panel"
            id={panelId}
            className="absolute inset-x-0 top-0 overflow-hidden bg-gradient-nav-panel"
            initial={{ height: prefersReduced ? layout.navPanelHeight : 0 }}
            animate={{ height: layout.navPanelHeight }}
            exit={{ height: prefersReduced ? layout.navPanelHeight : 0 }}
            transition={{ duration: prefersReduced ? 0 : navPanel.open, ease: [...easing.out] }}
          >
            {/*
              Sized to the panel's full height rather than to the animating
              box, so the type holds still while the curtain travels past it.
            */}
            <fm.div
              className="absolute inset-x-0 top-0"
              style={{ height: layout.navPanelHeight }}
              initial={{ opacity: prefersReduced ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: prefersReduced ? 0 : navPanel.close,
                delay: prefersReduced ? 0 : navPanel.contentLag,
                ease: [...easing.out],
              }}
            >
              <NavPanelContent item={openItem} currentPath={pathname} />
            </fm.div>
          </fm.div>
        )}
      </AnimatePresence>

      <div className="relative pt-xl">
        <Container>
          {/* Settles in from above on load — see NavIntro. */}
          <NavIntro>
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
                {NAV_ITEMS.map((item) => {
                  const isOpen = item.label === openLabel
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={isOpen ? panelId : undefined}
                        onMouseEnter={() => {
                          cancelClose()
                          setOpenLabel(item.label)
                        }}
                        onFocus={() => {
                          cancelClose()
                          setOpenLabel(item.label)
                        }}
                        onClick={() => setOpenLabel(isOpen ? null : item.label)}
                        className={cn(
                          'relative flex items-center gap-xs text-nav-link transition-colors duration-fast ease-out',
                          isOpen ? 'text-neutral-900' : 'hover:opacity-muted',
                          /* Every label goes grey behind an open panel — the
                             ground under them is cream now, so the page's own
                             tone no longer applies to any of them. */
                          !isOpen && (openItem ? 'text-neutral-600' : linkColour),
                        )}
                      >
                        {/*
                          Figma node 3729:3626 gives the open item a
                          `neutral.200` pill, 16px wider a side and 8px taller.
                          Drawn as an inset backdrop rather than as padding so
                          it appears without moving the four labels beside it —
                          the closed bar keeps the geometry it was signed off
                          with.
                        */}
                        <span
                          aria-hidden
                          className={cn(
                            '-inset-x-md -inset-y-sm absolute rounded-full transition-colors duration-fast ease-out',
                            isOpen ? 'bg-neutral-200' : 'bg-transparent',
                          )}
                        />
                        <span className="relative">{item.label}</span>
                        <CaretDown
                          className={cn(
                            'relative size-lg shrink-0 transition-transform duration-fast ease-out',
                            isOpen && 'rotate-180',
                          )}
                        />
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* Inverts with the ground: cream pill on dark, ink pill on light. */}
              <Button as={Link} to="/contact" variant="primary" tone={activeTone}>
                Let’s talk!
              </Button>
            </nav>
          </NavIntro>
        </Container>
      </div>
    </header>
  )
}

export default SiteHeader
