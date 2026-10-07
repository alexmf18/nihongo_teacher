import { CheckSentenceAnswer } from '../../../domain/usecases/CheckSentenceAnswer'
import { GrammarCategory, SentenceItem } from '../../../domain/entities/GrammarItem'

describe('CheckSentenceAnswer', () => {
  const useCase = new CheckSentenceAnswer()

  const item: SentenceItem = {
    id: 'sent-pan',
    kind: GrammarCategory.SENTENCE,
    chunks: ['きのう', 'パン', 'を', 'たべました。'],
    translation: 'Ayer comí pan.',
    alternativeOrders: [['パン', 'を', 'きのう', 'たべました。']],
  }

  it('accepts the chunks in the canonical order', () => {
    expect(useCase.execute(item, 'きのうパンをたべました。')).toBe(true)
  })

  it('accepts a listed alternative order', () => {
    expect(useCase.execute(item, 'パンをきのうたべました。')).toBe(true)
  })

  it('ignores spaces and final punctuation', () => {
    expect(useCase.execute(item, 'きのう パン を たべました')).toBe(true)
  })

  it('rejects any other order', () => {
    expect(useCase.execute(item, 'きのうをパンたべました。')).toBe(false)
  })

  it('rejects an empty answer', () => {
    expect(useCase.execute(item, '')).toBe(false)
  })
})
