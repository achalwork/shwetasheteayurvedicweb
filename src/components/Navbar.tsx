import { useEffect, useState } from 'react'; import { Link, NavLink, useLocation } from 'react-router-dom'; import { Menu, X } from 'lucide-react'; import { AnimatePresence, motion } from 'framer-motion'
const links = [['/', 'Home'], ['/about', 'About the Doctor'], ['/journey', 'Academic Journey'], ['/research', 'Research'], ['/contact', 'Contact']]
export default function Navbar() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false); const { pathname } = useLocation()
  const dark = false
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => { const s = () => setScrolled(window.scrollY > 40); s(); window.addEventListener('scroll', s, { passive: true }); return () => window.removeEventListener('scroll', s) }, [])
  useEffect(() => { const l = (window as any).__lenis; open ? l?.stop() : l?.start(); document.body.style.overflow = open ? 'hidden' : ''
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); window.addEventListener('keydown', k); return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; l?.start() } }, [open])
  const tx = dark ? 'text-on-dark' : 'text-emerald'
  return (<>
    <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${scrolled ? 'border-night/10 bg-white/75 shadow-sm backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
      <nav className={`wrap flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-20'}`} aria-label="Main">
        <Link to="/" className={`font-display text-2xl font-semibold ${tx}`}>Dr. Shweta Shete</Link>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map(([to, t]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `relative text-sm font-medium transition ${dark ? 'text-on-dark hover:text-marigold' : isActive ? 'text-clay' : 'text-emerald hover:text-clay'}`}>
            {({ isActive }) => <>{t}{isActive && <motion.span layoutId="nav-underline" className={`absolute -bottom-1.5 left-0 right-0 h-0.5 ${dark ? 'bg-marigold' : 'bg-clay'}`}/>}</>}</NavLink>)}
          <Link to="/consultation" className={dark ? 'btn-gold !py-2.5' : 'btn-primary !py-2.5'}>Online Consultation</Link></div>
        <button className={`rounded-lg p-2 lg:hidden ${tx}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></nav></header>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .3 }} className="fixed inset-0 z-30 overflow-y-auto bg-cream pt-20 lg:hidden">
      <div className="wrap flex flex-col py-8">{links.map(([to, t]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `border-b border-night/10 py-4 font-display text-3xl ${isActive ? 'text-clay' : 'text-emerald'}`}>{t}</NavLink>)}
        <Link to="/consultation" className="btn-primary mt-8">Book Online Consultation</Link></div></motion.div>}</AnimatePresence></>)
}
