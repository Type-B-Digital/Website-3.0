import { Link } from 'react-router-dom'
import { Button, Eyebrow, HeroIntro, Section, Typography } from '@/components'
import { PageShell } from '@/components/layout'

/**
 * 404.
 *
 * ⚠ NOT IN FIGMA. There is no error-state artboard anywhere in the file — the
 * same gap `colors.feedback` records for form validation — so this is authored
 * from the system rather than reproduced.
 *
 * It existed as a real bug rather than a missing page: `main.tsx` had no
 * catch-all, so an unknown path matched no route and `<Routes>` rendered
 * nothing. Not a bare heading — *nothing*: no header, no footer, `body`
 * scrollHeight 0. And because `postbuild` copies `index.html` to `404.html` so
 * GitHub Pages can serve the SPA, every mistyped deep link on the deployed
 * staging site landed on that blank page too.
 *
 * Built from the pieces the rest of the site already uses, so it reads as this
 * site having an opinion about the wrong turn rather than as a framework
 * default: the dark hero ground, an eyebrow, the h1, and the two routes worth
 * offering someone who is lost — home, and the work.
 */
export default function NotFoundPage() {
  return (
    <PageShell headerTone="onDark">
      <HeroIntro>
        <Section
          tone="dark"
          spacing="none"
          className="flex min-h-screen items-center bg-gradient-b1 py-5xl"
        >
          <div className="flex max-w-[800px] flex-col items-start gap-lg">
            <Eyebrow tone="cream">404</Eyebrow>
            <Typography variant="h1" className="text-h2 md:text-h1">
              That page does not exist.
            </Typography>
            <Typography variant="copyLarge" muted className="max-w-[560px]">
              The link may be old, or the page may not be built yet — this site is still going up.
              Either way, the way back is short.
            </Typography>
            <div className="mt-md flex flex-wrap items-center gap-md">
              <Button as={Link} to="/" variant="primary" tone="onDark">
                Back home
              </Button>
              <Button as={Link} to="/our-work" variant="secondary" tone="onDark">
                See our work
              </Button>
            </div>
          </div>
        </Section>
      </HeroIntro>
    </PageShell>
  )
}
