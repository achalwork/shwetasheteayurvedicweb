import PageHeader from '../components/ui/PageHeader'
import { doctor } from '../data/doctor'
import { LIVE, REMINDER_MINUTES } from '../data/mode'

const demoSections: [string, string][] = [
  ['What this website currently does', 'This website is a frontend demonstration. The booking form and the contact form do not send your information to the doctor, to any server, or to any third-party service.'],
  ['Information you enter', 'Details you type into the booking form (such as your name, mobile number, email and reason for consultation) are kept only in your own browser session so that you can move between steps. They are cleared when you close the tab or start a new booking.'],
  ['When live booking is introduced', 'When real appointment booking is connected, this policy will be updated to explain what is collected, why, how long it is kept, and who can see it — before any real information is requested from you.'],
  ['Medical information', 'Please do not rely on this website for emergencies or urgent medical advice. In an emergency, visit the nearest hospital or call your local emergency number.'],
  ['Contact', `Questions about privacy can be sent to ${doctor.email} or by phone to ${doctor.phone}.`],
]

// LIVE wording describes what the booking system actually does. DRAFT: the practice (and a legal
// adviser) must review it, especially retention and deletion, before real patients use the site.
const liveSections: [string, string][] = [
  ['Information we collect', 'When you book, we collect your name, mobile number, email address, preferred language, the reason for your consultation and any notes you add. The reason and notes may contain health information, so please share only what you are comfortable with. If you use the contact form we collect your name, email address and message.'],
  ['How we use it', `We use your details only to arrange and run your consultation: to reserve your time slot, create a Google Meet video room, send you a booking confirmation, and send you the Meet link about ${REMINDER_MINUTES} minutes before your appointment by email and WhatsApp.`],
  ['Who processes it', 'To do this, your details are processed by services that work on our behalf: our hosting and database provider, Google (Calendar and Meet), our email provider, and WhatsApp (Meta) for messages sent to your mobile number. The doctor can see your booking details.'],
  ['How long we keep it', 'Retention period: to be confirmed by the practice. You can contact us at any time to ask about, correct or delete your details.'],
  ['Medical information', 'Please do not rely on this website for emergencies or urgent medical advice. In an emergency, visit the nearest hospital or call your local emergency number.'],
  ['Contact', `Questions about privacy can be sent to ${doctor.email} or by phone to ${doctor.phone}.`],
]
const sections = LIVE ? liveSections : demoSections

export default function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy Policy">{LIVE ? 'How your information is collected and used when you book.' : 'How your information is handled on this website.'}</PageHeader>
      <section className="bg-ivory py-16 sm:py-24">
        <div className="wrap max-w-3xl space-y-10">
          {sections.map(([h, p]) => (
            <div key={h}><h2 className="text-3xl">{h}</h2><p className="mt-3 leading-relaxed text-ink-muted">{p}</p></div>
          ))}
        </div>
      </section>
    </>
  )
}
