import { ConjugationItem } from '../entities/GrammarItem'

export class CheckConjugationAnswer {
  execute(item: ConjugationItem, formName: string, answer: string): boolean {
    const form = item.forms.find((f) => f.formName === formName)
    if (!form) return false

    const normalizedAnswer = answer.trim().toLowerCase()
    const candidates = [form.value, form.romaji].filter((v): v is string => Boolean(v))

    return candidates.some((candidate) => candidate.toLowerCase() === normalizedAnswer)
  }
}
