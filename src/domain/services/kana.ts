import { CharacterCategory } from '../entities/Character'
import { KanaRow, KANA_ROW_MEMBERS } from '../entities/KanaRow'

// Katakana and hiragana blocks are 0x60 apart for every kana used here.
const KANA_OFFSET = 0x60

export function isKanaCategory(category: CharacterCategory): boolean {
  return category === CharacterCategory.HIRAGANA || category === CharacterCategory.KATAKANA
}

export function toHiragana(text: string): string {
  return text.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - KANA_OFFSET))
}

export function toKatakana(text: string): string {
  return text.replace(/[ぁ-ゖ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + KANA_OFFSET))
}

export function getKanaRow(kana: string): KanaRow | undefined {
  if (kana.length === 2) return KanaRow.YOUON
  const hiragana = toHiragana(kana)
  const entry = Object.entries(KANA_ROW_MEMBERS).find(([, members]) => members.includes(hiragana))
  return entry?.[0] as KanaRow | undefined
}

// Hepburn romaji per hiragana row, in the order of KANA_ROW_MEMBERS-style strings.
const ROMAJI_ROWS: [string, string[]][] = [
  ['あいうえお', ['a', 'i', 'u', 'e', 'o']],
  ['かきくけこ', ['ka', 'ki', 'ku', 'ke', 'ko']],
  ['さしすせそ', ['sa', 'shi', 'su', 'se', 'so']],
  ['たちつてと', ['ta', 'chi', 'tsu', 'te', 'to']],
  ['なにぬねの', ['na', 'ni', 'nu', 'ne', 'no']],
  ['はひふへほ', ['ha', 'hi', 'fu', 'he', 'ho']],
  ['まみむめも', ['ma', 'mi', 'mu', 'me', 'mo']],
  ['やゆよ', ['ya', 'yu', 'yo']],
  ['らりるれろ', ['ra', 'ri', 'ru', 're', 'ro']],
  ['わをん', ['wa', 'wo', 'n']],
  ['がぎぐげご', ['ga', 'gi', 'gu', 'ge', 'go']],
  ['ざじずぜぞ', ['za', 'ji', 'zu', 'ze', 'zo']],
  ['だぢづでど', ['da', 'ji', 'zu', 'de', 'do']],
  ['ばびぶべぼ', ['ba', 'bi', 'bu', 'be', 'bo']],
  ['ぱぴぷぺぽ', ['pa', 'pi', 'pu', 'pe', 'po']],
]

const KANA_ROMAJI: Record<string, string> = Object.fromEntries(
  ROMAJI_ROWS.flatMap(([kana, romaji]) => [...kana].map((k, i) => [k, romaji[i]]))
)

const SMALL_Y: Record<string, string> = { 'ゃ': 'a', 'ゅ': 'u', 'ょ': 'o' }

// きゃ → kya, しゃ → sha, ちゃ → cha, じゃ → ja.
function youonRomaji(base: string, small: string): string | undefined {
  const romaji = KANA_ROMAJI[base]
  if (!romaji?.endsWith('i')) return undefined
  const vowel = SMALL_Y[small]
  if (romaji === 'shi' || romaji === 'chi') return romaji.slice(0, 2) + vowel
  if (romaji === 'ji') return 'j' + vowel
  return romaji.slice(0, -1) + 'y' + vowel
}

// Converts kana to Hepburn romaji (っ doubles the next consonant). Returns
// undefined if the text contains anything other than kana, e.g. kanji.
export function kanaToRomaji(text: string): string | undefined {
  const hiragana = toHiragana(text)
  let result = ''
  let geminate = false

  for (let i = 0; i < hiragana.length; i++) {
    const ch = hiragana[i]
    if (ch === 'っ') {
      geminate = true
      continue
    }

    const next = hiragana[i + 1]
    let romaji: string | undefined
    if (next && SMALL_Y[next]) {
      romaji = youonRomaji(ch, next)
      if (romaji) i++
    }
    romaji ??= KANA_ROMAJI[ch]
    if (romaji === undefined) return undefined

    result += geminate ? romaji[0] + romaji : romaji
    geminate = false
  }

  return result
}

// Kana learners commonly mix up, written in hiragana (katakana-only lookalikes
// are listed in katakana and compared without conversion).
const LOOKALIKE_GROUPS: string[][] = [
  ['ぬ', 'め'],
  ['わ', 'れ', 'ね'],
  ['る', 'ろ'],
  ['さ', 'き', 'ち'],
  ['は', 'ほ', 'け'],
  ['い', 'り', 'こ'],
  ['た', 'に', 'こ'],
  ['あ', 'お', 'め'],
  ['う', 'ら', 'つ'],
  ['く', 'へ'],
  ['ま', 'も'],
  ['そ', 'て'],
  ['シ', 'ツ', 'ン', 'ソ'],
  ['ソ', 'ン', 'ノ'],
  ['ク', 'ケ', 'タ'],
  ['ナ', 'メ', 'ヌ'],
  ['ス', 'ヌ'],
  ['ウ', 'ワ', 'フ'],
  ['コ', 'ユ', 'ロ', 'ヨ'],
  ['チ', 'テ'],
  ['ア', 'マ'],
  ['セ', 'サ'],
  ['ハ', 'ル'],
]

// The kana with any (han)dakuten stripped: が → か, ぱ → は.
function baseKana(kana: string): string {
  return kana.normalize('NFD')[0]
}

function inSameLookalikeGroup(a: string, b: string): boolean {
  const pairs = [
    [a, b],
    [toHiragana(a), toHiragana(b)],
  ]
  return pairs.some(([x, y]) => LOOKALIKE_GROUPS.some((group) => group.includes(x) && group.includes(y)))
}

// True when `b` is a plausible mix-up for `a`: a visual lookalike, the same kana
// with or without dakuten, or a combined kana sharing the same leading kana.
export function isConfusableKana(a: string, b: string): boolean {
  if (a === b || a.length !== b.length) return false
  if (a.length === 2) return baseKana(a[0]) === baseKana(b[0])
  return baseKana(a) === baseKana(b) || inSameLookalikeGroup(a, b)
}
