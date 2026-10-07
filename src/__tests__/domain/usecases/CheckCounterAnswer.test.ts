import { CheckCounterAnswer } from '../../../domain/usecases/CheckCounterAnswer'
import { CounterItem, GrammarCategory } from '../../../domain/entities/GrammarItem'

describe('CheckCounterAnswer', () => {
  const useCase = new CheckCounterAnswer()

  const item: CounterItem = {
    id: 'counter-hon',
    kind: GrammarCategory.COUNTER,
    counter: '本',
    usage: 'Objetos alargados',
    suffixReadings: ['ほん', 'ぼん', 'ぽん'],
    examples: [
      { number: 3, reading: 'さんぼん', romaji: 'sanbon', alternatives: ['sambon'] },
      { number: 8, reading: 'はっぽん', romaji: 'happon', alternatives: ['はちほん'] },
    ],
  }

  it('accepts the kana reading', () => {
    expect(useCase.execute(item, 3, 'さんぼん')).toBe(true)
  })

  it('accepts romaji case-insensitively and trimmed', () => {
    expect(useCase.execute(item, 3, '  SanBon ')).toBe(true)
  })

  it('accepts listed alternatives', () => {
    expect(useCase.execute(item, 3, 'sambon')).toBe(true)
    expect(useCase.execute(item, 8, 'はちほん')).toBe(true)
  })

  it('rejects a wrong sound change', () => {
    expect(useCase.execute(item, 3, 'さんほん')).toBe(false)
  })

  it('rejects a number without an example', () => {
    expect(useCase.execute(item, 5, 'ごほん')).toBe(false)
  })
})
