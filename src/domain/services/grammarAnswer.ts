import { GrammarCategory } from '../entities/GrammarItem'
import { GrammarCard } from '../entities/GrammarCard'

// The canonical answer shown for a card: the particle, the inflected form, or
// the counter reading in kana.
export function correctAnswerFor(card: GrammarCard): string {
  if (card.kind === GrammarCategory.PARTICLE) return card.item.particle
  if (card.kind === GrammarCategory.SENTENCE) return card.item.chunks.join('')
  if (card.kind === GrammarCategory.COUNTER) {
    return card.item.examples.find((e) => e.number === card.number)?.reading ?? ''
  }
  return card.item.forms.find((f) => f.formName === card.formName)?.value ?? ''
}
