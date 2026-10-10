import { motion } from 'framer-motion'
import { CalendarCheck, Leaf, Video } from 'lucide-react'
import { Reveal, RiseHeading } from '../ui/Reveal'

const steps = [
  { n: '01', icon: Leaf, title: 'Choose Your Service', text: 'Select the consultation that suits your needs.' },
  { n: '02', icon: CalendarCheck, title: 'Select Your Appointment', text: 'Choose an available date and time.' },
  { n: '03', icon: Video, title: 'Connect Online', text: 'Receive appointment details and join your scheduled consultation.' },
]

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><p className="eyebrow">Simple &amp; unhurried</p></Reveal>
          <RiseHeading text="How It Works" className="h-section mt-6" />
        </div>
        <div className="relative mt-20 grid gap-14 md:grid-cols-3 md:gap-8">
          {/* connecting line (desktop) */}
          <motion.div aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }} className="absolute left-[16%] right-[16%] top-14 hidden h-px origin-left border-t border-dashed border-gold md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.15} className="relative text-center">
              <div className="relative mx-auto grid h-28 w-28 place-items-center rounded-full border border-gold bg-ivory">
                <span aria-hidden className="absolute inset-2 rounded-full border border-sage" />
                <s.icon className="h-8 w-8 text-forest" strokeWidth={1.4} />
                <span className="absolute -right-2 -top-1 font-display text-4xl font-medium italic text-terracotta">{s.n}</span>
              </div>
              <h3 className="mt-7 font-display text-3xl font-semibold">{s.title}</h3>
              <p className="mx-auto mt-3 max-w-[16rem] text-[0.98rem] leading-relaxed text-ink-muted">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
