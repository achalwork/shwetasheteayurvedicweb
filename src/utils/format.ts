import type { Service, UiLang } from '../types'
import type { Strings } from '../i18n/strings'

export const formatFee = (service: Service, t: Strings, l: UiLang) =>
  service.fee == null ? t.feeTbc : `₹${service.fee.toLocaleString(l === 'mr' ? 'mr-IN-u-nu-latn' : 'en-IN')}`

export const formatDuration = (service: Service, t: Strings) => `${service.durationMinutes} ${t.minutes}`

export const scrollToId = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis
  if (lenis) lenis.scrollTo(el, { offset: -72 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
