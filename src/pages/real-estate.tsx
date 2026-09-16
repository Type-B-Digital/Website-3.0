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
 * Real Estate & PropTech — Figma node 3239:15314
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=3239-15314
 *
 * The one industry hero with light type: its band mirrors b4, whose ink end
 * lands top-left. Everything else follows the Financial Services template.
 *
 * ⚠ Every one of the six profile blocks on this artboard carries the same
 * capability list and the same situation paragraph — only the titles and the
 * role chips differ. Reproduced as drawn; flagged in docs/BUILD_LOG.md.
 */

/** b4 mirrored — node 3614:7091, style "Type B BG 4" inside a horizontal flip. */
const HERO_GRADIENT = gradients.hero.realEstate

/**
 * Ideal Customer Profiles — Figma node 3614:7321.
 *
 * ⚠ REWRITTEN 2026-09-15, and this page was the worst of the five. All SIX
 * profiles rendered the identical "AI mandate" block — same four capability
 * lines, same paragraph about a board asking for an AI plan — so the section
 * was one row repeated under six headings. Five of the six also listed "Head of
 * Claims" as a buyer, an insurance role that arrived by copy-paste from
 * Financial Services and has nothing to do with a brokerage or a marketplace.
 * That is the "in some cases unrelated" in Nabeel's note.
 *
 * Each row now names the constraint that is actually specific to it: the MLS
 * data licence, Reg A+ and Reg D disclosure, fair housing, ECOA adverse-action
 * notices. Those are the terms someone asks an answer engine about, and they
 * are what distinguishes this page from the other four. See healthcare.tsx for
 * the three rules all five now follow.
 */
const PROFILES = [
  {
    title: 'PropTech platforms serving agents',
    points: [
      'AI roadmap and use-case scoring',
      'MLS and IDX data-rights review',
      'Listing-content generation guardrails',
      'Build-vs-buy analysis',
    ],
    body: 'Your agents want AI-written listing copy and your MLS agreement has rules about what may be done with that data. The licence is the design constraint here, not the model.',
    roles: ['CEO', 'CTO', 'Head of Product', 'Head of Operations'],
  },
  {
    title: 'Brokerages scaling operations',
    points: [
      'Transaction-coordination automation',
      'Document AI for contracts and disclosures',
      'Agent onboarding and enablement tools',
      'Process mapping',
    ],
    body: 'Every closed deal moves through a coordinator, a checklist, and forty PDFs. Adding agents means adding coordinators, and that ratio is the ceiling you are hitting.',
    roles: ['CEO', 'COO', 'Director of Transaction Operations', 'Head of Compliance'],
  },
  {
    title: 'Fractional and syndicated investment platforms',
    points: [
      'Reg A+ and Reg D disclosure controls',
      'Investor onboarding and KYC automation',
      'Reporting and distribution automation',
      'AI governance and policy',
    ],
    body: 'You are selling securities, so an AI that drafts investor communications is drafting regulated material. We build the review gate before we build the drafting tool.',
    roles: ['CEO', 'Chief Compliance Officer', 'CFO', 'General Counsel'],
  },
  {
    title: 'Property management operators',
    points: [
      'Maintenance intake and triage agents',
      'Lease abstraction and document AI',
      'Resident-communication automation',
      'Fair-housing guardrails',
    ],
    body: 'Resident communication is the highest-volume work you do and the most exposed: fair-housing rules apply to what a model writes exactly as they apply to a leasing agent.',
    roles: ['COO', 'VP Property Management', 'Director of Operations', 'General Counsel'],
  },
  {
    title: 'Mortgage and title-adjacent platforms',
    points: [
      'Loan-file document extraction',
      'ECOA and adverse-action controls',
      'Fraud and identity triage',
      'Independent AI assurance',
    ],
    body: 'An automated decision that affects someone’s credit has to be explainable to the applicant and to a regulator, in writing, on request. Most AI vendors cannot produce that document at all.',
    roles: ['CTO', 'Chief Risk Officer', 'Head of Underwriting', 'Compliance Officer'],
  },
  {
    title: 'Real-estate marketplaces',
    points: [
      'Search relevance and grounded answers',
      'Listing-quality and fraud detection',
      'Architecture and scalability audit',
      'Analytics with lineage',
    ],
    body: 'Search is the product. A general-purpose model on top of a dirty listing corpus makes the product measurably worse, in a way your users will report as broken rather than as wrong.',
    roles: ['CEO', 'CTO', 'Head of Product', 'VP Engineering'],
  },
]

/** Node 3614:7286. */
const LEVELS = [
  { number: '01', label: 'Listing and lead conversation agents' },
  { number: '02', label: 'Autonomous agents for scheduling and follow-up' },
  { number: '03', label: 'Marketing content automation at volume' },
  { number: '04', label: 'Document AI for leases, disclosures, and closings' },
  { number: '05', label: 'Pricing and portfolio analytics' },
  { number: '06', label: 'Grounded search over listings and internal knowledge' },
]

/**
 * Node 3614:7455.
 *
 * ⚠ The second numeral reads "60+" on the artboard while its own copy is about
 * a 40% infrastructure saving — the numeral is left over from the Financial
 * Services band. Reproduced as drawn; flagged in docs/BUILD_LOG.md.
 */
const STATS = [
  {
    value: '$7M',
    body: 'Mave AI (10,000+ users, $7M raised) rebuilt its delivery operation with Type B and rated the engagement 5.0 on Clutch.',
  },
  {
    value: '60+',
    body: 'Dome took a stalled fractional-investing platform to an investor-ready MVP across web, iOS, and Android at 40% lower infrastructure cost.',
  },
]

/** ⚠ Answers are placeholders — the artboard draws every row collapsed. */
const FAQ = [
  {
    question: 'What proptech products has Type B built?',
    answer:
      'Agent-facing marketing automation, listing and lead agents, and securities-compliant investing platforms — Mave AI and Dome are the two we point to most often. Placeholder copy pending final wording.',
  },
  {
    question: 'Can you take over a stalled build?',
    answer:
      'Yes, and it is a common way we start. Dome came to us after a previous partner stalled; we audit first, then rebuild against a roadmap you can hold us to. Placeholder copy pending final wording.',
  },
  {
    question: 'How fast can you start?',
    answer:
      'A pod starter can be in place in weeks, and an Entry engagement is a fixed two weeks at a fixed scope. Placeholder copy pending final wording.',
  },
  {
    question: 'Do you handle investment compliance?',
    answer:
      'Where a platform touches investment money or personal financial data, a compliance workstream runs alongside the build — lineage, human gates, and the evidence pack, at no extra ceremony. Placeholder copy pending final wording.',
  },
  {
    question: 'How do you ship fast without quality collapsing?',
    answer:
      'The delivery system is engineered for volume: agents draft inside our SDLC, senior engineers review everything, and QA cycles and playbooks are part of the pod, not an afterthought. Placeholder copy pending final wording.',
  },
  SOVEREIGN_FAQ,
]

export function RealEstatePage() {
  return (
    <ContentPage
      faq={FAQ}
      ground={{ backgroundColor: colorTokens.background.surface }}
      /* The one industry hero with a dark band, so the one with a light nav
         over it — Figma node 3776:608. Every other page here runs ink links. */
      headerTone="onDark"
    >
      <IndustryHero
        tone="onDark"
        heading="AI for Real Estate & PropTech"
        body="Type B builds prop-tech products, AI automation, and investment platforms for real estate businesses, from agent-facing marketing automation to securities-compliant investing."
        gradient={HERO_GRADIENT}
      />

      <Statement>
        Real estate runs on speed and volume: listings, leases, showings, closings, and the content
        and paperwork behind all of them. Quality collapses under volume unless the delivery system
        is engineered for it, and platforms that touch investment money inherit securities
        compliance whether they planned for it or not.
      </Statement>

      <IdealCustomerProfiles profiles={PROFILES} />

      {/* ⚠ The artboard's heading here still reads "financial services". */}
      <LevelsList
        heading="How we frame real estate"
        image="/images/services/product.png"
        levels={LEVELS}
      />

      <EngagementSteps heading="How we work here" steps={INDUSTRY_STEPS} />

      <SplitFeature
        reverse
        headingLevel="h2"
        heading="What can AI do for Real Estate & PropTech?"
        body="Most real estate AI is standard cloud AI and should be: content generation, lead scoring, listing automation, document extraction. Build it fast, own it outright. Where a platform touches investment money or personal financial data, the audit-first discipline from our regulated practice comes with it at no extra ceremony: lineage, human gates, and a compliance workstream running alongside the build."
        image="/images/services/product-featured.jpg"
      />

      <StatBand heading="Why Type B fits here" stats={STATS} />

      <Packaging tiers={TIERS} />

      <RelatedServices
        services={related(
          ['product', 'We build the agents, products, and governance around them.'],
          ['teams', 'We embed senior pods managed by us, in weeks.'],
          ['financial', 'Where our diligence and governance work lands often.'],
        )}
      />

      {/*
        ⚠ The artboard's claim and paragraph here are Ferry Pay's copy verbatim
        under the Mave AI name. Reproduced as drawn — the real Mave AI copy is a
        content gap, not a layout decision.
      */}
      <SplitFeature
        eyebrow="Featured"
        headingLevel="h2"
        heading="Mave AI"
        claim="Daily payout on autopilot mode."
        body="We embedded a managed team, scaled engineering from two people to ten with playbooks and QA cycles, re-architected the platform, overhauled the UX, and launched the payroll product within six months. Infrastructure cost fell 43%, database queries went from 300ms to 80ms, the app rating climbed to 4.8, and support contacts fell to 4%. Partnering since 2023."
        image="/images/services/product-featured.jpg"
      />
    </ContentPage>
  )
}

export default RealEstatePage
