import { CharacterRepositoryImpl } from '../../../data/repositories/CharacterRepositoryImpl'
import { CharacterCategory, PhraseCategory } from '../../../domain/entities/Character'

describe('CharacterRepositoryImpl', () => {
  const repository = new CharacterRepositoryImpl()

  it('returns hiragana characters', () => {
    const chars = repository.getByCategory(CharacterCategory.HIRAGANA)
    expect(chars.length).toBeGreaterThan(0)
    chars.forEach((c) => expect(c.category).toBe(CharacterCategory.HIRAGANA))
  })

  it('returns katakana characters', () => {
    const chars = repository.getByCategory(CharacterCategory.KATAKANA)
    expect(chars.length).toBeGreaterThan(0)
    chars.forEach((c) => expect(c.category).toBe(CharacterCategory.KATAKANA))
  })

  it('returns kanji characters', () => {
    const chars = repository.getByCategory(CharacterCategory.KANJI)
    expect(chars.length).toBeGreaterThan(0)
    chars.forEach((c) => expect(c.category).toBe(CharacterCategory.KANJI))
  })

  it('every kanji has a meaning, a reading and romaji answers', () => {
    const kanji = repository.getByCategory(CharacterCategory.KANJI)
    kanji.forEach((k) => {
      expect(k.meaning?.trim()).toBeTruthy()
      expect(k.readings!.onyomi.length + k.readings!.kunyomi.length).toBeGreaterThan(0)
      expect(k.romaji.length).toBeGreaterThan(0)
      k.romaji.forEach((r) => expect(r).toMatch(/^[a-z]+$/))
    })
  })

  it('covers the JLPT N5 and N4 kanji, ranked from most to least used', () => {
    const kanji = repository.getByCategory(CharacterCategory.KANJI)
    expect(kanji.length).toBeGreaterThanOrEqual(245)
    expect(kanji.map((k) => k.frequencyRank)).toEqual(kanji.map((_, i) => i + 1))
    expect(kanji[0].character).toBe('日')
  })

  it('keeps the ids, and so the progress, of the kanji the app already had', () => {
    const byCharacter = new Map(repository.getByCategory(CharacterCategory.KANJI).map((k) => [k.character, k]))
    expect(byCharacter.get('一')?.id).toBe('kj-ichi')
    expect(byCharacter.get('四')?.id).toBe('j-shi')
    expect(byCharacter.get('四')?.romaji).toEqual(expect.arrayContaining(['shi', 'yon']))
    expect(byCharacter.get('猫')?.id).toBe('kj-neko')
  })

  it('accepts on, kun and okurigana readings of a new kanji', () => {
    const kau = repository.getByCategory(CharacterCategory.KANJI).find((k) => k.character === '会')!
    expect(kau.romaji[0]).toBe('kai')
    expect(kau.romaji).toEqual(expect.arrayContaining(['kai', 'a', 'au']))
  })

  it('returns words', () => {
    const chars = repository.getByCategory(CharacterCategory.WORD)
    expect(chars.length).toBeGreaterThan(0)
    chars.forEach((c) => expect(c.category).toBe(CharacterCategory.WORD))
  })

  it('returns phrases', () => {
    const chars = repository.getByCategory(CharacterCategory.PHRASE)
    expect(chars.length).toBeGreaterThan(0)
    chars.forEach((c) => expect(c.category).toBe(CharacterCategory.PHRASE))
  })

  it('returns numbers', () => {
    const chars = repository.getByCategory(CharacterCategory.NUMBER)
    expect(chars.length).toBeGreaterThan(0)
    chars.forEach((c) => expect(c.category).toBe(CharacterCategory.NUMBER))
  })

  it('returns the weekdays, months, days of the month and their questions as calendar cards', () => {
    const chars = repository.getByCategory(CharacterCategory.CALENDAR)
    expect(chars).toHaveLength(7 + 12 + 31 + 3)
    chars.forEach((c) => expect(c.meaning).toBeTruthy())
    // The irregular month readings are the ones learners get wrong.
    expect(chars.find((c) => c.meaning === 'abril')?.romaji).toEqual(['shigatsu'])
    expect(chars.find((c) => c.meaning === 'septiembre')?.romaji).toEqual(['kugatsu'])
    expect(chars.find((c) => c.meaning === 'día 20')?.character).toBe('はつか')
    // Long vowels may be typed short.
    expect(chars.find((c) => c.meaning === 'día 8')?.romaji).toEqual(['youka', 'yoka'])
    expect(chars.find((c) => c.meaning === 'día 14')?.romaji).toEqual(['juuyokka', 'juyokka'])
  })

  it('filters phrases by subcategory', () => {
    const greetings = repository.getByCategory(CharacterCategory.PHRASE, PhraseCategory.GREETINGS)
    expect(greetings.length).toBeGreaterThan(0)
    greetings.forEach((c) => {
      expect(c.category).toBe(CharacterCategory.PHRASE)
      expect(c.phraseCategory).toBe(PhraseCategory.GREETINGS)
    })

    const directions = repository.getByCategory(CharacterCategory.PHRASE, PhraseCategory.DIRECTIONS)
    expect(directions.length).toBeGreaterThan(0)
    directions.forEach((c) => {
      expect(c.category).toBe(CharacterCategory.PHRASE)
      expect(c.phraseCategory).toBe(PhraseCategory.DIRECTIONS)
    })
  })

  it('different phrase subcategories are mutually exclusive', () => {
    const greetings = repository.getByCategory(CharacterCategory.PHRASE, PhraseCategory.GREETINGS)
    const introductions = repository.getByCategory(CharacterCategory.PHRASE, PhraseCategory.INTRODUCTIONS)
    const greetingIds = new Set(greetings.map((c) => c.id))
    const introIds = new Set(introductions.map((c) => c.id))
    const intersection = [...greetingIds].filter((id) => introIds.has(id))
    expect(intersection.length).toBe(0)
  })

  it('hiragana and katakana have the same character count', () => {
    const hiragana = repository.getByCategory(CharacterCategory.HIRAGANA)
    const katakana = repository.getByCategory(CharacterCategory.KATAKANA)
    expect(hiragana.length).toBe(katakana.length)
    expect(hiragana.length).toBeGreaterThan(0)
  })

  it('getAll returns all characters', () => {
    const all = repository.getAll()
    const hiragana = repository.getByCategory(CharacterCategory.HIRAGANA)
    const katakana = repository.getByCategory(CharacterCategory.KATAKANA)
    const kanji = repository.getByCategory(CharacterCategory.KANJI)
    const words = repository.getByCategory(CharacterCategory.WORD)
    const phrases = repository.getByCategory(CharacterCategory.PHRASE)
    const numbers = repository.getByCategory(CharacterCategory.NUMBER)
    const calendar = repository.getByCategory(CharacterCategory.CALENDAR)
    expect(all.length).toBe(
      hiragana.length + katakana.length + kanji.length + words.length + phrases.length + numbers.length + calendar.length
    )
  })

  it('all characters have unique ids', () => {
    const all = repository.getAll()
    const ids = all.map((c) => c.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('all characters have non-empty romaji', () => {
    const all = repository.getAll()
    all.forEach((c) => {
      expect(c.romaji.length).toBeGreaterThan(0)
      c.romaji.forEach((r) => expect(r.trim().length).toBeGreaterThan(0))
    })
  })
})
