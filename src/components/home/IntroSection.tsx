import { Link } from 'react-router-dom'
import { Globe2, MapPin, Video } from 'lucide-react'
import { Lotus, Mandala } from '../botanical/Botanicals'
import { Reveal, RiseHeading } from '../ui/Reveal'
import { doctor } from '../../data/doctor'

const facts = [
  { icon: Video, label: 'Online consultations', text: 'From the comfort of your home' },
  { icon: Globe2, label: 'Your language', text: 'Marathi, Hindi and English' },
  { icon: MapPin, label: 'Based in Kolhapur', text: 'Maharashtra, India' },
]

export default function IntroSection() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] text-sage/70"><Mandala className="h-full w-full animate-spinslow" petals={16} /></div>
      <div className="wrap relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow">Meet the doctor</p></Reveal>
          <RiseHeading text="A Thoughtful Approach to Ayurvedic Wellbeing" className="h-section mt-6 max-w-3xl" />
        </div>
        <div className="lg:col-span-5 lg:pt-14">
          <Reveal delay={0.1}>
            <p className="text-[1.08rem] leading-[1.85] text-ink-muted">
              <span className="float-left mr-3 mt-1 font-display text-[4.6rem] font-semibold leading-[0.78] text-terracotta">D</span>
              r. Shweta Sanjay Shete is an Ayurvedic doctor in Kolhapur, Maharashtra, with an MD in Rachana Sharir and a B.A.M.S. Her online consultations are unhurried and personal — she listens first, then looks at your concerns together with your routine, food habits and lifestyle.
            </p>
            <p className="mt-5 text-[1.08rem] leading-[1.85] text-ink-muted">
              Whether you are visiting for the first time or following up, you can choose the kind of consultation that suits you and book a time that works for you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link to="/book" className="btn-primary">Book a consultation</Link>
              <Link to="/online-consultation" className="link-u text-sm font-semibold text-forest">How online consultation works</Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-12" delay={0.1}>
          <div className="relative mt-4 grid gap-px overflow-hidden rounded-[2rem] border border-forest/15 bg-forest/15 sm:grid-cols-3">
            {facts.map(f => (
              <div key={f.label} className="group relative flex items-center gap-5 bg-ivory p-7 transition-colors duration-500 hover:bg-sage-mist">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold text-forest transition-transform duration-500 group-hover:scale-110"><f.icon className="h-5 w-5" /></span>
                <span><span className="block font-display text-xl font-semibold text-forest-deep">{f.label}</span><span className="text-sm text-ink-muted">{f.text}</span></span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-4 text-gold" aria-hidden="true"><span className="h-px w-24 bg-current opacity-60" /><Lotus className="w-14" /><span className="h-px w-24 bg-current opacity-60" /></div>
          <p className="sr-only">{doctor.name}, {doctor.quals}, {doctor.location}</p>
        </Reveal>
      </div>
    </section>
  )
}
