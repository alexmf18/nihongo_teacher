import { useMemo, useState } from 'react'
import { shuffleArray } from '../../domain/services/shuffleArray'

interface SentenceBuilderProps {
  chunks: string[]
  disabled: boolean
  onSubmit: (answer: string) => void
}

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'

// Tile indices in a random order that is never already the solution.
function scrambledOrder(count: number): number[] {
  const identity = Array.from({ length: count }, (_, i) => i)
  if (count < 2) return identity
  let order = shuffleArray(identity)
  while (order.every((value, i) => value === i)) order = shuffleArray(identity)
  return order
}

export function SentenceBuilder({ chunks, disabled, onSubmit }: SentenceBuilderProps) {
  const bank = useMemo(() => scrambledOrder(chunks.length), [chunks])
  // Indices into `chunks`, in the order the learner placed them.
  const [placed, setPlaced] = useState<number[]>([])

  const isComplete = placed.length === chunks.length

  const place = (index: number) => setPlaced((prev) => [...prev, index])
  const remove = (index: number) => setPlaced((prev) => prev.filter((i) => i !== index))

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="flex min-h-[68px] w-full flex-wrap items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-200 p-3"
        aria-label="Tu frase"
      >
        {placed.length === 0 ? (
          <span className="text-sm text-slate-400">Toca los bloques en orden</span>
        ) : (
          placed.map((index) => (
            <button
              key={index}
              type="button"
              disabled={disabled}
              onClick={() => remove(index)}
              className={`rounded-md bg-accent-light px-3 py-2 text-xl font-semibold text-slate-800 ring-1 ring-accent-border transition-colors hover:ring-accent disabled:cursor-default disabled:hover:ring-accent-border ${focusRing}`}
            >
              {chunks[index]}
            </button>
          ))
        )}
      </div>

      {/* Once answered only the learner's sentence stays; the feedback takes over. */}
      {!disabled && (
        <div className="flex flex-wrap justify-center gap-2">
          {bank.map((index) => {
            const isPlaced = placed.includes(index)
            return (
              <button
                key={index}
                type="button"
                disabled={isPlaced}
                onClick={() => place(index)}
                aria-hidden={isPlaced}
                tabIndex={isPlaced ? -1 : undefined}
                // Placed tiles keep their slot so the bank doesn't reflow under the cursor.
                className={`rounded-md bg-white px-3 py-2 text-xl font-semibold text-slate-800 ring-1 ring-slate-200 transition-colors hover:ring-accent ${focusRing} ${
                  isPlaced ? 'invisible' : ''
                }`}
              >
                {chunks[index]}
              </button>
            )
          })}
        </div>
      )}

      {!disabled && (
        <div className="flex items-center gap-4">
          {placed.length > 0 && (
            <button
              type="button"
              onClick={() => setPlaced([])}
              className={`rounded-md text-sm font-semibold text-slate-500 hover:text-slate-800 ${focusRing}`}
            >
              Borrar
            </button>
          )}
          <button
            type="button"
            disabled={!isComplete}
            onClick={() => onSubmit(placed.map((i) => chunks[i]).join(''))}
            className={`flex h-[56px] min-w-[230px] items-center justify-center rounded-lg bg-accent px-8 text-base font-bold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 ${focusRing}`}
          >
            Comprobar
          </button>
        </div>
      )}
    </div>
  )
}
