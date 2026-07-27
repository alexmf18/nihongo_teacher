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

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full bg-emerald-600" style={{ width: `${percent}%` }} />
    </div>
  )
}

export function StatsScreen({ stats, onRefresh }: StatsScreenProps) {
  useEffect(() => {
    onRefresh()
    // Only re-run when this screen (re)mounts, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex-1 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-1 text-center text-xl font-extrabold text-slate-950">Tu progreso</h2>
        <p className="mb-8 text-center text-sm font-semibold text-slate-400">Repaso general</p>

        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-5 text-center shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
            <p className="text-3xl font-extrabold text-accent">{stats.overallMasteryPercent}%</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Dominio general</p>
          </div>
          <div className="rounded-xl bg-white p-5 text-center shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
            <p className="text-3xl font-extrabold text-accent">{stats.bestStreak}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Mejor racha</p>
          </div>
          <div className="rounded-xl bg-white p-5 text-center shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
            <p className="text-3xl font-extrabold text-accent">{stats.totalReviewed}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Repasadas</p>
          </div>
        </div>

        <div className="space-y-5 rounded-xl bg-white p-6 shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
          {stats.byCategory.map((cat) => (
            <div key={cat.category}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-bold text-slate-700">{CATEGORY_LABELS[cat.category] ?? cat.category}</span>
                <span className="text-slate-400">
                  {cat.mastered}/{cat.total} ({cat.masteryPercent}%)
                </span>
              </div>
              <ProgressBar percent={cat.masteryPercent} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
