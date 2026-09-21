import CountUp from './CountUp'
import Reveal from './Reveal'
import Typography from './Typography'
import { cn } from '@/lib/cn'

/**
 * The hero proof numbers, right-aligned to the 12-column grid.
 *
 * Figma: node 3679:10553 on Culture (six, in two rows) and 3707:10938 on the
 * case study template (the first three of the same set).
 *
 * The alignment is the whole point and the thing that was wrong in Culture's
 * first build: each stat occupies three columns of the right nine, so the
 * numbers line up as a column of **right edges** — 708, 1034 and 1360 on the
 * artboard — rather than floating at arbitrary offsets. Columns 4-6, 7-9,
 * 10-12, and the pattern repeats every three so a second row stacks under the
 * first.
 *
 * ⚠ The case study artboard places its three at 788 / 1026 / 1360, which is
 * neither the grid nor a consistent rhythm. Built on Culture's alignment on
 * purpose — it is the one the grid supports, and the client asked for this
 * layout specifically.
 */

export type HeroStat = { value: string; label: string }

/** Columns 4-6, 7-9, 10-12 — see the note above. */
const STAT_COLUMN = ['lg:col-start-4', 'lg:col-start-7', 'lg:col-start-10']

/**
 * Split a written stat into the parts `CountUp` animates.
 *
 * These numbers count up on the homepage and did not here, which read as two
 * different components rather than one treatment. The values are authored as
 * display strings ("30+", "25%", "100"), so rather than restating every call
 * site as `{ to, prefix, suffix }` — six on Culture, three on each case study —
 * the string is parsed: everything before the digits is the prefix, everything
 * after is the suffix.
 *
 * A value with no digits in it is returned as-is and rendered as plain text,
 * so a stat like "Half" cannot end up animating from zero to nothing.
 */
function splitStat(value: string): { prefix: string; to: number; suffix: string } | null {
  const match = /^(\D*)(\d+)(.*)$/.exec(value)
  if (!match) return null
  return { prefix: match[1], to: Number(match[2]), suffix: match[3] }
}

export function HeroStats({ stats }: { stats: readonly HeroStat[] }) {
  return (
    /*
      ⚠ TWO columns from the smallest width, not one — Eduardo, 2026-09-21:
      "in the who we are page, arrange the stats in a 2 by 3 table ... make
      sure each row is top aligned." Culture carries six stats, so two columns
      is exactly the 2x3 asked for. It was `sm:grid-cols-2`, i.e. a single
      column below 640, which made those six stats six full screens.

      `items-start` is the top alignment: a label that wraps to two lines in
      one cell must not drag its neighbour's numeral down with it.

      ⚠ This also reaches the case-study hero, which passes three stats and so
      lands 2 + 1 on a phone. That is the better of the two — the alternative
      was three stacked singles — but it is a change to those pages too.
    */
    <div className="grid grid-cols-2 items-start gap-x-lg gap-y-2xl lg:grid-cols-12">
      {stats.map((stat, i) => (
        <Reveal key={stat.label} index={i} className={cn('lg:col-span-3', STAT_COLUMN[i % 3])}>
          <div className="flex flex-col gap-sm text-right">
            {/* 40px below `md`, not the 32 a heading drops to — Eduardo,
                2026-09-21, "make all stat numbers across the site 40p". A
                stat is a numeral, not a heading: it is read as a figure and
                it is short, so it holds a larger size on a phone than the
                prose headings around it without costing a line. */}
            <Typography variant="h2" as="p" className="text-h3 md:text-h2">
              {(() => {
                const parts = splitStat(stat.value)
                return parts ? (
                  <CountUp to={parts.to} prefix={parts.prefix} suffix={parts.suffix} />
                ) : (
                  stat.value
                )
              })()}
            </Typography>
            <Typography variant="copySmall" muted>
              {stat.label}
            </Typography>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default HeroStats
