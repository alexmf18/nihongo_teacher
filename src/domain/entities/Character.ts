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
}
