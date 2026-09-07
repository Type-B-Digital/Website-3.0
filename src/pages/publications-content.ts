/**
 * Publications — the index grid and the one article that exists.
 *
 * Figma: "8. Blog" node 2887:9631 and "8.1 Blog Post" node 2894:10170
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2887-9631
 *
 * Split out of the two page files because both need it: the index draws the
 * card, the post draws the article, and the card has to know the post's slug to
 * link to it.
 *
 * ⚠ COPY STATUS. The index artboard draws six cards and gives five of them the
 * same literal placeholder headline — "Article header goes here and will never
 * exceed more than two lines". Only the Teams card has a real article behind it
 * (node 2894:10170, which carries finished copy). Reproduced as drawn at
 * Eduardo's direction, the same way Our Work ships its unfinished thumbnails:
 * the client can see at a glance which five slots still need writing. A card
 * with no `slug` renders inert rather than linking anywhere.
 */

/* ================================================================== *
 * FILTERS — Figma node 2887:9856
 * ================================================================== */

/**
 * The rail, in the artboard's order — which is NOT the order the cards use.
 *
 * ⚠ Two of these eight match no article: Fintech and Product Methodology. That
 * is a real state on a six-card grid, so the index handles an empty result
 * rather than pretending it cannot happen.
 */
export const FILTERS = [
  'Operational Rescue',
  'Digital Transformation',
  'AI Enablement',
  'Teams',
  'Fractional CTO',
  'Fintech',
  'MENA',
  'Product Methodology',
] as const

export type PublicationFilter = (typeof FILTERS)[number]

/* ================================================================== *
 * THE GRID — Figma node 3752:445
 * ================================================================== */

/** Node 3731:4240 and its five siblings, verbatim. */
export const PLACEHOLDER_TITLE =
  'Article header goes here and will never exceed more than two lines'

/**
 * Which of the two type colours a line on a card is drawn in. Not a style
 * choice per card so much as a reading of the photograph under it — see the
 * measurements below.
 */
export type CardTone = 'ink' | 'paper'

export type PublicationCard = {
  /** Doubles as the filter this card answers to. */
  category: PublicationFilter
  title: string
  image: string
  /** Set only where an article exists; without it the card does not link. */
  slug?: string
  /** The headline colour, taken from the artboard. */
  titleTone: CardTone
}

/**
 * Row-major, as the 2x3 grid draws them — nodes 3752:442 / 441 / 439 / 440 /
 * 443 / 444.
 *
 * ── Why the headline colour is per-card ──
 *
 * The artboard draws two of the six headlines in ink (#030A12) and four in
 * paper (#F5F6F6), while drawing every category label in paper. The split
 * reads like an authoring slip. It is not: these photographs are LIGHT across
 * the top and dark across the bottom, and the two ink headlines are exactly
 * the two cards whose bottom strip is light. The artboard is right, and the
 * headlines ship as drawn.
 *
 * Measured against the RENDERED page rather than the source files — text
 * hidden, each line sampled over its own box, and the figure below is the
 * WORST 5x5 block inside that box, not the mean. The mean is what hides this:
 * averaged across the full card width, ink on the Teams label scores 10.76 and
 * looks fine, while the dark shape it actually sits on scores 1.39.
 *
 *                          |  category   |  headline
 *                          | ink   paper | ink   paper
 *   ai-enablement          | 11.92  1.28 |  6.90  1.70
 *   digital-transformation |  8.92  1.25 |  1.19 12.33
 *   teams                  |  1.39  1.47 |  1.28 10.63
 *   mena                   | 12.22  1.40 |  2.43  4.67
 *   fractional-cto         |  6.46  2.27 |  7.24  1.97
 *   operational-rescue     |  1.12  1.70 |  1.07 14.99
 *
 * Every headline clears 4.5:1 on the colour the artboard gives it, the
 * tightest being MENA at 4.67.
 *
 * ⚠ The category label clears nothing. Paper fails on all six and ink fails on
 * Teams and Operational Rescue, where a hard light-to-dark edge runs through
 * the label's box, so no colour reads on both sides of it. That is fixed with
 * a scrim over the label band alone — see `LABEL_SCRIM` in publications.tsx,
 * which carries why it is not a full-card scrim. With it the label reads
 * 11.05 to 13.09 in paper, and the headlines are untouched.
 */
export const CARDS: readonly PublicationCard[] = [
  {
    category: 'AI Enablement',
    titleTone: 'ink',
    title: PLACEHOLDER_TITLE,
    image: '/images/publications/card-ai-enablement.png',
  },
  {
    category: 'Digital Transformation',
    titleTone: 'paper',
    title: PLACEHOLDER_TITLE,
    image: '/images/publications/card-digital-transformation.png',
  },
  {
    category: 'Teams',
    titleTone: 'paper',
    title: "Don't Just Rent a Team, Build Your Future IP.",
    image: '/images/publications/card-teams.png',
    slug: 'build-your-future-ip',
  },
  {
    category: 'MENA',
    titleTone: 'paper',
    title: PLACEHOLDER_TITLE,
    image: '/images/publications/card-mena.png',
  },
  {
    category: 'Fractional CTO',
    titleTone: 'ink',
    title: PLACEHOLDER_TITLE,
    image: '/images/publications/card-fractional-cto.png',
  },
  {
    category: 'Operational Rescue',
    titleTone: 'paper',
    title: PLACEHOLDER_TITLE,
    image: '/images/publications/card-operational-rescue.png',
  },
]

/* ================================================================== *
 * THE ARTICLE — Figma node 2894:10170
 * ================================================================== */

export type PublicationSection = {
  heading: string
  /** A second-level heading between the heading and the body. */
  subheading?: string
  paragraphs: readonly string[]
  /** Draw a figure after this section's body. */
  figureAfter?: boolean
}

export type Publication = {
  slug: string
  category: PublicationFilter
  title: string
  /** As drawn on the artboard. */
  date: string
  /** The same date as a machine-readable `datetime` attribute. */
  dateTime: string
  deck: string
  lead: readonly string[]
  sections: readonly PublicationSection[]
}

/**
 * ⚠ Three copy gaps reproduced as drawn, all of a kind this file has hit
 * before on Our Work:
 *
 * - The standfirst (node 2894:10617) is the INDEX page's blurb verbatim
 *   ("Practical writing on AI, delivery, and the decisions in between"),
 *   not a line about this article. It reads as an unfilled slot.
 * - The BOT Advantage body (node 2894:10623) is the second paragraph of the
 *   Race to the Bottom body (node 2894:10621), repeated word for word.
 * - Straight apostrophes and quotes throughout, where every other artboard in
 *   the file uses curly. Kept verbatim; this is the client's own text.
 *
 * The zero-width spaces Figma carries at several paragraph ends are stripped —
 * they render as nothing and only make the strings harder to diff.
 */
export const ARTICLE: Publication = {
  slug: 'build-your-future-ip',
  category: 'Teams',
  /** Node 2894:10616 — 56px, which is not a step on the type scale. */
  title: "Don't Just Rent a Team, Build Your Future IP.",
  /** Node 2894:10618. */
  date: 'July 7, 2026',
  dateTime: '2026-07-07',
  deck: 'Practical writing on AI, delivery, and the decisions in between, from the people doing the work.',
  /** Node 2894:10620. */
  lead: [
    "Your $25/hour developer is costing you $100/hour in management time and rework. If you're a CTO or VP of Engineering spending 20+ hours a week managing offshore vendors instead of driving innovation, you already know the hidden tax of traditional outsourcing. The constant \"yes\" from developers who deliver broken code, the bait-and-switch where senior engineers are promised but juniors show up, and the endless churn that resets progress every quarter—these aren't talent problems. They're model problems.",
  ],
  sections: [
    {
      /** Heading node 2894:10679, body node 2894:10621. */
      heading: 'The Race to the Bottom Stops Here',
      paragraphs: [
        'Legacy outsourcing was built for maintenance, not innovation. The industry\'s obsession with hourly rates has created a marketplace where vendors compete on price while delivering mounting technical debt, communication gaps, and what industry experts call the "Correction Tax"—the compounding cost of fixing code that should have been written correctly the first time. Studies show that companies adopting unmanaged offshore models experience productivity losses adding up to 20% in additional costs, with contract management alone consuming 6-10% of organizational budgets.',
        'The challenge isn\'t geography. Type B operates teams in India, Sri Lanka, Colombia, and Argentina. The challenge is the operating model—unmanaged, high-churn environments where developers prioritize contract retention over candid feedback, creating what we call "The Yes Trap". When psychological safety is absent, engineering excellence becomes impossible.',
      ],
      figureAfter: true,
    },
    {
      /** Heading node 2894:10681, body node 2894:10623 — the duplicate. */
      heading: 'The BOT Advantage',
      paragraphs: [
        'The challenge isn\'t geography. Type B operates teams in India, Sri Lanka, Colombia, and Argentina. The challenge is the operating model—unmanaged, high-churn environments where developers prioritize contract retention over candid feedback, creating what we call "The Yes Trap". When psychological safety is absent, engineering excellence becomes impossible.',
      ],
      figureAfter: true,
    },
    {
      /** Heading 2894:10680, subheading 2894:10619, body 2894:10622. */
      heading: 'Poly-Shore Flexibility',
      subheading: 'Right Talent, Right Timezone',
      paragraphs: [
        "Strategic deployment matters as much as technical capability. Type B's poly-shore model places collaborative work requiring real-time interaction with nearshore teams in Colombia and Argentina, while routing deep work—backend development, QA automation, data engineering—to offshore teams in India and Sri Lanka. All operate under unified quality standards and PMO oversight.",
        "This isn't arbitrary geography. It's engineered collaboration. Ferry Pay leveraged this model to achieve a 43% cost reduction while modernizing their entire payments platform. By integrating a senior offshore development team with fintech-specific expertise, Ferry Pay achieved 3x faster release cycles, eliminated 60+ hours of monthly client management overhead, and cleaned 25,000+ legacy records—all without sacrificing security or compliance. The offshore team didn't just write code; they unlocked the roadmap.",
      ],
    },
  ],
}

/** Every article, keyed by slug. One so far; the route already reads it as a set. */
export const PUBLICATIONS: readonly Publication[] = [ARTICLE]

export function findPublication(slug: string | undefined): Publication | undefined {
  return PUBLICATIONS.find((publication) => publication.slug === slug)
}

/**
 * The three figures on the article artboard (nodes 2894:10682 / 10683 / 10684)
 * are three instances of ONE image fill — the same 845x469 bytes each time.
 */
export const ARTICLE_FIGURE = '/images/publications/post-figure.png'
