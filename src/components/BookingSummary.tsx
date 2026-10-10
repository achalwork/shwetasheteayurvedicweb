import type { Booking } from '../types'; import { formatDate, formatTime } from '../utils/date'
export default function BookingSummary({ booking }: { booking: Booking }) {
  const p = booking.patient
  const rows: [string, string | undefined][] = [['Date', booking.date ? formatDate(booking.date) : undefined], ['Time', booking.time ? formatTime(booking.time) + ' IST' : undefined],
    ['Name', p?.fullName], ['Mobile', p ? '+91 ' + p.mobile : undefined], ['Email', p?.email], ['Language', p?.language], ['Reason', p?.reason], ['Notes', p?.notes || undefined]]
  return <dl className="divide-y divide-sage-200/70 text-sm">{rows.filter(r => r[1]).map(([k, v]) => <div key={k} className="flex gap-4 py-3"><dt className="w-24 shrink-0 text-ink-muted">{k}</dt><dd className="font-medium break-words">{v}</dd></div>)}</dl>
}
