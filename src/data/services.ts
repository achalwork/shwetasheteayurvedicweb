import type { Service } from '../types'
import { LIVE, SLOT_MINUTES } from './mode'

/**
 * CENTRAL SERVICE CONFIGURATION
 * Everything about a service (name, description, duration, fee, visibility) is edited here only.
 * These are DRAFT services: the doctor must review them before publishing.
 * `fee: null` renders as "To be confirmed" — set a number (in INR) when the fee is decided.
 */
const RAW_SERVICES: Service[] = [
  {
    id: 'general-consultation',
    category: 'consultation',
    name: { en: 'General Ayurvedic Consultation', mr: 'General Ayurvedic Consultation' },
    description: {
      en: 'A personalized one-to-one consultation to talk through your concerns, daily habits and health history, with Ayurvedic guidance shaped around you.',
      mr: 'A personalized one-to-one consultation to talk through your concerns, daily habits and health history, with Ayurvedic guidance shaped around you.',
    },
    durationMinutes: 30,
    fee: null,
    isActive: true,
    online: true,
  },
  {
    id: 'lifestyle-wellness',
    category: 'wellness',
    name: { en: 'Lifestyle and Wellness Consultation', mr: 'Lifestyle and Wellness Consultation' },
    description: {
      en: 'Look at sleep, routine, work and seasonal habits together, and explore Ayurvedic ways to bring more balance into everyday life.',
      mr: 'Look at sleep, routine, work and seasonal habits together, and explore Ayurvedic ways to bring more balance into everyday life.',
    },
    durationMinutes: 45,
    fee: null,
    isActive: true,
    online: true,
  },
  {
    id: 'stress-wellbeing',
    category: 'wellness',
    name: { en: 'Stress and Wellbeing Consultation', mr: 'Stress and Wellbeing Consultation' },
    description: {
      en: 'A calm, unhurried conversation about everyday stress, rest and mental wellbeing from an Ayurvedic point of view.',
      mr: 'A calm, unhurried conversation about everyday stress, rest and mental wellbeing from an Ayurvedic point of view.',
    },
    durationMinutes: 30,
    fee: null,
    isActive: true,
    online: true,
  },
  {
    id: 'diet-routine',
    category: 'wellness',
    name: { en: 'Ayurvedic Diet and Daily Routine Guidance', mr: 'Ayurvedic Diet and Daily Routine Guidance' },
    description: {
      en: 'Practical guidance on food habits and a daily routine (dinacharya) that suits your season, lifestyle and preferences.',
      mr: 'Practical guidance on food habits and a daily routine (dinacharya) that suits your season, lifestyle and preferences.',
    },
    durationMinutes: 30,
    fee: null,
    isActive: true,
    online: true,
  },
  {
    id: 'follow-up',
    category: 'follow-up',
    name: { en: 'Follow-up Consultation', mr: 'Follow-up Consultation' },
    description: {
      en: 'A shorter check-in for existing patients to review how things are going and talk through any questions.',
      mr: 'A shorter check-in for existing patients to review how things are going and talk through any questions.',
    },
    durationMinutes: 15,
    fee: null,
    isActive: true,
    online: true,
  },
  {
    id: 'online-consultation',
    category: 'consultation',
    name: { en: 'Online Consultation', mr: 'Online Consultation' },
    description: {
      en: 'A video consultation from the comfort of home, for patients who prefer not to travel to Kolhapur.',
      mr: 'A video consultation from the comfort of home, for patients who prefer not to travel to Kolhapur.',
    },
    durationMinutes: 30,
    fee: null,
    isActive: true,
    online: true,
  },
]

/** In LIVE mode every appointment has the backend's fixed slot length (CONSULT_DURATION_MIN). */
export const services: Service[] = LIVE ? RAW_SERVICES.map(x => ({ ...x, durationMinutes: SLOT_MINUTES })) : RAW_SERVICES

export const activeServices = services.filter(s => s.isActive)
export const getService = (id: string | null | undefined) => services.find(s => s.id === id && s.isActive)
