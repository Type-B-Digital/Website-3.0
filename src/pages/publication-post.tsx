import { Link, useParams } from 'react-router-dom'
import {
  CaretDown,
  Eyebrow,
  HeroIntro,
  Reveal,
  Section,
  Typography,
  ValuesMarquee,
} from '@/components'
import { PageShell } from '@/components/layout'
import { asset } from '@/lib/asset'
import { gradients } from '@/tokens'
import NotFoundPage from './not-found'
import {
  ARTICLE_FIGURE,
  findPublication,
  type Publication,
  type PublicationSection,
} from './publications-content'

/**
 * A publication — Figma node 2894:10170 ("8.1 Blog Post")
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2894-10170
 *
 * One artboard, so one template: the route is `/publications/:slug` and the
 * copy comes from `publications-content.ts`. An unknown slug renders the 404
 * rather than an empty article, the same way an unknown path does.
 *
 * The article column and the outline rail split the 1280 content width as
 * 323 + 112 + 845 — again exact rather than columnar, as on the index.
 */

/** Node 2894:10170's own fill. Peach -> amber -> paper, warm end top-right. */
const PAGE_GRADIENT = gradients.page.publicationPost

/**
 * The title is 56px on 1.2 — between `h2` (48) and `h1` (72) and not a step on
 * the scale, so the size is set here rather than a token being bent to fit.
 * Same reasoning as the Our Work row title. Figma: node 2894:10616.
 *
 * It steps down to `h3` (40px) below `md`. At 56 on a 390 viewport the title
 * ran four lines and filled most of the first screen; the pages that carry a
 * real `h1` make the same move (`text-h2 md:text-h1`), one step down the scale.
 */
const TITLE_CLASS = 'text-h3 font-semibold leading-[1.2] tracking-normal md:text-[56px]'

/**
 * Section headings are 32px on 1.2. `subHeaderLarge` is the right size but
 * carries 1.5 leading, which would add 10px to every heading box, so the
 * leading is overridden. Figma: nodes 2894:10679 / 10680 / 10681.
 */
const HEADING_CLASS = 'leading-[1.2]'

/* ================================================================== *
 * PIECES
 * ================================================================== */

/**
 * Breadcrumbs — Figma node 2894:10610, drawn as three chips reading
 * "Breadcrumb / Breadcrumb / Breadcrumb" with caret separators.
 *
 * The labels are placeholders, but a breadcrumb is structure rather than copy:
 * these three are read off the route the reader actually took, so nothing is
 * invented to fill them.
 */
function Breadcrumbs({ publication }: { publication: Publication }) {
  const trail = [
    { label: 'Home', to: '/' },
    { label: 'Publications', to: '/publications' },
    { label: publication.category },
  ]

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-sm">
        {trail.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-sm">
            {i > 0 && (
              /* The caret is drawn pointing down on the artboard; turned into
                 the separator it is doing the job of. */
              <CaretDown className="size-lg -rotate-90" />
            )}
            <Typography variant="copySmall" as="span" className="leading-[1.2]">
              {crumb.to ? (
                <Link to={crumb.to} className="hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                crumb.label
              )}
            </Typography>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * The outline rail — Figma node 2894:10668. A 14px label at 48% over eight
 * 16px rows, in the same 323 column the index puts its filters in.
 *
 * ⚠ The artboard's eight rows read "Item One" to "Item Eight". Those are
 * placeholders for the article's own headings, which the article has, so the
 * rail is built from them: four rows here, not eight. Sticky is authored — an
 * outline that scrolls away is not an outline.
 *
 * `self-start` is what makes the sticky work. A grid item stretches to its
 * row's height by default, so the rail filled the whole article column and had
 * no room left to move inside it — `position: sticky` was set and did nothing.
 *
 * Below `lg` the two columns stack, which puts the outline above the headline
 * of the article it outlines — a list of section names before the reader has
 * seen the title. It is hidden there instead. Nothing is lost: every row is a
 * jump link to a heading that is still on the page, and Figma draws no
 * artboard below 1280 to say otherwise.
 */
function Outline({ publication }: { publication: Publication }) {
  const items = publication.sections.flatMap((section) =>
    section.subheading
      ? [
          { id: slugify(section.heading), label: section.heading },
          { id: slugify(section.subheading), label: section.subheading },
        ]
      : [{ id: slugify(section.heading), label: section.heading }],
  )

  return (
    <nav
      aria-label="On this page"
      className="hidden flex-col gap-md lg:sticky lg:top-[232px] lg:flex lg:self-start"
    >
      {/* A chip, as every other section label on the site is. The artboard
          draws bare 48%-opacity text here; see the note in publications.tsx. */}
      <div>
        <Eyebrow tone="onLight">Outline</Eyebrow>
      </div>
      <ul className="flex flex-col gap-md">
        {items.map((item) => (
          <li key={item.id}>
            <Typography variant="copyMedium" as="span" className="tracking-[-0.01em]">
              <a href={`#${item.id}`} className="opacity-muted hover:opacity-full hover:underline">
                {item.label}
              </a>
            </Typography>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Heading text to an anchor id — the outline and the headings have to agree. */
function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Nodes 2894:10682 / 10683 / 10684 — 845x469 at 8px radius, one image thrice. */
function Figure() {
  return (
    <Reveal>
      <img
        src={asset(ARTICLE_FIGURE)}
        alt=""
        className="aspect-[845/469] w-full rounded-md object-cover"
      />
    </Reveal>
  )
}

function ArticleSection({ section }: { section: PublicationSection }) {
  return (
    <>
      <Reveal>
        <div className="flex flex-col gap-lg">
          <Typography
            variant="subHeaderLarge"
            as="h2"
            id={slugify(section.heading)}
            className={HEADING_CLASS}
          >
            {section.heading}
          </Typography>

          {section.subheading && (
            /* 16px SemiBold on 1.2 — the `button` token's metrics exactly. */
            <Typography
              variant="button"
              as="h3"
              id={slugify(section.subheading)}
              muted
              className="scroll-mt-4xl"
            >
              {section.subheading}
            </Typography>
          )}

          <div className="flex flex-col gap-lg">
            {section.paragraphs.map((paragraph) => (
              <Typography
                key={paragraph.slice(0, 40)}
                variant="copyLarge"
                muted
                className="tracking-[-0.01em]"
              >
                {paragraph}
              </Typography>
            ))}
          </div>
        </div>
      </Reveal>

      {section.figureAfter && <Figure />}
    </>
  )
}

/* ================================================================== *
 * THE PAGE
 * ================================================================== */

export function PublicationPostPage() {
  const { slug } = useParams()
  const publication = findPublication(slug)

  /* An unknown slug is an unknown path; the catch-all handles the rest. */
  if (!publication) return <NotFoundPage />

  return (
    <PageShell headerTone="onLight">
      <div style={{ backgroundImage: PAGE_GRADIENT }}>
        <Section tone="none" spacing="none" className="pb-4xl pt-[232px] text-on-light">
          <div className="grid gap-2xl lg:grid-cols-[323px_minmax(0,1fr)] lg:gap-x-[112px]">
            <Outline publication={publication} />

            <article className="flex flex-col gap-3xl">
              <HeroIntro>
                <div className="flex flex-col gap-md">
                  <Breadcrumbs publication={publication} />
                  <Typography variant="h1" className={`max-w-[800px] ${TITLE_CLASS}`}>
                    {publication.title}
                  </Typography>
                  {/*
                    ⚠ The artboard fills this slot with the index page's blurb
                    rather than a line about the article — see the note in
                    publications-content.ts. Drawn as-is.
                  */}
                  <Typography variant="copyLarge" muted className="tracking-[-0.01em]">
                    {publication.deck}
                  </Typography>
                  <Typography variant="button" as="p" muted>
                    <time dateTime={publication.dateTime}>{publication.date}</time>
                  </Typography>
                </div>
              </HeroIntro>

              {/* 24 from the title block to the first figure, then 48 between blocks. */}
              <div className="flex flex-col gap-lg">
                <Figure />
                {publication.lead.map((paragraph) => (
                  <Typography
                    key={paragraph.slice(0, 40)}
                    variant="copyLarge"
                    muted
                    className="pt-lg tracking-[-0.01em]"
                  >
                    {paragraph}
                  </Typography>
                ))}
              </div>

              {publication.sections.map((section) => (
                <ArticleSection key={section.heading} section={section} />
              ))}
            </article>
          </div>
        </Section>
        <ValuesMarquee />
      </div>
    </PageShell>
  )
}

export default PublicationPostPage
