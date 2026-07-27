import { useState, useCallback } from 'react'
import { GetProgressStats, ProgressStats } from '../../domain/usecases/GetProgressStats'
import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository'
import { IProgressRepository } from '../../domain/repositories/IProgressRepository'
import { CharacterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl'
import { LocalStorageProgressRepository } from '../../data/repositories/LocalStorageProgressRepository'

const characterRepository: ICharacterRepository = new CharacterRepositoryImpl()
const progressRepository: IProgressRepository = new LocalStorageProgressRepository()
const getProgressStats = new GetProgressStats(characterRepository, progressRepository)

export function useProgressStats() {
  const [stats, setStats] = useState<ProgressStats>(() => getProgressStats.execute())

  const refresh = useCallback(() => {
    setStats(getProgressStats.execute())
  }, [])

  return { stats, refresh }
}
