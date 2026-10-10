import type { DateStatus, Slot } from '../types'
import { addDays, dayOfWeek, fromMinutes, isPastSlot, toMinutes, todayKey } from '../utils/date'
import { getService } from './services'
import { LIVE, MAX_DAYS } from './mode'

/**
 * MOCK AVAILABILITY — sample data for the frontend prototype ONLY.
 * Replace with real availability from the Spring Boot backend / Google Calendar later.
 * The UI labels this as "sample availability" so it is never mistaken for the real schedule.
 */
export const AVAILABILITY_IS_MOCK = !LIVE
export const MAX_DAYS_AHEAD = MAX_DAYS

interface Rule { days: number[]; windows: [string, string][] }
const DEFAULT_RULE: Rule = { days: [1, 2, 3, 4, 5, 6], windows: [['10:00', '13:00'], ['16:00', '18:30']] } // Mon–Sat
// Per-service scheduling rules (mock) so the UI proves slots change with the selected service.
const RULES: Record<string, Partial<Rule>> = {
  'lifestyle-wellness': { windows: [['10:00', '13:00']] },
  'stress-wellbeing': { days: [2, 4, 6] },
  'diet-routine': { days: [1, 3, 5] },
  'follow-up': { windows: [['16:00', '18:30']] },
}
const ruleFor = (serviceId: string): Rule => ({ ...DEFAULT_RULE, ...RULES[serviceId] })

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)

export function slotsFor(serviceId: string, date: string): Slot[] {
  const service = getService(serviceId)
  if (!service) return []
  const rule = ruleFor(serviceId)
  if (!rule.days.includes(dayOfWeek(date))) return []
  const out: Slot[] = []
  for (const [from, to] of rule.windows) {
    for (let t = toMinutes(from); t + service.durationMinutes <= toMinutes(to); t += service.durationMinutes) {
      const time = fromMinutes(t)
      const taken = hash(date + time) % 4 === 0 // pretend ~25% of slots are already taken
      out.push({ time, available: !taken && !isPastSlot(date, time) })
    }
  }
  return out
}

export function dateStatus(serviceId: string, date: string): DateStatus {
  const today = todayKey()
  if (date < today) return 'past'
  if (date > addDays(today, MAX_DAYS_AHEAD)) return 'out'
  // LIVE: the backend decides real availability per date (GET /api/slots). It is closed on Sundays;
  // a fully booked day simply shows "no times free" once selected.
  if (LIVE) return dayOfWeek(date) === 0 ? 'closed' : 'available'
  if (!ruleFor(serviceId).days.includes(dayOfWeek(date))) return 'closed'
  return slotsFor(serviceId, date).some(s => s.available) ? 'available' : 'full'
}
