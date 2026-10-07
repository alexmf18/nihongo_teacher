import { summarizeSession } from '../../../domain/services/summarizeSession'

describe('summarizeSession', () => {
  it('returns zeros for an empty session', () => {
    expect(summarizeSession([])).toEqual({
      total: 0,
      correct: 0,
      incorrect: 0,
      accuracyPercent: 0,
      failedIds: [],
    })
  })

  it('counts correct and incorrect answers and lists failed ids in order', () => {
    const summary = summarizeSession([
      { itemId: 'a', isCorrect: true },
      { itemId: 'b', isCorrect: false },
      { itemId: 'c', isCorrect: true },
      { itemId: 'd', isCorrect: false },
    ])

    expect(summary.total).toBe(4)
    expect(summary.correct).toBe(2)
    expect(summary.incorrect).toBe(2)
    expect(summary.accuracyPercent).toBe(50)
    expect(summary.failedIds).toEqual(['b', 'd'])
  })

  it('rounds the accuracy percentage', () => {
    const summary = summarizeSession([
      { itemId: 'a', isCorrect: true },
      { itemId: 'b', isCorrect: true },
      { itemId: 'c', isCorrect: false },
    ])
    expect(summary.accuracyPercent).toBe(67)
  })
})
