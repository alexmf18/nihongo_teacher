import { ReactNode } from 'react'

// The practice sheet: one sheet of paper per card.
export function QuizFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 items-start justify-center px-4 py-6 sm:items-center sm:px-8 sm:py-10 lg:px-16">
      <section className="mx-auto w-full max-w-[760px]">
        <div className="rounded-lg border border-keisen bg-white px-5 pb-10 pt-6 shadow-sheet sm:min-h-[520px] sm:px-10 sm:pb-12 sm:pt-8">
          {children}
        </div>
      </section>
    </div>
  )
}

interface SessionProgressProps {
  current: number
  total: number
  isReview: boolean
}

export function SessionProgress({ current, total, isReview }: SessionProgressProps) {
  const percent = total > 0 ? Math.max(0, Math.min(100, (current / total) * 100)) : 0
  return (
    <div className="ml-auto flex w-fit items-center gap-3">
      {isReview && <span className="text-sm font-bold text-accent">Repasando fallos</span>}
      <div
        className="h-1 w-24 overflow-hidden rounded-full bg-keisen sm:w-28"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label="Progreso de la sesión"
      >
        <div className="h-full rounded-full bg-sumi transition-[width] duration-300" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-sm font-medium tabular-nums text-sumi-soft">
        {current}/{total}
      </span>
    </div>
  )
}
