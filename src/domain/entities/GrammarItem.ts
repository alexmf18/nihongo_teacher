export enum GrammarCategory {
  PARTICLE = 'particle',
  CONJUGATION = 'conjugation',
  ADJECTIVE = 'adjective',
  COUNTER = 'counter',
  SENTENCE = 'sentence',
}

export interface ParticleItem {
  id: string
  kind: GrammarCategory.PARTICLE
  particle: string
  sentenceParts: [string, string]
  translation: string
  acceptableParticles?: string[]
}

export interface ConjugationForm {
  formName: string
  value: string
  romaji?: string
  // Other accepted answers, e.g. 静かではない next to 静かじゃない.
  alternatives?: string[]
}

export enum VerbGroup {
  GODAN = 'godan',
  ICHIDAN = 'ichidan',
  IRREGULAR = 'irregular',
}

export const VERB_GROUP_LABELS: Record<VerbGroup, string> = {
  [VerbGroup.GODAN]: 'Grupo 1 (う)',
  [VerbGroup.ICHIDAN]: 'Grupo 2 (る)',
  [VerbGroup.IRREGULAR]: 'Irregular',
}

export enum AdjectiveType {
  I = 'i',
  NA = 'na',
}

export const ADJECTIVE_TYPE_LABELS: Record<AdjectiveType, string> = {
  [AdjectiveType.I]: 'Adjetivo い',
  [AdjectiveType.NA]: 'Adjetivo な',
}

export interface ConjugationItem {
  id: string
  kind: GrammarCategory.CONJUGATION
  dictionaryForm: string
  meaning: string
  verbGroup: VerbGroup
  forms: ConjugationForm[]
}

export interface AdjectiveItem {
  id: string
  kind: GrammarCategory.ADJECTIVE
  dictionaryForm: string
  meaning: string
  adjectiveType: AdjectiveType
  forms: ConjugationForm[]
}

// Anything practiced as "give me this form of the word".
export type InflectableItem = ConjugationItem | AdjectiveItem

export function wordClassLabel(item: InflectableItem): string {
  return item.kind === GrammarCategory.CONJUGATION
    ? VERB_GROUP_LABELS[item.verbGroup]
    : ADJECTIVE_TYPE_LABELS[item.adjectiveType]
}

export interface CounterExample {
  number: number
  reading: string
  romaji: string
  // Other accepted answers (kana or romaji), e.g. ななにん for 7人.
  alternatives?: string[]
}

export interface CounterItem {
  id: string
  kind: GrammarCategory.COUNTER
  counter: string
  usage: string
  // Readings of the counter itself; the first is the plain one and the rest are
  // its sound changes (ほん/ぼん/ぽん). Used to build plausible wrong choices.
  suffixReadings: string[]
  examples: CounterExample[]
}

// A sentence split into the tiles the learner puts back in order. Particles are
// their own chunks; the final punctuation stays attached to the last chunk.
export interface SentenceItem {
  id: string
  kind: GrammarCategory.SENTENCE
  chunks: string[]
  translation: string
  // Other correct orderings of the same chunks.
  alternativeOrders?: string[][]
}

export type GrammarItem = ParticleItem | ConjugationItem | AdjectiveItem | CounterItem | SentenceItem
