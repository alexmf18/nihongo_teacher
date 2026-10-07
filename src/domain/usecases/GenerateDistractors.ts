import { Character } from '../entities/Character'
import { ICharacterRepository } from '../repositories/ICharacterRepository'
import { shuffleArray } from '../services/shuffleArray'
import { isConfusableKana, isKanaCategory } from '../services/kana'

export type DistractorField = 'romaji' | 'character'

export class GenerateDistractors {
  constructor(private characterRepo: ICharacterRepository) {}

  execute(target: Character, count: number = 3, field: DistractorField = 'romaji'): Character[] {
    const pool = this.characterRepo
      .getByCategory(target.category, target.phraseCategory)
      .filter((candidate) => candidate.id !== target.id)

    const seenLabels = new Set<string>([this.labelFor(target, field)])
    const distractors: Character[] = []

    for (const candidate of this.orderCandidates(target, pool)) {
      const label = this.labelFor(candidate, field)
      if (seenLabels.has(label)) continue
      seenLabels.add(label)
      distractors.push(candidate)
      if (distractors.length >= count) break
    }

    return distractors
  }

  // For kana, lookalikes come first so multiple choice tests real mix-ups
  // (ぬ/め, シ/ツ, は/ば) instead of options that are trivially different.
  private orderCandidates(target: Character, pool: Character[]): Character[] {
    if (!isKanaCategory(target.category)) return shuffleArray(pool)

    const confusable = pool.filter((c) => isConfusableKana(target.character, c.character))
    const rest = pool.filter((c) => !isConfusableKana(target.character, c.character))
    return [...shuffleArray(confusable), ...shuffleArray(rest)]
  }

  private labelFor(character: Character, field: DistractorField): string {
    return field === 'romaji' ? character.romaji[0] : character.character
  }
}
