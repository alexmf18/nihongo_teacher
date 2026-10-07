import { useSpeech } from '../hooks/useSpeech'
import { GrammarCategory, CounterItem } from '../../domain/entities/GrammarItem'
import { GrammarRepositoryImpl } from '../../data/repositories/GrammarRepositoryImpl'
import { RefGroup, RefPage, refCard } from './ReferenceLayout'

const repository = new GrammarRepositoryImpl()

function CounterCard({ item, onSpeak }: { item: CounterItem; onSpeak: (text: string) => void }) {
  return (
    <div className={`w-64 ${refCard}`}>
      <div className="mb-3 text-center">
        <span className="font-kyokasho text-3xl font-semibold text-sumi">〜{item.counter}</span>
        <p className="mt-1 text-sm font-bold text-sumi">{item.usage}</p>
      </div>
      <ul className="divide-y divide-dashed divide-keisen">
        {item.examples.map((example) => (
          <li key={example.number} className="flex items-center justify-between gap-3 py-1.5 text-sm">
            <span className="w-5 text-right tabular-nums text-sumi-soft">{example.number}</span>
            <button
              type="button"
              onClick={() => onSpeak(example.reading)}
              className="cursor-pointer rounded-sm text-right text-sumi transition-colors hover:text-accent"
              title="Escuchar pronunciación"
            >
              <span className="font-kyokasho text-base font-semibold">{example.reading}</span>{' '}
              <span className="text-xs text-sumi-soft">({example.romaji})</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CounterTable() {
  const { speak } = useSpeech()
  const items = repository.getByKind(GrammarCategory.COUNTER)

  return (
    <RefPage>
      <RefGroup title="Contadores" subtitle="助数詞">
        {items.map((item) => (
          <CounterCard key={item.id} item={item} onSpeak={speak} />
        ))}
      </RefGroup>
    </RefPage>
  )
}
