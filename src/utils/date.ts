import type { UiLang } from '../types'

export const TZ = 'Asia/Kolkata'
export const pad = (n: number) => String(n).padStart(2, '0')
export const toKey = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`
export const parseKey = (key: string) => {
  const [y, m, d] = key.split('-').map(Number)
  return { y, m: m - 1, d }
}

/** Current date/time in IST, independent of the visitor's device time zone. */
export function nowIST() {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date()).map(x => [x.type, x.value]),
  )
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}` }
}

export const todayKey = () => nowIST().date
export const dayOfWeek = (key: string) => {
  const { y, m, d } = parseKey(key)
  return new Date(Date.UTC(y, m, d)).getUTCDay()
}
export const addDays = (key: string, n: number) => {
  const { y, m, d } = parseKey(key)
  const dt = new Date(Date.UTC(y, m, d + n))
  return toKey(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate())
}
export const daysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate()
export const toMinutes = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m }
export const fromMinutes = (n: number) => `${pad(Math.floor(n / 60))}:${pad(n % 60)}`
export const isPastSlot = (date: string, time: string) => {
  const n = nowIST()
  return date < n.date || (date === n.date && time <= n.time)
}

// Marathi uses Latin digits here so dates, times and phone numbers read consistently.
const loc = (l: UiLang) => (l === 'mr' ? 'mr-IN-u-nu-latn' : 'en-IN')

export const formatDate = (key: string, l: UiLang = 'en') => {
  const { y, m, d } = parseKey(key)
  return new Date(Date.UTC(y, m, d)).toLocaleDateString(loc(l), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
export const formatMonth = (y: number, m: number, l: UiLang = 'en') =>
  new Date(Date.UTC(y, m, 1)).toLocaleDateString(loc(l), { month: 'long', year: 'numeric', timeZone: 'UTC' })
export const weekdayShort = (l: UiLang) =>
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const formatTime = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return `${h % 12 || 12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`
}
