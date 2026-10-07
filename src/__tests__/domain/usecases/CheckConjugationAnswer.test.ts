import { CheckConjugationAnswer } from '../../../domain/usecases/CheckConjugationAnswer'
import {
  AdjectiveItem,
  AdjectiveType,
  ConjugationItem,
  GrammarCategory,
  VerbGroup,
} from '../../../domain/entities/GrammarItem'

describe('CheckConjugationAnswer', () => {
  const useCase = new CheckConjugationAnswer()

  const item: ConjugationItem = {
    id: 'conj-taberu',
    kind: GrammarCategory.CONJUGATION,
    dictionaryForm: '食べる',
    meaning: 'comer',
    verbGroup: VerbGroup.ICHIDAN,
    forms: [
      { formName: 'masu', value: '食べます', romaji: 'tabemasu' },
      { formName: 'plain_negative', value: '食べない', romaji: 'tabenai' },
    ],
  }

  const adjective: AdjectiveItem = {
    id: 'adj-shizuka',
    kind: GrammarCategory.ADJECTIVE,
    dictionaryForm: '静か',
    meaning: 'tranquilo',
    adjectiveType: AdjectiveType.NA,
    forms: [
      {
        formName: 'plain_negative',
        value: '静かじゃない',
        romaji: 'shizuka janai',
        alternatives: ['静かではない', 'shizuka dewa nai'],
      },
    ],
  }

  it('accepts the Japanese value for the requested form', () => {
    expect(useCase.execute(item, 'masu', '食べます')).toBe(true)
  })

  it('accepts the romaji for the requested form, case-insensitively', () => {
    expect(useCase.execute(item, 'masu', 'TABEMASU')).toBe(true)
  })

  it('trims whitespace', () => {
    expect(useCase.execute(item, 'masu', '  tabemasu  ')).toBe(true)
  })

  it('accepts the answer written entirely in hiragana', () => {
    expect(useCase.execute(item, 'masu', 'たべます')).toBe(true)
  })

  it('accepts the answer written in katakana too', () => {
    expect(useCase.execute(item, 'plain_negative', 'タベナイ')).toBe(true)
  })

  it('rejects a value from a different form', () => {
    expect(useCase.execute(item, 'masu', '食べない')).toBe(false)
    expect(useCase.execute(item, 'masu', 'たべない')).toBe(false)
  })

  it('returns false for an unknown form name', () => {
    expect(useCase.execute(item, 'past', '食べました')).toBe(false)
  })

  it('ignores spaces in romaji and accepts listed alternatives', () => {
    expect(useCase.execute(adjective, 'plain_negative', 'shizukajanai')).toBe(true)
    expect(useCase.execute(adjective, 'plain_negative', '静かではない')).toBe(true)
    expect(useCase.execute(adjective, 'plain_negative', 'shizuka dewanai')).toBe(true)
    expect(useCase.execute(adjective, 'plain_negative', 'しずかじゃない')).toBe(true)
  })

  it('rejects the い-adjective pattern on a な-adjective', () => {
    expect(useCase.execute(adjective, 'plain_negative', 'しずかくない')).toBe(false)
  })
})
