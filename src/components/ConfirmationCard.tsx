import { Link } from 'react-router-dom'; import { Clock, Video, Mail, Info } from 'lucide-react'; import { motion } from 'framer-motion'
import type { Booking } from '../types'; import BookingSummary from './BookingSummary'; import { doctor } from '../data/doctor'
const Sparkles = () => <>{Array.from({ length: 10 }, (_, i) => { const a = i * 36 * Math.PI / 180; return <motion.span key={i} aria-hidden initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos(a) * 60, y: Math.sin(a) * 60, opacity: 0, scale: 0 }} transition={{ duration: 1, delay: .7, ease: 'easeOut' }} className={`absolute left-1/2 top-1/2 h-2 w-2 rounded-full ${i % 2 ? 'bg-saffron' : 'bg-marigold'}`}/> })}</>
export default function ConfirmationCard({ booking, onNew }: { booking: Booking; onNew: () => void }) {
  return (<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card mx-auto max-w-2xl">
    <div className="text-center"><motion.div initial={{ scale: .6 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mint"><Sparkles/><svg viewBox="0 0 52 52" className="h-10 w-10 text-forest" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><motion.circle cx="26" cy="26" r="22" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .7 }}/><motion.path d="M15 27l8 8 14-16" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .5, delay: .6 }}/></svg></motion.div>
      <h1 className="text-3xl">Booking confirmed</h1><p className="mt-2 text-ink-muted">with {doctor.name}</p>
      <p className="mt-4 inline-block rounded-full bg-marigold px-4 py-1.5 text-sm font-semibold">Reference: {booking.reference}</p></div>
    <div className="mt-5 flex gap-3 rounded-xl bg-gold-soft/50 p-4 text-sm"><Info className="h-5 w-5 shrink-0 text-gold"/>Your appointment is booked. A confirmation has been sent to your email.</div>
    <div className="mt-6"><BookingSummary booking={booking}/></div>
    <ul className="mt-4 space-y-3 text-sm">
      <li className="flex gap-3"><Video className="h-5 w-5 text-forest"/><span><b>Online consultation.</b> Meet link will be emailed 10 minutes before your appointment.</span></li>
      <li className="flex gap-3"><Mail className="h-5 w-5 text-forest"/><span><b>Confirmation email:</b> sent to {booking.patient?.email}. Please check your spam folder if you do not see it.</span></li>
      <li className="flex gap-3"><Clock className="h-5 w-5 text-forest"/><span>Times are in India Standard Time (IST).</span></li></ul>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Link to="/" className="btn-ghost">Return home</Link><button onClick={onNew} className="btn-primary">Book another appointment</button></div></motion.div>)
}
