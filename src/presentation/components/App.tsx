import { useCallback, useEffect, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import { App as CapacitorApp } from '@capacitor/app'
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
  const [navOpen, setNavOpen] = useState(false)
  const closeNav = useCallback(() => setNavOpen(false), [])

  useEffect(() => {
    if (!navOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeNav()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navOpen, closeNav])

  // Android back button: close the menu if it is open, otherwise leave the app.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return
    const listener = CapacitorApp.addListener('backButton', () => {
      if (navOpen) {
        closeNav()
      } else {
        CapacitorApp.exitApp()
      }
    })
    return () => {
      listener.then((handle) => handle.remove())
    }
  }, [navOpen, closeNav])

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
    // In the edge-to-edge Android app the content stays clear of the status and
    // navigation bars; in a browser the safe areas are 0.
    <div className="flex h-[100dvh] bg-papel pb-[var(--safe-bottom)] pl-[var(--safe-left)] pr-[var(--safe-right)] pt-[var(--safe-top)] text-sumi">
      <Sidebar
        selected={overlay ?? state.category}
        selectedPhrase={state.phraseCategory}
        open={navOpen}
        onClose={closeNav}
        onSelect={handleSelectCharacter}
        onSelectPhrase={handleSelectPhrase}
        onSelectGrammar={handleSelectGrammar}
        onSelectStats={handleSelectStats}
      />
      {navOpen && <div className="fixed inset-0 z-30 bg-sumi/25 lg:hidden" onClick={closeNav} aria-hidden="true" />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-keisen bg-papel px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-expanded={navOpen}
            aria-controls="app-navigation"
            aria-label="Abrir menú"
            className="-ml-1 rounded-md p-2 text-sumi"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <p className="font-kyokasho text-lg font-semibold text-sumi">Nihongo Teacher</p>
        </header>

        <main className="flex flex-1 flex-col overflow-y-auto">
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
    </div>
  )
}
