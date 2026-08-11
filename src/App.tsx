import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"
import Hero from "./Hero"
import About from "./About"
import Skills from "./Skills"
import Works from "./Works"
import Workflow from "./Workflow"
import Contact from "./Contact"
import { LanguageProvider } from "./contexts/LanguageContext"
import type { Lang } from "./i18n/translations"

// URL scheme: /en  →  English
//             /uk  →  Ukrainian  (matches ISO 639-1 for Ukrainian, same as Xbox)
const URL_TO_LANG: Record<string, Lang> = { en: "en", uk: "ua" }
const LANG_TO_URL: Record<Lang, string> = { en: "en", ua: "uk" }

function SiteContent() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const urlSeg = pathname.replace(/^\//, "") // "en" or "uk"
  const lang: Lang = URL_TO_LANG[urlSeg] ?? "en"

  function setLang(next: Lang) {
    navigate(`/${LANG_TO_URL[next]}`, { replace: true })
  }

  return (
    <LanguageProvider lang={lang} setLang={setLang}>
      <Hero />
      <About />
      <Skills />
      <Works />
      <Workflow />
      <Contact />
    </LanguageProvider>
  )
}

export default function App() {
  // BASE_URL is "/" in dev and "/por/" in production (GitHub Pages).
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/"

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/en" element={<SiteContent />} />
        <Route path="/uk" element={<SiteContent />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
