import { ParticleItem } from '../entities/GrammarItem'

// Romaji accepted for each particle. は and を are written as pronounced
// (wa, o), with を also accepted as the common "wo" spelling.
const PARTICLE_ROMAJI: Record<string, string[]> = {
  'は': ['wa'],
  'が': ['ga'],
  'を': ['o', 'wo'],
  'に': ['ni'],
  'で': ['de'],
  'と': ['to'],
  'も': ['mo'],
  'から': ['kara'],
  'へ': ['e'],
  'の': ['no'],
}

export class CheckParticleAnswer {
  execute(item: ParticleItem, answer: string): boolean {
    const normalizedAnswer = answer.trim().toLowerCase()
    const acceptable = [item.particle, ...(item.acceptableParticles ?? [])]
    return acceptable.some((p) => p === normalizedAnswer || (PARTICLE_ROMAJI[p] ?? []).includes(normalizedAnswer))
  }
}
