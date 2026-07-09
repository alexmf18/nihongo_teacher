import { useSpeech } from '../hooks/useSpeech'
import { TableGrid, Section, TableEntry } from './KanaGrid'

const GOJUUON_COLS = ['a', 'i', 'u', 'e', 'o'] as const
const GOJUUON_ROWS: { label: string; chars: TableEntry[] }[] = [
  { label: '', chars: [{ char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' }, { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' }] },
  { label: 'k', chars: [{ char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' }, { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' }] },
  { label: 's', chars: [{ char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' }, { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' }] },
  { label: 't', chars: [{ char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' }, { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' }] },
  { label: 'n', chars: [{ char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' }, { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' }] },
  { label: 'h', chars: [{ char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' }, { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' }] },
  { label: 'm', chars: [{ char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' }, { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' }] },
  { label: 'y', chars: [{ char: 'ヤ', romaji: 'ya' }, null, { char: 'ユ', romaji: 'yu' }, null, { char: 'ヨ', romaji: 'yo' }] },
  { label: 'r', chars: [{ char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' }, { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' }] },
  { label: 'w', chars: [{ char: 'ワ', romaji: 'wa' }, null, null, null, { char: 'ヲ', romaji: 'wo' }] },
  { label: 'n', chars: [null, null, { char: 'ン', romaji: 'n' }, null, null] },
]

const DAKUTEN: { label: string; chars: TableEntry[] }[] = [
  { label: 'g', chars: [{ char: 'ガ', romaji: 'ga' }, { char: 'ギ', romaji: 'gi' }, { char: 'グ', romaji: 'gu' }, { char: 'ゲ', romaji: 'ge' }, { char: 'ゴ', romaji: 'go' }] },
  { label: 'z', chars: [{ char: 'ザ', romaji: 'za' }, { char: 'ジ', romaji: 'ji' }, { char: 'ズ', romaji: 'zu' }, { char: 'ゼ', romaji: 'ze' }, { char: 'ゾ', romaji: 'zo' }] },
  { label: 'd', chars: [{ char: 'ダ', romaji: 'da' }, { char: 'ヂ', romaji: 'dji' }, { char: 'ヅ', romaji: 'dzu' }, { char: 'デ', romaji: 'de' }, { char: 'ド', romaji: 'do' }] },
  { label: 'b', chars: [{ char: 'バ', romaji: 'ba' }, { char: 'ビ', romaji: 'bi' }, { char: 'ブ', romaji: 'bu' }, { char: 'ベ', romaji: 'be' }, { char: 'ボ', romaji: 'bo' }] },
  { label: 'p', chars: [{ char: 'パ', romaji: 'pa' }, { char: 'ピ', romaji: 'pi' }, { char: 'プ', romaji: 'pu' }, { char: 'ペ', romaji: 'pe' }, { char: 'ポ', romaji: 'po' }] },
]

const YOON_COLS = ['a', 'u', 'o'] as const
const YOON_ROWS: { label: string; chars: TableEntry[] }[] = [
  { label: 'k', chars: [{ char: 'キャ', romaji: 'kya' }, { char: 'キュ', romaji: 'kyu' }, { char: 'キョ', romaji: 'kyo' }] },
  { label: 's', chars: [{ char: 'シャ', romaji: 'sha' }, { char: 'シュ', romaji: 'shu' }, { char: 'ショ', romaji: 'sho' }] },
  { label: 'ch', chars: [{ char: 'チャ', romaji: 'cha' }, { char: 'チュ', romaji: 'chu' }, { char: 'チョ', romaji: 'cho' }] },
  { label: 'n', chars: [{ char: 'ニャ', romaji: 'nya' }, { char: 'ニュ', romaji: 'nyu' }, { char: 'ニョ', romaji: 'nyo' }] },
  { label: 'h', chars: [{ char: 'ヒャ', romaji: 'hya' }, { char: 'ヒュ', romaji: 'hyu' }, { char: 'ヒョ', romaji: 'hyo' }] },
  { label: 'm', chars: [{ char: 'ミャ', romaji: 'mya' }, { char: 'ミュ', romaji: 'myu' }, { char: 'ミョ', romaji: 'myo' }] },
  { label: 'r', chars: [{ char: 'リャ', romaji: 'rya' }, { char: 'リュ', romaji: 'ryu' }, { char: 'リョ', romaji: 'ryo' }] },
  { label: 'g', chars: [{ char: 'ギャ', romaji: 'gya' }, { char: 'ギュ', romaji: 'gyu' }, { char: 'ギョ', romaji: 'gyo' }] },
  { label: 'j', chars: [{ char: 'ジャ', romaji: 'ja' }, { char: 'ジュ', romaji: 'ju' }, { char: 'ジョ', romaji: 'jo' }] },
  { label: 'b', chars: [{ char: 'ビャ', romaji: 'bya' }, { char: 'ビュ', romaji: 'byu' }, { char: 'ビョ', romaji: 'byo' }] },
  { label: 'p', chars: [{ char: 'ピャ', romaji: 'pya' }, { char: 'ピュ', romaji: 'pyu' }, { char: 'ピョ', romaji: 'pyo' }] },
]

export function KatakanaTable() {
  const { speak } = useSpeech()

  return (
    <div className="flex-1 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        <Section title="Gojuuon — 五十音 (Sonidos básicos)">
          <TableGrid rows={GOJUUON_ROWS} cols={GOJUUON_COLS} onSpeak={speak} color="emerald" />
        </Section>

        <Section title="Dakuten / Handakuten — 濁点・半濁点 (Sonidos con marca)">
          <TableGrid rows={DAKUTEN} cols={GOJUUON_COLS} onSpeak={speak} color="emerald" />
        </Section>

        <Section title="Yoon — 拗音 (Sonidos contraídos)">
          <TableGrid rows={YOON_ROWS} cols={YOON_COLS} onSpeak={speak} color="emerald" />
        </Section>
      </div>
    </div>
  )
}
