/**
 * The case-study list, shared by the homepage and the Our Work landing page.
 *
 * Figma: rows at nodes 3707:10710 / 10736 / 10750 / 10792 / 10723 / 10764 /
 * 10806 / 10778 / 10820 on Our Work, and the homepage list at node 3390:26555.
 *
 * ⚠ These were two unrelated datasets. The homepage carried six placeholder
 * entries — "Medtronic", "Ferry", then "Project Name" four times, each with
 * "Project description and details here." and tags literally reading "Tag 1",
 * "Tag 2", "Tag 3" — while Our Work carried nine real ones. A reader moving
 * from one page to the other saw a different body of work. One list now, and
 * both pages read it.
 *
 * ⚠ CUT TO FOUR — Eduardo, 2026-09-20: "only Ferry Pay and FinTech Group are
 * clickable and viewable, and include 2 other placeholder items
 * (non-clickable) for Pelican and HireNorth. Remove all others."
 *
 * So the nine rows the board draws are down to four, and the list is no longer
 * the artboard's. All nine went — MatchDay Health, Class.fi, Sensor Bio, Mave
 * AI, Ande AI, RFL Wealth, Dome, Eezee Assist, UDM — none of them had a case
 * study page or a prospect of one this round. Pelican and HireNorth are new
 * entries, not survivors: named placeholders for studies that are coming.
 *
 * The removed names still appear in prose elsewhere (the industry cards on Our
 * Work, the healthcare and industries pages, the publications) — that is copy
 * about the work, not a work selection, and was left alone.
 *
 * Copy gaps below are the artboard's own and are reproduced, as everywhere
 * else in this build.
 */

export type Work = {
  name: string
  /** The full line, as Our Work draws it. */
  description: string
  /**
   * One short line for the homepage row.
   *
   * ⚠ Added 2026-09-16. Eduardo: "the work section has extra copy under each
   * work row header, which should be removed and replaced with the previous one
   * line copy", against node 3944:582 — where each row is a name, ONE line, and
   * the tags, inside a 106px block.
   *
   * The board's own strings there are the placeholders this list replaced
   * ("Project description and details here.", under names like "Project Name"),
   * so what carried over is the SHAPE and not the copy: real names stay, and
   * each gets a line short enough to hold one row. `description` is untouched
   * and is still what Our Work renders, where there is room for it.
   *
   * ⚠ Keep these under about 35 characters. The board's own placeholder is 37,
   * and the text column it sits in is 404px at the designed 1440 — but the
   * homepage grid gives the rows less than that below `xl`, where the page
   * margin drops to 24. A first pass at ~50 characters read fine at 1440 and
   * wrapped to two lines on a 1280 laptop, which is the thing this change was
   * made to stop.
   */
  short: string
  /** Artboard thumbnail, where one exists. Drawn by the HOMEPAGE. */
  thumb?: string
  /**
   * Our Work's row thumbnail, where it differs from the homepage's.
   *
   * ⚠ Added 2026-09-21. The two pages drew one file until then, which is
   * fine while the art is a stand-in and wrong once a study has real
   * photography: Eduardo gave FinTech Group a different frame for each — the
   * monitor on teal for the homepage, the laptop over the shoulder for Our
   * Work. Falls back to `thumb`, so a study with one image still needs only
   * one field.
   */
  rowThumb?: string
  /** Drawn on five of the nine rows. */
  stat?: string
  /**
   * The case study page, where one is built. A row WITHOUT `to` is a
   * placeholder: it renders exactly like the others and does nothing when
   * clicked, because the study behind it does not exist yet. Two of the four
   * are in that state deliberately — see the note at the top of the file.
   */
  to?: string
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
 * In the order Our Work draws them, which is the order the homepage takes
 * its rows from.
 *
 * ⚠ Ferry Pay leads the list AND is the Our Work hero. Our Work therefore
 * skips it in the rows below the hero rather than printing the same study
 * twice on one page; the homepage, which has no hero, lists all four.
 *
 * ⚠ THUMBNAILS WERE BORROWED, and none of them are any more. `case-1` to
 * `case-4` were exported for studies that have since been removed, and were
 * reused here on Eduardo's instruction (2026-09-20) so no row shipped with
 * the grey placeholder block. All four rows carry their OWN art as of
 * 2026-09-21, so that caveat is closed.
 *
 * ⚠ Pelican and HireNorth still have no `to`. Their artwork being real does
 * not make the studies real — both rows remain deliberately inert until the
 * pages exist. A finished-looking thumbnail on a row that does nothing is
 * exactly the trap the `to`-or-nothing rule exists to avoid, so do not read
 * the new art as a signal that these are ready to link.
 */
export const WORK: readonly Work[] = [
  {
    name: 'Ferry Pay',
    short: 'Daily payout on autopilot.',
    description:
      'A payroll and tipping platform for hospitality workers, rebuilt while it kept processing $16M+ in payments every month.',
    thumb: '/images/work/ferry-pay.jpg',
    stat: '$16M+ processed in one month.',
    to: '/our-work/ferry-pay',
  },
  {
    name: 'FinTech Group',
    short: 'An India operation, from zero.',
    description:
      'A Dutch fintech serving Europe’s largest banks needed an India operation: incorporation, office, and a full workforce built from nothing.',
    /* Homepage: the marketing site on a monitor. Our Work: the same site on a
       laptop, over the shoulder — see `rowThumb`. */
    thumb: '/images/work/fintech-group.jpg',
    rowThumb: '/images/work/fintech-group-row.jpg',
    stat: '85 people hired in 2.5 months.',
    to: '/our-work/fintech-group',
  },
  {
    /* Placeholder — no `to`. The study is real work (the KOAT Capital
       acquisition and the 100-person BOT operation, written up in the
       publications), but the page has not been built. */
    name: 'Pelican',
    short: 'Case study coming soon.',
    description: 'Case study coming soon.',
    thumb: '/images/work/pelican.jpg',
  },
  {
    /* Placeholder — no `to`. */
    name: 'HireNorth',
    short: 'Case study coming soon.',
    description: 'Case study coming soon.',
    thumb: '/images/work/hirenorth.jpg',
  },
]

/**
 * The homepage lists all four, Ferry Pay included — it has no featured band of
 * its own, so leaving it out would have hidden the one finished study from the
 * front page.
 */
export const HOMEPAGE_WORK = WORK

/** Our Work's rows: everything the hero above them is not. */
export const WORK_ROWS = WORK.filter((work) => work.name !== FEATURED.name)
