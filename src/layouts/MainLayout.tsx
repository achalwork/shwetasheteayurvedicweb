import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { useLang } from '../hooks/useLang'

type LenisWindow = Window & { __lenis?: Lenis | null }

export default function MainLayout() {
  const { pathname } = useLocation()
  const { site } = useLang()
  const { scrollYProgress } = useScroll()
  const showBar = !['/book', '/confirmation'].includes(pathname)

  // Smooth scrolling (skipped when the visitor prefers reduced motion)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis({ duration: 1.05 })
    ;(window as LenisWindow).__lenis = l
    let id = requestAnimationFrame(function raf(t) { l.raf(t); id = requestAnimationFrame(raf) })
    return () => { cancelAnimationFrame(id); l.destroy(); (window as LenisWindow).__lenis = null }
  }, [])

  // Start every page at the top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    ;(window as LenisWindow).__lenis?.scrollTo(0, { immediate: true })
  }, [pathname])

  return (
    <div className={`flex min-h-screen flex-col ${showBar ? 'pb-[4.5rem] lg:pb-0' : ''}`}>
      <a href="#main" className="sr-only z-[60] rounded-full bg-forest-deep px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4">{site.skip}</a>
      <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-terracotta" />
      <Navbar />
      <motion.main id="main" key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex-1">
        <Outlet />
      </motion.main>
      <Footer />
      {showBar && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-forest/10 bg-ivory/95 p-3 backdrop-blur-md lg:hidden">
          <Link to="/book" className="btn-primary w-full">{site.nav.mobileBar}</Link>
        </div>
      )}
    </div>
  )
}
