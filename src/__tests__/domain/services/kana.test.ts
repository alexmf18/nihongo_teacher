import { CharacterRepositoryImpl } from '../../../data/repositories/CharacterRepositoryImpl'
import { CharacterCategory } from '../../../domain/entities/Character'
import { KanaRow } from '../../../domain/entities/KanaRow'
import { getKanaRow, isConfusableKana, kanaToRomaji, toHiragana, toKatakana } from '../../../domain/services/kana'

describe('kana conversion', () => {
  it('converts between hiragana and katakana', () => {
    expect(toHiragana('シャツ')).toBe('しゃつ')
    expect(toKatakana('きょう')).toBe('キョウ')
  })
})

describe('kanaToRomaji', () => {
  it.each([
    ['たべます', 'tabemasu'],
    ['いった', 'itta'],
    ['きょう', 'kyou'],
    ['しゃしん', 'shashin'],
    ['ちょっと', 'chotto'],
    ['じゃない', 'janai'],
    ['こなかった', 'konakatta'],
    ['カタカナ', 'katakana'],
  ])('converts %s to %s', (kana, romaji) => {
    expect(kanaToRomaji(kana)).toBe(romaji)
  })

  it('returns undefined when the text is not all kana', () => {
    expect(kanaToRomaji('食べます')).toBeUndefined()
    expect(kanaToRomaji('tabemasu')).toBeUndefined()
  })
})

describe('getKanaRow', () => {
  it.each([
    ['あ', KanaRow.A],
    ['し', KanaRow.SA],
    ['ん', KanaRow.WA],
    ['ぢ', KanaRow.DA],
    ['ポ', KanaRow.PA],
    ['ヌ', KanaRow.NA],
    ['きゃ', KanaRow.YOUON],
    ['ジョ', KanaRow.YOUON],
  ])('puts %s in row %s', (kana, row) => {
    expect(getKanaRow(kana)).toBe(row)
  })

  it('assigns a row to every hiragana and katakana in the data', () => {
    const repository = new CharacterRepositoryImpl()
    const kana = [
      ...repository.getByCategory(CharacterCategory.HIRAGANA),
      ...repository.getByCategory(CharacterCategory.KATAKANA),
    ]
    kana.forEach((k) => expect(getKanaRow(k.character)).toBeDefined())
  })
})

describe('isConfusableKana', () => {
  it.each([
    ['ぬ', 'め'],
    ['シ', 'ツ'],
    ['ソ', 'ン'],
    ['は', 'ば'],
    ['ば', 'ぱ'],
    ['きゃ', 'きょ'],
    ['きゃ', 'ぎゅ'],
  ])('treats %s and %s as confusable', (a, b) => {
    expect(isConfusableKana(a, b)).toBe(true)
  })

  it.each([
    ['あ', 'あ'],
    ['か', 'ま'],
    ['き', 'きゃ'],
    ['しゃ', 'ちゃ'],
  ])('does not treat %s and %s as confusable', (a, b) => {
    expect(isConfusableKana(a, b)).toBe(false)
  })
})
