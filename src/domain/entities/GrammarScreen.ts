import { GrammarCategory } from './GrammarItem'

export enum GrammarScreen {
  PARTICLE_TABLE = 'particle_table',
  PARTICLE_QUIZ = 'particle_quiz',
  CONJUGATION_TABLE = 'conjugation_table',
  CONJUGATION_QUIZ = 'conjugation_quiz',
  ADJECTIVE_TABLE = 'adjective_table',
  ADJECTIVE_QUIZ = 'adjective_quiz',
  COUNTER_TABLE = 'counter_table',
  COUNTER_QUIZ = 'counter_quiz',
  SENTENCE_QUIZ = 'sentence_quiz',
}

export const GRAMMAR_SCREEN_LABELS: Record<GrammarScreen, string> = {
  [GrammarScreen.PARTICLE_TABLE]: 'Tabla de Partículas',
  [GrammarScreen.PARTICLE_QUIZ]: 'Practicar Partículas',
  [GrammarScreen.CONJUGATION_TABLE]: 'Tabla de Conjugación',
  [GrammarScreen.CONJUGATION_QUIZ]: 'Practicar Conjugación',
  [GrammarScreen.ADJECTIVE_TABLE]: 'Tabla de Adjetivos',
  [GrammarScreen.ADJECTIVE_QUIZ]: 'Practicar Adjetivos',
  [GrammarScreen.COUNTER_TABLE]: 'Tabla de Contadores',
  [GrammarScreen.COUNTER_QUIZ]: 'Practicar Contadores',
  [GrammarScreen.SENTENCE_QUIZ]: 'Ordenar frases',
}

// Which grammar deck each practice screen drills.
export const GRAMMAR_QUIZ_KINDS: Partial<Record<GrammarScreen, GrammarCategory>> = {
  [GrammarScreen.PARTICLE_QUIZ]: GrammarCategory.PARTICLE,
  [GrammarScreen.CONJUGATION_QUIZ]: GrammarCategory.CONJUGATION,
  [GrammarScreen.ADJECTIVE_QUIZ]: GrammarCategory.ADJECTIVE,
  [GrammarScreen.COUNTER_QUIZ]: GrammarCategory.COUNTER,
  [GrammarScreen.SENTENCE_QUIZ]: GrammarCategory.SENTENCE,
}
