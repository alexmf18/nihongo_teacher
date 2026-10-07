import { SessionAnswer, SessionSummary } from '../entities/Session'

export function summarizeSession(answers: SessionAnswer[]): SessionSummary {
  const failedIds = answers.filter((a) => !a.isCorrect).map((a) => a.itemId)
  const total = answers.length
  const correct = total - failedIds.length

  return {
    total,
    correct,
    incorrect: failedIds.length,
    accuracyPercent: total > 0 ? Math.round((correct / total) * 100) : 0,
    failedIds,
  }
}
