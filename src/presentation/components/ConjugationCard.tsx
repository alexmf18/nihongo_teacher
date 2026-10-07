import { InflectableItem, wordClassLabel } from '../../domain/entities/GrammarItem'
import { formLabel } from '../../domain/entities/ConjugationFormLabels'

interface ConjugationCardProps {
  item: InflectableItem
  formName: string
}

export function ConjugationCard({ item, formName }: ConjugationCardProps) {
  return (
    <div className="flex flex-col items-center justify-center pb-6 pt-16 text-center">
      <span className="block text-6xl font-semibold leading-none text-accent">{item.dictionaryForm}</span>
      <p className="mt-3 text-sm text-slate-400">{item.meaning}</p>
      <p className="mt-0.5 text-xs text-slate-400">{wordClassLabel(item)}</p>
      <p className="mt-5 text-sm font-bold text-slate-600">{formLabel(formName)}</p>
    </div>
  )
}
