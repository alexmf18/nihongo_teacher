import { useState, useCallback, useMemo, useRef } from 'react'
import { Character, CharacterCategory, PhraseCategory } from '../../domain/entities/Character'
import { PracticeMode, resolveModeForCategory } from '../../domain/entities/PracticeMode'
import { SESSION_SIZE, SessionAnswer } from '../../domain/entities/Session'
import { KanaRow } from '../../domain/entities/KanaRow'
import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository'
import { IProgressRepository } from '../../domain/repositories/IProgressRepository'
import { CheckAnswer } from '../../domain/usecases/CheckAnswer'
import { GetPracticeDeck } from '../../domain/usecases/GetPracticeDeck'
import { RecordAnswer } from '../../domain/usecases/RecordAnswer'
import { GenerateDistractors } from '../../domain/usecases/GenerateDistractors'
import { CharacterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl'
import { LocalStorageProgressRepository } from '../../data/repositories/LocalStorageProgressRepository'
import { shuffleArray } from '../../domain/services/shuffleArray'
import { summarizeSession } from '../../domain/services/summarizeSession'

const repository: ICharacterRepository = new CharacterRepositoryImpl()
const progressRepository: IProgressRepository = new LocalStorageProgressRepository()
const checkAnswerUseCase = new CheckAnswer()
const getPracticeDeck = new GetPracticeDeck(repository, progressRepository)
const recordAnswerUseCase = new RecordAnswer(progressRepository)
const generateDistractors = new GenerateDistractors(repository)

const CHOICE_COUNT = 3

function buildChoices(character: Character): Character[] {
  const distractors = generateDistractors.execute(character, CHOICE_COUNT, 'romaji')
  return shuffleArray([character, ...distractors])
}

function buildSessionDeck(
  category: CharacterCategory,
  subCategory?: PhraseCategory,
  kanaRows: KanaRow[] = []
): Character[] {
  return getPracticeDeck.execute({ category, subCategory, kanaRows, limit: SESSION_SIZE })
}

export interface QuizState {
  category: CharacterCategory
  phraseCategory?: PhraseCategory
  // Kana rows to practice; empty means every row. Shared by hiragana and katakana.
  kanaRows: KanaRow[]
  mode: PracticeMode
  characters: Character[]
  currentIndex: number
  answer: string
  choices?: Character[]
  feedback: 'idle' | 'correct' | 'incorrect'
  showAnswer: boolean
  sessionAnswers: SessionAnswer[]
  finished: boolean
  isReview: boolean
}

// The per-deck slice of QuizState, reset whenever a new deck starts.
function startDeck(characters: Character[], mode: PracticeMode, isReview = false) {
  const first = characters[0]
  return {
    characters,
    currentIndex: 0,
    answer: '',
    choices: mode === PracticeMode.MULTIPLE_CHOICE && first ? buildChoices(first) : undefined,
    feedback: 'idle' as const,
    showAnswer: false,
    sessionAnswers: [],
    finished: false,
    isReview,
  }
}

export function useCharacterQuiz() {
  const [state, setState] = useState<QuizState>(() => ({
    category: CharacterCategory.HIRAGANA,
    kanaRows: [],
    mode: PracticeMode.ROMAJI_INPUT,
    ...startDeck(buildSessionDeck(CharacterCategory.HIRAGANA), PracticeMode.ROMAJI_INPUT),
  }))

  // Tracks the currentIndex already recorded via RecordAnswer, so re-submitting
  // the same card (e.g. after "Intentar de nuevo") never double-counts a result.
  const recordedIndexRef = useRef<number>(-1)

  const currentCharacter = useMemo(
    () => state.characters[state.currentIndex] ?? null,
    [state.characters, state.currentIndex]
  )

  const setCategory = useCallback((category: CharacterCategory) => {
    recordedIndexRef.current = -1
    setState((prev) => {
      const mode = resolveModeForCategory(prev.mode, category)
      return {
        ...prev,
        category,
        mode,
        phraseCategory: undefined,
        ...startDeck(buildSessionDeck(category, undefined, prev.kanaRows), mode),
      }
    })
  }, [])

  const setKanaRows = useCallback((kanaRows: KanaRow[]) => {
    recordedIndexRef.current = -1
    setState((prev) => ({
      ...prev,
      kanaRows,
      ...startDeck(buildSessionDeck(prev.category, prev.phraseCategory, kanaRows), prev.mode),
    }))
  }, [])

  const setPhraseCategory = useCallback((subCategory: PhraseCategory) => {
    recordedIndexRef.current = -1
    setState((prev) => ({
      ...prev,
      phraseCategory: subCategory,
      ...startDeck(buildSessionDeck(CharacterCategory.PHRASE, subCategory), prev.mode),
    }))
  }, [])

  const setMode = useCallback((mode: PracticeMode) => {
    setState((prev) => {
      const character = prev.characters[prev.currentIndex]
      return {
        ...prev,
        mode,
        answer: '',
        choices: mode === PracticeMode.MULTIPLE_CHOICE && character ? buildChoices(character) : undefined,
        feedback: 'idle',
        showAnswer: false,
      }
    })
  }, [])

  const setAnswer = useCallback((answer: string) => {
    setState((prev) => ({ ...prev, answer }))
  }, [])

  // Persists the first attempt on the current card; later retries return false.
  const recordFirstAttempt = useCallback(
    (character: Character, isCorrect: boolean): boolean => {
      if (recordedIndexRef.current === state.currentIndex) return false
      recordAnswerUseCase.execute(character.id, isCorrect)
      recordedIndexRef.current = state.currentIndex
      return true
    },
    [state.currentIndex]
  )

  const submitAnswer = useCallback(() => {
    const character = state.characters[state.currentIndex]
    if (!character) return

    const isCorrect = checkAnswerUseCase.execute(character, state.answer)
    const isFirstAttempt = recordFirstAttempt(character, isCorrect)

    setState((prev) => ({
      ...prev,
      feedback: isCorrect ? 'correct' : 'incorrect',
      sessionAnswers: isFirstAttempt
        ? [...prev.sessionAnswers, { itemId: character.id, isCorrect }]
        : prev.sessionAnswers,
    }))
  }, [state.characters, state.currentIndex, state.answer, recordFirstAttempt])

  const selectChoice = useCallback(
    (characterId: string) => {
      const character = state.characters[state.currentIndex]
      if (!character) return

      const isCorrect = characterId === character.id
      const isFirstAttempt = recordFirstAttempt(character, isCorrect)

      setState((prev) => ({
        ...prev,
        answer: characterId,
        feedback: isCorrect ? 'correct' : 'incorrect',
        showAnswer: true,
        sessionAnswers: isFirstAttempt
          ? [...prev.sessionAnswers, { itemId: character.id, isCorrect }]
          : prev.sessionAnswers,
      }))
    },
    [state.characters, state.currentIndex, recordFirstAttempt]
  )

  const nextCharacter = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1
      if (nextIndex >= prev.characters.length) {
        return { ...prev, finished: true }
      }
      const next = prev.characters[nextIndex]
      return {
        ...prev,
        currentIndex: nextIndex,
        answer: '',
        choices: prev.mode === PracticeMode.MULTIPLE_CHOICE && next ? buildChoices(next) : undefined,
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
    setState((prev) => ({
      ...prev,
      ...startDeck(buildSessionDeck(prev.category, prev.phraseCategory, prev.kanaRows), prev.mode),
    }))
  }, [])

  const reviewMistakes = useCallback(() => {
    recordedIndexRef.current = -1
    setState((prev) => {
      const failedIds = new Set(summarizeSession(prev.sessionAnswers).failedIds)
      const mistakes = shuffleArray(prev.characters.filter((c) => failedIds.has(c.id)))
      if (mistakes.length === 0) return prev
      return { ...prev, ...startDeck(mistakes, prev.mode, true) }
    })
  }, [])

  return {
    state,
    currentCharacter,
    setCategory,
    setPhraseCategory,
    setKanaRows,
    setMode,
    setAnswer,
    submitAnswer,
    selectChoice,
    nextCharacter,
    revealAnswer,
    tryAgain,
    restartSession,
    reviewMistakes,
  }
}
