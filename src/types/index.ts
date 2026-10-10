export type Language = 'Marathi' | 'Hindi' | 'English' // patient's preferred consultation language
export type UiLang = 'en' | 'mr' // interface language

export interface Bilingual {
  en: string
  mr: string
}

export type ServiceCategory = 'consultation' | 'wellness' | 'follow-up'

/** Configurable service. Draft content — the doctor must review before publishing. */
export interface Service {
  id: string
  category: ServiceCategory
  name: Bilingual
  description: Bilingual
  durationMinutes: number
  /** Fee in INR. `null` = not configured yet (never invent a fee). */
  fee: number | null
  isActive: boolean
  online: boolean
}

export interface Patient {
  fullName: string
  mobile: string
  email: string
  language: Language
  reason: string
  notes?: string
  consent: boolean
}

export interface Booking {
  serviceId: string | null
  date: string | null // YYYY-MM-DD (IST)
  time: string | null // HH:mm (IST, 24h)
  patient: Patient | null
  reference: string | null // demo reference only
}

export interface Slot {
  time: string
  available: boolean
}

export type DateStatus = 'available' | 'full' | 'closed' | 'past' | 'out'
