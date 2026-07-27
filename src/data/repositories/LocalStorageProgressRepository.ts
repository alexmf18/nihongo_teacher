import { CharacterProgress, ProgressMap } from '../../domain/entities/Progress'
import { IProgressRepository } from '../../domain/repositories/IProgressRepository'

const STORAGE_KEY = 'nihongo-teacher:progress:v1'

export class LocalStorageProgressRepository implements IProgressRepository {
  // Only populated once localStorage.setItem has failed at least once (quota
  // exceeded, disabled storage, private mode...). Until then every read goes
  // straight to localStorage so external state changes (e.g. localStorage.clear())
  // are always reflected immediately.
  private memoryFallback: ProgressMap | null = null

  getAll(): ProgressMap {
    return this.read()
  }

  getByCharacterId(characterId: string): CharacterProgress | undefined {
    return this.read()[characterId]
  }

  save(progress: CharacterProgress): void {
    const map = this.read()
    map[progress.characterId] = progress
    this.write(map)
  }

  clear(): void {
    this.write({})
  }

  private read(): ProgressMap {
    if (this.memoryFallback) return this.memoryFallback

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : {}
      return parsed && typeof parsed === 'object' ? parsed : {}
    } catch {
      return {}
    }
  }

  private write(map: ProgressMap): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
    } catch {
      // localStorage unavailable/full: keep serving from memory for the rest of the session.
      this.memoryFallback = map
    }
  }
}
