import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, CalendarDays, Clock, Home, IndianRupee, Leaf, Plus, Video, Info } from 'lucide-react'
import { LIVE } from '../../data/mode'
import { useBooking } from '../../hooks/useBooking'
import { useHtmlLang, useLang } from '../../hooks/useLang'
import { getService } from '../../data/services'
import { formatDate, formatTime } from '../../utils/date'
import { formatDuration, formatFee } from '../../utils/format'
import { Lotus, Sprig } from '../botanical/Botanicals'

function SuccessMark() {
  return (
    <div className="relative mx-auto grid h-28 w-28 place-items-center">
      <motion.span aria-hidden className="absolute inset-0 rounded-full border border-gold" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 1.25, 1], opacity: [0, 1, 1] }} transition={{ duration: 1, ease: 'easeOut' }} />
      <motion.span aria-hidden className="absolute inset-3 rounded-full bg-forest" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} />
      <svg viewBox="0 0 52 52" className="relative h-14 w-14" fill="none" stroke="#FAF7EF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <motion.path d="M14 27l8 8 16-18" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }} />
      </svg>
    </div>
  )
}

export default function BookingConfirmation() {
  const { t, lang } = useLang()
  useHtmlLang(lang)
  const { booking, reset } = useBooking()
  const nav = useNavigate()
  const service = getService(booking.serviceId)
  const p = booking.patient

  if (!booking.reference || !service || !booking.date || !booking.time || !p) {
    return (
      <div className="wrap py-28 text-center">
        <Lotus className="mx-auto w-20 text-gold" aria-hidden />
        <h1 className="mt-6 text-4xl">{t.noBookingTitle}</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-muted">{t.noBookingBody}</p>
        <Link to="/book" className="btn-primary mt-8">{t.startBooking}</Link>
      </div>
    )
  }

  const rows = [
    { icon: Leaf, label: t.service, value: service.name[lang] },
    { icon: CalendarDays, label: t.date, value: formatDate(booking.date, lang) },
    { icon: Clock, label: t.time, value: `${formatTime(booking.time)} IST` },
    { icon: Clock, label: t.duration, value: formatDuration(service, t) },
    { icon: IndianRupee, label: t.fee, value: formatFee(service, t, lang) },
  ]

  return (
    <section className="relative overflow-hidden bg-sage-mist py-16 sm:py-24">
      <Sprig aria-hidden className="pointer-events-none absolute -left-6 bottom-0 h-96 text-forest/15" />
      <Sprig aria-hidden className="pointer-events-none absolute -right-6 bottom-0 h-96 -scale-x-100 text-forest/15" />
      <div className="wrap relative max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden rounded-[2rem] border border-forest/15 bg-ivory shadow-[0_40px_90px_-50px_rgba(23,55,44,.7)]">
          <div className="px-6 pb-8 pt-12 text-center sm:px-12">
            <SuccessMark />
            <p className="eyebrow mt-8 justify-center">{t.confirmTitle}</p>
            {/* patient's name is rendered exactly as entered (Devanagari preserved) */}
            <h1 lang={lang} className="mx-auto mt-4 max-w-xl text-[clamp(1.9rem,4.2vw,2.8rem)] leading-[1.25]">{t.confirmHello(p.fullName)}</h1>
          </div>

          <div role="note" className="mx-6 flex gap-3 rounded-2xl border border-terracotta/40 bg-terracotta/10 p-4 text-sm text-forest-deep sm:mx-12">
            {LIVE ? <Info className="mt-0.5 h-4 w-4 shrink-0 text-forest" /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-dark" />}
            <p><b className="font-semibold">{t.confirmDemoTitle}.</b> {t.confirmDemoBody}</p>
          </div>

          <div className="mx-6 mt-8 rounded-2xl border border-dashed border-gold bg-beige-light p-6 sm:mx-12">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/40 pb-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">{t.reference}</p>
              <p className="font-mono text-lg font-bold tracking-wider text-forest-deep">{booking.reference}</p>
            </div>
            <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {rows.map(r => (
                <div key={r.label} className="flex gap-3"><r.icon className="mt-1 h-4 w-4 shrink-0 text-terracotta" /><div><dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">{r.label}</dt><dd className="font-medium text-forest-deep">{r.value}</dd></div></div>
              ))}
            </dl>
          </div>

          <div className="mx-6 mt-6 flex gap-4 rounded-2xl bg-forest-deep p-5 text-ivory sm:mx-12">
            <Video className="mt-1 h-5 w-5 shrink-0 text-gold-light" />
            <div><p className="font-display text-xl font-semibold">{t.onlineInfoTitle}</p><p className="mt-1 text-sm leading-relaxed text-ivory/75">{t.onlineInfoBody}</p></div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 px-6 pb-12 pt-9 sm:px-12">
            <Link to="/" className="btn-outline" onClick={reset}><Home className="h-4 w-4" />{t.goHome}</Link>
            <button type="button" className="btn-primary" onClick={() => { reset(); nav('/book') }}><Plus className="h-4 w-4" />{t.bookAnother}</button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
