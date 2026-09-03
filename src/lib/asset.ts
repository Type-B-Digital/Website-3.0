/**
 * Resolve a path in `public/` against the base path the site is served from.
 *
 * Vite rewrites the asset URLs it processes — imports, and `url()` inside CSS —
 * but a bare string literal like `/images/logo.png` is emitted exactly as
 * written. That resolves against the domain root, so every one of them 404s
 * wherever the site is not at the root: GitHub Pages serves a project site from
 * `/<repo>/`. This is what broke all 37 images on the first Pages build while
 * routing and fonts looked fine.
 *
 * `BASE_URL` is `/` during local dev, so this is a no-op there.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export default asset
