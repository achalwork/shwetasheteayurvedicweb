import { useId } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../../hooks/useLang'
import type { UiLang } from '../../types'

const OPTIONS: { id: UiLang; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'mr', label: 'मराठी' },
]

/** Two-tab language switcher. Clicking a tab re-renders the whole site in that language. */
export default function LanguageTabs({ onDark = false }: { onDark?: boolean }) {
  const { lang, setLang, site } = useLang()
  const pillId = useId()

  return (
    <div
      role="group"
      aria-label={`${site.langSwitch.label} / Language`}
      className={`inline-flex items-center rounded-full border p-0.5 ${onDark ? 'border-ivory/30' : 'border-forest/25 bg-white/70'}`}
    >
      {OPTIONS.map(o => {
        const active = lang === o.id
        return (
          <button
            key={o.id}
            type="button"
            lang={o.id}
            aria-pressed={active}
            onClick={() => setLang(o.id)}
            className={`relative rounded-full px-3 py-1.5 text-[0.78rem] font-semibold leading-none transition-colors sm:px-3.5 sm:text-[0.8rem] ${
              active ? (onDark ? 'text-forest-deep' : 'text-ivory') : onDark ? 'text-ivory/80 hover:text-ivory' : 'text-forest hover:text-forest-deep'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${pillId}`}
                aria-hidden
                className={`absolute inset-0 rounded-full ${onDark ? 'bg-gold-light' : 'bg-forest'}`}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}
