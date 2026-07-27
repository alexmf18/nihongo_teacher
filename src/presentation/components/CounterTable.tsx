import { useSpeech } from '../hooks/useSpeech'
import { GrammarCategory, CounterItem } from '../../domain/entities/GrammarItem'
import { GrammarRepositoryImpl } from '../../data/repositories/GrammarRepositoryImpl'

function CounterCard({ item, onSpeak }: { item: CounterItem; onSpeak: (text: string) => void }) {
  return (
    <div className="w-64 rounded-lg border border-accent-border bg-white p-4 shadow-[0_8px_18px_rgba(15,23,42,0.04)] transition-colors hover:border-accent hover:bg-accent-light">
      <div className="mb-3 text-center">
        <span className="text-3xl font-semibold text-accent">〜{item.counter}</span>
        <p className="mt-1 text-sm font-bold text-slate-600">{item.usage}</p>
      </div>
      <div className="space-y-1.5">
        {item.examples.map((example) => (
          <div key={example.number} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-400">{example.number}</span>
            <button
              onClick={() => onSpeak(example.reading)}
              className="cursor-pointer font-semibold text-slate-700 transition-colors hover:text-accent"
            >
              {example.reading} <span className="text-xs text-slate-400">({example.romaji})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CounterTable() {
  const { speak } = useSpeech()
  const repository = new GrammarRepositoryImpl()
  const items = repository.getByKind(GrammarCategory.COUNTER)

  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="mb-1 text-center text-xl font-extrabold text-slate-950">Contadores</h2>
        <p className="mb-6 text-center text-sm font-semibold text-slate-400">助数詞</p>
        <div className="flex flex-wrap justify-center gap-4">
          {items.map((item) => (
            <CounterCard key={item.id} item={item} onSpeak={speak} />
          ))}
        </div>
      </div>
    </div>
  )
}
