import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, IndianRupee, Plus, Video } from 'lucide-react'
import type { Service } from '../../types'
import { strings } from '../../i18n/strings'
import { formatDuration, formatFee } from '../../utils/format'

interface Props { service: Service; index: number; open: boolean; onToggle: () => void }

/** An expandable editorial row. Marketing pages are in English; the Marathi name is shown as a subtitle. */
export default function ServiceCard({ service, index, open, onToggle }: Props) {
  const t = strings.en
  const panelId = `service-panel-${service.id}`
  return (
    <li className={`group relative border-b border-forest/15 transition-colors duration-500 ${open ? 'bg-sage-mist/70' : 'hover:bg-sage-mist/40'}`}>
      <h3 className="m-0">
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={panelId} className="flex w-full items-center gap-4 px-2 py-6 text-left sm:gap-7 sm:px-5 sm:py-7">
          <span className={`font-display text-3xl font-medium tabular-nums transition-colors duration-500 sm:text-5xl ${open ? 'text-terracotta' : 'text-gold'}`}>{String(index + 1).padStart(2, '0')}</span>
          <span className="flex-1">
            <span className="block font-display text-[1.55rem] font-semibold leading-tight text-forest-deep sm:text-[2rem]">{service.name.en}</span>
          </span>
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ${open ? 'rotate-45 border-terracotta bg-terracotta text-ivory' : 'border-forest/30 text-forest group-hover:border-forest'}`}><Plus className="h-5 w-5" /></span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={panelId} role="region" aria-label={service.name.en} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="grid gap-6 px-2 pb-8 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10 sm:px-5 sm:pl-[5.5rem]">
              <div>
                <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-muted">{service.description.en}</p>
                <ul className="mt-5 flex flex-wrap gap-2 text-[0.8rem] font-semibold text-forest">
                  <li className="flex items-center gap-1.5 rounded-full border border-forest/20 bg-ivory px-3.5 py-1.5"><Clock className="h-3.5 w-3.5 text-terracotta" />{formatDuration(service, t)}</li>
                  <li className="flex items-center gap-1.5 rounded-full border border-forest/20 bg-ivory px-3.5 py-1.5"><IndianRupee className="h-3.5 w-3.5 text-terracotta" />Fee: {formatFee(service, t, 'en')}</li>
                  {service.online && <li className="flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-1.5 text-ivory"><Video className="h-3.5 w-3.5" />Online consultation</li>}
                </ul>
              </div>
              <Link to={`/book?service=${service.id}`} className="btn-primary group/b self-start sm:self-end">Book This Service <ArrowUpRight className="h-4 w-4 transition-transform group-hover/b:-translate-y-0.5 group-hover/b:translate-x-0.5" /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}
