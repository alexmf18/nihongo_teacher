import { CounterItem } from '../entities/GrammarItem'

export class CheckCounterAnswer {
  execute(item: CounterItem, number: number, answer: string): boolean {
    const example = item.examples.find((e) => e.number === number)
    if (!example) return false

    const normalizedAnswer = answer.trim().toLowerCase()
    const candidates = [example.reading, example.romaji, ...(example.alternatives ?? [])]

    return candidates.some((candidate) => candidate.toLowerCase() === normalizedAnswer)
  }
}
