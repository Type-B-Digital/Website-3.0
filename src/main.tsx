import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/index'
import CareersPage from '@/pages/careers'
import ContactPage from '@/pages/contact'
import CulturePage from '@/pages/culture'
import ProductDevelopmentPage from '@/pages/product-development'
import IndustriesPage from '@/pages/industries'
import WhatWeDoPage from '@/pages/what-we-do'
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/what-we-do" element={<WhatWeDoPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/culture" element={<CulturePage />} />
        <Route path="/product-development" element={<ProductDevelopmentPage />} />
      </Routes>
    </BrowserRouter>
    {/*
      Page grain sits above everything and outside the routes, so every page
      picks it up without remembering to add it. See `.page-grain` in globals.css.
    */}
    <div aria-hidden className="page-grain" />
  </StrictMode>,
)
