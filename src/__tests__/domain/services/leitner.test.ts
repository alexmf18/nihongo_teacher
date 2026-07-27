import {
  nextBox,
  computeDueAt,
  createInitialProgress,
  applyAnswer,
  LEITNER_MIN_BOX,
  LEITNER_MAX_BOX,
  BOX_INTERVALS_MS,
} from '../../../domain/services/leitner'

describe('leitner', () => {
  describe('nextBox', () => {
    it('promotes on correct answer', () => {
      expect(nextBox(1, true)).toBe(2)
      expect(nextBox(3, true)).toBe(4)
    })

    it('clamps promotion at the max box', () => {
      expect(nextBox(LEITNER_MAX_BOX, true)).toBe(LEITNER_MAX_BOX)
    })

    it('demotes by one box on incorrect answer', () => {
      expect(nextBox(3, false)).toBe(2)
    })

    it('clamps demotion at the min box', () => {
      expect(nextBox(LEITNER_MIN_BOX, false)).toBe(LEITNER_MIN_BOX)
    })
  })

  describe('computeDueAt', () => {
    it('is immediately due for box 1', () => {
      const now = 1_000_000
      expect(computeDueAt(1, now)).toBe(now)
    })

    it('adds the interval for higher boxes', () => {
      const now = 1_000_000
      expect(computeDueAt(2, now)).toBe(now + BOX_INTERVALS_MS[2])
      expect(computeDueAt(5, now)).toBe(now + BOX_INTERVALS_MS[5])
    })
  })

  describe('createInitialProgress', () => {
    it('starts at box 1, due immediately, no history', () => {
      const now = 500
      const progress = createInitialProgress('h-a', now)
      expect(progress).toEqual({
        characterId: 'h-a',
        box: 1,
        timesCorrect: 0,
        timesIncorrect: 0,
        lastSeenAt: now,
        dueAt: now,
        currentStreak: 0,
      })
    })
  })

  describe('applyAnswer', () => {
    it('creates a fresh record on first correct answer', () => {
      const now = 1000
      const updated = applyAnswer(undefined, 'h-a', true, now)
      expect(updated.box).toBe(2)
      expect(updated.timesCorrect).toBe(1)
      expect(updated.timesIncorrect).toBe(0)
      expect(updated.dueAt).toBe(computeDueAt(2, now))
      expect(updated.currentStreak).toBe(1)
    })

    it('creates a fresh record on first incorrect answer, staying at box 1', () => {
      const now = 1000
      const updated = applyAnswer(undefined, 'h-a', false, now)
      expect(updated.box).toBe(1)
      expect(updated.timesCorrect).toBe(0)
      expect(updated.timesIncorrect).toBe(1)
      expect(updated.currentStreak).toBe(0)
    })

    it('accumulates counts and moves box across repeated answers', () => {
      const now = 1000
      let progress = applyAnswer(undefined, 'h-a', true, now)
      progress = applyAnswer(progress, 'h-a', true, now + 1)
      progress = applyAnswer(progress, 'h-a', false, now + 2)

      expect(progress.box).toBe(2)
      expect(progress.timesCorrect).toBe(2)
      expect(progress.timesIncorrect).toBe(1)
    })

    it('tracks a growing streak across correct answers and resets on a miss', () => {
      const now = 1000
      let progress = applyAnswer(undefined, 'h-a', true, now)
      expect(progress.currentStreak).toBe(1)
      progress = applyAnswer(progress, 'h-a', true, now + 1)
      expect(progress.currentStreak).toBe(2)
      progress = applyAnswer(progress, 'h-a', true, now + 2)
      expect(progress.currentStreak).toBe(3)
      progress = applyAnswer(progress, 'h-a', false, now + 3)
      expect(progress.currentStreak).toBe(0)
    })

    it('treats a record without currentStreak (pre-existing data) as starting at 0', () => {
      const now = 1000
      const legacyRecord = {
        characterId: 'h-a',
        box: 2,
        timesCorrect: 3,
        timesIncorrect: 1,
        lastSeenAt: now,
        dueAt: now,
      }
      const updated = applyAnswer(legacyRecord, 'h-a', true, now + 1)
      expect(updated.currentStreak).toBe(1)
    })
  })
})
