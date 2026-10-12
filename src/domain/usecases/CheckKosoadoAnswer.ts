import { KosoadoItem } from '../entities/GrammarItem'
import { kanaToRomaji } from '../services/kana'

// Accepts the word in kana or in romaji (kore, asoko…).
export class CheckKosoadoAnswer {
  execute(item: KosoadoItem, answer: string): boolean {
    const normalizedAnswer = answer.trim().toLowerCase()
    if (!normalizedAnswer) return false
    const acceptable = [item.word, ...(item.acceptableWords ?? [])]
    return acceptable.some((word) => word === normalizedAnswer || kanaToRomaji(word) === normalizedAnswer)
  }
}
