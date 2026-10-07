import { CharacterCategory } from '../../../domain/entities/Character'
import { GrammarCategory } from '../../../domain/entities/GrammarItem'
import {
  PracticeMode,
  getAvailableModes,
  getGrammarModes,
  resolveGrammarMode,
  resolveModeForCategory,
} from '../../../domain/entities/PracticeMode'

describe('getAvailableModes', () => {
  it.each([CharacterCategory.HIRAGANA, CharacterCategory.KATAKANA])('excludes reverse mode for %s', (category) => {
    const modes = getAvailableModes(category)
    expect(modes).not.toContain(PracticeMode.REVERSE)
    expect(modes).toContain(PracticeMode.LISTENING)
  })

  it('excludes listening mode for kanji but keeps reverse', () => {
    const modes = getAvailableModes(CharacterCategory.KANJI)
    expect(modes).not.toContain(PracticeMode.LISTENING)
    expect(modes).toContain(PracticeMode.REVERSE)
  })

  it.each([CharacterCategory.WORD, CharacterCategory.PHRASE, CharacterCategory.NUMBER])(
    'offers every mode for %s',
    (category) => {
      expect(getAvailableModes(category)).toEqual(Object.values(PracticeMode))
    }
  )
})

describe('grammar modes', () => {
  it('rebuilds sentences from the translation or from audio only', () => {
    expect(getGrammarModes(GrammarCategory.SENTENCE)).toEqual([PracticeMode.REVERSE, PracticeMode.LISTENING])
  })

  it('types or picks every other grammar kind', () => {
    expect(getGrammarModes(GrammarCategory.PARTICLE)).toEqual([PracticeMode.ROMAJI_INPUT, PracticeMode.MULTIPLE_CHOICE])
  })

  it('falls back to the first mode the kind supports', () => {
    expect(resolveGrammarMode(PracticeMode.MULTIPLE_CHOICE, GrammarCategory.SENTENCE)).toBe(PracticeMode.REVERSE)
    expect(resolveGrammarMode(PracticeMode.LISTENING, GrammarCategory.COUNTER)).toBe(PracticeMode.ROMAJI_INPUT)
    expect(resolveGrammarMode(PracticeMode.MULTIPLE_CHOICE, GrammarCategory.COUNTER)).toBe(PracticeMode.MULTIPLE_CHOICE)
  })
})

describe('resolveModeForCategory', () => {
  it('keeps the mode when the category supports it', () => {
    expect(resolveModeForCategory(PracticeMode.MULTIPLE_CHOICE, CharacterCategory.KANJI)).toBe(
      PracticeMode.MULTIPLE_CHOICE
    )
  })

  it('falls back to the first available mode when unsupported', () => {
    expect(resolveModeForCategory(PracticeMode.REVERSE, CharacterCategory.HIRAGANA)).toBe(PracticeMode.ROMAJI_INPUT)
  })
})
