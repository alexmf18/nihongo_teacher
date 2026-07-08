import { Sidebar } from './Sidebar'
import { QuizScreen } from './QuizScreen'
import { useCharacterQuiz } from '../hooks/useCharacterQuiz'

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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        selected={state.category}
        selectedPhrase={state.phraseCategory}
        onSelect={setCategory}
        onSelectPhrase={setPhraseCategory}
      />
      <main className="flex-1 flex flex-col">
        <QuizScreen
          state={state}
          character={currentCharacter}
          onAnswerChange={setAnswer}
          onSubmit={submitAnswer}
          onNext={nextCharacter}
          onReveal={revealAnswer}
          onTryAgain={tryAgain}
        />
      </main>
    </div>
  )
}
