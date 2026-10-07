import { ReactNode } from 'react'

export type TableEntry = { char: string; romaji: string } | null

// The kana chart, each kana in its own practice square (田字格).
export function TableGrid({
  rows,
  cols,
  onSpeak,
}: {
  rows: { label: string; chars: TableEntry[] }[]
  cols: readonly string[]
  onSpeak: (text: string) => void
}) {
  const colSuffix = cols.length === 5 ? '段' : ''

  return (
    <div className="overflow-x-auto rounded-lg border border-keisen bg-white px-2 py-4 shadow-sheet sm:px-5 sm:py-5">
      <table className="mx-auto border-collapse">
        <thead>
          <tr>
            <th className="h-10 w-9 sm:w-12" />
            {cols.map((col) => (
              <th key={col} className="h-10 text-center text-sm font-bold text-sumi-soft">
                {col}
                {colSuffix && <span className="ml-0.5 font-kyokasho text-xs font-normal">{colSuffix}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            // Labels repeat (the な row and ん are both "n"), so the index keeps keys unique.
            <tr key={`${row.label}-${rowIndex}`}>
              <th scope="row" className="pr-1 text-center text-sm font-bold text-sumi-soft">
                {row.label}
                {row.label && <span className="ml-0.5 font-kyokasho text-xs font-normal">行</span>}
              </th>
              {row.chars.map((cell, i) => (
                <td key={i} className="p-1 sm:p-1.5">
                  {cell && (
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => onSpeak(cell.char)}
                        className="tianzige flex h-14 w-14 cursor-pointer items-center justify-center font-kyokasho text-3xl font-semibold text-sumi transition-colors hover:bg-accent-light hover:text-accent sm:h-[4.5rem] sm:w-[4.5rem] sm:text-4xl"
                        title={`${cell.char} - ${cell.romaji}`}
                      >
                        {cell.char}
                      </button>
                      <span className="mt-1 text-xs font-medium text-sumi-soft">{cell.romaji}</span>
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
    <section>
      <h2 className="mb-4 text-center text-lg font-bold text-sumi">{title}</h2>
      {children}
    </section>
  )
}
