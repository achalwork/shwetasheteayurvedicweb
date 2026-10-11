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
    name: { en: 'General Ayurvedic Consultation', mr: 'सर्वसाधारण आयुर्वेदिक सल्लामसलत' },
    description: {
      en: 'A personalized one-to-one consultation to talk through your concerns, daily habits and health history, with Ayurvedic guidance shaped around you.',
      mr: 'तुमच्या तक्रारी, दैनंदिन सवयी आणि आरोग्याचा इतिहास यावर मोकळेपणाने बोलण्यासाठी वैयक्तिक, समोरासमोर सल्लामसलत — तुमच्यासाठी खास तयार केलेल्या आयुर्वेदिक मार्गदर्शनासह.',
    },
    durationMinutes: 30,
    fee: null,
    isActive: true,
    online: true,
  },
  {
    id: 'lifestyle-wellness',
    category: 'wellness',
    name: { en: 'Lifestyle and Wellness Consultation', mr: 'जीवनशैली आणि स्वास्थ्य सल्लामसलत' },
    description: {
      en: 'Look at sleep, routine, work and seasonal habits together, and explore Ayurvedic ways to bring more balance into everyday life.',
      mr: 'झोप, दिनचर्या, काम आणि ऋतूनुसार सवयी यांचा एकत्र आढावा घ्या आणि रोजच्या जीवनात अधिक समतोल आणण्याचे आयुर्वेदिक मार्ग जाणून घ्या.',
    },
    durationMinutes: 45,
    fee: null,
    isActive: true,
    online: true,
  },
  {
    id: 'stress-wellbeing',
    category: 'wellness',
    name: { en: 'Stress and Wellbeing Consultation', mr: 'ताणतणाव आणि मानसिक स्वास्थ्य सल्लामसलत' },
    description: {
      en: 'A calm, unhurried conversation about everyday stress, rest and mental wellbeing from an Ayurvedic point of view.',
      mr: 'रोजचा ताणतणाव, विश्रांती आणि मानसिक स्वास्थ्य याबद्दल आयुर्वेदाच्या दृष्टिकोनातून शांत, घाई न करता केलेला संवाद.',
    },
    durationMinutes: 30,
    fee: null,
    isActive: true,
    online: true,
  },
  {
    id: 'diet-routine',
    category: 'wellness',
    name: { en: 'Ayurvedic Diet and Daily Routine Guidance', mr: 'आयुर्वेदिक आहार आणि दिनचर्या मार्गदर्शन' },
    description: {
      en: 'Practical guidance on food habits and a daily routine (dinacharya) that suits your season, lifestyle and preferences.',
      mr: 'तुमचा ऋतू, जीवनशैली आणि आवडीनिवडी यांना साजेशा आहारसवयी आणि दिनचर्येबद्दल व्यावहारिक मार्गदर्शन.',
    },
    durationMinutes: 30,
    fee: null,
    isActive: true,
    online: true,
  },
  {
    id: 'follow-up',
    category: 'follow-up',
    name: { en: 'Follow-up Consultation', mr: 'पुनर्भेट सल्लामसलत' },
    description: {
      en: 'A shorter check-in for existing patients to review how things are going and talk through any questions.',
      mr: 'सध्याच्या रुग्णांसाठी — प्रगतीचा आढावा घेण्यासाठी आणि शंकांवर बोलण्यासाठी एक छोटी भेट.',
    },
    durationMinutes: 15,
    fee: null,
    isActive: true,
    online: true,
  },
  {
    id: 'online-consultation',
    category: 'consultation',
    name: { en: 'Online Consultation', mr: 'ऑनलाइन सल्लामसलत' },
    description: {
      en: 'A video consultation from the comfort of home, for patients who prefer not to travel to Kolhapur.',
      mr: 'कोल्हापूरला येणे ज्यांना सोयीचे नाही अशा रुग्णांसाठी घरबसल्या व्हिडिओ सल्लामसलत.',
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
