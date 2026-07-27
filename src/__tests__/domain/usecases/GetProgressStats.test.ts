import { GetProgressStats, MASTERY_BOX_THRESHOLD } from '../../../domain/usecases/GetProgressStats'
import { CharacterRepositoryImpl } from '../../../data/repositories/CharacterRepositoryImpl'
import { IProgressRepository } from '../../../domain/repositories/IProgressRepository'
import { CharacterProgress, ProgressMap } from '../../../domain/entities/Progress'
import { CharacterCategory } from '../../../domain/entities/Character'

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

describe('GetProgressStats', () => {
  const characterRepo = new CharacterRepositoryImpl()

  it('reports zero mastery when there is no progress at all', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetProgressStats(characterRepo, progressRepo)

    const stats = useCase.execute()

    expect(stats.overallMasteryPercent).toBe(0)
    expect(stats.totalReviewed).toBe(0)
    expect(stats.bestStreak).toBe(0)
    stats.byCategory.forEach((cat) => {
      expect(cat.mastered).toBe(0)
      expect(cat.masteryPercent).toBe(0)
      expect(cat.total).toBeGreaterThan(0)
    })
  })

  it('counts a character as mastered once it reaches the box threshold', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetProgressStats(characterRepo, progressRepo)
    const numbers = characterRepo.getByCategory(CharacterCategory.NUMBER)

    progressRepo.save({
      characterId: numbers[0].id,
      box: MASTERY_BOX_THRESHOLD,
      timesCorrect: 4,
      timesIncorrect: 0,
      lastSeenAt: 0,
      dueAt: 0,
      currentStreak: 4,
    })
    progressRepo.save({
      characterId: numbers[1].id,
      box: MASTERY_BOX_THRESHOLD - 1,
      timesCorrect: 3,
      timesIncorrect: 0,
      lastSeenAt: 0,
      dueAt: 0,
      currentStreak: 3,
    })

    const stats = useCase.execute()
    const numberStats = stats.byCategory.find((c) => c.category === CharacterCategory.NUMBER)

    expect(numberStats?.mastered).toBe(1)
    expect(numberStats?.total).toBe(numbers.length)
  })

  it('reports the best currentStreak across every progress record', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetProgressStats(characterRepo, progressRepo)

    progressRepo.save({ characterId: 'h-a', box: 2, timesCorrect: 2, timesIncorrect: 0, lastSeenAt: 0, dueAt: 0, currentStreak: 2 })
    progressRepo.save({ characterId: 'h-i', box: 3, timesCorrect: 5, timesIncorrect: 0, lastSeenAt: 0, dueAt: 0, currentStreak: 5 })
    progressRepo.save({ characterId: 'h-u', box: 1, timesCorrect: 0, timesIncorrect: 1, lastSeenAt: 0, dueAt: 0, currentStreak: 0 })

    const stats = useCase.execute()
    expect(stats.bestStreak).toBe(5)
    expect(stats.totalReviewed).toBe(3)
  })

  it('treats a legacy record without currentStreak as streak 0', () => {
    const progressRepo = new InMemoryProgressRepository()
    const useCase = new GetProgressStats(characterRepo, progressRepo)

    progressRepo.save({
      characterId: 'h-a',
      box: 2,
      timesCorrect: 2,
      timesIncorrect: 0,
      lastSeenAt: 0,
      dueAt: 0,
    } as CharacterProgress)

    const stats = useCase.execute()
    expect(stats.bestStreak).toBe(0)
  })
})
