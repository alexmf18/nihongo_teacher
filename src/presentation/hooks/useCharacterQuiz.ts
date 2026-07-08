import { useState, useCallback, useMemo } from 'react'
import { Character, CharacterCategory, PhraseCategory } from '../../domain/entities/Character'
import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository'
import { CheckAnswer } from '../../domain/usecases/CheckAnswer'
import { CharacterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl'

const repository: ICharacterRepository = new CharacterRepositoryImpl()
const checkAnswerUseCase = new CheckAnswer()

export interface QuizState {
  category: CharacterCategory
  phraseCategory?: PhraseCategory
  characters: Character[]
  currentIndex: number
  answer: string
  feedback: 'idle' | 'correct' | 'incorrect'
  showAnswer: boolean
}

export function useCharacterQuiz() {
  const [state, setState] = useState<QuizState>(() => {
    const chars = repository.getByCategory(CharacterCategory.HIRAGANA)
    return {
      category: CharacterCategory.HIRAGANA,
      characters: shuffleArray(chars),
      currentIndex: 0,
      answer: '',
      feedback: 'idle',
      showAnswer: false,
    }
  })

  const currentCharacter = useMemo(
    () => state.characters[state.currentIndex] ?? null,
    [state.characters, state.currentIndex]
  )

  const setCategory = useCallback((category: CharacterCategory) => {
    const chars = repository.getByCategory(category)
    setState({
      category,
      phraseCategory: undefined,
      characters: shuffleArray(chars),
      currentIndex: 0,
      answer: '',
      feedback: 'idle',
      showAnswer: false,
    })
  }, [])

  const setPhraseCategory = useCallback((subCategory: PhraseCategory) => {
    setState((prev) => {
      const chars = repository.getByCategory(CharacterCategory.PHRASE, subCategory)
      return {
        ...prev,
        phraseCategory: subCategory,
        characters: shuffleArray(chars),
        currentIndex: 0,
        answer: '',
        feedback: 'idle',
        showAnswer: false,
      }
    })
  }, [])

  const setAnswer = useCallback((answer: string) => {
    setState((prev) => ({ ...prev, answer }))
  }, [])

  const submitAnswer = useCallback(() => {
    setState((prev) => {
      const character = prev.characters[prev.currentIndex]
      if (!character) return prev
      const isCorrect = checkAnswerUseCase.execute(character, prev.answer)
      return {
        ...prev,
        feedback: isCorrect ? 'correct' : 'incorrect',
      }
    })
  }, [])

  const nextCharacter = useCallback(() => {
    setState((prev) => {
      const nextIndex = (prev.currentIndex + 1) % prev.characters.length
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
    currentCharacter,
    setCategory,
    setPhraseCategory,
    setAnswer,
    submitAnswer,
    nextCharacter,
    revealAnswer,
    tryAgain,
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
