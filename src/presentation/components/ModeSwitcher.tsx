import { PracticeMode, PRACTICE_MODE_LABELS } from '../../domain/entities/PracticeMode'

interface ModeSwitcherProps {
  mode: PracticeMode
  modes: PracticeMode[]
  onSelect: (mode: PracticeMode) => void
}

// The active mode is underlined in red pen.
export function ModeSwitcher({ mode, modes, onSelect }: ModeSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1">
      {modes.map((candidate) => {
        const isActive = candidate === mode
        return (
          <button
            key={candidate}
            type="button"
            onClick={() => onSelect(candidate)}
            aria-pressed={isActive}
            className={`border-b-2 pb-1 pt-0.5 text-sm transition-colors ${
              isActive
                ? 'border-accent font-bold text-sumi'
                : 'border-transparent font-medium text-sumi-soft hover:border-keisen-strong hover:text-sumi'
            }`}
          >
            {PRACTICE_MODE_LABELS[candidate]}
          </button>
        )
      })}
    </div>
  )
}
