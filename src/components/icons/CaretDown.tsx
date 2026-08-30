/**
 * Arrow / Caret_Down — Figma node 3390:26616
 *
 * Same treatment as ArrowRight: the exported asset bakes in
 * `stroke="#F6F2EC"`, which is correct on the dark nav but wrong on the
 * light nav variant (Figma node 3386:25455). Inheriting `currentColor` makes
 * one component serve both.
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
