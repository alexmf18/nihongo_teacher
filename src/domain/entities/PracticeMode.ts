import { CharacterCategory } from './Character'
import { GrammarCategory } from './GrammarItem'

export enum PracticeMode {
  ROMAJI_INPUT = 'romaji_input',
  MULTIPLE_CHOICE = 'multiple_choice',
  REVERSE = 'reverse',
  LISTENING = 'listening',
}

export const PRACTICE_MODE_LABELS: Record<PracticeMode, string> = {
  [PracticeMode.ROMAJI_INPUT]: 'Escribir romaji',
  [PracticeMode.MULTIPLE_CHOICE]: 'Opción múltiple',
  [PracticeMode.REVERSE]: 'Español → Japonés',
  [PracticeMode.LISTENING]: 'Solo audio',
}

const ALL_MODES = Object.values(PracticeMode)

// Kana have no meaning to prompt from, so REVERSE is out. A lone kanji spoken by
// TTS picks one arbitrary reading, so LISTENING is out for kanji.
const MODES_BY_CATEGORY: Partial<Record<CharacterCategory, PracticeMode[]>> = {
  [CharacterCategory.HIRAGANA]: [PracticeMode.ROMAJI_INPUT, PracticeMode.MULTIPLE_CHOICE, PracticeMode.LISTENING],
  [CharacterCategory.KATAKANA]: [PracticeMode.ROMAJI_INPUT, PracticeMode.MULTIPLE_CHOICE, PracticeMode.LISTENING],
  [CharacterCategory.KANJI]: [PracticeMode.ROMAJI_INPUT, PracticeMode.MULTIPLE_CHOICE, PracticeMode.REVERSE],
}

export function getAvailableModes(category: CharacterCategory): PracticeMode[] {
  return MODES_BY_CATEGORY[category] ?? ALL_MODES
}

function pickAvailable(mode: PracticeMode, available: PracticeMode[]): PracticeMode {
  return available.includes(mode) ? mode : available[0]
}

export function resolveModeForCategory(mode: PracticeMode, category: CharacterCategory): PracticeMode {
  return pickAvailable(mode, getAvailableModes(category))
}

// Grammar cards are typed or picked. Sentences are always rebuilt from tiles,
// prompted either by the translation (REVERSE) or by audio alone (dictation).
const GRAMMAR_MODES = [PracticeMode.ROMAJI_INPUT, PracticeMode.MULTIPLE_CHOICE]
const SENTENCE_MODES = [PracticeMode.REVERSE, PracticeMode.LISTENING]

export function getGrammarModes(kind: GrammarCategory): PracticeMode[] {
  return kind === GrammarCategory.SENTENCE ? SENTENCE_MODES : GRAMMAR_MODES
}

export function resolveGrammarMode(mode: PracticeMode, kind: GrammarCategory): PracticeMode {
  return pickAvailable(mode, getGrammarModes(kind))
}
