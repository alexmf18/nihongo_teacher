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
    indigo: 'border-accent-border hover:border-accent hover:bg-accent-light text-accent',
    emerald: 'border-[#d7e8e0] hover:border-emerald-600 hover:bg-emerald-50 text-emerald-700',
    rose: 'border-accent-border hover:border-accent hover:bg-accent-light text-accent',
  }

  const colSuffix = cols.length === 5 ? '段' : ''

  return (
    <div className="overflow-x-auto rounded-xl bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] ring-1 ring-slate-100">
      <table className="mx-auto border-collapse">
        <thead>
          <tr>
            <th className="w-14 h-12" />
            {cols.map((col) => (
              <th key={col} className="h-12 w-24 text-center text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
                {col}{colSuffix && <span className="ml-0.5 text-xs text-slate-300">{colSuffix}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="w-14 text-center text-sm font-bold text-slate-500">
                {row.label}<span className="ml-0.5 text-xs text-slate-300">行</span>
              </td>
              {row.chars.map((cell, i) => (
                <td key={i} className="p-1.5">
                  {cell && (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => onSpeak(cell.char)}
                        className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-2 bg-white text-4xl font-semibold transition-colors ${borderColor[color]}`}
                        title={`${cell.char} - ${cell.romaji}`}
                      >
                        {cell.char}
                      </button>
                      <span className="mt-1 text-xs font-semibold text-slate-400">{cell.romaji}</span>
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
      <h2 className="mb-4 text-center text-xl font-extrabold text-slate-950">{title}</h2>
      {children}
    </div>
  )
}
