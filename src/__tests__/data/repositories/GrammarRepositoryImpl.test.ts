import { GrammarRepositoryImpl } from '../../../data/repositories/GrammarRepositoryImpl'
import { AdjectiveType, GrammarCategory } from '../../../domain/entities/GrammarItem'
import { formLabel } from '../../../domain/entities/ConjugationFormLabels'
import { kanaToRomaji } from '../../../domain/services/kana'

describe('GrammarRepositoryImpl', () => {
  const repository = new GrammarRepositoryImpl()

  it('returns particle items', () => {
    const particles = repository.getByKind(GrammarCategory.PARTICLE)
    expect(particles.length).toBeGreaterThan(0)
    particles.forEach((item) => expect(item.kind).toBe(GrammarCategory.PARTICLE))
  })

  it('returns conjugation items with at least one form each', () => {
    const conjugations = repository.getByKind(GrammarCategory.CONJUGATION)
    expect(conjugations.length).toBeGreaterThan(0)
    conjugations.forEach((item) => {
      expect(item.kind).toBe(GrammarCategory.CONJUGATION)
      expect(item.forms.length).toBeGreaterThan(0)
    })
  })

  it('returns counter items with examples', () => {
    const counters = repository.getByKind(GrammarCategory.COUNTER)
    expect(counters.length).toBeGreaterThan(0)
    counters.forEach((item) => {
      expect(item.kind).toBe(GrammarCategory.COUNTER)
      expect(item.examples.length).toBeGreaterThan(0)
    })
  })

  it('returns adjectives of both types, each with a romaji per form', () => {
    const adjectives = repository.getByKind(GrammarCategory.ADJECTIVE)
    expect(adjectives.some((a) => a.adjectiveType === AdjectiveType.I)).toBe(true)
    expect(adjectives.some((a) => a.adjectiveType === AdjectiveType.NA)).toBe(true)
    adjectives.forEach((item) => item.forms.forEach((form) => expect(form.romaji).toBeTruthy()))
  })

  it('gives every verb the same set of forms and a romaji for each', () => {
    const verbs = repository.getByKind(GrammarCategory.CONJUGATION)
    const formNames = verbs[0].forms.map((f) => f.formName)
    verbs.forEach((verb) => {
      expect(verb.forms.map((f) => f.formName)).toEqual(formNames)
      verb.forms.forEach((form) => expect(form.romaji).toBeTruthy())
    })
  })

  it('romaji agrees with the kana for forms written entirely in kana', () => {
    const items = [...repository.getByKind(GrammarCategory.CONJUGATION), ...repository.getByKind(GrammarCategory.ADJECTIVE)]
    items.forEach((item) =>
      item.forms.forEach((form) => {
        const fromKana = kanaToRomaji(form.value)
        if (fromKana !== undefined) expect(form.romaji?.replace(/\s+/g, '')).toBe(fromKana)
      })
    )
  })

  it('every form has a label for the practice card', () => {
    const items = [...repository.getByKind(GrammarCategory.CONJUGATION), ...repository.getByKind(GrammarCategory.ADJECTIVE)]
    items.forEach((item) => item.forms.forEach((form) => expect(formLabel(form.formName)).not.toBe(form.formName)))
  })

  it('sentences have several chunks, end in punctuation, and alternatives reuse the same chunks', () => {
    const sentences = repository.getByKind(GrammarCategory.SENTENCE)
    expect(sentences.length).toBeGreaterThan(0)
    sentences.forEach((s) => {
      expect(s.chunks.length).toBeGreaterThanOrEqual(3)
      expect(s.chunks[s.chunks.length - 1]).toMatch(/[。？]$/)
      const sorted = [...s.chunks].sort()
      ;(s.alternativeOrders ?? []).forEach((order) => {
        expect([...order].sort()).toEqual(sorted)
        expect(order).not.toEqual(s.chunks)
      })
    })
  })

  it('getAll returns the sum of every kind', () => {
    const all = repository.getAll()
    const total = Object.values(GrammarCategory).reduce((sum, kind) => sum + repository.getByKind(kind).length, 0)
    expect(all.length).toBe(total)
  })

  it('all items have unique ids', () => {
    const all = repository.getAll()
    const ids = all.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
