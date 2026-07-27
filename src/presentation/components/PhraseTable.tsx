import { useSpeech } from '../hooks/useSpeech'

interface PhraseEntry {
  japanese: string
  romaji: string
  meaning: string
  exampleSentence?: { japanese: string; translation: string }
}

interface PhraseGroup {
  title: string
  subtitle: string
  entries: PhraseEntry[]
}

const PHRASE_GROUPS: PhraseGroup[] = [
  {
    title: 'Saludos',
    subtitle: '挨拶',
    entries: [
      { japanese: 'おはようございます', romaji: 'ohayou gozaimasu', meaning: 'Buenos días (formal)' },
      { japanese: 'おげんきですか', romaji: 'ogenki desu ka', meaning: '¿Cómo está usted?' },
      { japanese: 'おかげさまで', romaji: 'okagesama de', meaning: 'Bien, gracias' },
      { japanese: 'ごめんなさい', romaji: 'gomen nasai', meaning: 'Lo siento / Perdón' },
      { japanese: 'おさきに', romaji: 'osaki ni', meaning: 'Antes que usted (al pasar/empezar)' },
    ],
  },
  {
    title: 'Presentaciones',
    subtitle: '自己紹介',
    entries: [
      { japanese: 'はじめまして', romaji: 'hajimemashite', meaning: 'Mucho gusto (primera vez)', exampleSentence: { japanese: 'はじめまして、たなかです。どうぞよろしく。', translation: 'Mucho gusto, soy Tanaka. Un placer conocerte.' } },
      { japanese: 'よろしくおねがいします', romaji: 'yoroshiku onegaishimasu', meaning: 'Un placer / Gracias de antemano' },
      { japanese: 'こちらこそ', romaji: 'kochira koso', meaning: 'El gusto es mío' },
      { japanese: 'おあいできてうれしいです', romaji: 'oai dekite ureshii desu', meaning: 'Encantado de conocerte' },
      { japanese: 'どうぞ', romaji: 'douzo', meaning: 'Por favor (ofreciendo algo)' },
    ],
  },
  {
    title: 'Indicaciones',
    subtitle: '道案内',
    entries: [
      { japanese: 'まっすぐいってください', romaji: 'massugu itte kudasai', meaning: 'Siga recto' },
      { japanese: 'みぎにまがってください', romaji: 'migi ni magatte kudasai', meaning: 'Gire a la derecha' },
      { japanese: 'ひだりにまがってください', romaji: 'hidari ni magatte kudasai', meaning: 'Gire a la izquierda' },
      { japanese: 'ここをまがってください', romaji: 'koko o magatte kudasai', meaning: 'Gire aquí' },
      { japanese: 'とまってください', romaji: 'tomatte kudasai', meaning: 'Deténgase / Pare' },
    ],
  },
  {
    title: 'En la mesa',
    subtitle: '食事',
    entries: [
      { japanese: 'いただきます', romaji: 'itadakimasu', meaning: 'Buen provecho (antes de comer)' },
      { japanese: 'ごちそうさまでした', romaji: 'gochisousama deshita', meaning: 'Gracias por la comida (después)' },
      { japanese: 'おかわりください', romaji: 'okawari kudasai', meaning: 'Otra ración, por favor' },
      { japanese: 'おいしいです', romaji: 'oishii desu', meaning: 'Está delicioso' },
      { japanese: 'おはしをください', romaji: 'ohashi o kudasai', meaning: 'Palillos, por favor' },
    ],
  },
  {
    title: 'Cortesía',
    subtitle: '礼儀',
    entries: [
      { japanese: 'ありがとうございます', romaji: 'arigatou gozaimasu', meaning: 'Muchas gracias (formal)' },
      { japanese: 'どういたしまして', romaji: 'dou itashimashite', meaning: 'De nada' },
      { japanese: 'すみません', romaji: 'sumimasen', meaning: 'Disculpe / Perdón', exampleSentence: { japanese: 'すみません、トイレはどこですか。', translation: 'Disculpe, ¿dónde está el baño?' } },
      { japanese: 'しつれいします', romaji: 'shitsurei shimasu', meaning: 'Con permiso / Disculpe' },
      { japanese: 'おつかれさまでした', romaji: 'otsukaresama deshita', meaning: 'Buen trabajo (gracias por tu esfuerzo)' },
    ],
  },
]

function PhraseCard({ entry, onSpeak }: { entry: PhraseEntry; onSpeak: (text: string) => void }) {
  return (
    <div className="flex w-64 flex-col items-center rounded-lg border border-accent-border bg-white p-4 shadow-[0_8px_18px_rgba(15,23,42,0.04)] transition-colors hover:border-accent hover:bg-accent-light">
      <button
        onClick={() => onSpeak(entry.japanese)}
        className="mb-2 cursor-pointer text-center text-xl font-semibold leading-snug text-accent transition-transform hover:scale-105"
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

export function PhraseTable() {
  const { speak } = useSpeech()

  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {PHRASE_GROUPS.map((group) => (
          <div key={group.title} className="mb-8">
            <h2 className="mb-1 text-center text-xl font-extrabold text-slate-950">{group.title}</h2>
            <p className="mb-4 text-center text-sm font-semibold text-slate-400">{group.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {group.entries.map((entry) => (
                <PhraseCard key={`${group.title}-${entry.japanese}`} entry={entry} onSpeak={speak} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
