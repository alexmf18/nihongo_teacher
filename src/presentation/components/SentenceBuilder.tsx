import { useMemo, useState } from 'react'
import { shuffleArray } from '../../domain/services/shuffleArray'

interface SentenceBuilderProps {
  chunks: string[]
  disabled: boolean
  onSubmit: (answer: string) => void
}

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
        className="flex min-h-[68px] w-full flex-wrap items-end justify-center gap-2 border-b-2 border-keisen-strong px-2 pb-3"
        aria-label="Tu frase"
      >
        {placed.length === 0 ? (
          <span className="pb-2 text-sm text-sumi-soft">Toca los bloques en orden</span>
        ) : (
          placed.map((index) => (
            <button
              key={index}
              type="button"
              disabled={disabled}
              onClick={() => remove(index)}
              className="rounded-md border border-keisen bg-papel px-3 py-1.5 font-kyokasho text-2xl font-semibold text-sumi transition-colors hover:border-sumi disabled:cursor-default disabled:hover:border-keisen"
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
                className={`rounded-md border border-keisen-strong bg-white px-3 py-1.5 font-kyokasho text-2xl font-semibold text-sumi transition-colors hover:border-sumi ${
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
              className="rounded-md text-sm font-bold text-sumi-soft hover:text-sumi"
            >
              Borrar
            </button>
          )}
          <button
            type="button"
            disabled={!isComplete}
            onClick={() => onSubmit(placed.map((i) => chunks[i]).join(''))}
            className="h-12 min-w-[200px] rounded-md bg-sumi px-8 text-base font-bold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-keisen disabled:text-sumi-soft"
          >
            Comprobar
          </button>
        </div>
      )}
    </div>
  )
}
