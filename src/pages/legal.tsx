import {
  ContentPage,
  EngagementSteps,
  IdealCustomerProfiles,
  IndustryHero,
  LevelsList,
  Packaging,
  RelatedServices,
  SplitFeature,
  StatBand,
  Statement,
} from '@/components/sections'
import { colors as colorTokens, gradients } from '@/tokens'
import { TIERS, related } from './service-content'
import { INDUSTRY_STEPS, SOVEREIGN_FAQ } from './industry-content'

/**
 * Legal & Professional Services — Figma node 3245:17241
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3245-17241
 *
 * ⚠ As on Real Estate, all six profile blocks carry the same capability list,
 * the same situation paragraph, and the same four role chips — only the titles
 * differ. Reproduced as drawn; flagged in docs/BUILD_LOG.md.
 */

/** b6 mirrored — node 3614:8588, style "Type B BG 6" inside a horizontal flip. */
const HERO_GRADIENT = gradients.hero.legal

/*
  ⚠ A shared ROLES constant used to sit here — "Managing Partner, COO, General
  Counsel, IT & Security Lead", the artboard's list, on all six profiles. (The
  artboard spells it "General Council".) It is gone: a corporate legal
  department has no managing partner, and a legal-tech ISV has no partners at
  all, so one list across six segments was part of what made this section read
  as the same row six times. Each profile names its own below.
*/

/**
 * Ideal Customer Profiles — Figma node 3614:8798.
 *
 * ⚠ REWRITTEN 2026-09-15. Like Real Estate, all six of these rendered the
 * identical "AI mandate" block under six different headings, with one shared
 * roles list — so the section told a reader that a law firm, an audit practice,
 * and a legal-tech vendor all arrive with the same problem and the same buyer.
 *
 * Each row now names what is specific to it: privilege and attorney
 * supervision for a firm, independence rules for an audit practice, client-data
 * segregation for a consultancy, defensibility for litigation support. Those
 * are the terms this page should be found on. See healthcare.tsx for the three
 * AEO/GEO rules the five industry pages follow.
 */
const PROFILES = [
  {
    title: 'Mid-market law firms',
    points: [
      'Privilege and confidentiality review',
      'Matter-scoped document AI',
      'AI use policy and attorney supervision rules',
      'Use-case scoring',
    ],
    body: 'Your associates are already using AI and your partners do not know which tools, or on whose matters. Privilege does not survive a consumer chatbot’s terms of service, and that is a conversation to have before the malpractice carrier has it with you.',
    roles: ['Managing Partner', 'General Counsel', 'CIO', 'Director of Practice Innovation'],
  },
  {
    title: 'In-house legal departments',
    points: [
      'Contract review and abstraction',
      'Playbook-driven redlining',
      'Intake and triage automation',
      'Vendor AI due diligence',
    ],
    body: 'You are the bottleneck on every commercial deal and the team has not grown in three years. First-pass review is the work that should never have needed a lawyer, and it is most of the queue.',
    roles: ['General Counsel', 'Deputy General Counsel', 'Head of Legal Operations', 'CFO'],
  },
  {
    title: 'Accounting and audit firms',
    points: [
      'Workpaper and source-document extraction',
      'Independence and confidentiality controls',
      'Engagement-quality analytics',
      'AI governance and policy',
    ],
    body: 'Busy season is a staffing problem you solve by hiring people who are not there to hire. Independence rules mean the tool that fixes it has to be one you control, not one your client’s vendor runs.',
    roles: ['Managing Partner', 'Chief Risk Officer', 'CIO', 'Director of Audit Quality'],
  },
  {
    title: 'Consulting and advisory practices',
    points: [
      'Grounded search over your own IP',
      'Proposal and deliverable drafting guardrails',
      'Client-data segregation design',
      'Operating model design',
    ],
    body: 'Your value is the firm’s accumulated judgement and it is sitting in ten thousand decks nobody can find. Making that searchable without one client’s material surfacing inside another client’s deliverable is the entire problem.',
    roles: ['Managing Partner', 'COO', 'CIO', 'Head of Knowledge Management'],
  },
  {
    title: 'Legal-tech ISVs',
    points: [
      'Architecture and scalability audit',
      'SOC 2 readiness',
      'Governed model gateway',
      'Independent AI assurance',
    ],
    body: 'Law firms are running security reviews on you that assume you are a bank, and every one of them asks where the model runs and what it was trained on. That answer has to be a document, not a call.',
    roles: ['CTO', 'VP Engineering', 'Head of Security', 'Founder'],
  },
  {
    title: 'Claims and litigation support operations',
    points: [
      'Discovery and records extraction at volume',
      'Chain of custody and audit trail',
      'Exception routing and QC sampling',
      'Transformation PMO',
    ],
    body: 'Volume is the business and defensibility is the constraint: every automated step has to be explainable to opposing counsel two years after the person who ran it has left.',
    roles: ['COO', 'VP Operations', 'General Counsel', 'Director of Discovery'],
  },
]

/** Node 3614:8763. */
const LEVELS = [
  { number: '01', label: 'Intake and client-query agents behind a review gate' },
  { number: '02', label: 'Autonomous conflicts and docketing checks' },
  { number: '03', label: 'Workflow automation across intake, conflicts, and matter opening' },
  { number: '04', label: 'Document review and extraction with citation checking' },
  { number: '05', label: 'Practice and profitability analytics' },
  { number: '06', label: 'Grounded research over your own precedents and matter files' },
]

/** Node 3614:8890. */
const STATS = [
  {
    value: '0s',
    body: 'Class.fi solves the same shape of problem (expert research burned into billable hours, answered in seconds with verifiable sources) in trade compliance',
  },
  {
    value: '100%',
    body: 'RFL Wealth shows the professional-services operations pattern, with seven tools consolidated, 60+ hours saved per client, and 100% staff adoption.',
  },
]

/** ⚠ Answers are placeholders — the artboard draws every row collapsed. */
const FAQ = [
  {
    question: 'Can law firms use AI without risking privilege?',
    answer:
      'Only with confidentiality by architecture. Privilege has no non-sensitive tier, so anything touching matter files, client data, or work product gets the sovereign build: your tenancy, your controls, nothing training a third-party model. Placeholder copy pending final wording.',
  },
  {
    question: 'How do you prevent hallucinated citations?',
    answer:
      'Answers are grounded in sources a professional can verify, with citation checking in the pipeline and a human gate before anything leaves the firm. A hallucinated citation is a sanction, so it is treated as a correctness requirement, not a quality nicety. Placeholder copy pending final wording.',
  },
  {
    question: 'What is a Framing Workshop?',
    answer:
      'A half-day to one-day working session with your leadership and the people closest to the problem. You leave with a one-page problem map and a scored shortlist of what is worth doing, either way. Placeholder copy pending final wording.',
  },
  {
    question: 'Do you replace associates?',
    answer:
      'No. The work is judgment applied to documents; we accelerate the document half so the judgment half is where the hours go. Placeholder copy pending final wording.',
  },
  {
    question: 'Can you work with our practice management system?',
    answer:
      'Yes — intake, conflicts, and matter opening are exactly the workflows we automate around an existing system rather than replacing it. Placeholder copy pending final wording.',
  },
  SOVEREIGN_FAQ,
]

export function LegalPage() {
  return (
    <ContentPage faq={FAQ} ground={{ backgroundColor: colorTokens.background.surface }}>
      <IndustryHero
        heading="AI for legal professional services"
        body="Type B builds AI for legal and professional services firms with the two constraints the profession cannot compromise built in: confidentiality by architecture, and answers grounded in sources a professional can verify."
        gradient={HERO_GRADIENT}
      />

      <Statement>
        The work is judgment applied to documents, and both are expensive. Research, review,
        drafting, and intake burn billable hours on tasks AI can accelerate, but a hallucinated
        citation is not an inconvenience in this profession; it is a sanction. Privilege and client
        confidentiality mean most public AI tools are unusable as built, and your clients’
        engagement letters increasingly say so explicitly.
      </Statement>

      <IdealCustomerProfiles profiles={PROFILES} />

      {/* ⚠ The artboard's heading here still reads "financial services". */}
      <LevelsList
        heading="How we frame legal services"
        image="/images/services/product.png"
        levels={LEVELS}
      />

      <EngagementSteps heading="How we work here" steps={INDUSTRY_STEPS} />

      <SplitFeature
        reverse
        headingLevel="h2"
        heading="What can AI do for legal professional services"
        body="In legal the constraint is close to constant, because privilege does not have a non-sensitive tier. Firm-wide knowledge tools over public materials can run on standard cloud AI; anything touching matter files, client data, or work product gets the sovereign build, which is our specialty."
        image="/images/services/product-featured.jpg"
      />

      <StatBand heading="Why Type B fits here" stats={STATS} />

      <Packaging tiers={TIERS} />

      {/* The artboard draws only two cards here — nodes 3614:8900 / 8905. */}
      <RelatedServices
        services={related(
          ['advisory', 'Fractional leadership and the roadmap the pod executes against.'],
          ['product', 'We build the agents, products, and governance around them.'],
        )}
      />

      {/*
        ⚠ Claim and paragraph both read "Details needed here." on the artboard.
        Left as drawn rather than invented.
      */}
      <SplitFeature
        eyebrow="Featured"
        headingLevel="h2"
        heading="RFL Wealth"
        claim="Details needed here."
        body="Details needed here."
        image="/images/services/product-featured.jpg"
      />
    </ContentPage>
  )
}

export default LegalPage
