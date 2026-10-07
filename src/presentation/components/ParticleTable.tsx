import { useSpeech } from '../hooks/useSpeech'
import { RefGroup, RefPage, refCard } from './ReferenceLayout'
import { GrammarCategory, ParticleItem } from '../../domain/entities/GrammarItem'
import { GrammarRepositoryImpl } from '../../data/repositories/GrammarRepositoryImpl'

const repository = new GrammarRepositoryImpl()

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
    <div className={`flex w-64 flex-col items-center text-center ${refCard}`}>
      <button
        type="button"
        onClick={() => onSpeak(fullSentence)}
        className="cursor-pointer rounded-sm font-kyokasho text-xl font-semibold leading-snug text-sumi transition-colors hover:text-sumi-soft"
        title="Escuchar pronunciación"
      >
        {item.sentenceParts[0]}
        {/* The particle is the point of the example, so it is marked in red pen. */}
        <span className="text-accent">{item.particle}</span>
        {item.sentenceParts[1]}
      </button>
      <span className="mt-2 text-sm text-sumi-soft">{item.translation}</span>
    </div>
  )
}

export function ParticleTable() {
  const { speak } = useSpeech()
  const groups = groupByParticle(repository.getByKind(GrammarCategory.PARTICLE))

  return (
    <RefPage>
      {groups.map((group) => (
        <RefGroup
          key={group.particle}
          title={<span className="font-kyokasho text-3xl font-semibold">{group.particle}</span>}
          subtitle={<span className="font-sans">{group.label}</span>}
        >
          {group.entries.map((entry) => (
            <ParticleCard key={entry.id} item={entry} onSpeak={speak} />
          ))}
        </RefGroup>
      ))}
    </RefPage>
  )
}
