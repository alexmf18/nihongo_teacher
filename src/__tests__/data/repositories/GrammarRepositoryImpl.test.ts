import { GrammarRepositoryImpl } from '../../../data/repositories/GrammarRepositoryImpl'
import { GrammarCategory } from '../../../domain/entities/GrammarItem'

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

  it('getAll returns the sum of every kind', () => {
    const all = repository.getAll()
    const particles = repository.getByKind(GrammarCategory.PARTICLE)
    const conjugations = repository.getByKind(GrammarCategory.CONJUGATION)
    const counters = repository.getByKind(GrammarCategory.COUNTER)
    expect(all.length).toBe(particles.length + conjugations.length + counters.length)
  })

  it('all items have unique ids', () => {
    const all = repository.getAll()
    const ids = all.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
