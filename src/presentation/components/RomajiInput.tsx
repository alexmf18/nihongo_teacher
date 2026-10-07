import { FormEvent, useRef, useEffect } from 'react'

interface RomajiInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled: boolean
  placeholder?: string
}

// The answer is written on a notebook line rather than in a boxed field.
export function RomajiInput({ value, onChange, onSubmit, disabled, placeholder = 'Escribe el romaji...' }: RomajiInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus()
    }
  }, [disabled])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!disabled && value.trim()) {
      onSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full">
      <div className="flex flex-col items-center gap-8">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          aria-label="Tu respuesta"
          className="h-16 w-full border-0 border-b-2 border-keisen-strong bg-transparent px-2 text-center text-2xl font-medium text-sumi outline-none transition-colors placeholder:text-base placeholder:font-normal placeholder:text-sumi-soft focus:border-sumi focus-visible:outline-none disabled:cursor-not-allowed disabled:text-sumi-soft sm:text-3xl"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          autoFocus
        />
        {/* Once answered the feedback below takes over with "Siguiente". */}
        {!disabled && (
          <button
            type="submit"
            disabled={!value.trim()}
            className="h-12 min-w-[200px] rounded-md bg-sumi px-8 text-base font-bold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-keisen disabled:text-sumi-soft"
          >
            Comprobar
          </button>
        )}
      </div>
    </form>
  )
}
