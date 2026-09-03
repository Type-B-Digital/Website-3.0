/**
 * Arrow / Chevron_Down — Figma node 2894:14484 (the FAQ disclosure marker).
 *
 * Not the same glyph as {@link CaretDown}, despite both pointing down: the
 * caret in the nav is a 6x3 tick (`M15 11L12 14L9 11`), this is a full-width
 * chevron (`M19 9L12 16L5 9`). Substituting one for the other reads as a
 * different component at a glance, so both exist.
 *
 * The export bakes `stroke="#040E19"`; inheriting `currentColor` lets it sit on
 * either ground.
 */
export function ChevronDown({ className }: { className?: string }) {
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
      <path
        d="M19 9L12 16L5 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ChevronDown
