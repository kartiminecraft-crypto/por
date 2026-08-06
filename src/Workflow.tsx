import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Velaris from "@/components/Velaris"
import { useMediaQuery } from "./hooks/useMediaQuery"
import { useLanguage } from "./contexts/LanguageContext"
import type { Translations } from "./i18n/translations"

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

const STEPS = [
  {
    number: "01",
    title: "BRIEF",
    subs: ["CLIENT INTERVIEW", "PROJECT SCOPE", "GOALS & KPIs", "TIMELINE PLANNING"],
    description: "I start every project by understanding your goals, audience, and constraints. Clear briefs lead to focused, intentional design decisions from day one.",
    hasImage: true,
  },
  {
    number: "02",
    title: "RESEARCH",
    subs: ["COMPETITOR ANALYSIS", "INFORMATION ARCHITECTURE", "JOBS TO BE DONE", "CUSTOMER JOURNEY MAP"],
    description: "I analyze the business, target audience, and competitors, formulate hypotheses and key messages. Have experience in product involving 300+ screens.",
    hasImage: true,
  },
  {
    number: "03",
    title: "PROTOTYPING",
    subs: ["WIREFRAMING", "USER FLOWS", "INTERACTIVE MOCKUPS", "USABILITY TESTING"],
    description: "Low and high-fidelity prototypes that validate ideas early, reduce revisions, and align stakeholders before committing to final visual design.",
    hasImage: true,
  },
  {
    number: "04",
    title: "VISUAL DESIGN",
    subs: ["UI COMPONENTS", "TYPOGRAPHY & COLOR", "ANIMATION & MOTION", "DESIGN SYSTEMS"],
    description: "Pixel-perfect visual design rooted in brand identity. Every detail — spacing, hierarchy, motion — is considered and intentional.",
    hasImage: true,
  },
  {
    number: "05",
    title: "DEVELOPMENT",
    subs: ["HTML / CSS / JS", "WEBFLOW BUILDS", "HANDOFF & SPECS", "RESPONSIVE TESTING"],
    description: "From design to working product. I bridge the gap between design and code, delivering clean, responsive implementations ready to ship.",
    hasImage: true,
  },
]

// ─── Mobile accordion ─────────────────────────────────────────────────────────

function MobileWorkflow({ t }: { t: Translations }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-8% 0px" })
  const [openIndex, setOpenIndex] = useState(0)
  const steps = STEPS.map((s, i) => ({ ...s, ...t.workflow.steps[i] }))

  return (
    <section
      ref={ref}
      style={{ position: "relative", width: "100%", background: "#111111", boxSizing: "border-box", overflow: "hidden" }}
    >
      <div style={{ overflow: "hidden", textAlign: "center", padding: "48px 20px 0" }}>
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: EXPO }}
          style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: "15px", letterSpacing: "0.08em", color: "#FFFFFF", textTransform: "uppercase" }}
        >
          {t.workflow.label}
        </motion.span>
      </div>

      <div style={{ marginTop: "32px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {steps.map((step, i) => {
          const isOpen = i === openIndex
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.7, ease: EXPO }}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Always-visible header row — tap to expand */}
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                style={{
                  width: "100%",
                  background: isOpen ? "rgba(255,255,255,0.02)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  transition: "background 0.3s ease",
                  minHeight: "64px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.06em", color: isOpen ? "#FFFFFF" : "rgba(255,255,255,0.35)" }}>
                    [{step.number}]
                  </span>
                  <span
                    style={{
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(18px, 5vw, 24px)",
                      letterSpacing: "-0.02em",
                      textTransform: "uppercase",
                      color: isOpen ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {step.title}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ color: isOpen ? "#8FCBB9" : "rgba(255,255,255,0.35)", fontSize: "20px", lineHeight: 1, flexShrink: 0 }}
                >
                  +
                </motion.span>
              </button>

              {/* Expandable content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "0 20px 28px" }}>
                      {/* Velaris gradient — bleeds to section edge (parent has 20px padding) */}
                      {step.hasImage && (
                        <div style={{ position: "relative", marginBottom: "20px", marginLeft: "-20px", marginRight: "-20px", width: "calc(100% + 40px)", height: "120px", overflow: "hidden", flexShrink: 0 }}>
                          <Velaris />
                        </div>
                      )}

                      {/* Sub-items */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "20px" }}>
                        {step.subs.map(sub => (
                          <div key={sub} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                            <span style={{ width: "6px", height: "6px", background: "#8FCBB9", flexShrink: 0, display: "inline-block" }} />
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.07em", color: "#FFFFFF", fontWeight: 300, lineHeight: 1.3 }}>
                              {sub}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Description */}
                      <p style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "12px", lineHeight: 1.75, color: "rgba(255,255,255,0.5)", letterSpacing: "0.01em" }}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
    </section>
  )
}

// ─── Desktop 5-column layout ──────────────────────────────────────────────────

function DesktopWorkflow({ t }: { t: Translations }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-8% 0px" })
  const [activeIndex, setActiveIndex] = useState(1)
  const steps = STEPS.map((s, i) => ({ ...s, ...t.workflow.steps[i] }))

  return (
    <section
      ref={ref}
      style={{ position: "relative", width: "100%", background: "#111111", boxSizing: "border-box", overflow: "hidden" }}
    >
      <div style={{ overflow: "hidden", textAlign: "center", padding: "56px 32px 0" }}>
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: EXPO }}
          style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: "15px", letterSpacing: "0.08em", color: "#FFFFFF", textTransform: "uppercase" }}
        >
          {t.workflow.label}
        </motion.span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", marginTop: "40px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        {steps.map((step, i) => {
          const isActive = i === activeIndex
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.9, ease: EXPO }}
              onMouseEnter={() => setActiveIndex(i)}
              style={{ position: "relative", borderRight: i < steps.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", padding: "32px 28px 28px", minHeight: "480px", display: "flex", flexDirection: "column", cursor: "default", transition: "background 0.4s ease", background: isActive ? "rgba(255,255,255,0.02)" : "transparent" }}
            >
              <motion.span
                animate={{ color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.28)", filter: isActive ? "blur(0px)" : "blur(1.5px)" }}
                transition={{ duration: 0.4, ease: EXPO }}
                style={{ display: "block", fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 900, fontSize: "clamp(1rem, 1.8vw, 1.6rem)", letterSpacing: "-0.02em", textTransform: "uppercase", lineHeight: 1, marginBottom: "20px", willChange: "filter" }}
              >
                {step.title}
              </motion.span>

              <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.35, ease: EXPO }}
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                {step.hasImage && (
                  <div style={{ position: "relative", marginBottom: "22px", marginLeft: "-28px", marginRight: "-28px", width: "calc(100% + 56px)", height: "110px", overflow: "hidden", flexShrink: 0 }}>
                    <Velaris />
                  </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "24px" }}>
                  {step.subs.map(sub => (
                    <div key={sub} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                      <span style={{ width: "6px", height: "6px", background: "#8FCBB9", flexShrink: 0, display: "inline-block" }} />
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.07em", color: "#FFFFFF", fontWeight: 300, lineHeight: 1.3 }}>
                        {sub}
                      </span>
                    </div>
                  ))}
                </div>
                <p style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "11px", lineHeight: 1.75, color: "rgba(255,255,255,0.5)", letterSpacing: "0.01em", flex: 1 }}>
                  {step.description}
                </p>
              </motion.div>

              <div style={{ marginTop: "auto", paddingTop: "32px" }}>
                <motion.span
                  animate={{ color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.22)", fontWeight: isActive ? 500 : 400 }}
                  transition={{ duration: 0.3 }}
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.06em" }}
                >
                  [{step.number}]
                </motion.span>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
    </section>
  )
}

// ─── Root — switches layout by breakpoint ─────────────────────────────────────

export default function Workflow() {
  const { t } = useLanguage()
  const isMobile = useMediaQuery("(max-width: 767px)")
  return isMobile ? <MobileWorkflow t={t} /> : <DesktopWorkflow t={t} />
}
