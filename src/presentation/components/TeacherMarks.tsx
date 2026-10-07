// Red-pen marks a Japanese teacher writes on a practice sheet: ◯ for a correct
// answer, a cross for a wrong one, and はなまる (the "flower circle") for great work.
// Each stroke draws itself once (see .ink-draw); reduced motion shows it finished.

interface MarkProps {
  className?: string
  // Stretch to the box instead of keeping the square aspect (circling a word).
  stretch?: boolean
  // Draw instantly; for marks that are re-rendered, not freshly earned.
  still?: boolean
  // Stroke width in viewBox units (0–100); pick it from the rendered size so the
  // pen line ends up about 3px wide.
  weight?: number
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  pathLength: 1,
}

export function CorrectMark({ className = '', stretch = false, still = false, weight = 9 }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio={stretch ? 'none' : 'xMidYMid meet'}
      className={`text-accent ${className}`}
      aria-hidden="true"
    >
      {/* A loose hand-drawn loop that overshoots its start, like a real pen circle. */}
      <path
        {...strokeProps}
        strokeWidth={weight}
        className={still ? undefined : 'ink-draw'}
        d="M 62 8 C 30 3, 5 24, 7 52 C 9 81, 38 97, 65 91 C 89 85, 98 58, 91 33 C 85 15, 64 5, 40 11"
      />
    </svg>
  )
}

export function WrongMark({ className = '', still = false, weight = 9 }: Omit<MarkProps, 'stretch'>) {
  return (
    <svg viewBox="0 0 100 100" className={`text-accent ${className}`} aria-hidden="true">
      <path {...strokeProps} strokeWidth={weight} className={still ? undefined : 'ink-draw'} d="M 24 22 C 42 42, 60 60, 78 80" />
      <path
        {...strokeProps}
        strokeWidth={weight}
        className={still ? undefined : 'ink-draw ink-draw-late'}
        d="M 77 23 C 58 41, 41 60, 22 78"
      />
    </svg>
  )
}

function spiralPath(): string {
  const turns = 2.6
  const steps = 64
  const points: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const angle = t * turns * Math.PI * 2 - Math.PI / 2
    const radius = 3 + t * 21
    points.push(`${(50 + radius * Math.cos(angle)).toFixed(1)} ${(50 + radius * Math.sin(angle)).toFixed(1)}`)
  }
  return `M ${points.join(' L ')}`
}

function petalsPath(): string {
  const petals = 9
  const inner = 33
  const outer = 46
  const at = (radius: number, angle: number) =>
    `${(50 + radius * Math.cos(angle)).toFixed(1)} ${(50 + radius * Math.sin(angle)).toFixed(1)}`
  const segments: string[] = []
  for (let i = 0; i < petals; i++) {
    const start = (i / petals) * Math.PI * 2 - Math.PI / 2
    const end = ((i + 1) / petals) * Math.PI * 2 - Math.PI / 2
    const mid = (start + end) / 2
    segments.push(`${i === 0 ? `M ${at(inner, start)} ` : ''}Q ${at(outer, mid)} ${at(inner, end)}`)
  }
  return segments.join(' ')
}

const SPIRAL = spiralPath()
const PETALS = petalsPath()

export function Hanamaru({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`text-accent ${className}`} aria-hidden="true">
      <path {...strokeProps} strokeWidth={2} className="ink-draw" d={SPIRAL} />
      <path {...strokeProps} strokeWidth={2} className="ink-draw ink-draw-late" d={PETALS} />
    </svg>
  )
}
