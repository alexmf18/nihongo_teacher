import { GrammarCategory, SentenceItem } from '../../domain/entities/GrammarItem'

function sentence(id: string, chunks: string[], translation: string, alternativeOrders?: string[][]): SentenceItem {
  return { id, kind: GrammarCategory.SENTENCE, chunks, translation, alternativeOrders }
}

// N5 sentences for the "put the chunks in order" exercise.
export const sentenceData: SentenceItem[] = [
  sentence('sent-gakusei', ['わたし', 'は', 'がくせい', 'です。'], 'Yo soy estudiante.'),
  sentence('sent-watashi-no-hon', ['これ', 'は', 'わたし', 'の', 'ほん', 'です。'], 'Este es mi libro.'),
  sentence('sent-koohii', ['まいにち', 'コーヒー', 'を', 'のみます。'], 'Bebo café todos los días.', [
    ['コーヒー', 'を', 'まいにち', 'のみます。'],
  ]),
  sentence('sent-eiga', ['あした', 'ともだち', 'と', 'えいが', 'を', 'みます。'], 'Mañana veo una película con un amigo.', [
    ['ともだち', 'と', 'あした', 'えいが', 'を', 'みます。'],
  ]),
  sentence('sent-eki', ['えき', 'は', 'どこ', 'ですか。'], '¿Dónde está la estación?'),
  sentence('sent-toshokan', ['としょかん', 'で', 'べんきょう', 'します。'], 'Estudio en la biblioteca.'),
  sentence('sent-neko', ['ねこ', 'が', 'すき', 'です。'], 'Me gustan los gatos.'),
  sentence('sent-nihon', ['にほん', 'へ', 'いきたい', 'です。'], 'Quiero ir a Japón.'),
  sentence('sent-shichiji', ['しちじ', 'に', 'おきます。'], 'Me levanto a las siete.'),
  sentence('sent-ringo', ['この', 'りんご', 'は', 'あかい', 'です。'], 'Esta manzana es roja.'),
  sentence('sent-pan', ['きのう', 'パン', 'を', 'たべました。'], 'Ayer comí pan.', [['パン', 'を', 'きのう', 'たべました。']]),
  sentence('sent-inu', ['へや', 'に', 'いぬ', 'が', 'います。'], 'Hay un perro en la habitación.', [
    ['いぬ', 'が', 'へや', 'に', 'います。'],
  ]),
  sentence('sent-watashi-mo', ['わたし', 'も', 'いきます。'], 'Yo también voy.'),
  sentence('sent-arukimasu', ['がっこう', 'から', 'うち', 'まで', 'あるきます。'], 'Camino de la escuela a casa.'),
  sentence('sent-nani', ['なに', 'を', 'のみますか。'], '¿Qué vas a beber?'),
  sentence('sent-tegami', ['せんせい', 'に', 'てがみ', 'を', 'かきました。'], 'Le escribí una carta al profesor.', [
    ['てがみ', 'を', 'せんせい', 'に', 'かきました。'],
  ]),
  sentence('sent-shizuka', ['この', 'へや', 'は', 'しずか', 'じゃないです。'], 'Esta habitación no es tranquila.'),
  sentence('sent-jouzu', ['やまださん', 'は', 'にほんご', 'が', 'じょうず', 'です。'], 'Yamada habla bien japonés.'),
  sentence('sent-tsukue', ['つくえ', 'の', 'うえ', 'に', 'ほん', 'が', 'あります。'], 'Hay un libro encima de la mesa.', [
    ['ほん', 'が', 'つくえ', 'の', 'うえ', 'に', 'あります。'],
  ]),
  sentence('sent-hirugohan', ['いっしょに', 'ひるごはん', 'を', 'たべませんか。'], '¿Comemos juntos?', [
    ['ひるごはん', 'を', 'いっしょに', 'たべませんか。'],
  ]),
  sentence('sent-densha', ['でんしゃ', 'で', 'かいしゃ', 'に', 'いきます。'], 'Voy a la oficina en tren.', [
    ['かいしゃ', 'に', 'でんしゃ', 'で', 'いきます。'],
  ]),
  sentence('sent-kuruma', ['あたらしい', 'くるま', 'を', 'かいたい', 'です。'], 'Quiero comprar un coche nuevo.'),
]
