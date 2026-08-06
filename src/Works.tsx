import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { SkillRevealList } from "./components/ui/reveal-images"
import { ClipWipe, FadeUp } from "./components/ScrollReveal"
import { useMediaQuery } from "./hooks/useMediaQuery"
import { useLanguage } from "./contexts/LanguageContext"
import type { Translations } from "./i18n/translations"
import carImage from "./imports/nascar-car.png"
import helmetImage from "./imports/guardian-helmet.png"
import photoshopIcon from "./imports/icon-photoshop.svg"
import claudeIcon from "./imports/icon-claude.svg"
import geminiIcon from "./imports/icon-gemini.svg"
import figmaIcon from "./imports/icon-figma.svg"

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

const INSTRUMENTS_ALL = [
  { icon: photoshopIcon, label: "Photoshop" },
  { icon: claudeIcon,    label: "Claude Code" },
  { icon: geminiIcon,    label: "Gemini" },
  { icon: figmaIcon,     label: "Figma" },
]

interface Project {
  index: string
  title: string[]
  year: string
  bgImage: string
  overview: string
  link: string
  linkHref: string
  accentImage?: string
  skillsPreset: string
}

const PROJECTS: Project[] = [
  {
    index: "01",
    title: ["NASCAR", "MARKETPLACE"],
    year: "2026",
    bgImage: new URL("./imports/nascar-bg.png", import.meta.url).href,
    overview: "A two-page marketplace for NASCAR diecast collectibles — a catalog landing page and a dedicated product detail page. Includes scroll-triggered animations throughout: staggered card entrances, parallax hero, and animated transitions between pages. Built for collectors with a focus on high-impact visual presentation and smooth interactive experience.",
    link: "http://diecast.com/",
    linkHref: "https://krasavaw.github.io/Dezzert-Diecast/",
    accentImage: "car",
    skillsPreset: "nascar",
  },
  {
    index: "02",
    title: ["GUARDIAN", "GROUP"],
    year: "2025",
    bgImage: new URL("./imports/guardian-bg.png", import.meta.url).href,
    overview: "A corporate website for Guardian Group Defense Services featuring a fully animated hero section — layered motion, entrance reveals, and a dynamic background that sets an authoritative tone on arrival. Includes a contact form with an animated submit button and smooth field transitions. Clean, tactical design built for enterprise trust.",
    link: "http://guardiangroup.com/",
    linkHref: "https://krasavaw.github.io/Guardian-Group-Defense-Services/",
    skillsPreset: "guardian",
    accentImage: "helmet",
  },
  {
    index: "03",
    title: ["DENTURO", "LOGISTE"],
    year: "2025",
    bgImage: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920",
    overview: "Animation-first website for a certified denturologiste clinic. Every section is choreographed: hero text reveals, scroll-triggered entrance animations on all elements, smooth section transitions, and subtle motion on hover states. Bilingual French/English content delivered through a warm, clinical visual language that builds patient trust and guides seamlessly to booking.",
    link: "http://denturologiste.com/",
    linkHref: "https://krasavaw.github.io/animated-octo-waffle/",
    skillsPreset: "denturo",
  },
]

// ─── Mobile project card ──────────────────────────────────────────────────────

function MobileProjectCard({ project, isLast, t, projectIndex }: { project: Project; isLast: boolean; t: Translations; projectIndex: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-5% 0px" })

  return (
    <div
      ref={ref}
      style={{
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.07)",
        paddingBottom: isLast ? 0 : "56px",
        marginBottom: isLast ? 0 : "56px",
      }}
    >
      {/* a) Full-bleed 4:5 image with title overlay */}
      <div style={{ marginLeft: "-20px", marginRight: "-20px", width: "calc(100% + 40px)", aspectRatio: "4 / 5", overflow: "hidden", marginBottom: "28px", position: "relative" }}>
        <motion.img
          src={project.bgImage}
          alt={t.works.projectTitles[projectIndex].join(" ")}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.0, ease: EXPO }}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.45) saturate(0.55)" }}
        />

        {/* Gradient scrim — bottom fade for readability */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,15,14,0.88) 0%, rgba(11,15,14,0.2) 50%, transparent 100%)", pointerEvents: "none" }} />

        {/* Index + title — bottom left */}
        <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
          <div style={{ overflow: "hidden", marginBottom: "2px" }}>
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ delay: 0.15, duration: 0.8, ease: EXPO }}
              style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: "18px", letterSpacing: "0.05em", color: "#FFFFFF" }}
            >
              {project.index}
            </motion.span>
          </div>
          <h2 style={{ margin: 0, display: "flex", flexDirection: "column", gap: "0.01em" }}>
            {t.works.projectTitles[projectIndex].map((line, li) => (
              <div key={li} style={{ overflow: "hidden" }}>
                <motion.span
                  initial={{ y: "105%", opacity: 0 }}
                  animate={inView ? { y: "0%", opacity: 1 } : {}}
                  transition={{ delay: 0.22 + li * 0.09, duration: 1.0, ease: EXPO }}
                  style={{ display: "inline-block", fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 900, fontSize: "clamp(32px, 10vw, 60px)", lineHeight: 0.88, letterSpacing: "-0.03em", color: "#E6EFEC", textTransform: "uppercase" }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </h2>
        </div>
      </div>

      {/* c) Overview */}
      <FadeUp inView={inView} delay={0.3} y={20}>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ overflow: "hidden", marginBottom: "8px" }}>
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ delay: 0.32, duration: 0.9, ease: EXPO }}
              style={{ display: "inline-block", fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 900, fontSize: "clamp(14px, 4vw, 18px)", letterSpacing: "-0.01em", color: "#E6EFEC", textTransform: "uppercase" }}
            >
              {t.works.overview}
            </motion.span>
          </div>
          <ClipWipe inView={inView} delay={0.4}>
            <div style={{ height: "2px", width: "100%", background: "linear-gradient(to right, #8FCBB9, rgba(143,203,185,0.15))", marginBottom: "12px" }} />
          </ClipWipe>
          <p style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "13px", lineHeight: 1.8, color: "#FFFFFF", letterSpacing: "0.01em", overflowWrap: "break-word", wordBreak: "break-word" }}>
            {t.works.projectOverviews[projectIndex]}
          </p>
        </div>

        {/* d) Live link */}
        <a
          href={project.linkHref}
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-block", marginBottom: "32px", fontFamily: "'DM Mono', monospace", fontSize: "12px", letterSpacing: "0.06em", color: "#8FCBB9", textDecoration: "underline", textUnderlineOffset: "3px", minHeight: "44px", lineHeight: "44px" }}
        >
          {project.link} ↗
        </a>
      </FadeUp>

      {/* e) Project info */}
      <FadeUp inView={inView} delay={0.45} y={16}>
        <div style={{ overflow: "hidden", marginBottom: "10px" }}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ delay: 0.48, duration: 0.9, ease: EXPO }}
            style={{ display: "inline-block", fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 900, fontSize: "clamp(14px, 4vw, 18px)", letterSpacing: "-0.01em", color: "#E6EFEC", textTransform: "uppercase" }}
          >
            {t.works.projectInfo}
          </motion.span>
        </div>
        <ClipWipe inView={inView} delay={0.56}>
          <div style={{ height: "2px", width: "100%", background: "linear-gradient(to right, #8FCBB9, rgba(143,203,185,0.15))", marginBottom: "20px" }} />
        </ClipWipe>

        {/* Year */}
        <div style={{ marginBottom: "20px" }}>
          <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "6px" }}>{t.works.year}</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#FFFFFF" }}>{project.year}</span>
        </div>

        {/* Tool icons */}
        <div style={{ marginBottom: "20px" }}>
          <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "10px" }}>{t.works.instruments}</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {INSTRUMENTS_ALL.map(({ icon, label }, ii) => (
              <motion.img
                key={label}
                src={icon}
                alt={label}
                title={label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + ii * 0.06, duration: 0.5, ease: EXPO }}
                style={{ width: "28px", height: "28px" }}
              />
            ))}
          </div>
        </div>

        {/* Personal skills as chips */}
        <div>
          <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "10px" }}>{t.works.personalSkills}</span>
          <SkillRevealList preset={project.skillsPreset} />
        </div>
      </FadeUp>
    </div>
  )
}

// ─── Desktop project section ──────────────────────────────────────────────────

function DesktopProjectSection({ project, t, projectIndex }: { project: Project; t: Translations; projectIndex: number }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-8% 0px" })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const bgY  = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
  const carY = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"])

  return (
    <section
      ref={ref}
      style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#0B0F0E", overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      {/* Parallax background */}
      <motion.img
        src={project.bgImage}
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "112%", top: "-6%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.35) saturate(0.6)", y: bgY }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(11,15,14,0.35) 0%, rgba(11,15,14,0.72) 65%, rgba(11,15,14,0.88) 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, rgba(11,15,14,0.85) 0%, transparent 100%)", pointerEvents: "none" }} />

      {/* Car accent (01) */}
      {project.accentImage === "car" && (
        <motion.img src={carImage} alt="NASCAR car" style={{ position: "absolute", bottom: "18%", right: "2%", width: "28%", pointerEvents: "none", mixBlendMode: "screen", filter: "grayscale(1) brightness(2.5) contrast(0.85) opacity(0.75)", zIndex: 2, y: carY }} />
      )}

      {/* Helmet accent (02) */}
      {project.accentImage === "helmet" && (
        <motion.img src={helmetImage} alt="Guardian Group helmet" style={{ position: "absolute", bottom: "5%", right: "3%", width: "9%", pointerEvents: "none", mixBlendMode: "screen", filter: "grayscale(1) brightness(2.2) contrast(0.9) opacity(0.65)", zIndex: 2, y: carY }} />
      )}

      {/* Content grid */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "grid", gridTemplateColumns: "1fr 320px", padding: "0 48px", minHeight: "100vh" }}>
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "40px 48px 40px 0" }}>
          <div style={{ overflow: "hidden" }}>
            <motion.span initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: "0%", opacity: 1 } : {}} transition={{ delay: 0.05, duration: 0.9, ease: EXPO }} style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.14em", color: "#FFFFFF", textTransform: "uppercase" }}>
              WORKS
            </motion.span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ overflow: "hidden" }}>
              <motion.span initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: "0%", opacity: 1 } : {}} transition={{ delay: 0.18, duration: 0.9, ease: EXPO }} style={{ display: "inline-block", fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 900, fontSize: "clamp(1rem, 2vw, 1.8rem)", lineHeight: 1, letterSpacing: "-0.03em", color: "#FFFFFF" }}>
                {project.index}
              </motion.span>
            </div>
            <h2 style={{ margin: 0, display: "flex", flexDirection: "column", gap: "0.02em" }}>
              {t.works.projectTitles[projectIndex].map((line, li) => (
                <div key={li} style={{ overflow: "hidden" }}>
                  <motion.span initial={{ y: "105%", opacity: 0 }} animate={inView ? { y: "0%", opacity: 1 } : {}} transition={{ delay: 0.26 + li * 0.1, duration: 1.0, ease: EXPO }} style={{ display: "inline-block", fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 5.5rem)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "#E6EFEC", textTransform: "uppercase" }}>
                    {line}
                  </motion.span>
                </div>
              ))}
            </h2>
          </div>

          <FadeUp inView={inView} delay={0.5} y={24}>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ overflow: "hidden", marginBottom: "10px" }}>
                <motion.span initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: "0%", opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.9, ease: EXPO }} style={{ display: "inline-block", fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 900, fontSize: "clamp(1rem, 1.8vw, 1.6rem)", letterSpacing: "-0.02em", color: "#E6EFEC", textTransform: "uppercase", lineHeight: 1 }}>
                  {t.works.projectInfo}
                </motion.span>
              </div>
              <ClipWipe inView={inView} delay={0.62}>
                <div style={{ height: "2px", width: "100%", background: "linear-gradient(to right, #8FCBB9, rgba(143,203,185,0.15))" }} />
              </ClipWipe>
            </div>
            <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div>
                <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", color: "#FFFFFF", textTransform: "uppercase", marginBottom: "8px" }}>{t.works.year}</span>
                <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#FFFFFF", letterSpacing: "0.02em", paddingTop: "16px" }}>{project.year}</span>
              </div>
              <div>
                <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", color: "#FFFFFF", textTransform: "uppercase", marginBottom: "4px" }}>{t.works.instruments}</span>
                <div style={{ display: "flex", flexDirection: "row", gap: "10px", paddingTop: "16px" }}>
                  {INSTRUMENTS_ALL.map(({ icon, label }, ii) => (
                    <motion.img key={label} src={icon} alt={label} title={label} initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.7 + ii * 0.07, duration: 0.6, ease: EXPO }} style={{ width: "24px", height: "24px" }} />
                  ))}
                </div>
              </div>
              <div>
                <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.12em", color: "#FFFFFF", textTransform: "uppercase", marginBottom: "4px" }}>{t.works.personalSkills}</span>
                <SkillRevealList preset={project.skillsPreset} />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* RIGHT — overview */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "40px 0 40px 40px" }}>
          <FadeUp inView={inView} delay={0.38} y={28}>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ overflow: "hidden", marginBottom: "10px" }}>
                <motion.span initial={{ y: "110%", opacity: 0 }} animate={inView ? { y: "0%", opacity: 1 } : {}} transition={{ delay: 0.42, duration: 0.9, ease: EXPO }} style={{ display: "inline-block", fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 900, fontSize: "clamp(1rem, 1.8vw, 1.6rem)", letterSpacing: "-0.02em", color: "#E6EFEC", textTransform: "uppercase", lineHeight: 1 }}>
                  {t.works.overview}
                </motion.span>
              </div>
              <ClipWipe inView={inView} delay={0.54}>
                <div style={{ height: "2px", width: "100%", background: "linear-gradient(to right, #8FCBB9, rgba(143,203,185,0.15))" }} />
              </ClipWipe>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.65, duration: 1.1 }} style={{ margin: 0, fontFamily: "'DM Mono', monospace", fontSize: "12px", lineHeight: 1.8, color: "#FFFFFF", letterSpacing: "0.01em" }}>
              {t.works.projectOverviews[projectIndex]}
            </motion.p>
            <motion.a href={project.linkHref} target="_blank" rel="noreferrer" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.8 }} style={{ display: "inline-block", marginTop: "20px", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.06em", color: "#8FCBB9", textDecoration: "none", transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "0.55")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              {project.link} ↗
            </motion.a>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ─── Works root ───────────────────────────────────────────────────────────────

export default function Works() {
  const { t } = useLanguage()
  const isMobile = useMediaQuery("(max-width: 767px)")

  if (isMobile) {
    return (
      <section
        id="works"
        style={{ background: "#0B0F0E", padding: "64px 20px", boxSizing: "border-box", width: "100%" }}
      >
        <div style={{ overflow: "hidden", marginBottom: "40px" }}>
          <span style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.14em", color: "#FFFFFF", textTransform: "uppercase" }}>{t.works.label}</span>
        </div>
        {PROJECTS.map((project, i) => (
          <MobileProjectCard key={project.index} project={project} isLast={i === PROJECTS.length - 1} t={t} projectIndex={i} />
        ))}
      </section>
    )
  }

  return (
    <div id="works">
      {PROJECTS.map((project, i) => (
        <DesktopProjectSection key={project.index} project={project} t={t} projectIndex={i} />
      ))}
    </div>
  )
}
