/**
 * Publications — the index grid and the one article that exists.
 *
 * Figma: "8. Blog" node 2887:9631 and "8.1 Blog Post" node 2894:10170
 * https://www.figma.com/design/LASrWn0jXyj5nBaphi2jgI/TypeB-Creative-Exploration?node-id=2887-9631
 *
 * Split out of the two page files because both need it: the index draws the
 * card, the post draws the article, and the card has to know the post's slug to
 * link to it.
 *
 * ⚠ COPY STATUS. The index artboard draws six cards and gives five of them the
 * same literal placeholder headline — "Article header goes here and will never
 * exceed more than two lines". Reproduced as drawn at Eduardo's direction, the
 * same way Our Work ships its unfinished thumbnails. A card with no `slug`
 * renders inert rather than linking anywhere.
 *
 * ── Imported from the old site, 2026-09-16 ─────────────────────────────────
 *
 * Eduardo: "audit the blog page and blog posts from the old site to extract
 * the copy content (no images or left-aside filters)". typeb.digital/blog has
 * exactly three posts, no pagination. All three are here, copy verbatim from
 * each post's rich-text body, and each takes a placeholder slot on the grid —
 * so three placeholders remain (AI Enablement, MENA, Fractional CTO).
 *
 *   - Headline, date and body are the old site's. The old site's tag chips
 *     (Staffing / Engineering / Design) were its left-aside filters and are
 *     NOT carried over; each post is filed under the closest filter this
 *     library already has.
 *   - No images come across. Each card keeps a photograph from this site's
 *     own set, chosen where its measured headline colour still holds (see
 *     the contrast table on CARDS), and the posts carry no in-body figures.
 *   - The Teams article already here was the Figma cut of the first post
 *     (three sections, one paragraph pasted twice). It is now the full post.
 *   - Two defects in the source, one fixed and one kept:
 *       · "Why Yes Men…" repeats the last section's first two paragraphs,
 *         run together with no space, at the end of the section before it.
 *         Dropped — a paste slip, not copy.
 *       · "The Rescue Roadmap" has lost its em dashes throughout ("the real
 *         question isn't whether to transition it's how"). Kept as published;
 *         restoring them would be rewriting the client's text by guesswork.
 */

/* ================================================================== *
 * FILTERS — Figma node 2887:9856
 * ================================================================== */

/**
 * The rail, in the artboard's order — which is NOT the order the cards use.
 *
 * ⚠ Two of these eight match no article: Fintech and Product Methodology. That
 * is a real state on a six-card grid, so the index handles an empty result
 * rather than pretending it cannot happen.
 */
export const FILTERS = [
  'Operational Rescue',
  'Digital Transformation',
  'AI Enablement',
  'Teams',
  'Fractional CTO',
  'Fintech',
  'MENA',
  'Product Methodology',
] as const

export type PublicationFilter = (typeof FILTERS)[number]

/* ================================================================== *
 * THE GRID — Figma node 3752:445
 * ================================================================== */

/** Node 3731:4240 and its five siblings, verbatim. */
export const PLACEHOLDER_TITLE =
  'Article header goes here and will never exceed more than two lines'

/**
 * Which of the two type colours a line on a card is drawn in. Not a style
 * choice per card so much as a reading of the photograph under it — see the
 * measurements below.
 */
export type CardTone = 'ink' | 'paper'

export type PublicationCard = {
  /** Doubles as the filter this card answers to. */
  category: PublicationFilter
  title: string
  image: string
  /** Set only where an article exists; without it the card does not link. */
  slug?: string
  /** The headline colour, taken from the artboard. */
  titleTone: CardTone
}

/**
 * Row-major, as the 2x3 grid draws them — nodes 3752:442 / 441 / 439 / 440 /
 * 443 / 444.
 *
 * ── Why the headline colour is per-card ──
 *
 * The artboard draws two of the six headlines in ink (#030A12) and four in
 * paper (#F5F6F6), while drawing every category label in paper. The split
 * reads like an authoring slip. It is not: these photographs are LIGHT across
 * the top and dark across the bottom, and the two ink headlines are exactly
 * the two cards whose bottom strip is light. The artboard is right, and the
 * headlines ship as drawn.
 *
 * Measured against the RENDERED page rather than the source files — text
 * hidden, each line sampled over its own box, and the figure below is the
 * WORST 5x5 block inside that box, not the mean. The mean is what hides this:
 * averaged across the full card width, ink on the Teams label scores 10.76 and
 * looks fine, while the dark shape it actually sits on scores 1.39.
 *
 *                          |  category   |  headline
 *                          | ink   paper | ink   paper
 *   ai-enablement          | 11.92  1.28 |  6.90  1.70
 *   digital-transformation |  8.92  1.25 |  1.19 12.33
 *   teams                  |  1.39  1.47 |  1.28 10.63
 *   mena                   | 12.22  1.40 |  2.43  4.67
 *   fractional-cto         |  6.46  2.27 |  7.24  1.97
 *   operational-rescue     |  1.12  1.70 |  1.07 14.99
 *
 * Every headline clears 4.5:1 on the colour the artboard gives it, the
 * tightest being MENA at 4.67.
 *
 * ⚠ The category label clears nothing. Paper fails on all six and ink fails on
 * Teams and Operational Rescue, where a hard light-to-dark edge runs through
 * the label's box, so no colour reads on both sides of it. That is fixed with
 * a scrim over the label band alone — see `LABEL_SCRIM` in publications.tsx,
 * which carries why it is not a full-card scrim. With it the label reads
 * 11.05 to 13.09 in paper, and the headlines are untouched.
 */
export const CARDS: readonly PublicationCard[] = [
  /*
    The three imported posts first, newest first, then the three slots still
    waiting for copy. The two new posts take the photographs of the placeholders
    they replaced; both were measured with a paper headline (14.99 and 12.33).
  */
  {
    category: 'Teams',
    titleTone: 'paper',
    title: "Don't Just Rent a Team, Build Your Future IP.",
    image: '/images/publications/card-teams.png',
    slug: 'build-your-future-ip',
  },
  {
    category: 'Operational Rescue',
    titleTone: 'paper',
    title: 'The Rescue Roadmap: How to Transition Your Vendor Without Halting Your Roadmap',
    image: '/images/publications/card-operational-rescue.png',
    slug: 'the-rescue-roadmap',
  },
  {
    category: 'Teams',
    titleTone: 'paper',
    title: 'Why Yes Men Are Killing Your Roadmap',
    image: '/images/publications/card-digital-transformation.png',
    slug: 'why-yes-men-are-killing-your-roadmap',
  },
  {
    category: 'AI Enablement',
    titleTone: 'ink',
    title: PLACEHOLDER_TITLE,
    image: '/images/publications/card-ai-enablement.png',
  },
  {
    category: 'MENA',
    titleTone: 'paper',
    title: PLACEHOLDER_TITLE,
    image: '/images/publications/card-mena.png',
  },
  {
    category: 'Fractional CTO',
    titleTone: 'ink',
    title: PLACEHOLDER_TITLE,
    image: '/images/publications/card-fractional-cto.png',
  },
]

/* ================================================================== *
 * THE ARTICLE — Figma node 2894:10170
 * ================================================================== */

/** A titled run of paragraphs inside a section — "Phase 1: …", "1. No Technical Pushback". */
export type PublicationSubsection = {
  heading: string
  paragraphs: readonly string[]
}

export type PublicationSection = {
  heading: string
  /** A second-level heading between the heading and the body. */
  subheading?: string
  paragraphs: readonly string[]
  /** Titled parts after the body. Only the imported posts use these. */
  subsections?: readonly PublicationSubsection[]
  /** Draw a figure after this section's body. */
  figureAfter?: boolean
}

export type Publication = {
  slug: string
  category: PublicationFilter
  title: string
  /** As drawn on the artboard. */
  date: string
  /** The same date as a machine-readable `datetime` attribute. */
  dateTime: string
  /**
   * The line under the title. Optional: the artboard's is a placeholder (see
   * below) and none of the imported posts has one.
   */
  deck?: string
  lead: readonly string[]
  sections: readonly PublicationSection[]
}

/**
 * The Figma article (node 2894:10170), now carrying the full post from the old
 * site. The title keeps the artboard's punctuation — the old site drops the
 * comma and full stop — and the date is the real publication date where the
 * artboard had a placeholder. The artboard's deck was the index blurb repeated,
 * so it is gone rather than kept as filler.
 */
export const ARTICLE: Publication = {
  slug: 'build-your-future-ip',
  category: 'Teams',
  title: "Don't Just Rent a Team, Build Your Future IP.",
  date: 'December 30, 2025',
  dateTime: '2025-12-30',
  lead: [
    "Your $25/hour developer is costing you $100/hour in management time and rework. If you're a CTO or VP of Engineering spending 20+ hours a week managing offshore vendors instead of driving innovation, you already know the hidden tax of traditional outsourcing. The constant \"yes\" from developers who deliver broken code, the bait-and-switch where senior engineers are promised but juniors show up, and the endless churn that resets progress every quarter—these aren't talent problems. They're model problems.",
  ],
  sections: [
    {
      heading: 'The Race to the Bottom Stops Here',
      paragraphs: [
        'Legacy outsourcing was built for maintenance, not innovation. The industry\'s obsession with hourly rates has created a marketplace where vendors compete on price while delivering mounting technical debt, communication gaps, and what industry experts call the "Correction Tax"—the compounding cost of fixing code that should have been written correctly the first time. Studies show that companies adopting unmanaged offshore models experience productivity losses adding up to 20% in additional costs, with contract management alone consuming 6-10% of organizational budgets.',
        'The challenge isn\'t geography. Type B operates teams in India, Sri Lanka, Colombia, and Argentina. The challenge is the operating model—unmanaged, high-churn environments where developers prioritize contract retention over candid feedback, creating what we call "The Yes Trap". When psychological safety is absent, engineering excellence becomes impossible.',
      ],
    },
    {
      heading: 'The BOT Advantage',
      subheading: 'Build Capability, Not Dependency',
      paragraphs: [
        "Build-Operate-Transfer (BOT) represents a fundamental shift from renting capacity to building intellectual property you'll own. Unlike traditional staff augmentation where you're perpetually dependent on vendor relationships, BOT creates a strategic pathway to ownership while eliminating management overhead during growth phases.",
        'The model works in three phases. During the Build phase, Type B establishes a dedicated team aligned to your technical requirements and cultural standards, handling recruitment, infrastructure, and compliance—collapsing timelines that typically require months into immediate deployment. The Operate phase delivers Fortune 100 PMO standards with extreme ownership. Your team ships code, manages sprints, and drives outcomes while you maintain strategic oversight without operational babysitting. Finally, the Transfer phase hands you a fully operational, wholly-owned entity with established processes, retained institutional knowledge, and zero disruption.',
        "Pelican AI exemplified this approach when acquired by KOAT Capital in preparation for a public listing via reverse takeover. Facing a fractured vendor relationship and productivity collapse in their India operations, Pelican partnered with Type B to right-size their team and establish a new wholly-owned entity. The result: a 100-person operation delivering 30% cost reduction while supporting a $5M RTO process. Pelican didn't just replace vendors—they built an asset.",
      ],
    },
    {
      heading: 'Poly-Shore Flexibility',
      subheading: 'Right Talent, Right Timezone',
      paragraphs: [
        "Strategic deployment matters as much as technical capability. Type B's poly-shore model places collaborative work requiring real-time interaction with nearshore teams in Colombia and Argentina, while routing deep work—backend development, QA automation, data engineering—to offshore teams in India and Sri Lanka. All operate under unified quality standards and PMO oversight.",
        "This isn't arbitrary geography. It's engineered collaboration. Ferry Pay leveraged this model to achieve a 43% cost reduction while modernizing their entire payments platform. By integrating a senior offshore development team with fintech-specific expertise, Ferry Pay achieved 3x faster release cycles, eliminated 60+ hours of monthly client management overhead, and cleaned 25,000+ legacy records—all without sacrificing security or compliance. The offshore team didn't just write code; they unlocked the roadmap.",
      ],
    },
    {
      heading: 'Managed Outcomes Over Managed Excuses',
      paragraphs: [
        "The difference between Type B and legacy vendors isn't resume quality—it's accountability architecture. Type B deploys PMO-backed delivery engines, not staffing lists. Every engagement includes embedded project management, structured QA processes, and outcome-driven metrics aligned to your business objectives. When Dome Capital needed end-to-end product development without in-house technical expertise, Type B provided a full stack team including product manager, frontend and backend developers, mobile engineers, and QA specialists.",
        "The engagement delivered five applications, achieved 60% cost reduction, and supported Dome's achievement of Reg A+ status. This level of execution stems from what Type B calls Extreme Ownership—implementing strong PMO processes paired with accountability toward an aligned overall vision. It's the operating model that transforms outsourcing from a cost center into an execution engine.",
      ],
    },
    {
      heading: 'From Body Shops to Build Partners',
      paragraphs: [
        "The strategic question facing technical leaders isn't whether to augment capacity—it's how to do so without mortgaging velocity to management tax. Research indicates that only 25% of startups successfully scale their technical operations beyond MVP stages, primarily due to lack of technical leadership, poor scalability, and difficulty hiring qualified teams. Meanwhile, 69% of technology companies globally struggle to hire AI-literate engineering talent, leading to missed growth targets and product delays.",
        'BOT solves this by collapsing the false choice between control and cost. You gain immediate senior capacity at 40-60% lower expense than domestic hiring, predictable sprint velocity through managed delivery, and a clear path to ownership that builds enterprise value rather than vendor dependency. Businesses implementing structured BOT models see up to 70% lower costs and up to 60% higher productivity across agile teams.',
      ],
    },
    {
      heading: 'Shift Your Focus. Lift Your Outcomes.',
      paragraphs: [
        "The era of accepting management tax as the price of scale is over. Technical leaders at companies like Ferry Pay, Pelican AI, and Dome Capital have demonstrated that the right operating model doesn't just reduce costs—it accelerates innovation, protects momentum, and builds IP you'll own. BOT represents managed excellence: outcome-driven team extensions built to Fortune 100 standards with zero management overhead.",
        "Ready to shift from managing vendors to shipping products? The future of your engineering capacity shouldn't be leased—it should be built, operated excellently, and ultimately owned by you.",
      ],
    },
  ],
}

/** typeb.digital/blog/the-rescue-roadmap--how-to-fire-your-vendor-without-halting-your-roadmap */
export const RESCUE_ROADMAP: Publication = {
  slug: 'the-rescue-roadmap',
  category: 'Operational Rescue',
  title: 'The Rescue Roadmap: How to Transition Your Vendor Without Halting Your Roadmap',
  date: 'December 23, 2025',
  dateTime: '2025-12-23',
  lead: [
    'You know your offshore vendor is failing. The sprint velocity has collapsed, technical debt is mounting, and you\'re spending 20+ hours a week in "clarification" calls that clarify nothing. But here\'s the paralysis: firing them means disrupting active development, explaining the mess to your board, and risking weeks maybe months of lost momentum while you rebuild.',
    'So you stay. You manage the chaos. You pay the babysitting tax.',
    "This is the fear that keeps bad vendors in business: the transition cost feels higher than the cost of staying. But the math doesn't support that instinct. Companies that delay vendor transitions lose an average of 30% more in productivity costs and technical debt accumulation than those who execute structured handovers. The real question isn't whether to transition it's how to do it without halting your roadmap.",
  ],
  sections: [
    {
      heading: 'The Model Problem, Not a Geography Problem',
      paragraphs: [
        "Before we discuss the rescue plan, let's address the root cause. Your vendor isn't failing because they're offshore. Type B operates teams in India, Sri Lanka, Colombia, and Argentina the same geographies as legacy vendors. The difference is the operating model.",
        'Legacy vendors built businesses on the "race to the bottom," competing on hourly rates while delivering unmanaged teams trapped in yes men culture. Without psychological safety, developers hide problems until they become crises. Without PMO standards, sprints become suggestion boxes rather than delivery commitments. And without ownership accountability, your vendor optimizes for contract retention not your success.',
        "The solution isn't bringing everything in house. It's partnering with a vendor who operates like an extension of your core team, not a body shop. Companies that implement vendor transitions with structured knowledge transfer and agile ready teams see 95% on-time completion rates and zero escalations during handover.",
      ],
    },
    {
      heading: 'The Five Phase Rescue Roadmap',
      paragraphs: [
        "Transitioning from a failing vendor requires surgical precision. Here's the framework technical leaders use to execute seamless handovers without disrupting active sprints.",
      ],
      subsections: [
        {
          heading: 'Phase 1: Silent Assessment (Week 1-2)',
          paragraphs: [
            'Before announcing anything, conduct a comprehensive technical audit with your prospective new partner. This includes codebase review, architecture documentation gaps, infrastructure access mapping, and sprint velocity analysis. At Type B, we begin every rescue engagement with a deep technical assessment that identifies immediate risks security vulnerabilities, undocumented dependencies, missing API keys and creates a prioritized remediation roadmap.',
            "The goal is diagnostic clarity. You need to know what you're inheriting before you announce the transition. This phase should reveal technical debt severity, knowledge transfer requirements, and realistic timeline estimates. Pelican AI used this approach when transitioning their 100-person India operation, identifying vendor relationship fractures and productivity bottlenecks before executing the handover.",
          ],
        },
        {
          heading: 'Phase 2: Parallel Onboarding (Week 2-4)',
          paragraphs: [
            'Start onboarding your new team while the current vendor remains active but do it strategically. Your new partner should shadow existing development cycles, attend sprint planning sessions as observers, and begin absorbing domain knowledge without touching production code.',
            "This isn't duplicating effort. It's insurance. Ferry Pay executed this model when transitioning to Type B, allowing the new team to understand fintech compliance requirements, payment processing logic, and point of sale integrations before taking ownership. The result: zero disruption to production systems and 3x faster release cycles post-transition.",
            'During this phase, ensure your new partner has access to critical resources servers, databases, third-party API keys, infrastructure configurations, source code repositories, CI/CD pipelines, and project management tools. Contracts with poor transition clauses often leave companies stranded mid project without clear code handover procedures.',
          ],
        },
        {
          heading: 'Phase 3: Controlled Handoff (Week 4-6)',
          paragraphs: [
            "Execute knowledge transfer in structured phases, not all at once. Start with non critical features or isolated modules where failure won't impact core business operations. This allows your new team to demonstrate competency while building confidence with stakeholders.",
            'At Type B, we implement dual review protocols during handoff: existing vendor documents decisions, new team executes implementation, and both review outcomes before deployment. This creates accountability overlap that protects against knowledge gaps.',
            'Dome Capital used this approach when Type B took over their full product development. By phasing the transition across frontend, backend, mobile, and QA responsibilities, Dome maintained continuous delivery while the new team ramped up. The engagement ultimately delivered five applications and achieved 60% cost reduction with zero production incidents during transition.',
          ],
        },
        {
          heading: 'Phase 4: Full Ownership Transfer (Week 6-8)',
          paragraphs: [
            'Once your new partner has demonstrated sprint-level competency, execute the full transition. This includes formalizing communication channels, establishing PMO rhythms, implementing quality gates, and retiring the legacy vendor relationship.',
            "The key differentiator here is operating model. Type B doesn't just take over code we implement Fortune 100 PMO standards with extreme ownership. That means weekly status reports, sprint reviews, embedded QA processes, and outcome driven KPIs aligned to business objectives. Companies that adopt agile ready offshore teams during transitions deliver MVPs 20-30% faster than conventional dev shops.",
          ],
        },
        {
          heading: 'Phase 5: Velocity Acceleration (Week 8+)',
          paragraphs: [
            'Post transition, the focus shifts from preservation to acceleration. With PMO-backed delivery engines in place, technical debt remediation begins, sprint velocity increases, and management overhead collapses.',
            'Ferry Pay experienced this firsthand.',
            "After transitioning to Type B's managed offshore model, they recovered 60+ hours per month previously spent managing vendors, cleaned 25,000+ legacy records, and reduced operational costs by 43% all while accelerating feature deployment. The offshore team didn't just maintain the platform; they unlocked the roadmap.",
          ],
        },
      ],
    },
    {
      heading: 'Poly Shore Flexibility: Right Talent, Right Timezone',
      paragraphs: [
        "One advantage of structured transitions is rethinking geographic deployment strategy. Type B's poly shore model positions collaborative work sprint planning, architecture discussions, stakeholder demos with nearshore teams in Colombia and Argentina, while routing deep work like backend development, QA automation, and data engineering to offshore teams in India and Sri Lanka.",
        "All teams operate under unified quality standards and PMO oversight, eliminating the communication gaps that plague traditional offshore vendors. This isn't arbitrary geography. It's engineered collaboration designed for fintech, healthcare, and SaaS companies that demand compliance rigor and delivery velocity.",
      ],
    },
    {
      heading: 'From Rescue to Reinvention',
      paragraphs: [
        "The fear of vendor transitions is rooted in past failures chaotic handoffs, lost tribal knowledge, sprint disruptions. But structured transitions with the right partner don't halt roadmaps. They accelerate them.",
        'Research shows that 70% of companies cite cost reduction as a primary driver for outsourcing, but 40% now rank speed to market and delivery quality as equal priorities.',
        "The vendors who win in this environment aren't the cheapest. They're the ones who deliver managed excellence: outcome driven team extensions built to Fortune 100 standards with zero management overhead.",
        "Ready to shift from managing a failing vendor to shipping your roadmap? The transition doesn't have to be painful it just has to be strategic.",
      ],
    },
  ],
}

/** typeb.digital/blog/why-yes-men-are-killing-your-roadmap */
export const YES_MEN: Publication = {
  slug: 'why-yes-men-are-killing-your-roadmap',
  category: 'Teams',
  title: 'Why Yes Men Are Killing Your Roadmap',
  date: 'December 16, 2025',
  dateTime: '2025-12-16',
  lead: [
    'You\'ve been in the meeting before. Your offshore team lead nods enthusiastically when you present an aggressive timeline. "Yes, we can do that." The Figma mockups that clearly violate your design system? "Yes, no problem." The API integration that your in-house architect flagged as impossible without refactoring? "Yes, we\'ll make it work."',
    "Three weeks later, you get a demo that's broken, buggy, or completely off-spec. Sound familiar?",
    'If your offshore developers agree with everything you say, you don\'t have a high-performing team—you have a cultural liability costing you velocity, credibility, and roadmap momentum. The "yes-man" culture isn\'t just annoying; according to the Project Management Institute, poor project performance leads to an average waste of 11.4% of investment, with lack of proper project leadership and accountability as the primary cause.',
    "The yes-man problem isn't about politeness or cultural misunderstanding. It's a structural issue baked into legacy vendor models that prioritize contract retention over product success. Here's what's actually happening: Traditional body-shop vendors operate on billable hours and resource utilization metrics. Their business model depends on keeping you as a client for as long as possible—not on shipping your product on time. When a developer spots a flawed requirement or an unrealistic deadline, speaking up risks upsetting the client relationship. So they say \"yes,\" bury the problem, and hope to fix it later (usually on your dime).",
    'The psychology of this is well-documented. In distributed engineering teams, communication latency and physical distance amplify feelings of isolation and power imbalance. Offshore developers often feel like they\'re viewed as "juniors" regardless of their actual experience level, with meetings scheduled at inconvenient hours and feedback cycles that favor onshore staff. In this environment, psychological safety—the ability to speak up, challenge assumptions, and flag risks—disappears.',
    'The financial impact is staggering.',
    'According to McKinsey, nearly 75% of software projects fail to meet deadlines or budgets, often due to miscommunication or scope creep. Ferry Pay experienced this firsthand before partnering with Type B Digital—their legacy platform was plagued by performance issues and scaling bottlenecks because their previous offshore team never pushed back on architectural problems. The "Babysitting Tax" was real: leadership spent over 20 hours per week managing a team that should have been self-sufficient.',
  ],
  sections: [
    {
      heading: 'Vendor vs. Partner: The Cultural Divide',
      paragraphs: [
        "The distinction between a vendor and a partner isn't semantic—it's operational.",
        'Vendors optimize for contract retention. They send you resumes, bill by the hour, and avoid conflict. They say "yes" because disagreement feels risky. When something goes wrong, they hide bad news until it\'s too late to course-correct.',
        'Partners optimize for outcomes. They take extreme ownership of delivery, which means they push back when timelines are unrealistic, challenge requirements that will create technical debt, and flag risks early—even when it\'s uncomfortable. This is what Type B Digital calls "Managed Excellence": a PMO-backed delivery engine where accountability is baked into every sprint, not an afterthought.',
        'The best offshore partners understand that psychological safety goes both ways. They create environments where developers feel empowered to say "this approach won\'t scale" or "we need two more days to do this right" because they know those conversations prevent expensive rework down the line.',
        "Consider Pelican AI's transformation. When KOAT Capital acquired the company in 2024, productivity had tanked because the existing vendor relationships were built on low-cost labor—not strategic alignment. Type B Digital implemented a Build-Operate-Transfer (BOT) model that replaced the yes-man culture with extreme ownership, resulting in a 30% cost reduction and a team capable of supporting a public listing via RTO.",
      ],
    },
    {
      heading: 'Three Signs Your Team Is Trapped in Yes-Man Culture',
      paragraphs: [],
      subsections: [
        {
          heading: '1. No Technical Pushback',
          paragraphs: [
            "Healthy engineering teams debate trade-offs, flag dependencies, and propose alternative approaches. If your offshore team accepts every requirement without discussion, they're either not thinking critically or don't feel safe speaking up.",
          ],
        },
        {
          heading: '2. Surprises at Demo Time',
          paragraphs: [
            'When demos consistently reveal misalignments, missed edge cases, or broken functionality that "should have been obvious," it means your team isn\'t surfacing issues during development. Partners conduct daily stand-ups with real-time feedback loops specifically to avoid this.',
          ],
        },
        {
          heading: '3. The Correction Tax',
          paragraphs: [
            'If you\'re constantly reworking deliverables, rewriting specs, or fixing bugs that should never have made it to QA, you\'re paying what Type B calls the "Correction Tax"—the hidden cost of cheap development done wrong the first time.',
          ],
        },
      ],
    },
    {
      heading: 'How Extreme Ownership Changes the Game',
      paragraphs: [
        "Type B Digital's approach flips the script. Instead of renting bodies, you're building a managed delivery engine with Fortune 100 standards and zero management overhead.",
        "Here's how it works in practice:",
        "PMO-Backed Accountability: Every engagement includes embedded project managers who own sprint planning, risk mitigation, and stakeholder communication. These aren't task-takers—they're delivery owners who track velocity, manage backlog priorities, and ensure your roadmap stays on track across time zones.",
        "Poly-Shore Flexibility: Critical collaboration happens nearshore in Colombia or Argentina where timezone overlap enables real-time problem-solving. Deep work and execution happens offshore in India or Sri Lanka where cost efficiency meets technical expertise. This isn't about geography—it's about deploying the right talent in the right timezone for the right task.",
      ],
    },
    {
      heading: 'From Yes-Men to Yes, And...',
      paragraphs: [
        'The future of offshore development isn\'t about finding cheaper developers. It\'s about finding teams that operate like extensions of your core squad—teams that say "yes, and here\'s a better way to do it" instead of just "yes".',
        "Strong vendor accountability relies on transparency, trust, and a shared commitment to quality. That means regular performance evaluations, clear escalation procedures, and ongoing dialogue about what's working and what isn't. But more fundamentally, it requires a shift from transactional vendor relationships to strategic partnerships where both sides are invested in shipping great products.",
        'Ready to shift from managing yes-men to shipping with partners who own outcomes? Type B Digital delivers extreme ownership, PMO processes, and Fortune 100 standards across every engagement—nearshore, offshore, or hybrid. Stop paying the Correction Tax and start building IP that scales.',
      ],
    },
  ],
}

/** Every article, keyed by slug, newest first. */
export const PUBLICATIONS: readonly Publication[] = [ARTICLE, RESCUE_ROADMAP, YES_MEN]

export function findPublication(slug: string | undefined): Publication | undefined {
  return PUBLICATIONS.find((publication) => publication.slug === slug)
}

/**
 * The three figures on the article artboard (nodes 2894:10682 / 10683 / 10684)
 * are three instances of ONE image fill — the same 845x469 bytes each time.
 */
export const ARTICLE_FIGURE = '/images/publications/post-figure.png'
