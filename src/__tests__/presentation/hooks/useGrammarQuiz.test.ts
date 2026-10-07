import { renderHook, act } from '@testing-library/react'
import { useGrammarQuiz } from '../../../presentation/hooks/useGrammarQuiz'
import { GrammarCategory } from '../../../domain/entities/GrammarItem'
import { LocalStorageProgressRepository } from '../../../data/repositories/LocalStorageProgressRepository'
import { PracticeMode } from '../../../domain/entities/PracticeMode'
import { SESSION_SIZE } from '../../../domain/entities/Session'
import { correctAnswerFor } from '../../../domain/services/grammarAnswer'

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

  it('finishes after the last card and can review only the missed ones', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    const total = result.current.state.cards.length
    const missedId = result.current.state.cards[0].id

    for (let i = 0; i < total; i++) {
      const correct = correctAnswerFor(result.current.currentCard!)
      act(() => {
        result.current.setAnswer(i === 0 ? 'xyz' : correct)
      })
      act(() => {
        result.current.submitAnswer()
      })
      act(() => {
        result.current.nextCard()
      })
    }

    expect(result.current.state.finished).toBe(true)
    expect(result.current.state.sessionAnswers).toHaveLength(total)

    act(() => {
      result.current.reviewMistakes()
    })

    expect(result.current.state.isReview).toBe(true)
    expect(result.current.state.finished).toBe(false)
    expect(result.current.state.cards.map((c) => c.id)).toEqual([missedId])

    act(() => {
      result.current.restartSession()
    })

    expect(result.current.state.isReview).toBe(false)
    expect(result.current.state.cards.length).toBe(total)
  })

  it('builds a counter deck with one card per counter example', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    act(() => {
      result.current.setKind(GrammarCategory.COUNTER)
    })

    expect(result.current.state.cards.length).toBe(SESSION_SIZE)
    result.current.state.cards.forEach((card) => expect(card.kind).toBe(GrammarCategory.COUNTER))

    const card = result.current.currentCard!
    act(() => {
      result.current.setAnswer(correctAnswerFor(card))
    })
    act(() => {
      result.current.submitAnswer()
    })
    expect(result.current.state.feedback).toBe('correct')
  })

  it('builds an adjective deck and accepts kana answers', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    act(() => {
      result.current.setKind(GrammarCategory.ADJECTIVE)
    })

    result.current.state.cards.forEach((card) => expect(card.kind).toBe(GrammarCategory.ADJECTIVE))

    const card = result.current.currentCard!
    if (card.kind !== GrammarCategory.ADJECTIVE) throw new Error('expected an adjective card')
    const form = card.item.forms.find((f) => f.formName === card.formName)!
    act(() => {
      result.current.setAnswer(form.romaji!)
    })
    act(() => {
      result.current.submitAnswer()
    })
    expect(result.current.state.feedback).toBe('correct')
  })

  it('switches to a sentence-compatible mode for sentences and back again', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    act(() => {
      result.current.setKind(GrammarCategory.SENTENCE)
    })
    expect(result.current.state.mode).toBe(PracticeMode.REVERSE)

    const card = result.current.currentCard!
    act(() => {
      result.current.selectChoice(correctAnswerFor(card))
    })
    expect(result.current.state.feedback).toBe('correct')

    act(() => {
      result.current.setKind(GrammarCategory.PARTICLE)
    })
    expect(result.current.state.mode).toBe(PracticeMode.ROMAJI_INPUT)
  })

  it('gives every new deck a fresh deckId', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    const firstDeck = result.current.state.deckId
    act(() => {
      result.current.restartSession()
    })
    expect(result.current.state.deckId).not.toBe(firstDeck)
  })

  it('multiple choice offers the correct answer and grades the pick', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    act(() => {
      result.current.setMode(PracticeMode.MULTIPLE_CHOICE)
    })

    const card = result.current.currentCard!
    const correct = correctAnswerFor(card)
    expect(result.current.state.choices).toContain(correct)
    expect(result.current.state.choices!.length).toBeGreaterThan(1)

    act(() => {
      result.current.selectChoice(correct)
    })
    expect(result.current.state.feedback).toBe('correct')
    expect(result.current.state.showAnswer).toBe(true)
  })

  it('keeps multiple choice when switching grammar kind and on the next card', () => {
    const { result } = renderHook(() => useGrammarQuiz())
    act(() => {
      result.current.setMode(PracticeMode.MULTIPLE_CHOICE)
    })
    act(() => {
      result.current.setKind(GrammarCategory.CONJUGATION)
    })
    expect(result.current.state.mode).toBe(PracticeMode.MULTIPLE_CHOICE)
    expect(result.current.state.choices).toContain(correctAnswerFor(result.current.currentCard!))

    act(() => {
      result.current.nextCard()
    })
    expect(result.current.state.choices).toContain(correctAnswerFor(result.current.currentCard!))
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
