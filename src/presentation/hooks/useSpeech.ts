import { useCallback } from 'react'
import { Capacitor } from '@capacitor/core'
import { QueueStrategy, TextToSpeech } from '@capacitor-community/text-to-speech'

const SPEECH_RATE = 0.85

// The Android WebView has no reliable Web Speech API, so the installed app speaks
// through the device's native text-to-speech engine instead.
const isNative = Capacitor.isNativePlatform()

function speakNative(text: string, lang: string) {
  // Flush interrupts whatever is still playing, like speechSynthesis.cancel() on the web.
  TextToSpeech.speak({ text, lang, rate: SPEECH_RATE, queueStrategy: QueueStrategy.Flush }).catch(() => {
    // No Japanese voice installed, or the engine is unavailable: stay silent.
  })
}

function speakWeb(text: string, lang: string) {
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
    utterance.rate = SPEECH_RATE
    utterance.pitch = 1

    synth.speak(utterance)
  }

  if (synth.getVoices().length > 0) {
    speakNow()
    return
  }

  synth.addEventListener('voiceschanged', speakNow, { once: true })
  setTimeout(speakNow, 150)
}

export function useSpeech() {
  const speak = useCallback((text: string, lang = 'ja-JP') => {
    if (isNative) {
      speakNative(text, lang)
    } else {
      speakWeb(text, lang)
    }
  }, [])

  const isSupported = isNative || (typeof window !== 'undefined' && 'speechSynthesis' in window)

  return { speak, isSupported }
}
