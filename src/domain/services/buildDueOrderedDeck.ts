import { ProgressMap } from '../entities/Progress'
import { shuffleArray } from './shuffleArray'

export function buildDueOrderedDeck<T extends { id: string }>(pool: T[], progress: ProgressMap, now: number): T[] {
  const due: T[] = []
  const notDue: T[] = []

  for (const entry of pool) {
    const record = progress[entry.id]
    if (!record || record.dueAt <= now) {
      due.push(entry)
    } else {
      notDue.push(entry)
    }
  }

  // Shuffle first, then a stable sort by dueAt keeps same-dueAt entries (e.g. all
  // never-seen, or the same box tier) in random relative order instead of
  // reproducing an identical sequence every session.
  const sortedDue = shuffleArray(due).sort((a, b) => {
    const dueAtA = progress[a.id]?.dueAt ?? -Infinity
    const dueAtB = progress[b.id]?.dueAt ?? -Infinity
    return dueAtA - dueAtB
  })

  return [...sortedDue, ...shuffleArray(notDue)]
}
