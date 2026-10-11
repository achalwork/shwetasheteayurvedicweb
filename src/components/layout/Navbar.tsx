import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogoMark } from '../botanical/Botanicals'
import { useLang } from '../../hooks/useLang'
import LanguageTabs from './LanguageTabs'

const PATHS = ['/', '/services', '/online-consultation', '/contact'] as const

const lenisOf = () => (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis

export default function Navbar() {
  const { site } = useLang()
  const nl = site.nav.links
  const links: [string, string][] = [[PATHS[0], nl.home], [PATHS[1], nl.services], [PATHS[2], nl.online], [PATHS[3], nl.contact]]
  const doctor = site.doctor
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const menuBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 24)
    s()
    window.addEventListener('scroll', s, { passive: true })
    return () => window.removeEventListener('scroll', s)
  }, [])
  useEffect(() => {
    const l = lenisOf()
    if (open) l?.stop(); else l?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); menuBtn.current?.focus() } }
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; l?.start() }
  }, [open])

  return (
    <>
      <header className={`sticky top-0 z-50 border-b transition-all duration-500 ${scrolled || open ? 'border-forest/10 bg-ivory/95 shadow-[0_8px_30px_-18px_rgba(23,55,44,.35)] backdrop-blur-md' : 'border-transparent bg-ivory'}`}>
        <nav className={`wrap flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`} aria-label="Main">
          <Link to="/" className="group flex items-center gap-3 text-forest-deep" aria-label={`${doctor.name} — ${site.nav.homeAria}`}>
            <LogoMark className="h-9 w-9 shrink-0 text-forest transition-transform duration-700 group-hover:rotate-[20deg] max-[400px]:hidden" />
            <span className="leading-tight">
              <span className="block whitespace-nowrap font-display text-[1.2rem] font-semibold sm:text-[1.45rem]">{doctor.short}</span>
              <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-terracotta-dark">{site.nav.tagline}</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 xl:gap-9 lg:flex">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `relative text-[0.9rem] font-medium transition-colors ${isActive ? 'text-forest-deep' : 'text-ink-muted hover:text-forest-deep'}`}>
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && <motion.span layoutId="nav-dot" className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-terracotta" />}
                  </>
                )}
              </NavLink>
            ))}
            <Link to="/book" className="btn-primary btn-sm">{site.nav.book}</Link>
            <LanguageTabs />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageTabs />
            <button ref={menuBtn} className="rounded-full p-2 text-forest-deep" aria-label={open ? site.nav.closeMenu : site.nav.openMenu} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="on-dark fixed inset-0 z-40 overflow-y-auto bg-forest-deep pt-24 text-ivory lg:hidden"
          >
            <div className="wrap flex flex-col py-8">
              {links.map(([to, label], i) => (
                <motion.div key={to} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i + 0.1 }}>
                  <NavLink to={to} end={to === '/'} className={({ isActive }) => `block border-b border-ivory/10 py-4 font-display text-4xl ${isActive ? 'text-gold-light' : 'text-ivory'}`}>{label}</NavLink>
                </motion.div>
              ))}
              <Link to="/book" className="btn-gold mt-10">{site.nav.book}</Link>
              <p className="mt-10 text-sm text-ivory/70">{doctor.name}<br />{doctor.quals}<br />{doctor.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
