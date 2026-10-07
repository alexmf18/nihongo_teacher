// `long` is shown on the practice card, `short` in the reference tables.
const FORM_LABELS: Record<string, { long: string; short: string }> = {
  masu: { long: 'Presente educado (ます)', short: 'ます' },
  negative: { long: 'Negativo educado (ません)', short: 'ません' },
  past: { long: 'Pasado educado (ました)', short: 'ました' },
  polite_past_negative: { long: 'Pasado negativo educado (ませんでした)', short: 'ませんでした' },
  plain_negative: { long: 'Negativo (ない)', short: 'ない' },
  plain_past: { long: 'Pasado (た)', short: 'た' },
  plain_past_negative: { long: 'Pasado negativo (なかった)', short: 'なかった' },
  te: { long: 'Forma て', short: 'て' },
  tai: { long: 'Querer hacer (たい)', short: 'たい' },
  polite: { long: 'Presente educado (です)', short: 'です' },
}

export function formLabel(formName: string): string {
  return FORM_LABELS[formName]?.long ?? formName
}

export function formShortLabel(formName: string): string {
  return FORM_LABELS[formName]?.short ?? formName
}
