import { createContext, useContext } from "react"
import type { ReactNode } from "react"
import { translations } from "@/i18n/translations"
import type { Lang, Translations } from "@/i18n/translations"

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  lang,
  setLang,
  children,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  children: ReactNode
}) {
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider")
  return ctx
}
