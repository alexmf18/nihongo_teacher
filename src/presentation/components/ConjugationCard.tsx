import { InflectableItem, wordClassLabel } from '../../domain/entities/GrammarItem'
import { formLabel } from '../../domain/entities/ConjugationFormLabels'

interface ConjugationCardProps {
  item: InflectableItem
  formName: string
}

export function ConjugationCard({ item, formName }: ConjugationCardProps) {
  return (
    <div className="flex flex-col items-center justify-center pb-8 pt-12 text-center sm:pt-16">
      <span className="block font-kyokasho text-6xl font-semibold leading-none text-sumi">{item.dictionaryForm}</span>
      <p className="mt-4 text-sumi-soft">
        {item.meaning}
        <span className="mx-2 text-keisen-strong" aria-hidden="true">
          /
        </span>
        {wordClassLabel(item)}
      </p>
      {/* The question itself: which form to write. */}
      <p className="mt-6 text-lg font-bold text-sumi">{formLabel(formName)}</p>
    </div>
  )
}
