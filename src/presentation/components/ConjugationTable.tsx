import { useSpeech } from '../hooks/useSpeech'
import { GrammarCategory, InflectableItem, wordClassLabel } from '../../domain/entities/GrammarItem'
import { formShortLabel } from '../../domain/entities/ConjugationFormLabels'
import { GrammarRepositoryImpl } from '../../data/repositories/GrammarRepositoryImpl'

type InflectableKind = GrammarCategory.CONJUGATION | GrammarCategory.ADJECTIVE

const HEADINGS: Record<InflectableKind, { title: string; subtitle: string }> = {
  [GrammarCategory.CONJUGATION]: { title: 'Conjugación de verbos', subtitle: '動詞の活用 (N5)' },
  [GrammarCategory.ADJECTIVE]: { title: 'Adjetivos い y な', subtitle: '形容詞の活用 (N5)' },
}

const repository = new GrammarRepositoryImpl()

function ConjugationEntryCard({ item, onSpeak }: { item: InflectableItem; onSpeak: (text: string) => void }) {
  return (
    <div className="w-72 rounded-lg border border-accent-border bg-white p-4 shadow-[0_8px_18px_rgba(15,23,42,0.04)] transition-colors hover:border-accent hover:bg-accent-light">
      <div className="mb-3 text-center">
        <button
          onClick={() => onSpeak(item.dictionaryForm)}
          className="cursor-pointer text-3xl font-semibold text-accent transition-transform hover:scale-105"
          title="Escuchar pronunciacion"
        >
          {item.dictionaryForm}
        </button>
        <p className="mt-1 text-sm font-bold text-slate-600">{item.meaning}</p>
        <p className="mt-0.5 text-xs text-slate-400">{wordClassLabel(item)}</p>
      </div>
      <div className="space-y-1.5">
        {item.forms.map((form) => (
          <div key={form.formName} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-400">{formShortLabel(form.formName)}</span>
            <button
              onClick={() => onSpeak(form.value)}
              className="cursor-pointer font-semibold text-slate-700 transition-colors hover:text-accent"
            >
              {form.value}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ConjugationTable({ kind = GrammarCategory.CONJUGATION }: { kind?: InflectableKind }) {
  const { speak } = useSpeech()
  const items: InflectableItem[] = repository.getByKind(kind)
  const { title, subtitle } = HEADINGS[kind]

  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="mb-1 text-center text-xl font-extrabold text-slate-950">{title}</h2>
        <p className="mb-6 text-center text-sm font-semibold text-slate-400">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {items.map((item) => (
            <ConjugationEntryCard key={item.id} item={item} onSpeak={speak} />
          ))}
        </div>
      </div>
    </div>
  )
}
