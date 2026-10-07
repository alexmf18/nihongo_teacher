import { GenerateGrammarChoices } from '../../../domain/usecases/GenerateGrammarChoices'
import { GrammarRepositoryImpl } from '../../../data/repositories/GrammarRepositoryImpl'
import { GrammarCategory } from '../../../domain/entities/GrammarItem'
import { GrammarCard } from '../../../domain/entities/GrammarCard'

describe('GenerateGrammarChoices', () => {
  const repository = new GrammarRepositoryImpl()
  const useCase = new GenerateGrammarChoices(repository)

  function counterCard(id: string, number: number): GrammarCard {
    const item = repository.getByKind(GrammarCategory.COUNTER).find((c) => c.id === id)!
    return { id: `${id}:${number}`, kind: GrammarCategory.COUNTER, item, number }
  }

  it('returns four distinct options including the correct particle', () => {
    const item = repository.getByKind(GrammarCategory.PARTICLE).find((p) => p.particle === 'は')!
    const choices = useCase.execute({ id: item.id, kind: GrammarCategory.PARTICLE, item })

    expect(choices).toHaveLength(4)
    expect(new Set(choices).size).toBe(4)
    expect(choices).toContain('は')
  })

  it('prefers commonly confused particles', () => {
    const item = repository.getByKind(GrammarCategory.PARTICLE).find((p) => p.particle === 'は')!
    const choices = useCase.execute({ id: item.id, kind: GrammarCategory.PARTICLE, item })

    expect(choices).toEqual(expect.arrayContaining(['が', 'も']))
  })

  it('never offers an acceptable alternative particle as a wrong option', () => {
    const base = repository.getByKind(GrammarCategory.PARTICLE).find((p) => p.particle === 'は')!
    const item = { ...base, acceptableParticles: ['が'] }

    for (let run = 0; run < 10; run++) {
      expect(useCase.execute({ id: item.id, kind: GrammarCategory.PARTICLE, item })).not.toContain('が')
    }
  })

  it('uses other forms of the same verb for conjugation', () => {
    const item = repository.getByKind(GrammarCategory.CONJUGATION)[0]
    const choices = useCase.execute({ id: `${item.id}:masu`, kind: GrammarCategory.CONJUGATION, item, formName: 'masu' })
    const forms = item.forms.map((f) => f.value)

    expect(choices).toHaveLength(4)
    choices.forEach((c) => expect(forms).toContain(c))
  })

  it('offers sound-change mistakes for irregular counters', () => {
    const choices = useCase.execute(counterCard('counter-hon', 3))

    expect(choices).toContain('さんぼん')
    expect(choices).toEqual(expect.arrayContaining(['さんほん', 'さんぽん']))
  })

  it('offers the regular-looking reading for an irregular counter', () => {
    const choices = useCase.execute(counterCard('counter-nin', 1))

    expect(choices).toContain('ひとり')
    expect(choices).toContain('いちにん')
  })

  it('never offers an accepted alternative reading as a wrong option', () => {
    for (let run = 0; run < 10; run++) {
      const choices = useCase.execute(counterCard('counter-hon', 8))
      expect(choices).toContain('はっぽん')
      expect(choices).not.toContain('はちほん')
    }
  })
})
