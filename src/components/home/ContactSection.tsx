import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { doctor } from '../../data/doctor'
import { LIVE } from '../../data/mode'
import { sendContact } from '../../data/api'
import { strings } from '../../i18n/strings'
import { makeContactSchema } from '../../utils/schema'
import { Reveal, RiseHeading } from '../ui/Reveal'
import { Sprig } from '../botanical/Botanicals'

interface Form { name: string; contact: string; message: string }

export default function ContactSection() {
  const e = strings.en.errors
  const schema = useMemo(() => makeContactSchema({ ...e }), [e])
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema), mode: 'onTouched' })
  const [sent, setSent] = useState(false)
  const [fail, setFail] = useState(false)
  const submit = async (d: Form) => {
    setFail(false)
    try { await sendContact(d); setSent(true); reset() } catch { setFail(true) }
  }
  const details = [
    { icon: Phone, label: 'Phone', value: doctor.phone, href: doctor.phoneHref },
    { icon: Mail, label: 'Email', value: doctor.email, href: `mailto:${doctor.email}` },
    { icon: MapPin, label: 'Location', value: doctor.location },
  ]
  return (
    <section className="relative overflow-hidden bg-ivory py-20 sm:py-28">
      <Sprig aria-hidden className="pointer-events-none absolute -right-8 top-10 h-96 text-sage/50" />
      <div className="wrap relative grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <Reveal><p className="eyebrow">Contact</p></Reveal>
          <RiseHeading text="We would love to hear from you" className="h-section mt-6" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-ink-muted">For questions about consultations, reach out using any of the details below. To book a consultation, please use the booking page.</p>
            <ul className="mt-10 space-y-6">
              {details.map(d => (
                <li key={d.label} className="flex items-center gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold text-forest"><d.icon className="h-5 w-5" strokeWidth={1.5} /></span>
                  <span><span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">{d.label}</span>
                    {d.href ? <a href={d.href} className="link-u break-all font-display text-2xl font-semibold text-forest-deep">{d.value}</a> : <span className="font-display text-2xl font-semibold text-forest-deep">{d.value}</span>}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-[2rem] border border-forest/15 bg-white p-6 shadow-[0_40px_80px_-50px_rgba(23,55,44,.6)] sm:p-9">
            {sent ? (
              <div role="status" className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-forest" strokeWidth={1.4} />
                <h3 className="mt-4 text-3xl">Thank you</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">{LIVE ? 'Your message has been sent. The doctor will reply to you by email.' : <>This is a demonstration form — your message has <b>not</b> been sent. Please call or email using the details shown for now.</>}</p>
                <button type="button" className="btn-outline btn-sm mt-6" onClick={() => setSent(false)}>Write another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
                <h3 className="text-3xl">Send a message</h3>
                {[
                  { id: 'name', label: strings.en.contactName, ph: 'e.g. Sneha Patil', ac: 'name' },
                  { id: 'contact', label: strings.en.contactContact, ph: 'name@example.com', ac: 'email' },
                ].map(f => (
                  <div key={f.id}>
                    <label htmlFor={`c-${f.id}`} className="label">{f.label}</label>
                    <input id={`c-${f.id}`} className="field" placeholder={f.ph} autoComplete={f.ac} aria-invalid={!!errors[f.id as keyof Form]} {...register(f.id as keyof Form)} />
                    {errors[f.id as keyof Form] && <p role="alert" className="err"><AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />{errors[f.id as keyof Form]?.message}</p>}
                  </div>
                ))}
                <div>
                  <label htmlFor="c-message" className="label">{strings.en.contactMessage}</label>
                  <textarea id="c-message" rows={4} className="field resize-y" placeholder="How can we help?" aria-invalid={!!errors.message} {...register('message')} />
                  {errors.message && <p role="alert" className="err"><AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />{errors.message.message}</p>}
                </div>
                {fail && <p role="alert" className="err">{strings.en.genericError}</p>}
                <button type="submit" className="btn-primary w-full sm:w-auto" disabled={isSubmitting}>{isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}{strings.en.send}</button>
                {!LIVE && <p className="text-xs text-ink-muted">Demo mode: messages are not delivered yet.</p>}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
