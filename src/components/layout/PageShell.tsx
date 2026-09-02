import type { ReactNode } from 'react'
import SiteHeader, { type SiteHeaderTone } from './SiteHeader'
import ClosingCta from './ClosingCta'
import SiteFooter from './SiteFooter'

/**
 * PageShell — the chrome every page shares: header, the closing call to action,
 * and the footer.
 *
 * These three were inlined in the homepage until a second page needed them. The
 * scaling guide called this out as the highest-value refactor available, and the
 * reason is here: with them inlined, "the sections that repeat" would have meant
 * three copies to keep in sync, and the Figma nodes are byte-identical across
 * both artboards.
 *
 * `closing` exists because the CTA is shared but not universal — a page that
 * ends differently opts out rather than the shell being forked.
 */
export type PageShellProps = {
  children: ReactNode
  /** Render the shared closing CTA above the footer. */
  closing?: boolean
  /** Which ground the header's links are drawn for — see SiteHeader. */
  headerTone?: SiteHeaderTone
}

export function PageShell({ children, closing = true, headerTone }: PageShellProps) {
  return (
    <>
      <SiteHeader tone={headerTone} />
      <main>
        {children}
        {closing && <ClosingCta />}
      </main>
      <SiteFooter />
    </>
  )
}

export default PageShell
