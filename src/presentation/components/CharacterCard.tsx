import { CharacterCategory } from '../../domain/entities/Character'
import { useSpeech } from '../hooks/useSpeech'

interface CharacterCardProps {
  character: string
  category: CharacterCategory
}

export function CharacterCard({ character, category }: CharacterCardProps) {
  const { speak, isSupported } = useSpeech()

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
    <div className="flex flex-col items-center justify-center pb-10 pt-24">
      <div className="relative">
        <span
          className={`${fontSizeClass} block select-none px-8 py-4 font-semibold leading-none text-[#c70039]`}
        >
          {character}
        </span>
        {isSupported && (
          <button
            onClick={() => speak(character)}
            className="absolute -right-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition-colors hover:text-[#c70039]"
            title="Escuchar pronunciacion"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M11.553 3.064A.75.75 0 0 1 12 3.75v16.5a.75.75 0 0 1-1.255.555L5.46 16H2.75A.75.75 0 0 1 2 15.25v-6.5A.75.75 0 0 1 2.75 8H5.46l5.285-4.805a.75.75 0 0 1 .808-.131ZM16.53 8.47a.75.75 0 0 1 1.06 0c2.157 2.157 2.157 5.656 0 7.813a.75.75 0 0 1-1.06-1.06 4.126 4.126 0 0 0 0-5.693.75.75 0 0 1 0-1.06ZM19.24 5.66a.75.75 0 0 1 1.06 0 8.502 8.502 0 0 1 0 12.68.75.75 0 1 1-1.06-1.06 7.002 7.002 0 0 0 0-10.56.75.75 0 0 1 0-1.06Z" />
            </svg>
          </button>
        )}
      </div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">
        {categoryLabels[category]}
      </p>
    </div>
  )
}
