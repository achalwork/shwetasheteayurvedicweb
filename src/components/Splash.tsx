import { useEffect, useState } from 'react'; import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
export default function Splash() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => { try { return !reduce && !sessionStorage.getItem('splash') } catch { return false } })
  useEffect(() => { if (!show) return; try { sessionStorage.setItem('splash', '1') } catch { /* ignore */ } const t = setTimeout(() => setShow(false), 1600); return () => clearTimeout(t) }, [show])
  return (<AnimatePresence>{show && <motion.div exit={{ y: '-100%' }} transition={{ duration: .8, ease: [.76, 0, .24, 1] }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream px-6 text-center text-emerald">
    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .7 }} className="font-display text-4xl sm:text-6xl">Dr. Shweta Sanjay Shete</motion.p>
    <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .5, duration: .8 }} className="mt-5 h-px w-40 origin-left bg-saffron"/>
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }} className="mt-4 text-sm text-ink-muted">MD (Rachana Sharir) · B.A.M.S.</motion.p></motion.div>}</AnimatePresence>)
}
