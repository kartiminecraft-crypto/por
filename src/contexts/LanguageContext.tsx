import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"
import { translations } from "@/i18n/translations"
import type { Lang, Translations } from "@/i18n/translations"

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof translations.en
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
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
