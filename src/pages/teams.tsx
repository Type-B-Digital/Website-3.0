import { Link } from 'react-router-dom'
import { Button } from '@/components'
import {
  CapabilityGrid,
  ContentPage,
  FeaturedCase,
  IdealCustomerProfiles,
  LevelsList,
  Packaging,
  RelatedServices,
  ServiceHero,
} from '@/components/sections'
import { CAPABILITIES, TIERS, related } from './service-content'

/**
 * Teams — Figma node 3149:7942
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3149-7942
 *
 * The shortest of the three. No engagement-step row and no Sovereign AI cards;
 * the vetting list carries the weight instead, at seven rows against Product's
 * five, with an intro column beside it.
 */

const PROFILES = [
  {
    title: 'The raise outran the team',
    points: ['Pod starter', 'Embedded senior engineers', 'Fractional delivery lead'],
    body: 'The round closed against a roadmap that needs more senior engineers than you can hire in a quarter, and the dates were promised to a board.',
    roles: ['CTO', 'VP Engineering', 'Non-technical repeat founder'],
  },
  {
    title: 'Roles will not fill',
    points: ['Capacity bridge', 'Delivery pod', 'Staged handover as your hires land'],
    body: 'Hiring for four senior engineer roles, takes two to three quarters; the roadmap does not wait. We stand down as your people arrive.',
    roles: ['VP Engineering', 'Head of Talent', 'Hiring Manager'],
  },
  {
    title: 'Operators planning build-operate-transfer',
    points: [
      'Managed delivery squad',
      'Documented delivery process',
      'Knowledge transfer',
      'In-house transition',
    ],
    body: 'You want the capability in-house eventually, without the twelve-month hiring gap in between. Stand it up with us, then take it.',
    roles: ['COO', 'CTO', 'CFO'],
  },
  {
    title: 'Regulated teams needing AI-fluent capacity',
    points: [
      'Applied-AI engineers',
      'Governed agentic SDLC',
      'Evals and guardrails',
      'Embedded model',
    ],
    body: 'You have the roadmap and the constraints; you need people who have shipped inside them before.',
    roles: ['CTO', 'Head of data', 'Product lead'],
  },
]

/** Seven rows here — node 3605:2768. */
const LEVELS = [
  { number: '01', label: 'Source' },
  { number: '02', label: 'Screen' },
  { number: '03', label: 'Technical Assessment' },
  { number: '04', label: 'Technical Interview' },
  { number: '05', label: 'Client Interview' },
  { number: '06', label: 'Contract' },
  { number: '07', label: 'Onboard & Manage' },
]

/** ⚠ Answers are placeholders — the artboard draws every row collapsed. */
const FAQ = [
  {
    question: 'How does Type B’s staffing model work?',
    answer:
      'We source, screen, assess, and actively manage senior engineering, design, and data talent, with a North America-based lead who owns the outcome. You get a managed team, not a list of résumés. Placeholder copy pending final wording.',
  },
  {
    question: 'How is this different from a talent marketplace like Toptal?',
    answer:
      'A marketplace hands you a match and steps back. We stay accountable for the output for the life of the engagement: performance management, delivery process, and a lead who answers for the work. Placeholder copy pending final wording.',
  },
  {
    question: 'How fast can a team start?',
    answer:
      'A pod starter can be in place in weeks rather than the two to three quarters four senior hires usually take. We stand down as your own people arrive. Placeholder copy pending final wording.',
  },
  {
    question: 'What if we plan to hire internally?',
    answer:
      'That is the point of build-operate-transfer. We stand the capability up, document the delivery process, and hand it over — the staged handover is planned from the start, not negotiated at the end. Placeholder copy pending final wording.',
  },
  {
    question: 'Where are the engineers based?',
    answer:
      'Across our global bench, working to your core hours, with a North America-based delivery lead who owns the outcome. Placeholder copy pending final wording.',
  },
  {
    question: 'What is build-operate-transfer?',
    answer:
      'We build the team, operate it against your roadmap, then transfer it in-house once it is running — capability without the twelve-month hiring gap in between. Placeholder copy pending final wording.',
  },
]

export function TeamsPage() {
  return (
    <ContentPage
      faq={FAQ}
      testimonial={{
        quote:
          '“Type B’s professionalism and ability to work with limited supervision from my side were most impressive.”',
        name: 'Fauad Sheriff',
        role: 'CEO, Class.fi',
      }}
    >
      <ServiceHero
        eyebrow="Teams"
        heading="Senior teams, managed end to end"
        body="We source, screen, assess, and actively manage senior engineering, design, and data talent who ship with agents day to day, with a North America-based lead who owns the outcome, and build-operate-transfer for when you are ready to bring the team in-house."
        image="/images/services/product-hero.jpg"
        cta={
          <Button as={Link} to="/contact" variant="secondary" tone="onLight">
            Start with a pod starter
          </Button>
        }
      />

      <IdealCustomerProfiles profiles={PROFILES} />

      <CapabilityGrid
        eyebrow="We put AI to work"
        heading="How AI is embedded and what you get from us."
        capabilities={CAPABILITIES}
      />

      <LevelsList
        heading="How do we vet and manage our engineers?"
        intro="The seventh step is the one most vendors skip. We onboard the team, manage their performance, and stay accountable for their output for the life of the engagement."
        levels={LEVELS}
      />

      <Packaging tiers={TIERS} />

      <RelatedServices
        services={related(
          ['advisory', 'Fractional leadership and the roadmap the pod executes against.'],
          ['product', 'We build the agents, products, and governance around them.'],
          ['proptech', 'Where managed delivery ops turned around a scaling product.'],
        )}
      />

      <FeaturedCase
        name="Ferry Pay"
        claim="Daily payout on autopilot mode."
        body="We embedded a managed team, scaled engineering from two people to ten with playbooks and QA cycles, re-architected the platform, overhauled the UX, and launched the payroll product within six months. Infrastructure cost fell 43%, database queries went from 300ms to 80ms, the app rating climbed to 4.8, and support contacts fell to 4%. Partnering since 2023."
        image="/images/services/product-featured.jpg"
      />
    </ContentPage>
  )
}

export default TeamsPage
