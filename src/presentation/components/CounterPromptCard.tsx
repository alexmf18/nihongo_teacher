import { CounterItem } from '../../domain/entities/GrammarItem'

interface CounterPromptCardProps {
  item: CounterItem
  number: number
}

export function CounterPromptCard({ item, number }: CounterPromptCardProps) {
  return (
    <div className="flex flex-col items-center justify-center pb-8 pt-12 text-center sm:pt-16">
      <span className="block font-kyokasho text-6xl font-semibold leading-none text-sumi">
        {number}
        {item.counter}
      </span>
      <p className="mt-4 text-sumi-soft">{item.usage}</p>
      <p className="mt-5 text-sm text-sumi-soft">Contador</p>
    </div>
  )
}
