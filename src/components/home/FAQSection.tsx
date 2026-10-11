import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import { Reveal, RiseHeading } from '../ui/Reveal'

export default function FAQSection() {
  const { site } = useLang()
  const faqs = site.faq.items
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
        <div>
          <Reveal><p className="eyebrow">{site.faq.eyebrow}</p></Reveal>
          <RiseHeading text={site.faq.heading} className="h-section mt-6" />
        </div>
        <Reveal>
          <ul className="border-t border-forest/20">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <li key={f.q} className="border-b border-forest/20">
                  <h3 className="m-0 font-sans">
                    <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                      <span className="font-display text-[1.45rem] font-semibold leading-snug text-forest-deep sm:text-[1.65rem]">{f.q}</span>
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${isOpen ? 'rotate-45 border-terracotta bg-terracotta text-ivory' : 'border-forest/30 text-forest'}`}><Plus className="h-4 w-4" /></span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`faq-${i}`} role="region" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                        <p className="max-w-2xl pb-6 text-[1rem] leading-relaxed text-ink-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
