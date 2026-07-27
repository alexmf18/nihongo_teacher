import { ConjugationItem } from '../../domain/entities/GrammarItem'

interface ConjugationCardProps {
  item: ConjugationItem
  formName: string
}

const FORM_LABELS: Record<string, string> = {
  dictionary: 'Diccionario',
  masu: 'Presente educado (ます)',
  past: 'Pasado (た / ました)',
  negative: 'Negativo (ない / ません)',
  te: 'Forma て',
}

export function ConjugationCard({ item, formName }: ConjugationCardProps) {
  return (
    <div className="flex flex-col items-center justify-center pb-6 pt-16 text-center">
      <span className="block text-6xl font-semibold leading-none text-accent">{item.dictionaryForm}</span>
      <p className="mt-3 text-sm text-slate-400">{item.meaning}</p>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">
        {FORM_LABELS[formName] ?? formName}
      </p>
    </div>
  )
}
