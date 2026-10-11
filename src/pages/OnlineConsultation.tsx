import { Link } from 'react-router-dom'
import { Headphones, Languages, Wifi } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import HowItWorks from '../components/home/HowItWorks'
import FAQSection from '../components/home/FAQSection'
import FinalCTA from '../components/home/FinalCTA'
import { Reveal } from '../components/ui/Reveal'
import { useLang } from '../hooks/useLang'

const ICONS = [Wifi, Headphones, Languages]

export default function OnlineConsultation() {
  const { site } = useLang()
  const o = site.online
  const prep = o.prep.map((p, i) => ({ ...p, icon: ICONS[i] }))
  return (
    <>
      <PageHeader eyebrow={o.eyebrow} title={o.title}>{o.sub}</PageHeader>
      <HowItWorks />
      <section className="bg-beige py-20 sm:py-24">
        <div className="wrap">
          <Reveal><h2 className="h-section max-w-2xl">{o.prepTitle}</h2></Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {prep.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <p.icon className="h-8 w-8 text-terracotta" strokeWidth={1.4} />
                <h3 className="mt-5 font-display text-3xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-ink-muted">{p.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}><Link to="/book" className="btn-primary mt-12">{o.book}</Link></Reveal>
        </div>
      </section>
      <FAQSection />
      <FinalCTA />
    </>
  )
}
