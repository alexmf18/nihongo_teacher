// こそあど: demonstratives come in four series, chosen by where the thing is,
// and in several kinds, chosen by what the word does in the sentence.

export enum KosoadoSeries {
  KO = 'ko',
  SO = 'so',
  A = 'a',
  DO = 'do',
}

export const KOSOADO_SERIES_LABELS: Record<KosoadoSeries, { kana: string; label: string }> = {
  [KosoadoSeries.KO]: { kana: 'こ', label: 'Cerca de quien habla' },
  [KosoadoSeries.SO]: { kana: 'そ', label: 'Cerca de quien escucha' },
  [KosoadoSeries.A]: { kana: 'あ', label: 'Lejos de los dos' },
  [KosoadoSeries.DO]: { kana: 'ど', label: 'Pregunta' },
}

export const KOSOADO_SERIES_ORDER = [KosoadoSeries.KO, KosoadoSeries.SO, KosoadoSeries.A, KosoadoSeries.DO]

export enum KosoadoKind {
  THING = 'thing',
  MODIFIER = 'modifier',
  PLACE = 'place',
  DIRECTION = 'direction',
  TYPE = 'type',
}

export interface KosoadoRow {
  kind: KosoadoKind
  label: string
  usage: string
  // In KOSOADO_SERIES_ORDER: こ, そ, あ, ど.
  words: [string, string, string, string]
  meanings: [string, string, string, string]
}

export const KOSOADO_ROWS: KosoadoRow[] = [
  {
    kind: KosoadoKind.THING,
    label: 'Cosa',
    usage: 'Va solo, sin sustantivo detrás',
    words: ['これ', 'それ', 'あれ', 'どれ'],
    meanings: ['esto', 'eso', 'aquello', '¿cuál?'],
  },
  {
    kind: KosoadoKind.MODIFIER,
    label: 'Este + sustantivo',
    usage: 'Siempre lleva un sustantivo detrás',
    words: ['この', 'その', 'あの', 'どの'],
    meanings: ['este ~', 'ese ~', 'aquel ~', '¿qué ~?'],
  },
  {
    kind: KosoadoKind.PLACE,
    label: 'Lugar',
    usage: 'Dónde está algo',
    words: ['ここ', 'そこ', 'あそこ', 'どこ'],
    meanings: ['aquí', 'ahí', 'allí', '¿dónde?'],
  },
  {
    kind: KosoadoKind.DIRECTION,
    label: 'Dirección (cortés)',
    usage: 'Hacia dónde; también la forma educada de lugar y persona',
    words: ['こちら', 'そちら', 'あちら', 'どちら'],
    meanings: ['por aquí', 'por ahí', 'por allí', '¿por dónde?'],
  },
  {
    kind: KosoadoKind.TYPE,
    label: 'Tipo',
    usage: 'Qué clase de cosa; lleva un sustantivo detrás',
    words: ['こんな', 'そんな', 'あんな', 'どんな'],
    meanings: ['como esto', 'como eso', 'como aquello', '¿qué tipo de?'],
  },
]

export function findKosoado(word: string): { row: KosoadoRow; series: KosoadoSeries } | undefined {
  for (const row of KOSOADO_ROWS) {
    const index = row.words.indexOf(word)
    if (index >= 0) return { row, series: KOSOADO_SERIES_ORDER[index] }
  }
  return undefined
}
