/**
 * Convert Natural Earth's 110m land outline to a compact GeoJSON the globe can
 * import directly.
 *
 * Run once, by hand, not on every build: the source never changes, and doing it
 * here means `world-atlas` and `topojson-client` stay devDependencies while
 * only `d3-geo` and this file ship.
 *
 *   node scripts/build-land.mjs
 *
 * Coordinates are rounded to two decimals — about 1km at the equator, far finer
 * than a 1440px globe can draw, and it roughly halves the file.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { feature } from 'topojson-client'

const topo = JSON.parse(readFileSync('node_modules/world-atlas/land-110m.json', 'utf8'))
const land = feature(topo, topo.objects.land)

const round = (n) => Math.round(n * 100) / 100
const walk = (c) => (typeof c[0] === 'number' ? [round(c[0]), round(c[1])] : c.map(walk))
land.features.forEach((f) => {
  f.geometry.coordinates = walk(f.geometry.coordinates)
})

const out = JSON.stringify(land)
writeFileSync('src/data/land-110m.json', out)
console.log(`src/data/land-110m.json  ${(out.length / 1024).toFixed(0)}KB`)
