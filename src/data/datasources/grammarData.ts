import { GrammarCategory, GrammarItem } from '../../domain/entities/GrammarItem'

export const grammarData: GrammarItem[] = [
  // ========================
  // PARTICLES
  // ========================
  {
    id: 'particle-ha-1',
    kind: GrammarCategory.PARTICLE,
    particle: 'は',
    sentenceParts: ['わたし', 'がくせいです。'],
    translation: 'Yo soy estudiante.',
  },
  {
    id: 'particle-ha-2',
    kind: GrammarCategory.PARTICLE,
    particle: 'は',
    sentenceParts: ['これ', 'ほんです。'],
    translation: 'Esto es un libro.',
  },
  {
    id: 'particle-ga-1',
    kind: GrammarCategory.PARTICLE,
    particle: 'が',
    sentenceParts: ['ねこ', 'すきです。'],
    translation: 'Me gustan los gatos.',
  },
  {
    id: 'particle-ga-2',
    kind: GrammarCategory.PARTICLE,
    particle: 'が',
    sentenceParts: ['だれ', 'きましたか。'],
    translation: '¿Quién vino?',
  },
  {
    id: 'particle-wo-1',
    kind: GrammarCategory.PARTICLE,
    particle: 'を',
    sentenceParts: ['パン', 'たべます。'],
    translation: 'Como pan.',
  },
  {
    id: 'particle-wo-2',
    kind: GrammarCategory.PARTICLE,
    particle: 'を',
    sentenceParts: ['ほん', 'よみます。'],
    translation: 'Leo un libro.',
  },
  {
    id: 'particle-ni-1',
    kind: GrammarCategory.PARTICLE,
    particle: 'に',
    sentenceParts: ['しちじ', 'おきます。'],
    translation: 'Me levanto a las siete.',
  },
  {
    id: 'particle-ni-2',
    kind: GrammarCategory.PARTICLE,
    particle: 'に',
    sentenceParts: ['がっこう', 'いきます。'],
    translation: 'Voy a la escuela.',
  },
  {
    id: 'particle-de-1',
    kind: GrammarCategory.PARTICLE,
    particle: 'で',
    sentenceParts: ['としょかん', 'べんきょうします。'],
    translation: 'Estudio en la biblioteca.',
  },
  {
    id: 'particle-de-2',
    kind: GrammarCategory.PARTICLE,
    particle: 'で',
    sentenceParts: ['でんしゃ', 'いきます。'],
    translation: 'Voy en tren.',
  },
  {
    id: 'particle-to-1',
    kind: GrammarCategory.PARTICLE,
    particle: 'と',
    sentenceParts: ['ともだち', 'はなします。'],
    translation: 'Hablo con un amigo.',
  },
  {
    id: 'particle-to-2',
    kind: GrammarCategory.PARTICLE,
    particle: 'と',
    sentenceParts: ['パン', 'みずをください。'],
    translation: 'Pan y agua, por favor.',
  },
  {
    id: 'particle-mo-1',
    kind: GrammarCategory.PARTICLE,
    particle: 'も',
    sentenceParts: ['わたし', 'がくせいです。'],
    translation: 'Yo también soy estudiante.',
  },
  {
    id: 'particle-mo-2',
    kind: GrammarCategory.PARTICLE,
    particle: 'も',
    sentenceParts: ['これ', 'いいですね。'],
    translation: 'Esto también está bien.',
  },
  {
    id: 'particle-kara-1',
    kind: GrammarCategory.PARTICLE,
    particle: 'から',
    sentenceParts: ['くじ', 'はじまります。'],
    translation: 'Empieza desde las nueve.',
  },
  {
    id: 'particle-kara-2',
    kind: GrammarCategory.PARTICLE,
    particle: 'から',
    sentenceParts: ['がっこう', 'いえまであるきます。'],
    translation: 'Camino desde la escuela hasta la casa.',
  },

  // ========================
  // CONJUGATION (N5 verbs)
  // ========================
  {
    id: 'conj-taberu',
    kind: GrammarCategory.CONJUGATION,
    dictionaryForm: '食べる',
    meaning: 'comer',
    forms: [
      { formName: 'dictionary', value: '食べる', romaji: 'taberu' },
      { formName: 'masu', value: '食べます', romaji: 'tabemasu' },
      { formName: 'past', value: '食べました', romaji: 'tabemashita' },
      { formName: 'negative', value: '食べません', romaji: 'tabemasen' },
      { formName: 'te', value: '食べて', romaji: 'tabete' },
    ],
  },
  {
    id: 'conj-nomu',
    kind: GrammarCategory.CONJUGATION,
    dictionaryForm: '飲む',
    meaning: 'beber',
    forms: [
      { formName: 'dictionary', value: '飲む', romaji: 'nomu' },
      { formName: 'masu', value: '飲みます', romaji: 'nomimasu' },
      { formName: 'past', value: '飲みました', romaji: 'nomimashita' },
      { formName: 'negative', value: '飲みません', romaji: 'nomimasen' },
      { formName: 'te', value: '飲んで', romaji: 'nonde' },
    ],
  },
  {
    id: 'conj-iku',
    kind: GrammarCategory.CONJUGATION,
    dictionaryForm: '行く',
    meaning: 'ir',
    forms: [
      { formName: 'dictionary', value: '行く', romaji: 'iku' },
      { formName: 'masu', value: '行きます', romaji: 'ikimasu' },
      { formName: 'past', value: '行きました', romaji: 'ikimashita' },
      { formName: 'negative', value: '行きません', romaji: 'ikimasen' },
      { formName: 'te', value: '行って', romaji: 'itte' },
    ],
  },
  {
    id: 'conj-hanasu',
    kind: GrammarCategory.CONJUGATION,
    dictionaryForm: '話す',
    meaning: 'hablar',
    forms: [
      { formName: 'dictionary', value: '話す', romaji: 'hanasu' },
      { formName: 'masu', value: '話します', romaji: 'hanashimasu' },
      { formName: 'past', value: '話しました', romaji: 'hanashimashita' },
      { formName: 'negative', value: '話しません', romaji: 'hanashimasen' },
      { formName: 'te', value: '話して', romaji: 'hanashite' },
    ],
  },
  {
    id: 'conj-kaku',
    kind: GrammarCategory.CONJUGATION,
    dictionaryForm: '書く',
    meaning: 'escribir',
    forms: [
      { formName: 'dictionary', value: '書く', romaji: 'kaku' },
      { formName: 'masu', value: '書きます', romaji: 'kakimasu' },
      { formName: 'past', value: '書きました', romaji: 'kakimashita' },
      { formName: 'negative', value: '書きません', romaji: 'kakimasen' },
      { formName: 'te', value: '書いて', romaji: 'kaite' },
    ],
  },
  {
    id: 'conj-miru',
    kind: GrammarCategory.CONJUGATION,
    dictionaryForm: '見る',
    meaning: 'ver',
    forms: [
      { formName: 'dictionary', value: '見る', romaji: 'miru' },
      { formName: 'masu', value: '見ます', romaji: 'mimasu' },
      { formName: 'past', value: '見ました', romaji: 'mimashita' },
      { formName: 'negative', value: '見ません', romaji: 'mimasen' },
      { formName: 'te', value: '見て', romaji: 'mite' },
    ],
  },

  // ========================
  // COUNTERS
  // ========================
  {
    id: 'counter-tsu',
    kind: GrammarCategory.COUNTER,
    counter: 'つ',
    usage: 'Objetos en general (del 1 al 9)',
    examples: [
      { number: 1, reading: 'ひとつ', romaji: 'hitotsu' },
      { number: 2, reading: 'ふたつ', romaji: 'futatsu' },
      { number: 3, reading: 'みっつ', romaji: 'mittsu' },
    ],
  },
  {
    id: 'counter-nin',
    kind: GrammarCategory.COUNTER,
    counter: '人',
    usage: 'Personas',
    examples: [
      { number: 1, reading: 'ひとり', romaji: 'hitori' },
      { number: 2, reading: 'ふたり', romaji: 'futari' },
      { number: 3, reading: 'さんにん', romaji: 'sannin' },
    ],
  },
  {
    id: 'counter-hiki',
    kind: GrammarCategory.COUNTER,
    counter: '匹',
    usage: 'Animales pequeños (gatos, perros, peces)',
    examples: [
      { number: 1, reading: 'いっぴき', romaji: 'ippiki' },
      { number: 2, reading: 'にひき', romaji: 'nihiki' },
      { number: 3, reading: 'さんびき', romaji: 'sanbiki' },
    ],
  },
  {
    id: 'counter-hon',
    kind: GrammarCategory.COUNTER,
    counter: '本',
    usage: 'Objetos alargados (botellas, lápices)',
    examples: [
      { number: 1, reading: 'いっぽん', romaji: 'ippon' },
      { number: 2, reading: 'にほん', romaji: 'nihon' },
      { number: 3, reading: 'さんぼん', romaji: 'sanbon' },
    ],
  },
  {
    id: 'counter-mai',
    kind: GrammarCategory.COUNTER,
    counter: '枚',
    usage: 'Objetos planos (papel, entradas)',
    examples: [
      { number: 1, reading: 'いちまい', romaji: 'ichimai' },
      { number: 2, reading: 'にまい', romaji: 'nimai' },
      { number: 3, reading: 'さんまい', romaji: 'sanmai' },
    ],
  },
]
