import { useState, useCallback, useMemo, useRef } from 'react'
import { GrammarCategory } from '../../domain/entities/GrammarItem'
import { GrammarCard } from '../../domain/entities/GrammarCard'
import { PracticeMode, resolveGrammarMode } from '../../domain/entities/PracticeMode'
import { SESSION_SIZE, SessionAnswer } from '../../domain/entities/Session'
import { IGrammarRepository } from '../../domain/repositories/IGrammarRepository'
import { IProgressRepository } from '../../domain/repositories/IProgressRepository'
import { GrammarRepositoryImpl } from '../../data/repositories/GrammarRepositoryImpl'
import { LocalStorageProgressRepository } from '../../data/repositories/LocalStorageProgressRepository'
import { GetGrammarPracticeDeck, QuizzableGrammarKind } from '../../domain/usecases/GetGrammarPracticeDeck'
import { RecordAnswer } from '../../domain/usecases/RecordAnswer'
import { CheckParticleAnswer } from '../../domain/usecases/CheckParticleAnswer'
import { CheckConjugationAnswer } from '../../domain/usecases/CheckConjugationAnswer'
import { CheckCounterAnswer } from '../../domain/usecases/CheckCounterAnswer'
import { CheckSentenceAnswer } from '../../domain/usecases/CheckSentenceAnswer'
import { GenerateGrammarChoices } from '../../domain/usecases/GenerateGrammarChoices'
import { shuffleArray } from '../../domain/services/shuffleArray'
import { summarizeSession } from '../../domain/services/summarizeSession'

const grammarRepository: IGrammarRepository = new GrammarRepositoryImpl()
const progressRepository: IProgressRepository = new LocalStorageProgressRepository()
const getGrammarPracticeDeck = new GetGrammarPracticeDeck(grammarRepository, progressRepository)
const recordAnswerUseCase = new RecordAnswer(progressRepository)
const checkParticleAnswerUseCase = new CheckParticleAnswer()
const checkConjugationAnswerUseCase = new CheckConjugationAnswer()
const checkCounterAnswerUseCase = new CheckCounterAnswer()
const checkSentenceAnswerUseCase = new CheckSentenceAnswer()
const generateGrammarChoices = new GenerateGrammarChoices(grammarRepository)

function checkCard(card: GrammarCard, answer: string): boolean {
  if (card.kind === GrammarCategory.PARTICLE) {
    return checkParticleAnswerUseCase.execute(card.item, answer)
  }
  if (card.kind === GrammarCategory.COUNTER) {
    return checkCounterAnswerUseCase.execute(card.item, card.number, answer)
  }
  if (card.kind === GrammarCategory.SENTENCE) {
    return checkSentenceAnswerUseCase.execute(card.item, answer)
  }
  return checkConjugationAnswerUseCase.execute(card.item, card.formName, answer)
}

// Identifies each deck, so per-card UI state (e.g. placed sentence tiles) can
// reset even when a new deck starts with the same card at the same index.
let nextDeckId = 1

function choicesFor(card: GrammarCard | undefined, mode: PracticeMode): string[] | undefined {
  return mode === PracticeMode.MULTIPLE_CHOICE && card ? generateGrammarChoices.execute(card) : undefined
}

export interface GrammarQuizState {
  kind: QuizzableGrammarKind
  deckId: number
  mode: PracticeMode
  cards: GrammarCard[]
  currentIndex: number
  answer: string
  choices?: string[]
  feedback: 'idle' | 'correct' | 'incorrect'
  showAnswer: boolean
  sessionAnswers: SessionAnswer[]
  finished: boolean
  isReview: boolean
}

function startDeck(
  kind: QuizzableGrammarKind,
  mode: PracticeMode,
  cards: GrammarCard[],
  isReview = false
): GrammarQuizState {
  const resolvedMode = resolveGrammarMode(mode, kind)
  return {
    kind,
    deckId: nextDeckId++,
    mode: resolvedMode,
    cards,
    currentIndex: 0,
    answer: '',
    choices: choicesFor(cards[0], resolvedMode),
    feedback: 'idle',
    showAnswer: false,
    sessionAnswers: [],
    finished: false,
    isReview,
  }
}

function buildSessionDeck(kind: QuizzableGrammarKind): GrammarCard[] {
  return getGrammarPracticeDeck.execute(kind, Date.now(), SESSION_SIZE)
}

export function useGrammarQuiz(initialKind: QuizzableGrammarKind = GrammarCategory.PARTICLE) {
  const [state, setState] = useState<GrammarQuizState>(() =>
    startDeck(initialKind, PracticeMode.ROMAJI_INPUT, buildSessionDeck(initialKind))
  )

  // Tracks the currentIndex already recorded via RecordAnswer, so re-submitting
  // the same card (e.g. after "Intentar de nuevo") never double-counts a result.
  const recordedIndexRef = useRef<number>(-1)

  const currentCard = useMemo(() => state.cards[state.currentIndex] ?? null, [state.cards, state.currentIndex])

  const setKind = useCallback((kind: QuizzableGrammarKind) => {
    recordedIndexRef.current = -1
    setState((prev) => startDeck(kind, prev.mode, buildSessionDeck(kind)))
  }, [])

  const setMode = useCallback((mode: PracticeMode) => {
    setState((prev) => ({
      ...prev,
      mode,
      answer: '',
      choices: choicesFor(prev.cards[prev.currentIndex], mode),
      feedback: 'idle',
      showAnswer: false,
    }))
  }, [])

  const setAnswer = useCallback((answer: string) => {
    setState((prev) => ({ ...prev, answer }))
  }, [])

  // Grades `answer` for the current card, persisting only the first attempt.
  const answerCard = useCallback(
    (answer: string, revealOnAnswer: boolean) => {
      const card = state.cards[state.currentIndex]
      if (!card) return

      const isCorrect = checkCard(card, answer)
      const isFirstAttempt = recordedIndexRef.current !== state.currentIndex

      if (isFirstAttempt) {
        recordAnswerUseCase.execute(card.id, isCorrect)
        recordedIndexRef.current = state.currentIndex
      }

      setState((prev) => ({
        ...prev,
        answer,
        feedback: isCorrect ? 'correct' : 'incorrect',
        showAnswer: revealOnAnswer || prev.showAnswer,
        sessionAnswers: isFirstAttempt
          ? [...prev.sessionAnswers, { itemId: card.id, isCorrect }]
          : prev.sessionAnswers,
      }))
    },
    [state.cards, state.currentIndex]
  )

  const submitAnswer = useCallback(() => answerCard(state.answer, false), [answerCard, state.answer])

  // Multiple choice reveals the answer straight away, like the character quiz.
  const selectChoice = useCallback((choice: string) => answerCard(choice, true), [answerCard])

  const nextCard = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1
      if (nextIndex >= prev.cards.length) {
        return { ...prev, finished: true }
      }
      return {
        ...prev,
        currentIndex: nextIndex,
        answer: '',
        choices: choicesFor(prev.cards[nextIndex], prev.mode),
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

  const restartSession = useCallback(() => {
    recordedIndexRef.current = -1
    setState((prev) => startDeck(prev.kind, prev.mode, buildSessionDeck(prev.kind)))
  }, [])

  const reviewMistakes = useCallback(() => {
    recordedIndexRef.current = -1
    setState((prev) => {
      const failedIds = new Set(summarizeSession(prev.sessionAnswers).failedIds)
      const mistakes = shuffleArray(prev.cards.filter((card) => failedIds.has(card.id)))
      if (mistakes.length === 0) return prev
      return startDeck(prev.kind, prev.mode, mistakes, true)
    })
  }, [])

  return {
    state,
    currentCard,
    setKind,
    setMode,
    setAnswer,
    submitAnswer,
    selectChoice,
    nextCard,
    revealAnswer,
    tryAgain,
    restartSession,
    reviewMistakes,
  }
}
