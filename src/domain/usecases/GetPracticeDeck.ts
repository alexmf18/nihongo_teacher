import { Character, CharacterCategory, PhraseCategory } from '../entities/Character'
import { KanaRow } from '../entities/KanaRow'
import { ICharacterRepository } from '../repositories/ICharacterRepository'
import { IProgressRepository } from '../repositories/IProgressRepository'
import { buildDueOrderedDeck } from '../services/buildDueOrderedDeck'
import { getKanaRow, isKanaCategory } from '../services/kana'

export interface PracticeDeckOptions {
  category: CharacterCategory
  subCategory?: PhraseCategory
  // Restricts hiragana/katakana to these rows; empty or omitted means all rows.
  kanaRows?: KanaRow[]
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
    const pool = this.filterByKanaRows(
      this.characterRepo.getByCategory(options.category, options.subCategory),
      options.category,
      options.kanaRows
    )
    const progress = this.progressRepo.getAll()

    const deck = buildDueOrderedDeck(pool, progress, now)

    return options.limit !== undefined ? deck.slice(0, options.limit) : deck
  }

  private filterByKanaRows(pool: Character[], category: CharacterCategory, rows?: KanaRow[]): Character[] {
    if (!rows || rows.length === 0 || !isKanaCategory(category)) return pool
    return pool.filter((c) => {
      const row = getKanaRow(c.character)
      return row !== undefined && rows.includes(row)
    })
  }
}
