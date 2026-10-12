export enum CharacterCategory {
  HIRAGANA = 'hiragana',
  KATAKANA = 'katakana',
  KANJI = 'kanji',
  WORD = 'word',
  PHRASE = 'phrase',
  NUMBER = 'number',
  CALENDAR = 'calendar',
  HIRAGANA_TABLE = 'hiragana_table',
  KATAKANA_TABLE = 'katakana_table',
  KANJI_TABLE = 'kanji_table',
  NUMBER_TABLE = 'number_table',
  WORD_TABLE = 'word_table',
  PHRASE_TABLE = 'phrase_table',
  CALENDAR_TABLE = 'calendar_table',
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

// The main readings, in kana, shown in the kanji table. A dot in a kun'yomi marks
// where the okurigana starts (あ.う is written 会う). The accepted quiz answers
// live in Character.romaji, which also covers rarer readings.
export interface KanjiReadings {
  onyomi: string[]
  kunyomi: string[]
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
  readings?: KanjiReadings
  // Kanji only: position by frequency of use, 1 = most used.
  frequencyRank?: number
}
