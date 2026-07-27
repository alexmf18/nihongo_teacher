interface FeedbackProps {
  feedback: 'idle' | 'correct' | 'incorrect'
  showAnswer: boolean
  correctAnswerLabel: string
  contextLine?: string
  onNext: () => void
  onReveal: () => void
  onTryAgain: () => void
}

export function Feedback({
  feedback,
  showAnswer,
  correctAnswerLabel,
  contextLine,
  onNext,
  onReveal,
  onTryAgain,
}: FeedbackProps) {
  if (feedback === 'idle') return null

  return (
    <div className="mx-auto mt-6 w-full max-w-md">
      {feedback === 'correct' && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <p className="text-lg font-bold text-emerald-700">¡Correcto!</p>
          {contextLine && (
            <p className="mt-1 text-emerald-700">
              {contextLine}
            </p>
          )}
          <button
            onClick={onNext}
            className="mt-3 rounded-lg bg-emerald-600 px-6 py-2 font-bold text-white transition-colors hover:bg-emerald-700"
          >
            Siguiente →
          </button>
        </div>
      )}

      {feedback === 'incorrect' && (
        <div className="rounded-xl border border-accent-border-incorrect bg-accent-light p-4 text-center">
          <p className="text-lg font-bold text-accent">Incorrecto</p>

          {showAnswer && (
            <div className="mt-3">
              <p className="text-slate-700">
                Respuesta correcta:{' '}
                <span className="text-lg font-bold text-accent">
                  {correctAnswerLabel}
                </span>
              </p>
              {contextLine && (
                <p className="mt-1 italic text-slate-500">
                  {contextLine}
                </p>
              )}
              <button
                onClick={onNext}
                className="mt-3 rounded-lg bg-accent px-6 py-2 font-bold text-white transition-colors hover:bg-accent-dark"
              >
                Siguiente →
              </button>
            </div>
          )}

          {!showAnswer && (
            <div className="mt-3 flex gap-2 justify-center">
              <button
                onClick={onReveal}
                className="rounded-lg bg-slate-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-700"
              >
                Mostrar respuesta
              </button>
              <button
                onClick={onTryAgain}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-accent-dark"
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
