import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Info, Check, Clock, IndianRupee, Loader2, Video } from 'lucide-react'
import { useBooking } from '../../hooks/useBooking'
import { useHtmlLang, useLang } from '../../hooks/useLang'
import { getService } from '../../data/services'
import { ApiError, createBooking } from '../../data/api'
import { formatDuration, formatFee } from '../../utils/format'
import { formatDate, formatTime } from '../../utils/date'
import type { Patient } from '../../types'
import DoctorProfile from './DoctorProfile'
import ServiceSelector from './ServiceSelector'
import BookingCalendar from './BookingCalendar'
import TimeSlotPicker from './TimeSlotPicker'
import PatientDetailsForm from './PatientDetailsForm'
import BookingSummary from './BookingSummary'

const STEP = { SERVICE: 1, DATE: 2, TIME: 3, DETAILS: 4, REVIEW: 5 } as const

export default function AppointmentBooking() {
  const { t, lang } = useLang()
  useHtmlLang(lang)
  const { booking, step, setStep, update } = useBooking()
  const [params] = useSearchParams()
  const nav = useNavigate()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const panelTop = useRef<HTMLDivElement>(null)

  // Deep link from the services list: /book?service=<id>
  useEffect(() => {
    const id = params.get('service')
    if (id && getService(id) && id !== booking.serviceId) { update({ serviceId: id, date: null, time: null }); setStep(STEP.DATE) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const service = getService(booking.serviceId)
  // Never show a step whose prerequisites are missing (e.g. after a refresh)
  const maxStep = !service ? STEP.SERVICE : !booking.date ? STEP.DATE : !booking.time ? STEP.TIME : booking.patient ? STEP.REVIEW : STEP.DETAILS
  const cur = Math.min(step, maxStep)

  const go = (n: number) => { setStep(n); requestAnimationFrame(() => panelTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })) }
  const pickService = (id: string) => { update({ serviceId: id, date: null, time: null }); go(STEP.DATE) }
  const pickDate = (d: string) => { update({ date: d, time: null }); setStep(STEP.TIME) }
  const confirm = async () => {
    setBusy(true); setErr('')
    try { const reference = await createBooking(booking); update({ reference }); nav('/confirmation') }
    catch (e) {
      if (e instanceof ApiError && e.status === 409) { setErr(t.slotTaken); update({ time: null }); go(STEP.TIME) }   // someone else booked it first
      else if (e instanceof ApiError && e.status === 0) setErr(t.networkError)
      else if (e instanceof ApiError && e.status === 400 && e.message) setErr(Object.values(e.fieldErrors)[0] ?? e.message)
      else setErr(t.genericError)
    } finally { setBusy(false) }
  }
  const savePatient = (p: Patient) => { setErr(''); update({ patient: p }); go(STEP.REVIEW) }

  // progress: Date & Time are two steps in the indicator
  const reached = (i: number) => i + 1 <= maxStep

  const selectedPanel = service && (
    <div className="rounded-3xl bg-forest-deep p-6 text-ivory on-dark">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-light">{t.selectedService}</p>
      <h3 className="mt-2 font-display text-[1.8rem] font-semibold leading-tight !text-ivory">{service.name[lang]}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ivory/75">{service.description[lang]}</p>
      <ul className="mt-5 space-y-2.5 text-sm">
        <li className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-gold-light" />{t.duration}: <b className="font-semibold">{formatDuration(service, t)}</b></li>
        <li className="flex items-center gap-2.5"><IndianRupee className="h-4 w-4 text-gold-light" />{t.fee}: <b className="font-semibold">{formatFee(service, t, lang)}</b></li>
        {service.online && <li className="flex items-center gap-2.5"><Video className="h-4 w-4 text-gold-light" /><span className="rounded-full bg-gold-light px-3 py-0.5 text-xs font-bold text-forest-deep">{t.onlineBadge}</span></li>}
      </ul>
      <button type="button" onClick={() => go(STEP.SERVICE)} className="mt-5 text-sm font-semibold text-gold-light underline underline-offset-4 hover:text-ivory">{t.changeService}</button>
    </div>
  )

  return (
    <>
      <section className="on-dark relative overflow-hidden bg-forest-deep pb-24 pt-14 text-ivory sm:pt-20">
        <div aria-hidden className="leaf-pattern pointer-events-none absolute inset-0 opacity-40 invert" />
        <div className="wrap relative flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">{t.sampleAvailability}</p>
            <h1 className="mt-4 text-[clamp(2.6rem,6vw,4.6rem)] !text-ivory">{t.bookTitle}</h1>
            <p className="mt-4 text-[1.05rem] text-ivory/75">{t.bookIntro}</p>
          </div>
        </div>
      </section>

      <div className="wrap relative z-10 -mt-14 pb-20" ref={panelTop} style={{ scrollMarginTop: '5rem' }}>


        <div className="overflow-hidden rounded-[2rem] border border-forest/15 bg-ivory shadow-[0_40px_90px_-50px_rgba(23,55,44,.65)]">
          {/* progress */}
          <ol aria-label={t.stepsLabel} className="grid grid-cols-5 border-b border-forest/15 bg-white">
            {t.steps.map((label, i) => {
              const n = i + 1, active = cur === n, done = n < cur
              const clickable = reached(i) && n < cur
              return (
                <li key={label} aria-current={active ? 'step' : undefined} className="relative">
                  <button type="button" disabled={!clickable} onClick={() => go(n)} className={`flex w-full flex-col items-center gap-1.5 px-1 py-4 text-center text-[0.72rem] font-semibold transition sm:flex-row sm:justify-center sm:gap-2.5 sm:text-sm ${active ? 'text-forest-deep' : done ? 'text-forest hover:bg-sage-mist' : 'text-ink-muted/60'} disabled:cursor-default`}>
                    <span className={`grid h-7 w-7 place-items-center rounded-full border text-xs transition-colors ${active ? 'border-forest bg-forest text-ivory' : done ? 'border-forest bg-sage text-forest-deep' : 'border-forest/20'}`}>{done ? <Check className="h-3.5 w-3.5" /> : n}</span>
                    <span>{label}</span>
                  </button>
                  {active && <motion.span layoutId="step-underline" className="absolute inset-x-3 bottom-0 h-0.5 bg-terracotta" />}
                </li>
              )
            })}
          </ol>

          <motion.div key={cur === STEP.DATE || cur === STEP.TIME ? 'pick' : cur} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="p-5 sm:p-8 lg:p-10">
            {cur === STEP.SERVICE && (
              <div>
                <h2 className="text-[2.2rem]">{t.chooseService}</h2>
                <p className="mb-7 mt-2 max-w-xl text-sm text-ink-muted">{t.chooseServiceHint}</p>
                <ServiceSelector selectedId={booking.serviceId} onSelect={pickService} />
              </div>
            )}

            {(cur === STEP.DATE || cur === STEP.TIME) && service && (
              <div className="grid gap-8 lg:grid-cols-[17.5rem_1fr_18rem] lg:gap-10">
                {/* left: doctor + service */}
                <div className="space-y-6 lg:order-1">
                  <div className="hidden lg:block"><DoctorProfile /></div>
                  <div className="lg:hidden"><DoctorProfile compact /></div>
                  {selectedPanel}
                </div>
                {/* centre: calendar */}
                <div className={`lg:order-2 ${cur === STEP.TIME ? 'hidden lg:block' : ''}`}>
                  <h2 className="mb-5 text-[2rem]">{t.chooseDate}</h2>
                  <BookingCalendar serviceId={service.id} selected={booking.date} onSelect={pickDate} />
                </div>
                {/* right: time + summary */}
                <div className={`space-y-6 lg:order-3 ${cur === STEP.DATE ? 'hidden lg:block' : ''}`}>
                  <div>
                    <div className="mb-5 flex items-baseline justify-between gap-3">
                      <h2 className="text-[2rem]">{t.chooseTime}</h2>
                      <button type="button" onClick={() => setStep(STEP.DATE)} className="text-sm font-semibold text-terracotta-dark underline underline-offset-4 lg:hidden">{t.changeDate}</button>
                    </div>
                    {err && cur === STEP.TIME && <p role="alert" className="err mb-4">{err}</p>}
                    {booking.date && <p className="mb-4 text-sm font-medium text-forest">{formatDate(booking.date, lang)}</p>}
                    <TimeSlotPicker serviceId={service.id} date={booking.date} selected={booking.time} onSelect={tm => { setErr(''); update({ time: tm }) }} />
                  </div>
                  {booking.date && booking.time && (
                    <div className="rounded-2xl border border-gold/60 bg-beige-light p-4 text-sm" aria-live="polite">
                      <p className="font-semibold text-forest-deep">{formatDate(booking.date, lang)}</p>
                      <p className="text-ink-muted">{formatTime(booking.time)} IST · {formatDuration(service, t)}</p>
                    </div>
                  )}
                  <button type="button" className="btn-primary w-full" disabled={!booking.date || !booking.time} onClick={() => go(STEP.DETAILS)}>{t.continue}<ArrowRight className="h-4 w-4" /></button>
                </div>
              </div>
            )}

            {cur === STEP.DETAILS && (
              <div className="grid gap-10 lg:grid-cols-[1fr_21rem]">
                <div><h2 className="mb-7 text-[2.2rem]">{t.yourDetails}</h2><PatientDetailsForm defaults={booking.patient} onBack={() => go(STEP.TIME)} onSubmit={savePatient} /></div>
                <div className="lg:sticky lg:top-24 lg:self-start"><BookingSummary booking={booking} /></div>
              </div>
            )}

            {cur === STEP.REVIEW && booking.patient && (
              <div className="grid gap-10 lg:grid-cols-[1fr_21rem]">
                <div>
                  <h2 className="text-[2.2rem]">{t.reviewTitle}</h2>
                  <dl className="mt-6 divide-y divide-forest/10 rounded-2xl border border-forest/15 bg-white px-5 text-sm">
                    {[
                      [t.fullName, booking.patient.fullName],
                      [t.mobile, `+91 ${booking.patient.mobile}`],
                      [t.email, booking.patient.email],
                      [t.prefLang, booking.patient.language],
                      [t.reason, booking.patient.reason],
                      ...(booking.patient.notes?.trim() ? [[t.notes, booking.patient.notes]] : []),
                    ].map(([k, v]) => (
                      <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[10rem_1fr]"><dt className="font-semibold text-forest">{k}</dt><dd className="whitespace-pre-wrap break-words">{v}</dd></div>
                    ))}
                  </dl>
                  <div role="note" className="mt-5 flex gap-3 rounded-2xl border border-terracotta/40 bg-terracotta/10 p-4 text-sm text-forest-deep"><Info className="mt-0.5 h-4 w-4 shrink-0 text-forest" />{t.reviewDemoNote}</div>
                  {err && <p role="alert" className="err mt-3">{err}</p>}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" className="btn-outline" onClick={() => go(STEP.DETAILS)}>{t.edit}</button>
                    <button type="button" className="btn-primary" disabled={busy} onClick={confirm}>{busy && <Loader2 className="h-4 w-4 animate-spin" />}{busy ? t.sending : t.confirmDemo}</button>
                  </div>
                </div>
                <div className="lg:sticky lg:top-24 lg:self-start"><BookingSummary booking={booking} /></div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}
