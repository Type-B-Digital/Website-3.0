/**
 * Arrow / Caret_Down — Figma instance 3776:631, inside the homepage nav.
 * (Was 3390:26616; re-resolved 2026-09-15 after the file was rebuilt. The
 * library component itself is not published into this file, so an instance is
 * the only stable thing to cite.)
 *
 * Same treatment as ArrowRight: the exported asset bakes in
 * `stroke="#F6F2EC"`, which is correct on the dark nav but wrong on the
 * light nav variant. Inheriting `currentColor` makes one component serve both.
 */
export function CaretDown({ className }: { className?: string }) {
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
        d="M15 11L12 14L9 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CaretDown
