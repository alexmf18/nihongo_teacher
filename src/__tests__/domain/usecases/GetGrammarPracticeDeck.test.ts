import { GetGrammarPracticeDeck } from '../../../domain/usecases/GetGrammarPracticeDeck'
import { GrammarRepositoryImpl } from '../../../data/repositories/GrammarRepositoryImpl'
import { IProgressRepository } from '../../../domain/repositories/IProgressRepository'
import { CharacterProgress, ProgressMap } from '../../../domain/entities/Progress'
import { GrammarCategory } from '../../../domain/entities/GrammarItem'

class InMemoryProgressRepository implements IProgressRepository {
  private map: ProgressMap = {}

  getAll(): ProgressMap {
    return this.map
  }

  getByCharacterId(characterId: string): CharacterProgress | undefined {
    return this.map[characterId]
  }

  save(progress: CharacterProgress): void {
    this.map[progress.characterId] = progress
  }

  clear(): void {
    this.map = {}
  }
}

describe('GetGrammarPracticeDeck', () => {
  const grammarRepo = new GrammarRepositoryImpl()

  it('builds one card per particle item', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetGrammarPracticeDeck(grammarRepo, progressRepo)

    const deck = useCase.execute(GrammarCategory.PARTICLE)
    const particles = grammarRepo.getByKind(GrammarCategory.PARTICLE)

    expect(deck.length).toBe(particles.length)
    deck.forEach((card) => expect(card.kind).toBe(GrammarCategory.PARTICLE))
  })

  it('builds one card per conjugation form (not per verb)', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetGrammarPracticeDeck(grammarRepo, progressRepo)

    const deck = useCase.execute(GrammarCategory.CONJUGATION)
    const conjugations = grammarRepo.getByKind(GrammarCategory.CONJUGATION)
    const expectedCardCount = conjugations.reduce((sum, item) => sum + item.forms.length, 0)

    expect(deck.length).toBe(expectedCardCount)
    expect(deck.length).toBeGreaterThan(conjugations.length)
  })

  it('uses a composite id for conjugation cards so each form is tracked independently', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetGrammarPracticeDeck(grammarRepo, progressRepo)

    const deck = useCase.execute(GrammarCategory.CONJUGATION)
    deck.forEach((card) => {
      if (card.kind === GrammarCategory.CONJUGATION) {
        expect(card.id).toBe(`${card.item.id}:${card.formName}`)
      }
    })
  })

  it('surfaces not-yet-due cards after due ones', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetGrammarPracticeDeck(grammarRepo, progressRepo)
    const particles = grammarRepo.getByKind(GrammarCategory.PARTICLE)
    const now = 10_000

    particles.slice(0, -1).forEach((item) => {
      progressRepo.save({
        characterId: item.id,
        box: 3,
        timesCorrect: 5,
        timesIncorrect: 0,
        lastSeenAt: now,
        dueAt: now + 1_000_000,
      })
    })
    const stillDueId = particles[particles.length - 1].id

    const deck = useCase.execute(GrammarCategory.PARTICLE, now)
    expect(deck[0].id).toBe(stillDueId)
  })
})
