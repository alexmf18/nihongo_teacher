import { useSpeech } from '../hooks/useSpeech'

interface KanjiEntry {
  kanji: string
  onyomi: string
  kunyomi?: string
  meaning: string
}

interface KanjiGroup {
  title: string
  subtitle: string
  entries: KanjiEntry[]
}

const KANJI_GROUPS: KanjiGroup[] = [
  {
    title: 'Números',
    subtitle: '数字',
    entries: [
      { kanji: '一', onyomi: 'いち (ichi)', kunyomi: 'ひと (hito)', meaning: 'uno' },
      { kanji: '二', onyomi: 'に (ni)', kunyomi: 'ふた (futa)', meaning: 'dos' },
      { kanji: '三', onyomi: 'さん (san)', kunyomi: 'み (mi)', meaning: 'tres' },
      { kanji: '四', onyomi: 'し (shi)', kunyomi: 'よん (yon)', meaning: 'cuatro' },
      { kanji: '五', onyomi: 'ご (go)', meaning: 'cinco' },
      { kanji: '六', onyomi: 'ろく (roku)', meaning: 'seis' },
      { kanji: '七', onyomi: 'しち (shichi)', kunyomi: 'なな (nana)', meaning: 'siete' },
      { kanji: '八', onyomi: 'はち (hachi)', meaning: 'ocho' },
      { kanji: '九', onyomi: 'きゅう (kyuu)', kunyomi: 'ここの (kokono)', meaning: 'nueve' },
      { kanji: '十', onyomi: 'じゅう (juu)', kunyomi: 'とお (too)', meaning: 'diez' },
      { kanji: '百', onyomi: 'ひゃく (hyaku)', meaning: 'cien' },
      { kanji: '千', onyomi: 'せん (sen)', meaning: 'mil' },
      { kanji: '万', onyomi: 'まん (man)', meaning: 'diez mil' },
    ],
  },
  {
    title: 'Naturaleza',
    subtitle: '自然',
    entries: [
      { kanji: '日', onyomi: 'にち (nichi)', kunyomi: 'ひ (hi)', meaning: 'sol / día' },
      { kanji: '月', onyomi: 'げつ (getsu)', kunyomi: 'つき (tsuki)', meaning: 'luna / mes' },
      { kanji: '火', onyomi: 'か (ka)', kunyomi: 'ひ (hi)', meaning: 'fuego' },
      { kanji: '水', onyomi: 'すい (sui)', kunyomi: 'みず (mizu)', meaning: 'agua' },
      { kanji: '金', onyomi: 'きん (kin)', kunyomi: 'かね (kane)', meaning: 'oro / metal' },
      { kanji: '土', onyomi: 'ど (do)', kunyomi: 'つち (tsuchi)', meaning: 'tierra' },
      { kanji: '木', onyomi: 'もく (moku)', kunyomi: 'き (ki)', meaning: 'árbol / madera' },
      { kanji: '山', onyomi: 'さん (san)', kunyomi: 'やま (yama)', meaning: 'montaña' },
      { kanji: '川', onyomi: 'せん (sen)', kunyomi: 'かわ (kawa)', meaning: 'río' },
      { kanji: '花', onyomi: 'か (ka)', kunyomi: 'はな (hana)', meaning: 'flor' },
      { kanji: '雨', onyomi: 'う (u)', kunyomi: 'あめ (ame)', meaning: 'lluvia' },
      { kanji: '空', onyomi: 'くう (kuu)', kunyomi: 'そら (sora)', meaning: 'cielo / vacío' },
      { kanji: '魚', onyomi: 'ぎょ (gyo)', kunyomi: 'うお (uo)', meaning: 'pez' },
      { kanji: '鳥', onyomi: 'ちょう (chou)', kunyomi: 'とり (tori)', meaning: 'pájaro' },
      { kanji: '犬', onyomi: 'けん (ken)', kunyomi: 'いぬ (inu)', meaning: 'perro' },
      { kanji: '猫', onyomi: 'びょう (byou)', kunyomi: 'ねこ (neko)', meaning: 'gato' },
    ],
  },
  {
    title: 'Direcciones y Posición',
    subtitle: '方角',
    entries: [
      { kanji: '上', onyomi: 'じょう (jou)', kunyomi: 'うえ (ue)', meaning: 'arriba / encima' },
      { kanji: '下', onyomi: 'か (ka)', kunyomi: 'した (shita)', meaning: 'abajo / debajo' },
      { kanji: '左', onyomi: 'さ (sa)', kunyomi: 'ひだり (hidari)', meaning: 'izquierda' },
      { kanji: '右', onyomi: 'う (u)', kunyomi: 'みぎ (migi)', meaning: 'derecha' },
      { kanji: '東', onyomi: 'とう (tou)', kunyomi: 'ひがし (higashi)', meaning: 'este' },
      { kanji: '西', onyomi: 'せい (sei)', kunyomi: 'にし (nishi)', meaning: 'oeste' },
      { kanji: '南', onyomi: 'なん (nan)', kunyomi: 'みなみ (minami)', meaning: 'sur' },
      { kanji: '北', onyomi: 'ほく (hoku)', kunyomi: 'きた (kita)', meaning: 'norte' },
      { kanji: '中', onyomi: 'ちゅう (chuu)', kunyomi: 'なか (naka)', meaning: 'dentro / centro' },
    ],
  },
  {
    title: 'Personas y Lugares',
    subtitle: '人と場所',
    entries: [
      { kanji: '人', onyomi: 'じん (jin)', kunyomi: 'ひと (hito)', meaning: 'persona' },
      { kanji: '子', onyomi: 'し (shi)', kunyomi: 'こ (ko)', meaning: 'niño / hijo' },
      { kanji: '口', onyomi: 'こう (kou)', kunyomi: 'くち (kuchi)', meaning: 'boca / entrada' },
      { kanji: '目', onyomi: 'もく (moku)', kunyomi: 'め (me)', meaning: 'ojo' },
      { kanji: '田', onyomi: 'でん (den)', kunyomi: 'た (ta)', meaning: 'arrozal / campo' },
      { kanji: '国', onyomi: 'こく (koku)', kunyomi: 'くに (kuni)', meaning: 'país' },
      { kanji: '駅', onyomi: 'えき (eki)', meaning: 'estación (tren)' },
      { kanji: '校', onyomi: 'こう (kou)', meaning: 'escuela' },
      { kanji: '学', onyomi: 'がく (gaku)', meaning: 'estudio / aprendizaje' },
      { kanji: '本', onyomi: 'ほん (hon)', kunyomi: 'もと (moto)', meaning: 'libro / origen' },
      { kanji: '気', onyomi: 'き (ki)', meaning: 'espíritu / energía' },
    ],
  },
  {
    title: 'Vida Cotidiana',
    subtitle: '日常生活',
    entries: [
      { kanji: '大', onyomi: 'だい (dai)', kunyomi: 'おお (oo)', meaning: 'grande' },
      { kanji: '小', onyomi: 'しょう (shou)', kunyomi: 'ちい (chii)', meaning: 'pequeño' },
      { kanji: '車', onyomi: 'しゃ (sha)', kunyomi: 'くるま (kuruma)', meaning: 'coche' },
      { kanji: '電', onyomi: 'でん (den)', meaning: 'electricidad' },
      { kanji: '玉', onyomi: 'ぎょく (gyoku)', kunyomi: 'たま (tama)', meaning: 'joya / esfera' },
      { kanji: '生', onyomi: 'せい (sei)', kunyomi: 'い (i)', meaning: 'vida / nacer' },
    ],
  },
]

function KanjiCard({ entry, onSpeak }: { entry: KanjiEntry; onSpeak: (text: string) => void }) {
  return (
    <div className="flex w-40 flex-col items-center rounded-lg border border-accent-border bg-white p-4 shadow-[0_8px_18px_rgba(15,23,42,0.04)] transition-colors hover:border-accent hover:bg-accent-light">
      <button
        onClick={() => onSpeak(entry.kanji)}
        className="mb-2 cursor-pointer text-5xl font-semibold text-accent transition-transform hover:scale-110"
        title="Escuchar pronunciacion"
      >
        {entry.kanji}
      </button>
      <span className="mb-1 text-center text-xs leading-tight text-slate-400">{entry.onyomi}</span>
      {entry.kunyomi && (
        <span className="mb-1 text-center text-xs leading-tight text-slate-400">{entry.kunyomi}</span>
      )}
      <span className="mt-1 text-center text-sm font-bold text-slate-600">{entry.meaning}</span>
    </div>
  )
}

export function KanjiTable() {
  const { speak } = useSpeech()

  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {KANJI_GROUPS.map((group) => (
          <div key={group.title} className="mb-8">
            <h2 className="mb-1 text-center text-xl font-extrabold text-slate-950">{group.title}</h2>
            <p className="mb-4 text-center text-sm font-semibold text-slate-400">{group.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {group.entries.map((entry) => (
                <KanjiCard key={entry.kanji} entry={entry} onSpeak={speak} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
