import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { QuizScreen } from './QuizScreen'
import { GrammarQuizScreen } from './GrammarQuizScreen'
import { StatsScreen } from './StatsScreen'
import { HiraganaTable } from './HiraganaTable'
import { KatakanaTable } from './KatakanaTable'
import { KanjiTable } from './KanjiTable'
import { NumberTable } from './NumberTable'
import { WordTable } from './WordTable'
import { PhraseTable } from './PhraseTable'
import { ParticleTable } from './ParticleTable'
import { ConjugationTable } from './ConjugationTable'
import { CounterTable } from './CounterTable'
import { useCharacterQuiz } from '../hooks/useCharacterQuiz'
import { useGrammarQuiz } from '../hooks/useGrammarQuiz'
import { useProgressStats } from '../hooks/useProgressStats'
import { CharacterCategory, PhraseCategory } from '../../domain/entities/Character'
import { GrammarCategory } from '../../domain/entities/GrammarItem'
import { GrammarScreen, GRAMMAR_QUIZ_KINDS } from '../../domain/entities/GrammarScreen'
import { STATS_SCREEN_KEY, StatsScreenKey } from '../../domain/entities/StatsScreen'

type Overlay = GrammarScreen | StatsScreenKey | null

export function App() {
  const {
    state,
    currentCharacter,
    setCategory,
    setPhraseCategory,
    setKanaRows,
    setMode,
    setAnswer,
    submitAnswer,
    selectChoice,
    nextCharacter,
    revealAnswer,
    tryAgain,
    restartSession,
    reviewMistakes,
  } = useCharacterQuiz()

  const {
    state: grammarState,
    currentCard: currentGrammarCard,
    setKind: setGrammarKind,
    setAnswer: setGrammarAnswer,
    submitAnswer: submitGrammarAnswer,
    selectChoice: selectGrammarChoice,
    setMode: setGrammarMode,
    nextCard: nextGrammarCard,
    revealAnswer: revealGrammarAnswer,
    tryAgain: grammarTryAgain,
    restartSession: restartGrammarSession,
    reviewMistakes: reviewGrammarMistakes,
  } = useGrammarQuiz()

  const { stats, refresh: refreshStats } = useProgressStats()

  const [overlay, setOverlay] = useState<Overlay>(null)

  const handleSelectCharacter = (category: CharacterCategory) => {
    setOverlay(null)
    setCategory(category)
  }

  const handleSelectPhrase = (subCategory: PhraseCategory) => {
    setOverlay(null)
    setPhraseCategory(subCategory)
  }

  const handleSelectGrammar = (screen: GrammarScreen) => {
    setOverlay(screen)
    const quizKind = GRAMMAR_QUIZ_KINDS[screen]
    if (quizKind) setGrammarKind(quizKind)
  }

  const isGrammarQuiz = overlay !== null && overlay !== STATS_SCREEN_KEY && GRAMMAR_QUIZ_KINDS[overlay] !== undefined

  const handleSelectStats = () => {
    setOverlay(STATS_SCREEN_KEY)
  }

  return (
    <div className="flex h-screen bg-app-bg text-slate-950">
      <Sidebar
        selected={overlay ?? state.category}
        selectedPhrase={state.phraseCategory}
        onSelect={handleSelectCharacter}
        onSelectPhrase={handleSelectPhrase}
        onSelectGrammar={handleSelectGrammar}
        onSelectStats={handleSelectStats}
      />
      <main className="flex-1 flex flex-col overflow-y-auto">
        {overlay === GrammarScreen.PARTICLE_TABLE ? (
          <ParticleTable />
        ) : overlay === GrammarScreen.CONJUGATION_TABLE ? (
          <ConjugationTable kind={GrammarCategory.CONJUGATION} />
        ) : overlay === GrammarScreen.ADJECTIVE_TABLE ? (
          <ConjugationTable kind={GrammarCategory.ADJECTIVE} />
        ) : overlay === GrammarScreen.COUNTER_TABLE ? (
          <CounterTable />
        ) : isGrammarQuiz ? (
          <GrammarQuizScreen
            state={grammarState}
            card={currentGrammarCard}
            onAnswerChange={setGrammarAnswer}
            onSubmit={submitGrammarAnswer}
            onSelectChoice={selectGrammarChoice}
            onSetMode={setGrammarMode}
            onNext={nextGrammarCard}
            onReveal={revealGrammarAnswer}
            onTryAgain={grammarTryAgain}
            onReviewMistakes={reviewGrammarMistakes}
            onRestart={restartGrammarSession}
          />
        ) : overlay === STATS_SCREEN_KEY ? (
          <StatsScreen stats={stats} onRefresh={refreshStats} />
        ) : state.category === CharacterCategory.HIRAGANA_TABLE ? (
          <HiraganaTable />
        ) : state.category === CharacterCategory.KATAKANA_TABLE ? (
          <KatakanaTable />
        ) : state.category === CharacterCategory.KANJI_TABLE ? (
          <KanjiTable />
        ) : state.category === CharacterCategory.NUMBER_TABLE ? (
          <NumberTable />
        ) : state.category === CharacterCategory.WORD_TABLE ? (
          <WordTable />
        ) : state.category === CharacterCategory.PHRASE_TABLE ? (
          <PhraseTable />
        ) : (
          <QuizScreen
            state={state}
            character={currentCharacter}
            onAnswerChange={setAnswer}
            onSubmit={submitAnswer}
            onSelectChoice={selectChoice}
            onSetMode={setMode}
            onNext={nextCharacter}
            onReveal={revealAnswer}
            onTryAgain={tryAgain}
            onReviewMistakes={reviewMistakes}
            onRestart={restartSession}
            onSetKanaRows={setKanaRows}
          />
        )}
      </main>
    </div>
  )
}
