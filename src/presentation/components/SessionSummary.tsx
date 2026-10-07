import { SessionSummary as Summary } from '../../domain/entities/Session'
import { Hanamaru } from './TeacherMarks'

export interface MissedItem {
  id: string
  prompt: string
  // Optional qualifier under the prompt, e.g. which conjugation form was asked.
  note?: string
  answer: string
}

interface SessionSummaryProps {
  summary: Summary
  missed: MissedItem[]
  isReview: boolean
  onReviewMistakes: () => void
  onRestart: () => void
}

// Teachers draw はなまる next to work that goes well.
const HANAMARU_THRESHOLD = 80

const primaryButton = 'h-11 rounded-md bg-sumi px-6 font-bold text-white transition-colors hover:bg-black'
const secondaryButton =
  'h-11 rounded-md border border-keisen-strong bg-white px-6 font-bold text-sumi transition-colors hover:border-sumi'

export function SessionSummary({ summary, missed, isReview, onReviewMistakes, onRestart }: SessionSummaryProps) {
  const hasMistakes = missed.length > 0
  const earnedHanamaru = summary.total > 0 && summary.accuracyPercent >= HANAMARU_THRESHOLD

  return (
    <div className="flex flex-col items-center pt-6 text-center sm:pt-8">
      <h2 className="text-xl font-bold text-sumi">{isReview ? 'Repaso de fallos terminado' : 'Sesión terminada'}</h2>

      {/* The score, written by the teacher in red pen, with はなまる drawn beside it. */}
      <div className="mt-8 flex items-center gap-5">
        <p className="font-kyokasho font-semibold leading-none text-accent">
          <span className="text-6xl">{summary.correct}</span>
          <span className="text-2xl"> / {summary.total}</span>
        </p>
        {earnedHanamaru && <Hanamaru className="h-24 w-24" />}
      </div>
      <p className="mt-3 text-sumi-soft">
        Correctas a la primera: <span className="font-bold tabular-nums text-sumi">{summary.accuracyPercent}%</span>
      </p>

      {hasMistakes ? (
        <div className="mt-10 w-full">
          <h3 className="mb-4 font-bold text-sumi">Para repasar</h3>
          <ul className="flex flex-wrap justify-center gap-2">
            {missed.map((item) => (
              <li
                key={item.id}
                className="flex min-w-[5.5rem] flex-col items-center rounded-md border border-keisen bg-white px-3 py-2"
              >
                <span className="font-kyokasho text-xl font-semibold text-sumi">{item.prompt}</span>
                {item.note && <span className="text-xs text-sumi-soft">{item.note}</span>}
                <span className="mt-0.5 font-kyokasho text-sm font-semibold text-accent">{item.answer}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-10 max-w-sm text-sumi-soft">Sin fallos. Lo que has acertado tardará más en volver a salir.</p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {hasMistakes && (
          <button type="button" onClick={onReviewMistakes} className={primaryButton}>
            Repasar fallos ({missed.length})
          </button>
        )}
        <button type="button" onClick={onRestart} className={hasMistakes ? secondaryButton : primaryButton}>
          Nueva sesión
        </button>
      </div>
    </div>
  )
}
