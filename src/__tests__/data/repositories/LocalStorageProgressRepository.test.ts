import { LocalStorageProgressRepository } from '../../../data/repositories/LocalStorageProgressRepository'
import { CharacterProgress } from '../../../domain/entities/Progress'

function makeProgress(overrides: Partial<CharacterProgress> = {}): CharacterProgress {
  return {
    characterId: 'h-a',
    box: 1,
    timesCorrect: 0,
    timesIncorrect: 0,
    lastSeenAt: 1000,
    dueAt: 1000,
    ...overrides,
  }
}

describe('LocalStorageProgressRepository', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns an empty map when nothing is stored', () => {
    const repo = new LocalStorageProgressRepository()
    expect(repo.getAll()).toEqual({})
    expect(repo.getByCharacterId('h-a')).toBeUndefined()
  })

  it('saves and retrieves a progress record', () => {
    const repo = new LocalStorageProgressRepository()
    const progress = makeProgress()

    repo.save(progress)

    expect(repo.getByCharacterId('h-a')).toEqual(progress)
    expect(repo.getAll()).toEqual({ 'h-a': progress })
  })

  it('persists across separate repository instances (real localStorage)', () => {
    const first = new LocalStorageProgressRepository()
    first.save(makeProgress({ characterId: 'w-arigatou', box: 3 }))

    const second = new LocalStorageProgressRepository()
    expect(second.getByCharacterId('w-arigatou')?.box).toBe(3)
  })

  it('clear() empties the store', () => {
    const repo = new LocalStorageProgressRepository()
    repo.save(makeProgress())
    repo.clear()

    expect(repo.getAll()).toEqual({})
  })

  it('falls back to an empty map when stored JSON is corrupted', () => {
    localStorage.setItem('nihongo-teacher:progress:v1', '{not valid json')

    const repo = new LocalStorageProgressRepository()
    expect(repo.getAll()).toEqual({})
  })

  it('keeps serving from an in-memory cache when localStorage.setItem throws', () => {
    const repo = new LocalStorageProgressRepository()
    const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError')
    })

    const progress = makeProgress({ characterId: 'n-1' })
    expect(() => repo.save(progress)).not.toThrow()
    expect(repo.getByCharacterId('n-1')).toEqual(progress)

    spy.mockRestore()
  })
})
