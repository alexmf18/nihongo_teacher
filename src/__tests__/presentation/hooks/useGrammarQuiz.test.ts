import { renderHook, act } from '@testing-library/react'
import { useGrammarQuiz } from '../../../presentation/hooks/useGrammarQuiz'
import { GrammarCategory } from '../../../domain/entities/GrammarItem'
import { LocalStorageProgressRepository } from '../../../data/repositories/LocalStorageProgressRepository'

describe('useGrammarQuiz', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with particles by default', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    expect(result.current.state.kind).toBe(GrammarCategory.PARTICLE)
    expect(result.current.state.feedback).toBe('idle')
    expect(result.current.state.cards.length).toBeGreaterThan(0)
  })

  it('switches to conjugation and rebuilds the deck as one card per form', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    act(() => {
      result.current.setKind(GrammarCategory.CONJUGATION)
    })
    expect(result.current.state.kind).toBe(GrammarCategory.CONJUGATION)
    expect(result.current.state.currentIndex).toBe(0)
    result.current.state.cards.forEach((card) => expect(card.kind).toBe(GrammarCategory.CONJUGATION))
  })

  it('provides a currentCard', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    expect(result.current.currentCard).not.toBeNull()
  })

  it('returns correct feedback for a correct particle answer', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    const card = result.current.currentCard
    if (!card || card.kind !== GrammarCategory.PARTICLE) return

    act(() => {
      result.current.setAnswer(card.item.particle)
    })
    act(() => {
      result.current.submitAnswer()
    })
    expect(result.current.state.feedback).toBe('correct')
  })

  it('returns incorrect feedback for a wrong answer', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    act(() => {
      result.current.setAnswer('xyz')
    })
    act(() => {
      result.current.submitAnswer()
    })
    expect(result.current.state.feedback).toBe('incorrect')
  })

  it('advances to the next card and resets answer/feedback', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    const initialIndex = result.current.state.currentIndex

    act(() => {
      result.current.nextCard()
    })
    expect(result.current.state.currentIndex).toBe((initialIndex + 1) % result.current.state.cards.length)
    expect(result.current.state.answer).toBe('')
    expect(result.current.state.feedback).toBe('idle')
  })

  it('resets feedback after tryAgain', () => {
    const { result } = renderHook(() => useGrammarQuiz())
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
    expect(result.current.state.feedback).toBe('idle')
    expect(result.current.state.showAnswer).toBe(false)
  })

  it('does not double-record progress when retrying the same card', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    const card = result.current.currentCard
    if (!card) return

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
      result.current.setAnswer('xyz')
    })
    act(() => {
      result.current.submitAnswer()
    })

    const progressRepo = new LocalStorageProgressRepository()
    const progress = progressRepo.getByCharacterId(card.id)
    expect(progress?.timesIncorrect).toBe(1)
  })
})
