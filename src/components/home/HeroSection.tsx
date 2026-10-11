import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Video } from 'lucide-react'
import portrait from '../../assets/portrait.webp'
import { doctor } from '../../data/doctor'
import { Divider } from '../botanical/Botanicals'
import { scrollToId } from '../../utils/format'

const EASE = [0.22, 1, 0.36, 1] as const
const line = (delay: number) => ({ initial: { y: '108%' }, animate: { y: 0 }, transition: { duration: 1, delay, ease: EASE } })

// Photo la top-left pasun zoom kela ahe, mhanje tai frame chya center la yetat.
// Tai ajun dava kade vattat astil tar 1.5 kara, ujavya kade vattat astil tar 1.3 kara.
const PORTRAIT_ZOOM = 1.4

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ivory">
      <div className="wrap grid items-center gap-14 pb-20 pt-10 sm:pt-14 md:grid-cols-[1.2fr_1fr] md:gap-8 lg:min-h-[calc(100vh-5rem)] lg:pb-24 lg:pt-8">
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }} className="eyebrow">Ayurvedic consultations · Kolhapur</motion.p>

          <h1 className="mt-6 text-[clamp(3.1rem,8.6vw,7.4rem)] md:text-[clamp(3.1rem,7vw,7.4rem)] font-medium leading-[0.92] tracking-[-0.02em] text-forest-deep" aria-label="Discover the Wisdom of Ayurveda">
            <span aria-hidden className="block overflow-hidden pb-[0.08em]"><motion.span className="block" {...line(0.15)}>Discover the</motion.span></span>
            <span aria-hidden className="block overflow-hidden pb-[0.08em]"><motion.span className="block" {...line(0.28)}>Wisdom of</motion.span></span>
            <span aria-hidden className="block overflow-hidden pb-[0.1em]"><motion.span className="block italic text-terracotta" {...line(0.41)}>Ayurveda</motion.span></span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-8 max-w-[34rem] text-[1.12rem] leading-relaxed text-ink-muted">
            Personalized Ayurvedic consultations designed around your wellbeing, lifestyle, and individual needs.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.8 }} className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/book" className="btn-primary group">Book Your Consultation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            <button type="button" className="btn-outline" onClick={() => scrollToId('services')}>Explore Our Services</button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: 0.8 }} className="mt-12 max-w-md">
            <Divider />
            <p className="mt-5 font-display text-2xl font-semibold text-forest-deep">{doctor.name}</p>
            <p className="mt-1 text-sm font-semibold tracking-wide text-terracotta-dark">{doctor.quals}</p>
            <p className="text-sm text-ink-muted">{doctor.location}</p>
          </motion.div>
        </div>

        {/* portrait: arch + soft backdrop + one card */}
        <div className="relative mx-auto w-full max-w-[26rem] md:ml-auto md:mr-0 lg:max-w-[27rem]">
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-[2rem] bg-sage-light" />
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-beige shadow-[0_24px_60px_-30px_rgba(23,55,44,.45)]"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            <img src={portrait} alt="Dr. Shweta Sanjay Shete" width={720} height={900} fetchPriority="high" className="h-full w-full object-cover object-top" style={{ transformOrigin: '0% 0%', transform: `scale(${PORTRAIT_ZOOM})` }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="absolute -left-3 bottom-10 z-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-22px_rgba(23,55,44,.5)] sm:-left-8"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-forest text-ivory"><Video className="h-4 w-4" /></span>
            <span className="text-sm font-semibold leading-tight text-forest-deep">Online consultation<br /><span className="font-normal text-ink-muted">Marathi · Hindi · English</span></span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}