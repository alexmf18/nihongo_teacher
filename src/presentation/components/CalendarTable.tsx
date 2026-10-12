import { calendarGroups, CalendarEntry } from '../../data/datasources/calendarData'
import { useSpeech } from '../hooks/useSpeech'
import { RefGroup, RefPage, refCard } from './ReferenceLayout'

function CalendarCard({ entry, onSpeak }: { entry: CalendarEntry; onSpeak: (text: string) => void }) {
  return (
    <div className={`relative flex w-40 flex-col items-center text-center ${refCard}`}>
      {/* Irregular readings have to be learned by heart; the red pen points them out. */}
      {entry.irregular && (
        <span className="absolute right-2 top-1.5 text-[11px] font-bold text-accent">irregular</span>
      )}
      {/* Speaks the kana: TTS engines sometimes misread 四月 or 九月 from the kanji. */}
      <button
        type="button"
        onClick={() => onSpeak(entry.kana)}
        className="cursor-pointer rounded-sm font-kyokasho text-2xl font-semibold leading-tight text-sumi transition-colors hover:text-accent"
        title="Escuchar pronunciación"
      >
        {entry.kanji}
      </button>
      <span className="mt-1 font-kyokasho text-sm text-sumi">{entry.kana}</span>
      <span className="mt-0.5 text-xs leading-tight text-sumi-soft">{entry.romaji[0]}</span>
      <span className="mt-2 text-sm font-bold text-sumi">{entry.meaning}</span>
    </div>
  )
}

export function CalendarTable() {
  const { speak } = useSpeech()

  return (
    <RefPage>
      {calendarGroups.map((group) => (
        <RefGroup key={group.title} title={group.title} subtitle={group.subtitle}>
          {group.entries.map((entry) => (
            <CalendarCard key={entry.id} entry={entry} onSpeak={speak} />
          ))}
        </RefGroup>
      ))}
    </RefPage>
  )
}
