import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { WavePath } from "./components/WavePath"
import BlurText from "./components/BlurText"
import { TextMaskReveal, ClipWipe, FadeUp } from "./components/ScrollReveal"
import { useMediaQuery } from "./hooks/useMediaQuery"
import { useLanguage } from "./contexts/LanguageContext"

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function About() {
  const { t, lang } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-8% 0px" })
  const isMobile = useMediaQuery("(max-width: 767px)")

  const colRef0 = useRef<HTMLDivElement>(null)
  const colRef1 = useRef<HTMLDivElement>(null)
  const colRef2 = useRef<HTMLDivElement>(null)
  const col0In = useInView(colRef0, { once: true, margin: "-5% 0px" })
  const col1In = useInView(colRef1, { once: true, margin: "-5% 0px" })
  const col2In = useInView(colRef2, { once: true, margin: "-5% 0px" })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        background: "#111111",
        padding: isMobile ? "48px 20px 64px" : "72px 32px 80px",
        boxSizing: "border-box",
        overflow: "visible",
      }}
    >
      {/* Top row: label + statement */}
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
          gap: isMobile ? "16px 0" : "0 40px",
          marginBottom: isMobile ? "40px" : "72px",
          alignItems: "start",
        }}
      >
        {/* ABOUT ME */}
        <div style={{ overflow: "hidden" }}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: EXPO }}
            style={{
              display: "block",
              fontFamily: "'DM Mono', monospace",
              fontSize: "15px",
              letterSpacing: "0.08em",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            {t.about.label}
          </motion.span>
        </div>

        {/* Statement */}
        <BlurText
          key={lang}
          text={t.about.statement}
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: isMobile ? "clamp(20px, 5.5vw, 30px)" : "clamp(1.4rem, 3.2vw, 3.6rem)",
            lineHeight: isMobile ? 1.3 : 1.08,
            letterSpacing: "-0.025em",
            color: "#E6EFEC",
            textTransform: "uppercase",
          }}
        />
      </div>

      {/* Thin divider */}
      <ClipWipe
        inView={inView}
        delay={0.3}
        style={{
          height: "1px",
          width: "100%",
          background: "rgba(255,255,255,0.08)",
          marginBottom: isMobile ? "0" : "48px",
        }}
      />

      {/* Bottom 3-column grid — stacks on mobile with dividers between */}
      <div
        style={{
          position: "relative",
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : undefined,
          gridTemplateColumns: isMobile ? undefined : "1fr 1fr 1fr",
          gap: isMobile ? "0" : "0 40px",
        }}
      >
        {/* Column 1: Interests */}
        <div ref={colRef0} style={{ padding: isMobile ? "32px 0" : "0" }}>
          <FadeUp inView={col0In} delay={0}>
            <ClipWipe inView={col0In} delay={0.15} style={{ marginBottom: "20px" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", fontWeight: 300, letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", display: "block" }}>
                {t.about.col0Label}
              </span>
            </ClipWipe>
            <motion.p
              initial={{ opacity: 0 }}
              animate={col0In ? { opacity: 1 } : {}}
              transition={{ delay: 0.35, duration: 1.0 }}
              style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "12px", lineHeight: 1.75, color: "#FFFFFF", letterSpacing: "0.02em", overflowWrap: "break-word", wordBreak: "break-word" }}
            >
              {t.about.col0Text}
            </motion.p>
          </FadeUp>
        </div>

        {isMobile && <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />}

        {/* Column 2: Tools & stack */}
        <div ref={colRef1} style={{ padding: isMobile ? "32px 0" : "0" }}>
          <FadeUp inView={col1In} delay={0.12}>
            <ClipWipe inView={col1In} delay={0.27} style={{ marginBottom: "20px" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", fontWeight: 300, letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", display: "block" }}>
                {t.about.col1Label}
              </span>
            </ClipWipe>
            <motion.p
              initial={{ opacity: 0 }}
              animate={col1In ? { opacity: 1 } : {}}
              transition={{ delay: 0.45, duration: 1.0 }}
              style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "12px", lineHeight: 1.75, color: "#FFFFFF", letterSpacing: "0.02em", overflowWrap: "break-word", wordBreak: "break-word" }}
            >
              {t.about.col1Text}
            </motion.p>
          </FadeUp>
        </div>

        {isMobile && <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />}

        {/* Column 3: Work history */}
        <div ref={colRef2} style={{ padding: isMobile ? "32px 0" : "0" }}>
          <FadeUp inView={col2In} delay={0.24}>
            <ClipWipe inView={col2In} delay={0.38} style={{ marginBottom: "20px" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", fontWeight: 300, letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", display: "block" }}>
                {t.about.col2Label}
              </span>
            </ClipWipe>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {t.about.jobs.map(({ period, role }, i, arr) => (
                <div key={period}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "10px 0" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={col2In ? { scale: 1 } : {}}
                        transition={{ delay: 0.45 + i * 0.12, duration: 0.5, ease: EXPO }}
                        style={{ width: "7px", height: "7px", background: "#8FCBB9", flexShrink: 0, display: "inline-block" }}
                      />
                      <span style={{ overflow: "hidden", display: "inline-block" }}>
                        <motion.span
                          initial={{ y: "110%" }}
                          animate={col2In ? { y: "0%" } : {}}
                          transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: EXPO }}
                          style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}
                        >
                          {period}
                        </motion.span>
                      </span>
                    </span>
                    <span style={{ textAlign: "right", overflow: "hidden", display: "inline-block" }}>
                      <motion.span
                        initial={{ y: "110%" }}
                        animate={col2In ? { y: "0%" } : {}}
                        transition={{ delay: 0.55 + i * 0.12, duration: 0.8, ease: EXPO }}
                        style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.06em", color: "#FFFFFF" }}
                      >
                        {role}
                      </motion.span>
                    </span>
                  </div>
                  {i < arr.length - 1 && <WavePath />}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
