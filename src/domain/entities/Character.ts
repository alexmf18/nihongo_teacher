export enum CharacterCategory {
  HIRAGANA = 'hiragana',
  KATAKANA = 'katakana',
  KANJI = 'kanji',
  WORD = 'word',
  PHRASE = 'phrase',
  NUMBER = 'number',
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

export interface Character {
  id: string
  character: string
  romaji: string[]
  category: CharacterCategory
  meaning?: string
  phraseCategory?: PhraseCategory
}
