import { CharacterCategory } from '../../domain/entities/Character'

interface CharacterCardProps {
  character: string
  category: CharacterCategory
}

export function CharacterCard({ character, category }: CharacterCardProps) {
  const categoryColors: Record<CharacterCategory, string> = {
    [CharacterCategory.HIRAGANA]: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    [CharacterCategory.KATAKANA]: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    [CharacterCategory.KANJI]: 'bg-rose-50 border-rose-200 text-rose-700',
    [CharacterCategory.WORD]: 'bg-amber-50 border-amber-200 text-amber-700',
    [CharacterCategory.PHRASE]: 'bg-purple-50 border-purple-200 text-purple-700',
    [CharacterCategory.NUMBER]: 'bg-cyan-50 border-cyan-200 text-cyan-700',
  }

  const categoryLabels: Record<CharacterCategory, string> = {
    [CharacterCategory.HIRAGANA]: 'Hiragana',
    [CharacterCategory.KATAKANA]: 'Katakana',
    [CharacterCategory.KANJI]: 'Kanji',
    [CharacterCategory.WORD]: 'Palabra',
    [CharacterCategory.PHRASE]: 'Frase',
    [CharacterCategory.NUMBER]: 'Número',
  }

  const fontSizeClass =
    (category === CharacterCategory.WORD || category === CharacterCategory.PHRASE) && character.length > 4
      ? 'text-3xl sm:text-4xl'
      : 'text-8xl sm:text-9xl'

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <span
        className={`${fontSizeClass} font-bold select-none px-12 py-8 rounded-2xl border-2 ${categoryColors[category]}`}
      >
        {character}
      </span>
      <p className="mt-4 text-sm text-gray-400 tracking-wider uppercase">
        {categoryLabels[category]}
      </p>
    </div>
  )
}
