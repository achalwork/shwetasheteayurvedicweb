import { Link } from 'react-router-dom'
import { Headphones, Languages, Wifi } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import HowItWorks from '../components/home/HowItWorks'
import FAQSection from '../components/home/FAQSection'
import FinalCTA from '../components/home/FinalCTA'
import { Reveal } from '../components/ui/Reveal'

const prep = [
  { icon: Wifi, title: 'A stable connection', text: 'A quiet spot with a steady internet connection helps the conversation flow.' },
  { icon: Headphones, title: 'A private space', text: 'Choose a place where you can speak comfortably and hear clearly.' },
  { icon: Languages, title: 'Your language', text: 'Tell us whether you prefer Marathi, Hindi or English when you book.' },
]

export default function OnlineConsultation() {
  return (
    <>
      <PageHeader eyebrow="Online consultation" title="Ayurvedic care, from home">Consult Dr. Shweta Sanjay Shete over video — no travel needed.</PageHeader>
      <HowItWorks />
      <section className="bg-beige py-20 sm:py-24">
        <div className="wrap">
          <Reveal><h2 className="h-section max-w-2xl">Before your consultation</h2></Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {prep.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <p.icon className="h-8 w-8 text-terracotta" strokeWidth={1.4} />
                <h3 className="mt-5 font-display text-3xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-ink-muted">{p.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}><Link to="/book" className="btn-primary mt-12">Book Your Consultation</Link></Reveal>
        </div>
      </section>
      <FAQSection />
      <FinalCTA />
    </>
  )
}
