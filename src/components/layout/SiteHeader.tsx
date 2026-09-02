import { Link } from 'react-router-dom'
import { Button, Container } from '@/components'
import { cn } from '@/lib/cn'
import CaretDown from '@/components/icons/CaretDown'

/**
 * Site header — shared by every page. Figma "navigation-main": node 3390:26593
 * on the homepage, node 3604:1352 on What We Do; identical, so one component.
 *
 * `tone` picks which ground the links are drawn for. The homepage hero is dark
 * so the links are cream; the What We Do hero is a light-to-orange gradient and
 * the artboard draws them in ink there (node 3604:1374 is `#040E19`) — cream is
 * genuinely unreadable over it.
 *
 * The CTA pill is unchanged between the two: cream with ink text reads on both
 * grounds, and the artboard reuses the same component instance.
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
  const linkColour = tone === 'onDark' ? 'text-on-dark-muted' : 'text-on-light'
  return (
    <header className="absolute inset-x-0 top-0 z-50 pt-xl">
      <Container>
        <nav className="flex items-center justify-between" aria-label="Primary">
          <Link to="/" className="shrink-0" aria-label="Type B Digital — home">
            <img src="/icons/type-b-logo.svg" alt="Type B Digital" width={97} height={32} />
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

          <Button as="a" href="#contact" variant="primary" tone="onDark">
            Let’s talk!
          </Button>
        </nav>
      </Container>
    </header>
  )
}

export default SiteHeader
