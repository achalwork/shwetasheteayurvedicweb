import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { UiLang } from '../types'
import { strings, type Strings } from '../i18n/strings'
import { siteStrings, type Site } from '../i18n/site'

interface Ctx {
  lang: UiLang
  setLang: (l: UiLang) => void
  /** Booking-flow copy */
  t: Strings
  /** Marketing-site copy (nav, home, pages, FAQs, privacy) */
  site: Site
}
const C = createContext<Ctx | null>(null)
const KEY = 'ui-lang'

const readSaved = (): UiLang => {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'en' || v === 'mr') return v
  } catch { /* storage blocked — fall through */ }
  return 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<UiLang>(readSaved)

  const setLang = useCallback((l: UiLang) => {
    setLangState(l)
    try { localStorage.setItem(KEY, l) } catch { /* ignore */ }
  }, [])

  const site = siteStrings[lang]

  // Keep <html lang>, the tab title and the meta description in sync with the chosen language.
  // `lang="mr"` also switches the Devanagari typography rules in index.css.
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = site.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', site.meta.description)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'mr' ? 'mr_IN' : 'en_IN')
  }, [lang, site])

  const value = useMemo<Ctx>(() => ({ lang, setLang, t: strings[lang], site }), [lang, setLang, site])
  return <C.Provider value={value}>{children}</C.Provider>
}

export const useLang = () => {
  const c = useContext(C)
  if (!c) throw new Error('useLang must be used inside LangProvider')
  return c
}

/** Kept for compatibility: <html lang> is now set once by LangProvider, so this is a no-op. */
export const useHtmlLang = (_lang: UiLang) => {}
