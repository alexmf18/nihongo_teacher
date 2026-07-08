import { renderHook, act } from '@testing-library/react'
import { useCharacterQuiz } from '../../../presentation/hooks/useCharacterQuiz'
import { Character, CharacterCategory, PhraseCategory } from '../../../domain/entities/Character'

describe('useCharacterQuiz', () => {
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
})
