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

export function HeroStats({ stats }: { stats: readonly HeroStat[] }) {
  return (
    <div className="grid gap-x-lg gap-y-2xl sm:grid-cols-2 lg:grid-cols-12">
      {stats.map((stat, i) => (
        <Reveal key={stat.label} index={i} className={cn('lg:col-span-3', STAT_COLUMN[i % 3])}>
          <div className="flex flex-col gap-sm text-right">
            <Typography variant="h2" as="p">
              {stat.value}
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
