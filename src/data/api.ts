// Data layer used by the UI. In LIVE mode (VITE_API_URL set) it calls the Spring Boot backend;
// otherwise it falls back to the demo implementation in mockApi.ts.
import type { Booking, Slot } from '../types'
import { normalizeMobile } from '../utils/schema'
import { getService } from './services'
import { API_BASE, LIVE } from './mode'
import * as mock from './mockApi'

/** status 0 = network error / server unreachable. */
export class ApiError extends Error {
  constructor(public status: number, message: string, public fieldErrors: Record<string, string> = {}) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_BASE}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) } })
  } catch {
    throw new ApiError(0, 'Network error')
  }
  let data: { message?: string; fieldErrors?: Record<string, string> } = {}
  try { data = await res.json() } catch { /* empty body */ }
  if (!res.ok) throw new ApiError(res.status, data.message ?? '', data.fieldErrors ?? {})
  return data as T
}

/** GET /api/slots?date=YYYY-MM-DD  ->  [{ time: "10:00", label: "10:00 AM", available }] */
export async function getSlots(serviceId: string, date: string): Promise<Slot[]> {
  if (!LIVE) return mock.getSlots(serviceId, date)
  const rows = await request<{ time: string; available: boolean }[]>(`/api/slots?date=${encodeURIComponent(date)}`)
  return rows.map(r => ({ time: r.time, available: r.available }))
}

/** POST /api/bookings  ->  returns the booking reference (e.g. SHETE-2026-00012). */
export async function createBooking(b: Booking): Promise<string> {
  if (!LIVE) return mock.createBooking(b)
  const p = b.patient
  if (!p || !b.date || !b.time) throw new ApiError(400, 'Incomplete booking')
  const res = await request<{ reference: string }>('/api/bookings', {
    method: 'POST',
    body: JSON.stringify({
      date: b.date,
      time: b.time,
      name: p.fullName.trim(),
      mobile: normalizeMobile(p.mobile) ?? p.mobile,
      email: p.email.trim(),
      language: p.language,
      reason: p.reason.trim(),
      notes: p.notes?.trim() || null,
      consent: p.consent,
      service: getService(b.serviceId)?.name.en ?? null,
    }),
  })
  return res.reference
}

/** POST /api/contact  (backend needs a valid email + a message of 10+ characters). */
export async function sendContact(m: { name: string; contact: string; message: string }): Promise<void> {
  if (!LIVE) return mock.sendContact(m)
  await request('/api/contact', { method: 'POST', body: JSON.stringify({ name: m.name.trim(), email: m.contact.trim(), message: m.message.trim() }) })
}
