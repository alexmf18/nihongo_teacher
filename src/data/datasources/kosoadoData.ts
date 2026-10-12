import { GrammarCategory, KosoadoItem } from '../../domain/entities/GrammarItem'

type Row = [id: string, word: string, before: string, after: string, translation: string, situation: string, acceptable?: string[]]

function kosoado([id, word, before, after, translation, situation, acceptable]: Row): KosoadoItem {
  return {
    id: `kosoado-${id}`,
    kind: GrammarCategory.KOSOADO,
    word,
    sentenceParts: [before, after],
    translation,
    situation,
    ...(acceptable ? { acceptableWords: acceptable } : {}),
  }
}

export const kosoadoData: KosoadoItem[] = ([
  // これ・それ・あれ・どれ
  ['kore-1', 'これ', '', 'はわたしのほんです。', 'Esto es mi libro.', 'Tienes el libro en la mano.'],
  ['kore-2', 'これ', '', 'はいくらですか。', '¿Cuánto cuesta esto?', 'Tienes el producto en la mano.'],
  ['sore-1', 'それ', '', 'はなんですか。', '¿Qué es eso?', 'Tu amigo sujeta algo en la mano.'],
  ['sore-2', 'それ', '', 'をください。', 'Deme eso, por favor.', 'El dependiente tiene el producto delante.'],
  ['are-1', 'あれ', '', 'はふじさんです。', 'Aquello es el monte Fuji.', 'El monte se ve a lo lejos.'],
  ['dore-1', 'どれ', '', 'があなたのかばんですか。', '¿Cuál es tu bolso?', 'Hay varios bolsos y no sabes cuál es.'],

  // この・その・あの・どの
  ['kono-1', 'この', '', 'ほんはおもしろいです。', 'Este libro es interesante.', 'Estás leyendo el libro.'],
  ['sono-1', 'その', '', 'かさはだれのですか。', '¿De quién es ese paraguas?', 'El paraguas está junto a la otra persona.'],
  ['ano-1', 'あの', '', 'ひとはだれですか。', '¿Quién es aquella persona?', 'La persona está lejos de los dos.'],
  ['ano-2', 'あの', '', 'たてものはびょういんです。', 'Aquel edificio es un hospital.', 'El edificio está al otro lado de la calle.'],
  ['dono-1', 'どの', '', 'でんしゃにのりますか。', '¿Qué tren cogemos?', 'Hay varios trenes en el andén.'],

  // ここ・そこ・あそこ・どこ
  ['koko-1', 'ここ', '', 'はわたしのへやです。', 'Esta es mi habitación.', 'Estáis dentro de tu habitación.', ['こちら']],
  ['koko-2', 'ここ', '', 'でまってください。', 'Espere aquí, por favor.', 'Señalas el sitio donde estás tú.'],
  ['soko-1', 'そこ', '', 'にすわってください。', 'Siéntese ahí, por favor.', 'La silla está junto a la otra persona.'],
  ['asoko-1', 'あそこ', '', 'にコンビニがあります。', 'Allí hay una tienda.', 'La tienda se ve al final de la calle.'],
  ['doko-1', 'どこ', 'トイレは', 'ですか。', '¿Dónde está el baño?', 'No sabes dónde está.', ['どちら']],

  // こちら・そちら・あちら・どちら
  ['kochira-1', 'こちら', '', 'へどうぞ。', 'Por aquí, por favor.', 'Eres el camarero y guías al cliente.'],
  ['kochira-2', 'こちら', '', 'はたなかさんです。', 'Este es el señor Tanaka.', 'Presentas con educación a alguien que está a tu lado.'],
  ['sochira-1', 'そちら', '', 'はどうですか。', '¿Qué tal por ahí?', 'Hablas por teléfono con alguien de otra ciudad.', ['そこ']],
  ['achira-1', 'あちら', 'でぐちは', 'です。', 'La salida está por allí.', 'La salida está lejos de los dos.', ['あそこ']],
  ['dochira-1', 'どちら', 'おくには', 'ですか。', '¿De qué país es usted?', 'Preguntas con educación.', ['どこ']],

  // こんな・そんな・あんな・どんな
  ['konna-1', 'こんな', '', 'ふくがほしいです。', 'Quiero ropa como esta.', 'Señalas la ropa que llevas puesta.'],
  ['sonna-1', 'そんな', '', 'ことはありません。', 'Eso no es así.', 'Respondes a lo que acaba de decir la otra persona.'],
  ['anna-1', 'あんな', '', 'いえにすみたいです。', 'Quiero vivir en una casa como aquella.', 'La casa se ve a lo lejos.'],
  ['donna-1', 'どんな', '', 'おんがくがすきですか。', '¿Qué tipo de música te gusta?', 'Preguntas por el tipo de música.'],
] as Row[]).map(kosoado)
