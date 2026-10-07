import { CorrectMark, WrongMark } from './TeacherMarks'

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
        const showCorrect = disabled && isCorrectChoice
        const showWrong = disabled && isSelected && !isCorrectChoice

        let stateClasses = 'border-keisen-strong bg-white text-sumi hover:border-sumi'
        if (showCorrect) {
          stateClasses = 'border-accent bg-accent-light text-sumi'
        } else if (showWrong) {
          stateClasses = 'border-keisen-strong bg-white text-sumi-soft line-through decoration-accent decoration-2'
        } else if (disabled) {
          stateClasses = 'border-keisen bg-white text-sumi-soft'
        }

        return (
          <button
            key={option.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(option.id)}
            className={`relative h-14 rounded-md border px-5 text-lg font-medium transition-colors disabled:cursor-default ${stateClasses}`}
          >
            {option.label}
            {showCorrect && <CorrectMark className="absolute left-3 top-1/2 h-7 w-7 -translate-y-1/2" />}
            {showWrong && <WrongMark className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2" />}
          </button>
        )
      })}
    </div>
  )
}
