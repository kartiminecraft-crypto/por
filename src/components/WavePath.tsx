import React, { useRef, useEffect } from "react"

type WWavePathProps = React.ComponentProps<"div">

export function WavePath({ className, style, ...props }: WWavePathProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const path = useRef<SVGPathElement>(null)
  // baseline y inside the 60px tall SVG viewBox
  const BASE_Y = 30
  let progress = 22
  let x = 0.2
  let time = Math.PI / 2
  let reqId: number | null = null

  const getWidth = () =>
    containerRef.current ? containerRef.current.getBoundingClientRect().width : 300

  const setPath = (prog: number) => {
    const w = getWidth()
    if (path.current) {
      path.current.setAttributeNS(
        null,
        "d",
        `M0 ${BASE_Y} Q${w * x} ${BASE_Y + prog * 0.6}, ${w} ${BASE_Y}`,
      )
    }
  }

  useEffect(() => {
    // Delay one frame so layout is complete and width is measurable
    const raf = requestAnimationFrame(() => setPath(progress))
    return () => cancelAnimationFrame(raf)
  }, [])

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t

  const manageMouseEnter = () => {
    if (reqId) { cancelAnimationFrame(reqId); resetAnimation() }
  }

  const manageMouseMove = (e: React.MouseEvent) => {
    const { movementY, clientX } = e
    if (path.current) {
      const bound = path.current.getBoundingClientRect()
      x = (clientX - bound.left) / bound.width
      progress += movementY
      setPath(progress)
    }
  }

  const manageMouseLeave = () => animateOut()

  const animateOut = () => {
    const newProg = progress * Math.sin(time)
    progress = lerp(progress, 0, 0.025)
    time += 0.2
    setPath(newProg)
    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut)
    } else {
      resetAnimation()
    }
  }

  const resetAnimation = () => {
    time = Math.PI / 2
    progress = 22
    setPath(progress)
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "60px",
        overflow: "visible",
        ...style,
      }}
      className={className}
      {...props}
    >
      {/* Interaction layer */}
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
        }}
      />
      {/* SVG fills the container, path drawn at BASE_Y */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <path
          ref={path}
          fill="none"
          stroke="#8FCBB9"
          strokeWidth={1.5}
          strokeOpacity={0.6}
        />
      </svg>
    </div>
  )
}
