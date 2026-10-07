// Cards per practice session. Decks are due-ordered, so the session always
// covers the most urgent reviews first.
export const SESSION_SIZE = 20

// First-attempt result for one card; retries after "Intentar de nuevo" don't count.
export interface SessionAnswer {
  itemId: string
  isCorrect: boolean
}

export interface SessionSummary {
  total: number
  correct: number
  incorrect: number
  accuracyPercent: number
  failedIds: string[]
}
