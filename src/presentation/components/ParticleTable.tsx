import { useSpeech } from '../hooks/useSpeech'
import { GrammarCategory, ParticleItem } from '../../domain/entities/GrammarItem'
import { GrammarRepositoryImpl } from '../../data/repositories/GrammarRepositoryImpl'

const PARTICLE_LABELS: Record<string, string> = {
  は: 'Tema (wa)',
  が: 'Sujeto (ga)',
  を: 'Objeto directo (o)',
  に: 'Tiempo / dirección (ni)',
  で: 'Lugar / medio (de)',
  と: 'Y / con (to)',
  も: 'También (mo)',
  から: 'Desde (kara)',
}

interface ParticleGroup {
  particle: string
  label: string
  entries: ParticleItem[]
}

function groupByParticle(items: ParticleItem[]): ParticleGroup[] {
  const order: string[] = []
  const map = new Map<string, ParticleItem[]>()

  items.forEach((item) => {
    if (!map.has(item.particle)) {
      order.push(item.particle)
      map.set(item.particle, [])
    }
    map.get(item.particle)!.push(item)
  })

  return order.map((particle) => ({
    particle,
    label: PARTICLE_LABELS[particle] ?? particle,
    entries: map.get(particle)!,
  }))
}

function ParticleCard({ item, onSpeak }: { item: ParticleItem; onSpeak: (text: string) => void }) {
  const fullSentence = `${item.sentenceParts[0]}${item.particle}${item.sentenceParts[1]}`

  return (
    <div className="flex w-64 flex-col items-center rounded-lg border border-accent-border bg-white p-4 shadow-[0_8px_18px_rgba(15,23,42,0.04)] transition-colors hover:border-accent hover:bg-accent-light">
      <button
        onClick={() => onSpeak(fullSentence)}
        className="mb-2 cursor-pointer text-center text-lg font-semibold leading-snug text-accent transition-transform hover:scale-105"
        title="Escuchar pronunciacion"
      >
        {fullSentence}
      </button>
      <span className="mt-1 text-center text-sm font-bold text-slate-600">{item.translation}</span>
    </div>
  )
}

export function ParticleTable() {
  const { speak } = useSpeech()
  const repository = new GrammarRepositoryImpl()
  const groups = groupByParticle(repository.getByKind(GrammarCategory.PARTICLE))

  return (
    <div className="flex-1 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {groups.map((group) => (
          <div key={group.particle} className="mb-8">
            <h2 className="mb-1 text-center text-xl font-extrabold text-slate-950">{group.particle}</h2>
            <p className="mb-4 text-center text-sm font-semibold text-slate-400">{group.label}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {group.entries.map((entry) => (
                <ParticleCard key={entry.id} item={entry} onSpeak={speak} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
