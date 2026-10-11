import type React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Video } from 'lucide-react'
import portrait from '../../assets/portrait.webp'
import { useLang } from '../../hooks/useLang'
import { Divider } from '../botanical/Botanicals'
import { scrollToId } from '../../utils/format'

const EASE = [0.22, 1, 0.36, 1] as const
const line = (delay: number) => ({ initial: { y: '108%' }, animate: { y: 0 }, transition: { duration: 1, delay, ease: EASE } })

// Photo is already shown fully at zoom 1 (container ratio = image ratio), so the only way to zoom out
// is to scale below 1. Lower = more zoomed out (0.85 = a lot, 0.95 = slight).
// The gap that appears at the edges is filled by PORTRAIT_BG, so keep it close to the wall colour in the photo.
const PORTRAIT_ZOOM = 0.93
const PORTRAIT_BG = '#e6e0d6'
// Feathers the photo edges so they melt into the blurred background (no hard border).
const FEATHER = {
  maskImage: 'linear-gradient(to right, transparent, #000 2.5%, #000 97.5%, transparent), linear-gradient(to bottom, transparent, #000 2.5%, #000 97.5%, transparent)',
  maskComposite: 'intersect',
  WebkitMaskImage: 'linear-gradient(to right, transparent, #000 2.5%, #000 97.5%, transparent), linear-gradient(to bottom, transparent, #000 2.5%, #000 97.5%, transparent)',
  WebkitMaskComposite: 'source-in',
} as React.CSSProperties

export default function HeroSection() {
  const { site, lang } = useLang()
  const doctor = site.doctor
  const h = site.hero
  const mr = lang === 'mr'
  return (
    <section className="relative isolate overflow-hidden bg-ivory">
      <div className="wrap grid items-center gap-14 pb-20 pt-10 sm:pt-14 md:grid-cols-[1.2fr_1fr] md:gap-8 lg:min-h-[calc(100vh-5rem)] lg:pb-24 lg:pt-8">
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }} className="eyebrow">{h.eyebrow}</motion.p>

          <h1 className={`mt-6 font-medium text-forest-deep ${mr ? 'text-[clamp(2.6rem,7.4vw,5.6rem)] md:text-[clamp(2.6rem,5.6vw,5.6rem)] leading-[1.25]' : 'text-[clamp(3.1rem,8.6vw,7.4rem)] md:text-[clamp(3.1rem,7vw,7.4rem)] leading-[0.92] tracking-[-0.02em]'}`} aria-label={h.lines.join(' ')}>
            <span aria-hidden className="block overflow-hidden pb-[0.08em]"><motion.span className="block" {...line(0.15)}>{h.lines[0]}</motion.span></span>
            <span aria-hidden className="block overflow-hidden pb-[0.08em]"><motion.span className="block" {...line(0.28)}>{h.lines[1]}</motion.span></span>
            <span aria-hidden className="block overflow-hidden pb-[0.1em]"><motion.span className={`block text-terracotta ${mr ? '' : 'italic'}`} {...line(0.41)}>{h.lines[2]}</motion.span></span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-8 max-w-[34rem] text-[1.12rem] leading-relaxed text-ink-muted">
            {h.sub}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }} className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/book" className="btn-primary group">{h.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            <button type="button" className="btn-outline" onClick={() => scrollToId('services')}>{h.explore}</button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: 0.8 }} className="mt-12 max-w-md">
            <Divider />
            <p className="mt-5 font-display text-2xl font-semibold text-forest-deep">{doctor.name}</p>
            <p className="mt-1 text-sm font-semibold tracking-wide text-terracotta-dark">{doctor.quals}</p>
            <p className="text-sm text-ink-muted">{doctor.location}</p>
          </motion.div>
        </div>

        {/* portrait: arch + soft backdrop + one card. Mobile pr-4/pb-4 keeps the backdrop (offset 16px) inside the screen */}
        <div className="mx-auto w-full max-w-[26rem] pb-4 pr-4 md:ml-auto md:mr-0 md:p-0 lg:max-w-[27rem]">
        <div className="relative">
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[2rem] bg-sage-light" />
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] shadow-[0_24px_60px_-30px_rgba(23,55,44,.45)]"
            style={{ backgroundColor: PORTRAIT_BG }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            {/* blurred copy of the same photo fills the gap, so there is no visible frame */}
            <img src={portrait} alt="" aria-hidden width={1024} height={1280} className="absolute inset-0 h-full w-full scale-110 object-cover object-top blur-md" />
            <img src={portrait} alt={doctor.name} width={1024} height={1280} fetchPriority="high" className="relative h-full w-full object-cover object-center" style={{ transformOrigin: '50% 55%', transform: `scale(${PORTRAIT_ZOOM})`, ...FEATHER }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="absolute -left-3 bottom-10 z-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-22px_rgba(23,55,44,.5)] sm:-left-8"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-forest text-ivory"><Video className="h-4 w-4" /></span>
            <span className="text-sm font-semibold leading-tight text-forest-deep">{h.badge}<br /><span className="font-normal text-ink-muted">{doctor.languages}</span></span>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}