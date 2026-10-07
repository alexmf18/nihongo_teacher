export enum CharacterCategory {
  HIRAGANA = 'hiragana',
  KATAKANA = 'katakana',
  KANJI = 'kanji',
  WORD = 'word',
  PHRASE = 'phrase',
  NUMBER = 'number',
  HIRAGANA_TABLE = 'hiragana_table',
  KATAKANA_TABLE = 'katakana_table',
  KANJI_TABLE = 'kanji_table',
  NUMBER_TABLE = 'number_table',
  WORD_TABLE = 'word_table',
  PHRASE_TABLE = 'phrase_table',
}

export enum PhraseCategory {
  GREETINGS = 'greetings',
  INTRODUCTIONS = 'introductions',
  DIRECTIONS = 'directions',
  DINING = 'dining',
  COURTESY = 'courtesy',
}

export const PHRASE_CATEGORY_LABELS: Record<PhraseCategory, string> = {
  [PhraseCategory.GREETINGS]: 'Saludos',
  [PhraseCategory.INTRODUCTIONS]: 'Presentaciones',
  [PhraseCategory.DIRECTIONS]: 'Indicaciones',
  [PhraseCategory.DINING]: 'En la mesa',
  [PhraseCategory.COURTESY]: 'Cortesía',
}

export enum KanjiGroup {
  NUMBERS = 'numbers',
  NATURE = 'nature',
  DIRECTIONS = 'directions',
  PEOPLE_PLACES = 'people_places',
  DAILY_LIFE = 'daily_life',
}

export const KANJI_GROUP_LABELS: Record<KanjiGroup, { title: string; subtitle: string }> = {
  [KanjiGroup.NUMBERS]: { title: 'Números', subtitle: '数字' },
  [KanjiGroup.NATURE]: { title: 'Naturaleza', subtitle: '自然' },
  [KanjiGroup.DIRECTIONS]: { title: 'Direcciones y Posición', subtitle: '方角' },
  [KanjiGroup.PEOPLE_PLACES]: { title: 'Personas y Lugares', subtitle: '人と場所' },
  [KanjiGroup.DAILY_LIFE]: { title: 'Vida Cotidiana', subtitle: '日常生活' },
}

// Display strings for the kanji table, e.g. 'いち (ichi)'. The accepted quiz
// answers live in Character.romaji; these are only shown to the learner.
export interface KanjiReadings {
  onyomi: string
  kunyomi?: string
}

export interface ExampleSentence {
  japanese: string
  translation: string
}

export interface Character {
  id: string
  character: string
  romaji: string[]
  category: CharacterCategory
  meaning?: string
  phraseCategory?: PhraseCategory
  exampleSentence?: ExampleSentence
  kanjiGroup?: KanjiGroup
  readings?: KanjiReadings
}
