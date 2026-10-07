import { GrammarCategory, ParticleItem, ConjugationItem, AdjectiveItem, CounterItem, SentenceItem } from './GrammarItem'

export type GrammarCard =
  | { id: string; kind: GrammarCategory.PARTICLE; item: ParticleItem }
  | { id: string; kind: GrammarCategory.CONJUGATION; item: ConjugationItem; formName: string }
  | { id: string; kind: GrammarCategory.ADJECTIVE; item: AdjectiveItem; formName: string }
  | { id: string; kind: GrammarCategory.COUNTER; item: CounterItem; number: number }
  | { id: string; kind: GrammarCategory.SENTENCE; item: SentenceItem }

// Cards that ask for one form of a verb or adjective.
export type InflectionCard = Extract<GrammarCard, { formName: string }>

export function isInflectionCard(card: GrammarCard): card is InflectionCard {
  return card.kind === GrammarCategory.CONJUGATION || card.kind === GrammarCategory.ADJECTIVE
}
