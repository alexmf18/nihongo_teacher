import { useCallback } from 'react'

export function useSpeech() {
  const speak = useCallback((text: string, lang = 'ja-JP') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    const synth = window.speechSynthesis

    let hasSpoken = false

    const speakNow = () => {
      if (hasSpoken) return
      hasSpoken = true

      synth.cancel()
      synth.resume()

      const utterance = new SpeechSynthesisUtterance(text)
      const voices = synth.getVoices()
      const japaneseVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith(lang.toLowerCase()))
        ?? voices.find((voice) => voice.lang.toLowerCase().startsWith('ja'))

      utterance.lang = lang
      utterance.voice = japaneseVoice ?? null
      utterance.rate = 0.85
      utterance.pitch = 1

      synth.speak(utterance)
    }

    if (synth.getVoices().length > 0) {
      speakNow()
      return
    }

    synth.addEventListener('voiceschanged', speakNow, { once: true })
    setTimeout(speakNow, 150)
  }, [])

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  return { speak, isSupported }
}
