import { Link } from 'react-router-dom'
import { Button, Container, ParallaxSection, Reveal, Section, Typography } from '@/components'
import { asset } from '@/lib/asset'

/**
 * Closing call to action — shared by every page. Figma nodes 3390:26561 /
 * 26559 on the homepage and 3604:1182 / 1181 on What We Do, identical.
 */
export function ClosingCta() {
  return (
    /*
      ⚠ `light`, not `dark`, since 2026-09-21. The band's artwork was replaced
      with a pale teal-and-pink sky (Eduardo), and the copy and CTA went ink
      with it. `tone` here is the ground BEHIND the photograph — it shows for
      the frame before the image paints, and on the sliver the parallax can
      expose — so it has to be the light one now, or the band flashes ink and
      then turns pale on every page.
    */
    <Section tone="light" spacing="none" bare id="contact">
      <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden">
        {/*
          Replaced 2026-08-31, and again 2026-09-21, with artwork Eduardo
          supplied at the band's own 1440x720, so it needs no crop transform —
          just object-cover.

          ⚠ JPEG, where the old one was a 692KB PNG. This artwork is a smooth
          gradient, which is the worst case for PNG and close to the best case
          for JPEG: at q88 it is 116KB, and measured against the source the
          worst per-channel deviation is 5/255 with a mean of 0.63. That is
          under the page grain's own variance, and the grain sits on top of it.
        */}
        <ParallaxSection speed="base" className="absolute inset-0 -z-10">
          {/*
            The inner wrapper is what gives the image a box: ParallaxSection's
            motion layer is auto-height, so `size-full` on the image alone has
            nothing to resolve against and it collapses to its natural size.
          */}
          <div className="absolute inset-0">
            {/*
              scale-125, not 110: ParallaxSection travels +/-9% of the height at
              `base` speed, so a 110% image runs out of cover at the extremes and
              lets the section's dark ground show as a band along one edge.
            */}
            <img
              src={asset('/images/cta-band.jpg')}
              alt=""
              aria-hidden="true"
              className="size-full scale-125 object-cover"
            />
          </div>
        </ParallaxSection>
        {/*
          ⚠ NO SCRIM. `bg-scrim` is ink at 40% and existed to hold WHITE type
          on artwork that was darker in some places than others. Ink type wants
          the opposite, and leaving the ink scrim would have pushed the pale
          sky toward the type rather than away from it. Measured instead —
          see the note on the heading.
        */}

        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-3xl text-center">
              <Typography variant="display" className="text-h2 md:text-display">
                We believe in
                <br />
                what you’re building
              </Typography>
              {/*
                ⚠ `tone="onDark"` on a LIGHT band, which reads backwards and is
                correct. `tone` is which ground a button sits on, and `variant`
                is its weight; the pair that renders a cream fill with an ink
                label is `primary`/`onDark` (see the table in Button). Eduardo,
                2026-09-21, asked for exactly that here: "light background with
                dark text".

                So this is the one call site on the site where the name does
                not describe its surroundings. Changing it to `onLight` would
                give an INK fill with a cream label — the inverse of what was
                asked — and renaming the tones to say "cream"/"ink" would touch
                every button on the site. Noted rather than refactored.
              */}
              <Button as={Link} to="/contact" variant="primary" tone="onDark">
                Let’s talk!
              </Button>
            </div>
          </Reveal>
        </Container>
      </div>
    </Section>
  )
}

export default ClosingCta
