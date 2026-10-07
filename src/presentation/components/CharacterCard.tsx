import { useEffect } from 'react'
import { CharacterCategory } from '../../domain/entities/Character'
import { useSpeech } from '../hooks/useSpeech'
import { CorrectMark, WrongMark } from './TeacherMarks'

interface CharacterCardProps {
  displayText: string
  speakText: string
  category: CharacterCategory
  // 'es' when the prompt is the Spanish meaning (reverse mode).
  lang: 'ja' | 'es'
  hidden?: boolean
  mark?: 'correct' | 'incorrect' | null
}

const CATEGORY_LABELS: Partial<Record<CharacterCategory, string>> = {
  [CharacterCategory.HIRAGANA]: 'Hiragana',
  [CharacterCategory.KATAKANA]: 'Katakana',
  [CharacterCategory.KANJI]: 'Kanji',
  [CharacterCategory.WORD]: 'Palabra',
  [CharacterCategory.PHRASE]: 'Frase',
  [CharacterCategory.NUMBER]: 'Número',
}

function SpeakerIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M11 5 6.5 9H3.5v6h3L11 19V5Z" strokeLinejoin="round" />
      <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18 7a7 7 0 0 1 0 10" strokeLinecap="round" />
    </svg>
  )
}

export function CharacterCard({ displayText, speakText, category, lang, hidden = false, mark = null }: CharacterCardProps) {
  const { speak, isSupported } = useSpeech()

  useEffect(() => {
    if (hidden) {
      speak(speakText)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden, speakText])

  // Kana and single kanji sit in a practice square; words and phrases are written on the line.
  const inSquare = lang === 'ja' && displayText.length <= 2
  const textClass =
    lang === 'es'
      ? 'font-sans text-3xl font-bold sm:text-4xl'
      : inSquare
        ? displayText.length === 2
          ? // Combined kana (きゃ) share the square, so each glyph gets half the width.
            'whitespace-nowrap font-kyokasho text-[3.75rem] font-semibold sm:text-[4.5rem]'
          : 'font-kyokasho text-[5.5rem] font-semibold sm:text-[6.5rem]'
        : 'font-kyokasho text-3xl font-semibold sm:text-[2.75rem]'

  return (
    <div className="flex flex-col items-center justify-center pb-8 pt-10 sm:pb-10 sm:pt-14">
      <div className="relative">
        <div
          className={`flex items-center justify-center ${
            inSquare || hidden ? 'tianzige h-40 w-40 sm:h-48 sm:w-48' : 'min-h-[7rem] px-6 py-4'
          }`}
        >
          {hidden ? (
            <button
              type="button"
              onClick={() => speak(speakText)}
              disabled={!isSupported}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-sumi text-white transition-colors hover:bg-black disabled:bg-keisen"
              title="Escuchar otra vez"
            >
              <SpeakerIcon className="h-7 w-7" />
              <span className="sr-only">Escuchar otra vez</span>
            </button>
          ) : (
            <span className={`${textClass} block select-none text-center leading-tight text-sumi`}>{displayText}</span>
          )}
        </div>

        {mark === 'correct' && (
          <CorrectMark
            stretch={!inSquare && !hidden}
            weight={1.6}
            className="pointer-events-none absolute -left-3 -top-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] sm:-left-4 sm:-top-4 sm:h-[calc(100%+2rem)] sm:w-[calc(100%+2rem)]"
          />
        )}
        {mark === 'incorrect' && <WrongMark weight={7} className="pointer-events-none absolute -left-5 -top-5 h-11 w-11" />}

        {isSupported && !hidden && (
          <button
            type="button"
            onClick={() => speak(speakText)}
            className="absolute -right-4 -top-4 flex h-9 w-9 items-center justify-center rounded-full border border-keisen-strong bg-white text-sumi-soft transition-colors hover:border-sumi hover:text-sumi"
            title="Escuchar pronunciación"
          >
            <SpeakerIcon className="h-[18px] w-[18px]" />
            <span className="sr-only">Escuchar pronunciación</span>
          </button>
        )}
      </div>
      <p className="mt-5 text-sm text-sumi-soft">{CATEGORY_LABELS[category]}</p>
    </div>
  )
}
