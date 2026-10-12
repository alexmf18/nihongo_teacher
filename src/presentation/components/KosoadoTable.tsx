import { useSpeech } from '../hooks/useSpeech'
import { RefGroup, RefPage, refCard } from './ReferenceLayout'
import { GrammarCategory, KosoadoItem } from '../../domain/entities/GrammarItem'
import { KOSOADO_ROWS, KOSOADO_SERIES_LABELS, KOSOADO_SERIES_ORDER } from '../../domain/entities/Kosoado'
import { GrammarRepositoryImpl } from '../../data/repositories/GrammarRepositoryImpl'

const repository = new GrammarRepositoryImpl()

// Row label in its own column from sm up; on a phone it sits above its four words.
const gridClass = 'grid grid-cols-4 gap-x-2 sm:grid-cols-[11rem_repeat(4,minmax(0,1fr))] sm:gap-x-3'

function KosoadoGrid({ onSpeak }: { onSpeak: (text: string) => void }) {
  return (
    <section className="rounded-md border border-keisen bg-white p-4 sm:p-6">
      <div className={`${gridClass} border-b border-keisen pb-3`}>
        <span className="hidden sm:block" aria-hidden="true" />
        {KOSOADO_SERIES_ORDER.map((series) => (
          <div key={series} className="text-center">
            <p className="font-kyokasho text-3xl font-semibold text-accent">{KOSOADO_SERIES_LABELS[series].kana}</p>
            <p className="mt-1 text-xs leading-tight text-sumi-soft">{KOSOADO_SERIES_LABELS[series].label}</p>
          </div>
        ))}
      </div>

      {KOSOADO_ROWS.map((row) => (
        <div key={row.kind} className={`${gridClass} items-center border-b border-keisen py-4 last:border-b-0 last:pb-0`}>
          <div className="col-span-4 mb-2 sm:col-span-1 sm:mb-0">
            <p className="text-sm font-bold text-sumi">{row.label}</p>
            <p className="text-xs leading-snug text-sumi-soft">{row.usage}</p>
          </div>
          {row.words.map((word, index) => (
            <div key={word} className="text-center">
              <button
                type="button"
                onClick={() => onSpeak(word)}
                className="cursor-pointer rounded-sm font-kyokasho text-xl font-semibold text-sumi transition-colors hover:text-accent sm:text-2xl"
                title="Escuchar pronunciación"
              >
                {word}
              </button>
              <p className="mt-0.5 text-xs leading-tight text-sumi-soft">{row.meanings[index]}</p>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}

function ExampleCard({ item, onSpeak }: { item: KosoadoItem; onSpeak: (text: string) => void }) {
  const fullSentence = `${item.sentenceParts[0]}${item.word}${item.sentenceParts[1]}`

  return (
    <div className={`flex w-64 flex-col items-center text-center ${refCard}`}>
      <button
        type="button"
        onClick={() => onSpeak(fullSentence)}
        className="cursor-pointer rounded-sm font-kyokasho text-xl font-semibold leading-snug text-sumi transition-colors hover:text-sumi-soft"
        title="Escuchar pronunciación"
      >
        {item.sentenceParts[0]}
        <span className="text-accent">{item.word}</span>
        {item.sentenceParts[1]}
      </button>
      <span className="mt-2 text-sm text-sumi">{item.translation}</span>
      <span className="mt-1 text-xs text-sumi-soft">{item.situation}</span>
    </div>
  )
}

export function KosoadoTable() {
  const { speak } = useSpeech()
  const examples = repository.getByKind(GrammarCategory.KOSOADO)

  return (
    <RefPage>
      <KosoadoGrid onSpeak={speak} />
      {KOSOADO_ROWS.map((row) => {
        const rowExamples = examples.filter((item) => row.words.includes(item.word))
        if (rowExamples.length === 0) return null
        return (
          <RefGroup key={row.kind} title={row.label} subtitle={row.words.join('・')}>
            {rowExamples.map((item) => (
              <ExampleCard key={item.id} item={item} onSpeak={speak} />
            ))}
          </RefGroup>
        )
      })}
    </RefPage>
  )
}
