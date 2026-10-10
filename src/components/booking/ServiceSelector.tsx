import { Check, Clock, Video } from 'lucide-react'
import { activeServices } from '../../data/services'
import { useLang } from '../../hooks/useLang'
import { formatDuration, formatFee } from '../../utils/format'

export default function ServiceSelector({ selectedId, onSelect }: { selectedId: string | null; onSelect: (id: string) => void }) {
  const { t, lang } = useLang()
  return (
    <div role="radiogroup" aria-label={t.chooseService} className="grid gap-4 sm:grid-cols-2">
      {activeServices.map(s => {
        const on = s.id === selectedId
        return (
          <button key={s.id} type="button" role="radio" aria-checked={on} onClick={() => onSelect(s.id)}
            className={`group relative rounded-2xl border p-5 text-left transition-all duration-300 ${on ? 'border-forest bg-forest text-ivory shadow-[0_24px_50px_-28px_rgba(23,55,44,.9)]' : 'border-forest/20 bg-white hover:-translate-y-0.5 hover:border-forest/60 hover:shadow-[0_18px_40px_-28px_rgba(23,55,44,.6)]'}`}>
            <span className={`absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full border transition ${on ? 'border-gold-light bg-gold-light text-forest-deep' : 'border-forest/30 text-transparent'}`}><Check className="h-3.5 w-3.5" /></span>
            <span className={`block pr-8 font-display text-[1.45rem] font-semibold leading-tight ${on ? 'text-ivory' : 'text-forest-deep'}`}>{s.name[lang]}</span>
            <span className={`mt-2 line-clamp-2 block text-sm leading-relaxed ${on ? 'text-ivory/80' : 'text-ink-muted'}`}>{s.description[lang]}</span>
            <span className={`mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold ${on ? 'text-gold-light' : 'text-terracotta-dark'}`}>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{formatDuration(s, t)}</span>
              <span>{t.fee}: {formatFee(s, t, lang)}</span>
              {s.online && <span className="flex items-center gap-1.5"><Video className="h-3.5 w-3.5" />{t.onlineBadge}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}
