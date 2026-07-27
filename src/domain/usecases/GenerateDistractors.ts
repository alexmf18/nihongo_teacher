import { Character } from '../entities/Character'
import { ICharacterRepository } from '../repositories/ICharacterRepository'
import { shuffleArray } from '../services/shuffleArray'

export type DistractorField = 'romaji' | 'character'

export class GenerateDistractors {
  constructor(private characterRepo: ICharacterRepository) {}

  execute(target: Character, count: number = 3, field: DistractorField = 'romaji'): Character[] {
    const pool = this.characterRepo
      .getByCategory(target.category, target.phraseCategory)
      .filter((candidate) => candidate.id !== target.id)

    const seenLabels = new Set<string>([this.labelFor(target, field)])
    const distractors: Character[] = []

    for (const candidate of shuffleArray(pool)) {
      const label = this.labelFor(candidate, field)
      if (seenLabels.has(label)) continue
      seenLabels.add(label)
      distractors.push(candidate)
      if (distractors.length >= count) break
    }

    return distractors
  }

  private labelFor(character: Character, field: DistractorField): string {
    return field === 'romaji' ? character.romaji[0] : character.character
  }
}
