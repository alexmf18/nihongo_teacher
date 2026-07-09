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

const learningCategories = [
  { key: CharacterCategory.HIRAGANA_TABLE, label: 'Tabla Hiragana', emoji: '📊' },
  { key: CharacterCategory.KATAKANA_TABLE, label: 'Tabla Katakana', emoji: '📊' },
  { key: CharacterCategory.KANJI_TABLE, label: 'Tabla Kanji', emoji: '📊' },
]

const practiceCategories = [
  { key: CharacterCategory.HIRAGANA, label: 'Hiragana', emoji: 'あ' },
  { key: CharacterCategory.KATAKANA, label: 'Katakana', emoji: 'ア' },
  { key: CharacterCategory.KANJI, label: 'Kanji', emoji: '漢' },
  { key: CharacterCategory.WORD, label: 'Palabras', emoji: '詞' },
  { key: CharacterCategory.PHRASE, label: 'Frases', emoji: '📝' },
  { key: CharacterCategory.NUMBER, label: 'Números', emoji: '🔢' },
]

const phraseSubCategories = Object.values(PhraseCategory)

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
  cats: { key: CharacterCategory; label: string; emoji: string }[]
  selected: CharacterCategory
  onCatClick: (key: CharacterCategory) => void
  phrasesOpen: boolean
  selectedPhrase?: PhraseCategory
  onSelectPhrase: (sub: PhraseCategory) => void
}) {
  return (
    <>
      <p className="text-xs uppercase tracking-widest text-gray-500 px-3 mb-2 mt-4 first:mt-0">
        {title}
      </p>
      {cats.map((cat) => {
        const isActive = selected === cat.key
        return (
          <div key={cat.key}>
            <button
              onClick={() => onCatClick(cat.key)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              <span className="font-medium">{cat.label}</span>
            </button>

            {cat.key === CharacterCategory.PHRASE && phrasesOpen && (
              <div className="ml-4 mt-1 mb-1 space-y-1 border-l-2 border-indigo-500 pl-3">
                {phraseSubCategories.map((sub) => {
                  const isSubActive = selectedPhrase === sub
                  return (
                    <button
                      key={sub}
                      onClick={() => onSelectPhrase(sub)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        isSubActive
                          ? 'bg-indigo-700 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
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
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col shadow-lg overflow-y-auto">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold tracking-wide">Nihongo Teacher</h1>
        <p className="text-sm text-gray-400 mt-1">Repaso de kana y kanji</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
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

      <div className="p-4 border-t border-gray-700 text-xs text-gray-500 text-center">
        Hecho con ❤️ para estudiar japonés
      </div>
    </aside>
  )
}
