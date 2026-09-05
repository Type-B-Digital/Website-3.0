import { Link } from 'react-router-dom'
import { Button, Container, ParallaxSection, Reveal, Section, Typography } from '@/components'
import { asset } from '@/lib/asset'

/**
 * Closing call to action — shared by every page. Figma nodes 3390:26561 /
 * 26559 on the homepage and 3604:1182 / 1181 on What We Do, identical.
 */
export function ClosingCta() {
  return (
    <Section tone="dark" spacing="none" bare id="contact">
      <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden">
        {/*
          Replaced 2026-08-31 with the artwork Eduardo supplied at the band's own
          1440x720, so it needs no crop transform — just object-cover.
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
              src={asset('/images/cta-band.png')}
              alt=""
              aria-hidden="true"
              className="size-full scale-125 object-cover"
            />
          </div>
        </ParallaxSection>
        <div aria-hidden className="absolute inset-0 -z-10 bg-scrim" />

        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-3xl text-center">
              <Typography variant="display" className="text-h2 md:text-display">
                We believe in
                <br />
                what you’re building
              </Typography>
              <Button as={Link} to="/contact" variant="secondary" tone="onDark">
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
