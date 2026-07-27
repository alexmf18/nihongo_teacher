import { CharacterCategory } from '../entities/Character'
import { ICharacterRepository } from '../repositories/ICharacterRepository'
import { IProgressRepository } from '../repositories/IProgressRepository'

// A character counts as "mastered" once its Leitner box reaches this level.
// Tune here if box 4 (of 5) feels too strict/lenient as the mastery bar.
export const MASTERY_BOX_THRESHOLD = 4

const TRACKED_CATEGORIES = [
  CharacterCategory.HIRAGANA,
  CharacterCategory.KATAKANA,
  CharacterCategory.KANJI,
  CharacterCategory.WORD,
  CharacterCategory.PHRASE,
  CharacterCategory.NUMBER,
]

export interface CategoryStats {
  category: CharacterCategory
  total: number
  mastered: number
  masteryPercent: number
}

export interface ProgressStats {
  byCategory: CategoryStats[]
  overallMasteryPercent: number
  bestStreak: number
  totalReviewed: number
}

export class GetProgressStats {
  constructor(
    private characterRepo: ICharacterRepository,
    private progressRepo: IProgressRepository
  ) {}

  execute(): ProgressStats {
    const progress = this.progressRepo.getAll()

    const byCategory = TRACKED_CATEGORIES.map((category) => {
      const pool = this.characterRepo.getByCategory(category)
      const mastered = pool.filter((c) => (progress[c.id]?.box ?? 0) >= MASTERY_BOX_THRESHOLD).length
      return {
        category,
        total: pool.length,
        mastered,
        masteryPercent: pool.length > 0 ? Math.round((mastered / pool.length) * 100) : 0,
      }
    })

    const totalCards = byCategory.reduce((sum, c) => sum + c.total, 0)
    const totalMastered = byCategory.reduce((sum, c) => sum + c.mastered, 0)

    // Streak and reviewed-count span the whole progress store (characters and
    // grammar items alike, since they share one localStorage-backed map) rather
    // than just the tracked character categories above.
    const records = Object.values(progress)
    const bestStreak = records.reduce((max, record) => Math.max(max, record.currentStreak ?? 0), 0)

    return {
      byCategory,
      overallMasteryPercent: totalCards > 0 ? Math.round((totalMastered / totalCards) * 100) : 0,
      bestStreak,
      totalReviewed: records.length,
    }
  }
}
