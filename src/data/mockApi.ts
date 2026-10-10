// Mock/demo fallback — used when VITE_API_URL is not set.
// Returns sample data; nothing is sent anywhere.
import type { Booking, Slot } from '../types'
import { slotsFor } from './availability'

export async function getSlots(serviceId: string, date: string): Promise<Slot[]> {
  await new Promise(r => setTimeout(r, 400))
  return slotsFor(serviceId, date)
}

export async function createBooking(b: Booking): Promise<string> {
  await new Promise(r => setTimeout(r, 600))
  const id = Math.floor(Math.random() * 90000) + 10000
  return `SHETE-${new Date().getFullYear()}-${id}`
}

export async function sendContact(_m: { name: string; contact: string; message: string }): Promise<void> {
  await new Promise(r => setTimeout(r, 400))
}
