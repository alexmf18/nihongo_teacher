import { CharacterRepositoryImpl } from '../../../data/repositories/CharacterRepositoryImpl'
import { CharacterCategory, KanjiGroup, PhraseCategory } from '../../../domain/entities/Character'

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

  it('every kanji has a meaning, readings and a group', () => {
    const kanji = repository.getByCategory(CharacterCategory.KANJI)
    kanji.forEach((k) => {
      expect(k.meaning?.trim()).toBeTruthy()
      expect(k.readings?.onyomi.trim()).toBeTruthy()
      expect(Object.values(KanjiGroup)).toContain(k.kanjiGroup)
    })
  })

  it('every kanji group has at least one kanji', () => {
    const kanji = repository.getByCategory(CharacterCategory.KANJI)
    Object.values(KanjiGroup).forEach((group) => {
      expect(kanji.some((k) => k.kanjiGroup === group)).toBe(true)
    })
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
    expect(all.length).toBe(hiragana.length + katakana.length + kanji.length + words.length + phrases.length + numbers.length)
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
