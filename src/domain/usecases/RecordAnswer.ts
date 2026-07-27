import { CharacterProgress } from '../entities/Progress'
import { IProgressRepository } from '../repositories/IProgressRepository'
import { applyAnswer } from '../services/leitner'

export class RecordAnswer {
  constructor(private progressRepo: IProgressRepository) {}

  execute(characterId: string, isCorrect: boolean, now: number = Date.now()): CharacterProgress {
    const prev = this.progressRepo.getByCharacterId(characterId)
    const updated = applyAnswer(prev, characterId, isCorrect, now)
    this.progressRepo.save(updated)
    return updated
  }
}
