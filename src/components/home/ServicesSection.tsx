import { useState } from 'react'
import { activeServices } from '../../data/services'
import type { ServiceCategory } from '../../types'
import { Reveal, RiseHeading } from '../ui/Reveal'
import { Lotus, Sprig } from '../botanical/Botanicals'
import ServiceCard from './ServiceCard'
import { useLang } from '../../hooks/useLang'

const FILTER_IDS: ('all' | ServiceCategory)[] = ['all', 'consultation', 'wellness', 'follow-up']

export default function ServicesSection({ withFilter = false, heading }: { withFilter?: boolean; heading?: string }) {
  const { site } = useLang()
  const s = site.services
  const filters = FILTER_IDS.map(id => ({ id, label: s.filters[id] }))
  const [filter, setFilter] = useState<'all' | ServiceCategory>('all')
  const list = activeServices.filter(s => filter === 'all' || s.category === filter)
  const [openId, setOpenId] = useState<string | null>(activeServices[0]?.id ?? null)

  return (
    <section id="services" className="relative scroll-mt-20 overflow-hidden bg-beige-light py-24 sm:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal><p className="eyebrow">{s.eyebrow}</p></Reveal>
          <RiseHeading text={heading ?? s.heading} className="h-section mt-6" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-muted">{s.intro}</p>
            <p className="mt-4 max-w-md border-l-2 border-gold pl-4 text-sm leading-relaxed text-ink-muted">{s.note}</p>
          </Reveal>
          <div aria-hidden className="relative mt-12 hidden h-72 text-forest lg:block">
            <Sprig className="absolute bottom-0 left-4 h-full origin-bottom animate-sway opacity-80" />
            <Sprig className="absolute bottom-0 left-24 h-4/5 origin-bottom animate-sway text-sage opacity-90" leaves={6} style={{ animationDelay: '-3s' }} />
            <Lotus className="absolute bottom-0 left-44 w-36 text-terracotta/80" />
          </div>
        </div>

        <div>
          {withFilter && (
            <div role="group" aria-label={s.filterLabel} className="mb-6 flex flex-wrap gap-2">
              {filters.map(f => (
                <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => { setFilter(f.id); const first = activeServices.find(s => f.id === 'all' || s.category === f.id); setOpenId(first?.id ?? null) }}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${filter === f.id ? 'border-forest bg-forest text-ivory' : 'border-forest/25 text-forest hover:border-forest'}`}>{f.label}</button>
              ))}
            </div>
          )}
          <Reveal>
            <ul className="border-t border-forest/15">
              {list.map((s, i) => <ServiceCard key={s.id} service={s} index={i} open={openId === s.id} onToggle={() => setOpenId(openId === s.id ? null : s.id)} />)}
            </ul>
            {list.length === 0 && <p className="py-10 text-ink-muted">{s.empty}</p>}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
