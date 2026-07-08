import { Character } from '../entities/Character'

export class CheckAnswer {
  execute(character: Character, answer: string): boolean {
    const normalizedAnswer = answer.trim().toLowerCase()
    return character.romaji.some((r) => r.toLowerCase() === normalizedAnswer)
  }
}
