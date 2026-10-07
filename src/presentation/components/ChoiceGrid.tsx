export interface ChoiceOption {
  id: string
  label: string
}

interface ChoiceGridProps {
  options: ChoiceOption[]
  selectedId?: string
  correctId: string
  disabled: boolean
  onSelect: (id: string) => void
}

export function ChoiceGrid({ options, selectedId, correctId, disabled, onSelect }: ChoiceGridProps) {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const isSelected = selectedId === option.id
        const isCorrectChoice = option.id === correctId

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
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(option.id)}
            className={`h-[56px] rounded-lg border-2 px-5 text-lg font-bold transition-colors disabled:cursor-not-allowed ${stateClasses}`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
