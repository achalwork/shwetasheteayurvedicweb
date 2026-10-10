import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Booking } from '../types'

const KEY = 'booking-session'
const empty: Booking = { serviceId: null, date: null, time: null, patient: null, reference: null }

interface Ctx {
  booking: Booking
  step: number
  setStep: (n: number) => void
  update: (p: Partial<Booking>) => void
  reset: () => void
}
const C = createContext<Ctx | null>(null)

function load(): Booking {
  try { return { ...empty, ...JSON.parse(sessionStorage.getItem(KEY) || '{}') } } catch { return empty }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<Booking>(load)
  const [step, setStep] = useState<number>(() => { try { return Number(sessionStorage.getItem(KEY + '-step')) || 1 } catch { return 1 } })
  useEffect(() => {
    try { sessionStorage.setItem(KEY, JSON.stringify(booking)); sessionStorage.setItem(KEY + '-step', String(step)) } catch { /* storage unavailable */ }
  }, [booking, step])
  const update = (p: Partial<Booking>) => setBooking(b => ({ ...b, ...p }))
  const reset = () => { setBooking(empty); setStep(1) }
  return <C.Provider value={{ booking, step, setStep, update, reset }}>{children}</C.Provider>
}

export const useBooking = () => {
  const c = useContext(C)
  if (!c) throw new Error('useBooking must be used inside BookingProvider')
  return c
}
