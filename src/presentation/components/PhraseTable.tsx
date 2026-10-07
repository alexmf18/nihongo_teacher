import { useSpeech } from '../hooks/useSpeech'
import { RefGroup, RefPage, SpeakableText, refCard } from './ReferenceLayout'

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
    <div className={`flex w-64 flex-col items-center text-center ${refCard}`}>
      <SpeakableText text={entry.japanese} onSpeak={onSpeak} className="text-xl leading-snug" />
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

export function PhraseTable() {
  const { speak } = useSpeech()

  return (
    <RefPage>
      {PHRASE_GROUPS.map((group) => (
        <RefGroup key={group.title} title={group.title} subtitle={group.subtitle}>
          {group.entries.map((entry) => (
            <PhraseCard key={`${group.title}-${entry.japanese}`} entry={entry} onSpeak={speak} />
          ))}
        </RefGroup>
      ))}
    </RefPage>
  )
}
