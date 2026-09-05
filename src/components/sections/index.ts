/**
 * The page-level sections, shared across the service pages (Advisory, Product
 * & AI Development, Teams) and the industry sub-pages.
 *
 * Was `components/service/` until 2026-09-04. Renamed once the Financial
 * Services page turned out to reuse seven of these — a folder called `service`
 * holding what industry pages depend on is how things get re-hardcoded.
 */
export {
  CapabilityGrid,
  EngagementSteps,
  FeaturedCase,
  IdealCustomerProfiles,
  LevelsList,
  RelatedServices,
  ServiceHero,
  SplitFeature,
} from './sections'
export type {
  Capability,
  CustomerProfile,
  EngagementStep,
  Level,
  RelatedService,
} from './sections'
export { IndustryHero, Statement, StatBand } from './industry'
export type { IndustryStat } from './industry'
export {
  CaseBand,
  CaseChallenge,
  CaseFigure,
  CaseGallery,
  CaseHero,
  CaseImpact,
  CaseSolution,
  CaseStudyPage,
} from './case-study'
export type { CaseOutcome, CasePoint } from './case-study'
export { Packaging, StaggeredCards } from './shared'
export type { PackageTier, StaggeredCard } from './shared'
export { ContentPage, SERVICE_GRADIENT } from './ContentPage'
export type { ContentPageProps } from './ContentPage'
