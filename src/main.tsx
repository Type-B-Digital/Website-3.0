import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from '@/pages/index'
import '@/styles/globals.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

createRoot(container).render(
  <StrictMode>
    <HomePage />
    {/*
      Page grain sits above everything and outside the page, so every page picks
      it up without remembering to add it. See `.page-grain` in globals.css.
    */}
    <div aria-hidden className="page-grain" />
  </StrictMode>,
)
