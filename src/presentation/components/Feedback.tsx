import { CorrectMark, WrongMark } from './TeacherMarks'

interface FeedbackProps {
  feedback: 'idle' | 'correct' | 'incorrect'
  showAnswer: boolean
  correctAnswerLabel: string
  contextLine?: string
  // Off when the prompt itself already carries the red-pen mark.
  showMark?: boolean
  onNext: () => void
  onReveal: () => void
  onTryAgain: () => void
}

const primaryButton =
  'h-11 rounded-md bg-sumi px-6 text-sm font-bold text-white transition-colors hover:bg-black'
const secondaryButton =
  'h-11 rounded-md border border-keisen-strong bg-white px-5 text-sm font-bold text-sumi transition-colors hover:border-sumi'

// The teacher's correction under the answer: ◯ and a word for a correct answer,
// the right answer written in red pen for a wrong one.
export function Feedback({
  feedback,
  showAnswer,
  correctAnswerLabel,
  contextLine,
  showMark = true,
  onNext,
  onReveal,
  onTryAgain,
}: FeedbackProps) {
  if (feedback === 'idle') return null

  const isCorrect = feedback === 'correct'

  return (
    <div className="mx-auto mt-8 w-full max-w-md border-t border-keisen pt-6 text-center" role="status">
      <p className="flex items-center justify-center gap-2 text-lg font-bold text-sumi">
        {showMark && (isCorrect ? <CorrectMark className="h-7 w-7" /> : <WrongMark className="h-6 w-6" />)}
        {isCorrect ? '¡Correcto!' : 'Incorrecto'}
      </p>

      {(isCorrect || showAnswer) && (
        <>
          {!isCorrect && (
            <p className="mt-3 text-sumi-soft">
              Respuesta correcta:{' '}
              <span className="font-kyokasho text-2xl font-semibold text-accent">{correctAnswerLabel}</span>
            </p>
          )}
          {contextLine && <p className="mt-1.5 text-sumi-soft">{contextLine}</p>}
          <button type="button" onClick={onNext} className={`mt-5 ${primaryButton}`}>
            Siguiente
          </button>
        </>
      )}

      {!isCorrect && !showAnswer && (
        <div className="mt-4 flex justify-center gap-3">
          <button type="button" onClick={onReveal} className={secondaryButton}>
            Mostrar respuesta
          </button>
          <button type="button" onClick={onTryAgain} className={primaryButton}>
            Intentar de nuevo
          </button>
        </div>
      )}
    </div>
  )
}
