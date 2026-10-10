import { useNavigate } from 'react-router-dom'
import { Rv } from '../animations/Reveal'; import DoctorCard from '../DoctorCard'; import BookingCalendar from './BookingCalendar'; import TimeSlotPicker from '../TimeSlotPicker'
import { useBooking } from '../../hooks/useBooking'; import { formatTime } from '../../utils/date'
export default function ConsultPreview() {
  const { booking, update, setStep } = useBooking(); const nav = useNavigate()
  const go = () => { setStep(booking.time ? 2 : 1); nav('/consultation') }
  return (<section className="mx-3 my-6 rounded-[2rem] bg-mint sm:mx-6 lg:rounded-[3rem]"><div className="wrap grid items-center gap-12 py-20 lg:grid-cols-[5fr_7fr] lg:py-28"><Rv>
    <h2 className="display">Book your online consultation</h2>
    <p className="mt-5 max-w-md text-ink-muted">Pick a date and time right here, then share a few details. All times are in IST.</p>
    <ol className="mt-8 space-y-4">{['Select a date', 'Select a time', 'Share your details'].map((t, i) => <li key={t} className="flex items-center gap-4"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-saffron font-semibold text-night">{i + 1}</span>{t}</li>)}</ol>
    <button className="btn-primary mt-9" onClick={go}>Book Now</button></Rv>
    <Rv d={.1}><div className="grid gap-8 rounded-3xl border border-night/10 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(6,35,31,.35)] md:grid-cols-2"><div className="md:col-span-2"><DoctorCard/></div>
      <BookingCalendar selected={booking.date} onSelect={d => update({ date: d, time: null })}/>
      <div>{booking.date ? <TimeSlotPicker date={booking.date} selected={booking.time} onSelect={t => update({ time: t })}/> : <p className="text-sm text-ink-muted">Select a date to see available times.</p>}
        {booking.date && booking.time && <button className="btn-primary mt-5 w-full" onClick={go}>Continue with {formatTime(booking.time)}</button>}</div></div></Rv></div></section>)
}
