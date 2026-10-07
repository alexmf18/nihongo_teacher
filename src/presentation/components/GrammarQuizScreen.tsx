import { GrammarQuizState } from '../hooks/useGrammarQuiz'
import { GrammarCategory } from '../../domain/entities/GrammarItem'
import { GrammarCard } from '../../domain/entities/GrammarCard'
import { getGrammarModes, PracticeMode } from '../../domain/entities/PracticeMode'
import { correctAnswerFor } from '../../domain/services/grammarAnswer'
import { summarizeSession } from '../../domain/services/summarizeSession'
import { ParticleSentenceCard } from './ParticleSentenceCard'
import { ConjugationCard } from './ConjugationCard'
import { formLabel } from '../../domain/entities/ConjugationFormLabels'
import { CounterPromptCard } from './CounterPromptCard'
import { SentencePromptCard } from './SentencePromptCard'
import { SentenceBuilder } from './SentenceBuilder'
import { RomajiInput } from './RomajiInput'
import { ChoiceGrid } from './ChoiceGrid'
import { ModeSwitcher } from './ModeSwitcher'
import { Feedback } from './Feedback'
import { QuizFrame, SessionProgress } from './QuizFrame'
import { MissedItem, SessionSummary } from './SessionSummary'

interface GrammarQuizScreenProps {
  state: GrammarQuizState
  card: GrammarCard | null
  onAnswerChange: (value: string) => void
  onSubmit: () => void
  onSelectChoice: (choice: string) => void
  onSetMode: (mode: PracticeMode) => void
  onNext: () => void
  onReveal: () => void
  onTryAgain: () => void
  onReviewMistakes: () => void
  onRestart: () => void
}

const PLACEHOLDERS: Record<GrammarCategory, string> = {
  [GrammarCategory.PARTICLE]: 'Escribe la partícula...',
  [GrammarCategory.CONJUGATION]: 'Escribe la respuesta...',
  [GrammarCategory.ADJECTIVE]: 'Escribe la respuesta...',
  [GrammarCategory.COUNTER]: 'Escribe la lectura...',
  [GrammarCategory.SENTENCE]: '',
}

function counterRomaji(card: Extract<GrammarCard, { kind: GrammarCategory.COUNTER }>): string {
  return card.item.examples.find((e) => e.number === card.number)?.romaji ?? ''
}

// What the feedback card shows as the answer; counters add the romaji reading and
// sentences keep their chunks apart so they read like the tiles.
function answerLabelFor(card: GrammarCard): string {
  if (card.kind === GrammarCategory.SENTENCE) return card.item.chunks.join(' ')
  const answer = correctAnswerFor(card)
  return card.kind === GrammarCategory.COUNTER ? `${answer} (${counterRomaji(card)})` : answer
}

function contextLineFor(card: GrammarCard): string | undefined {
  // The sentence prompt card already shows the translation once answered.
  if (card.kind === GrammarCategory.SENTENCE) return undefined
  if (card.kind === GrammarCategory.PARTICLE) return card.item.translation
  if (card.kind === GrammarCategory.COUNTER) return card.item.usage
  return card.item.meaning
}

function toMissedItem(card: GrammarCard): MissedItem {
  if (card.kind === GrammarCategory.PARTICLE) {
    return {
      id: card.id,
      prompt: `${card.item.sentenceParts[0]}＿${card.item.sentenceParts[1]}`,
      answer: correctAnswerFor(card),
    }
  }
  if (card.kind === GrammarCategory.COUNTER) {
    return { id: card.id, prompt: `${card.number}${card.item.counter}`, answer: correctAnswerFor(card) }
  }
  if (card.kind === GrammarCategory.SENTENCE) {
    return { id: card.id, prompt: correctAnswerFor(card), answer: card.item.translation }
  }
  return {
    id: card.id,
    prompt: card.item.dictionaryForm,
    note: formLabel(card.formName),
    answer: correctAnswerFor(card),
  }
}

function PromptCard({ card, state }: { card: GrammarCard; state: GrammarQuizState }) {
  if (card.kind === GrammarCategory.PARTICLE) return <ParticleSentenceCard item={card.item} />
  if (card.kind === GrammarCategory.SENTENCE) {
    return (
      <SentencePromptCard
        item={card.item}
        dictation={state.mode === PracticeMode.LISTENING}
        answered={state.feedback !== 'idle'}
      />
    )
  }
  if (card.kind === GrammarCategory.COUNTER) return <CounterPromptCard item={card.item} number={card.number} />
  return <ConjugationCard item={card.item} formName={card.formName} />
}

export function GrammarQuizScreen({
  state,
  card,
  onAnswerChange,
  onSubmit,
  onSelectChoice,
  onSetMode,
  onNext,
  onReveal,
  onTryAgain,
  onReviewMistakes,
  onRestart,
}: GrammarQuizScreenProps) {
  if (state.finished) {
    const summary = summarizeSession(state.sessionAnswers)
    const failedIds = new Set(summary.failedIds)

    return (
      <QuizFrame>
        <SessionSummary
          summary={summary}
          missed={state.cards.filter((c) => failedIds.has(c.id)).map(toMissedItem)}
          isReview={state.isReview}
          onReviewMistakes={onReviewMistakes}
          onRestart={onRestart}
        />
      </QuizFrame>
    )
  }

  if (!card) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-lg text-sumi-soft">No hay contenido disponible.</p>
      </div>
    )
  }

  const isAnswered = state.feedback !== 'idle'
  const isChoice = state.mode === PracticeMode.MULTIPLE_CHOICE

  return (
    <QuizFrame>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ModeSwitcher mode={state.mode} modes={getGrammarModes(state.kind)} onSelect={onSetMode} />
        <SessionProgress current={state.currentIndex + 1} total={state.cards.length} isReview={state.isReview} />
      </div>

      <PromptCard card={card} state={state} />

      <div className={`mx-auto mt-2 w-full ${card.kind === GrammarCategory.SENTENCE ? 'max-w-[620px]' : 'max-w-[490px]'}`}>
        {card.kind === GrammarCategory.SENTENCE ? (
          <SentenceBuilder
            // A fresh builder per presented card, so placed tiles never carry over.
            key={`${state.deckId}:${state.currentIndex}:${state.mode}`}
            chunks={card.item.chunks}
            disabled={isAnswered}
            onSubmit={onSelectChoice}
          />
        ) : isChoice ? (
          <ChoiceGrid
            options={(state.choices ?? []).map((choice) => ({ id: choice, label: choice }))}
            selectedId={state.answer || undefined}
            correctId={correctAnswerFor(card)}
            disabled={isAnswered}
            onSelect={onSelectChoice}
          />
        ) : (
          <RomajiInput
            value={state.answer}
            onChange={onAnswerChange}
            onSubmit={onSubmit}
            disabled={isAnswered}
            placeholder={PLACEHOLDERS[card.kind]}
          />
        )}
      </div>

      <Feedback
        feedback={state.feedback}
        showAnswer={state.showAnswer}
        correctAnswerLabel={answerLabelFor(card)}
        contextLine={contextLineFor(card)}
        onNext={onNext}
        onReveal={onReveal}
        onTryAgain={onTryAgain}
      />
    </QuizFrame>
  )
}
