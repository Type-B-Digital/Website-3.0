import { useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * Put a new route at the top of the page.
 *
 * A client-side navigation replaces the DOM but leaves the scroll position
 * alone, so following a footer link from the bottom of a long page landed the
 * visitor at the bottom of the next one — on the footer they had just clicked.
 *
 * Two things this deliberately does not do:
 *
 * - It does not animate. A smooth scroll here would race the incoming page's
 *   own entrance and, on the pages with pinned scenes, run the scroll-linked
 *   scenes backwards on the way up.
 * - It does not fire on `POP` (back and forward). The browser restores the
 *   previous position on history navigation and that is the behaviour people
 *   expect; overriding it loses their place.
 *
 * Keyed on `pathname` only, so a query or hash change does not jump the page.
 *
 * The reset is asserted twice, before paint and again on the next frame,
 * because Chrome's scroll anchoring re-offsets the document after the route
 * swap: it tries to keep the content that was in view stable, and with the
 * whole page replaced it settled a couple of hundred pixels down instead of at
 * the top. One `scrollTo` in an effect is not enough on its own — measured at
 * 192px on /teams, 331 on /industries/healthcare, 307 on /contact.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (navigationType === 'POP') return
    const top = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    top()
    const frame = requestAnimationFrame(top)
    return () => cancelAnimationFrame(frame)
  }, [pathname, navigationType])

  return null
}

export default ScrollToTop
