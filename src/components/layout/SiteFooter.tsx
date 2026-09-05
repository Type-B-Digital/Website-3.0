import { Link } from 'react-router-dom'
import { CaretDown, Container, ParallaxSection, Typography } from '@/components'
import TypeBMark from '@/components/icons/TypeBMark'
import { asset } from '@/lib/asset'

/**
 * Site footer — shared by every page.
 *
 * Rebuilt from the "footer update" board — Figma node 3729:3711, inside the
 * "Navigation & Footer Updates" section (3731:4239). Four things changed from
 * the version it replaces (nodes 3390:26636 / 3604:1309):
 *
 *   1. the statement column opens with the 24px B monogram, not the full
 *      97x32 lockup — see `TypeBMark`;
 *   2. Industries is its own column now, listing all five industry pages,
 *      rather than a single link inside What We Do;
 *   3. every column heading carries a caret, matching the nav; and
 *   4. headings and links are both 16px — the headings were 14px.
 */
/**
 * `to` is the route where one exists; the rest stay inert until their page is
 * built — an honest dead link beats one that 404s. Publications is the one
 * column with no live route at all.
 *
 * A `heading` with a `to` renders as a link, and only then gets the caret: the
 * artboard draws one on all five, but a caret on a heading that goes nowhere
 * promises a page that does not exist. Who We Are and Publications are the two
 * without a hub, so they render as plain text.
 *
 * Kept in step with `NAV_ITEMS` in SiteHeader — the update gives the footer and
 * the nav dropdowns the same five sections. They are not shared: the footer
 * lists Legal and the nav panel does not, and the nav's Who We Are omits the
 * "About Us" wording the footer had been using.
 */
type FooterLink = { label: string; to?: string }

const FOOTER_COLUMNS: { heading: string; to?: string; links: FooterLink[] }[] = [
  {
    heading: 'What We Do',
    to: '/what-we-do',
    links: [
      { label: 'Advisory', to: '/advisory' },
      { label: 'Product & AI Development', to: '/product-development' },
      { label: 'Teams', to: '/teams' },
    ],
  },
  {
    heading: 'Industries',
    to: '/industries',
    links: [
      { label: 'Healthcare', to: '/industries/healthcare' },
      { label: 'Financial', to: '/industries/financial-services' },
      { label: 'Manufacturing', to: '/industries/manufacturing' },
      { label: 'Real Estate', to: '/industries/real-estate' },
      { label: 'Legal', to: '/industries/legal' },
    ],
  },
  {
    heading: 'Case Studies',
    to: '/our-work',
    links: [
      { label: 'Ferry Pay', to: '/our-work/ferry-pay' },
      { label: 'Class-fi' },
      { label: 'MatchDay Health' },
      { label: 'Mave AI' },
    ],
  },
  {
    heading: 'Who We Are',
    links: [
      { label: 'Our Culture', to: '/culture' },
      { label: 'We’re Hiring!', to: '/careers' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Publications',
    links: [
      { label: 'News' },
      { label: 'Substack' },
      { label: 'Linkedin' },
      { label: 'Clutch (4.9)' },
      { label: 'Privacy Policy' },
    ],
  },
]

/** A footer leaf: a link where the page exists, plain text where it does not. */
function FooterItem({ link }: { link: FooterLink }) {
  const classes =
    'text-copy-medium text-paper transition-opacity duration-fast ease-out hover:opacity-muted'
  return link.to ? (
    <Link to={link.to} className={classes}>
      {link.label}
    </Link>
  ) : (
    <span className={classes}>{link.label}</span>
  )
}

/* ================================================================== *
 * SECTIONS
 * ================================================================== */


export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-footer-ground pt-4xl text-on-dark">
      {/*
        Red glow behind the wordmark. Figma: node 3483:27261 — orange/amber
        ellipses at `mix-blend-hard-light`, which is what reads as crimson
        against the near-black ground. Rotated to match the artboard's diagonal.
        See `.footer-glow` in globals.css for why this is gradients rather than
        the exported SVG.
      */}
      <div
        aria-hidden
        className="footer-glow absolute inset-x-[-8%] bottom-0 h-[85%] translate-y-1/2"
      />
      <Container className="relative">
        {/* Figma: 411px statement column, nav columns to its right — node 3729:4055 */}
        {/*
          24px between the statement column and the nav block, which is what
          node 3729:4055 has — the block starts at x=515, not at 571. The
          vertical gap stays 80: below `lg` these stack, and 24px of air
          between the statement and five columns of links is not a gap.
        */}
        <div className="grid gap-x-lg gap-y-4xl lg:grid-cols-[minmax(0,411px)_1fr]">
          <div className="flex flex-col gap-md">
            {/* Cream on the footer ground; see the note in SiteHeader on why
                this pins to the ramp rather than `text-on-dark`. */}
            <Link
              to="/"
              className="w-max text-paper transition-opacity duration-fast ease-out hover:opacity-muted"
              aria-label="Type B Digital — home"
            >
              <TypeBMark />
            </Link>
            {/*
              The artboard breaks this line by hand after "slice." (node
              3729:3751 is two paragraphs, not one wrapped at 320px), so the
              break is authored rather than left to the measure.
            */}
            <Typography variant="subHeaderSmall" className="max-w-[320px]">
              Most partners do one slice.
              <br />
              We do the whole stack.
            </Typography>
            <Typography variant="copyXSmall" muted>
              © 2026 Type B Digital. All Rights Reserved.
            </Typography>
          </div>

          {/*
            Five columns spread across the 845px block the artboard gives them
            (node 3729:3715). They size to their content and never wrap a link.
          */}
          <nav
            className="flex flex-wrap gap-x-4xl gap-y-xl lg:justify-between lg:gap-x-lg"
            aria-label="Footer"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} className="flex w-max max-w-[124px] flex-col gap-md">
                <Typography variant="copyMedium" as="h2" className="flex items-center opacity-subtle">
                  {column.to ? (
                    <Link
                      to={column.to}
                      className="flex items-center transition-opacity duration-fast ease-out hover:opacity-muted"
                    >
                      {column.heading}
                      {/* The nav's caret, turned to point at the page it opens. */}
                      <CaretDown className="size-lg shrink-0 -rotate-90" />
                    </Link>
                  ) : (
                    column.heading
                  )}
                </Typography>
                <ul className="flex flex-col gap-md">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </Container>

      {/* Oversized wordmark bleeding off both edges. Figma: node 3390:26763 */}
      <ParallaxSection speed="subtle" className="relative mt-4xl">
        <img
          src={asset('/icons/wordmark.svg')}
          alt=""
          aria-hidden="true"
          className="w-full min-w-frame px-md"
        />
      </ParallaxSection>
    </footer>
  )
}

export default SiteFooter
