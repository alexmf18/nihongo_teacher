export enum GrammarCategory {
  PARTICLE = 'particle',
  CONJUGATION = 'conjugation',
  COUNTER = 'counter',
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
}

export interface ConjugationItem {
  id: string
  kind: GrammarCategory.CONJUGATION
  dictionaryForm: string
  meaning: string
  forms: ConjugationForm[]
}

export interface CounterExample {
  number: number
  reading: string
  romaji: string
}

export interface CounterItem {
  id: string
  kind: GrammarCategory.COUNTER
  counter: string
  usage: string
  examples: CounterExample[]
}

export type GrammarItem = ParticleItem | ConjugationItem | CounterItem
