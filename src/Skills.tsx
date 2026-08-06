import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { AsciiArt } from "./components/AsciiArt"
import { ClipWipe, ScaleReveal } from "./components/ScrollReveal"
import { useMediaQuery } from "./hooks/useMediaQuery"
import { useLanguage } from "./contexts/LanguageContext"

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Defined outside Skills so React never treats it as a new component type on re-render
interface SkillItem { name: string; label: string; subs: string[] }
interface SkillRowProps {
  skill: SkillItem
  i: number
  isActive: boolean
  inView: boolean
  isMobile: boolean
  onActivate: (i: number) => void
}

function SkillRow({ skill, i, isActive, inView, isMobile, onActivate }: SkillRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24, clipPath: "inset(0 100% 0 0)" }}
      animate={inView ? { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" } : {}}
      transition={{ delay: i * 0.06, duration: 0.85, ease: EXPO }}
      onMouseEnter={!isMobile ? () => onActivate(i) : undefined}
      onClick={isMobile ? () => onActivate(i) : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 0 : "20px",
        cursor: isMobile ? "pointer" : "default",
        paddingBottom: "2px",
        minHeight: isMobile ? "44px" : undefined,
      }}
    >
      {!isMobile && (
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: isActive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.2)",
          whiteSpace: "nowrap",
          width: "72px",
          textAlign: "right",
          flexShrink: 0,
          transition: "color 0.3s ease",
        }}>
          {isActive ? `[${skill.label}]` : skill.label}
        </span>
      )}
      <motion.span
        animate={{
          color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.22)",
          scale: isActive ? 1.02 : 1,
          filter: isActive ? "blur(0px)" : "blur(2.5px)",
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Hanken Grotesk', sans-serif",
          fontWeight: 900,
          fontSize: isMobile ? "clamp(28px, 9vw, 56px)" : "clamp(2rem, 6.5vw, 7.5rem)",
          lineHeight: isMobile ? 1.1 : 0.92,
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
          transformOrigin: "left center",
          display: "inline-block",
          willChange: "filter, transform",
          whiteSpace: "nowrap",
        }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  )
}

export default function Skills() {
  const { t, lang } = useLanguage()
  const skills = t.skills.items
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const isMobile = useMediaQuery("(max-width: 767px)")
  const [activeIndex, setActiveIndex] = useState(2)

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        background: "#111111",
        padding: isMobile ? "48px 20px 64px" : "56px 32px 80px",
        boxSizing: "border-box",
        overflow: "hidden",
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* SKILLS label */}
      <div style={{ textAlign: "center", marginBottom: "48px", overflow: "hidden" }}>
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: EXPO }}
          style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: "15px", letterSpacing: "0.08em", color: "#FFFFFF" }}
        >
          {t.skills.label}
        </motion.span>
      </div>

      {isMobile ? (
        /* ── Mobile layout ──────────────────────────────────────────────── */
        <div style={{ flex: 1 }}>
          {/* Skill name list — full width */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {skills.map((skill, i) => (
              <SkillRow key={i} skill={skill} i={i} isActive={i === activeIndex} inView={inView} isMobile={isMobile} onActivate={setActiveIndex} />
            ))}
          </div>

          {/* Active sub-skills as chips */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeIndex}-${lang}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.3, ease: EXPO }}
              style={{ display: "flex", flexWrap: "wrap", gap: "8px 10px", marginTop: "32px" }}
            >
              {skills[activeIndex].subs.map(sub => (
                <span
                  key={sub}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    color: "#8FCBB9",
                    border: "1px solid rgba(143,203,185,0.35)",
                    padding: "5px 10px",
                    borderRadius: "2px",
                    whiteSpace: "nowrap",
                    minHeight: "28px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {sub}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* ── Desktop layout ─────────────────────────────────────────────── */
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "220px 1fr 200px", gap: "0 24px", alignItems: "center" }}>
          {/* Left — sub-skills */}
          <div style={{ paddingTop: "8px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${lang}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                {skills[activeIndex].subs.map(sub => (
                  <div key={sub} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "6px", height: "6px", background: "#8FCBB9", flexShrink: 0, display: "inline-block" }} />
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "#FFFFFF", fontWeight: 300 }}>
                      {sub}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center — skill names */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {skills.map((skill, i) => <SkillRow key={i} skill={skill} i={i} isActive={i === activeIndex} inView={inView} isMobile={isMobile} onActivate={setActiveIndex} />)}
          </div>

          {/* Right — ASCII art */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <ScaleReveal inView={inView} delay={0.4} from={0.85}>
              <div style={{ width: "180px", height: "126px", borderRadius: "2px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#000", flexShrink: 0, position: "relative" }}>
                <AsciiArt />
              </div>
            </ScaleReveal>
          </div>
        </div>
      )}
    </section>
  )
}
