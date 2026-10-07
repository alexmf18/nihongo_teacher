import { useSpeech } from '../hooks/useSpeech'
import { Character, CharacterCategory, KanjiGroup, KANJI_GROUP_LABELS } from '../../domain/entities/Character'
import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository'
import { CharacterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl'
import { RefGroup, RefPage, SpeakableText, refCard } from './ReferenceLayout'

const repository: ICharacterRepository = new CharacterRepositoryImpl()

const KANJI_GROUPS = Object.values(KanjiGroup).map((group) => ({
  group,
  ...KANJI_GROUP_LABELS[group],
  entries: repository.getByCategory(CharacterCategory.KANJI).filter((kanji) => kanji.kanjiGroup === group),
}))

// 音 and 訓 are how Japanese dictionaries mark on'yomi and kun'yomi readings.
function Reading({ marker, text }: { marker: string; text: string }) {
  return (
    <span className="flex items-baseline gap-1.5 text-xs leading-snug text-sumi-soft">
      <span className="font-kyokasho font-semibold text-sumi" aria-hidden="true">
        {marker}
      </span>
      {text}
    </span>
  )
}

function KanjiCard({ entry, onSpeak }: { entry: Character; onSpeak: (text: string) => void }) {
  return (
    <div className={`flex w-40 flex-col items-center ${refCard}`}>
      <div className="tianzige mb-3 flex h-20 w-20 items-center justify-center">
        <SpeakableText text={entry.character} onSpeak={onSpeak} className="text-5xl leading-none" />
      </div>
      {entry.readings && <Reading marker="音" text={entry.readings.onyomi} />}
      {entry.readings?.kunyomi && <Reading marker="訓" text={entry.readings.kunyomi} />}
      <span className="mt-2 text-center text-sm font-bold text-sumi">{entry.meaning}</span>
    </div>
  )
}

export function KanjiTable() {
  const { speak } = useSpeech()

  return (
    <RefPage>
      {KANJI_GROUPS.map((group) => (
        <RefGroup key={group.group} title={group.title} subtitle={group.subtitle}>
          {group.entries.map((entry) => (
            <KanjiCard key={entry.id} entry={entry} onSpeak={speak} />
          ))}
        </RefGroup>
      ))}
    </RefPage>
  )
}
