import { useCallback } from 'react'

export function useSpeech() {
  const speak = useCallback((text: string, lang = 'ja-JP') => {
    if (!('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.85
    utterance.pitch = 1

    window.speechSynthesis.speak(utterance)
  }, [])

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  return { speak, isSupported }
}
