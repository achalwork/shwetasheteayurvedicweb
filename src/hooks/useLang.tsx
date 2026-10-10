import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { UiLang } from '../types'
import { strings, type Strings } from '../i18n/strings'

interface Ctx { lang: UiLang; setLang: (l: UiLang) => void; t: Strings }
const C = createContext<Ctx | null>(null)
const KEY = 'ui-lang'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<UiLang>(() => {
    try { return 'en' } catch { return 'en' }
  })
  const setLang = (_l: UiLang) => { setLangState('en') } // site is English-only
  return <C.Provider value={{ lang, setLang, t: strings[lang] }}>{children}</C.Provider>
}

export const useLang = () => {
  const c = useContext(C)
  if (!c) throw new Error('useLang must be used inside LangProvider')
  return c
}

/** Marks a subtree as Marathi so browsers pick correct Devanagari fonts and shaping. */
export const useHtmlLang = (lang: UiLang) => {
  useEffect(() => {
    const prev = document.documentElement.lang
    document.documentElement.lang = lang === 'mr' ? 'mr' : 'en'
    return () => { document.documentElement.lang = prev || 'en' }
  }, [lang])
}
