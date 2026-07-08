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
    <div className="mt-6 w-full max-w-md mx-auto">
      {feedback === 'correct' && (
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 text-center">
          <p className="text-green-700 font-semibold text-lg">¡Correcto! 🎉</p>
          {character?.meaning && (
            <p className="mt-1 text-green-600">
              {character.meaning}
            </p>
          )}
          <button
            onClick={onNext}
            className="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Siguiente →
          </button>
        </div>
      )}

      {feedback === 'incorrect' && (
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 text-center">
          <p className="text-red-700 font-semibold text-lg">Incorrecto ✖️</p>

          {showAnswer && character && (
            <div className="mt-3">
              <p className="text-gray-700">
                Respuesta correcta:{' '}
                <span className="font-bold text-indigo-600 text-lg">
                  {character.romaji[0]}
                </span>
              </p>
              {character.meaning && (
                <p className="mt-1 text-gray-500 italic">
                  {character.meaning}
                </p>
              )}
              <button
                onClick={onNext}
                className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Siguiente →
              </button>
            </div>
          )}

          {!showAnswer && (
            <div className="mt-3 flex gap-2 justify-center">
              <button
                onClick={onReveal}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
              >
                Mostrar respuesta
              </button>
              <button
                onClick={onTryAgain}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
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
