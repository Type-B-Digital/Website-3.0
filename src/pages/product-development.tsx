import { Button } from '@/components'
import {
  CapabilityGrid,
  EngagementSteps,
  FeaturedCase,
  IdealCustomerProfiles,
  LevelsList,
  Packaging,
  RelatedServices,
  ServiceHero,
  ServicePage,
  StaggeredCards,
} from '@/components/service'

/**
 * Product & AI Development — Figma node 3141:2722
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3141-2722
 *
 * The first of the three service pages, and the one the artboard draws in
 * full. Everything structural lives in `@/components/service`; this file is the
 * content.
 */

const PROFILES = [
  {
    title: 'Regulated mid-market with document-heavy workflows',
    points: [
      'AI Assessment',
      'Guardrails and governed model access',
      'Document AI',
      'Sovereign AI platform build',
    ],
    body: 'Prior authorization, claims, intake, and compliance research are drowning your people, and the tools that would help cannot touch your data as they are built.',
    roles: ['CEO', 'COO', 'Department Head', 'CISO and compliance'],
  },
  {
    title: 'Payers, TPAs, and revenue-cycle operators',
    points: [
      'Document extraction pipelines',
      'Exception routing',
      'Human-in-the-loop review design',
      'Analytics with lineage',
    ],
    body: 'The ROI is obvious and the volume is enormous, which is exactly why the architecture and the audit trail have to be right the first time.',
    roles: ['VP Operations', 'Head of Claims', 'Revenue-Cycle Director'],
  },
  {
    title: 'Funded founders needing an investor-ready build',
    points: ['Discovery & Prototype', 'MVP build', 'Brand and marketing site', 'AI features in the product'],
    body: 'The round closed against a roadmap and the next board meeting has a date on it. You need something real, not a deck.',
    roles: ['Non-Technical Repeat Founder', 'CEO', 'First Product Hire'],
  },
  {
    title: 'Scale-up CTOs rebuilding a legacy platform',
    points: ['Re-architecture', 'Phased rebuild', 'CI/CD and SRE setup', 'AI added to augment'],
    body: 'The platform is roughly a decade old, releases carry risk, and technical debt is now a business constraint. You are buying an outcome we own.',
    roles: ['CTO', 'VP Engineering', 'Platform Lead'],
  },
  {
    title: 'Digital-health and fintech ISVs',
    points: [
      'Guardrails layer',
      'Governed model gateway',
      'Independent AI assurance',
      'Compliance-grade evidence pack',
    ],
    body: 'The platform is slowing down, the architecture decisions are contested, or engineering leadership just left. You want a senior, neutral read before committing budget.',
    roles: ['CTO', 'VP Engineering', 'Founder'],
  },
  {
    title: 'Operational businesses digitizing off spreadsheets',
    points: [
      'Process mapping',
      'Purpose-built ERP or internal tools',
      'Workflow automation',
      'Training and adoption',
    ],
    body: 'Paper cards, Excel, and one veteran employee as the only documentation. It works until you try to grow.',
    roles: ['CEO', 'COO', 'Board', 'Plant Ops. Manager'],
  },
]

const CAPABILITIES = [
  {
    title: 'Conversational & Voice',
    body: 'We assess where agents would carry real customer or internal conversations, and what your content and data would need to be for them to be accurate. Scored on volume, sensitivity, and containment potential.',
  },
  {
    title: 'Autonomous Agents',
    body: 'We identify the workflows where an agent should take action across your tools rather than answer questions, and where a human gate belongs. Scored on decision reversibility and audit requirements.',
  },
  {
    title: 'Search & RAG',
    body: 'We scope grounded answers over your own knowledge, leveraging repositories clean enough to ground on. The output is a scored use-case roadmap, and every later phase quotes from it.',
  },
  {
    title: 'Document & Vision AI',
    body: 'We find the document queues that consume the most hours (intake, claims, compliance research, QC) and size the extraction opportunity against error tolerance.',
  },
  {
    title: 'Workflow Automation',
    body: 'We map the multi-step processes that could run end to end and the ones that should not, with the people who own each step in the room.',
  },
  {
    title: 'Analytics & Forecast',
    body: 'We assess whether your data foundations can support predictions everyone would trust, and what has to be true first in order to achieve it.',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Build',
    body: 'We ship it end to end, from use case to production; choose this if you need the thing built and want one team accountable.',
  },
  {
    number: '02',
    title: 'Embed',
    body: 'Agents generate, humans review, evals and guardrails at every gate; if you have a team and need velocity without losing control.',
  },
  {
    number: '03',
    title: 'Transform',
    body: 'A fractional AI leader installs the operating model so your own team ships with AI; when the real problem is that nobody owns AI yet.',
  },
]

const LEVELS = [
  { number: '01', label: 'Data Modeling' },
  { number: '02', label: 'Micro-Context Agents' },
  { number: '03', label: 'RAG' },
  { number: '04', label: 'Agents (Most Targeted)' },
  { number: '05', label: 'Fine-Tuning' },
]

const SOVEREIGN = [
  {
    title: 'Data residency',
    body: 'The model runs where the data legally lives: in-country, your own tenancy, or on-premises.',
  },
  {
    title: 'Full ownership',
    body: 'Code, pipelines, prompts, evals, and fine-tuned weights are yours; model-agnostic across OpenAI, Anthropic, Google, and open-source; no lock-in.',
  },
  {
    title: 'Auditable',
    body: 'Lineage, versioning, evals, and human-in-the-loop gates; we do not automate a decision we cannot explain.',
  },
  {
    title: 'No training on your data',
    body: 'Encryption and role-based access throughout, designed with your security team in the room.',
  },
]

const TIERS = [
  {
    title: 'Type B Digital',
    note: 'Build the agent workflows.',
    items: ['Advisory', 'Product & AI Development', 'Teams'],
    lead: true,
  },
  {
    title: 'Entry',
    note: 'Find out what is true, at a fixed scope.',
    items: ['Architecture Audit & Roadmap (2w)', 'AI Assessment or Discovery', 'Pod Starter'],
  },
  {
    title: 'Core',
    note: 'The working engagement most clients run.',
    items: ['Diligence & 90-Day Roadmap', 'Product Build or AI Safety Net', 'Delivery Pod (4 to 6 people)'],
  },
  {
    title: 'Expanded',
    note: 'A program we own with you.',
    items: ['Fractional Leadership', 'Sovereign AI Platform', 'Managed Delivery Squad (6+ people)'],
  },
]

const RELATED = [
  {
    title: 'Product & AI Development',
    body: 'We build the agents, products, and governance around them.',
    image: '/images/services/product.png',
  },
  {
    title: 'Teams',
    body: 'We embed senior pods managed by us, in weeks.',
    image: '/images/services/teams.png',
  },
  {
    title: 'Financial Services & Insurance',
    body: 'Where our diligence and governance work lands often.',
    image: '/images/services/advisory.png',
  },
]

/** ⚠ Answers are placeholders — the artboard draws every row collapsed. */
const FAQ = [
  {
    question: 'Who owns the code and the models?',
    answer:
      'You do — the code, the data, the prompts, the evals, and any fine-tuned weights. We are model-agnostic across OpenAI, Anthropic, Google and open-source, so nothing here is a lock-in. Placeholder copy pending final wording.',
  },
  {
    question: 'How do agents fit into your SDLC?',
    answer:
      'Agents draft code and tests inside the same pipeline your engineers use, and a senior engineer reviews everything and owns the architecture. Nothing reaches production without a human gate. Placeholder copy pending final wording.',
  },
  {
    question: 'What does an AI assessment produce?',
    answer:
      'A scored use-case roadmap: where AI would carry real work, what your data would need to be for it to be accurate, and what has to be true first. Every later phase quotes from it. Placeholder copy pending final wording.',
  },
  {
    question: 'Can you run inside our own cloud?',
    answer:
      'Yes. Sovereign AI runs in your jurisdiction, your cloud or data center, under your controls, with a full audit trail and no dependency on someone else’s black box. Placeholder copy pending final wording.',
  },
  {
    question: 'How long does a build take?',
    answer:
      'An Entry engagement is a fixed two weeks. A Core build is usually a quarter. Expanded programs run continuously with a squad we manage. Placeholder copy pending final wording.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We ship, then support and optimize for the long term — evals kept current, models re-benchmarked, and the operating model handed to your team if that is the goal. Placeholder copy pending final wording.',
  },
]

export function ProductDevelopmentPage() {
  return (
    <ServicePage
      faq={FAQ}
      testimonial={{
        quote:
          '“Type B offers customers a comprehensive team and exceptional value. There’s a significant turnkey capability that Type B brings to engagements.”',
        name: 'Fauad Sheriff',
        role: 'CEO, Class.fi',
      }}
    >
      <ServiceHero
        eyebrow="Product & AI Development"
        heading="AI that ships inside working products"
        body="Data-driven UX, engineering across web and mobile, and AI systems with guardrails around them. Agents draft code and test inside our SDLC; senior engineers review everything and own the architecture. You own the code, the data, and the IP."
        image="/images/services/product-hero.jpg"
        cta={
          <Button as="a" href="/contact" variant="secondary" tone="onLight">
            Start with an AI assessment or discovery
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
        steps={STEPS}
        footnote="Every engagement opens with a Framing Workshop, then runs the four stages: Discovery, Solution Design, Implementation, Launch & Support, with daily stand-ups, weekly status, and working software sprint by sprint."
      />

      <LevelsList heading="Levels of AI sophistication" levels={LEVELS} />

      <StaggeredCards
        eyebrow="Sovereign AI"
        eyebrowTone="white"
        heading="Our specialty for data ownership & control"
        intro="Sovereign AI runs inside your organization: your jurisdiction, your cloud or data center, your controls, with a full audit trail and no dependency on someone else’s black box."
        cards={SOVEREIGN}
        footnote="We warrant conformance to the controls we agree in writing. Your compliance officer owns the compliance determination for HIPAA, PHIPA and PIPEDA, SOC 2, financial services regimes, or a UAE control mapping."
      />

      <Packaging tiers={TIERS} />

      <RelatedServices services={RELATED} />

      <FeaturedCase
        name="Class.fi"
        claim="Hours of expert research, answered in seconds."
        body="We delivered an audit of the existing platform, a roadmap to the desired end state, the brand, marketing site, product UX, and AI integration. The beta launched with real users signing up and giving raving feedback."
        image="/images/services/product-featured.jpg"
      />
    </ServicePage>
  )
}

export default ProductDevelopmentPage
