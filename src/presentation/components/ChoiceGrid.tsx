import { Character } from '../../domain/entities/Character'

interface ChoiceGridProps {
  choices: Character[]
  labelFor: (choice: Character) => string
  selectedId?: string
  correctId: string
  disabled: boolean
  onSelect: (characterId: string) => void
}

export function ChoiceGrid({ choices, labelFor, selectedId, correctId, disabled, onSelect }: ChoiceGridProps) {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {choices.map((choice) => {
        const isSelected = selectedId === choice.id
        const isCorrectChoice = choice.id === correctId

        let stateClasses = 'border-slate-200 bg-white text-slate-800 hover:border-accent hover:bg-accent-light'
        if (disabled && isCorrectChoice) {
          stateClasses = 'border-emerald-500 bg-emerald-50 text-emerald-700'
        } else if (disabled && isSelected) {
          stateClasses = 'border-rose-400 bg-rose-50 text-rose-600'
        } else if (disabled) {
          stateClasses = 'border-slate-200 bg-white text-slate-400'
        }

        return (
          <button
            key={choice.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(choice.id)}
            className={`h-[56px] rounded-lg border-2 px-5 text-lg font-bold transition-colors disabled:cursor-not-allowed ${stateClasses}`}
          >
            {labelFor(choice)}
          </button>
        )
      })}
    </div>
  )
}
