import { Link } from 'react-router-dom'
import { Button } from '@/components'
import {
  CapabilityGrid,
  ContentPage,
  EngagementSteps,
  FeaturedCase,
  IdealCustomerProfiles,
  Packaging,
  RelatedServices,
  ServiceHero,
} from '@/components/sections'
import { gradients } from '@/tokens'
import { CAPABILITIES, TIERS, related } from './service-content'

/**
 * Advisory — Figma node 2910:15211
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2910-15211
 *
 * Same shell as Product & AI Development, minus the Levels list and the
 * Sovereign AI cards, and with a four-step engagement row instead of three.
 *
 * ── Colour ───────────────────────────────────────────────────────────────
 *
 * Its own ground and its own hero chip, read off the artboard rather than
 * taking `ContentPage`'s shared default:
 *
 *   ground          -53deg turquoise.100 -> neutral.50 -> orange.100  frame fill
 *   hero chip       orange.500 #FF5315 + ink text  (`ember`)          3605:1488
 *   packaging chip  white                                             3605:1804
 *
 * The run is cool to warm — the reverse of Teams, which is warm end to end —
 * and it is the only one of the three drawn at -53deg rather than -49deg.
 *
 * ⚠ Unlike Teams, the values band here stays turquoise.300 (`#709BA0`, node
 * 3605:1786), which is what `deep` already resolves to. So this page is warm at
 * the hero and cool at the foot, and only the two chips move. Nothing else on
 * the artboard leaves the default accent.
 */

const PROFILES = [
  {
    title: 'Regulated mid-market under an AI mandate',
    points: [
      'AI strategy and roadmap',
      'Use-case scoring',
      'AI governance and policy',
      'Transformation PMO',
    ],
    body: 'The board or the regulator has asked for an AI plan and nobody internally owns it yet. You need a roadmap your compliance officer can sign, not a vendor demo.',
    roles: ['CEO', 'COO', 'Department Head', 'Transformation or Ops. Lead'],
  },
  {
    title: 'The blocked security review',
    points: [
      'Sovereign readiness review',
      'Data-estate and control gap assessment',
      'Shadow-AI audit',
      'Architecture triage',
    ],
    body: 'The use case was obvious, the tool was ready, and your security team said no. They were right. We start with them in the room; not sell around them.',
    roles: ['CISO', 'Head of Risk', 'Privacy or Legal Counsel'],
  },
  {
    title: 'PE and VC deal teams, pre-close',
    points: [
      'Technology due diligence',
      'Code and architecture review',
      'Team and key-person risk',
      'AI exposure assessment',
    ],
    body: 'You need an independent read on the target’s technology, team, and cost before you sign, written by engineers who read the code, delivered in deal time.',
    roles: ['Data Lead', 'Operating Partner', 'Investment Committee'],
  },
  {
    title: 'Portfolio operators, post-close',
    points: [
      '90-day roadmap',
      'Integration Planning',
      'Modernization Sequencing',
      'Fractional technology leadership',
    ],
    body: 'The deal closed and the diligence findings need to become a plan someone executes. Most providers hand you a report and leave.',
    roles: ['Operating Partner', 'Portfolio CTO', 'Newly Installed Executive'],
  },
  {
    title: 'Scale-ups needing a second opinion',
    points: [
      'Architecture audit',
      'Modernization roadmap',
      'Build-vs-buy analysis',
      'Delivery maturity review',
    ],
    body: 'The platform is slowing down, the architecture decisions are contested, or engineering leadership just left. You want a senior, neutral read before committing budget.',
    roles: ['CTO', 'VP Engineering', 'Founder'],
  },
  {
    title: 'Leadership installing an operating model',
    points: [
      'Transformation PMO',
      'Change Management',
      'Operating Model Design',
      'Fractional Head of AI',
    ],
    body: 'Adoption is the gap. You need documented requirements, a decision log, weekly written status, and someone accountable for the change actually landing.',
    roles: ['CEO', 'COO', 'Board', 'Newly Hired (CIO, CDO, & CISO)'],
  },
]

/** Four stages here, against three on the Product page. Node 3605:1696. */
const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    body: 'Data estate, workflows, shadow-AI audit, control gaps.',
  },
  {
    number: '02',
    title: 'Solution Design',
    body: 'Architecture triage across standard cloud and sovereign, sequencing, effort.',
  },
  {
    number: '03',
    title: 'Implementation',
    body: 'Where we execute, governed delivery with weekly written status.',
  },
  {
    number: '04',
    title: 'Launch & Support',
    body: 'Adoption, PMO cadence, the evidence pack.',
  },
]

/** ⚠ Answers are placeholders — the artboard draws every row collapsed. */
const FAQ = [
  {
    question: 'What does Type B’s advisory service include?',
    answer:
      'AI strategy and roadmaps, technology due diligence for M&A and investment, and the change management that makes a transformation stick. Everything we recommend is something our own delivery teams could build. Placeholder copy pending final wording.',
  },
  {
    question: 'What is a Framing Workshop?',
    answer:
      'A half-day to one-day working session with your leadership and the people closest to the problem. We diverge on the problem before converging on the plan, and you leave with a one-page problem map and a scored shortlist either way. Placeholder copy pending final wording.',
  },
  {
    question: 'What does a technology due diligence report contain?',
    answer:
      'An independent read on the target’s technology, team, and cost: code and architecture review, team and key-person risk, and AI exposure — written by engineers who read the code, delivered in deal time. Placeholder copy pending final wording.',
  },
  {
    question: 'How long does an architecture audit take?',
    answer:
      'Two weeks at a fixed scope. You get an honest technical read and a plan you can execute, whether or not we are the ones who execute it. Placeholder copy pending final wording.',
  },
  {
    question: 'Can Type B execute the plan after the diligence?',
    answer:
      'Yes, and that is the point of the advice being honest: everything we recommend is something our own delivery teams could build. Most providers hand you a report and leave. Placeholder copy pending final wording.',
  },
  {
    question: 'What is fractional leadership?',
    answer:
      'A senior technology or AI leader installed part-time to own the operating model, the decision log, and the weekly cadence until your own team can carry it. Placeholder copy pending final wording.',
  },
]

export function AdvisoryPage() {
  return (
    <ContentPage
      faq={FAQ}
      ground={{ backgroundImage: gradients.service.advisory }}
      testimonial={{
        quote:
          '“Type B’s professionalism and ability to work with limited supervision from my side were most impressive.”',
        name: 'Fauad Sheriff',
        role: 'CEO, Class.fi',
      }}
    >
      <ServiceHero
        eyebrow="Advisory"
        eyebrowTone="ember"
        heading="Clarity and the right plan before you build"
        body="AI strategy and roadmaps, technology due diligence for M&A and investment, and the change management that makes a transformation stick. Everything we recommend is something our own delivery teams could build, which keeps the advice honest."
        image="/images/services/product-hero.jpg"
        cta={
          <Button as={Link} to="/contact" variant="secondary" tone="onLight">
            Start with an architecture audit
          </Button>
        }
      />

      <IdealCustomerProfiles profiles={PROFILES} />

      <CapabilityGrid
        eyebrow="We put AI to work"
        heading="How AI is embedded and what you get from us."
        capabilities={CAPABILITIES}
      />

      <EngagementSteps
        heading="How does an advisory engagement with Type B start?"
        intro="Every engagement opens with a Framing Workshop: a half-day to one-day working session with your leadership and the people closest to the problem. We diverge on the problem before we converge on the plan, using the design-thinking method our practice is built on. You leave with an artifact you keep either way: a one-page problem map and a scored shortlist of what is worth doing."
        steps={STEPS}
        footnote="The roadmap scores every use case across both architectures, what should ship as standard cloud AI (faster and cheaper, and most use cases land here) and what genuinely requires the sovereign treatment we specialize in. Telling those apart is itself a deliverable, and it is where most AI budgets are quietly wasted."
      />

      <Packaging tiers={TIERS} eyebrowTone="cream" />

      <RelatedServices
        services={related(
          ['product', 'We build the agents, products, and governance around them.'],
          ['teams', 'We embed senior pods managed by us, in weeks.'],
          ['financial', 'Where our diligence and governance work lands often.'],
        )}
      />

      <FeaturedCase
        name="EventBook"
        claim="An audit that became a build."
        body="We delivered an audit of the existing platform, a roadmap to the desired end state, the brand, marketing site, product UX, and AI integration. The beta launched with real users signing up and giving raving feedback."
        image="/images/services/product-featured.jpg"
      />
    </ContentPage>
  )
}

export default AdvisoryPage
