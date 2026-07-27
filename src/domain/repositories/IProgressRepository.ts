import { CharacterProgress, ProgressMap } from '../entities/Progress'

export interface IProgressRepository {
  getAll(): ProgressMap
  getByCharacterId(characterId: string): CharacterProgress | undefined
  save(progress: CharacterProgress): void
  clear(): void
}
