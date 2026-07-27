import { useSpeech } from '../hooks/useSpeech'

interface NumberEntry {
  japanese: string
  romaji: string
  meaning: string
}

interface NumberGroup {
  title: string
  subtitle: string
  entries: NumberEntry[]
}

const NUMBER_GROUPS: NumberGroup[] = [
  {
    title: 'Números básicos',
    subtitle: '数字',
    entries: [
      { japanese: 'れい / ゼロ', romaji: 'rei / zero', meaning: 'cero' },
      { japanese: 'いち', romaji: 'ichi', meaning: 'uno' },
      { japanese: 'に', romaji: 'ni', meaning: 'dos' },
      { japanese: 'さん', romaji: 'san', meaning: 'tres' },
      { japanese: 'よん / し', romaji: 'yon / shi', meaning: 'cuatro' },
      { japanese: 'ご', romaji: 'go', meaning: 'cinco' },
      { japanese: 'ろく', romaji: 'roku', meaning: 'seis' },
      { japanese: 'なな / しち', romaji: 'nana / shichi', meaning: 'siete' },
      { japanese: 'はち', romaji: 'hachi', meaning: 'ocho' },
      { japanese: 'きゅう / く', romaji: 'kyuu / ku', meaning: 'nueve' },
      { japanese: 'じゅう', romaji: 'juu', meaning: 'diez' },
    ],
  },
  {
    title: 'Decenas y números grandes',
    subtitle: '十・百・千・万',
    entries: [
      { japanese: 'にじゅう', romaji: 'nijuu', meaning: 'veinte' },
      { japanese: 'さんじゅう', romaji: 'sanjuu', meaning: 'treinta' },
      { japanese: 'よんじゅう', romaji: 'yonjuu', meaning: 'cuarenta' },
      { japanese: 'ごじゅう', romaji: 'gojuu', meaning: 'cincuenta' },
      { japanese: 'ろくじゅう', romaji: 'rokujuu', meaning: 'sesenta' },
      { japanese: 'ななじゅう', romaji: 'nanajuu', meaning: 'setenta' },
      { japanese: 'はちじゅう', romaji: 'hachijuu', meaning: 'ochenta' },
      { japanese: 'きゅうじゅう', romaji: 'kyuujuu', meaning: 'noventa' },
      { japanese: 'ひゃく', romaji: 'hyaku', meaning: 'cien' },
      { japanese: 'せん', romaji: 'sen', meaning: 'mil' },
      { japanese: 'まん', romaji: 'man', meaning: 'diez mil' },
    ],
  },
  {
    title: 'Edades',
    subtitle: '年齢',
    entries: [
      { japanese: 'いっさい', romaji: 'issai', meaning: '1 año' },
      { japanese: 'にさい', romaji: 'nisai', meaning: '2 años' },
      { japanese: 'さんさい', romaji: 'sansai', meaning: '3 años' },
      { japanese: 'よんさい', romaji: 'yonsai', meaning: '4 años' },
      { japanese: 'ごさい', romaji: 'gosai', meaning: '5 años' },
      { japanese: 'じゅっさい', romaji: 'jussai', meaning: '10 años' },
      { japanese: 'はたち', romaji: 'hatachi', meaning: '20 años' },
      { japanese: 'さんじゅっさい', romaji: 'sanjussai', meaning: '30 años' },
      { japanese: 'なんさい', romaji: 'nansai', meaning: '¿Cuántos años?' },
    ],
  },
  {
    title: 'Hora',
    subtitle: '時間',
    entries: [
      { japanese: '〜じ', romaji: '~ji', meaning: 'la(s) ~ en punto' },
      { japanese: 'いちじ', romaji: 'ichiji', meaning: 'la una' },
      { japanese: 'にじ', romaji: 'niji', meaning: 'las dos' },
      { japanese: 'さんじ', romaji: 'sanji', meaning: 'las tres' },
      { japanese: '〜はん', romaji: '~han', meaning: 'y media' },
      { japanese: '〜ふん / ぷん', romaji: '~fun / pun', meaning: '~ minutos' },
      { japanese: 'じゅうごふん', romaji: 'juugofun', meaning: '15 minutos' },
      { japanese: 'さんじゅっぷん', romaji: 'sanjuppun', meaning: '30 minutos' },
      { japanese: 'なんじ', romaji: 'nanji', meaning: '¿Qué hora es?' },
    ],
  },
  {
    title: 'Dinero',
    subtitle: 'お金',
    entries: [
      { japanese: '〜えん', romaji: '~en', meaning: '~ yenes' },
      { japanese: 'ひゃくえん', romaji: 'hyakuen', meaning: '100 yenes' },
      { japanese: 'ごひゃくえん', romaji: 'gohyakuen', meaning: '500 yenes' },
      { japanese: 'せんえん', romaji: "sen'en", meaning: '1000 yenes' },
      { japanese: 'いちまんえん', romaji: "ichiman'en", meaning: '10000 yenes' },
      { japanese: 'いくらですか', romaji: 'ikura desu ka', meaning: '¿Cuánto cuesta?' },
      { japanese: 'たかい', romaji: 'takai', meaning: 'caro' },
      { japanese: 'やすい', romaji: 'yasui', meaning: 'barato' },
    ],
  },
]

function NumberCard({ entry, onSpeak }: { entry: NumberEntry; onSpeak: (text: string) => void }) {
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
    </div>
  )
}

export function NumberTable() {
  const { speak } = useSpeech()

  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {NUMBER_GROUPS.map((group) => (
          <div key={group.title} className="mb-8">
            <h2 className="mb-1 text-center text-xl font-extrabold text-slate-950">{group.title}</h2>
            <p className="mb-4 text-center text-sm font-semibold text-slate-400">{group.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {group.entries.map((entry) => (
                <NumberCard key={`${group.title}-${entry.japanese}`} entry={entry} onSpeak={speak} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
