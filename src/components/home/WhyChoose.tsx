import { CalendarClock, HeartHandshake, MessageCircle, Sprout, Video } from 'lucide-react'
import { Reveal, RiseHeading } from '../ui/Reveal'
import { Leaf } from '../botanical/Botanicals'
import { useLang } from '../../hooks/useLang'

const ICONS = [HeartHandshake, Video, Sprout, CalendarClock, MessageCircle]

export default function WhyChoose() {
  const { site } = useLang()
  const w = site.why
  const items = w.items.map((it, i) => ({ ...it, icon: ICONS[i] }))
  return (
    <section className="relative overflow-hidden bg-beige py-24 sm:py-32">
      <Leaf aria-hidden className="pointer-events-none absolute -right-10 top-10 h-72 rotate-[20deg] text-forest/15" />
      <Leaf aria-hidden className="pointer-events-none absolute -left-12 bottom-6 h-56 -rotate-[28deg] text-terracotta/20" />
      <div className="wrap relative grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
        <div>
          <Reveal><p className="eyebrow">{w.eyebrow}</p></Reveal>
          <RiseHeading text={w.heading} className="h-section mt-6" />
          <Reveal delay={0.1}><p className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-ink-muted">{w.intro}</p></Reveal>
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
