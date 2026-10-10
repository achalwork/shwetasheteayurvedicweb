import { CalendarClock, HeartHandshake, MessageCircle, Sprout, Video } from 'lucide-react'
import { Reveal, RiseHeading } from '../ui/Reveal'
import { Leaf } from '../botanical/Botanicals'

const items = [
  { icon: HeartHandshake, title: 'Individual attention', text: 'Every consultation is centred on you — your concerns, your routine, your questions.' },
  { icon: Video, title: 'Convenient online consultations', text: 'Speak with the doctor from home, wherever you are in Maharashtra and beyond.' },
  { icon: Sprout, title: 'A thoughtful approach to Ayurvedic wellbeing', text: 'Guidance that looks at lifestyle, food and daily rhythm together.' },
  { icon: CalendarClock, title: 'Simple appointment scheduling', text: 'Pick a service, a date and a time in a few clear steps.' },
  { icon: MessageCircle, title: 'Clear communication', text: 'In Marathi, Hindi or English — whichever you are most comfortable with.' },
]

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-beige py-24 sm:py-32">
      <Leaf aria-hidden className="pointer-events-none absolute -right-10 top-10 h-72 rotate-[20deg] text-forest/15" />
      <Leaf aria-hidden className="pointer-events-none absolute -left-12 bottom-6 h-56 -rotate-[28deg] text-terracotta/20" />
      <div className="wrap relative grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
        <div>
          <Reveal><p className="eyebrow">Why choose this practice</p></Reveal>
          <RiseHeading text="Care that feels personal, simple and clear" className="h-section mt-6" />
          <Reveal delay={0.1}><p className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-ink-muted">A calm, well-organised experience from booking to consultation — designed so you can focus on your wellbeing.</p></Reveal>
        </div>
        <ul>
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.07}>
              <li className="group flex gap-5 border-t border-forest/20 py-6 first:border-t-0 first:pt-0 sm:gap-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest text-ivory transition-colors duration-500 group-hover:bg-terracotta"><it.icon className="h-5 w-5" strokeWidth={1.6} /></span>
                <div>
                  <h3 className="font-display text-[1.7rem] font-semibold leading-tight">{it.title}</h3>
                  <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-muted">{it.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
