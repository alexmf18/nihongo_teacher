import { SessionSummary as Summary } from '../../domain/entities/Session'

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

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'

export function SessionSummary({ summary, missed, isReview, onReviewMistakes, onRestart }: SessionSummaryProps) {
  const hasMistakes = missed.length > 0

  return (
    <div className="flex flex-col items-center pt-10 text-center">
      <h2 className="text-xl font-extrabold text-slate-950">
        {isReview ? 'Repaso de fallos terminado' : 'Sesión terminada'}
      </h2>

      <p className="mt-8 text-6xl font-semibold leading-none text-accent">
        {summary.correct}
        <span className="text-3xl text-slate-300"> / {summary.total}</span>
      </p>
      <p className="mt-3 text-sm text-slate-500">
        correctas a la primera ({summary.accuracyPercent}%)
      </p>
      <div className="mt-4 h-2 w-48 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-emerald-600" style={{ width: `${summary.accuracyPercent}%` }} />
      </div>

      {hasMistakes ? (
        <div className="mt-10 w-full">
          <h3 className="mb-3 text-sm font-bold text-slate-700">Para repasar</h3>
          <ul className="flex flex-wrap justify-center gap-2">
            {missed.map((item) => (
              <li
                key={item.id}
                className="flex min-w-[5.5rem] flex-col items-center rounded-lg border border-accent-border bg-accent-light px-3 py-2"
              >
                <span className="text-lg font-semibold text-slate-800">{item.prompt}</span>
                {item.note && <span className="text-[11px] text-slate-400">{item.note}</span>}
                <span className="text-xs text-slate-600">{item.answer}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-10 max-w-sm text-sm text-slate-500">
          Sin fallos. Lo que has acertado tardará más en volver a salir.
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {hasMistakes && (
          <button
            type="button"
            onClick={onReviewMistakes}
            className={`rounded-lg bg-accent px-6 py-2.5 font-bold text-white transition-colors hover:bg-accent-dark ${focusRing}`}
          >
            Repasar fallos ({missed.length})
          </button>
        )}
        <button
          type="button"
          onClick={onRestart}
          className={`rounded-lg px-6 py-2.5 font-bold transition-colors ${focusRing} ${
            hasMistakes
              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              : 'bg-accent text-white hover:bg-accent-dark'
          }`}
        >
          Nueva sesión
        </button>
      </div>
    </div>
  )
}
