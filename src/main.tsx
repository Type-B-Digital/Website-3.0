import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from '@/components'
import HomePage from '@/pages/index'
import AdvisoryPage from '@/pages/advisory'
import CareersPage from '@/pages/careers'
import ContactPage from '@/pages/contact'
import CulturePage from '@/pages/culture'
import FinancialServicesPage from '@/pages/financial-services'
import HealthcarePage from '@/pages/healthcare'
import LegalPage from '@/pages/legal'
import ManufacturingPage from '@/pages/manufacturing'
import RealEstatePage from '@/pages/real-estate'
import ProductDevelopmentPage from '@/pages/product-development'
import PublicationsPage from '@/pages/publications'
import PublicationPostPage from '@/pages/publication-post'
import PrivacyPolicyPage from '@/pages/privacy-policy'
import BrandGuidelinesPage from '@/pages/brand-guidelines'
import IndustriesPage from '@/pages/industries'
import FerryPayPage from '@/pages/ferry-pay'
import OurWorkPage from '@/pages/our-work'
import TeamsPage from '@/pages/teams'
import WhatWeDoPage from '@/pages/what-we-do'
import NotFoundPage from '@/pages/not-found'
import '@/styles/globals.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

/**
 * Routes are declared at the site root (`/what-we-do`), but a deploy may serve
 * the site from a subpath — GitHub Pages uses `/<repo>/`. Vite exposes that as
 * `BASE_URL`; handing it to the router as `basename` keeps every route and
 * `<Link>` correct without any path literal changing. Trailing slash trimmed,
 * since the router wants `/type-b-digital`, not `/type-b-digital/`.
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      {/* A new route starts at the top; see ScrollToTop for why not on POP. */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/what-we-do" element={<WhatWeDoPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        {/* The five industry sub-pages, in the order the Industries page lists them. */}
        <Route path="/industries/healthcare" element={<HealthcarePage />} />
        <Route path="/industries/financial-services" element={<FinancialServicesPage />} />
        <Route path="/industries/real-estate" element={<RealEstatePage />} />
        <Route path="/industries/manufacturing" element={<ManufacturingPage />} />
        <Route path="/industries/legal" element={<LegalPage />} />
        <Route path="/our-work" element={<OurWorkPage />} />
        <Route path="/our-work/ferry-pay" element={<FerryPayPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/culture" element={<CulturePage />} />
        <Route path="/advisory" element={<AdvisoryPage />} />
        <Route path="/product-development" element={<ProductDevelopmentPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        {/* One artboard, one template — an unknown slug falls through to the 404. */}
        <Route path="/publications/:slug" element={<PublicationPostPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        {/* Internal reference, deliberately unlinked from the nav and footer. */}
        <Route path="/brand-guidelines" element={<BrandGuidelinesPage />} />
        {/*
          Catch-all. Without it an unknown path matched nothing and `<Routes>`
          rendered an empty document — no header, no footer, no text. This also
          catches every mistyped deep link on the deployed site, where
          `404.html` is a copy of `index.html` so Pages can serve the SPA.
        */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    {/*
      Page grain sits above everything and outside the routes, so every page
      picks it up without remembering to add it. See `.page-grain` in globals.css.
    */}
    <div aria-hidden className="page-grain" />
  </StrictMode>,
)
