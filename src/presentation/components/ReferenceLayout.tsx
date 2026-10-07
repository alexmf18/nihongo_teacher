import { ReactNode } from 'react'

// Shared layout for the reference tables (kanji, words, phrases, grammar…).

export function RefPage({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return (
    <div className="flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className={`mx-auto space-y-12 ${narrow ? 'max-w-3xl' : 'max-w-5xl'}`}>{children}</div>
    </div>
  )
}

export function RefGroup({ title, subtitle, children }: { title: ReactNode; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <section>
      <header className="mb-5 text-center">
        <h2 className="text-xl font-bold text-sumi">{title}</h2>
        {subtitle && <p className="mt-1 font-kyokasho text-base text-sumi-soft">{subtitle}</p>}
      </header>
      <div className="flex flex-wrap justify-center gap-3">{children}</div>
    </section>
  )
}

// A flat sheet of paper: no lift, no zoom; the hover only darkens the edge.
export const refCard = 'rounded-md border border-keisen bg-white p-4 transition-colors hover:border-keisen-strong'

// Japanese text that reads itself aloud when pressed.
export function SpeakableText({
  text,
  onSpeak,
  className = '',
}: {
  text: string
  onSpeak: (text: string) => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => onSpeak(text)}
      className={`cursor-pointer rounded-sm font-kyokasho font-semibold text-sumi transition-colors hover:text-accent ${className}`}
      title="Escuchar pronunciación"
    >
      {text}
    </button>
  )
}
