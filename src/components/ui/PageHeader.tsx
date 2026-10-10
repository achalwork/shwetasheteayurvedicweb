import type { ReactNode } from 'react'
import { Mandala, Sprig } from '../botanical/Botanicals'
import { Reveal, RiseHeading } from './Reveal'

export default function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-forest-deep py-20 text-ivory sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[40rem] w-[40rem] text-sage/25"><Mandala className="h-full w-full animate-spinslow" /></div>
      <Sprig aria-hidden className="pointer-events-none absolute -left-4 bottom-0 -z-10 h-64 text-sage/25" />
      <div className="wrap">
        <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
        <RiseHeading as="h1" text={title} className="mt-5 max-w-3xl text-[clamp(2.8rem,7vw,5.5rem)] !text-ivory" />
        {children && <Reveal delay={0.15}><p className="mt-6 max-w-xl text-lg text-ivory/75">{children}</p></Reveal>}
      </div>
    </section>
  )
}
