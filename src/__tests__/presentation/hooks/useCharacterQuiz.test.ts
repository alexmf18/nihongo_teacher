import { renderHook, act } from '@testing-library/react'
import { useCharacterQuiz } from '../../../presentation/hooks/useCharacterQuiz'
import { Character, CharacterCategory, PhraseCategory } from '../../../domain/entities/Character'
import { PracticeMode } from '../../../domain/entities/PracticeMode'
import { LocalStorageProgressRepository } from '../../../data/repositories/LocalStorageProgressRepository'

describe('useCharacterQuiz', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with hiragana by default', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    expect(result.current.state.category).toBe(CharacterCategory.HIRAGANA)
    expect(result.current.state.feedback).toBe('idle')
    expect(result.current.state.answer).toBe('')
  })

  it('loads characters for the selected category', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    expect(result.current.state.characters.length).toBeGreaterThan(0)
    result.current.state.characters.forEach((c: Character) =>
      expect(c.category).toBe(CharacterCategory.HIRAGANA)
    )
  })

  it('switches category', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    act(() => {
      result.current.setCategory(CharacterCategory.KATAKANA)
    })
    expect(result.current.state.category).toBe(CharacterCategory.KATAKANA)
    expect(result.current.state.currentIndex).toBe(0)
    expect(result.current.state.feedback).toBe('idle')
  })

  it('sets answer', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    act(() => {
      result.current.setAnswer('a')
    })
    expect(result.current.state.answer).toBe('a')
  })

  it('returns correct feedback for a correct answer', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    const char = result.current.currentCharacter
    if (!char) return

    act(() => {
      result.current.setAnswer(char.romaji[0])
    })
    act(() => {
      result.current.submitAnswer()
    })
    expect(result.current.state.feedback).toBe('correct')
  })

  it('returns incorrect feedback for a wrong answer', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    act(() => {
      result.current.setAnswer('xyz')
    })
    act(() => {
      result.current.submitAnswer()
    })
    expect(result.current.state.feedback).toBe('incorrect')
  })

  it('advances to the next character', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    const initialIndex = result.current.state.currentIndex

    act(() => {
      result.current.nextCharacter()
    })
    expect(result.current.state.currentIndex).toBe(initialIndex + 1)
    expect(result.current.state.answer).toBe('')
    expect(result.current.state.feedback).toBe('idle')
  })

  it('resets feedback after tryAgain', () => {
    const { result } = renderHook(() => useCharacterQuiz())

    act(() => {
      result.current.setAnswer('a')
      result.current.submitAnswer()
    })
    expect(result.current.state.feedback).toBe('incorrect')

    act(() => {
      result.current.tryAgain()
    })
    expect(result.current.state.feedback).toBe('idle')
    expect(result.current.state.showAnswer).toBe(false)
  })

  it('reveals the answer', () => {
    const { result } = renderHook(() => useCharacterQuiz())

    act(() => {
      result.current.setAnswer('xyz')
    })
    act(() => {
      result.current.submitAnswer()
    })
    expect(result.current.state.feedback).toBe('incorrect')

    act(() => {
      result.current.revealAnswer()
    })
    expect(result.current.state.showAnswer).toBe(true)
  })

  it('provides a currentCharacter', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    expect(result.current.currentCharacter).not.toBeNull()
    expect(result.current.currentCharacter?.character).toBeDefined()
  })

  it('switches to phrase subcategory', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    act(() => {
      result.current.setCategory(CharacterCategory.PHRASE)
    })
    expect(result.current.state.category).toBe(CharacterCategory.PHRASE)

    act(() => {
      result.current.setPhraseCategory(PhraseCategory.GREETINGS)
    })
    expect(result.current.state.phraseCategory).toBe(PhraseCategory.GREETINGS)
    expect(result.current.state.currentIndex).toBe(0)
    expect(result.current.state.feedback).toBe('idle')
    result.current.state.characters.forEach((c: Character) => {
      expect(c.phraseCategory).toBe(PhraseCategory.GREETINGS)
    })
  })

  it('pushes a recently-mastered character behind still-due ones on the next deck build', () => {
    const { result } = renderHook(() => useCharacterQuiz())

    const answered = result.current.currentCharacter
    if (!answered) return

    act(() => {
      result.current.setAnswer(answered.romaji[0])
    })
    act(() => {
      result.current.submitAnswer()
    })
    expect(result.current.state.feedback).toBe('correct')

    // Rebuild the hiragana deck (switch away and back) so GetPracticeDeck re-evaluates due dates.
    act(() => {
      result.current.setCategory(CharacterCategory.KATAKANA)
    })
    act(() => {
      result.current.setCategory(CharacterCategory.HIRAGANA)
    })

    const rebuiltDeck = result.current.state.characters
    const answeredIndex = rebuiltDeck.findIndex((c) => c.id === answered.id)
    expect(answeredIndex).toBe(rebuiltDeck.length - 1)
  })

  it('does not double-record progress when retrying the same card', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    const character = result.current.currentCharacter
    if (!character) return

    act(() => {
      result.current.setAnswer('xyz')
    })
    act(() => {
      result.current.submitAnswer()
    })
    expect(result.current.state.feedback).toBe('incorrect')

    act(() => {
      result.current.tryAgain()
    })
    act(() => {
      result.current.setAnswer(character.romaji[0])
    })
    act(() => {
      result.current.submitAnswer()
    })
    expect(result.current.state.feedback).toBe('correct')

    const progressRepo = new LocalStorageProgressRepository()
    const progress = progressRepo.getByCharacterId(character.id)
    expect(progress?.timesIncorrect).toBe(1)
    expect(progress?.timesCorrect).toBe(0)
  })

  it('defaults to romaji input mode with no choices', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    expect(result.current.state.mode).toBe(PracticeMode.ROMAJI_INPUT)
    expect(result.current.state.choices).toBeUndefined()
  })

  it('populates choices (including the target) when switching to multiple choice', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    const target = result.current.currentCharacter
    if (!target) return

    act(() => {
      result.current.setMode(PracticeMode.MULTIPLE_CHOICE)
    })

    expect(result.current.state.mode).toBe(PracticeMode.MULTIPLE_CHOICE)
    expect(result.current.state.choices?.length).toBeGreaterThan(1)
    expect(result.current.state.choices?.some((c: Character) => c.id === target.id)).toBe(true)
  })

  it('selectChoice records correct feedback and reveals the answer immediately', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    const target = result.current.currentCharacter
    if (!target) return

    act(() => {
      result.current.setMode(PracticeMode.MULTIPLE_CHOICE)
    })
    act(() => {
      result.current.selectChoice(target.id)
    })

    expect(result.current.state.feedback).toBe('correct')
    expect(result.current.state.showAnswer).toBe(true)
  })

  it('selectChoice records incorrect feedback for a wrong pick', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    const target = result.current.currentCharacter
    if (!target) return

    act(() => {
      result.current.setMode(PracticeMode.MULTIPLE_CHOICE)
    })
    const wrongChoice = result.current.state.choices?.find((c: Character) => c.id !== target.id)
    if (!wrongChoice) return

    act(() => {
      result.current.selectChoice(wrongChoice.id)
    })

    expect(result.current.state.feedback).toBe('incorrect')
    expect(result.current.state.showAnswer).toBe(true)
  })

  it('keeps the selected mode and regenerates choices across a category switch', () => {
    const { result } = renderHook(() => useCharacterQuiz())

    act(() => {
      result.current.setMode(PracticeMode.MULTIPLE_CHOICE)
    })
    act(() => {
      result.current.setCategory(CharacterCategory.KATAKANA)
    })

    expect(result.current.state.mode).toBe(PracticeMode.MULTIPLE_CHOICE)
    expect(result.current.state.choices?.length).toBeGreaterThan(1)
    const newTarget = result.current.currentCharacter
    expect(result.current.state.choices?.some((c: Character) => c.id === newTarget?.id)).toBe(true)
  })
})
