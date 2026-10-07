import { useSpeech } from '../hooks/useSpeech'
import { RefGroup, RefPage, SpeakableText, refCard } from './ReferenceLayout'

interface WordEntry {
  japanese: string
  romaji: string
  meaning: string
  exampleSentence?: { japanese: string; translation: string }
}

interface WordGroup {
  title: string
  subtitle: string
  entries: WordEntry[]
}

const WORD_GROUPS: WordGroup[] = [
  {
    title: 'Saludos y respuestas',
    subtitle: '挨拶と返事',
    entries: [
      { japanese: 'ありがとう', romaji: 'arigatou', meaning: 'gracias', exampleSentence: { japanese: 'てつだってくれて、ありがとう。', translation: 'Gracias por ayudarme.' } },
      { japanese: 'おはよう', romaji: 'ohayou', meaning: 'buenos días' },
      { japanese: 'こんにちは', romaji: 'konnichiwa', meaning: 'hola / buenas tardes', exampleSentence: { japanese: 'せんせい、こんにちは。', translation: 'Hola, profesor.' } },
      { japanese: 'こんばんは', romaji: 'konbanwa', meaning: 'buenas noches' },
      { japanese: 'さようなら', romaji: 'sayounara', meaning: 'adiós' },
      { japanese: 'すみません', romaji: 'sumimasen', meaning: 'disculpe / lo siento' },
      { japanese: 'はい', romaji: 'hai', meaning: 'sí' },
      { japanese: 'いいえ', romaji: 'iie', meaning: 'no' },
      { japanese: 'だいじょうぶ', romaji: 'daijoubu', meaning: 'está bien / tranquilo' },
    ],
  },
  {
    title: 'Personas y lugares',
    subtitle: '人と場所',
    entries: [
      { japanese: 'なまえ', romaji: 'namae', meaning: 'nombre' },
      { japanese: 'ともだち', romaji: 'tomodachi', meaning: 'amigo / amiga', exampleSentence: { japanese: 'これはわたしのともだちです。', translation: 'Este es mi amigo.' } },
      { japanese: 'せんせい', romaji: 'sensei', meaning: 'profesor / maestra' },
      { japanese: 'がくせい', romaji: 'gakusei', meaning: 'estudiante' },
      { japanese: 'がっこう', romaji: 'gakkou', meaning: 'escuela', exampleSentence: { japanese: 'まいにちがっこうへいきます。', translation: 'Voy a la escuela todos los días.' } },
      { japanese: 'えき', romaji: 'eki', meaning: 'estación (tren)' },
      { japanese: 'びょういん', romaji: 'byouin', meaning: 'hospital' },
      { japanese: 'としょかん', romaji: 'toshokan', meaning: 'biblioteca' },
    ],
  },
  {
    title: 'Comida y bebida',
    subtitle: '食べ物と飲み物',
    entries: [
      { japanese: 'たべもの', romaji: 'tabemono', meaning: 'comida', exampleSentence: { japanese: 'にほんのたべものがすきです。', translation: 'Me gusta la comida japonesa.' } },
      { japanese: 'のみもの', romaji: 'nomimono', meaning: 'bebida' },
      { japanese: 'おいしい', romaji: 'oishii', meaning: 'delicioso / rico' },
      { japanese: 'やさい', romaji: 'yasai', meaning: 'verdura' },
      { japanese: 'くだもの', romaji: 'kudamono', meaning: 'fruta' },
      { japanese: 'さかな', romaji: 'sakana', meaning: 'pescado' },
      { japanese: 'みず', romaji: 'mizu', meaning: 'agua', exampleSentence: { japanese: 'みずをいっぱいください。', translation: 'Un vaso de agua, por favor.' } },
      { japanese: 'おちゃ', romaji: 'ocha', meaning: 'té (verde)' },
    ],
  },
  {
    title: 'Naturaleza y animales',
    subtitle: '自然と動物',
    entries: [
      { japanese: 'ねこ', romaji: 'neko', meaning: 'gato', exampleSentence: { japanese: 'うちにねこがにひきいます。', translation: 'Tengo dos gatos en casa.' } },
      { japanese: 'いぬ', romaji: 'inu', meaning: 'perro' },
      { japanese: 'とり', romaji: 'tori', meaning: 'pájaro / pollo' },
      { japanese: 'はな', romaji: 'hana', meaning: 'flor' },
      { japanese: 'やま', romaji: 'yama', meaning: 'montaña', exampleSentence: { japanese: 'あのやまはとてもたかいです。', translation: 'Esa montaña es muy alta.' } },
      { japanese: 'かわ', romaji: 'kawa', meaning: 'río' },
      { japanese: 'うみ', romaji: 'umi', meaning: 'mar' },
      { japanese: 'そら', romaji: 'sora', meaning: 'cielo' },
      { japanese: 'つき', romaji: 'tsuki', meaning: 'luna' },
      { japanese: 'ほし', romaji: 'hoshi', meaning: 'estrella' },
    ],
  },
  {
    title: 'Tiempo',
    subtitle: '時間',
    entries: [
      { japanese: 'あさ', romaji: 'asa', meaning: 'mañana (temprano)' },
      { japanese: 'ひる', romaji: 'hiru', meaning: 'mediodía' },
      { japanese: 'よる', romaji: 'yoru', meaning: 'noche' },
      { japanese: 'きょう', romaji: 'kyou', meaning: 'hoy', exampleSentence: { japanese: 'きょうはいいてんきですね。', translation: 'Hoy hace buen tiempo, ¿verdad?' } },
      { japanese: 'あした', romaji: 'ashita', meaning: 'mañana (día siguiente)' },
      { japanese: 'きのう', romaji: 'kinou', meaning: 'ayer' },
      { japanese: 'てんき', romaji: 'tenki', meaning: 'clima / tiempo atmosférico' },
    ],
  },
  {
    title: 'Adjetivos y otros',
    subtitle: '形容詞など',
    entries: [
      { japanese: 'たのしい', romaji: 'tanoshii', meaning: 'divertido / agradable' },
      { japanese: 'おおきい', romaji: 'ookii', meaning: 'grande' },
      { japanese: 'ちいさい', romaji: 'chiisai', meaning: 'pequeño' },
      { japanese: 'あたらしい', romaji: 'atarashii', meaning: 'nuevo' },
      { japanese: 'むずかしい', romaji: 'muzukashii', meaning: 'difícil' },
      { japanese: 'でんわ', romaji: 'denwa', meaning: 'teléfono' },
      { japanese: 'べんきょう', romaji: 'benkyou', meaning: 'estudio / aprender', exampleSentence: { japanese: 'まいばんにほんごをべんきょうします。', translation: 'Estudio japonés todas las noches.' } },
      { japanese: 'しごと', romaji: 'shigoto', meaning: 'trabajo' },
      { japanese: 'かいもの', romaji: 'kaimono', meaning: 'compras' },
      { japanese: 'りょこう', romaji: 'ryokou', meaning: 'viaje' },
      { japanese: 'おんがく', romaji: 'ongaku', meaning: 'música' },
      { japanese: 'えいが', romaji: 'eiga', meaning: 'película' },
    ],
  },
]

function WordCard({ entry, onSpeak }: { entry: WordEntry; onSpeak: (text: string) => void }) {
  return (
    <div className={`flex w-44 flex-col items-center text-center ${refCard}`}>
      <SpeakableText text={entry.japanese} onSpeak={onSpeak} className="text-2xl leading-tight" />
      <span className="mt-1.5 text-xs leading-tight text-sumi-soft">{entry.romaji}</span>
      <span className="mt-2 text-sm font-bold text-sumi">{entry.meaning}</span>
      {entry.exampleSentence && (
        <div className="mt-3 w-full border-t border-dashed border-keisen-strong pt-2.5">
          <p className="font-kyokasho text-sm leading-snug text-sumi">{entry.exampleSentence.japanese}</p>
          <p className="mt-1 text-xs leading-snug text-sumi-soft">{entry.exampleSentence.translation}</p>
        </div>
      )}
    </div>
  )
}

export function WordTable() {
  const { speak } = useSpeech()

  return (
    <RefPage>
      {WORD_GROUPS.map((group) => (
        <RefGroup key={group.title} title={group.title} subtitle={group.subtitle}>
          {group.entries.map((entry) => (
            <WordCard key={`${group.title}-${entry.japanese}`} entry={entry} onSpeak={speak} />
          ))}
        </RefGroup>
      ))}
    </RefPage>
  )
}
