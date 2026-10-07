import { useEffect } from 'react'
import { CharacterCategory } from '../../domain/entities/Character'
import { ProgressStats } from '../../domain/usecases/GetProgressStats'

const CATEGORY_LABELS: Partial<Record<CharacterCategory, string>> = {
  [CharacterCategory.HIRAGANA]: 'Hiragana',
  [CharacterCategory.KATAKANA]: 'Katakana',
  [CharacterCategory.KANJI]: 'Kanji',
  [CharacterCategory.WORD]: 'Palabras',
  [CharacterCategory.PHRASE]: 'Frases',
  [CharacterCategory.NUMBER]: 'Números',
}

interface StatsScreenProps {
  stats: ProgressStats
  onRefresh: () => void
}

function ProgressBar({ percent, label }: { percent: number; label: string }) {
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-keisen"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label={label}
    >
      <div className="h-full rounded-full bg-sumi" style={{ width: `${percent}%` }} />
    </div>
  )
}

// Laid out like a school report card (成績表): one sheet, figures in ink.
export function StatsScreen({ stats, onRefresh }: StatsScreenProps) {
  useEffect(() => {
    onRefresh()
    // Only re-run when this screen (re)mounts, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const summary = [
    { label: 'Dominio general', value: `${stats.overallMasteryPercent}%` },
    { label: 'Mejor racha', value: stats.bestStreak },
    { label: 'Repasadas', value: stats.totalReviewed },
  ]

  return (
    <div className="flex-1 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-xl font-bold text-sumi">Tu progreso</h2>
        <p className="mb-8 mt-1 text-center text-sumi-soft">Repaso general</p>

        <div className="rounded-lg border border-keisen bg-white shadow-sheet">
          <dl className="grid grid-cols-3 divide-x divide-keisen border-b border-keisen">
            {summary.map((item) => (
              <div key={item.label} className="flex flex-col-reverse px-3 py-5 text-center sm:px-6">
                <dt className="mt-1 text-sm text-sumi-soft">{item.label}</dt>
                <dd className="font-kyokasho text-3xl font-semibold tabular-nums text-sumi">{item.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="divide-y divide-keisen">
            {stats.byCategory.map((cat) => {
              const label = CATEGORY_LABELS[cat.category] ?? cat.category
              return (
                <li key={cat.category} className="grid grid-cols-[6.5rem_1fr_8rem] items-center gap-4 px-5 py-4 sm:px-6">
                  <span className="font-bold text-sumi">{label}</span>
                  <ProgressBar percent={cat.masteryPercent} label={`Dominio de ${label}`} />
                  <span className="text-right text-sm tabular-nums text-sumi-soft">
                    {cat.mastered} de {cat.total}
                    <span className="ml-2 inline-block w-10 font-bold text-sumi">{cat.masteryPercent}%</span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
