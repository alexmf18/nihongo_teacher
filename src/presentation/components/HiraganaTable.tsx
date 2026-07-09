import { useSpeech } from '../hooks/useSpeech'
import { TableGrid, Section, TableEntry } from './KanaGrid'

const GOJUUON_COLS = ['a', 'i', 'u', 'e', 'o'] as const
const GOJUUON_ROWS: { label: string; chars: TableEntry[] }[] = [
  { label: '', chars: [{ char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' }, { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' }] },
  { label: 'k', chars: [{ char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' }, { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' }] },
  { label: 's', chars: [{ char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' }, { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' }] },
  { label: 't', chars: [{ char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' }, { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' }] },
  { label: 'n', chars: [{ char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' }, { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' }] },
  { label: 'h', chars: [{ char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' }, { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' }] },
  { label: 'm', chars: [{ char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' }, { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' }] },
  { label: 'y', chars: [{ char: 'や', romaji: 'ya' }, null, { char: 'ゆ', romaji: 'yu' }, null, { char: 'よ', romaji: 'yo' }] },
  { label: 'r', chars: [{ char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' }, { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' }] },
  { label: 'w', chars: [{ char: 'わ', romaji: 'wa' }, null, null, null, { char: 'を', romaji: 'wo' }] },
  { label: 'n', chars: [null, null, { char: 'ん', romaji: 'n' }, null, null] },
]

const DAKUTEN: { label: string; chars: TableEntry[] }[] = [
  { label: 'g', chars: [{ char: 'が', romaji: 'ga' }, { char: 'ぎ', romaji: 'gi' }, { char: 'ぐ', romaji: 'gu' }, { char: 'げ', romaji: 'ge' }, { char: 'ご', romaji: 'go' }] },
  { label: 'z', chars: [{ char: 'ざ', romaji: 'za' }, { char: 'じ', romaji: 'ji' }, { char: 'ず', romaji: 'zu' }, { char: 'ぜ', romaji: 'ze' }, { char: 'ぞ', romaji: 'zo' }] },
  { label: 'd', chars: [{ char: 'だ', romaji: 'da' }, { char: 'ぢ', romaji: 'dji' }, { char: 'づ', romaji: 'dzu' }, { char: 'で', romaji: 'de' }, { char: 'ど', romaji: 'do' }] },
  { label: 'b', chars: [{ char: 'ば', romaji: 'ba' }, { char: 'び', romaji: 'bi' }, { char: 'ぶ', romaji: 'bu' }, { char: 'べ', romaji: 'be' }, { char: 'ぼ', romaji: 'bo' }] },
  { label: 'p', chars: [{ char: 'ぱ', romaji: 'pa' }, { char: 'ぴ', romaji: 'pi' }, { char: 'ぷ', romaji: 'pu' }, { char: 'ぺ', romaji: 'pe' }, { char: 'ぽ', romaji: 'po' }] },
]

const YOON_COLS = ['a', 'u', 'o'] as const
const YOON_ROWS: { label: string; chars: TableEntry[] }[] = [
  { label: 'k', chars: [{ char: 'きゃ', romaji: 'kya' }, { char: 'きゅ', romaji: 'kyu' }, { char: 'きょ', romaji: 'kyo' }] },
  { label: 's', chars: [{ char: 'しゃ', romaji: 'sha' }, { char: 'しゅ', romaji: 'shu' }, { char: 'しょ', romaji: 'sho' }] },
  { label: 'ch', chars: [{ char: 'ちゃ', romaji: 'cha' }, { char: 'ちゅ', romaji: 'chu' }, { char: 'ちょ', romaji: 'cho' }] },
  { label: 'n', chars: [{ char: 'にゃ', romaji: 'nya' }, { char: 'にゅ', romaji: 'nyu' }, { char: 'にょ', romaji: 'nyo' }] },
  { label: 'h', chars: [{ char: 'ひゃ', romaji: 'hya' }, { char: 'ひゅ', romaji: 'hyu' }, { char: 'ひょ', romaji: 'hyo' }] },
  { label: 'm', chars: [{ char: 'みゃ', romaji: 'mya' }, { char: 'みゅ', romaji: 'myu' }, { char: 'みょ', romaji: 'myo' }] },
  { label: 'r', chars: [{ char: 'りゃ', romaji: 'rya' }, { char: 'りゅ', romaji: 'ryu' }, { char: 'りょ', romaji: 'ryo' }] },
  { label: 'g', chars: [{ char: 'ぎゃ', romaji: 'gya' }, { char: 'ぎゅ', romaji: 'gyu' }, { char: 'ぎょ', romaji: 'gyo' }] },
  { label: 'j', chars: [{ char: 'じゃ', romaji: 'ja' }, { char: 'じゅ', romaji: 'ju' }, { char: 'じょ', romaji: 'jo' }] },
  { label: 'b', chars: [{ char: 'びゃ', romaji: 'bya' }, { char: 'びゅ', romaji: 'byu' }, { char: 'びょ', romaji: 'byo' }] },
  { label: 'p', chars: [{ char: 'ぴゃ', romaji: 'pya' }, { char: 'ぴゅ', romaji: 'pyu' }, { char: 'ぴょ', romaji: 'pyo' }] },
]

export function HiraganaTable() {
  const { speak } = useSpeech()

  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-10">
        <Section title="Gojuuon — 五十音 (Sonidos básicos)">
          <TableGrid rows={GOJUUON_ROWS} cols={GOJUUON_COLS} onSpeak={speak} color="indigo" />
        </Section>

        <Section title="Dakuten / Handakuten — 濁点・半濁点 (Sonidos con marca)">
          <TableGrid rows={DAKUTEN} cols={GOJUUON_COLS} onSpeak={speak} color="indigo" />
        </Section>

        <Section title="Yoon — 拗音 (Sonidos contraídos)">
          <TableGrid rows={YOON_ROWS} cols={YOON_COLS} onSpeak={speak} color="indigo" />
        </Section>
      </div>
    </div>
  )
}
