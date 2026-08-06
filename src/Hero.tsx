import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import heroImage from "@/imports/hero-bg.png"
import { MorphingText } from "./components/MorphingText"
import { GradientOrb } from "./components/GradientOrb"
import { useMediaQuery } from "./hooks/useMediaQuery"
import { useLanguage } from "./contexts/LanguageContext"
import type { Translations } from "./i18n/translations"

const CV_EN = new URL("./imports/cv-en.pdf", import.meta.url).href
const CV_UA = new URL("./imports/cv-ua.pdf", import.meta.url).href

// ─── Site language switcher ───────────────────────────────────────────────────

function LangSwitcher() {
  const { lang, setLang } = useLanguage()
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.08em" }}>
      <button
        onClick={() => setLang("en")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 5px", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: lang === "en" ? "#E6EFEC" : "rgba(255,255,255,0.3)", transition: "color 0.2s ease", lineHeight: 1 }}
      >EN</button>
      <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 1px" }}>·</span>
      <button
        onClick={() => setLang("ua")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 5px", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.08em", color: lang === "ua" ? "#E6EFEC" : "rgba(255,255,255,0.3)", transition: "color 0.2s ease", lineHeight: 1 }}
      >UA</button>
    </div>
  )
}

// ─── CV language picker ───────────────────────────────────────────────────────

function CvDownloadButton({ variant, label }: { variant: "pill" | "block"; label: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open, close])

  const options = [
    { label: "EN — English", href: CV_EN, filename: "Illia_Skorykh_CV_EN.pdf" },
    { label: "UA — Українська", href: CV_UA, filename: "Illia_Skorykh_CV_UA.pdf" },
  ]

  const isPill = variant === "pill"

  return (
    <div ref={ref} style={{ position: "relative", display: isPill ? "inline-flex" : "block" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: isPill ? "#E6EFEC" : "#E6EFEC",
          color: "#0B0F0E",
          fontFamily: "'DM Mono', monospace",
          fontWeight: 500,
          fontSize: isPill ? "11px" : "12px",
          letterSpacing: "0.1em",
          border: "none",
          cursor: "pointer",
          borderRadius: isPill ? "999px" : "2px",
          padding: isPill ? "0 18px" : "0",
          height: isPill ? "34px" : "56px",
          width: isPill ? "auto" : "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "8px",
        }}
      >
        {label}
        <span style={{
          display: "inline-block",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.25s ease",
          fontSize: "9px",
          lineHeight: 1,
        }}>▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: isPill ? -6 : 6, scaleY: 0.88 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: isPill ? -4 : 4, scaleY: 0.92 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              ...(isPill
                ? { top: "calc(100% + 8px)", right: 0 }
                : { bottom: "calc(100% + 8px)", left: 0, right: 0 }),
              transformOrigin: isPill ? "top right" : "bottom center",
              background: "#0F1412",
              border: "1px solid rgba(143,203,185,0.2)",
              borderRadius: "2px",
              overflow: "hidden",
              zIndex: 100,
              minWidth: isPill ? "200px" : "auto",
            }}
          >
            {options.map(({ label, href, filename }, i) => (
              <motion.a
                key={label}
                href={href}
                download={filename}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={close}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: "#E6EFEC",
                  textDecoration: "none",
                  borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  transition: "background 0.15s ease, color 0.15s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(143,203,185,0.08)"
                  e.currentTarget.style.color = "#8FCBB9"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = "#E6EFEC"
                }}
              >
                {label}
                <span style={{ fontSize: "10px", opacity: 0.5 }}>↓</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Cinematic intro overlay ──────────────────────────────────────────────────

const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1]
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

function IntroOverlay({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let val = 0
    const total = 700
    const step = 16
    const inc = 100 / (total / step)
    const id = setInterval(() => {
      val = Math.min(100, val + inc)
      setCount(Math.floor(val))
      if (val >= 100) clearInterval(id)
    }, step)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const t = setTimeout(onDone, 2100)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <>
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{ delay: 1.0, duration: 1.0, ease: CURTAIN_EASE }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, height: "50vh", background: "#0B0F0E", zIndex: 9990, pointerEvents: "none" }}
      />
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: "100%" }}
        transition={{ delay: 1.0, duration: 1.0, ease: CURTAIN_EASE }}
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "50vh", background: "#0B0F0E", zIndex: 9990, pointerEvents: "none" }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.1, duration: 0.72, ease: EXPO_OUT }}
        style={{
          position: "fixed", top: "50%", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 0%, #8FCBB9 20%, #8FCBB9 80%, transparent 100%)",
          zIndex: 9991, pointerEvents: "none", transformOrigin: "left center", transform: "translateY(-50%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.1, times: [0, 0.1, 0.72, 1.0] }}
        style={{ position: "fixed", bottom: "calc(50% + 16px)", right: "32px", zIndex: 9992, pointerEvents: "none", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.14em", color: "#8FCBB9" }}
      >
        {String(count).padStart(3, "0")}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.1, times: [0, 0.1, 0.72, 1.0] }}
        style={{ position: "fixed", bottom: "calc(50% + 16px)", left: "32px", zIndex: 9992, pointerEvents: "none", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.14em", color: "rgba(230,239,236,0.35)" }}
      >
        LOADING
      </motion.div>
    </>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface CharConfig {
  char: string
  restBlur: number
}

const DESKTOP_CHARS: CharConfig[] = [
  { char: "P", restBlur: 0  }, { char: "O", restBlur: 2  }, { char: "R", restBlur: 5  },
  { char: "T", restBlur: 12 }, { char: "F", restBlur: 14 }, { char: "O", restBlur: 14 },
  { char: "L", restBlur: 8  }, { char: "I", restBlur: 3  }, { char: "O", restBlur: 0  },
  { char: " ", restBlur: 0  },
  { char: "W", restBlur: 13 }, { char: "E", restBlur: 10 }, { char: "B", restBlur: 6  },
  { char: "S", restBlur: 2  }, { char: "I", restBlur: 1  }, { char: "T", restBlur: 0  },
  { char: "E", restBlur: 0  },
]

function centerOutDelays(len: number, step: number): number[] {
  const mid = (len - 1) / 2
  const order = Array.from({ length: len }, (_, i) => i).sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid))
  const delays = new Array<number>(len)
  order.forEach((charIdx, rank) => { delays[charIdx] = rank * step })
  return delays
}

const STAGGER_DELAYS = centerOutDelays(DESKTOP_CHARS.length, 0.035)
const BLUR_VALUES = [...new Set(DESKTOP_CHARS.map(c => c.restBlur))].sort((a, b) => a - b)
function blurFilterId(px: number) { return `hblur-${px}` }

interface CharProps {
  cfg: CharConfig
  entranceDelay: number
  scrollBlur: number
  proximityT: number
  scrollOpacity: number
  reducedMotion: boolean
  index: number
}

function Char({ cfg, entranceDelay, scrollBlur, proximityT, scrollOpacity, reducedMotion, index }: CharProps) {
  const effectiveBlur = Math.max(cfg.restBlur * (1 - proximityT), 0) + scrollBlur
  const filterId = blurFilterId(BLUR_VALUES.reduce((best, v) => Math.abs(v - effectiveBlur) < Math.abs(best - effectiveBlur) ? v : best))
  const filterStr = effectiveBlur > 0.4 ? `url(#${filterId})` : "none"
  return (
    <motion.span
      className="char-span"
      data-index={index}
      initial={reducedMotion ? false : { opacity: 0, y: 20, scaleX: 1.06, filter: "blur(30px)" }}
      animate={{ opacity: scrollOpacity, y: 0, scaleX: 1, filter: filterStr }}
      transition={reducedMotion ? { duration: 0 } : {
        opacity: { delay: entranceDelay, duration: 1.0, ease: [0.16, 1, 0.3, 1] },
        y:       { delay: entranceDelay, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
        scaleX:  { delay: entranceDelay, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
        filter:  { delay: entranceDelay, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{ display: "inline-block", whiteSpace: "pre", willChange: "transform, opacity, filter", transformOrigin: "center bottom" }}
    >
      {cfg.char}
    </motion.span>
  )
}

// ─── Mobile full-screen menu overlay ─────────────────────────────────────────

function MobileMenuOverlay({ open, onClose, t }: { open: boolean; onClose: () => void; t: Translations }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed", inset: 0, zIndex: 9980,
            background: "rgba(11,15,14,0.97)",
            backdropFilter: "blur(20px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "80px 20px 40px",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            style={{
              position: "absolute", top: "16px", right: "20px",
              background: "none", border: "none", cursor: "pointer",
              color: "#E6EFEC", fontSize: "24px", lineHeight: 1,
              width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ✕
          </button>

          {/* Nav links */}
          <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flex: 1, justifyContent: "center" }}>
            {([
              { label: t.nav.about, href: "#about" },
              { label: t.nav.works, href: "#works" },
              { label: t.nav.contact, href: "#contact" },
            ]).map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: EXPO_OUT }}
                onClick={onClose}
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(28px, 10vw, 40px)",
                  letterSpacing: "-0.02em",
                  color: "#E6EFEC",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                  padding: "12px 0",
                  minHeight: "44px",
                  display: "flex", alignItems: "center",
                }}
              >
                {label}
              </motion.a>
            ))}
          </nav>

          {/* CV button pinned at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5, ease: EXPO_OUT }}
            style={{ width: "100%" }}
          >
            <CvDownloadButton variant="block" label={t.nav.downloadCv} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Hero() {
  const { t } = useLanguage()
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const isMobile    = useMediaQuery("(max-width: 767px)")
  const [reducedMotion, setReducedMotion] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [introActive, setIntroActive] = useState(true)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const scrollBlurVal = useTransform(scrollYProgress, [0, 0.6], [0, 30])
  const scrollOpacVal = useTransform(scrollYProgress, [0, 0.6], [1, 0.2])
  const bgParallaxY   = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const [scrollBlur, setScrollBlur] = useState(0)
  const [scrollOpac, setScrollOpac] = useState(1)

  useEffect(() => {
    const unsubB = scrollBlurVal.on("change", v => setScrollBlur(v))
    const unsubO = scrollOpacVal.on("change", v => setScrollOpac(v))
    return () => { unsubB(); unsubO() }
  }, [scrollBlurVal, scrollOpacVal])

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])


  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "100vw",
        height: isMobile ? "100dvh" : "100vh",
        background: "#0B0F0E",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* SVG filter defs */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute", pointerEvents: "none" }}>
        <defs>
          {BLUR_VALUES.map(px => (
            <filter key={px} id={blurFilterId(px)} x="-30%" y="-10%" width="160%" height="120%">
              <feGaussianBlur stdDeviation={`${px} 0`} />
            </filter>
          ))}
          <filter id="grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* Background image */}
      <motion.img
        src={heroImage}
        alt="Background Hero"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 1.8, ease: EXPO_OUT }}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "110%", top: "-5%",
          objectFit: "cover", mixBlendMode: "screen",
          zIndex: 1, pointerEvents: "none",
          y: isMobile ? 0 : bgParallaxY,
        }}
      />

      {/* Mint radial glow */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.4 }}
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "radial-gradient(ellipse 55vw 45vw at 50% 50%, rgba(143,203,185,0.22) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 2,
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "120px 120px",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Film grain */}
      <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3, opacity: 0.04, mixBlendMode: "overlay", pointerEvents: "none" }}>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* ── Desktop nav ─────────────────────────────────────────────────────── */}
      {!isMobile && (
        <motion.nav
          initial={reducedMotion ? false : { opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 1.0, ease: EXPO_OUT }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, zIndex: 30,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "24px 32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
              <GradientOrb config={{ background: "transparent", rotationSpeed: 0.25, noiseScale: 0.65, innerRadius: 0.1 }} />
            </div>
            <div style={{ display: "flex", gap: "28px" }}>
              {([
                { label: t.nav.about, href: "#about" },
                { label: t.nav.works, href: "#works" },
                { label: t.nav.contact, href: "#contact" },
              ]).map(({ label, href }) => (
                <a key={href} href={href} style={{ color: "#FFFFFF", fontSize: "11px", fontFamily: "'DM Mono', monospace", fontWeight: 400, letterSpacing: "0.08em", textDecoration: "none" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <LangSwitcher />
            <CvDownloadButton variant="pill" label={t.nav.downloadCv} />
          </div>
        </motion.nav>
      )}

      {/* ── Mobile fixed top bar ─────────────────────────────────────────────── */}
      {isMobile && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, height: "56px", zIndex: 30,
            background: "rgba(11,15,14,0.85)", backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
            <GradientOrb config={{ background: "transparent", rotationSpeed: 0.25, noiseScale: 0.65, innerRadius: 0.1 }} />
          </div>
          <LangSwitcher />
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Open menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <line x1="0" y1="1"  x2="22" y2="1"  stroke="#E6EFEC" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="0" y1="7"  x2="22" y2="7"  stroke="#E6EFEC" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="0" y1="13" x2="22" y2="13" stroke="#E6EFEC" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Mobile full-screen overlay */}
      <MobileMenuOverlay open={menuOpen && isMobile} onClose={() => setMenuOpen(false)} t={t} />

      {/* Headline */}
      <motion.div
        ref={headlineRef}
        initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(20px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 2.05, duration: 1.1, ease: EXPO_OUT }}
        style={{
          position: "relative", zIndex: 20,
          width: "100%",
          padding: isMobile ? "0 20px" : "0 4vw",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <MorphingText
          texts={["PORTFOLIO WEBSITE", "ILLIA SKORYKH"]}
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: isMobile ? "clamp(40px, 13vw, 90px)" : "clamp(1.8rem, 8.5vw, 15rem)",
            letterSpacing: "-0.03em",
            lineHeight: isMobile ? 1.15 : 0.9,
            color: "#E6EFEC",
            textTransform: "uppercase",
            whiteSpace: isMobile ? "normal" : "nowrap",
          }}
        />
      </motion.div>

      {/* Bottom meta row */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.25, duration: 1.0, ease: EXPO_OUT }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 30,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: isMobile ? "24px 20px" : "24px 32px",
          flexWrap: "wrap", gap: "8px",
        }}
      >
        <span style={{ color: "#FFFFFF", fontSize: "11px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
          {t.hero.role}
        </span>
        <span style={{ color: "#FFFFFF", fontSize: "11px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em" }}>
          {t.hero.location}
        </span>
      </motion.div>

      {/* Intro overlay */}
      <AnimatePresence>
        {introActive && !reducedMotion && (
          <IntroOverlay onDone={() => setIntroActive(false)} />
        )}
      </AnimatePresence>
    </section>
  )
}
