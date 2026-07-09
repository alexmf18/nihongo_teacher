import { Sidebar } from './Sidebar'
import { QuizScreen } from './QuizScreen'
import { HiraganaTable } from './HiraganaTable'
import { KatakanaTable } from './KatakanaTable'
import { KanjiTable } from './KanjiTable'
import { useCharacterQuiz } from '../hooks/useCharacterQuiz'
import { CharacterCategory } from '../../domain/entities/Character'

export function App() {
  const {
    state,
    currentCharacter,
    setCategory,
    setPhraseCategory,
    setAnswer,
    submitAnswer,
    nextCharacter,
    revealAnswer,
    tryAgain,
  } = useCharacterQuiz()

  return (
    <div className="flex h-screen bg-[#f7f7fb] text-slate-950">
      <Sidebar
        selected={state.category}
        selectedPhrase={state.phraseCategory}
        onSelect={setCategory}
        onSelectPhrase={setPhraseCategory}
      />
      <main className="flex-1 flex flex-col overflow-y-auto">
        {state.category === CharacterCategory.HIRAGANA_TABLE ? (
          <HiraganaTable />
        ) : state.category === CharacterCategory.KATAKANA_TABLE ? (
          <KatakanaTable />
        ) : state.category === CharacterCategory.KANJI_TABLE ? (
          <KanjiTable />
        ) : (
          <QuizScreen
            state={state}
            character={currentCharacter}
            onAnswerChange={setAnswer}
            onSubmit={submitAnswer}
            onNext={nextCharacter}
            onReveal={revealAnswer}
            onTryAgain={tryAgain}
          />
        )}
      </main>
    </div>
  )
}
