import { useState } from 'react'
import { CharacterCategory } from '../../domain/entities/Character'
import { KanaRow, KANA_ROW_GROUPS, KANA_ROW_LABELS } from '../../domain/entities/KanaRow'
import { toKatakana } from '../../domain/services/kana'

interface KanaRowPickerProps {
  category: CharacterCategory
  selected: KanaRow[]
  onChange: (rows: KanaRow[]) => void
}

const MAX_LISTED_ROWS = 6

export function KanaRowPicker({ category, selected, onChange }: KanaRowPickerProps) {
  const [open, setOpen] = useState(false)

  const labelFor = (row: KanaRow) =>
    category === CharacterCategory.KATAKANA ? toKatakana(KANA_ROW_LABELS[row]) : KANA_ROW_LABELS[row]

  const summary =
    selected.length === 0
      ? 'todas'
      : selected.length > MAX_LISTED_ROWS
        ? `${selected.length} filas`
        : selected.map(labelFor).join(' ')

  const toggle = (row: KanaRow) => {
    onChange(selected.includes(row) ? selected.filter((r) => r !== row) : [...selected, row])
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-md text-sm text-sumi-soft hover:text-sumi"
      >
        Filas: <span className="font-kyokasho font-semibold text-sumi">{summary}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="mt-3 space-y-3 rounded-md border border-keisen bg-papel p-4">
          {KANA_ROW_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-wrap items-center gap-1.5">
              <span className="w-24 shrink-0 text-xs font-bold text-sumi-soft">{group.label}</span>
              {group.rows.map((row) => {
                const isOn = selected.includes(row)
                return (
                  <button
                    key={row}
                    type="button"
                    onClick={() => toggle(row)}
                    aria-pressed={isOn}
                    className={`h-9 min-w-9 rounded-[5px] px-2 font-kyokasho text-lg font-semibold transition-colors ${
                      isOn ? 'bg-accent text-white' : 'border border-keisen-strong bg-white text-sumi hover:border-sumi'
                    }`}
                  >
                    {labelFor(row)}
                  </button>
                )
              })}
            </div>
          ))}
          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-sumi-soft">Sin ninguna marcada se practican todas.</p>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => onChange([])}
                className="rounded-md text-xs font-bold text-accent hover:text-accent-dark"
              >
                Practicar todas
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
