import { ParticleItem } from '../entities/GrammarItem'

export class CheckParticleAnswer {
  execute(item: ParticleItem, answer: string): boolean {
    const normalizedAnswer = answer.trim()
    const acceptable = [item.particle, ...(item.acceptableParticles ?? [])]
    return acceptable.some((p) => p === normalizedAnswer)
  }
}
