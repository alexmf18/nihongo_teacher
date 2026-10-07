import { renderHook, act } from '@testing-library/react'
import { useCharacterQuiz } from '../../../presentation/hooks/useCharacterQuiz'
import { Character, CharacterCategory, PhraseCategory } from '../../../domain/entities/Character'
import { PracticeMode } from '../../../domain/entities/PracticeMode'
import { SESSION_SIZE } from '../../../domain/entities/Session'
import { KanaRow } from '../../../domain/entities/KanaRow'
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

    // Plenty of hiragana are still due, so the session is filled with those and the
    // just-answered (no longer due) character doesn't make the cut.
    const rebuiltDeck = result.current.state.characters
    expect(rebuiltDeck.some((c) => c.id === answered.id)).toBe(false)
  })

  it('limits a session to SESSION_SIZE cards', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    expect(result.current.state.characters.length).toBe(SESSION_SIZE)
  })

  // Answers every card in the current deck, getting the first `wrongCount` wrong.
  function playThroughDeck(result: { current: ReturnType<typeof useCharacterQuiz> }, wrongCount: number) {
    const total = result.current.state.characters.length
    for (let i = 0; i < total; i++) {
      const character = result.current.currentCharacter!
      act(() => {
        result.current.setAnswer(i < wrongCount ? 'xyz' : character.romaji[0])
      })
      act(() => {
        result.current.submitAnswer()
      })
      act(() => {
        result.current.nextCharacter()
      })
    }
  }

  it('finishes the session after the last card instead of looping', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    playThroughDeck(result, 2)

    expect(result.current.state.finished).toBe(true)
    expect(result.current.state.sessionAnswers).toHaveLength(SESSION_SIZE)
    expect(result.current.state.sessionAnswers.filter((a) => !a.isCorrect)).toHaveLength(2)
  })

  it('counts only the first attempt of a retried card in the session', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    const character = result.current.currentCharacter!

    act(() => {
      result.current.setAnswer('xyz')
    })
    act(() => {
      result.current.submitAnswer()
    })
    act(() => {
      result.current.tryAgain()
    })
    act(() => {
      result.current.setAnswer(character.romaji[0])
    })
    act(() => {
      result.current.submitAnswer()
    })

    expect(result.current.state.sessionAnswers).toEqual([{ itemId: character.id, isCorrect: false }])
  })

  it('reviewMistakes starts a deck with only the missed cards', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    const missedIds = result.current.state.characters.slice(0, 3).map((c) => c.id)
    playThroughDeck(result, 3)

    act(() => {
      result.current.reviewMistakes()
    })

    expect(result.current.state.isReview).toBe(true)
    expect(result.current.state.finished).toBe(false)
    expect(result.current.state.currentIndex).toBe(0)
    expect(result.current.state.sessionAnswers).toEqual([])
    expect(result.current.state.characters.map((c) => c.id).sort()).toEqual([...missedIds].sort())
  })

  it('restartSession builds a fresh session deck', () => {
    const { result } = renderHook(() => useCharacterQuiz())
    playThroughDeck(result, 1)

    act(() => {
      result.current.restartSession()
    })

    expect(result.current.state.finished).toBe(false)
    expect(result.current.state.isReview).toBe(false)
    expect(result.current.state.currentIndex).toBe(0)
    expect(result.current.state.sessionAnswers).toEqual([])
    expect(result.current.state.characters).toHaveLength(SESSION_SIZE)
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

  it('falls back to an available mode when the new category does not support the current one', () => {
    const { result } = renderHook(() => useCharacterQuiz())

    act(() => {
      result.current.setCategory(CharacterCategory.WORD)
    })
    act(() => {
      result.current.setMode(PracticeMode.REVERSE)
    })
    act(() => {
      result.current.setCategory(CharacterCategory.HIRAGANA)
    })

    expect(result.current.state.mode).toBe(PracticeMode.ROMAJI_INPUT)
  })

  it('setKanaRows starts a session with only those rows, kept across hiragana/katakana', () => {
    const { result } = renderHook(() => useCharacterQuiz())

    act(() => {
      result.current.setKanaRows([KanaRow.KA])
    })
    expect(result.current.state.kanaRows).toEqual([KanaRow.KA])
    expect(result.current.state.currentIndex).toBe(0)
    expect(result.current.state.characters.map((c) => c.character).sort()).toEqual(['か', 'き', 'く', 'け', 'こ'].sort())

    act(() => {
      result.current.setCategory(CharacterCategory.KATAKANA)
    })
    expect(result.current.state.characters.map((c) => c.character).sort()).toEqual(['カ', 'キ', 'ク', 'ケ', 'コ'].sort())
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
