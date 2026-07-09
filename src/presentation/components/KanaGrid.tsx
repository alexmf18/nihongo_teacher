import { ReactNode } from 'react'

export type TableEntry = { char: string; romaji: string } | null

export function TableGrid({
  rows,
  cols,
  onSpeak,
  color = 'indigo',
}: {
  rows: { label: string; chars: TableEntry[] }[]
  cols: readonly string[]
  onSpeak: (text: string) => void
  color?: 'indigo' | 'emerald' | 'rose'
}) {
  const borderColor = {
    indigo: 'border-indigo-100 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700',
    emerald: 'border-emerald-100 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-700',
    rose: 'border-rose-100 hover:border-rose-400 hover:bg-rose-50 text-rose-700',
  }

  const colSuffix = cols.length === 5 ? '段' : ''

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse mx-auto">
        <thead>
          <tr>
            <th className="w-14 h-12" />
            {cols.map((col) => (
              <th key={col} className="w-24 h-12 text-center text-base font-semibold text-gray-500 uppercase">
                {col}{colSuffix && <span className="text-xs text-gray-400 ml-0.5">{colSuffix}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="text-center text-base font-semibold text-gray-500 w-14">
                {row.label}<span className="text-xs text-gray-400 ml-0.5">行</span>
              </td>
              {row.chars.map((cell, i) => (
                <td key={i} className="p-1.5">
                  {cell && (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => onSpeak(cell.char)}
                        className={`w-20 h-20 rounded-2xl bg-white border-2 transition-colors flex items-center justify-center text-4xl font-medium cursor-pointer ${borderColor[color]}`}
                        title={`${cell.char} — ${cell.romaji}`}
                      >
                        {cell.char}
                      </button>
                      <span className="text-xs text-gray-400 mt-1">{cell.romaji}</span>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
      {children}
    </div>
  )
}
