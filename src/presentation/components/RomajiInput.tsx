import { FormEvent, useRef, useEffect } from 'react'

interface RomajiInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled: boolean
  placeholder?: string
}

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
          className="h-[70px] w-full border-2 border-input-border bg-white px-5 text-center text-2xl font-bold text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-accent disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50"
          autoComplete="off"
          autoFocus
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="flex h-[56px] min-w-[230px] items-center justify-center gap-3 rounded-lg bg-accent px-8 text-base font-bold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          Comprobar
          <span aria-hidden="true" className="text-2xl leading-none">→</span>
        </button>
      </div>
    </form>
  )
}
