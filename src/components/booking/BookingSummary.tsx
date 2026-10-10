import { CalendarDays, Clock, IndianRupee, Leaf, Video } from 'lucide-react'
import type { Booking } from '../../types'
import { useLang } from '../../hooks/useLang'
import { getService } from '../../data/services'
import { formatDate, formatTime } from '../../utils/date'
import { formatDuration, formatFee } from '../../utils/format'

export default function BookingSummary({ booking, className = '' }: { booking: Booking; className?: string }) {
  const { t, lang } = useLang()
  const service = getService(booking.serviceId)
  const none = <span className="text-ink-muted/70">{t.noSelection}</span>
  const rows = [
    { icon: Leaf, label: t.service, value: service ? service.name[lang] : none },
    { icon: CalendarDays, label: t.date, value: booking.date ? formatDate(booking.date, lang) : none },
    { icon: Clock, label: t.time, value: booking.time ? `${formatTime(booking.time)} IST` : none },
    { icon: Clock, label: t.duration, value: service ? formatDuration(service, t) : none },
    { icon: IndianRupee, label: t.fee, value: service ? formatFee(service, t, lang) : none },
    { icon: Video, label: t.mode, value: t.modeValue },
  ]
  return (
    <section aria-live="polite" aria-label={t.summary} className={`rounded-3xl border border-gold/60 bg-beige-light p-6 ${className}`}>
      <h3 className="font-display text-2xl font-semibold">{t.summary}</h3>
      <dl className="mt-4 space-y-3.5">
        {rows.map(r => (
          <div key={r.label} className="flex gap-3">
            <r.icon className="mt-1 h-4 w-4 shrink-0 text-terracotta" />
            <div><dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">{r.label}</dt><dd className="text-[0.95rem] font-medium text-forest-deep">{r.value}</dd></div>
          </div>
        ))}
      </dl>
    </section>
  )
}
