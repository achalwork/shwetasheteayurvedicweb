import { lazy, Suspense } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'

const Services = lazy(() => import('./pages/Services'))
const OnlineConsultation = lazy(() => import('./pages/OnlineConsultation'))
const Contact = lazy(() => import('./pages/Contact'))
const Book = lazy(() => import('./pages/Book'))
const Confirmation = lazy(() => import('./pages/Confirmation'))
const Privacy = lazy(() => import('./pages/Privacy'))

const NotFound = () => (
  <div className="wrap py-28 text-center">
    <h1 className="text-5xl">Page not found</h1>
    <p className="mt-3 text-ink-muted">The page you are looking for does not exist.</p>
    <Link to="/" className="btn-primary mt-8">Go to home</Link>
  </div>
)

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="online-consultation" element={<OnlineConsultation />} />
          <Route path="contact" element={<Contact />} />
          <Route path="book" element={<Book />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="privacy" element={<Privacy />} />
          {/* retired pages / old links */}
          <Route path="consultation" element={<Navigate to="/book" replace />} />
          {['about', 'journey', 'research'].map(p => <Route key={p} path={p} element={<Navigate to="/" replace />} />)}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
