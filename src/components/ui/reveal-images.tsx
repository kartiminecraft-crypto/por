import { cn } from "@/lib/utils"

interface ImageSource {
  src: string
  alt: string
}

interface SkillItemProps {
  text: string
  images: [ImageSource, ImageSource]
}

function SkillRevealItem({ text }: SkillItemProps) {
  return (
    <div className="relative h-fit w-fit py-4">
      <span
        style={{
          display: "block",
          fontFamily: "'DM Mono', monospace",
          fontWeight: 400,
          fontSize: "12px",
          letterSpacing: "0.01em",
          color: "#FFFFFF",
        }}
      >
        {text}
      </span>
    </div>
  )
}

export const SKILL_PRESETS: Record<string, SkillItemProps[]> = {
  default: [
    {
      text: "Typography",
      images: [
        { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&auto=format&fit=crop&q=60", alt: "Typography 1" },
        { src: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=200&auto=format&fit=crop&q=60", alt: "Typography 2" },
      ],
    },
    {
      text: "Web Design",
      images: [
        { src: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=200&auto=format&fit=crop&q=60", alt: "Web Design 1" },
        { src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&auto=format&fit=crop&q=60", alt: "Web Design 2" },
      ],
    },
    {
      text: "Graphic Design",
      images: [
        { src: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&auto=format&fit=crop&q=60", alt: "Graphic Design 1" },
        { src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=60", alt: "Graphic Design 2" },
      ],
    },
    {
      text: "Communication",
      images: [
        { src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&auto=format&fit=crop&q=60", alt: "Communication 1" },
        { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&auto=format&fit=crop&q=60", alt: "Communication 2" },
      ],
    },
    {
      text: "Marketing",
      images: [
        { src: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=200&auto=format&fit=crop&q=60", alt: "Marketing 1" },
        { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=60", alt: "Marketing 2" },
      ],
    },
    {
      text: "Commerce",
      images: [
        { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=60", alt: "Commerce 1" },
        { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&auto=format&fit=crop&q=60", alt: "Commerce 2" },
      ],
    },
  ],

  // NASCAR Marketplace — multi-page, e-commerce, animation
  nascar: [
    {
      text: "Animation",
      images: [
        { src: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=200&auto=format&fit=crop&q=60", alt: "Animation 1" },
        { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=60", alt: "Animation 2" },
      ],
    },
    {
      text: "Multi-page",
      images: [
        { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60", alt: "Multi-page 1" },
        { src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=200&auto=format&fit=crop&q=60", alt: "Multi-page 2" },
      ],
    },
    {
      text: "Web Design",
      images: [
        { src: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=200&auto=format&fit=crop&q=60", alt: "Web Design 1" },
        { src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&auto=format&fit=crop&q=60", alt: "Web Design 2" },
      ],
    },
    {
      text: "E-commerce",
      images: [
        { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&auto=format&fit=crop&q=60", alt: "E-commerce 1" },
        { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=60", alt: "E-commerce 2" },
      ],
    },
    {
      text: "Typography",
      images: [
        { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&auto=format&fit=crop&q=60", alt: "Typography 1" },
        { src: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=200&auto=format&fit=crop&q=60", alt: "Typography 2" },
      ],
    },
    {
      text: "UI Design",
      images: [
        { src: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&auto=format&fit=crop&q=60", alt: "UI Design 1" },
        { src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=60", alt: "UI Design 2" },
      ],
    },
  ],

  // Guardian Group — animated hero, form/CTA
  guardian: [
    {
      text: "Hero Animation",
      images: [
        { src: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=200&auto=format&fit=crop&q=60", alt: "Hero Animation 1" },
        { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=60", alt: "Hero Animation 2" },
      ],
    },
    {
      text: "Form Design",
      images: [
        { src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&auto=format&fit=crop&q=60", alt: "Form Design 1" },
        { src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&auto=format&fit=crop&q=60", alt: "Form Design 2" },
      ],
    },
    {
      text: "Branding",
      images: [
        { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop&q=60", alt: "Branding 1" },
        { src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&auto=format&fit=crop&q=60", alt: "Branding 2" },
      ],
    },
    {
      text: "Web Design",
      images: [
        { src: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=200&auto=format&fit=crop&q=60", alt: "Web Design 1" },
        { src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&auto=format&fit=crop&q=60", alt: "Web Design 2" },
      ],
    },
    {
      text: "UI Design",
      images: [
        { src: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&auto=format&fit=crop&q=60", alt: "UI Design 1" },
        { src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=60", alt: "UI Design 2" },
      ],
    },
    {
      text: "Typography",
      images: [
        { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&auto=format&fit=crop&q=60", alt: "Typography 1" },
        { src: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=200&auto=format&fit=crop&q=60", alt: "Typography 2" },
      ],
    },
  ],

  // Denturologiste — animation-first, motion design
  denturo: [
    {
      text: "Animation",
      images: [
        { src: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=200&auto=format&fit=crop&q=60", alt: "Animation 1" },
        { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=60", alt: "Animation 2" },
      ],
    },
    {
      text: "Motion Design",
      images: [
        { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop&q=60", alt: "Motion 1" },
        { src: "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=200&auto=format&fit=crop&q=60", alt: "Motion 2" },
      ],
    },
    {
      text: "UI Design",
      images: [
        { src: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&auto=format&fit=crop&q=60", alt: "UI Design 1" },
        { src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=60", alt: "UI Design 2" },
      ],
    },
    {
      text: "Web Design",
      images: [
        { src: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=200&auto=format&fit=crop&q=60", alt: "Web Design 1" },
        { src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=200&auto=format&fit=crop&q=60", alt: "Web Design 2" },
      ],
    },
    {
      text: "Bilingual UX",
      images: [
        { src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=200&auto=format&fit=crop&q=60", alt: "Bilingual 1" },
        { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=60", alt: "Bilingual 2" },
      ],
    },
    {
      text: "Typography",
      images: [
        { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&auto=format&fit=crop&q=60", alt: "Typography 1" },
        { src: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=200&auto=format&fit=crop&q=60", alt: "Typography 2" },
      ],
    },
  ],
}

export function SkillRevealList({ preset = "default" }: { preset?: keyof typeof SKILL_PRESETS }) {
  const items = SKILL_PRESETS[preset] ?? SKILL_PRESETS.default
  return (
    <div className="flex flex-row flex-wrap gap-x-6 gap-y-0">
      {items.map((item, index) => (
        <SkillRevealItem key={index} text={item.text} images={item.images} />
      ))}
    </div>
  )
}
