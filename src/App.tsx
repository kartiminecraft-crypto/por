import Hero from "./Hero"
import About from "./About"
import Skills from "./Skills"
import Works from "./Works"
import Workflow from "./Workflow"
import Contact from "./Contact"
import { LanguageProvider } from "./contexts/LanguageContext"

export default function App() {
  return (
    <LanguageProvider>
      <Hero />
      <About />
      <Skills />
      <Works />
      <Workflow />
      <Contact />
    </LanguageProvider>
  )
}
