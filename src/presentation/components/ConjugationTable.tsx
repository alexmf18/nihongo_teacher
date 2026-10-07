import { useSpeech } from '../hooks/useSpeech'
import { GrammarCategory, InflectableItem, wordClassLabel } from '../../domain/entities/GrammarItem'
import { formShortLabel } from '../../domain/entities/ConjugationFormLabels'
import { GrammarRepositoryImpl } from '../../data/repositories/GrammarRepositoryImpl'
import { RefGroup, RefPage, SpeakableText, refCard } from './ReferenceLayout'

type InflectableKind = GrammarCategory.CONJUGATION | GrammarCategory.ADJECTIVE

const HEADINGS: Record<InflectableKind, { title: string; subtitle: string }> = {
  [GrammarCategory.CONJUGATION]: { title: 'Conjugación de verbos', subtitle: '動詞の活用 (N5)' },
  [GrammarCategory.ADJECTIVE]: { title: 'Adjetivos い y な', subtitle: '形容詞の活用 (N5)' },
}

const repository = new GrammarRepositoryImpl()

function ConjugationEntryCard({ item, onSpeak }: { item: InflectableItem; onSpeak: (text: string) => void }) {
  return (
    <div className={`w-72 ${refCard}`}>
      <div className="mb-3 text-center">
        <SpeakableText text={item.dictionaryForm} onSpeak={onSpeak} className="text-3xl" />
        <p className="mt-1 text-sm font-bold text-sumi">{item.meaning}</p>
        <p className="mt-0.5 text-xs text-sumi-soft">{wordClassLabel(item)}</p>
      </div>
      <ul className="divide-y divide-dashed divide-keisen">
        {item.forms.map((form) => (
          <li key={form.formName} className="flex items-center justify-between gap-3 py-1.5 text-sm">
            <span className="font-kyokasho text-sumi-soft">{formShortLabel(form.formName)}</span>
            <SpeakableText text={form.value} onSpeak={onSpeak} className="text-base" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ConjugationTable({ kind = GrammarCategory.CONJUGATION }: { kind?: InflectableKind }) {
  const { speak } = useSpeech()
  const items: InflectableItem[] = repository.getByKind(kind)
  const { title, subtitle } = HEADINGS[kind]

  return (
    <RefPage>
      <RefGroup title={title} subtitle={subtitle}>
        {items.map((item) => (
          <ConjugationEntryCard key={item.id} item={item} onSpeak={speak} />
        ))}
      </RefGroup>
    </RefPage>
  )
}
