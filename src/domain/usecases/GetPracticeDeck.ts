import { Character, CharacterCategory, PhraseCategory } from '../entities/Character'
import { ICharacterRepository } from '../repositories/ICharacterRepository'
import { IProgressRepository } from '../repositories/IProgressRepository'
import { buildDueOrderedDeck } from '../services/buildDueOrderedDeck'

export interface PracticeDeckOptions {
  category: CharacterCategory
  subCategory?: PhraseCategory
  limit?: number
  now?: number
}

export class GetPracticeDeck {
  constructor(
    private characterRepo: ICharacterRepository,
    private progressRepo: IProgressRepository
  ) {}

  execute(options: PracticeDeckOptions): Character[] {
    const now = options.now ?? Date.now()
    const pool = this.characterRepo.getByCategory(options.category, options.subCategory)
    const progress = this.progressRepo.getAll()

    const deck = buildDueOrderedDeck(pool, progress, now)

    return options.limit !== undefined ? deck.slice(0, options.limit) : deck
  }
}
