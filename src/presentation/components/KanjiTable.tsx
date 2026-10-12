import { useSpeech } from '../hooks/useSpeech'
import { Character, CharacterCategory } from '../../domain/entities/Character'
import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository'
import { kanaToRomaji } from '../../domain/services/kana'
import { CharacterRepositoryImpl } from '../../data/repositories/CharacterRepositoryImpl'
import { RefGroup, RefPage, SpeakableText, refCard } from './ReferenceLayout'

const repository: ICharacterRepository = new CharacterRepositoryImpl()

const BAND_SIZE = 50

// Most used first, in bands of 50 so the page has landmarks.
const KANJI_BANDS = (() => {
  const kanji = [...repository.getByCategory(CharacterCategory.KANJI)].sort(
    (a, b) => (a.frequencyRank ?? Infinity) - (b.frequencyRank ?? Infinity)
  )
  const bands: { title: string; entries: Character[] }[] = []
  for (let start = 0; start < kanji.length; start += BAND_SIZE) {
    const entries = kanji.slice(start, start + BAND_SIZE)
    bands.push({
      title: start === 0 ? `Los ${BAND_SIZE} más usados` : `Del ${start + 1} al ${start + entries.length}`,
      entries,
    })
  }
  return bands
})()

// A kun'yomi with its okurigana (after the dot) in a lighter ink: あ.う → あ(う).
function KanaReading({ reading }: { reading: string }) {
  const [stem, okurigana] = reading.split('.')
  return (
    <span>
      {stem}
      {okurigana && <span className="text-sumi-soft">{okurigana}</span>}
    </span>
  )
}

// 音 and 訓 are how Japanese dictionaries mark on'yomi and kun'yomi readings.
function Readings({ marker, readings }: { marker: string; readings: string[] }) {
  if (readings.length === 0) return null
  const romaji = readings.map((r) => kanaToRomaji(r.replace('.', '')) ?? '').join(', ')

  return (
    <div className="mt-1 flex w-full items-baseline gap-1.5 text-xs leading-snug">
      <span className="font-kyokasho font-semibold text-sumi" aria-hidden="true">
        {marker}
      </span>
      <span className="min-w-0">
        <span className="font-kyokasho text-sm text-sumi">
          {readings.map((reading, index) => (
            <span key={reading}>
              {index > 0 && '・'}
              <KanaReading reading={reading} />
            </span>
          ))}
        </span>
        <span className="block text-sumi-soft">{romaji}</span>
      </span>
    </div>
  )
}

function KanjiCard({ entry, onSpeak }: { entry: Character; onSpeak: (text: string) => void }) {
  return (
    <div className={`relative flex w-40 flex-col items-center ${refCard}`}>
      {entry.frequencyRank && (
        <span className="absolute left-2 top-1.5 text-[11px] tabular-nums text-sumi-soft">{entry.frequencyRank}</span>
      )}
      <div className="tianzige mb-2 flex h-20 w-20 items-center justify-center">
        <SpeakableText text={entry.character} onSpeak={onSpeak} className="text-5xl leading-none" />
      </div>
      {entry.readings && (
        <>
          <Readings marker="音" readings={entry.readings.onyomi} />
          <Readings marker="訓" readings={entry.readings.kunyomi} />
        </>
      )}
      <span className="mt-2 text-center text-sm font-bold text-sumi">{entry.meaning}</span>
    </div>
  )
}

export function KanjiTable() {
  const { speak } = useSpeech()

  return (
    <RefPage>
      <p className="mx-auto max-w-2xl text-center text-sm text-sumi-soft">
        Los {KANJI_BANDS.reduce((sum, band) => sum + band.entries.length, 0)} kanji de los niveles JLPT N5 y N4,
        ordenados por lo frecuentes que son en la prensa japonesa. El número de cada tarjeta es su puesto.
      </p>
      {KANJI_BANDS.map((band) => (
        <RefGroup key={band.title} title={band.title}>
          {band.entries.map((entry) => (
            <KanjiCard key={entry.id} entry={entry} onSpeak={speak} />
          ))}
        </RefGroup>
      ))}
    </RefPage>
  )
}
