import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { GradientOrb } from "./components/GradientOrb"
import { TextMaskReveal, ClipWipe, FadeUp, ScaleReveal } from "./components/ScrollReveal"
import { useMediaQuery } from "./hooks/useMediaQuery"
import { useLanguage } from "./contexts/LanguageContext"

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

function LiveClock() {
  const [time, setTime] = useState("")
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-GB", { hour12: false })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span>{time}</span>
}

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ilya-i-027223317/" },
  { label: "Telegram", href: "https://t.me/ilyawo" },
  { label: "Whatsapp", href: "#" },
  { label: "X.com",    href: "https://x.com/BYRYRIS" },
]

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-8% 0px" })
  const isMobile = useMediaQuery("(max-width: 767px)")

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#111111",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {isMobile ? (
        /* ── Mobile layout ──────────────────────────────────────────────── */
        <>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 20px 40px" }}>
            {/* Orb — centered, 60vw */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 1.2, ease: EXPO }}
              style={{ width: "min(60vw, 260px)", height: "min(60vw, 260px)", marginBottom: "40px", flexShrink: 0, overflow: "hidden", borderRadius: "50%" }}
            >
              <GradientOrb config={{ background: "#111111", rotationSpeed: 0.2, noiseScale: 0.65, innerRadius: 0.1 }} />
            </motion.div>

            {/* Headline — centered */}
            <div style={{ textAlign: "center", marginBottom: "48px", width: "100%" }}>
              <TextMaskReveal
                text={t.contact.line1}
                inView={inView}
                delay={0.15}
                stagger={0.07}
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(26px, 8vw, 40px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  marginBottom: "0.1em",
                  justifyContent: "center",
                }}
              />
              <TextMaskReveal
                text={t.contact.line2}
                inView={inView}
                delay={0.3}
                stagger={0.065}
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(26px, 8vw, 40px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.025em",
                  color: "#FFFFFF",
                  justifyContent: "center",
                }}
              />
            </div>

            {/* Email — full-width button link */}
            <FadeUp inView={inView} delay={0.4} y={20} style={{ width: "100%", marginBottom: "12px" }}>
              <ClipWipe inView={inView} delay={0.42} style={{ marginBottom: "6px" }}>
                <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                  {t.contact.email}
                </span>
              </ClipWipe>
              <a
                href="mailto:ilya.skoryh@gmail.com"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "100%", height: "48px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "13px",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                ilya.skoryh@gmail.com
              </a>
            </FadeUp>

            {/* Phone — full-width button link */}
            <FadeUp inView={inView} delay={0.52} y={20} style={{ width: "100%", marginBottom: "48px" }}>
              <ClipWipe inView={inView} delay={0.54} style={{ marginBottom: "6px" }}>
                <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                  {t.contact.phone}
                </span>
              </ClipWipe>
              <a
                href="tel:+37125242908"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "100%", height: "48px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "13px",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                +371 252 42908
              </a>
            </FadeUp>

            {/* Social links — centered wrapped row */}
            <FadeUp inView={inView} delay={0.65} y={16} style={{ width: "100%" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px 20px" }}>
                {SOCIALS.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.06, duration: 0.6, ease: EXPO }}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      color: "#FFFFFF",
                      textDecoration: "none",
                      textTransform: "uppercase",
                      minHeight: "44px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Footer — local time centered */}
          <FadeUp inView={inView} delay={0.85} y={12}>
            <div style={{ display: "flex", justifyContent: "center", padding: "20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                <LiveClock />
              </span>
            </div>
          </FadeUp>
        </>
      ) : (
        /* ── Desktop layout ─────────────────────────────────────────────── */
        <>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "45% 55%" }}>
            {/* Left — gradient orb */}
            <div style={{ position: "relative", minHeight: "500px" }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 1.2, ease: EXPO }}
                style={{ width: "100%", height: "100%" }}
              >
                <GradientOrb config={{ background: "#111111", rotationSpeed: 0.2, noiseScale: 0.65, innerRadius: 0.1 }} />
              </motion.div>
            </div>

            {/* Right — contact content */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 64px 80px 40px" }}>
              <div style={{ marginBottom: "64px" }}>
                <TextMaskReveal
                  text={t.contact.line1}
                  inView={inView}
                  delay={0.15}
                  stagger={0.07}
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.2vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#FFFFFF", marginBottom: "0.12em" }}
                />
                <TextMaskReveal
                  text={t.contact.line2}
                  inView={inView}
                  delay={0.3}
                  stagger={0.065}
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.2vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#FFFFFF" }}
                />
              </div>

              <FadeUp inView={inView} delay={0.45} y={24}>
                <ClipWipe inView={inView} delay={0.48} style={{ marginBottom: "8px" }}>
                  <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{t.contact.email}</span>
                </ClipWipe>
                <div style={{ overflow: "hidden" }}>
                  <motion.a
                    href="mailto:ilya.skoryh@gmail.com"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={inView ? { y: "0%", opacity: 1 } : {}}
                    transition={{ delay: 0.55, duration: 0.9, ease: EXPO }}
                    style={{ display: "inline-block", fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.5rem)", color: "#FFFFFF", textDecoration: "none", letterSpacing: "-0.01em", transition: "opacity 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    ilya.skoryh@gmail.com
                  </motion.a>
                </div>
              </FadeUp>

              <FadeUp inView={inView} delay={0.6} y={24} style={{ marginTop: "32px" }}>
                <ClipWipe inView={inView} delay={0.63} style={{ marginBottom: "8px" }}>
                  <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>{t.contact.phone}</span>
                </ClipWipe>
                <div style={{ overflow: "hidden" }}>
                  <motion.a
                    href="tel:+37125242908"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={inView ? { y: "0%", opacity: 1 } : {}}
                    transition={{ delay: 0.7, duration: 0.9, ease: EXPO }}
                    style={{ display: "inline-block", fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 2vw, 1.5rem)", color: "#FFFFFF", textDecoration: "none", letterSpacing: "-0.01em", transition: "opacity 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    +371 252 42908
                  </motion.a>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Footer strip */}
          <FadeUp inView={inView} delay={0.85} y={20}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", flexWrap: "wrap", gap: "12px" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", fontWeight: 400, letterSpacing: "0.08em", color: "#FFFFFF", textTransform: "uppercase" }}>
                <LiveClock />
              </span>
              <div style={{ display: "flex", gap: "32px" }}>
                {SOCIALS.map(({ label, href }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.07, duration: 0.7, ease: EXPO }}
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: "#FFFFFF", textDecoration: "none", transition: "opacity 0.2s", textTransform: "uppercase" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.45")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeUp>
        </>
      )}
    </section>
  )
}
