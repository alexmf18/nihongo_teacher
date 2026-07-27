export enum PracticeMode {
  ROMAJI_INPUT = 'romaji_input',
  MULTIPLE_CHOICE = 'multiple_choice',
  REVERSE = 'reverse',
  LISTENING = 'listening',
}

export const PRACTICE_MODE_LABELS: Record<PracticeMode, string> = {
  [PracticeMode.ROMAJI_INPUT]: 'Escribir romaji',
  [PracticeMode.MULTIPLE_CHOICE]: 'Opción múltiple',
  [PracticeMode.REVERSE]: 'Español → Japonés',
  [PracticeMode.LISTENING]: 'Solo audio',
}
