import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { dateStatus, MAX_DAYS_AHEAD } from '../../data/availability'
import { useLang } from '../../hooks/useLang'
import { addDays, dayOfWeek, daysInMonth, formatDate, formatMonth, parseKey, todayKey, toKey, weekdayShort } from '../../utils/date'

interface Props { serviceId: string; selected: string | null; onSelect: (date: string) => void }

export default function BookingCalendar({ serviceId, selected, onSelect }: Props) {
  const { t, lang } = useLang()
  const today = todayKey()
  const last = addDays(today, MAX_DAYS_AHEAD)
  const start = parseKey(selected ?? today)
  const [view, setView] = useState({ y: start.y, m: start.m })
  const [focusKey, setFocusKey] = useState<string>(selected ?? today)
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const shouldFocus = useRef(false)

  const first = parseKey(today), lastP = parseKey(last)
  const canPrev = view.y > first.y || (view.y === first.y && view.m > first.m)
  const canNext = view.y < lastP.y || (view.y === lastP.y && view.m < lastP.m)
  const shift = (n: number) => setView(v => { const d = new Date(Date.UTC(v.y, v.m + n, 1)); return { y: d.getUTCFullYear(), m: d.getUTCMonth() } })

  const cells = useMemo(() => {
    const lead = dayOfWeek(toKey(view.y, view.m, 1))
    const n = daysInMonth(view.y, view.m)
    return [...Array(lead).fill(null), ...Array.from({ length: n }, (_, i) => toKey(view.y, view.m, i + 1))] as (string | null)[]
  }, [view])

  // Roving tabindex target: the focused date if visible in this month, otherwise the first selectable one
  const tabKey = useMemo(() => {
    if (cells.includes(focusKey)) return focusKey
    return cells.find(c => c && dateStatus(serviceId, c) === 'available') ?? cells.find(Boolean) ?? null
  }, [cells, focusKey, serviceId])

  useEffect(() => { if (shouldFocus.current && focusKey) { refs.current[focusKey]?.focus(); shouldFocus.current = false } }, [focusKey, view])

  const onKey = (e: KeyboardEvent, key: string) => {
    const delta: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }
    if (!(e.key in delta)) return
    e.preventDefault()
    let next = addDays(key, delta[e.key])
    if (next < today) next = today
    if (next > last) next = last
    const p = parseKey(next)
    shouldFocus.current = true
    setFocusKey(next)
    setView({ y: p.y, m: p.m })
  }

  const days = weekdayShort(lang)
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-[1.7rem] font-semibold capitalize" aria-live="polite">{formatMonth(view.y, view.m, lang)}</h3>
        <div className="flex gap-2">
          <button type="button" onClick={() => shift(-1)} disabled={!canPrev} aria-label={t.prevMonth} className="grid h-10 w-10 place-items-center rounded-full border border-forest/25 text-forest transition hover:bg-forest hover:text-ivory disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forest"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={() => shift(1)} disabled={!canNext} aria-label={t.nextMonth} className="grid h-10 w-10 place-items-center rounded-full border border-forest/25 text-forest transition hover:bg-forest hover:text-ivory disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-forest"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div role="group" aria-label={formatMonth(view.y, view.m, lang)}>
        <div aria-hidden="true" className="mb-1 grid grid-cols-7 text-center text-[0.68rem] font-semibold uppercase tracking-wider text-ink-muted">
          {days.map(d => <div key={d} className="py-2">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((key, i) => {
            if (!key) return <div key={`b${i}`} />
            const status = dateStatus(serviceId, key)
            const ok = status === 'available'
            const isSel = key === selected
            const isToday = key === today
            return (
              <button
                key={key} ref={el => { refs.current[key] = el }} type="button"
                tabIndex={key === tabKey ? 0 : -1}
                aria-pressed={isSel} aria-disabled={!ok}
                aria-label={`${formatDate(key, lang)}${ok ? '' : ` — ${t.unavailable}`}`}
                onKeyDown={e => onKey(e, key)}
                onClick={() => { if (ok) { setFocusKey(key); onSelect(key) } }}
                className={`relative aspect-square rounded-full text-[0.95rem] font-semibold transition-all duration-300 ${
                  isSel ? 'bg-forest text-ivory shadow-[0_10px_24px_-10px_rgba(23,55,44,.9)]'
                  : ok ? 'bg-sage-mist text-forest-deep hover:bg-forest hover:text-ivory'
                  : 'cursor-not-allowed text-ink-muted/40 line-through decoration-ink-muted/30'}`}
              >
                {parseKey(key).d}
                {isToday && <span aria-hidden className={`absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${isSel ? 'bg-gold-light' : 'bg-terracotta'}`} />}
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-muted" aria-hidden="true">
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-sage-mist ring-1 ring-sage" />{t.available}</li>
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-forest" />{t.selected}</li>
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full ring-1 ring-ink-muted/30" />{t.unavailable}</li>
      </ul>
      <p className="mt-3 text-xs text-ink-muted/80">{t.calendarHelp}</p>
    </div>
  )
}
