import { CharacterCategory } from '../../domain/entities/Character'
import { useSpeech } from '../hooks/useSpeech'

interface CharacterCardProps {
  character: string
  category: CharacterCategory
}

export function CharacterCard({ character, category }: CharacterCardProps) {
  const { speak, isSupported } = useSpeech()

  const categoryColors: Record<CharacterCategory, string> = {
    [CharacterCategory.HIRAGANA]: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    [CharacterCategory.KATAKANA]: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    [CharacterCategory.KANJI]: 'bg-rose-50 border-rose-200 text-rose-700',
    [CharacterCategory.WORD]: 'bg-amber-50 border-amber-200 text-amber-700',
    [CharacterCategory.PHRASE]: 'bg-purple-50 border-purple-200 text-purple-700',
    [CharacterCategory.NUMBER]: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    [CharacterCategory.HIRAGANA_TABLE]: 'bg-gray-50 border-gray-200 text-gray-700',
    [CharacterCategory.KATAKANA_TABLE]: 'bg-gray-50 border-gray-200 text-gray-700',
    [CharacterCategory.KANJI_TABLE]: 'bg-gray-50 border-gray-200 text-gray-700',
  }

  const categoryLabels: Record<CharacterCategory, string> = {
    [CharacterCategory.HIRAGANA]: 'Hiragana',
    [CharacterCategory.KATAKANA]: 'Katakana',
    [CharacterCategory.KANJI]: 'Kanji',
    [CharacterCategory.WORD]: 'Palabra',
    [CharacterCategory.PHRASE]: 'Frase',
    [CharacterCategory.NUMBER]: 'Número',
    [CharacterCategory.HIRAGANA_TABLE]: 'Tabla',
    [CharacterCategory.KATAKANA_TABLE]: 'Tabla',
    [CharacterCategory.KANJI_TABLE]: 'Tabla',
  }

  const fontSizeClass =
    (category === CharacterCategory.WORD || category === CharacterCategory.PHRASE) && character.length > 4
      ? 'text-3xl sm:text-4xl'
      : 'text-8xl sm:text-9xl'

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <span
          className={`${fontSizeClass} font-bold select-none px-12 py-8 rounded-2xl border-2 ${categoryColors[category]}`}
        >
          {character}
        </span>
        {isSupported && (
          <button
            onClick={() => speak(character)}
            className="absolute -top-2 -right-2 w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 hover:border-gray-400 transition-colors shadow-sm"
            title="Escuchar pronunciación"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600">
              <path d="M11.553 3.064A.75.75 0 0 1 12 3.75v16.5a.75.75 0 0 1-1.255.555L5.46 16H2.75A.75.75 0 0 1 2 15.25v-6.5A.75.75 0 0 1 2.75 8H5.46l5.285-4.805a.75.75 0 0 1 .808-.131ZM16.53 8.47a.75.75 0 0 1 1.06 0c2.157 2.157 2.157 5.656 0 7.813a.75.75 0 0 1-1.06-1.06 4.126 4.126 0 0 0 0-5.693.75.75 0 0 1 0-1.06ZM19.24 5.66a.75.75 0 0 1 1.06 0 8.502 8.502 0 0 1 0 12.68.75.75 0 1 1-1.06-1.06 7.002 7.002 0 0 0 0-10.56.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-400 tracking-wider uppercase">
        {categoryLabels[category]}
      </p>
    </div>
  )
}
