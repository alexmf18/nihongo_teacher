import { ParticleItem } from '../../domain/entities/GrammarItem'

interface ParticleSentenceCardProps {
  item: ParticleItem
}

export function ParticleSentenceCard({ item }: ParticleSentenceCardProps) {
  return (
    <div className="flex flex-col items-center justify-center pb-8 pt-12 text-center sm:pt-16">
      <p className="max-w-lg font-kyokasho text-3xl font-semibold leading-relaxed text-sumi sm:text-[2.5rem]">
        {item.sentenceParts[0]}
        {/* The blank is an empty practice square, waiting for the particle. */}
        <span className="tianzige mx-2 inline-block h-[1.3em] w-[1.3em] align-middle" role="img" aria-label="hueco" />
        {item.sentenceParts[1]}
      </p>
      <p className="mt-4 text-sumi-soft">{item.translation}</p>
      <p className="mt-5 text-sm text-sumi-soft">Partícula</p>
    </div>
  )
}
