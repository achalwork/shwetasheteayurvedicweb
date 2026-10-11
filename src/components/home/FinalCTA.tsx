import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Lotus, Mandala, Sprig } from '../botanical/Botanicals'
import { Reveal, RiseHeading } from '../ui/Reveal'
import { useLang } from '../../hooks/useLang'

export default function FinalCTA() {
  const { site } = useLang()
  return (
    <section className="on-dark relative isolate overflow-hidden bg-forest-deep py-28 text-center text-ivory sm:py-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 text-sage/15"><Mandala className="h-full w-full animate-spinslow" /></div>
      <Sprig aria-hidden className="pointer-events-none absolute -left-4 bottom-0 -z-10 h-80 origin-bottom animate-sway text-sage/30" />
      <Sprig aria-hidden className="pointer-events-none absolute -right-4 bottom-0 -z-10 h-80 origin-bottom -scale-x-100 animate-sway text-sage/30" />
      <div className="wrap relative">
        <Reveal><Lotus className="mx-auto w-20 text-gold-light" aria-hidden /></Reveal>
        <RiseHeading text={site.cta.heading} className="mx-auto mt-8 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] !text-ivory" />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ivory/75">{site.cta.sub}</p>
          <Link to="/book" className="btn-gold group mt-10 !px-9 !py-4">{site.cta.button} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </Reveal>
      </div>
    </section>
  )
}
