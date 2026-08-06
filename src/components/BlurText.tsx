import { useEffect, useRef, useState, useMemo } from "react"
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface WordData {
  text: string
  duration: number
  delay: number
  blur: number
  scale: number
}

interface BlurTextProps {
  text: string
  style?: React.CSSProperties
}

export default function BlurText({ text, style }: BlurTextProps) {
  const [inView, setInView] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLParagraphElement>(null)
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const words: WordData[] = useMemo(() => {
    return text.split(" ").map((word, index, arr) => {
      const progress = index / arr.length
      const exponentialDelay = Math.pow(progress, 0.8) * 0.5
      const baseDelay = index * 0.06
      const microVariation = (Math.random() - 0.5) * 0.05
      return {
        text: word,
        duration: 0.9 + Math.cos(index * 0.3) * 0.1,
        delay: (baseDelay + exponentialDelay + microVariation) * 0.45,
        blur: 12 + Math.floor(Math.random() * 8),
        scale: 0.9 + Math.sin(index * 0.2) * 0.05,
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  // Observe when section scrolls into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Animate in once when scrolled into view — stays visible
  useEffect(() => {
    if (!inView) return
    animationTimeoutRef.current = setTimeout(() => setIsAnimating(true), 100)
    return () => clearTimeout(animationTimeoutRef.current)
  }, [inView])

  return (
    <p ref={containerRef} style={{ margin: 0, ...style }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginRight: "0.35em",
            opacity: isAnimating ? 1 : 0,
            filter: isAnimating ? "blur(0px) brightness(1)" : `blur(${word.blur}px) brightness(0.6)`,
            transform: isAnimating
              ? "translateY(0) scale(1) rotateX(0deg)"
              : `translateY(20px) scale(${word.scale}) rotateX(-15deg)`,
            transition: `opacity ${word.duration}s, filter ${word.duration}s, transform ${word.duration}s`,
            transitionDelay: `${word.delay}s`,
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            willChange: "filter, transform, opacity",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {word.text}
        </span>
      ))}
    </p>
  )
}
