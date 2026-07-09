import { QuizState } from '../hooks/useCharacterQuiz'
import { CharacterCard } from './CharacterCard'
import { RomajiInput } from './RomajiInput'
import { Feedback } from './Feedback'
import { Character } from '../../domain/entities/Character'

interface QuizScreenProps {
  state: QuizState
  character: Character | null
  onAnswerChange: (value: string) => void
  onSubmit: () => void
  onNext: () => void
  onReveal: () => void
  onTryAgain: () => void
}

export function QuizScreen({
  state,
  character,
  onAnswerChange,
  onSubmit,
  onNext,
  onReveal,
  onTryAgain,
}: QuizScreenProps) {
  if (!character) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-lg text-slate-400">No hay caracteres disponibles.</p>
      </div>
    )
  }

  const isAnswered = state.feedback !== 'idle'
  const progress = Math.max(0, Math.min(100, ((state.currentIndex + 1) / state.characters.length) * 100))

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-8 py-10 lg:px-16">
      <section className="mx-auto w-full max-w-[760px]">
        <div className="min-h-[520px] rounded-xl bg-white px-8 pb-12 pt-8 shadow-[0_14px_35px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
          <div className="ml-auto flex w-fit items-center gap-3">
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-emerald-600" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm font-semibold text-slate-500">
              {state.currentIndex + 1}/{state.characters.length}
            </span>
          </div>

          <CharacterCard character={character.character} category={state.category} />

          <div className="mx-auto mt-2 w-full max-w-[490px]">
            <RomajiInput
              value={state.answer}
              onChange={onAnswerChange}
              onSubmit={onSubmit}
              disabled={isAnswered}
            />
          </div>

          <Feedback
            feedback={state.feedback}
            showAnswer={state.showAnswer}
            character={character}
            onNext={onNext}
            onReveal={onReveal}
            onTryAgain={onTryAgain}
          />
        </div>
      </section>
    </div>
  )
}
