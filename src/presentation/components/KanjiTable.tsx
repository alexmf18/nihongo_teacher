import { useSpeech } from '../hooks/useSpeech'
import { Character, CharacterCategory, KanjiGroup, KANJI_GROUP_LABELS } from '../../domain/entities/Character'
import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository'
import { CharacterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl'

const repository: ICharacterRepository = new CharacterRepositoryImpl()

const KANJI_GROUPS = Object.values(KanjiGroup).map((group) => ({
  group,
  ...KANJI_GROUP_LABELS[group],
  entries: repository.getByCategory(CharacterCategory.KANJI).filter((kanji) => kanji.kanjiGroup === group),
}))

function KanjiCard({ entry, onSpeak }: { entry: Character; onSpeak: (text: string) => void }) {
  return (
    <div className="flex w-40 flex-col items-center rounded-lg border border-accent-border bg-white p-4 shadow-[0_8px_18px_rgba(15,23,42,0.04)] transition-colors hover:border-accent hover:bg-accent-light">
      <button
        onClick={() => onSpeak(entry.character)}
        className="mb-2 cursor-pointer text-5xl font-semibold text-accent transition-transform hover:scale-110"
        title="Escuchar pronunciacion"
      >
        {entry.character}
      </button>
      {entry.readings && (
        <span className="mb-1 text-center text-xs leading-tight text-slate-400">{entry.readings.onyomi}</span>
      )}
      {entry.readings?.kunyomi && (
        <span className="mb-1 text-center text-xs leading-tight text-slate-400">{entry.readings.kunyomi}</span>
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
          <div key={group.group} className="mb-8">
            <h2 className="mb-1 text-center text-xl font-extrabold text-slate-950">{group.title}</h2>
            <p className="mb-4 text-center text-sm font-semibold text-slate-400">{group.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {group.entries.map((entry) => (
                <KanjiCard key={entry.id} entry={entry} onSpeak={speak} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
