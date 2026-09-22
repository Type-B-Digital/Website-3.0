import {
  CaseBand,
  CaseChallenge,
  CaseFigure,
  CaseGallery,
  CaseHero,
  CaseImpact,
  CaseSolution,
  CaseStudyPage,
  Statement,
} from '@/components/sections'

/**
 * FinTech Group — added 2026-09-20.
 *
 * ⚠ NO FIGMA ARTBOARD. Eduardo asked for the second clickable case study and
 * pointed at the live site for its content:
 * https://www.typeb.digital/works/fintech-group
 *
 * So the copy below is that page's, kept as close to verbatim as the template
 * allows, and the structure is Ferry Pay's — the "4.4 Casestudy" artboard
 * (node 2887:7099) is what defines a case study here, and everything
 * structural lives in `@/components/sections/case-study`.
 *
 * ⚠ THE GALLERY AND THE CLOSING FIGURE ARE BORROWED. The live page's own
 * photography was not exported into this build, so those three frames reuse
 * Ferry Pay's `/images/case/*` set as placeholders — per Eduardo, 2026-09-20,
 * borrowed art beats an empty block for now. None of that art is FinTech
 * Group's and it should be swapped as the real assets arrive.
 *
 * The hero and BOTH bands are this study's own as of 2026-09-21. ⚠ The two
 * bands are the same photograph at two ratios — see the note at the first
 * one.
 *
 * The `alt` text is written for what the photographs actually show, not for
 * what the slot is meant to hold, so nothing here describes a picture that
 * does not exist. ⚠ That means it has to be re-read whenever Ferry Pay's set
 * changes: those files were replaced from the artboard on 2026-09-21 and this
 * page's descriptions went stale in the same change, because only Ferry's own
 * copy was updated with them. They are correct again as of that date.
 *
 * ⚠ The source page carries no numbered results block — the only figure it
 * states is the 85 hires. `CaseImpact` below is therefore its four narrative
 * blocks rather than metrics, and it is titled accordingly. If real numbers
 * exist for this engagement they belong here.
 */

/** The live page states three figures; these are them. */
const STATS = [
  { value: '85', label: 'People hired in 2.5 months' },
  { value: '100', label: 'Total hires for the India operation' },
  { value: '5', label: 'Months to a self-managing team' },
]

/** "Things were already complex when we came in" — the three points, verbatim. */
const CHALLENGE = [
  {
    title: 'A crisis of trust from a previous employer',
    body: 'Many potential hires were still affected by a fraudulent former employer, legal threats, and fear of joining another company, leaving morale low and making trust-led, sensitive hiring essential.',
  },
  {
    title: 'India is a complicated market to enter',
    body: 'FinTech Group needed to navigate complex regulations, legal processes, and tax setup in India while rapidly building a full workforce without any local presence.',
  },
  {
    title: 'Needed to scale to ~100 almost immediately',
    body: 'Their European and North American banking clients needed more support — but the team wasn’t big enough to deliver.',
  },
]

/**
 * "Full-Stack Market Entry Execution" — six capabilities, which is exactly the
 * two-rows-of-three the roles grid draws.
 */
const ROLES = [
  {
    title: 'Incorporation',
    body: 'Setting up business in India including resident director and all necessary filings.',
  },
  {
    title: 'Procurement',
    body: 'Helped secure necessary spaces.',
  },
  {
    title: 'HR policies',
    body: 'Formulated necessary HR policies, training, and workforce roadmap.',
  },
  {
    title: 'Recruitment',
    body: 'Recruited all team members including contracting and negotiations.',
  },
  {
    title: 'Payroll & compliance',
    body: 'Implemented compliant payroll and statutory processes to ensure smooth operations.',
  },
  {
    title: 'Transfer',
    body: 'Upon setup of operation, transferred operations to the team to self-manage after 5 months.',
  },
]

/**
 * The four blocks the live page runs under "End-to-end workforce creation".
 *
 * ⚠ The emoji the source sets on each heading are dropped: the claim column is
 * a headline number elsewhere in this template, and a decorative glyph read as
 * noise at that size. The wording is otherwise the page's own.
 */
const IMPACT = [
  {
    claim: 'Bridging two companies, two cultures, and high pressure',
    body: 'Merging new employees into a new company — while addressing trauma from a former employer — required empathy and strong communication. HR and Finance leaders worked day and night to build internal structure, set up contracts and payroll, ensure legal protection, create stability, and hit hiring targets without the company stalling.',
  },
  {
    claim: 'Building the HR and finance leadership from Type B’s own team',
    body: 'Two of FinTech Group’s most critical leaders came directly from Type B: a Head of HR who personally hired 100 people for FinTech Group India, and a Head of Finance responsible for building all financial operations. These leaders became the backbone of the entire India operation.',
  },
  {
    claim: 'Hiring 85 people in 2.5 months — despite resistance',
    body: 'Due to the previous employer’s legal threats and misconduct, many candidates were scared. Type B held counseling sessions, provided transparency and reassurance, built trust one conversation at a time, and extended HR support well beyond normal hours.',
  },
  {
    claim: 'Finding and securing the Mumbai office',
    body: 'We sourced the office space, vetted options, and helped FinTech Group establish their physical presence in India — the headquarters they operate from today.',
  },
]

export function FinTechGroupPage() {
  return (
    <CaseStudyPage
      testimonial={{
        quote:
          '“Everyone on their team is incredibly talented, dedicated, and a pleasure to work with.”',
        name: 'Bas Huisman',
        role: 'Experienced hands-on sales lead',
      }}
    >
      <CaseHero
        sector="Financial services"
        name="FinTech Group"
        claim="Shaping future financial solutions."
        description="A Dutch powerhouse serving some of the largest banks across Europe, Canada, the U.S., and the Middle East. As demand increased, they needed to scale rapidly — particularly in India, one of the world’s most talent-rich yet legally complex engineering hubs."
        stats={STATS}
        /*
          ⚠ Its OWN hero since 2026-09-21. This page pointed at
          `/images/case/hero.jpg`, which is FERRY PAY's hero — every image on
          this page is still Ferry's (see the note below), so replacing that
          file would have changed the Ferry study instead of this one.

          Same frame as this study's row thumbnail on Our Work, cropped to
          16:9 rather than 5:3. That is deliberate rather than a duplication:
          the row is a preview of the study, so landing on the hero it
          promised is the point.
        */
        image="/images/case/fintech-hero.jpg"
        imageAlt="The Fintech Group's claims site open on a laptop at a café table"
      />

      <Statement>
        FinTech Group is a Dutch powerhouse serving some of the largest banks across Europe, Canada,
        the U.S., and the Middle East. Their mission involves delivering high-performance financial
        solutions for global institutions. As demand increased, they needed to scale rapidly —
        particularly in India, one of the world’s most talent-rich yet legally complex engineering
        hubs.
      </Statement>

      <CaseGallery
        images={[
          {
            src: '/images/case/gallery-1.jpg',
            alt: 'A customer moving money in a payments app at a café counter',
          },
          {
            src: '/images/case/gallery-2.jpg',
            alt: 'An express-pay balance and pay-period summary on a phone',
          },
        ]}
      />

      <CaseChallenge
        eyebrow="The challenge"
        heading="Things were already complex when we came in"
        points={CHALLENGE}
      />

      {/*
        ⚠ THE SAME PHOTOGRAPH AS THE SECOND BAND, at this slot's own 1440/800
        rather than 1440/804 — Eduardo, 2026-09-21, "change it in the previous
        full bleed image too". It is the only frame supplied for either band.

        So this page now shows one picture full-bleed twice, about a section
        apart. That is what was asked for and it is a deliberate placement,
        not an oversight — but it is the kind of thing that reads as a bug to
        anyone who finds it later, so: if a second frame arrives, this is the
        slot to give it to.
      */}
      <CaseBand
        image="/images/case/fintech-band-solution.jpg"
        alt="The Fintech Group's benefits screen on a phone, on a pale teal ground"
      />

      <CaseSolution
        eyebrow="The approach"
        heading="End-to-end workforce creation."
        body="Type B stood up FinTech Group’s India operation from nothing: incorporation and filings, an office in Mumbai, HR policy and payroll, and the hiring itself — led by a Head of HR and a Head of Finance who came from Type B’s own team, and handed over to a self-managing team after five months."
        roles={ROLES}
      />

      {/*
        ⚠ Its OWN file, like the hero. `band-impact.jpg` is FERRY PAY's, and
        this page borrows Ferry's set, so writing over it would have changed
        the Ferry study instead of this one.

        Keeps the `1440/804` ratio the artboard gives this second band, four
        pixels taller than the first — see CaseBand. The source is 1999x1451,
        so the crop is deep; centred, the phone stays whole.
      */}
      <CaseBand
        image="/images/case/fintech-band-impact.jpg"
        alt="The Fintech Group's benefits screen on a phone, on a pale teal ground"
        ratio="1440/804"
      />

      <CaseImpact
        eyebrow="Our impact"
        heading="What it took to build an operation from nothing."
        outcomes={IMPACT}
      />

      <CaseFigure
        image="/images/services/product-hero.jpg"
        alt="The platform across devices"
      />
    </CaseStudyPage>
  )
}

export default FinTechGroupPage
