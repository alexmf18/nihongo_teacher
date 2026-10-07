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

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1'

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
        className={`flex items-center gap-1.5 rounded-md text-sm text-slate-500 hover:text-slate-800 ${focusRing}`}
      >
        Filas: <span className="font-semibold text-slate-700">{summary}</span>
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
        <div className="mt-3 space-y-3 rounded-lg bg-slate-50 p-4">
          {KANA_ROW_GROUPS.map((group) => (
            <div key={group.label} className="flex flex-wrap items-center gap-1.5">
              <span className="w-24 shrink-0 text-xs font-semibold text-slate-400">{group.label}</span>
              {group.rows.map((row) => {
                const isOn = selected.includes(row)
                return (
                  <button
                    key={row}
                    type="button"
                    onClick={() => toggle(row)}
                    aria-pressed={isOn}
                    className={`h-9 min-w-9 rounded-md px-2 text-base font-semibold transition-colors ${focusRing} ${
                      isOn ? 'bg-accent text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-accent'
                    }`}
                  >
                    {labelFor(row)}
                  </button>
                )
              })}
            </div>
          ))}
          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-slate-400">Sin ninguna marcada se practican todas.</p>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => onChange([])}
                className={`rounded-md text-xs font-semibold text-accent hover:text-accent-dark ${focusRing}`}
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
