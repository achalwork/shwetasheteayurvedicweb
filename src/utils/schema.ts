import { z } from 'zod'

const DEVANAGARI_DIGITS = '०१२३४५६७८९'
/** Converts Devanagari digits to ASCII so "९८७६५४३२१०" is accepted too. */
export const toAsciiDigits = (s: string) => s.replace(/[०-९]/g, ch => String(DEVANAGARI_DIGITS.indexOf(ch)))

/** Returns a clean 10-digit Indian mobile number, or null if invalid. Accepts +91 / 91 / 0 prefixes. */
export function normalizeMobile(raw: string): string | null {
  let d = toAsciiDigits(raw).replace(/[\s\-().]/g, '')
  if (d.startsWith('+')) d = d.slice(1)
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2)
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1)
  return /^[6-9]\d{9}$/.test(d) ? d : null
}

/**
 * Names: any script is allowed (Devanagari, Latin, other Indian scripts).
 * Letters (\p{L}), combining marks such as matras/virama (\p{M}), spaces, . ' ’ - and ZWJ/ZWNJ (conjuncts).
 * The name is NEVER transliterated or altered — only leading/trailing whitespace is trimmed.
 */
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\p{Zs}.'’\-‌‍]*$/u

export interface ErrorMessages {
  nameRequired: string
  nameInvalid: string
  mobileInvalid: string
  emailInvalid: string
  reasonShort: string
  consentRequired: string
}

export const makePatientSchema = (m: ErrorMessages) =>
  z.object({
    fullName: z.string().trim().min(2, m.nameRequired).max(100, m.nameInvalid).regex(NAME_RE, m.nameInvalid),
    mobile: z.string().refine(v => normalizeMobile(v) !== null, m.mobileInvalid),
    email: z.string().trim().email(m.emailInvalid),
    language: z.enum(['Marathi', 'Hindi', 'English']),
    reason: z.string().trim().min(5, m.reasonShort),
    notes: z.string().optional(),
    consent: z.boolean().refine(v => v, m.consentRequired),
  })

export const makeContactSchema = (m: Pick<ErrorMessages, 'nameRequired' | 'nameInvalid' | 'reasonShort'> & { contactInvalid: string }) =>
  z.object({
    name: z.string().trim().min(2, m.nameRequired).regex(NAME_RE, m.nameInvalid),
    contact: z.string().trim().email(m.contactInvalid),
    message: z.string().trim().min(10, m.reasonShort),
  })
