import { CounterItem, GrammarCategory, ParticleItem } from '../entities/GrammarItem'
import { GrammarCard } from '../entities/GrammarCard'
import { IGrammarRepository } from '../repositories/IGrammarRepository'
import { correctAnswerFor } from '../services/grammarAnswer'
import { shuffleArray } from '../services/shuffleArray'

// Particles learners typically mix up with each other.
const CONFUSABLE_PARTICLES: string[][] = [
  ['は', 'が', 'も'],
  ['に', 'で', 'から'],
  ['を', 'が'],
  ['と', 'も'],
]

// Plain number readings, used to build the "regular-looking" wrong reading of an
// irregular counter (いちほん instead of いっぽん).
const NUMBER_KANA: Record<number, string> = {
  1: 'いち',
  2: 'に',
  3: 'さん',
  4: 'よん',
  5: 'ご',
  6: 'ろく',
  7: 'なな',
  8: 'はち',
  9: 'きゅう',
  10: 'じゅう',
}

export class GenerateGrammarChoices {
  constructor(private grammarRepo: IGrammarRepository) {}

  // Returns the correct answer plus up to `count` distractors, shuffled.
  execute(card: GrammarCard, count: number = 3): string[] {
    const correct = correctAnswerFor(card)
    const distractors = this.distractorsFor(card).slice(0, count)
    return shuffleArray([correct, ...distractors])
  }

  private distractorsFor(card: GrammarCard): string[] {
    if (card.kind === GrammarCategory.PARTICLE) return this.particleDistractors(card.item)
    if (card.kind === GrammarCategory.COUNTER) return this.counterDistractors(card.item, card.number)
    // Sentences are answered by ordering tiles, never by picking an option.
    if (card.kind === GrammarCategory.SENTENCE) return []

    // Other forms of the same word: the question is which form, not which word.
    const correct = correctAnswerFor(card)
    return shuffleArray(card.item.forms.map((f) => f.value).filter((v) => v !== correct))
  }

  private particleDistractors(item: ParticleItem): string[] {
    const accepted = new Set([item.particle, ...(item.acceptableParticles ?? [])])
    const pool = [...new Set(this.grammarRepo.getByKind(GrammarCategory.PARTICLE).map((p) => p.particle))].filter(
      (p) => !accepted.has(p)
    )
    const isConfusable = (p: string) =>
      CONFUSABLE_PARTICLES.some((group) => group.includes(item.particle) && group.includes(p))

    return [...shuffleArray(pool.filter(isConfusable)), ...shuffleArray(pool.filter((p) => !isConfusable(p)))]
  }

  private counterDistractors(item: CounterItem, number: number): string[] {
    const example = item.examples.find((e) => e.number === number)
    if (!example) return []

    const accepted = new Set([example.reading, ...(example.alternatives ?? [])])
    const likelyMistakes: string[] = []

    // The plain number + counter, with each sound change of the counter.
    if (NUMBER_KANA[number]) {
      likelyMistakes.push(...item.suffixReadings.map((s) => NUMBER_KANA[number] + s))
    }
    // The correct prefix with the wrong sound change (さんほん for さんぼん).
    const usedSuffix = item.suffixReadings.find((s) => example.reading.endsWith(s))
    if (usedSuffix) {
      const prefix = example.reading.slice(0, -usedSuffix.length)
      likelyMistakes.push(...item.suffixReadings.map((s) => prefix + s))
    }

    const otherNumbers = item.examples.filter((e) => e.number !== number).map((e) => e.reading)

    const ordered = [...shuffleArray(likelyMistakes), ...shuffleArray(otherNumbers)]
    return [...new Set(ordered)].filter((reading) => !accepted.has(reading))
  }
}
