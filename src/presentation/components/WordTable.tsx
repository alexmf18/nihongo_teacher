import { useSpeech } from '../hooks/useSpeech'

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
    <div className="flex w-40 flex-col items-center rounded-lg border border-accent-border bg-white p-4 shadow-[0_8px_18px_rgba(15,23,42,0.04)] transition-colors hover:border-accent hover:bg-accent-light">
      <button
        onClick={() => onSpeak(entry.japanese)}
        className="mb-2 cursor-pointer text-center text-2xl font-semibold leading-tight text-accent transition-transform hover:scale-110"
        title="Escuchar pronunciacion"
      >
        {entry.japanese}
      </button>
      <span className="mb-1 text-center text-xs leading-tight text-slate-400">{entry.romaji}</span>
      <span className="mt-1 text-center text-sm font-bold text-slate-600">{entry.meaning}</span>
      {entry.exampleSentence && (
        <div className="mt-2 border-t border-slate-100 pt-2 text-center">
          <p className="text-[11px] leading-snug text-slate-500">{entry.exampleSentence.japanese}</p>
          <p className="mt-0.5 text-[10px] italic leading-snug text-slate-400">{entry.exampleSentence.translation}</p>
        </div>
      )}
    </div>
  )
}

export function WordTable() {
  const { speak } = useSpeech()

  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {WORD_GROUPS.map((group) => (
          <div key={group.title} className="mb-8">
            <h2 className="mb-1 text-center text-xl font-extrabold text-slate-950">{group.title}</h2>
            <p className="mb-4 text-center text-sm font-semibold text-slate-400">{group.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {group.entries.map((entry) => (
                <WordCard key={`${group.title}-${entry.japanese}`} entry={entry} onSpeak={speak} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
