import { useEffect } from 'react'
import { SentenceItem } from '../../domain/entities/GrammarItem'
import { useSpeech } from '../hooks/useSpeech'

interface SentencePromptCardProps {
  item: SentenceItem
  // Dictation hides the translation and plays the sentence instead.
  dictation: boolean
  answered: boolean
}

function SpeakerIcon({ className }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.553 3.064A.75.75 0 0 1 12 3.75v16.5a.75.75 0 0 1-1.255.555L5.46 16H2.75A.75.75 0 0 1 2 15.25v-6.5A.75.75 0 0 1 2.75 8H5.46l5.285-4.805a.75.75 0 0 1 .808-.131ZM16.53 8.47a.75.75 0 0 1 1.06 0c2.157 2.157 2.157 5.656 0 7.813a.75.75 0 0 1-1.06-1.06 4.126 4.126 0 0 0 0-5.693.75.75 0 0 1 0-1.06ZM19.24 5.66a.75.75 0 0 1 1.06 0 8.502 8.502 0 0 1 0 12.68.75.75 0 1 1-1.06-1.06 7.002 7.002 0 0 0 0-10.56.75.75 0 0 1 0-1.06Z" />
    </svg>
  )
}

export function SentencePromptCard({ item, dictation, answered }: SentencePromptCardProps) {
  const { speak, isSupported } = useSpeech()
  const sentence = item.chunks.join('')

  useEffect(() => {
    if (dictation) speak(sentence)
    // Only replay when a new sentence (or dictation mode) comes up.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, dictation])

  return (
    <div className="flex flex-col items-center justify-center pb-8 pt-12 text-center sm:pt-14">
      {dictation ? (
        <button
          type="button"
          onClick={() => speak(sentence)}
          disabled={!isSupported}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-sumi text-white transition-colors hover:bg-black disabled:bg-keisen"
          title="Escuchar otra vez"
        >
          <SpeakerIcon className="h-9 w-9" />
          <span className="sr-only">Escuchar otra vez</span>
        </button>
      ) : (
        <p className="max-w-lg text-2xl font-bold leading-snug text-sumi sm:text-[1.75rem]">{item.translation}</p>
      )}

      {dictation && answered && <p className="mt-4 text-sumi-soft">{item.translation}</p>}

      {!dictation && answered && isSupported && (
        <button
          type="button"
          onClick={() => speak(sentence)}
          className="mt-3 flex items-center gap-1.5 rounded-md text-sm text-sumi-soft hover:text-sumi"
        >
          <SpeakerIcon className="h-4 w-4" />
          Escuchar la frase
        </button>
      )}

      <p className="mt-5 text-sm text-sumi-soft">
        {dictation ? 'Escucha y ordena' : 'Ordena la frase'}
      </p>
    </div>
  )
}
