/**
 * Arrow / Arrow_Left_SM — Figma node 3369:24491
 *
 * Inlined rather than loaded via <img> so the stroke inherits `currentColor`
 * and always matches the label beside it. The exported asset bakes in
 * `stroke="#040E19"`, which rendered a dark arrow on dark grounds — invisible
 * in the secondary CTA. Path data is the exported asset's, unmodified;
 * geometry (24x24 box, 2px round-capped stroke) is preserved exactly.
 */
export function ArrowRight({ className }: { className?: string }) {
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
        d="M7 12H17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 8L17 12L13 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowRight
