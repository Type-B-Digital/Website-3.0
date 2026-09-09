import { Link } from 'react-router-dom'
import { Button } from '@/components'
import {
  CapabilityGrid,
  ContentPage,
  EngagementSteps,
  FeaturedCase,
  IdealCustomerProfiles,
  LevelsList,
  Packaging,
  RelatedServices,
  ServiceHero,
  StaggeredCards,
} from '@/components/sections'
import { CAPABILITIES, TIERS, related } from './service-content'

/**
 * Product & AI Development — Figma node 3141:2722
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3141-2722
 *
 * The first of the three service pages, and the one the artboard draws in
 * full. Everything structural lives in `@/components/sections`; this file is the
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
    points: [
      'Discovery & Prototype',
      'MVP build',
      'Brand and marketing site',
      'AI features in the product',
    ],
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
    <ContentPage
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
          <Button as={Link} to="/contact" variant="secondary" tone="onLight">
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
        eyebrowTone="cream"
        heading="Our specialty for data ownership & control"
        intro="Sovereign AI runs inside your organization: your jurisdiction, your cloud or data center, your controls, with a full audit trail and no dependency on someone else’s black box."
        cards={SOVEREIGN}
        footnote="We warrant conformance to the controls we agree in writing. Your compliance officer owns the compliance determination for HIPAA, PHIPA and PIPEDA, SOC 2, financial services regimes, or a UAE control mapping."
      />

      <Packaging tiers={TIERS} />

      {/*
        ⚠ The artboard's Related row on this page is a copy of Advisory's and
        lists Product & AI Development — i.e. this page — as the first card.
        Swapped for Advisory, which is what the row plainly means; the other
        two cards and their copy are the artboard's.
      */}
      <RelatedServices
        services={related(
          ['advisory', 'Fractional leadership and the roadmap the build executes against.'],
          ['teams', 'We embed senior pods managed by us, in weeks.'],
          ['financial', 'Where our diligence and governance work lands often.'],
        )}
      />

      <FeaturedCase
        name="Class.fi"
        claim="Hours of expert research, answered in seconds."
        body="We delivered an audit of the existing platform, a roadmap to the desired end state, the brand, marketing site, product UX, and AI integration. The beta launched with real users signing up and giving raving feedback."
        image="/images/services/product-featured.jpg"
      />
    </ContentPage>
  )
}

export default ProductDevelopmentPage
