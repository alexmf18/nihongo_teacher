import { CharacterProgress } from '../entities/Progress'

export const LEITNER_MIN_BOX = 1
export const LEITNER_MAX_BOX = 5

export const BOX_INTERVALS_MS: Record<number, number> = {
  1: 0,
  2: 1 * 24 * 60 * 60 * 1000,
  3: 3 * 24 * 60 * 60 * 1000,
  4: 7 * 24 * 60 * 60 * 1000,
  5: 14 * 24 * 60 * 60 * 1000,
}

export function nextBox(currentBox: number, isCorrect: boolean): number {
  if (isCorrect) {
    return Math.min(currentBox + 1, LEITNER_MAX_BOX)
  }
  return Math.max(currentBox - 1, LEITNER_MIN_BOX)
}

export function computeDueAt(box: number, now: number): number {
  return now + (BOX_INTERVALS_MS[box] ?? 0)
}

export function createInitialProgress(characterId: string, now: number): CharacterProgress {
  return {
    characterId,
    box: LEITNER_MIN_BOX,
    timesCorrect: 0,
    timesIncorrect: 0,
    lastSeenAt: now,
    dueAt: now,
    currentStreak: 0,
  }
}

export function applyAnswer(
  prev: CharacterProgress | undefined,
  characterId: string,
  isCorrect: boolean,
  now: number
): CharacterProgress {
  const base = prev ?? createInitialProgress(characterId, now)
  const box = nextBox(base.box, isCorrect)

  return {
    characterId,
    box,
    timesCorrect: base.timesCorrect + (isCorrect ? 1 : 0),
    timesIncorrect: base.timesIncorrect + (isCorrect ? 0 : 1),
    lastSeenAt: now,
    dueAt: computeDueAt(box, now),
    currentStreak: isCorrect ? (base.currentStreak ?? 0) + 1 : 0,
  }
}
