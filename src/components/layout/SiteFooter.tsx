import { Link } from 'react-router-dom'
import { CaretDown, Container, ParallaxSection, Typography } from '@/components'
import TypeBMark from '@/components/icons/TypeBMark'
import ClutchLogo from '@/components/icons/ClutchLogo'
import { asset } from '@/lib/asset'
import { cn } from '@/lib/cn'

/**
 * Site footer — shared by every page.
 *
 * Rebuilt from the "footer update" board — Figma node 3930:3483, inside the
 * "Navigation & Footer Updates" section (3731:4239), which is now also applied
 * to every page artboard (the homepage's copy is node 3928:606 and is what the
 * per-element references below cite, since it is the one in situ).
 *
 * ⚠ The IDs in this file were re-resolved on 2026-09-15. The file was rebuilt
 * that afternoon and the previous footer nodes (3729:3711, and 3390:26636 /
 * 3604:1309 before it) no longer exist. The geometry did not change — the 411px
 * column, the 24px gap, the 845px nav block are all still what they were — only
 * the node ids moved. Four things changed from the version it replaces:
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
 * built — an honest dead link beats one that 404s.
 *
 * A `heading` with a `to` renders as a link, and only then gets the caret: the
 * artboard draws one on all five, but a caret on a heading that goes nowhere
 * promises a page that does not exist.
 *
 * Kept in step with `NAV_ITEMS` in SiteHeader — the update gives the footer and
 * the nav dropdowns the same five sections. They are not shared: the footer
 * lists Legal and the nav panel does not, and the nav's Who We Are omits the
 * "About Us" wording the footer had been using.
 */
/**
 * `to` is an internal route; `href` is an external destination and opens in a
 * new tab. Neither means the row is inert — see the note above.
 */
type FooterLink = { label: string; to?: string; href?: string }

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
    /* The heading is the culture page — the same change the nav panel took, so
       the two now agree. "Our Culture" was a row underneath a heading that went
       nowhere. */
    heading: 'Who We Are',
    to: '/culture',
    links: [
      { label: 'We’re Hiring!', to: '/careers' },
      { label: 'Contact', to: '/contact' },
      /* ⚠ NOT IN FIGMA. The artboard's Who We Are lists two rows; this is a
         third, added 2026-09-09. The brand system is a real page about who the
         company is, so it belongs in this section rather than under
         Publications — but nothing in the design asked for it. */
      { label: 'Brand System', to: '/brand-guidelines' },
    ],
  },
  {
    /*
      Was the one heading here pointing at a page that did not exist — a
      deliberate exception to the dead-link rule, taken because the destination
      was imminent. `/publications` is a real route now.

      ⚠ SUBSTACK AND CLUTCH are both gone from this column, and Substack is
      gone from the whole site — Eduardo, 2026-09-15, "remove Substack reference
      and links everywhere on the site".

      That is a DEPARTURE FROM THE BOARD, deliberately and on instruction. The
      footer artboard still draws Substack; the nav one does not:

        nav panel  (node 3731:4176 ff.)  News · Linkedin · Privacy Policy
        footer     (node 3928:669)       News · Substack · Linkedin · Privacy Policy

      Nabeel's note named the navigation only, so an earlier pass kept the
      footer row to match node 3928:669. Eduardo has since made it site-wide, so
      the boards are the thing that is now out of date here, not this file.
      Anyone reconciling the two later should change the boards rather than
      restore the row.

      Clutch is a different case and not a loss: it has its own rating element
      beside the tagline above.

      ⚠ Both boards still open the column with a "News" row. This file has not
      carried one since the heading itself became the link to /publications, and
      that stands: a "News" row underneath a "Publications" heading that already
      goes to the blog index is the same destination listed twice. Flagged for
      design rather than silently re-added.
    */
    heading: 'Publications',
    to: '/publications',
    links: [
      { label: 'Linkedin', href: 'https://www.linkedin.com/company/typeb-digital/' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
    ],
  },
]

/** A footer leaf: a route, an external link, or plain text where neither exists. */
function FooterItem({ link }: { link: FooterLink }) {
  const classes =
    'text-copy-medium text-paper transition-opacity duration-fast ease-out hover:opacity-muted'
  return link.to ? (
    <Link to={link.to} className={classes}>
      {link.label}
    </Link>
  ) : link.href ? (
    /* Leaves the site, so a real anchor — and `noopener` because
       `target="_blank"` otherwise hands the new tab a reference back. */
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
      {link.label}
    </a>
  ) : (
    <span className={classes}>{link.label}</span>
  )
}

/* ================================================================== *
 * SECTIONS
 * ================================================================== */

/**
 * Clutch rating — Figma node 3929:2044 ("Frame 1000003718"), the row inside the
 * footer's statement column. Nabeel, 2026-09-15: "add the Clutch review between
 * the tagline and copyright copy".
 *
 * Reproduced from the artboard rather than designed here, which it was on the
 * first pass — that version put five drawn stars BEFORE the words "4.9 on
 * Clutch" and had no Clutch mark at all. The board draws the opposite order and
 * a real logo:
 *
 *   [Clutch wordmark 71x20]  8px  "4.9 ★★★★★"
 *
 * - Horizontal auto-layout, §itemSpacing§ 8, §counterAxisAlignItems: MAX§ — so
 *   §items-end§, not §items-center§: the 20px logo and the 21px line box align
 *   on their bottom edge.
 * - The rating is ONE text run at 16px/400 in #F6F6F6 (§copyMedium§, §paper§),
 *   stars included. They are the ★ character (U+2605), five of them, all
 *   filled — the board does not draw a partial star for the 0.9, so neither
 *   does this.
 *
 * The whole row is one link to the profile, which is where the retired
 * "Clutch (4.9)" nav row used to point. The mark and the stars are decoration;
 * the accessible name spells the rating out as a sentence so a screen reader
 * hears it once rather than reading five glyphs.
 *
 * ⚠ The review COUNT is not shown — the board does not carry one and nobody has
 * given us a number. A rating with an invented denominator behind it is worse
 * than a rating on its own.
 */
const CLUTCH = { rating: '4.9', stars: '★★★★★', href: 'https://clutch.co/profile/type-b' } as const

function ClutchRating({ className }: { className?: string }) {
  return (
    <a
      href={CLUTCH.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex w-max items-end gap-sm text-paper transition-opacity duration-fast ease-out hover:opacity-muted',
        className,
      )}
      aria-label={`Rated ${CLUTCH.rating} out of 5 on Clutch — opens in a new tab`}
    >
      <ClutchLogo />
      <Typography variant="copyMedium" as="span" aria-hidden>
        {CLUTCH.rating} {CLUTCH.stars}
      </Typography>
    </a>
  )
}


export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-gradient-footer pt-4xl text-on-dark">
      {/*
        Orange glow behind the wordmark. Figma: node 3928:607 ("background
        glow") — amber.500 and orange.500 ellipses at 40%, blurred 240, composited
        normally. See `.footer-glow` in globals.css for the full derivation, for
        why this is gradients rather than the exported SVG, and for why the
        `hard-light` this used to carry was what made the footer read red.
      */}
      {/*
        Covers the whole footer, because the gradients inside it are positioned
        as PERCENTAGES OF THIS BOX and the board's are percentages of the 1440
        x540 footer frame. This used to be a short box pinned to the bottom and
        pushed halfway out of the footer, which meant the same percentages
        described a much smaller ellipse — and a 240px blur across a box that
        size flattened it into almost nothing.

        `overflow-hidden` on the footer does the clipping, exactly as the
        artboard's frame clips its own 1243px glow group.
      */}
      <div aria-hidden className="footer-glow absolute inset-0" />
      <Container className="relative">
        {/* Figma: 411px statement column, nav columns to its right — node 3928:623 */}
        {/*
          24px between the statement column and the nav block, which is what
          node 3928:623 has — the statement column ends at x=68289 and the nav
          block starts at 68313. The
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
              3928:631 is two paragraphs, not one wrapped at 320px), so the
              break is authored rather than left to the measure.
            */}
            <Typography variant="subHeaderSmall" className="max-w-[320px]">
              Most partners do one slice.
              <br />
              We do the whole stack.
            </Typography>
            {/*
              Between the tagline and the copyright, per the 2026-09-15 note.

              The column's own rhythm is 16 (mark -> tagline, node 3929:2035),
              but the artboard holds 32 on BOTH sides of the rating row: the
              tagline block ends at y=8275, the row sits at 8307, and the
              copyright at 8360 against a row 21 tall. So each of these two adds
              a second 16 on top of the column gap rather than the column
              switching to a single looser rhythm, which would also push the
              monogram off the tagline.
            */}
            <ClutchRating className="mt-md" />
            <Typography variant="copyXSmall" muted className="mt-md">
              © 2026 Type B Digital. All Rights Reserved.
            </Typography>
          </div>

          {/*
            Five columns spread across the 845px block the artboard gives them
            (node 3928:633). They size to their content and never wrap a link.
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
