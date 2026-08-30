import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from '@/pages/index'
import '@/styles/globals.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root not found')

createRoot(container).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)
