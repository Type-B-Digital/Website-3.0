/**
 * Verify scroll-linked motion (parallax, the pinned manifesto scene).
 *
 * Screenshots alone cannot do this: under headless Chrome with a virtual time
 * budget, Framer Motion's `useScroll` never fires, however you scroll the page
 * from JavaScript. This drives REAL input over the DevTools protocol instead.
 *
 * Stops may carry a pointer position: `2400@950,380` scrolls to 2400 and then
 * moves the mouse to (950, 380) — needed for the pointer-lit
 * "Bold. Brilliant. Beautiful." scene, where a screenshot without a real
 * mouseMoved event only ever shows the blob's resting position.
 *
 * Usage:
 *   npm run dev
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *     --headless=new --disable-gpu --hide-scrollbars \
 *     --remote-debugging-port=9222 --window-size=1440,900 \
 *     --user-data-dir=/tmp/chrome-verify http://localhost:5173/ &
 *   node scripts/scroll-verify.mjs ./out 1050 1400 1750 2100 2450
 *
 * Prints computed state at each stop and writes a PNG per stop. No
 * dependencies — Node 18+ has global WebSocket and fetch.
 */
const [, , outDir, ...stopArgs] = process.argv
const stops = (stopArgs.length ? stopArgs : ['1050', '1400', '1750', '2100', '2450']).map((arg) => {
  const [y, pointer] = String(arg).split('@')
  const [px, py] = pointer ? pointer.split(',').map(Number) : []
  return { y: Number(y), pointer: pointer ? { x: px, y: py } : null }
})

const list = await (await fetch('http://127.0.0.1:9222/json')).json()
const page = list.find((t) => t.type === 'page' && t.url.includes('5173'))
if (!page) throw new Error('No page target on :5173. Is Chrome running with --remote-debugging-port=9222?')

const ws = new WebSocket(page.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const i = ++id
    pending.set(i, { res, rej })
    ws.send(JSON.stringify({ id: i, method, params }))
  })

ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (!m.id || !pending.has(m.id)) return
  const { res, rej } = pending.get(m.id)
  pending.delete(m.id)
  m.error ? rej(new Error(m.error.message)) : res(m.result)
})

const wait = (ms) => new Promise((r) => setTimeout(r, ms))
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, returnByValue: true })).result.value

await new Promise((r) => ws.addEventListener('open', r))
await send('Page.enable')
await send('Runtime.enable')
await send('Page.navigate', { url: 'http://localhost:5173/' })
await wait(3000)

const { writeFileSync, mkdirSync } = await import('node:fs')
if (outDir) mkdirSync(outDir, { recursive: true })

let at = 0
for (const { y, pointer } of stops) {
  // A real gesture. Negative yDistance scrolls the page down.
  await send('Input.synthesizeScrollGesture', {
    x: 720, y: 400, xDistance: 0, yDistance: -(y - at),
    speed: 20000, gestureSourceType: 'mouse', repeatCount: 0,
  })
  at = y
  await wait(900)

  if (pointer) {
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved', x: pointer.x, y: pointer.y, button: 'none',
    })
    await wait(700)
  }

  console.log(
    await evaluate(`JSON.stringify({
      y: Math.round(window.scrollY),
      // The sweep raises each character's opacity; colour never changes.
      filled: (() => {
        const n = [...document.querySelectorAll('p[aria-label] span span')]
        if (!n.length) return null
        const lit = n.filter((s) => Number(getComputedStyle(s).opacity) > 0.99).length
        return lit + '/' + n.length
      })(),
      images: [...document.querySelectorAll('[data-scene="manifesto-stack"] img')]
        .map((i) => Number(getComputedStyle(i).opacity).toFixed(2)).join(','),
      // Glow scene: ground colour mid-crossfade, and the lit-stroke layer.
      glowGround: (() => {
        const lit = document.querySelector('.bbb-lit')
        if (!lit) return null
        let panel = lit
        while (panel && !panel.classList.contains('sticky')) panel = panel.parentElement
        return panel ? getComputedStyle(panel).backgroundColor : null
      })(),
      logosVisible: (() => {
        const l = document.querySelector('img[alt="Deloitte"]')
        if (!l) return false
        const r = l.getBoundingClientRect()
        return r.bottom > 0 && r.top < window.innerHeight
      })(),
    })`),
  )

  if (outDir) {
    const shot = await send('Page.captureScreenshot', { format: 'png' })
    const tag = pointer ? `${y}-p${pointer.x}x${pointer.y}` : `${y}`
    writeFileSync(`${outDir}/scroll-${tag}.png`, Buffer.from(shot.data, 'base64'))
  }
}
ws.close()
