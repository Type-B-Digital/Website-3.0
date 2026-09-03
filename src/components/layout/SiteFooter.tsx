import { Container, ParallaxSection, Typography } from '@/components'
import TypeBLogo from '@/components/icons/TypeBLogo'
import { asset } from '@/lib/asset'

/**
 * Site footer — shared by every page. Figma node 3390:26636 on the homepage and
 * node 3604:1309 on What We Do, identical.
 */
const FOOTER_COLUMNS = [
  {
    heading: 'What We Do',
    links: ['Advisory', 'Product & AI Development', 'Teams', 'Industries'],
  },
  {
    heading: 'Case Studies',
    links: ['Ferry Pay', 'Class-fi', 'MatchDay Health', 'Mave AI', 'View All'],
  },
  { heading: 'Who We Are', links: ['About Us', 'We’re Hiring!', 'Contact'] },
  {
    heading: 'Publications',
    links: ['News', 'Substack', 'Linkedin', 'Clutch (4.9)', 'Privacy Policy'],
  },
]

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
        {/* Figma: 440px statement column, nav columns to its right — node 3390:26636 */}
        <div className="grid gap-4xl lg:grid-cols-[minmax(0,440px)_1fr]">
          <div className="flex flex-col gap-lg">
            {/* Cream on the footer ground; see the note in SiteHeader on why
                this pins to the ramp rather than `text-on-dark`. */}
            <TypeBLogo className="text-neutral-50" />
            <Typography variant="subHeaderSmall" className="max-w-[440px]">
              Most partners do one slice. We do the whole stack.
            </Typography>
            <Typography variant="copyXSmall" muted>
              © 2026 Type B Digital. All Rights Reserved.
            </Typography>
          </div>

          {/*
            Columns size to their content and never wrap a link, matching the
            artboard. Figma's 96px column gap is off the 8-based spacing scale,
            so this uses the nearest token (80px). Logged in BUILD_LOG.md.
          */}
          <nav className="flex flex-wrap gap-x-4xl gap-y-xl" aria-label="Footer">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} className="flex w-max max-w-[124px] flex-col gap-md">
                <Typography variant="copySmall" as="h2" className="opacity-subtle">
                  {column.heading}
                </Typography>
                <ul className="flex flex-col gap-md">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-copy-medium text-paper transition-opacity duration-fast ease-out hover:opacity-muted"
                      >
                        {link}
                      </a>
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
