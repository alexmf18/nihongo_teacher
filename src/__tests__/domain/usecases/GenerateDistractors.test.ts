import { GenerateDistractors } from '../../../domain/usecases/GenerateDistractors'
import { CharacterRepositoryImpl } from '../../../data/repositories/CharacterRepositoryImpl'
import { CharacterCategory, PhraseCategory } from '../../../domain/entities/Character'

describe('GenerateDistractors', () => {
  const repository = new CharacterRepositoryImpl()
  const useCase = new GenerateDistractors(repository)

  it('returns the requested number of distractors when the pool is large enough', () => {
    const target = repository.getByCategory(CharacterCategory.HIRAGANA)[0]
    const distractors = useCase.execute(target, 3)

    expect(distractors.length).toBe(3)
    distractors.forEach((d) => expect(d.id).not.toBe(target.id))
  })

  it('never includes the target itself', () => {
    const target = repository.getByCategory(CharacterCategory.HIRAGANA)[0]
    const distractors = useCase.execute(target, 10)

    expect(distractors.find((d) => d.id === target.id)).toBeUndefined()
  })

  it('does not return two distractors with the same displayed romaji', () => {
    const target = repository.getByCategory(CharacterCategory.HIRAGANA)[0]
    const distractors = useCase.execute(target, 10, 'romaji')

    const labels = distractors.map((d) => d.romaji[0])
    expect(new Set(labels).size).toBe(labels.length)
  })

  it('degrades gracefully when the category has fewer entries than requested', () => {
    const target = repository.getByCategory(CharacterCategory.PHRASE, PhraseCategory.GREETINGS)[0]
    const pool = repository.getByCategory(CharacterCategory.PHRASE, PhraseCategory.GREETINGS)

    const distractors = useCase.execute(target, 10)

    expect(distractors.length).toBeLessThan(10)
    expect(distractors.length).toBeLessThanOrEqual(pool.length - 1)
  })

  it('prefers lookalike kana as distractors', () => {
    const katakana = repository.getByCategory(CharacterCategory.KATAKANA)
    const target = katakana.find((k) => k.character === 'シ')!

    for (let run = 0; run < 10; run++) {
      // シ has four lookalikes (ツ, ン, ソ and ジ), so all three picks come from them.
      const distractors = useCase.execute(target, 3).map((d) => d.character)
      distractors.forEach((k) => expect(['ツ', 'ン', 'ソ', 'ジ']).toContain(k))
    }
  })

  it('fills with dakuten variants of the same kana', () => {
    const hiragana = repository.getByCategory(CharacterCategory.HIRAGANA)
    const target = hiragana.find((k) => k.character === 'ひ')!

    const distractors = useCase.execute(target, 2).map((d) => d.character)
    expect(distractors.sort()).toEqual(['び', 'ぴ'])
  })

  it('tops up with random kana when there are not enough lookalikes', () => {
    const hiragana = repository.getByCategory(CharacterCategory.HIRAGANA)
    const target = hiragana.find((k) => k.character === 'ひ')!

    const distractors = useCase.execute(target, 3).map((d) => d.character)
    expect(distractors).toHaveLength(3)
    expect(distractors).toEqual(expect.arrayContaining(['び', 'ぴ']))
  })

  it('respects the character field when deduping/labeling', () => {
    const target = repository.getByCategory(CharacterCategory.HIRAGANA)[0]
    const distractors = useCase.execute(target, 3, 'character')

    const labels = distractors.map((d) => d.character)
    expect(new Set(labels).size).toBe(labels.length)
    expect(labels).not.toContain(target.character)
  })
})
