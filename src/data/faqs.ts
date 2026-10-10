import { LIVE, REMINDER_MINUTES } from './mode'

export const faqs = [
  {
    q: 'How does an online consultation work?',
    a: LIVE
      ? `Choose a service, pick an available date and time, and share a few details. Your consultation takes place on Google Meet: the link is sent to you by email and WhatsApp about ${REMINDER_MINUTES} minutes before your appointment.`
      : 'Choose a service, pick an available date and time, and share a few details. Once live scheduling is connected, joining details will be shared with you by the practice before your appointment.',
  },
  {
    q: 'Is the booking on this website real?',
    a: LIVE
      ? 'Yes. The times shown are the doctor’s real availability. When you confirm, your appointment is saved and a confirmation is sent to your email and WhatsApp.'
      : 'Not yet. This version is a demonstration: the availability shown is sample data, and a demo booking is not sent to the doctor or scheduled anywhere.',
  },
  { q: 'Which languages are available?', a: 'You can ask for a consultation in Marathi, Hindi or English.' },
  { q: 'What are the fee and duration?', a: 'Each service shows an indicative duration. Fees are being confirmed by the doctor and will be shown against each service.' },
  { q: 'Can online consultation replace emergency care?', a: 'No. For urgent or severe symptoms, please visit the nearest hospital or call your local emergency number.' },
  { q: 'Will my details be kept private?', a: LIVE
      ? 'Your details are used only to arrange and run your consultation. Please see our Privacy Policy for what is collected and who processes it.'
      : 'Please see our Privacy Policy. In this demonstration, the details you enter stay in your own browser session and are not transmitted.' },
]
