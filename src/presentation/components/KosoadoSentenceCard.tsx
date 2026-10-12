import { KosoadoItem } from '../../domain/entities/GrammarItem'

export function KosoadoSentenceCard({ item }: { item: KosoadoItem }) {
  return (
    <div className="flex flex-col items-center justify-center pb-8 pt-12 text-center sm:pt-16">
      {/* Where the thing is decides こ, そ or あ, so the situation comes first. */}
      <p className="mb-5 max-w-md text-sm text-sumi-soft">{item.situation}</p>
      <p className="max-w-lg font-kyokasho text-3xl font-semibold leading-relaxed text-sumi sm:text-[2.5rem]">
        {item.sentenceParts[0]}
        {/* A wider blank than for particles: the answer is two to three kana. */}
        <span className="tianzige mx-2 inline-block h-[1.3em] w-[2.6em] align-middle" role="img" aria-label="hueco" />
        {item.sentenceParts[1]}
      </p>
      <p className="mt-4 text-sumi-soft">{item.translation}</p>
      <p className="mt-5 text-sm text-sumi-soft">Ko-so-a-do</p>
    </div>
  )
}
