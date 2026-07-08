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
        <p className="text-gray-400 text-lg">No hay caracteres disponibles.</p>
      </div>
    )
  }

  const isAnswered = state.feedback !== 'idle'

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <CharacterCard character={character.character} category={state.category} />

      <div className="w-full max-w-md mt-2 text-center text-sm text-gray-400">
        <span>
          {state.currentIndex + 1} / {state.characters.length}
        </span>
      </div>

      <div className="mt-6 w-full">
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
  )
}
