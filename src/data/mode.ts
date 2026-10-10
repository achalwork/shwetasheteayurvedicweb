/**
 * LIVE mode = the site talks to the real Spring Boot backend.
 * It is switched on by setting VITE_API_URL (e.g. http://localhost:8080). Without it the site
 * runs as a self-contained DEMO with sample availability (nothing is sent anywhere).
 */
export const API_BASE: string = ((import.meta.env.VITE_API_URL as string | undefined) ?? '').trim().replace(/\/+$/, '')
export const LIVE = API_BASE !== ''

/** Must match the backend (REMINDER_MINUTES / CONSULT_DURATION_MIN / CONSULT_MAX_DAYS). */
export const REMINDER_MINUTES = Number(import.meta.env.VITE_REMINDER_MINUTES) || 10
export const SLOT_MINUTES = Number(import.meta.env.VITE_SLOT_MINUTES) || 30
export const MAX_DAYS = Number(import.meta.env.VITE_MAX_DAYS) || 90
