import { FormEvent, useRef, useEffect } from 'react'

interface RomajiInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled: boolean
}

export function RomajiInput({ value, onChange, onSubmit, disabled }: RomajiInputProps) {
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
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Escribe el romaji..."
          className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          autoComplete="off"
          autoFocus
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Comprobar
        </button>
      </div>
    </form>
  )
}
