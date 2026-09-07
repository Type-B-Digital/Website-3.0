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
 *
 * ⚠ Both sides are normalised, because `BASE_URL` is NOT guaranteed to end in
 * a slash. `actions/configure-pages` emits `base_path` as `/Website-3.0` with
 * no trailing slash, and Vite adds one when it writes its OWN asset URLs but
 * leaves `import.meta.env.BASE_URL` exactly as configured. Concatenating the
 * two therefore produced `/Website-3.0images/logos/logo-1.png` — every one of
 * the 37 images on the deployed homepage, while the JS and CSS beside them
 * loaded fine, because Vite had emitted those itself.
 *
 * Stripping a trailing slash from the base and re-adding exactly one makes
 * this correct for any base, with or without the slash, rather than depending
 * on how it happens to be spelled.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/${path.replace(/^\//, '')}`
}

export default asset
