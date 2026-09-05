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

/** The first three of Culture's set — node 3707:10938. */
const STATS = [
  { value: '100', label: 'Cumulative years of experience' },
  { value: '30+', label: 'Global team members' },
  { value: '25+', label: 'Global customers served' },
]

/** Node 2887:7176. */
const CHALLENGE = [
  {
    title: 'High Issue Rate',
    body: 'Six of every ten customer interactions were support requests tied to bugs or usability problems, and the support team was overwhelmed.',
  },
  {
    title: 'Low Satisfaction',
    body: 'The mobile app sat at 2.0 stars, a critical liability for a product whose whole promise is that getting paid is easy.',
  },
  {
    title: 'Scaling Limitations',
    body: 'Database queries ran 200 to 300 milliseconds, infrastructure cost was climbing with no optimization path, and the go-to-market timeline was slipping.',
  },
]

/** Nodes 2887:7199 and 2887:7209 — two rows of three. */
const ROLES = [
  {
    title: 'Fractional CTO',
    body: 'We bring unparalleled knowledge & specialized skills.',
  },
  {
    title: 'Full Stack Developer',
    body: 'Partnering with visionary clients who push boundaries.',
  },
  {
    title: 'DevOps',
    body: 'Committed to streamlined processes & efficient delivery.',
  },
  {
    title: 'Quality Assurance (QA)',
    body: 'To establish robust quality processes & eliminate bugs.',
  },
  {
    title: 'Product Design',
    body: 'To revamp the user experience, innovative Mobile Application.',
  },
  {
    title: 'Go-To-Market Strategy',
    body: 'To ensure smooth project delivery and successful adoption.',
  },
]

/** Node 2887:7219. Seven outcomes, in the artboard's reading order. */
const IMPACT = [
  {
    claim: '43% Reduction in Infrastructure Costs',
    body: 'Monthly cloud spend fell from about $7,000 to about $4,000 through right-sizing, query optimization, and caching.',
  },
  {
    claim: '70% Faster Database Queries',
    body: 'Response times went from 200 to 300 milliseconds down to 80 milliseconds.',
  },
  {
    claim: '$16M+ Processed in One Month',
    body: 'The platform handled real volume at a 98% card utilization rate.',
  },
  {
    claim: 'Customer Issues Dropped ~60% → 4%',
    body: 'Better product quality and clearer UX removed the reasons people were contacting support.',
  },
  {
    claim: 'Mobile App Rating Jumped from 2 → 4.8',
    body: 'Reliability, performance, and a cleaner interface.',
  },
  {
    claim: 'User Base Growth: 23K → 40K',
    body: 'Scaling continued without the cost and stability problems of the legacy system.',
  },
  {
    claim: 'Team Scalability: From 2 → 10 Experts',
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
        stats={STATS}
        image="/images/case/hero.jpg"
        imageAlt="The Ferry Pay payroll app on a phone, held in one hand"
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
          { src: '/images/case/gallery-1.jpg', alt: 'Ferry Pay transaction detail screens' },
          { src: '/images/case/gallery-2.jpg', alt: 'Ferry Pay payout and earnings screens' },
        ]}
      />

      <CaseChallenge
        eyebrow="The challenge"
        heading="The impact on the UX was severe"
        points={CHALLENGE}
      />

      <CaseBand
        image="/images/case/band-solution.jpg"
        alt="A hospitality worker checking a payout on their phone"
      />

      <CaseSolution
        eyebrow="The solution"
        heading="Deploying a dedicated, expert team."
        body="Type B embedded a dedicated team and scaled engineering from two people to ten, with playbooks, sprint cadence, QA cycles, and deployment protocols introduced as the team grew."
        roles={ROLES}
      />

      <CaseBand
        image="/images/case/band-impact.jpg"
        alt="The Ferry Pay team reviewing the rebuilt platform"
        ratio="1440/804"
      />

      <CaseImpact
        eyebrow="Our impact"
        heading="The partnership delivered transformative outcomes."
        outcomes={IMPACT}
      />

      <CaseFigure
        image="/images/services/product-hero.jpg"
        alt="The rebuilt Ferry Pay platform across devices"
      />
    </CaseStudyPage>
  )
}

export default FerryPayPage
