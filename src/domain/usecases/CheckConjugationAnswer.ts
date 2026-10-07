import { InflectableItem } from '../entities/GrammarItem'
import { kanaToRomaji } from '../services/kana'

// Romaji is compared without spaces, so "takai desu" and "takaidesu" both match.
function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, '')
}

export class CheckConjugationAnswer {
  execute(item: InflectableItem, formName: string, answer: string): boolean {
    const form = item.forms.find((f) => f.formName === formName)
    if (!form) return false

    const candidates = [form.value, form.romaji, ...(form.alternatives ?? [])]
      .filter((v): v is string => Boolean(v))
      .map(normalize)

    const normalizedAnswer = normalize(answer)
    // Lets an all-kana answer (たべます) match the romaji of a kanji form (食べます).
    const answerAsRomaji = kanaToRomaji(normalizedAnswer)

    return candidates.some((candidate) => candidate === normalizedAnswer || candidate === answerAsRomaji)
  }
}
