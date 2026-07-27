import { RecordAnswer } from '../../../domain/usecases/RecordAnswer'
import { IProgressRepository } from '../../../domain/repositories/IProgressRepository'
import { CharacterProgress, ProgressMap } from '../../../domain/entities/Progress'

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

describe('RecordAnswer', () => {
  it('creates and saves a fresh progress record on first answer', () => {
    const repo = new InMemoryProgressRepository()
    const useCase = new RecordAnswer(repo)

    const result = useCase.execute('h-a', true, 1000)

    expect(result.characterId).toBe('h-a')
    expect(result.box).toBe(2)
    expect(repo.getByCharacterId('h-a')).toEqual(result)
  })

  it('builds on the previously stored record', () => {
    const repo = new InMemoryProgressRepository()
    const useCase = new RecordAnswer(repo)

    useCase.execute('h-a', true, 1000)
    const second = useCase.execute('h-a', true, 2000)

    expect(second.box).toBe(3)
    expect(second.timesCorrect).toBe(2)
  })

  it('demotes the box on an incorrect answer', () => {
    const repo = new InMemoryProgressRepository()
    const useCase = new RecordAnswer(repo)

    useCase.execute('h-a', true, 1000)
    useCase.execute('h-a', true, 2000)
    const third = useCase.execute('h-a', false, 3000)

    expect(third.box).toBe(2)
    expect(third.timesIncorrect).toBe(1)
  })
})
