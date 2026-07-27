import { useState, useCallback, useMemo, useRef } from 'react'
import { Character, CharacterCategory, PhraseCategory } from '../../domain/entities/Character'
import { PracticeMode } from '../../domain/entities/PracticeMode'
import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository'
import { IProgressRepository } from '../../domain/repositories/IProgressRepository'
import { CheckAnswer } from '../../domain/usecases/CheckAnswer'
import { GetPracticeDeck } from '../../domain/usecases/GetPracticeDeck'
import { RecordAnswer } from '../../domain/usecases/RecordAnswer'
import { GenerateDistractors } from '../../domain/usecases/GenerateDistractors'
import { CharacterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl'
import { LocalStorageProgressRepository } from '../../data/repositories/LocalStorageProgressRepository'
import { shuffleArray } from '../../domain/services/shuffleArray'

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

export interface QuizState {
  category: CharacterCategory
  phraseCategory?: PhraseCategory
  mode: PracticeMode
  characters: Character[]
  currentIndex: number
  answer: string
  choices?: Character[]
  feedback: 'idle' | 'correct' | 'incorrect'
  showAnswer: boolean
}

export function useCharacterQuiz() {
  const [state, setState] = useState<QuizState>(() => {
    const characters = getPracticeDeck.execute({ category: CharacterCategory.HIRAGANA })
    return {
      category: CharacterCategory.HIRAGANA,
      mode: PracticeMode.ROMAJI_INPUT,
      characters,
      currentIndex: 0,
      answer: '',
      choices: undefined,
      feedback: 'idle',
      showAnswer: false,
    }
  })

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
      const characters = getPracticeDeck.execute({ category })
      const first = characters[0]
      return {
        ...prev,
        category,
        phraseCategory: undefined,
        characters,
        currentIndex: 0,
        answer: '',
        choices: prev.mode === PracticeMode.MULTIPLE_CHOICE && first ? buildChoices(first) : undefined,
        feedback: 'idle',
        showAnswer: false,
      }
    })
  }, [])

  const setPhraseCategory = useCallback((subCategory: PhraseCategory) => {
    recordedIndexRef.current = -1
    setState((prev) => {
      const characters = getPracticeDeck.execute({ category: CharacterCategory.PHRASE, subCategory })
      const first = characters[0]
      return {
        ...prev,
        phraseCategory: subCategory,
        characters,
        currentIndex: 0,
        answer: '',
        choices: prev.mode === PracticeMode.MULTIPLE_CHOICE && first ? buildChoices(first) : undefined,
        feedback: 'idle',
        showAnswer: false,
      }
    })
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

  const submitAnswer = useCallback(() => {
    const character = state.characters[state.currentIndex]
    if (!character) return

    const isCorrect = checkAnswerUseCase.execute(character, state.answer)

    if (recordedIndexRef.current !== state.currentIndex) {
      recordAnswerUseCase.execute(character.id, isCorrect)
      recordedIndexRef.current = state.currentIndex
    }

    setState((prev) => ({
      ...prev,
      feedback: isCorrect ? 'correct' : 'incorrect',
    }))
  }, [state.characters, state.currentIndex, state.answer])

  const selectChoice = useCallback(
    (characterId: string) => {
      const character = state.characters[state.currentIndex]
      if (!character) return

      const isCorrect = characterId === character.id

      if (recordedIndexRef.current !== state.currentIndex) {
        recordAnswerUseCase.execute(character.id, isCorrect)
        recordedIndexRef.current = state.currentIndex
      }

      setState((prev) => ({
        ...prev,
        answer: characterId,
        feedback: isCorrect ? 'correct' : 'incorrect',
        showAnswer: true,
      }))
    },
    [state.characters, state.currentIndex]
  )

  const nextCharacter = useCallback(() => {
    setState((prev) => {
      const nextIndex = (prev.currentIndex + 1) % prev.characters.length
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

  return {
    state,
    currentCharacter,
    setCategory,
    setPhraseCategory,
    setMode,
    setAnswer,
    submitAnswer,
    selectChoice,
    nextCharacter,
    revealAnswer,
    tryAgain,
  }
}
