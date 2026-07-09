import { useState } from 'react'
import {
  CharacterCategory,
  PhraseCategory,
  PHRASE_CATEGORY_LABELS,
} from '../../domain/entities/Character'

interface SidebarProps {
  selected: CharacterCategory
  selectedPhrase?: PhraseCategory
  onSelect: (category: CharacterCategory) => void
  onSelectPhrase: (subCategory: PhraseCategory) => void
}

type SidebarIcon = 'kana' | 'katakana' | 'book' | 'kanji' | 'words' | 'phrase' | 'number'

const learningCategories = [
  { key: CharacterCategory.HIRAGANA_TABLE, label: 'Tabla Hiragana', icon: 'book' },
  { key: CharacterCategory.KATAKANA_TABLE, label: 'Tabla Katakana', icon: 'book' },
  { key: CharacterCategory.KANJI_TABLE, label: 'Tabla Kanji', icon: 'book' },
] satisfies { key: CharacterCategory; label: string; icon: SidebarIcon }[]

const practiceCategories = [
  { key: CharacterCategory.HIRAGANA, label: 'Hiragana', icon: 'kana' },
  { key: CharacterCategory.KATAKANA, label: 'Katakana', icon: 'katakana' },
  { key: CharacterCategory.KANJI, label: 'Kanji', icon: 'kanji' },
  { key: CharacterCategory.WORD, label: 'Palabras', icon: 'words' },
  { key: CharacterCategory.PHRASE, label: 'Frases', icon: 'phrase' },
  { key: CharacterCategory.NUMBER, label: 'Números', icon: 'number' },
] satisfies { key: CharacterCategory; label: string; icon: SidebarIcon }[]

const phraseSubCategories = Object.values(PhraseCategory)

function Icon({ name }: { name: SidebarIcon }) {
  const className = 'h-6 w-6 shrink-0'

  if (name === 'kana') return <span className="w-6 text-center text-lg font-semibold leading-none">あ</span>
  if (name === 'kanji') return <span className="w-6 text-center text-lg font-semibold leading-none">漢</span>
  if (name === 'words') return <span className="w-6 text-center text-lg font-semibold leading-none">詞</span>

  if (name === 'katakana') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 5h11M9 5c-.2 6.3-1.8 10.8-5 14M14 10l6 9M17.5 10l-7 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'book') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 5.5c2.8-1 5-.7 8 1v13c-3-1.7-5.2-2-8-1V5.5ZM12 6.5c3-1.7 5.2-2 8-1v13c-2.8-1-5-.7-8 1v-13Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'phrase') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 4h9l3 3v13H6V4Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 4v4h4M9 12h6M9 16h5" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'number') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 4 6 20M18 4l-2 16M4 9h17M3 15h17" strokeLinecap="round" />
      </svg>
    )
  }

  return null
}

function CategorySection({
  title,
  cats,
  selected,
  onCatClick,
  phrasesOpen,
  selectedPhrase,
  onSelectPhrase,
}: {
  title: string
  cats: { key: CharacterCategory; label: string; icon: SidebarIcon }[]
  selected: CharacterCategory
  onCatClick: (key: CharacterCategory) => void
  phrasesOpen: boolean
  selectedPhrase?: PhraseCategory
  onSelectPhrase: (sub: PhraseCategory) => void
}) {
  return (
    <>
      <p className="px-5 pb-2 pt-5 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400 first:pt-0">
        {title}
      </p>
      {cats.map((cat) => {
        const isActive = selected === cat.key
        return (
          <div key={cat.key}>
            <button
              onClick={() => onCatClick(cat.key)}
              className={`flex w-full items-center gap-4 rounded-lg px-5 py-3 text-left text-[15px] transition-colors ${
                isActive
                  ? 'bg-[#fbedf3] text-[#c70039]'
                  : 'text-slate-500 hover:bg-white hover:text-slate-950'
              }`}
            >
              <Icon name={cat.icon} />
              <span className="font-medium">{cat.label}</span>
            </button>

            {cat.key === CharacterCategory.PHRASE && phrasesOpen && (
              <div className="mb-1 ml-8 mt-1 space-y-1 border-l border-[#f0d7df] pl-3">
                {phraseSubCategories.map((sub) => {
                  const isSubActive = selectedPhrase === sub
                  return (
                    <button
                      key={sub}
                      onClick={() => onSelectPhrase(sub)}
                      className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        isSubActive
                          ? 'bg-white text-[#c70039] shadow-sm'
                          : 'text-slate-400 hover:bg-white hover:text-slate-700'
                      }`}
                    >
                      {PHRASE_CATEGORY_LABELS[sub]}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}

export function Sidebar({ selected, selectedPhrase, onSelect, onSelectPhrase }: SidebarProps) {
  const [phrasesOpen, setPhrasesOpen] = useState(selected === CharacterCategory.PHRASE)

  const handleCategoryClick = (key: CharacterCategory) => {
    if (key === CharacterCategory.PHRASE) {
      const willOpen = !phrasesOpen
      setPhrasesOpen(willOpen)
      if (willOpen) {
        onSelect(CharacterCategory.PHRASE)
        if (phraseSubCategories.length > 0) {
          onSelectPhrase(phraseSubCategories[0])
        }
      } else {
        setPhrasesOpen(false)
      }
      return
    }
    setPhrasesOpen(false)
    onSelect(key)
  }

  return (
    <aside className="flex h-screen w-[280px] shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-[#fbfbfd]">
      <div className="px-8 pb-9 pt-10">
        <h1 className="font-serif text-[28px] font-bold leading-none text-[#c70039]">Nihongo Teacher</h1>
        <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.26em] text-slate-700">Repaso de japones</p>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        <CategorySection
          title="Aprendizaje"
          cats={learningCategories}
          selected={selected}
          onCatClick={handleCategoryClick}
          phrasesOpen={phrasesOpen}
          selectedPhrase={selectedPhrase}
          onSelectPhrase={onSelectPhrase}
        />
        <CategorySection
          title="Práctica"
          cats={practiceCategories}
          selected={selected}
          onCatClick={handleCategoryClick}
          phrasesOpen={phrasesOpen}
          selectedPhrase={selectedPhrase}
          onSelectPhrase={onSelectPhrase}
        />
      </nav>
    </aside>
  )
}
