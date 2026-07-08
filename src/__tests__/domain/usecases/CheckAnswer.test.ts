import { CheckAnswer } from '../../../domain/usecases/CheckAnswer'
import { Character, CharacterCategory } from '../../../domain/entities/Character'

describe('CheckAnswer use case', () => {
  const useCase = new CheckAnswer()

  it('returns true for exact match', () => {
    const char: Character = {
      id: 'h-a',
      character: 'あ',
      romaji: ['a'],
      category: CharacterCategory.HIRAGANA,
    }
    expect(useCase.execute(char, 'a')).toBe(true)
  })

  it('is case insensitive', () => {
    const char: Character = {
      id: 'h-a',
      character: 'あ',
      romaji: ['a'],
      category: CharacterCategory.HIRAGANA,
    }
    expect(useCase.execute(char, 'A')).toBe(true)
    expect(useCase.execute(char, 'a')).toBe(true)
  })

  it('trims whitespace', () => {
    const char: Character = {
      id: 'h-a',
      character: 'あ',
      romaji: ['a'],
      category: CharacterCategory.HIRAGANA,
    }
    expect(useCase.execute(char, '  a  ')).toBe(true)
  })

  it('accepts alternative romaji readings', () => {
    const char: Character = {
      id: 'h-shi',
      character: 'し',
      romaji: ['shi', 'si'],
      category: CharacterCategory.HIRAGANA,
    }
    expect(useCase.execute(char, 'shi')).toBe(true)
    expect(useCase.execute(char, 'si')).toBe(true)
  })

  it('returns false for incorrect answer', () => {
    const char: Character = {
      id: 'h-a',
      character: 'あ',
      romaji: ['a'],
      category: CharacterCategory.HIRAGANA,
    }
    expect(useCase.execute(char, 'ka')).toBe(false)
  })

  it('returns false for empty string', () => {
    const char: Character = {
      id: 'h-a',
      character: 'あ',
      romaji: ['a'],
      category: CharacterCategory.HIRAGANA,
    }
    expect(useCase.execute(char, '')).toBe(false)
  })
})
