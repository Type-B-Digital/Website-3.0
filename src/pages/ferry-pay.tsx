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
 * Ferry Pay — Figma node 2887:7099 ("4.4 Casestudy")
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2887-7099
 *
 * The artboard that defines the case study template, so everything structural
 * lives in `@/components/sections/case-study`; this file is the copy and the
 * six photographs.
 */

/** The first three of Culture's set — node 3932:17065. */
const STATS = [
  { value: '100', label: 'Cumulative years of experience' },
  { value: '30+', label: 'Global team members' },
  { value: '25+', label: 'Global customers served' },
]

/** Node 3932:17077 ("The challenge"). */
const CHALLENGE = [
  {
    title: 'High issue rate',
    body: 'Six of every ten customer interactions were support requests tied to bugs or usability problems, and the support team was overwhelmed.',
  },
  {
    title: 'Low satisfaction',
    body: 'The mobile app sat at 2.0 stars, a critical liability for a product whose whole promise is that getting paid is easy.',
  },
  {
    title: 'Scaling limitations',
    body: 'Database queries ran 200 to 300 milliseconds, infrastructure cost was climbing with no optimization path, and the go-to-market timeline was slipping.',
  },
]

/** Node 3932:17095 ("The solution") — two rows of three. */
const ROLES = [
  {
    title: 'Fractional CTO',
    body: 'We bring unparalleled knowledge & specialized skills.',
  },
  {
    title: 'Full stack developer',
    body: 'Partnering with visionary clients who push boundaries.',
  },
  {
    title: 'DevOps',
    body: 'Committed to streamlined processes & efficient delivery.',
  },
  {
    title: 'Quality assurance (QA)',
    body: 'To establish robust quality processes & eliminate bugs.',
  },
  {
    title: 'Product design',
    body: 'To revamp the user experience, innovative Mobile Application.',
  },
  {
    title: 'Go-to-market strategy',
    body: 'To ensure smooth project delivery and successful adoption.',
  },
]

/** Node 3932:17122. Seven outcomes, in the artboard's reading order. */
const IMPACT = [
  {
    claim: '43% reduction in infrastructure costs',
    body: 'Monthly cloud spend fell from about $7,000 to about $4,000 through right-sizing, query optimization, and caching.',
  },
  {
    claim: '70% faster database queries',
    body: 'Response times went from 200 to 300 milliseconds down to 80 milliseconds.',
  },
  {
    claim: '$16M+ processed in one month',
    body: 'The platform handled real volume at a 98% card utilization rate.',
  },
  {
    claim: 'Customer issues dropped ~60% → 4%',
    body: 'Better product quality and clearer UX removed the reasons people were contacting support.',
  },
  {
    claim: 'Mobile app rating jumped from 2 → 4.8',
    body: 'Reliability, performance, and a cleaner interface.',
  },
  {
    claim: 'User base growth: 23K → 40K',
    body: 'Scaling continued without the cost and stability problems of the legacy system.',
  },
  {
    claim: 'Team scalability: from 2 → 10 experts',
    body: 'Sprint goal completion reached 90 to 95%, making the schedule predictable.',
  },
]

export function FerryPayPage() {
  return (
    <CaseStudyPage
      testimonial={{
        quote:
          '“Type B offers customers a comprehensive team and exceptional value. There’s a significant turnkey capability that Type B brings to engagements.”',
        name: 'Fauad Sheriff',
        role: 'CEO, Class.fi',
      }}
    >
      <CaseHero
        sector="Fintech"
        name="Ferry Pay"
        claim="Daily payout on autopilot mode."
        /*
          The board's own copy, verbatim — node 3932:17301. An earlier pass
          authored a stand-in because the note asked for a description without
          supplying one; the file was rebuilt the same afternoon and now carries
          the real thing, so the stand-in is gone.
        */
        description="Ferry, a leading payroll platform for the hospitality industry, was facing critical roadblocks that threatened its growth. Their existing system was struggling with a fragmented and insecure legacy codebase that created technical bottlenecks. This instability was costly, driving infrastructure expenses to an average of $7,000/mo."
        stats={STATS}
        image="/images/case/hero.jpg"
        imageAlt="A Ferry Pay transaction detail screen on a phone, held in both hands at a desk"
      />

      <Statement>
        Ferry, a payroll and tipping platform for the hospitality industry, was facing critical
        roadblocks that threatened its growth. Its existing system was a fragmented, insecure legacy
        codebase assembled by multiple teams over time, creating technical bottlenecks. The
        instability was costly, driving infrastructure spending to roughly $7,000 per month, and the
        company had a payroll product to launch against investor expectations with two engineers on
        staff.
      </Statement>

      <CaseGallery
        images={[
          {
            src: '/images/case/gallery-1.jpg',
            alt: 'A customer moving money in the Ferry Pay app at a café counter',
          },
          {
            src: '/images/case/gallery-2.jpg',
            alt: 'The Ferry Pay Express Pay balance and pay-period summary on a phone',
          },
        ]}
      />

      <CaseChallenge
        eyebrow="The challenge"
        heading="The impact on the UX was severe"
        points={CHALLENGE}
      />

      <CaseBand
        image="/images/case/band-solution.jpg"
        alt="The Ferry Pay card details screen on a phone, on a desk in afternoon light"
      />

      <CaseSolution
        eyebrow="The solution"
        heading="Deploying a dedicated, expert team."
        body="Type B embedded a dedicated team and scaled engineering from two people to ten, with playbooks, sprint cadence, QA cycles, and deployment protocols introduced as the team grew."
        roles={ROLES}
      />

      <CaseBand
        image="/images/case/band-impact.jpg"
        alt="Cash back earned in the Ferry Pay app, on a phone propped on a desk"
        ratio="1440/804"
      />

      <CaseImpact
        eyebrow="Our impact"
        heading="The partnership delivered transformative outcomes."
        outcomes={IMPACT}
      />

      {/*
        ⚠ Its OWN image since 2026-09-21. This slot used to borrow
        `/images/services/product-hero.jpg`, which six other pages also
        draw — updating Ferry from the artboard would have changed all of
        them, so the new frame (node 4008:2576) is a Ferry-specific file.
      */}
      <CaseFigure
        image="/images/case/ferry-figure.jpg"
        alt="The Ferry Pay account balance and latest transactions, on a phone on a marble desk"
      />
    </CaseStudyPage>
  )
}

export default FerryPayPage
