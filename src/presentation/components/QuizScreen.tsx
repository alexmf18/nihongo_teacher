import { QuizState } from '../hooks/useCharacterQuiz'
import { PracticeMode, getAvailableModes } from '../../domain/entities/PracticeMode'
import { CharacterCard } from './CharacterCard'
import { RomajiInput } from './RomajiInput'
import { ChoiceGrid } from './ChoiceGrid'
import { ModeSwitcher } from './ModeSwitcher'
import { Feedback } from './Feedback'
import { QuizFrame } from './QuizFrame'
import { SessionSummary } from './SessionSummary'
import { KanaRowPicker } from './KanaRowPicker'
import { KanaRow } from '../../domain/entities/KanaRow'
import { isKanaCategory } from '../../domain/services/kana'
import { Character } from '../../domain/entities/Character'
import { summarizeSession } from '../../domain/services/summarizeSession'

interface QuizScreenProps {
  state: QuizState
  character: Character | null
  onAnswerChange: (value: string) => void
  onSubmit: () => void
  onSelectChoice: (characterId: string) => void
  onSetMode: (mode: PracticeMode) => void
  onNext: () => void
  onReveal: () => void
  onTryAgain: () => void
  onReviewMistakes: () => void
  onRestart: () => void
  onSetKanaRows: (rows: KanaRow[]) => void
}

export function QuizScreen({
  state,
  character,
  onAnswerChange,
  onSubmit,
  onSelectChoice,
  onSetMode,
  onNext,
  onReveal,
  onTryAgain,
  onReviewMistakes,
  onRestart,
  onSetKanaRows,
}: QuizScreenProps) {
  if (state.finished) {
    const summary = summarizeSession(state.sessionAnswers)
    const failedIds = new Set(summary.failedIds)
    const missed = state.characters
      .filter((c) => failedIds.has(c.id))
      .map((c) => ({
        id: c.id,
        prompt: c.character,
        answer: c.meaning ? `${c.romaji[0]} (${c.meaning})` : c.romaji[0],
      }))

    return (
      <QuizFrame>
        <SessionSummary
          summary={summary}
          missed={missed}
          isReview={state.isReview}
          onReviewMistakes={onReviewMistakes}
          onRestart={onRestart}
        />
      </QuizFrame>
    )
  }

  if (!character) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-lg text-slate-400">No hay caracteres disponibles.</p>
      </div>
    )
  }

  const isAnswered = state.feedback !== 'idle'
  const progress = Math.max(0, Math.min(100, ((state.currentIndex + 1) / state.characters.length) * 100))
  const isReverse = state.mode === PracticeMode.REVERSE
  const isListening = state.mode === PracticeMode.LISTENING
  const isChoice = state.mode === PracticeMode.MULTIPLE_CHOICE

  const correctAnswerLabel = isReverse
    ? `${character.character} (${character.romaji[0]})`
    : character.romaji[0]
  // Reverse mode already shows the meaning as the prompt, so repeating it in the
  // feedback card would be redundant.
  const contextLine = isReverse ? undefined : character.meaning

  return (
    <QuizFrame>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ModeSwitcher mode={state.mode} modes={getAvailableModes(state.category)} onSelect={onSetMode} />
        <div className="ml-auto flex w-fit items-center gap-3">
          {state.isReview && <span className="text-sm font-semibold text-accent">Repasando fallos</span>}
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-emerald-600" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm font-semibold text-slate-500">
            {state.currentIndex + 1}/{state.characters.length}
          </span>
        </div>
      </div>

      {isKanaCategory(state.category) && (
        <KanaRowPicker category={state.category} selected={state.kanaRows} onChange={onSetKanaRows} />
      )}

      <CharacterCard
        displayText={isReverse ? character.meaning ?? character.character : character.character}
        speakText={character.character}
        category={state.category}
        hidden={isListening && !isAnswered}
      />

      <div className="mx-auto mt-2 w-full max-w-[490px]">
        {isChoice ? (
          <ChoiceGrid
            options={(state.choices ?? []).map((choice) => ({ id: choice.id, label: choice.romaji[0] }))}
            selectedId={state.answer || undefined}
            correctId={character.id}
            disabled={isAnswered}
            onSelect={onSelectChoice}
          />
        ) : (
          <RomajiInput
            value={state.answer}
            onChange={onAnswerChange}
            onSubmit={onSubmit}
            disabled={isAnswered}
          />
        )}
      </div>

      <Feedback
        feedback={state.feedback}
        showAnswer={state.showAnswer}
        correctAnswerLabel={correctAnswerLabel}
        contextLine={contextLine}
        onNext={onNext}
        onReveal={onReveal}
        onTryAgain={onTryAgain}
      />
    </QuizFrame>
  )
}
