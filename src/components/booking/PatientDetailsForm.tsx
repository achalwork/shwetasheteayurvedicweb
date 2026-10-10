import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Language, Patient } from '../../types'
import { useLang } from '../../hooks/useLang'
import { makePatientSchema, normalizeMobile } from '../../utils/schema'

const languages: { value: Language; label: string }[] = [
  { value: 'Marathi', label: 'Marathi' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'English', label: 'English' },
]

interface Props { defaults: Patient | null; onBack: () => void; onSubmit: (p: Patient) => void }

const Err = ({ id, msg }: { id: string; msg?: string }) => msg ? <p id={id} role="alert" className="err"><AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />{msg}</p> : null

export default function PatientDetailsForm({ defaults, onBack, onSubmit }: Props) {
  const { t, lang } = useLang()
  const schema = useMemo(() => makePatientSchema(t.errors), [t])
  const { register, handleSubmit, formState: { errors } } = useForm<Patient>({
    resolver: zodResolver(schema),
    defaultValues: defaults ?? { fullName: '', mobile: '', email: '', language: lang === 'mr' ? 'Marathi' : 'English', reason: '', notes: '', consent: false },
    mode: 'onTouched',
  })
  const submit = (d: Patient) => onSubmit({
    ...d,
    fullName: d.fullName.trim(), // only surrounding whitespace is removed; the name itself is preserved exactly
    mobile: normalizeMobile(d.mobile) ?? d.mobile,
    email: d.email.trim(),
    reason: d.reason.trim(),
  })

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-6" lang={lang}>
      <div>
        <label htmlFor="fullName" className="label">{t.fullName}</label>
        <input id="fullName" className="field" autoComplete="name" placeholder={t.namePlaceholder} aria-invalid={!!errors.fullName} aria-describedby="fullName-help fullName-err" {...register('fullName')} />
        <p id="fullName-help" className="mt-1.5 text-xs text-ink-muted">{t.nameHelp}</p>
        <Err id="fullName-err" msg={errors.fullName?.message} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="mobile" className="label">{t.mobile}</label>
          <div className="flex">
            <span className="grid place-items-center rounded-l-xl border border-r-0 border-forest/20 bg-beige-light px-3.5 text-sm font-semibold text-forest">+91</span>
            <input id="mobile" type="tel" inputMode="tel" autoComplete="tel-national" className="field !rounded-l-none" placeholder={t.mobilePlaceholder} aria-invalid={!!errors.mobile} aria-describedby="mobile-err" {...register('mobile')} />
          </div>
          <Err id="mobile-err" msg={errors.mobile?.message} />
        </div>
        <div>
          <label htmlFor="email" className="label">{t.email}</label>
          <input id="email" type="email" autoComplete="email" className="field" placeholder={t.emailPlaceholder} aria-invalid={!!errors.email} aria-describedby="email-err" {...register('email')} />
          <Err id="email-err" msg={errors.email?.message} />
        </div>
      </div>

      <fieldset>
        <legend className="label">{t.prefLang}</legend>
        <div className="flex flex-wrap gap-2.5">
          {languages.map(l => (
            <label key={l.value} className="cursor-pointer">
              <input type="radio" value={l.value} className="peer sr-only" {...register('language')} />
              <span className="inline-block rounded-full border border-forest/25 bg-white px-5 py-2.5 text-sm font-semibold text-forest transition peer-checked:border-forest peer-checked:bg-forest peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-terracotta">{l.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="reason" className="label">{t.reason}</label>
        <textarea id="reason" rows={3} className="field resize-y" placeholder={t.reasonPlaceholder} aria-invalid={!!errors.reason} aria-describedby="reason-err" {...register('reason')} />
        <Err id="reason-err" msg={errors.reason?.message} />
      </div>
      <div>
        <label htmlFor="notes" className="label">{t.notes} <span className="font-normal text-ink-muted">{t.optional}</span></label>
        <textarea id="notes" rows={2} className="field resize-y" placeholder={t.notesPlaceholder} {...register('notes')} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-muted">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-forest" aria-invalid={!!errors.consent} aria-describedby="consent-err" {...register('consent')} />
          <span>{t.consent} <Link to="/privacy" target="_blank" className="font-semibold text-forest underline underline-offset-2">{t.privacyLink}</Link></span>
        </label>
        <Err id="consent-err" msg={errors.consent?.message} />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button type="button" className="btn-outline" onClick={onBack}>{t.back}</button>
        <button type="submit" className="btn-primary">{t.continue}</button>
      </div>
    </form>
  )
}
