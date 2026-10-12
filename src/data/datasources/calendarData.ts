import { withShortVowels } from '../../domain/services/romaji'

// Days of the week, months and days of the month. One source for both the reference table (which
// also shows the kanji) and the practice deck (which asks for the kana reading).

export interface CalendarEntry {
  id: string
  kanji: string
  kana: string
  // The first romaji is the one shown in the table; all are accepted as answers.
  romaji: string[]
  meaning: string
  // Readings that break the usual pattern (ふつか, not *ににち); the table flags them.
  irregular?: boolean
}

export interface CalendarGroup {
  title: string
  subtitle: string
  entries: CalendarEntry[]
}

// Days of the month: 1–10, 14, 20 and 24 have their own readings; the rest are
// the number plus にち.
const DAYS_OF_MONTH: [number, string, string, string, boolean][] = [
  [1, '一日', 'ついたち', 'tsuitachi', true],
  [2, '二日', 'ふつか', 'futsuka', true],
  [3, '三日', 'みっか', 'mikka', true],
  [4, '四日', 'よっか', 'yokka', true],
  [5, '五日', 'いつか', 'itsuka', true],
  [6, '六日', 'むいか', 'muika', true],
  [7, '七日', 'なのか', 'nanoka', true],
  [8, '八日', 'ようか', 'youka', true],
  [9, '九日', 'ここのか', 'kokonoka', true],
  [10, '十日', 'とおか', 'tooka', true],
  [11, '十一日', 'じゅういちにち', 'juuichinichi', false],
  [12, '十二日', 'じゅうににち', 'juuninichi', false],
  [13, '十三日', 'じゅうさんにち', 'juusannichi', false],
  [14, '十四日', 'じゅうよっか', 'juuyokka', true],
  [15, '十五日', 'じゅうごにち', 'juugonichi', false],
  [16, '十六日', 'じゅうろくにち', 'juurokunichi', false],
  [17, '十七日', 'じゅうしちにち', 'juushichinichi', false],
  [18, '十八日', 'じゅうはちにち', 'juuhachinichi', false],
  [19, '十九日', 'じゅうくにち', 'juukunichi', false],
  [20, '二十日', 'はつか', 'hatsuka', true],
  [21, '二十一日', 'にじゅういちにち', 'nijuuichinichi', false],
  [22, '二十二日', 'にじゅうににち', 'nijuuninichi', false],
  [23, '二十三日', 'にじゅうさんにち', 'nijuusannichi', false],
  [24, '二十四日', 'にじゅうよっか', 'nijuuyokka', true],
  [25, '二十五日', 'にじゅうごにち', 'nijuugonichi', false],
  [26, '二十六日', 'にじゅうろくにち', 'nijuurokunichi', false],
  [27, '二十七日', 'にじゅうしちにち', 'nijuushichinichi', false],
  [28, '二十八日', 'にじゅうはちにち', 'nijuuhachinichi', false],
  [29, '二十九日', 'にじゅうくにち', 'nijuukunichi', false],
  [30, '三十日', 'さんじゅうにち', 'sanjuunichi', false],
  [31, '三十一日', 'さんじゅういちにち', 'sanjuuichinichi', false],
]

const dayOfMonthEntries: CalendarEntry[] = DAYS_OF_MONTH.map(([day, kanji, kana, romaji, irregular]) => ({
  id: `cal-day-${day}`,
  kanji,
  kana,
  romaji: withShortVowels(romaji),
  meaning: `día ${day}`,
  irregular,
}))

export const calendarGroups: CalendarGroup[] = [
  {
    title: 'Días de la semana',
    subtitle: '曜日',
    entries: [
      { id: 'cal-getsuyoubi', kanji: '月曜日', kana: 'げつようび', romaji: ['getsuyoubi', 'getsuyobi'], meaning: 'lunes' },
      { id: 'cal-kayoubi', kanji: '火曜日', kana: 'かようび', romaji: ['kayoubi', 'kayobi'], meaning: 'martes' },
      { id: 'cal-suiyoubi', kanji: '水曜日', kana: 'すいようび', romaji: ['suiyoubi', 'suiyobi'], meaning: 'miércoles' },
      { id: 'cal-mokuyoubi', kanji: '木曜日', kana: 'もくようび', romaji: ['mokuyoubi', 'mokuyobi'], meaning: 'jueves' },
      { id: 'cal-kinyoubi', kanji: '金曜日', kana: 'きんようび', romaji: ['kinyoubi', 'kinyobi', "kin'youbi"], meaning: 'viernes' },
      { id: 'cal-doyoubi', kanji: '土曜日', kana: 'どようび', romaji: ['doyoubi', 'doyobi'], meaning: 'sábado' },
      { id: 'cal-nichiyoubi', kanji: '日曜日', kana: 'にちようび', romaji: ['nichiyoubi', 'nichiyobi'], meaning: 'domingo' },
    ],
  },
  {
    title: 'Meses',
    subtitle: '月',
    entries: [
      { id: 'cal-ichigatsu', kanji: '一月', kana: 'いちがつ', romaji: ['ichigatsu'], meaning: 'enero' },
      { id: 'cal-nigatsu', kanji: '二月', kana: 'にがつ', romaji: ['nigatsu'], meaning: 'febrero' },
      { id: 'cal-sangatsu', kanji: '三月', kana: 'さんがつ', romaji: ['sangatsu'], meaning: 'marzo' },
      // 4, 7 and 9 only take these readings: never よんがつ, なながつ or きゅうがつ.
      { id: 'cal-shigatsu', kanji: '四月', kana: 'しがつ', romaji: ['shigatsu'], meaning: 'abril' },
      { id: 'cal-gogatsu', kanji: '五月', kana: 'ごがつ', romaji: ['gogatsu'], meaning: 'mayo' },
      { id: 'cal-rokugatsu', kanji: '六月', kana: 'ろくがつ', romaji: ['rokugatsu'], meaning: 'junio' },
      { id: 'cal-shichigatsu', kanji: '七月', kana: 'しちがつ', romaji: ['shichigatsu'], meaning: 'julio' },
      { id: 'cal-hachigatsu', kanji: '八月', kana: 'はちがつ', romaji: ['hachigatsu'], meaning: 'agosto' },
      { id: 'cal-kugatsu', kanji: '九月', kana: 'くがつ', romaji: ['kugatsu'], meaning: 'septiembre' },
      { id: 'cal-juugatsu', kanji: '十月', kana: 'じゅうがつ', romaji: ['juugatsu', 'jugatsu'], meaning: 'octubre' },
      { id: 'cal-juuichigatsu', kanji: '十一月', kana: 'じゅういちがつ', romaji: ['juuichigatsu', 'juichigatsu'], meaning: 'noviembre' },
      { id: 'cal-juunigatsu', kanji: '十二月', kana: 'じゅうにがつ', romaji: ['juunigatsu', 'junigatsu'], meaning: 'diciembre' },
    ],
  },
  {
    title: 'Días del mes',
    subtitle: '日にち',
    entries: dayOfMonthEntries,
  },
  {
    title: 'Preguntas',
    subtitle: '何',
    entries: [
      { id: 'cal-nanyoubi', kanji: '何曜日', kana: 'なんようび', romaji: ['nanyoubi', 'nanyobi', "nan'youbi"], meaning: '¿qué día de la semana?' },
      { id: 'cal-nangatsu', kanji: '何月', kana: 'なんがつ', romaji: ['nangatsu'], meaning: '¿qué mes?' },
      { id: 'cal-nannichi', kanji: '何日', kana: 'なんにち', romaji: ['nannichi'], meaning: '¿qué día del mes?' },
    ],
  },
]
