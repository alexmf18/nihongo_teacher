import { useState, useCallback, useMemo, useRef } from 'react'
import { GrammarCategory } from '../../domain/entities/GrammarItem'
import { GrammarCard } from '../../domain/entities/GrammarCard'
import { IGrammarRepository } from '../../domain/repositories/IGrammarRepository'
import { IProgressRepository } from '../../domain/repositories/IProgressRepository'
import { GrammarRepositoryImpl } from '../../data/repositories/GrammarRepositoryImpl'
import { LocalStorageProgressRepository } from '../../data/repositories/LocalStorageProgressRepository'
import { GetGrammarPracticeDeck, QuizzableGrammarKind } from '../../domain/usecases/GetGrammarPracticeDeck'
import { RecordAnswer } from '../../domain/usecases/RecordAnswer'
import { CheckParticleAnswer } from '../../domain/usecases/CheckParticleAnswer'
import { CheckConjugationAnswer } from '../../domain/usecases/CheckConjugationAnswer'

const grammarRepository: IGrammarRepository = new GrammarRepositoryImpl()
const progressRepository: IProgressRepository = new LocalStorageProgressRepository()
const getGrammarPracticeDeck = new GetGrammarPracticeDeck(grammarRepository, progressRepository)
const recordAnswerUseCase = new RecordAnswer(progressRepository)
const checkParticleAnswerUseCase = new CheckParticleAnswer()
const checkConjugationAnswerUseCase = new CheckConjugationAnswer()

function checkCard(card: GrammarCard, answer: string): boolean {
  if (card.kind === GrammarCategory.PARTICLE) {
    return checkParticleAnswerUseCase.execute(card.item, answer)
  }
  return checkConjugationAnswerUseCase.execute(card.item, card.formName, answer)
}

export interface GrammarQuizState {
  kind: QuizzableGrammarKind
  cards: GrammarCard[]
  currentIndex: number
  answer: string
  feedback: 'idle' | 'correct' | 'incorrect'
  showAnswer: boolean
}

export function useGrammarQuiz(initialKind: QuizzableGrammarKind = GrammarCategory.PARTICLE) {
  const [state, setState] = useState<GrammarQuizState>(() => ({
    kind: initialKind,
    cards: getGrammarPracticeDeck.execute(initialKind),
    currentIndex: 0,
    answer: '',
    feedback: 'idle',
    showAnswer: false,
  }))

  // Tracks the currentIndex already recorded via RecordAnswer, so re-submitting
  // the same card (e.g. after "Intentar de nuevo") never double-counts a result.
  const recordedIndexRef = useRef<number>(-1)

  const currentCard = useMemo(() => state.cards[state.currentIndex] ?? null, [state.cards, state.currentIndex])

  const setKind = useCallback((kind: QuizzableGrammarKind) => {
    recordedIndexRef.current = -1
    setState({
      kind,
      cards: getGrammarPracticeDeck.execute(kind),
      currentIndex: 0,
      answer: '',
      feedback: 'idle',
      showAnswer: false,
    })
  }, [])

  const setAnswer = useCallback((answer: string) => {
    setState((prev) => ({ ...prev, answer }))
  }, [])

  const submitAnswer = useCallback(() => {
    const card = state.cards[state.currentIndex]
    if (!card) return

    const isCorrect = checkCard(card, state.answer)

    if (recordedIndexRef.current !== state.currentIndex) {
      recordAnswerUseCase.execute(card.id, isCorrect)
      recordedIndexRef.current = state.currentIndex
    }

    setState((prev) => ({
      ...prev,
      feedback: isCorrect ? 'correct' : 'incorrect',
    }))
  }, [state.cards, state.currentIndex, state.answer])

  const nextCard = useCallback(() => {
    setState((prev) => {
      const nextIndex = (prev.currentIndex + 1) % prev.cards.length
      return {
        ...prev,
        currentIndex: nextIndex,
        answer: '',
        feedback: 'idle',
        showAnswer: false,
      }
    })
  }, [])

  const revealAnswer = useCallback(() => {
    setState((prev) => ({ ...prev, showAnswer: true }))
  }, [])

  const tryAgain = useCallback(() => {
    setState((prev) => ({ ...prev, feedback: 'idle', showAnswer: false }))
  }, [])

  return {
    state,
    currentCard,
    setKind,
    setAnswer,
    submitAnswer,
    nextCard,
    revealAnswer,
    tryAgain,
  }
}
