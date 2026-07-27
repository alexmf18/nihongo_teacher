export interface CharacterProgress {
  characterId: string
  box: number
  timesCorrect: number
  timesIncorrect: number
  lastSeenAt: number
  dueAt: number
  // Consecutive correct answers ending at lastSeenAt; resets to 0 on an incorrect
  // answer. Optional so records persisted before this field existed still parse.
  currentStreak?: number
}

export type ProgressMap = Record<string, CharacterProgress>
