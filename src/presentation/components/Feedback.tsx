import { Character } from '../../domain/entities/Character'

interface FeedbackProps {
  feedback: 'idle' | 'correct' | 'incorrect'
  showAnswer: boolean
  character: Character | null
  onNext: () => void
  onReveal: () => void
  onTryAgain: () => void
}

export function Feedback({
  feedback,
  showAnswer,
  character,
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
          {character?.meaning && (
            <p className="mt-1 text-emerald-700">
              {character.meaning}
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
        <div className="rounded-xl border border-[#f0c7d3] bg-[#fff5f8] p-4 text-center">
          <p className="text-lg font-bold text-[#c70039]">Incorrecto</p>

          {showAnswer && character && (
            <div className="mt-3">
              <p className="text-slate-700">
                Respuesta correcta:{' '}
                <span className="text-lg font-bold text-[#c70039]">
                  {character.romaji[0]}
                </span>
              </p>
              {character.meaning && (
                <p className="mt-1 italic text-slate-500">
                  {character.meaning}
                </p>
              )}
              <button
                onClick={onNext}
                className="mt-3 rounded-lg bg-[#c70039] px-6 py-2 font-bold text-white transition-colors hover:bg-[#ad0032]"
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
                className="rounded-lg bg-[#c70039] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#ad0032]"
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
