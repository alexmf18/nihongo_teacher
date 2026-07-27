import { GrammarCategory, ParticleItem, ConjugationItem } from './GrammarItem'

export type GrammarCard =
  | { id: string; kind: GrammarCategory.PARTICLE; item: ParticleItem }
  | { id: string; kind: GrammarCategory.CONJUGATION; item: ConjugationItem; formName: string }
