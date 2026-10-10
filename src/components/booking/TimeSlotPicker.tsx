import { useEffect, useState } from 'react'
import { CalendarX2 } from 'lucide-react'
import type { Slot } from '../../types'
import { getSlots } from '../../data/api'
import { useLang } from '../../hooks/useLang'
import { formatTime, toMinutes } from '../../utils/date'

interface Props { serviceId: string; date: string | null; selected: string | null; onSelect: (time: string) => void }

export default function TimeSlotPicker({ serviceId, date, selected, onSelect }: Props) {
  const { t } = useLang()
  const [slots, setSlots] = useState<Slot[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!date) { setSlots(null); return }
    let live = true
    setSlots(null); setFailed(false)
    getSlots(serviceId, date).then(s => { if (live) setSlots(s) }).catch(() => { if (live) setFailed(true) })
    return () => { live = false }
  }, [serviceId, date, attempt])

  if (!date) return <p className="rounded-2xl border border-dashed border-forest/25 p-5 text-sm text-ink-muted">{t.pickDateFirst}</p>
  if (failed) return (
    <div role="alert" className="rounded-2xl bg-beige-light p-5 text-sm text-ink-muted">
      <p>{t.slotsError}</p>
      <button type="button" className="btn-outline btn-sm mt-3" onClick={() => setAttempt(n => n + 1)}>{t.retry}</button>
    </div>
  )
  if (!slots) return (
    <div aria-busy="true" aria-live="polite">
      <p className="sr-only">{t.loadingSlots}</p>
      <div className="grid grid-cols-2 gap-2.5">{Array.from({ length: 6 }, (_, i) => <div key={i} className="skeleton h-12" />)}</div>
    </div>
  )
  if (!slots.some(s => s.available)) return (
    <div role="status" className="flex items-start gap-3 rounded-2xl bg-beige-light p-5 text-sm text-ink-muted"><CalendarX2 className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" />{t.noSlots}</div>
  )

  const groups = [
    { label: t.morning, items: slots.filter(s => toMinutes(s.time) < 12 * 60) },
    { label: t.afternoon, items: slots.filter(s => toMinutes(s.time) >= 12 * 60 && toMinutes(s.time) < 16 * 60) },
    { label: t.evening, items: slots.filter(s => toMinutes(s.time) >= 16 * 60) },
  ].filter(g => g.items.length)

  return (
    <div className="space-y-5">
      {groups.map(g => (
        <div key={g.label} role="group" aria-label={g.label}>
          <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">{g.label}</p>
          <div className="grid grid-cols-2 gap-2.5">
            {g.items.map(s => {
              const on = s.time === selected
              return (
                <button key={s.time} type="button" disabled={!s.available} aria-pressed={on} onClick={() => onSelect(s.time)}
                  className={`rounded-xl border py-3 text-sm font-semibold transition-all duration-300 ${on ? 'border-forest bg-forest text-ivory shadow-[0_10px_24px_-12px_rgba(23,55,44,.9)]' : s.available ? 'border-forest/25 bg-white text-forest hover:border-forest hover:bg-sage-mist' : 'cursor-not-allowed border-transparent bg-beige-light text-ink-muted/45 line-through'}`}>
                  {formatTime(s.time)}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
