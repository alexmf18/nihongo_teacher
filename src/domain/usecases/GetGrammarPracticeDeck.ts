import { GrammarCategory } from '../entities/GrammarItem'
import { GrammarCard } from '../entities/GrammarCard'
import { IGrammarRepository } from '../repositories/IGrammarRepository'
import { IProgressRepository } from '../repositories/IProgressRepository'
import { buildDueOrderedDeck } from '../services/buildDueOrderedDeck'

export type QuizzableGrammarKind = GrammarCategory

export class GetGrammarPracticeDeck {
  constructor(
    private grammarRepo: IGrammarRepository,
    private progressRepo: IProgressRepository
  ) {}

  execute(kind: QuizzableGrammarKind, now: number = Date.now(), limit?: number): GrammarCard[] {
    const cards = this.buildCards(kind)
    const progress = this.progressRepo.getAll()
    const deck = buildDueOrderedDeck(cards, progress, now)
    return limit !== undefined ? deck.slice(0, limit) : deck
  }

  private buildCards(kind: QuizzableGrammarKind): GrammarCard[] {
    if (kind === GrammarCategory.PARTICLE) {
      return this.grammarRepo.getByKind(GrammarCategory.PARTICLE).map((item) => ({
        id: item.id,
        kind: GrammarCategory.PARTICLE as const,
        item,
      }))
    }

    if (kind === GrammarCategory.SENTENCE) {
      return this.grammarRepo.getByKind(GrammarCategory.SENTENCE).map((item) => ({
        id: item.id,
        kind: GrammarCategory.SENTENCE as const,
        item,
      }))
    }

    if (kind === GrammarCategory.COUNTER) {
      return this.grammarRepo.getByKind(GrammarCategory.COUNTER).flatMap((item) =>
        item.examples.map((example) => ({
          id: `${item.id}:${example.number}`,
          kind: GrammarCategory.COUNTER as const,
          item,
          number: example.number,
        }))
      )
    }

    if (kind === GrammarCategory.ADJECTIVE) {
      return this.grammarRepo.getByKind(GrammarCategory.ADJECTIVE).flatMap((item) =>
        item.forms.map((form) => ({
          id: `${item.id}:${form.formName}`,
          kind: GrammarCategory.ADJECTIVE as const,
          item,
          formName: form.formName,
        }))
      )
    }

    return this.grammarRepo.getByKind(GrammarCategory.CONJUGATION).flatMap((item) =>
      item.forms.map((form) => ({
        id: `${item.id}:${form.formName}`,
        kind: GrammarCategory.CONJUGATION as const,
        item,
        formName: form.formName,
      }))
    )
  }
}
