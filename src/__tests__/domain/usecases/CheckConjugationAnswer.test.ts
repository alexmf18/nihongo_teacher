import { CheckConjugationAnswer } from '../../../domain/usecases/CheckConjugationAnswer'
import { GrammarCategory, ConjugationItem } from '../../../domain/entities/GrammarItem'

describe('CheckConjugationAnswer', () => {
  const useCase = new CheckConjugationAnswer()

  const item: ConjugationItem = {
    id: 'conj-taberu',
    kind: GrammarCategory.CONJUGATION,
    dictionaryForm: '食べる',
    meaning: 'comer',
    forms: [
      { formName: 'dictionary', value: '食べる', romaji: 'taberu' },
      { formName: 'masu', value: '食べます', romaji: 'tabemasu' },
    ],
  }

  it('accepts the Japanese value for the requested form', () => {
    expect(useCase.execute(item, 'masu', '食べます')).toBe(true)
  })

  it('accepts the romaji for the requested form, case-insensitively', () => {
    expect(useCase.execute(item, 'masu', 'TABEMASU')).toBe(true)
  })

  it('trims whitespace', () => {
    expect(useCase.execute(item, 'dictionary', '  taberu  ')).toBe(true)
  })

  it('rejects a value from a different form', () => {
    expect(useCase.execute(item, 'masu', '食べる')).toBe(false)
  })

  it('returns false for an unknown form name', () => {
    expect(useCase.execute(item, 'past', '食べました')).toBe(false)
  })
})
