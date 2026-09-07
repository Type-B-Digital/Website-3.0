/**
 * The case-study list, shared by the homepage and the Our Work landing page.
 *
 * Figma: rows at nodes 3707:10710 / 10736 / 10750 / 10792 / 10723 / 10764 /
 * 10806 / 10778 / 10820 on Our Work, and the homepage list at node 3390:26555.
 *
 * ⚠ These were two unrelated datasets. The homepage carried six placeholder
 * entries — "Medtronic", "Ferry", then "Project Name" four times, each with
 * "Project description and details here." and tags literally reading "Tag 1",
 * "Tag 2", "Tag 3" — while Our Work carried the nine real ones. A reader
 * moving from one page to the other saw a different body of work. One list
 * now: the homepage shows the first six, Our Work shows all nine.
 *
 * Copy gaps below are the artboard's own and are reproduced, as everywhere
 * else in this build.
 */

export type Work = {
  name: string
  description: string
  /** Artboard thumbnail, where one exists. */
  thumb?: string
  /** Drawn on five of the nine rows. */
  stat?: string
}

/** Figma: node 3707:10695. Four tags here against three on every row below. */
export const FEATURED = {
  name: 'Ferry Pay',
  description:
    'A payroll and tipping platform for hospitality workers, rebuilt while it kept processing $16M+ in payments every month.',
  tags: ['Platform Expansion', 'UX/UI Design', 'Fractional CTO', 'Agentic Engine'],
  to: '/our-work/ferry-pay',
} as const

/** Every row carries the same three tags on the artboard, and so does the homepage. */
export const ROW_TAGS = ['Platform Expansion', 'UX/UI Design', 'Fractional CTO'] as const

/**
 * In the order Our Work draws them, which is the order the homepage now takes
 * its six from.
 *
 * ⚠ Two copy gaps reproduced as drawn: Class.fi's body is MatchDay Health's
 * paragraph verbatim, and the `stat` on the last four rows repeats "500K users
 * supported." / "~45% faster delivery." from rows three and four. Both read as
 * unfinished copy rather than layout decisions.
 *
 * ⚠ Six thumbnails exist (`case-1` to `case-6`, the homepage's own art). The
 * last three rows have none, so they keep the grey placeholder block on Our
 * Work and are below the homepage's cut of six either way.
 */
export const WORK: readonly Work[] = [
  {
    name: 'MatchDay Health',
    description:
      'Healthcare career platform for doctors, nurses, and pharmacists; conversational agents took over onboarding and sales.',
    thumb: '/images/work/case-1.png',
  },
  {
    name: 'Class.fi',
    description:
      'Healthcare career platform for doctors, nurses, and pharmacists; conversational agents took over onboarding and sales.',
    thumb: '/images/work/case-2.png',
    stat: '70% lower compliance cost.',
  },
  {
    name: 'Sensor Bio',
    description:
      'Medical-grade wearable platform re-architected off a decade of legacy technology.',
    thumb: '/images/work/case-3.png',
    stat: '500K users supported.',
  },
  {
    name: 'Mave AI',
    description:
      'AI marketing automation for real-estate agents, with the delivery operation rebuilt around it.',
    thumb: '/images/work/case-4.png',
    stat: '~45% faster delivery.',
  },
  {
    name: 'Ande AI',
    description:
      'A dedicated pod embedded in one week to unblock an AI platform after a stalled vendor.',
    thumb: '/images/work/case-5.png',
  },
  {
    name: 'RFL Wealth',
    description:
      'Wealth advisory for physicians: new brand, new site, and a custom CRM in ten weeks.',
    thumb: '/images/work/case-6.png',
    stat: '500K users supported.',
  },
  {
    name: 'Dome',
    description:
      'Fractional real-estate investing across web, iOS, and Android, rescued from a stalled build.',
    stat: '~45% faster delivery.',
  },
  {
    name: 'Eezee Assist',
    description:
      'AI-augmented franchise support platform, designed so non-technical staff can train the agent.',
    stat: '500K users supported.',
  },
  {
    name: 'UDM',
    description: 'Steel-drum manufacturing moved off paper cards onto a purpose-built ERP.',
    stat: '~45% faster delivery.',
  },
]

/**
 * The six the homepage lists — the first six of the nine, which are exactly
 * the six with artwork.
 *
 * ⚠ None of them links yet. Ferry Pay is the only case study with a page, and
 * it is the Our Work hero rather than a row. Once the remaining case studies
 * are built, the per-row links here and on Our Work get their destinations —
 * see docs/BUILD_LOG.md.
 */
export const HOMEPAGE_WORK = WORK.slice(0, 6)
