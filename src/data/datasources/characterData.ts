import { Character, CharacterCategory, PhraseCategory } from '../../domain/entities/Character'

export const characterData: Character[] = [
  // ========================
  // HIRAGANA - Gojuuon (50 sounds)
  // ========================
  { id: 'h-a', character: 'あ', romaji: ['a'], category: CharacterCategory.HIRAGANA },
  { id: 'h-i', character: 'い', romaji: ['i'], category: CharacterCategory.HIRAGANA },
  { id: 'h-u', character: 'う', romaji: ['u'], category: CharacterCategory.HIRAGANA },
  { id: 'h-e', character: 'え', romaji: ['e'], category: CharacterCategory.HIRAGANA },
  { id: 'h-o', character: 'お', romaji: ['o'], category: CharacterCategory.HIRAGANA },

  { id: 'h-ka', character: 'か', romaji: ['ka'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ki', character: 'き', romaji: ['ki'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ku', character: 'く', romaji: ['ku'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ke', character: 'け', romaji: ['ke'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ko', character: 'こ', romaji: ['ko'], category: CharacterCategory.HIRAGANA },

  { id: 'h-sa', character: 'さ', romaji: ['sa'], category: CharacterCategory.HIRAGANA },
  { id: 'h-shi', character: 'し', romaji: ['shi', 'si'], category: CharacterCategory.HIRAGANA },
  { id: 'h-su', character: 'す', romaji: ['su'], category: CharacterCategory.HIRAGANA },
  { id: 'h-se', character: 'せ', romaji: ['se'], category: CharacterCategory.HIRAGANA },
  { id: 'h-so', character: 'そ', romaji: ['so'], category: CharacterCategory.HIRAGANA },

  { id: 'h-ta', character: 'た', romaji: ['ta'], category: CharacterCategory.HIRAGANA },
  { id: 'h-chi', character: 'ち', romaji: ['chi', 'ti'], category: CharacterCategory.HIRAGANA },
  { id: 'h-tsu', character: 'つ', romaji: ['tsu', 'tu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-te', character: 'て', romaji: ['te'], category: CharacterCategory.HIRAGANA },
  { id: 'h-to', character: 'と', romaji: ['to'], category: CharacterCategory.HIRAGANA },

  { id: 'h-na', character: 'な', romaji: ['na'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ni', character: 'に', romaji: ['ni'], category: CharacterCategory.HIRAGANA },
  { id: 'h-nu', character: 'ぬ', romaji: ['nu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ne', character: 'ね', romaji: ['ne'], category: CharacterCategory.HIRAGANA },
  { id: 'h-no', character: 'の', romaji: ['no'], category: CharacterCategory.HIRAGANA },

  { id: 'h-ha', character: 'は', romaji: ['ha'], category: CharacterCategory.HIRAGANA },
  { id: 'h-hi', character: 'ひ', romaji: ['hi'], category: CharacterCategory.HIRAGANA },
  { id: 'h-fu', character: 'ふ', romaji: ['fu', 'hu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-he', character: 'へ', romaji: ['he'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ho', character: 'ほ', romaji: ['ho'], category: CharacterCategory.HIRAGANA },

  { id: 'h-ma', character: 'ま', romaji: ['ma'], category: CharacterCategory.HIRAGANA },
  { id: 'h-mi', character: 'み', romaji: ['mi'], category: CharacterCategory.HIRAGANA },
  { id: 'h-mu', character: 'む', romaji: ['mu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-me', character: 'め', romaji: ['me'], category: CharacterCategory.HIRAGANA },
  { id: 'h-mo', character: 'も', romaji: ['mo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-ya', character: 'や', romaji: ['ya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-yu', character: 'ゆ', romaji: ['yu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-yo', character: 'よ', romaji: ['yo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-ra', character: 'ら', romaji: ['ra'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ri', character: 'り', romaji: ['ri'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ru', character: 'る', romaji: ['ru'], category: CharacterCategory.HIRAGANA },
  { id: 'h-re', character: 'れ', romaji: ['re'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ro', character: 'ろ', romaji: ['ro'], category: CharacterCategory.HIRAGANA },

  { id: 'h-wa', character: 'わ', romaji: ['wa'], category: CharacterCategory.HIRAGANA },
  { id: 'h-wo', character: 'を', romaji: ['wo', 'o'], category: CharacterCategory.HIRAGANA },
  { id: 'h-n', character: 'ん', romaji: ['n', 'nn'], category: CharacterCategory.HIRAGANA },

  // HIRAGANA - Dakuten (voiced)
  { id: 'h-ga', character: 'が', romaji: ['ga'], category: CharacterCategory.HIRAGANA },
  { id: 'h-gi', character: 'ぎ', romaji: ['gi'], category: CharacterCategory.HIRAGANA },
  { id: 'h-gu', character: 'ぐ', romaji: ['gu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ge', character: 'げ', romaji: ['ge'], category: CharacterCategory.HIRAGANA },
  { id: 'h-go', character: 'ご', romaji: ['go'], category: CharacterCategory.HIRAGANA },

  { id: 'h-za', character: 'ざ', romaji: ['za'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ji', character: 'じ', romaji: ['ji', 'zi'], category: CharacterCategory.HIRAGANA },
  { id: 'h-zu', character: 'ず', romaji: ['zu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ze', character: 'ぜ', romaji: ['ze'], category: CharacterCategory.HIRAGANA },
  { id: 'h-zo', character: 'ぞ', romaji: ['zo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-da', character: 'だ', romaji: ['da'], category: CharacterCategory.HIRAGANA },
  { id: 'h-dji', character: 'ぢ', romaji: ['dji', 'di', 'ji', 'zi'], category: CharacterCategory.HIRAGANA },
  { id: 'h-dzu', character: 'づ', romaji: ['dzu', 'du', 'zu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-de', character: 'で', romaji: ['de'], category: CharacterCategory.HIRAGANA },
  { id: 'h-do', character: 'ど', romaji: ['do'], category: CharacterCategory.HIRAGANA },

  { id: 'h-ba', character: 'ば', romaji: ['ba'], category: CharacterCategory.HIRAGANA },
  { id: 'h-bi', character: 'び', romaji: ['bi'], category: CharacterCategory.HIRAGANA },
  { id: 'h-bu', character: 'ぶ', romaji: ['bu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-be', character: 'べ', romaji: ['be'], category: CharacterCategory.HIRAGANA },
  { id: 'h-bo', character: 'ぼ', romaji: ['bo'], category: CharacterCategory.HIRAGANA },

  // HIRAGANA - Handakuten (p-sound)
  { id: 'h-pa', character: 'ぱ', romaji: ['pa'], category: CharacterCategory.HIRAGANA },
  { id: 'h-pi', character: 'ぴ', romaji: ['pi'], category: CharacterCategory.HIRAGANA },
  { id: 'h-pu', character: 'ぷ', romaji: ['pu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-pe', character: 'ぺ', romaji: ['pe'], category: CharacterCategory.HIRAGANA },
  { id: 'h-po', character: 'ぽ', romaji: ['po'], category: CharacterCategory.HIRAGANA },

  // HIRAGANA - Yoon (contracted)
  { id: 'h-kya', character: 'きゃ', romaji: ['kya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-kyu', character: 'きゅ', romaji: ['kyu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-kyo', character: 'きょ', romaji: ['kyo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-sha', character: 'しゃ', romaji: ['sha', 'sya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-shu', character: 'しゅ', romaji: ['shu', 'syu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-sho', character: 'しょ', romaji: ['sho', 'syo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-cha', character: 'ちゃ', romaji: ['cha', 'cya', 'tya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-chu', character: 'ちゅ', romaji: ['chu', 'cyu', 'tyu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-cho', character: 'ちょ', romaji: ['cho', 'cyo', 'tyo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-nya', character: 'にゃ', romaji: ['nya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-nyu', character: 'にゅ', romaji: ['nyu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-nyo', character: 'にょ', romaji: ['nyo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-hya', character: 'ひゃ', romaji: ['hya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-hyu', character: 'ひゅ', romaji: ['hyu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-hyo', character: 'ひょ', romaji: ['hyo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-mya', character: 'みゃ', romaji: ['mya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-myu', character: 'みゅ', romaji: ['myu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-myo', character: 'みょ', romaji: ['myo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-rya', character: 'りゃ', romaji: ['rya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ryu', character: 'りゅ', romaji: ['ryu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ryo', character: 'りょ', romaji: ['ryo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-gya', character: 'ぎゃ', romaji: ['gya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-gyu', character: 'ぎゅ', romaji: ['gyu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-gyo', character: 'ぎょ', romaji: ['gyo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-ja', character: 'じゃ', romaji: ['ja', 'zya', 'jya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-ju', character: 'じゅ', romaji: ['ju', 'zyu', 'jyu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-jo', character: 'じょ', romaji: ['jo', 'zyo', 'jyo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-bya', character: 'びゃ', romaji: ['bya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-byu', character: 'びゅ', romaji: ['byu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-byo', character: 'びょ', romaji: ['byo'], category: CharacterCategory.HIRAGANA },

  { id: 'h-pya', character: 'ぴゃ', romaji: ['pya'], category: CharacterCategory.HIRAGANA },
  { id: 'h-pyu', character: 'ぴゅ', romaji: ['pyu'], category: CharacterCategory.HIRAGANA },
  { id: 'h-pyo', character: 'ぴょ', romaji: ['pyo'], category: CharacterCategory.HIRAGANA },

  // ========================
  // KATAKANA - Gojuuon
  // ========================
  { id: 'k-a', character: 'ア', romaji: ['a'], category: CharacterCategory.KATAKANA },
  { id: 'k-i', character: 'イ', romaji: ['i'], category: CharacterCategory.KATAKANA },
  { id: 'k-u', character: 'ウ', romaji: ['u'], category: CharacterCategory.KATAKANA },
  { id: 'k-e', character: 'エ', romaji: ['e'], category: CharacterCategory.KATAKANA },
  { id: 'k-o', character: 'オ', romaji: ['o'], category: CharacterCategory.KATAKANA },

  { id: 'k-ka', character: 'カ', romaji: ['ka'], category: CharacterCategory.KATAKANA },
  { id: 'k-ki', character: 'キ', romaji: ['ki'], category: CharacterCategory.KATAKANA },
  { id: 'k-ku', character: 'ク', romaji: ['ku'], category: CharacterCategory.KATAKANA },
  { id: 'k-ke', character: 'ケ', romaji: ['ke'], category: CharacterCategory.KATAKANA },
  { id: 'k-ko', character: 'コ', romaji: ['ko'], category: CharacterCategory.KATAKANA },

  { id: 'k-sa', character: 'サ', romaji: ['sa'], category: CharacterCategory.KATAKANA },
  { id: 'k-shi', character: 'シ', romaji: ['shi', 'si'], category: CharacterCategory.KATAKANA },
  { id: 'k-su', character: 'ス', romaji: ['su'], category: CharacterCategory.KATAKANA },
  { id: 'k-se', character: 'セ', romaji: ['se'], category: CharacterCategory.KATAKANA },
  { id: 'k-so', character: 'ソ', romaji: ['so'], category: CharacterCategory.KATAKANA },

  { id: 'k-ta', character: 'タ', romaji: ['ta'], category: CharacterCategory.KATAKANA },
  { id: 'k-chi', character: 'チ', romaji: ['chi', 'ti'], category: CharacterCategory.KATAKANA },
  { id: 'k-tsu', character: 'ツ', romaji: ['tsu', 'tu'], category: CharacterCategory.KATAKANA },
  { id: 'k-te', character: 'テ', romaji: ['te'], category: CharacterCategory.KATAKANA },
  { id: 'k-to', character: 'ト', romaji: ['to'], category: CharacterCategory.KATAKANA },

  { id: 'k-na', character: 'ナ', romaji: ['na'], category: CharacterCategory.KATAKANA },
  { id: 'k-ni', character: 'ニ', romaji: ['ni'], category: CharacterCategory.KATAKANA },
  { id: 'k-nu', character: 'ヌ', romaji: ['nu'], category: CharacterCategory.KATAKANA },
  { id: 'k-ne', character: 'ネ', romaji: ['ne'], category: CharacterCategory.KATAKANA },
  { id: 'k-no', character: 'ノ', romaji: ['no'], category: CharacterCategory.KATAKANA },

  { id: 'k-ha', character: 'ハ', romaji: ['ha'], category: CharacterCategory.KATAKANA },
  { id: 'k-hi', character: 'ヒ', romaji: ['hi'], category: CharacterCategory.KATAKANA },
  { id: 'k-fu', character: 'フ', romaji: ['fu', 'hu'], category: CharacterCategory.KATAKANA },
  { id: 'k-he', character: 'ヘ', romaji: ['he'], category: CharacterCategory.KATAKANA },
  { id: 'k-ho', character: 'ホ', romaji: ['ho'], category: CharacterCategory.KATAKANA },

  { id: 'k-ma', character: 'マ', romaji: ['ma'], category: CharacterCategory.KATAKANA },
  { id: 'k-mi', character: 'ミ', romaji: ['mi'], category: CharacterCategory.KATAKANA },
  { id: 'k-mu', character: 'ム', romaji: ['mu'], category: CharacterCategory.KATAKANA },
  { id: 'k-me', character: 'メ', romaji: ['me'], category: CharacterCategory.KATAKANA },
  { id: 'k-mo', character: 'モ', romaji: ['mo'], category: CharacterCategory.KATAKANA },

  { id: 'k-ya', character: 'ヤ', romaji: ['ya'], category: CharacterCategory.KATAKANA },
  { id: 'k-yu', character: 'ユ', romaji: ['yu'], category: CharacterCategory.KATAKANA },
  { id: 'k-yo', character: 'ヨ', romaji: ['yo'], category: CharacterCategory.KATAKANA },

  { id: 'k-ra', character: 'ラ', romaji: ['ra'], category: CharacterCategory.KATAKANA },
  { id: 'k-ri', character: 'リ', romaji: ['ri'], category: CharacterCategory.KATAKANA },
  { id: 'k-ru', character: 'ル', romaji: ['ru'], category: CharacterCategory.KATAKANA },
  { id: 'k-re', character: 'レ', romaji: ['re'], category: CharacterCategory.KATAKANA },
  { id: 'k-ro', character: 'ロ', romaji: ['ro'], category: CharacterCategory.KATAKANA },

  { id: 'k-wa', character: 'ワ', romaji: ['wa'], category: CharacterCategory.KATAKANA },
  { id: 'k-wo', character: 'ヲ', romaji: ['wo', 'o'], category: CharacterCategory.KATAKANA },
  { id: 'k-n', character: 'ン', romaji: ['n', 'nn'], category: CharacterCategory.KATAKANA },

  // KATAKANA - Dakuten
  { id: 'k-ga', character: 'ガ', romaji: ['ga'], category: CharacterCategory.KATAKANA },
  { id: 'k-gi', character: 'ギ', romaji: ['gi'], category: CharacterCategory.KATAKANA },
  { id: 'k-gu', character: 'グ', romaji: ['gu'], category: CharacterCategory.KATAKANA },
  { id: 'k-ge', character: 'ゲ', romaji: ['ge'], category: CharacterCategory.KATAKANA },
  { id: 'k-go', character: 'ゴ', romaji: ['go'], category: CharacterCategory.KATAKANA },

  { id: 'k-za', character: 'ザ', romaji: ['za'], category: CharacterCategory.KATAKANA },
  { id: 'k-ji', character: 'ジ', romaji: ['ji', 'zi'], category: CharacterCategory.KATAKANA },
  { id: 'k-zu', character: 'ズ', romaji: ['zu'], category: CharacterCategory.KATAKANA },
  { id: 'k-ze', character: 'ゼ', romaji: ['ze'], category: CharacterCategory.KATAKANA },
  { id: 'k-zo', character: 'ゾ', romaji: ['zo'], category: CharacterCategory.KATAKANA },

  { id: 'k-da', character: 'ダ', romaji: ['da'], category: CharacterCategory.KATAKANA },
  { id: 'k-dji', character: 'ヂ', romaji: ['dji', 'di', 'ji', 'zi'], category: CharacterCategory.KATAKANA },
  { id: 'k-dzu', character: 'ヅ', romaji: ['dzu', 'du', 'zu'], category: CharacterCategory.KATAKANA },
  { id: 'k-de', character: 'デ', romaji: ['de'], category: CharacterCategory.KATAKANA },
  { id: 'k-do', character: 'ド', romaji: ['do'], category: CharacterCategory.KATAKANA },

  { id: 'k-ba', character: 'バ', romaji: ['ba'], category: CharacterCategory.KATAKANA },
  { id: 'k-bi', character: 'ビ', romaji: ['bi'], category: CharacterCategory.KATAKANA },
  { id: 'k-bu', character: 'ブ', romaji: ['bu'], category: CharacterCategory.KATAKANA },
  { id: 'k-be', character: 'ベ', romaji: ['be'], category: CharacterCategory.KATAKANA },
  { id: 'k-bo', character: 'ボ', romaji: ['bo'], category: CharacterCategory.KATAKANA },

  // KATAKANA - Handakuten
  { id: 'k-pa', character: 'パ', romaji: ['pa'], category: CharacterCategory.KATAKANA },
  { id: 'k-pi', character: 'ピ', romaji: ['pi'], category: CharacterCategory.KATAKANA },
  { id: 'k-pu', character: 'プ', romaji: ['pu'], category: CharacterCategory.KATAKANA },
  { id: 'k-pe', character: 'ペ', romaji: ['pe'], category: CharacterCategory.KATAKANA },
  { id: 'k-po', character: 'ポ', romaji: ['po'], category: CharacterCategory.KATAKANA },

  // KATAKANA - Yoon
  { id: 'k-kya', character: 'キャ', romaji: ['kya'], category: CharacterCategory.KATAKANA },
  { id: 'k-kyu', character: 'キュ', romaji: ['kyu'], category: CharacterCategory.KATAKANA },
  { id: 'k-kyo', character: 'キョ', romaji: ['kyo'], category: CharacterCategory.KATAKANA },

  { id: 'k-sha', character: 'シャ', romaji: ['sha', 'sya'], category: CharacterCategory.KATAKANA },
  { id: 'k-shu', character: 'シュ', romaji: ['shu', 'syu'], category: CharacterCategory.KATAKANA },
  { id: 'k-sho', character: 'ショ', romaji: ['sho', 'syo'], category: CharacterCategory.KATAKANA },

  { id: 'k-cha', character: 'チャ', romaji: ['cha', 'cya', 'tya'], category: CharacterCategory.KATAKANA },
  { id: 'k-chu', character: 'チュ', romaji: ['chu', 'cyu', 'tyu'], category: CharacterCategory.KATAKANA },
  { id: 'k-cho', character: 'チョ', romaji: ['cho', 'cyo', 'tyo'], category: CharacterCategory.KATAKANA },

  { id: 'k-nya', character: 'ニャ', romaji: ['nya'], category: CharacterCategory.KATAKANA },
  { id: 'k-nyu', character: 'ニュ', romaji: ['nyu'], category: CharacterCategory.KATAKANA },
  { id: 'k-nyo', character: 'ニョ', romaji: ['nyo'], category: CharacterCategory.KATAKANA },

  { id: 'k-hya', character: 'ヒャ', romaji: ['hya'], category: CharacterCategory.KATAKANA },
  { id: 'k-hyu', character: 'ヒュ', romaji: ['hyu'], category: CharacterCategory.KATAKANA },
  { id: 'k-hyo', character: 'ヒョ', romaji: ['hyo'], category: CharacterCategory.KATAKANA },

  { id: 'k-mya', character: 'ミャ', romaji: ['mya'], category: CharacterCategory.KATAKANA },
  { id: 'k-myu', character: 'ミュ', romaji: ['myu'], category: CharacterCategory.KATAKANA },
  { id: 'k-myo', character: 'ミョ', romaji: ['myo'], category: CharacterCategory.KATAKANA },

  { id: 'k-rya', character: 'リャ', romaji: ['rya'], category: CharacterCategory.KATAKANA },
  { id: 'k-ryu', character: 'リュ', romaji: ['ryu'], category: CharacterCategory.KATAKANA },
  { id: 'k-ryo', character: 'リョ', romaji: ['ryo'], category: CharacterCategory.KATAKANA },

  { id: 'k-gya', character: 'ギャ', romaji: ['gya'], category: CharacterCategory.KATAKANA },
  { id: 'k-gyu', character: 'ギュ', romaji: ['gyu'], category: CharacterCategory.KATAKANA },
  { id: 'k-gyo', character: 'ギョ', romaji: ['gyo'], category: CharacterCategory.KATAKANA },

  { id: 'k-ja', character: 'ジャ', romaji: ['ja', 'zya', 'jya'], category: CharacterCategory.KATAKANA },
  { id: 'k-ju', character: 'ジュ', romaji: ['ju', 'zyu', 'jyu'], category: CharacterCategory.KATAKANA },
  { id: 'k-jo', character: 'ジョ', romaji: ['jo', 'zyo', 'jyo'], category: CharacterCategory.KATAKANA },

  { id: 'k-bya', character: 'ビャ', romaji: ['bya'], category: CharacterCategory.KATAKANA },
  { id: 'k-byu', character: 'ビュ', romaji: ['byu'], category: CharacterCategory.KATAKANA },
  { id: 'k-byo', character: 'ビョ', romaji: ['byo'], category: CharacterCategory.KATAKANA },

  { id: 'k-pya', character: 'ピャ', romaji: ['pya'], category: CharacterCategory.KATAKANA },
  { id: 'k-pyu', character: 'ピュ', romaji: ['pyu'], category: CharacterCategory.KATAKANA },
  { id: 'k-pyo', character: 'ピョ', romaji: ['pyo'], category: CharacterCategory.KATAKANA },

  // ========================
  // KANJI (N5 level)
  // ========================
  { id: 'kj-ichi', character: '一', romaji: ['ichi', 'hito', 'itsu'], category: CharacterCategory.KANJI },
  { id: 'kj-ni', character: '二', romaji: ['ni', 'futa'], category: CharacterCategory.KANJI },
  { id: 'kj-san', character: '三', romaji: ['san', 'mi'], category: CharacterCategory.KANJI },
  { id: 'j-shi', character: '四', romaji: ['shi', 'yon', 'yo'], category: CharacterCategory.KANJI },
  { id: 'kj-go', character: '五', romaji: ['go', 'itsu'], category: CharacterCategory.KANJI },
  { id: 'kj-roku', character: '六', romaji: ['roku', 'mu'], category: CharacterCategory.KANJI },
  { id: 'kj-shichi', character: '七', romaji: ['shichi', 'nana', 'hana'], category: CharacterCategory.KANJI },
  { id: 'kj-hachi', character: '八', romaji: ['hachi', 'ya'], category: CharacterCategory.KANJI },
  { id: 'kj-kyuu', character: '九', romaji: ['kyuu', 'kyu', 'kokono'], category: CharacterCategory.KANJI },
  { id: 'kj-juu', character: '十', romaji: ['juu', 'ju', 'too'], category: CharacterCategory.KANJI },

  { id: 'kj-hyaku', character: '百', romaji: ['hyaku', 'momo'], category: CharacterCategory.KANJI },
  { id: 'kj-sen', character: '千', romaji: ['sen', 'chi'], category: CharacterCategory.KANJI },
  { id: 'kj-man', character: '万', romaji: ['man', 'ban'], category: CharacterCategory.KANJI },

  { id: 'kj-nichi', character: '日', romaji: ['nichi', 'jitsu', 'hi', 'ka'], category: CharacterCategory.KANJI },
  { id: 'kj-gets', character: '月', romaji: ['gets', 'getsu', 'gatsu', 'tsuki'], category: CharacterCategory.KANJI },
  { id: 'kj-ka', character: '火', romaji: ['ka', 'hi'], category: CharacterCategory.KANJI },
  { id: 'kj-sui', character: '水', romaji: ['sui', 'mizu'], category: CharacterCategory.KANJI },
  { id: 'kj-kin', character: '金', romaji: ['kin', 'kane', 'kana'], category: CharacterCategory.KANJI },
  { id: 'kj-do', character: '土', romaji: ['do', 'tsuchi'], category: CharacterCategory.KANJI },
  { id: 'kj-moku', character: '木', romaji: ['moku', 'boku', 'ki'], category: CharacterCategory.KANJI },

  { id: 'kj-jin', character: '人', romaji: ['jin', 'nin', 'hito'], category: CharacterCategory.KANJI },
  { id: 'kj-yama', character: '山', romaji: ['san', 'zan', 'yama'], category: CharacterCategory.KANJI },
  { id: 'kj-kawa', character: '川', romaji: ['sen', 'kawa'], category: CharacterCategory.KANJI },
  { id: 'kj-ta', character: '田', romaji: ['den', 'ta'], category: CharacterCategory.KANJI },
  { id: 'kj-ue', character: '上', romaji: ['jou', 'ue', 'a', 'kami'], category: CharacterCategory.KANJI },
  { id: 'kj-shita', character: '下', romaji: ['ka', 'ge', 'shita', 'moto'], category: CharacterCategory.KANJI },
  { id: 'kj-higashi', character: '東', romaji: ['tou', 'higashi'], category: CharacterCategory.KANJI },
  { id: 'kj-nishi', character: '西', romaji: ['sei', 'sai', 'nishi'], category: CharacterCategory.KANJI },
  { id: 'kj-kita', character: '北', romaji: ['hoku', 'kita'], category: CharacterCategory.KANJI },
  { id: 'kj-minami', character: '南', romaji: ['nan', 'na', 'minami'], category: CharacterCategory.KANJI },

  { id: 'kj-chuu', character: '中', romaji: ['chuu', 'naka'], category: CharacterCategory.KANJI },
  { id: 'kj-dai', character: '大', romaji: ['dai', 'tai', 'ookii'], category: CharacterCategory.KANJI },
  { id: 'kj-shou', character: '小', romaji: ['shou', 'chii', 'ko'], category: CharacterCategory.KANJI },
  { id: 'kj-kou', character: '口', romaji: ['kou', 'ku', 'kuchi'], category: CharacterCategory.KANJI },
  { id: 'kj-moku2', character: '目', romaji: ['moku', 'me'], category: CharacterCategory.KANJI },

  { id: 'kj-sayuu', character: '右', romaji: ['uu', 'yu', 'migi'], category: CharacterCategory.KANJI },
  { id: 'kj-sahidari', character: '左', romaji: ['sa', 'hidari'], category: CharacterCategory.KANJI },
  { id: 'kj-eki', character: '駅', romaji: ['eki'], category: CharacterCategory.KANJI },
  { id: 'kj-koku', character: '国', romaji: ['koku', 'kuni'], category: CharacterCategory.KANJI },
  { id: 'kj-hana', character: '花', romaji: ['ka', 'hana'], category: CharacterCategory.KANJI },
  { id: 'kj-sakana', character: '魚', romaji: ['gyo', 'sakana', 'uo'], category: CharacterCategory.KANJI },
  { id: 'kj-tori', character: '鳥', romaji: ['chou', 'tori'], category: CharacterCategory.KANJI },
  { id: 'kj-inu', character: '犬', romaji: ['ken', 'inu'], category: CharacterCategory.KANJI },
  { id: 'kj-neko', character: '猫', romaji: ['byou', 'neko'], category: CharacterCategory.KANJI },
  { id: 'kj-ki', character: '気', romaji: ['ki', 'ke'], category: CharacterCategory.KANJI },

  { id: 'kj-hon', character: '本', romaji: ['hon', 'moto'], category: CharacterCategory.KANJI },
  { id: 'kj-shi', character: '子', romaji: ['shi', 'su', 'ko'], category: CharacterCategory.KANJI },
  { id: 'kj-gaku', character: '学', romaji: ['gaku', 'gak', 'mana'], category: CharacterCategory.KANJI },
  { id: 'kj-kou2', character: '校', romaji: ['kou'], category: CharacterCategory.KANJI },
  { id: 'kj-sensei', character: '生', romaji: ['sei', 'shou', 'i', 'u', 'nama'], category: CharacterCategory.KANJI },
  { id: 'kj-tama', character: '玉', romaji: ['gyoku', 'tama'], category: CharacterCategory.KANJI },
  { id: 'kj-sora', character: '空', romaji: ['kuu', 'sora', 'kara'], category: CharacterCategory.KANJI },
  { id: 'kj-ame', character: '雨', romaji: ['u', 'ame'], category: CharacterCategory.KANJI },
  { id: 'kj-den', character: '電', romaji: ['den'], category: CharacterCategory.KANJI },
  { id: 'kj-sha', character: '車', romaji: ['sha', 'kuruma'], category: CharacterCategory.KANJI },

  // ========================
  // WORDS (vocabulary)
  // ========================
  { id: 'w-arigatou', character: 'ありがとう', romaji: ['arigatou', 'arigato'], meaning: 'gracias', category: CharacterCategory.WORD },
  { id: 'w-ohayou', character: 'おはよう', romaji: ['ohayou', 'ohayo'], meaning: 'buenos días', category: CharacterCategory.WORD },
  { id: 'w-konnichiwa', character: 'こんにちは', romaji: ['konnichiwa'], meaning: 'hola / buenas tardes', category: CharacterCategory.WORD },
  { id: 'w-konbanwa', character: 'こんばんは', romaji: ['konbanwa'], meaning: 'buenas noches', category: CharacterCategory.WORD },
  { id: 'w-sayounara', character: 'さようなら', romaji: ['sayounara', 'sayonara'], meaning: 'adiós', category: CharacterCategory.WORD },
  { id: 'w-sumimasen', character: 'すみません', romaji: ['sumimasen'], meaning: 'disculpe / lo siento', category: CharacterCategory.WORD },
  { id: 'w-onegaishimasu', character: 'おねがいします', romaji: ['onegaishimasu', 'onegai shimasu'], meaning: 'por favor', category: CharacterCategory.WORD },
  { id: 'w-itadakimasu', character: 'いただきます', romaji: ['itadakimasu'], meaning: 'buen provecho (antes de comer)', category: CharacterCategory.WORD },
  { id: 'w-oyasuminasai', character: 'おやすみなさい', romaji: ['oyasuminasai'], meaning: 'buenas noches (dormir)', category: CharacterCategory.WORD },
  { id: 'w-hai', character: 'はい', romaji: ['hai'], meaning: 'sí', category: CharacterCategory.WORD },
  { id: 'w-iie', character: 'いいえ', romaji: ['iie'], meaning: 'no', category: CharacterCategory.WORD },
  { id: 'w-daijoubu', character: 'だいじょうぶ', romaji: ['daijoubu', 'daijobu'], meaning: 'está bien / tranquilo', category: CharacterCategory.WORD },
  { id: 'w-namae', character: 'なまえ', romaji: ['namae'], meaning: 'nombre', category: CharacterCategory.WORD },
  { id: 'w-tomodachi', character: 'ともだち', romaji: ['tomodachi'], meaning: 'amigo / amiga', category: CharacterCategory.WORD },
  { id: 'w-sensei', character: 'せんせい', romaji: ['sensei'], meaning: 'profesor / maestra', category: CharacterCategory.WORD },
  { id: 'w-gakusei', character: 'がくせい', romaji: ['gakusei'], meaning: 'estudiante', category: CharacterCategory.WORD },
  { id: 'w-gakkou', character: 'がっこう', romaji: ['gakkou', 'gakko'], meaning: 'escuela', category: CharacterCategory.WORD },
  { id: 'w-tabemono', character: 'たべもの', romaji: ['tabemono'], meaning: 'comida', category: CharacterCategory.WORD },
  { id: 'w-nomimono', character: 'のみもの', romaji: ['nomimono'], meaning: 'bebida', category: CharacterCategory.WORD },
  { id: 'w-oishii', character: 'おいしい', romaji: ['oishii'], meaning: 'delicioso / rico', category: CharacterCategory.WORD },
  { id: 'w-tanoshii', character: 'たのしい', romaji: ['tanoshii'], meaning: 'divertido / agradable', category: CharacterCategory.WORD },
  { id: 'w-ookii', character: 'おおきい', romaji: ['ookii'], meaning: 'grande', category: CharacterCategory.WORD },
  { id: 'w-chiisai', character: 'ちいさい', romaji: ['chiisai'], meaning: 'pequeño', category: CharacterCategory.WORD },
  { id: 'w-atarashii', character: 'あたらしい', romaji: ['atarashii'], meaning: 'nuevo', category: CharacterCategory.WORD },
  { id: 'w-muzukashii', character: 'むずかしい', romaji: ['muzukashii'], meaning: 'difícil', category: CharacterCategory.WORD },
  { id: 'w-tenki', character: 'てんき', romaji: ['tenki'], meaning: 'clima / tiempo atmosférico', category: CharacterCategory.WORD },
  { id: 'w-eki', character: 'えき', romaji: ['eki'], meaning: 'estación (tren)', category: CharacterCategory.WORD },
  { id: 'w-byouin', character: 'びょういん', romaji: ['byouin'], meaning: 'hospital', category: CharacterCategory.WORD },
  { id: 'w-toshokan', character: 'としょかん', romaji: ['toshokan'], meaning: 'biblioteca', category: CharacterCategory.WORD },
  { id: 'w-denwa', character: 'でんわ', romaji: ['denwa'], meaning: 'teléfono', category: CharacterCategory.WORD },
  { id: 'w-benkyou', character: 'べんきょう', romaji: ['benkyou', 'benkyo'], meaning: 'estudio / aprender', category: CharacterCategory.WORD },
  { id: 'w-shigoto', character: 'しごと', romaji: ['shigoto'], meaning: 'trabajo', category: CharacterCategory.WORD },
  { id: 'w-kaimono', character: 'かいもの', romaji: ['kaimono'], meaning: 'compras', category: CharacterCategory.WORD },
  { id: 'w-ryokou', character: 'りょこう', romaji: ['ryokou', 'ryoko'], meaning: 'viaje', category: CharacterCategory.WORD },
  { id: 'w-ongaku', character: 'おんがく', romaji: ['ongaku'], meaning: 'música', category: CharacterCategory.WORD },
  { id: 'w-eiga', character: 'えいが', romaji: ['eiga'], meaning: 'película', category: CharacterCategory.WORD },
  { id: 'w-yasai', character: 'やさい', romaji: ['yasai'], meaning: 'verdura', category: CharacterCategory.WORD },
  { id: 'w-kudamono', character: 'くだもの', romaji: ['kudamono'], meaning: 'fruta', category: CharacterCategory.WORD },
  { id: 'w-sakana', character: 'さかな', romaji: ['sakana'], meaning: 'pescado', category: CharacterCategory.WORD },
  { id: 'w-mizu', character: 'みず', romaji: ['mizu'], meaning: 'agua', category: CharacterCategory.WORD },
  { id: 'w-ocha', character: 'おちゃ', romaji: ['ocha'], meaning: 'té (verde)', category: CharacterCategory.WORD },
  { id: 'w-neko', character: 'ねこ', romaji: ['neko'], meaning: 'gato', category: CharacterCategory.WORD },
  { id: 'w-inu', character: 'いぬ', romaji: ['inu'], meaning: 'perro', category: CharacterCategory.WORD },
  { id: 'w-tori', character: 'とり', romaji: ['tori'], meaning: 'pájaro / pollo', category: CharacterCategory.WORD },
  { id: 'w-hana', character: 'はな', romaji: ['hana'], meaning: 'flor', category: CharacterCategory.WORD },
  { id: 'w-yama', character: 'やま', romaji: ['yama'], meaning: 'montaña', category: CharacterCategory.WORD },
  { id: 'w-kawa', character: 'かわ', romaji: ['kawa'], meaning: 'río', category: CharacterCategory.WORD },
  { id: 'w-umi', character: 'うみ', romaji: ['umi'], meaning: 'mar', category: CharacterCategory.WORD },
  { id: 'w-sora', character: 'そら', romaji: ['sora'], meaning: 'cielo', category: CharacterCategory.WORD },
  { id: 'w-tsuki', character: 'つき', romaji: ['tsuki'], meaning: 'luna', category: CharacterCategory.WORD },
  { id: 'w-hoshi', character: 'ほし', romaji: ['hoshi'], meaning: 'estrella', category: CharacterCategory.WORD },
  { id: 'w-asa', character: 'あさ', romaji: ['asa'], meaning: 'mañana (temprano)', category: CharacterCategory.WORD },
  { id: 'w-hiru', character: 'ひる', romaji: ['hiru'], meaning: 'mediodía', category: CharacterCategory.WORD },
  { id: 'w-yoru', character: 'よる', romaji: ['yoru'], meaning: 'noche', category: CharacterCategory.WORD },
  { id: 'w-kyou', character: 'きょう', romaji: ['kyou', 'kyo'], meaning: 'hoy', category: CharacterCategory.WORD },
  { id: 'w-ashita', character: 'あした', romaji: ['ashita'], meaning: 'mañana (día siguiente)', category: CharacterCategory.WORD },
  { id: 'w-kinou', character: 'きのう', romaji: ['kinou'], meaning: 'ayer', category: CharacterCategory.WORD },
  { id: 'w-ikutsu', character: 'いくつ', romaji: ['ikutsu'], meaning: '¿cuántos? / ¿cuántos años?', category: CharacterCategory.WORD },

  // ========================
  // PHRASES
  // ========================
  // Saludos
  { id: 'p-ohayou-gozaimasu', character: 'おはようございます', romaji: ['ohayou gozaimasu', 'ohayougozaimasu'], meaning: 'Buenos días (formal)', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.GREETINGS },
  { id: 'p-ogenki-desu-ka', character: 'おげんきですか', romaji: ['ogenki desu ka', 'ogenkidesuka'], meaning: '¿Cómo está usted?', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.GREETINGS },
  { id: 'p-okagesama-de', character: 'おかげさまで', romaji: ['okagesama de', 'okagesamade'], meaning: 'Bien, gracias', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.GREETINGS },
  { id: 'p-gomen-nasai', character: 'ごめんなさい', romaji: ['gomen nasai', 'gomennasai'], meaning: 'Lo siento / Perdón', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.GREETINGS },
  { id: 'p-osaki-ni', character: 'おさきに', romaji: ['osaki ni', 'osakini'], meaning: 'Antes que usted (al pasar/empezar)', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.GREETINGS },

  // Presentaciones
  { id: 'p-hajimemashite', character: 'はじめまして', romaji: ['hajimemashite'], meaning: 'Mucho gusto (primera vez)', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.INTRODUCTIONS },
  { id: 'p-yoroshiku', character: 'よろしくおねがいします', romaji: ['yoroshiku onegaishimasu', 'yoroshikuonegaishimasu'], meaning: 'Un placer / Gracias de antemano', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.INTRODUCTIONS },
  { id: 'p-kochira-koso', character: 'こちらこそ', romaji: ['kochira koso', 'kochirakoso'], meaning: 'El gusto es mío', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.INTRODUCTIONS },
  { id: 'p-oai-dekite', character: 'おあいできてうれしいです', romaji: ['oai dekite ureshii desu', 'oaidekiteureshiidesu'], meaning: 'Encantado de conocerte', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.INTRODUCTIONS },
  { id: 'p-douzo', character: 'どうぞ', romaji: ['douzo', 'dozo'], meaning: 'Por favor (ofreciendo algo)', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.INTRODUCTIONS },

  // Indicaciones
  { id: 'p-massugu', character: 'まっすぐいってください', romaji: ['massugu itte kudasai', 'massuguittekudasai'], meaning: 'Siga recto', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.DIRECTIONS },
  { id: 'p-migi-magatte', character: 'みぎにまがってください', romaji: ['migi ni magatte kudasai', 'miginimagattekudasai'], meaning: 'Gire a la derecha', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.DIRECTIONS },
  { id: 'p-hidari-magatte', character: 'ひだりにまがってください', romaji: ['hidari ni magatte kudasai', 'hidarinimagattekudasai'], meaning: 'Gire a la izquierda', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.DIRECTIONS },
  { id: 'p-koko-magatte', character: 'ここをまがってください', romaji: ['koko o magatte kudasai', 'koko omagatte kudasai', 'kokoomagattekudasai'], meaning: 'Gire aquí', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.DIRECTIONS },
  { id: 'p-tomatte', character: 'とまってください', romaji: ['tomatte kudasai', 'tomattekudasai'], meaning: 'Deténgase / Pare', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.DIRECTIONS },

  // En la mesa
  { id: 'p-itadakimasu', character: 'いただきます', romaji: ['itadakimasu'], meaning: 'Buen provecho (antes de comer)', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.DINING },
  { id: 'p-gochisousama', character: 'ごちそうさまでした', romaji: ['gochisousama deshita', 'gochisousamadeshita'], meaning: 'Gracias por la comida (después)', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.DINING },
  { id: 'p-okawari', character: 'おかわりください', romaji: ['okawari kudasai', 'okawarikudasai'], meaning: 'Otra ración, por favor', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.DINING },
  { id: 'p-oishii-desu', character: 'おいしいです', romaji: ['oishii desu', 'oishiidesu'], meaning: 'Está delicioso', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.DINING },
  { id: 'p-ohashi', character: 'おはしをください', romaji: ['ohashi o kudasai', 'ohashiokudasai'], meaning: 'Palillos, por favor', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.DINING },

  // Cortesía
  { id: 'p-arigatou-gozaimasu', character: 'ありがとうございます', romaji: ['arigatou gozaimasu', 'arigatougozaimasu'], meaning: 'Muchas gracias (formal)', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.COURTESY },
  { id: 'p-dou-itashimashite', character: 'どういたしまして', romaji: ['dou itashimashite', 'douitashimashite'], meaning: 'De nada', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.COURTESY },
  { id: 'p-sumimasen', character: 'すみません', romaji: ['sumimasen'], meaning: 'Disculpe / Perdón', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.COURTESY },
  { id: 'p-shitsurei', character: 'しつれいします', romaji: ['shitsurei shimasu', 'shitsureishimasu'], meaning: 'Con permiso / Disculpe', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.COURTESY },
  { id: 'p-otsukaresama', character: 'おつかれさまでした', romaji: ['otsukaresama deshita', 'otsukaresamadeshita'], meaning: 'Buen trabajo (gracias por tu esfuerzo)', category: CharacterCategory.PHRASE, phraseCategory: PhraseCategory.COURTESY },

  // ========================
  // NUMBERS
  // ========================
  { id: 'n-1', character: '一', romaji: ['ichi'], meaning: 'uno', category: CharacterCategory.NUMBER },
  { id: 'n-2', character: '二', romaji: ['ni'], meaning: 'dos', category: CharacterCategory.NUMBER },
  { id: 'n-3', character: '三', romaji: ['san'], meaning: 'tres', category: CharacterCategory.NUMBER },
  { id: 'n-4', character: '四', romaji: ['shi', 'yon'], meaning: 'cuatro', category: CharacterCategory.NUMBER },
  { id: 'n-5', character: '五', romaji: ['go'], meaning: 'cinco', category: CharacterCategory.NUMBER },
  { id: 'n-6', character: '六', romaji: ['roku'], meaning: 'seis', category: CharacterCategory.NUMBER },
  { id: 'n-7', character: '七', romaji: ['shichi', 'nana'], meaning: 'siete', category: CharacterCategory.NUMBER },
  { id: 'n-8', character: '八', romaji: ['hachi'], meaning: 'ocho', category: CharacterCategory.NUMBER },
  { id: 'n-9', character: '九', romaji: ['kyuu', 'ku', 'kyu'], meaning: 'nueve', category: CharacterCategory.NUMBER },
  { id: 'n-10', character: '十', romaji: ['juu', 'ju'], meaning: 'diez', category: CharacterCategory.NUMBER },
  { id: 'n-100', character: '百', romaji: ['hyaku'], meaning: 'cien', category: CharacterCategory.NUMBER },
  { id: 'n-1000', character: '千', romaji: ['sen'], meaning: 'mil', category: CharacterCategory.NUMBER },
  { id: 'n-10000', character: '万', romaji: ['man'], meaning: 'diez mil', category: CharacterCategory.NUMBER },
  { id: 'n-0', character: '零', romaji: ['rei', 'zero'], meaning: 'cero', category: CharacterCategory.NUMBER },
]
