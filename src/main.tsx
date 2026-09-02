import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/index'
import WhatWeDoPage from '@/pages/what-we-do'
import '@/styles/globals.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/what-we-do" element={<WhatWeDoPage />} />
      </Routes>
    </BrowserRouter>
    {/*
      Page grain sits above everything and outside the routes, so every page
      picks it up without remembering to add it. See `.page-grain` in globals.css.
    */}
    <div aria-hidden className="page-grain" />
  </StrictMode>,
)
