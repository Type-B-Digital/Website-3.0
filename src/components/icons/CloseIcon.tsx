/**
 * Close — dismisses the mobile drawer.
 *
 * ⚠ NOT IN FIGMA, for the same reason as `MenuIcon`, and drawn to the same
 * spec: 24x24, 2px, round caps, `currentColor`.
 */
export function CloseIcon({ className }: { className?: string }) {
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
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default CloseIcon
