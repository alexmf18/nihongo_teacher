import { CheckParticleAnswer } from '../../../domain/usecases/CheckParticleAnswer'
import { GrammarCategory, ParticleItem } from '../../../domain/entities/GrammarItem'

describe('CheckParticleAnswer', () => {
  const useCase = new CheckParticleAnswer()

  const item: ParticleItem = {
    id: 'particle-ha-1',
    kind: GrammarCategory.PARTICLE,
    particle: 'は',
    sentenceParts: ['わたし', 'がくせいです。'],
    translation: 'Yo soy estudiante.',
  }

  it('returns true for the exact particle', () => {
    expect(useCase.execute(item, 'は')).toBe(true)
  })

  it('trims whitespace', () => {
    expect(useCase.execute(item, '  は  ')).toBe(true)
  })

  it('returns false for a different particle', () => {
    expect(useCase.execute(item, 'が')).toBe(false)
  })

  it('returns false for an empty answer', () => {
    expect(useCase.execute(item, '')).toBe(false)
  })

  it('accepts any listed acceptable alternative', () => {
    const withAlternatives: ParticleItem = { ...item, acceptableParticles: ['も'] }
    expect(useCase.execute(withAlternatives, 'も')).toBe(true)
    expect(useCase.execute(withAlternatives, 'は')).toBe(true)
  })
})
