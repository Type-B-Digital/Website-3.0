/**
 * Menu — the drawer trigger below `lg`.
 *
 * ⚠ NOT IN FIGMA. The file has no artboard narrower than 1440 and therefore no
 * mobile navigation of any kind, so this mark is authored. Drawn to the same
 * spec as the icons that ARE in the file — 24x24 box, 2px stroke, round caps,
 * `currentColor` — so it sits in the set rather than beside it. See
 * `ArrowRight` and `CaretDown`.
 *
 * Two rules, not three: the wordmark beside it is already dense, and a third
 * bar at this weight closes the counters into a smudge at 1x.
 */
export function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default MenuIcon
