import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { BookingProvider } from './hooks/useBooking'
import { LangProvider } from './hooks/useLang'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <LangProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </LangProvider>
      </MotionConfig>
    </BrowserRouter>
  </React.StrictMode>,
)
