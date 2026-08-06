import { motion } from "framer-motion"
import type { CSSProperties, ReactNode } from "react"

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
const CRISP: [number, number, number, number] = [0.76, 0, 0.24, 1]

// ─── Text Mask Reveal ─────────────────────────────────────────────────────────
// Each word slides up from behind an overflow:hidden mask.
// The premier agency technique (Locomotive, GSAP SplitText, Awwwards winners).

interface TextMaskRevealProps {
  text: string
  style?: CSSProperties
  wordStyle?: CSSProperties
  delay?: number
  stagger?: number
  duration?: number
  inView: boolean
}

export function TextMaskReveal({
  text,
  style,
  wordStyle,
  delay = 0,
  stagger = 0.065,
  duration = 1.0,
  inView,
}: TextMaskRevealProps) {
  const words = text.split(" ")
  return (
    <span style={{ display: "flex", flexWrap: "wrap", columnGap: "0.3em", rowGap: 0, ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", ...wordStyle }}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{ delay: delay + i * stagger, duration, ease: EXPO }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ─── Clip-path wipe (left → right) ───────────────────────────────────────────
// Ideal for decorative lines, borders, and accent bars.

interface ClipWipeProps {
  children?: ReactNode
  style?: CSSProperties
  delay?: number
  duration?: number
  inView: boolean
}

export function ClipWipe({ children, style, delay = 0, duration = 0.85, inView }: ClipWipeProps) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={inView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
      transition={{ delay, duration, ease: CRISP }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── Fade + lift reveal ───────────────────────────────────────────────────────
// Classic scroll-in for blocks, cards, and supplementary text.

interface FadeUpProps {
  children: ReactNode
  style?: CSSProperties
  delay?: number
  y?: number
  inView: boolean
}

export function FadeUp({ children, style, delay = 0, y = 36, inView }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ delay, duration: 1.05, ease: EXPO }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── Scale + fade reveal ──────────────────────────────────────────────────────
// For images, orbs, and visual-weight elements.

interface ScaleRevealProps {
  children: ReactNode
  style?: CSSProperties
  delay?: number
  from?: number
  inView: boolean
}

export function ScaleReveal({ children, style, delay = 0, from = 0.88, inView }: ScaleRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: from }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: from }}
      transition={{ delay, duration: 1.2, ease: EXPO }}
      style={style}
    >
      {children}
    </motion.div>
  )
}
