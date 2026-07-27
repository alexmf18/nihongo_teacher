import { GrammarQuizState } from '../hooks/useGrammarQuiz'
import { GrammarCategory } from '../../domain/entities/GrammarItem'
import { GrammarCard } from '../../domain/entities/GrammarCard'
import { ParticleSentenceCard } from './ParticleSentenceCard'
import { ConjugationCard } from './ConjugationCard'
import { RomajiInput } from './RomajiInput'
import { Feedback } from './Feedback'

interface GrammarQuizScreenProps {
  state: GrammarQuizState
  card: GrammarCard | null
  onAnswerChange: (value: string) => void
  onSubmit: () => void
  onNext: () => void
  onReveal: () => void
  onTryAgain: () => void
}

export function GrammarQuizScreen({
  state,
  card,
  onAnswerChange,
  onSubmit,
  onNext,
  onReveal,
  onTryAgain,
}: GrammarQuizScreenProps) {
  if (!card) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-lg text-slate-400">No hay contenido disponible.</p>
      </div>
    )
  }

  const isAnswered = state.feedback !== 'idle'
  const progress = Math.max(0, Math.min(100, ((state.currentIndex + 1) / state.cards.length) * 100))
  const isParticle = card.kind === GrammarCategory.PARTICLE

  const correctAnswerLabel = isParticle
    ? card.item.particle
    : card.item.forms.find((f) => f.formName === card.formName)?.value ?? ''

  const contextLine = isParticle ? card.item.translation : card.item.meaning

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-8 py-10 lg:px-16">
      <section className="mx-auto w-full max-w-[760px]">
        <div className="min-h-[520px] rounded-xl bg-white px-8 pb-12 pt-8 shadow-[0_14px_35px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
          <div className="ml-auto flex w-fit items-center gap-3">
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-emerald-600" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm font-semibold text-slate-500">
              {state.currentIndex + 1}/{state.cards.length}
            </span>
          </div>

          {isParticle ? (
            <ParticleSentenceCard item={card.item} />
          ) : (
            <ConjugationCard item={card.item} formName={card.formName} />
          )}

          <div className="mx-auto mt-2 w-full max-w-[490px]">
            <RomajiInput
              value={state.answer}
              onChange={onAnswerChange}
              onSubmit={onSubmit}
              disabled={isAnswered}
              placeholder={isParticle ? 'Escribe la partícula...' : 'Escribe la respuesta...'}
            />
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
        </div>
      </section>
    </div>
  )
}
