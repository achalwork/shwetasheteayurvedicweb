// Replaceable mock service layer. Swap each function body for a fetch() call to the
// Spring Boot API later (slots, bookings, contact). No keys or credentials belong in frontend code.
// Nothing here sends a WhatsApp message, email or Google Meet link — it only simulates latency.
import type { Booking, Slot } from '../types'
import { slotsFor } from './availability'

const wait = (ms: number) => new Promise(r => setTimeout(r, ms))

export async function getSlots(serviceId: string, date: string): Promise<Slot[]> {
  await wait(450)
  return slotsFor(serviceId, date)
}

/** Returns a DEMO reference. No appointment is created anywhere. */
export async function createBooking(_b: Booking): Promise<string> {
  await wait(900)
  let n = 0
  try {
    n = Number(localStorage.getItem('demo-booking-count') || 0) + 1
    localStorage.setItem('demo-booking-count', String(n))
  } catch {
    n = Math.floor(Math.random() * 900) + 100
  }
  return `DEMO-${new Date().getFullYear()}-${String(n).padStart(3, '0')}`
}

export async function sendContact(_m: { name: string; contact: string; message: string }): Promise<void> {
  await wait(700)
}
