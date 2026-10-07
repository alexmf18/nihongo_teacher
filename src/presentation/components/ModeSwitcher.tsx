import { PracticeMode, PRACTICE_MODE_LABELS } from '../../domain/entities/PracticeMode'

interface ModeSwitcherProps {
  mode: PracticeMode
  modes: PracticeMode[]
  onSelect: (mode: PracticeMode) => void
}

export function ModeSwitcher({ mode, modes, onSelect }: ModeSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {modes.map((candidate) => {
        const isActive = candidate === mode
        return (
          <button
            key={candidate}
            type="button"
            onClick={() => onSelect(candidate)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              isActive
                ? 'bg-accent text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {PRACTICE_MODE_LABELS[candidate]}
          </button>
        )
      })}
    </div>
  )
}
