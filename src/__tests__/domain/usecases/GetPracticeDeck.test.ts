import { GetPracticeDeck } from '../../../domain/usecases/GetPracticeDeck'
import { CharacterRepositoryImpl } from '../../../data/repositories/CharacterRepositoryImpl'
import { IProgressRepository } from '../../../domain/repositories/IProgressRepository'
import { CharacterProgress, ProgressMap } from '../../../domain/entities/Progress'
import { CharacterCategory, PhraseCategory } from '../../../domain/entities/Character'
import { KanaRow } from '../../../domain/entities/KanaRow'

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

describe('GetPracticeDeck', () => {
  const characterRepo = new CharacterRepositoryImpl()

  it('returns the full pool when there is no progress at all', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetPracticeDeck(characterRepo, progressRepo)

    const deck = useCase.execute({ category: CharacterCategory.NUMBER })
    const pool = characterRepo.getByCategory(CharacterCategory.NUMBER)

    expect(deck.length).toBe(pool.length)
    expect(new Set(deck.map((c) => c.id))).toEqual(new Set(pool.map((c) => c.id)))
  })

  it('restricts kana to the selected rows', () => {
    const useCase = new GetPracticeDeck(characterRepo, new InMemoryProgressRepository())

    const deck = useCase.execute({ category: CharacterCategory.KATAKANA, kanaRows: [KanaRow.A, KanaRow.PA] })

    expect(deck.map((c) => c.character).sort()).toEqual(['ア', 'イ', 'ウ', 'エ', 'オ', 'パ', 'ピ', 'プ', 'ペ', 'ポ'].sort())
  })

  it('treats an empty row selection as every row', () => {
    const useCase = new GetPracticeDeck(characterRepo, new InMemoryProgressRepository())

    const deck = useCase.execute({ category: CharacterCategory.HIRAGANA, kanaRows: [] })

    expect(deck.length).toBe(characterRepo.getByCategory(CharacterCategory.HIRAGANA).length)
  })

  it('ignores kana rows for non-kana categories', () => {
    const useCase = new GetPracticeDeck(characterRepo, new InMemoryProgressRepository())

    const deck = useCase.execute({ category: CharacterCategory.NUMBER, kanaRows: [KanaRow.A] })

    expect(deck.length).toBe(characterRepo.getByCategory(CharacterCategory.NUMBER).length)
  })

  it('respects phrase subCategory filtering', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetPracticeDeck(characterRepo, progressRepo)

    const deck = useCase.execute({ category: CharacterCategory.PHRASE, subCategory: PhraseCategory.GREETINGS })

    expect(deck.length).toBeGreaterThan(0)
    deck.forEach((c) => expect(c.phraseCategory).toBe(PhraseCategory.GREETINGS))
  })

  it('surfaces due/never-seen cards before not-yet-due cards', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetPracticeDeck(characterRepo, progressRepo)
    const pool = characterRepo.getByCategory(CharacterCategory.NUMBER)
    const now = 10_000

    // Mark every card except the last one as "not due" far in the future.
    pool.slice(0, -1).forEach((c) => {
      progressRepo.save({
        characterId: c.id,
        box: 3,
        timesCorrect: 5,
        timesIncorrect: 0,
        lastSeenAt: now,
        dueAt: now + 1_000_000,
      })
    })
    const stillDueId = pool[pool.length - 1].id

    const deck = useCase.execute({ category: CharacterCategory.NUMBER, now })

    expect(deck[0].id).toBe(stillDueId)
  })

  it('never returns an empty deck for a non-empty category', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetPracticeDeck(characterRepo, progressRepo)

    const deck = useCase.execute({ category: CharacterCategory.HIRAGANA, now: 999_999_999 })

    expect(deck.length).toBeGreaterThan(0)
  })

  it('respects the limit option', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetPracticeDeck(characterRepo, progressRepo)

    const deck = useCase.execute({ category: CharacterCategory.HIRAGANA, limit: 5 })

    expect(deck.length).toBe(5)
  })
})
