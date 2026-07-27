import { ParticleItem } from '../../domain/entities/GrammarItem'

interface ParticleSentenceCardProps {
  item: ParticleItem
}

export function ParticleSentenceCard({ item }: ParticleSentenceCardProps) {
  return (
    <div className="flex flex-col items-center justify-center pb-6 pt-16 text-center">
      <p className="max-w-lg text-3xl font-semibold leading-relaxed text-slate-800">
        {item.sentenceParts[0]}
        <span className="mx-2 inline-block min-w-[2.5rem] border-b-4 border-accent">&nbsp;</span>
        {item.sentenceParts[1]}
      </p>
      <p className="mt-4 text-sm text-slate-400">{item.translation}</p>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-slate-300">Partícula</p>
    </div>
  )
}
