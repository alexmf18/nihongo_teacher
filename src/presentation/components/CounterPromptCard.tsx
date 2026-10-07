import { CounterItem } from '../../domain/entities/GrammarItem'

interface CounterPromptCardProps {
  item: CounterItem
  number: number
}

export function CounterPromptCard({ item, number }: CounterPromptCardProps) {
  return (
    <div className="flex flex-col items-center justify-center pb-6 pt-16 text-center">
      <span className="block text-6xl font-semibold leading-none text-accent">
        {number}
        {item.counter}
      </span>
      <p className="mt-3 text-sm text-slate-400">{item.usage}</p>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">Contador</p>
    </div>
  )
}
