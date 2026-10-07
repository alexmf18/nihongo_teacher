export enum KanaRow {
  A = 'a',
  KA = 'ka',
  SA = 'sa',
  TA = 'ta',
  NA = 'na',
  HA = 'ha',
  MA = 'ma',
  YA = 'ya',
  RA = 'ra',
  WA = 'wa',
  GA = 'ga',
  ZA = 'za',
  DA = 'da',
  BA = 'ba',
  PA = 'pa',
  YOUON = 'youon',
}

// Single-kana members of each row, written in hiragana. Katakana are mapped to
// hiragana before lookup. YOUON (きゃ, しゅ…) is detected by length instead.
export const KANA_ROW_MEMBERS: Record<Exclude<KanaRow, KanaRow.YOUON>, string> = {
  [KanaRow.A]: 'あいうえお',
  [KanaRow.KA]: 'かきくけこ',
  [KanaRow.SA]: 'さしすせそ',
  [KanaRow.TA]: 'たちつてと',
  [KanaRow.NA]: 'なにぬねの',
  [KanaRow.HA]: 'はひふへほ',
  [KanaRow.MA]: 'まみむめも',
  [KanaRow.YA]: 'やゆよ',
  [KanaRow.RA]: 'らりるれろ',
  [KanaRow.WA]: 'わをん',
  [KanaRow.GA]: 'がぎぐげご',
  [KanaRow.ZA]: 'ざじずぜぞ',
  [KanaRow.DA]: 'だぢづでど',
  [KanaRow.BA]: 'ばびぶべぼ',
  [KanaRow.PA]: 'ぱぴぷぺぽ',
}

// Hiragana label shown on each row toggle.
export const KANA_ROW_LABELS: Record<KanaRow, string> = {
  [KanaRow.A]: 'あ',
  [KanaRow.KA]: 'か',
  [KanaRow.SA]: 'さ',
  [KanaRow.TA]: 'た',
  [KanaRow.NA]: 'な',
  [KanaRow.HA]: 'は',
  [KanaRow.MA]: 'ま',
  [KanaRow.YA]: 'や',
  [KanaRow.RA]: 'ら',
  [KanaRow.WA]: 'わ',
  [KanaRow.GA]: 'が',
  [KanaRow.ZA]: 'ざ',
  [KanaRow.DA]: 'だ',
  [KanaRow.BA]: 'ば',
  [KanaRow.PA]: 'ぱ',
  [KanaRow.YOUON]: 'きゃ',
}

export const KANA_ROW_GROUPS: { label: string; rows: KanaRow[] }[] = [
  {
    label: 'Básicas',
    rows: [KanaRow.A, KanaRow.KA, KanaRow.SA, KanaRow.TA, KanaRow.NA, KanaRow.HA, KanaRow.MA, KanaRow.YA, KanaRow.RA, KanaRow.WA],
  },
  { label: 'Con tenten', rows: [KanaRow.GA, KanaRow.ZA, KanaRow.DA, KanaRow.BA, KanaRow.PA] },
  { label: 'Combinadas', rows: [KanaRow.YOUON] },
]
