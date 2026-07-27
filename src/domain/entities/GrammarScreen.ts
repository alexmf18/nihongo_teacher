export enum GrammarScreen {
  PARTICLE_TABLE = 'particle_table',
  PARTICLE_QUIZ = 'particle_quiz',
  CONJUGATION_TABLE = 'conjugation_table',
  CONJUGATION_QUIZ = 'conjugation_quiz',
  COUNTER_TABLE = 'counter_table',
}

export const GRAMMAR_SCREEN_LABELS: Record<GrammarScreen, string> = {
  [GrammarScreen.PARTICLE_TABLE]: 'Tabla de Partículas',
  [GrammarScreen.PARTICLE_QUIZ]: 'Practicar Partículas',
  [GrammarScreen.CONJUGATION_TABLE]: 'Tabla de Conjugación',
  [GrammarScreen.CONJUGATION_QUIZ]: 'Practicar Conjugación',
  [GrammarScreen.COUNTER_TABLE]: 'Tabla de Contadores',
}
