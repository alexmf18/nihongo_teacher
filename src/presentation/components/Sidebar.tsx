import { useState } from 'react'
import {
  CharacterCategory,
  PhraseCategory,
  PHRASE_CATEGORY_LABELS,
} from '../../domain/entities/Character'
import { GrammarScreen, GRAMMAR_SCREEN_LABELS } from '../../domain/entities/GrammarScreen'
import { STATS_SCREEN_KEY, StatsScreenKey } from '../../domain/entities/StatsScreen'

interface SidebarProps {
  selected: CharacterCategory | GrammarScreen | StatsScreenKey
  selectedPhrase?: PhraseCategory
  // Below the lg breakpoint the sidebar is an off-canvas drawer.
  open: boolean
  onClose: () => void
  onSelect: (category: CharacterCategory) => void
  onSelectPhrase: (subCategory: PhraseCategory) => void
  onSelectGrammar: (screen: GrammarScreen) => void
  onSelectStats: () => void
}

// Each entry is marked by the character it is about, like a seal: あ for hiragana,
// 漢 for kanji, 活 (活用, conjugation) for verbs, 個 for counters…
interface NavItem {
  key: string
  label: string
  glyph: string
}

const learningCategories: NavItem[] = [
  { key: CharacterCategory.HIRAGANA_TABLE, label: 'Tabla Hiragana', glyph: 'あ' },
  { key: CharacterCategory.KATAKANA_TABLE, label: 'Tabla Katakana', glyph: 'ア' },
  { key: CharacterCategory.KANJI_TABLE, label: 'Tabla Kanji', glyph: '漢' },
  { key: CharacterCategory.NUMBER_TABLE, label: 'Tabla de Números', glyph: '数' },
  { key: CharacterCategory.WORD_TABLE, label: 'Tabla de Palabras', glyph: '語' },
  { key: CharacterCategory.PHRASE_TABLE, label: 'Tabla de Frases', glyph: '文' },
]

const practiceCategories: NavItem[] = [
  { key: CharacterCategory.HIRAGANA, label: 'Hiragana', glyph: 'あ' },
  { key: CharacterCategory.KATAKANA, label: 'Katakana', glyph: 'ア' },
  { key: CharacterCategory.KANJI, label: 'Kanji', glyph: '漢' },
  { key: CharacterCategory.WORD, label: 'Palabras', glyph: '語' },
  { key: CharacterCategory.PHRASE, label: 'Frases', glyph: '文' },
  { key: CharacterCategory.NUMBER, label: 'Números', glyph: '数' },
]

const GRAMMAR_GLYPHS: Record<GrammarScreen, string> = {
  [GrammarScreen.PARTICLE_TABLE]: 'は',
  [GrammarScreen.PARTICLE_QUIZ]: 'は',
  [GrammarScreen.CONJUGATION_TABLE]: '活',
  [GrammarScreen.CONJUGATION_QUIZ]: '活',
  [GrammarScreen.ADJECTIVE_TABLE]: '形',
  [GrammarScreen.ADJECTIVE_QUIZ]: '形',
  [GrammarScreen.COUNTER_TABLE]: '個',
  [GrammarScreen.COUNTER_QUIZ]: '個',
  [GrammarScreen.SENTENCE_QUIZ]: '並',
}

const grammarCategories: NavItem[] = Object.values(GrammarScreen).map((screen) => ({
  key: screen,
  label: GRAMMAR_SCREEN_LABELS[screen],
  glyph: GRAMMAR_GLYPHS[screen],
}))

const statsCategories: NavItem[] = [{ key: STATS_SCREEN_KEY, label: 'Mi progreso', glyph: '進' }]

const phraseSubCategories = Object.values(PhraseCategory)

function CategorySection({
  title,
  items,
  selected,
  onItemClick,
  phrasesOpen,
  selectedPhrase,
  onSelectPhrase,
}: {
  title: string
  items: NavItem[]
  selected: string
  onItemClick: (key: string) => void
  phrasesOpen: boolean
  selectedPhrase?: PhraseCategory
  onSelectPhrase: (sub: PhraseCategory) => void
}) {
  return (
    <section className="pt-6 first:pt-0">
      <h2 className="px-3 pb-1.5 text-xs font-bold text-sumi-soft">{title}</h2>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const isActive = selected === item.key
          return (
            <li key={item.key}>
              <button
                onClick={() => onItemClick(item.key)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-1.5 text-left text-[15px] transition-colors ${
                  isActive ? 'bg-white font-bold text-sumi' : 'text-sumi-soft hover:bg-white/70 hover:text-sumi'
                }`}
              >
                {/* The current item gets the red seal. */}
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] font-kyokasho text-[15px] font-semibold leading-none transition-colors ${
                    isActive ? 'bg-accent text-white' : 'border border-keisen-strong bg-papel text-sumi'
                  }`}
                >
                  {item.glyph}
                </span>
                <span>{item.label}</span>
              </button>

              {item.key === CharacterCategory.PHRASE && phrasesOpen && (
                <ul className="mb-1 ml-[1.625rem] mt-0.5 space-y-0.5 border-l border-keisen-strong pl-3">
                  {phraseSubCategories.map((sub) => {
                    const isSubActive = selectedPhrase === sub
                    return (
                      <li key={sub}>
                        <button
                          onClick={() => onSelectPhrase(sub)}
                          aria-current={isSubActive ? 'page' : undefined}
                          className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                            isSubActive ? 'bg-white font-bold text-accent' : 'text-sumi-soft hover:bg-white/70 hover:text-sumi'
                          }`}
                        >
                          {PHRASE_CATEGORY_LABELS[sub]}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function Sidebar({
  selected,
  selectedPhrase,
  open,
  onClose,
  onSelect,
  onSelectPhrase,
  onSelectGrammar,
  onSelectStats,
}: SidebarProps) {
  const [phrasesOpen, setPhrasesOpen] = useState(selected === CharacterCategory.PHRASE)

  const handleCategoryClick = (key: string) => {
    if (key === CharacterCategory.PHRASE) {
      const willOpen = !phrasesOpen
      setPhrasesOpen(willOpen)
      if (willOpen) {
        onSelect(CharacterCategory.PHRASE)
        if (phraseSubCategories.length > 0) {
          onSelectPhrase(phraseSubCategories[0])
        }
      }
      // Keep the drawer open so a phrase topic can be picked next.
      return
    }
    setPhrasesOpen(false)
    onSelect(key as CharacterCategory)
    onClose()
  }

  const handleSelectPhrase = (sub: PhraseCategory) => {
    onSelectPhrase(sub)
    onClose()
  }

  const handleGrammarClick = (key: string) => {
    setPhrasesOpen(false)
    onSelectGrammar(key as GrammarScreen)
    onClose()
  }

  const handleStatsClick = () => {
    setPhrasesOpen(false)
    onSelectStats()
    onClose()
  }

  return (
    <aside
      id="app-navigation"
      className={`fixed inset-y-0 left-0 z-40 flex h-[100dvh] w-[280px] shrink-0 flex-col overflow-y-auto border-r border-keisen bg-papel-deep transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:static lg:translate-x-0 ${
        open ? 'translate-x-0 shadow-sheet' : '-translate-x-full'
      }`}
    >
      <div className="flex items-start justify-between px-6 pb-7 pt-8">
        <div>
          <p className="whitespace-nowrap font-kyokasho text-2xl font-semibold leading-none text-sumi">Nihongo Teacher</p>
          <p className="mt-2 text-sm text-sumi-soft">Repaso de japonés</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 rounded-md p-2 text-sumi-soft hover:text-sumi lg:hidden"
          aria-label="Cerrar menú"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 px-3 pb-8" aria-label="Secciones">
        <CategorySection
          title="Aprendizaje"
          items={learningCategories}
          selected={selected}
          onItemClick={handleCategoryClick}
          phrasesOpen={phrasesOpen}
          selectedPhrase={selectedPhrase}
          onSelectPhrase={handleSelectPhrase}
        />
        <CategorySection
          title="Práctica"
          items={practiceCategories}
          selected={selected}
          onItemClick={handleCategoryClick}
          phrasesOpen={phrasesOpen}
          selectedPhrase={selectedPhrase}
          onSelectPhrase={handleSelectPhrase}
        />
        <CategorySection
          title="Gramática"
          items={grammarCategories}
          selected={selected}
          onItemClick={handleGrammarClick}
          phrasesOpen={false}
          onSelectPhrase={() => {}}
        />
        <CategorySection
          title="Progreso"
          items={statsCategories}
          selected={selected}
          onItemClick={handleStatsClick}
          phrasesOpen={false}
          onSelectPhrase={() => {}}
        />
      </nav>
    </aside>
  )
}
