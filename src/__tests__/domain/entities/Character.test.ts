import { Character, CharacterCategory } from '../../../domain/entities/Character'

describe('Character entity', () => {
  it('creates a valid hiragana character', () => {
    const char: Character = {
      id: 'h-a',
      character: 'あ',
      romaji: ['a'],
      category: CharacterCategory.HIRAGANA,
    }

    expect(char.id).toBe('h-a')
    expect(char.character).toBe('あ')
    expect(char.romaji).toEqual(['a'])
    expect(char.category).toBe(CharacterCategory.HIRAGANA)
  })

  it('allows multiple romaji readings', () => {
    const char: Character = {
      id: 'h-shi',
      character: 'し',
      romaji: ['shi', 'si'],
      category: CharacterCategory.HIRAGANA,
    }

    expect(char.romaji).toHaveLength(2)
    expect(char.romaji).toContain('shi')
    expect(char.romaji).toContain('si')
  })

  it('distinguishes categories', () => {
    const hiragana: Character = {
      id: 'h-a',
      character: 'あ',
      romaji: ['a'],
      category: CharacterCategory.HIRAGANA,
    }
    const katakana: Character = {
      id: 'k-a',
      character: 'ア',
      romaji: ['a'],
      category: CharacterCategory.KATAKANA,
    }
    const kanji: Character = {
      id: 'kj-ichi',
      character: '一',
      romaji: ['ichi'],
      category: CharacterCategory.KANJI,
    }

    expect(hiragana.category).not.toBe(katakana.category)
    expect(katakana.category).not.toBe(kanji.category)
    expect(hiragana.category).not.toBe(kanji.category)
  })
})
