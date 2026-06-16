import { db, type Word, type Lesson } from './db';

const initialLessons: Lesson[] = [
  { id: 1, unit: 'Hiragana', title: 'Vocales', order: 1 },
  { id: 2, unit: 'Katakana', title: 'Vocales', order: 1 },
  { id: 3, unit: 'Verbos', title: 'Básicos', order: 1 },
  { id: 4, unit: 'Kanji', title: 'N5', order: 1 },
  { id: 5, unit: 'Vocabulario', title: 'Naturaleza', order: 1 },
  { id: 6, unit: 'Vocabulario', title: 'Educación', order: 2 },
  { id: 7, unit: 'Adjetivos', title: 'Básicos', order: 1 },
  { id: 8, unit: 'Sustantivos', title: 'Básicos', order: 1 },
  { id: 9, unit: 'Números', title: 'Básicos', order: 1 },
  { id: 10, unit: 'Tiempo', title: 'Básicos', order: 1 },
  { id: 11, unit: 'Partículas', title: 'Básicas', order: 1 },
  { id: 12, unit: 'Gramática', title: 'Básica', order: 1 },
  { id: 13, unit: 'Tiempos Verbales', title: 'Presente', order: 1 },
  { id: 14, unit: 'Conversación', title: 'Básica', order: 1 },
  { id: 15, unit: 'Escucha', title: 'Nivel 1', order: 1 },
];

const initialWords: Word[] = [
  // HIRAGANA (lessonId: 1)
  { kanji: 'あ', reading: 'a', romaji: 'a', meanings: ['a'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'い', reading: 'i', romaji: 'i', meanings: ['i'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'う', reading: 'u', romaji: 'u', meanings: ['u'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'え', reading: 'e', romaji: 'e', meanings: ['e'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'お', reading: 'o', romaji: 'o', meanings: ['o'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },

  { kanji: 'か', reading: 'ka', romaji: 'ka', meanings: ['ka'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'き', reading: 'ki', romaji: 'ki', meanings: ['ki'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'く', reading: 'ku', romaji: 'ku', meanings: ['ku'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'け', reading: 'ke', romaji: 'ke', meanings: ['ke'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'こ', reading: 'ko', romaji: 'ko', meanings: ['ko'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },

  { kanji: 'さ', reading: 'sa', romaji: 'sa', meanings: ['sa'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'し', reading: 'shi', romaji: 'shi', meanings: ['shi'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'す', reading: 'su', romaji: 'su', meanings: ['su'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'せ', reading: 'se', romaji: 'se', meanings: ['se'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'そ', reading: 'so', romaji: 'so', meanings: ['so'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },

  { kanji: 'た', reading: 'ta', romaji: 'ta', meanings: ['ta'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'ち', reading: 'chi', romaji: 'chi', meanings: ['chi'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'つ', reading: 'tsu', romaji: 'tsu', meanings: ['tsu'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'て', reading: 'te', romaji: 'te', meanings: ['te'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'と', reading: 'to', romaji: 'to', meanings: ['to'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },

  { kanji: 'な', reading: 'na', romaji: 'na', meanings: ['na'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'に', reading: 'ni', romaji: 'ni', meanings: ['ni'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'ぬ', reading: 'nu', romaji: 'nu', meanings: ['nu'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'ね', reading: 'ne', romaji: 'ne', meanings: ['ne'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'の', reading: 'no', romaji: 'no', meanings: ['no'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },

  { kanji: 'は', reading: 'ha', romaji: 'ha', meanings: ['ha'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'ひ', reading: 'hi', romaji: 'hi', meanings: ['hi'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'ふ', reading: 'fu', romaji: 'fu', meanings: ['fu'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'へ', reading: 'he', romaji: 'he', meanings: ['he'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'ほ', reading: 'ho', romaji: 'ho', meanings: ['ho'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },

  { kanji: 'ま', reading: 'ma', romaji: 'ma', meanings: ['ma'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'み', reading: 'mi', romaji: 'mi', meanings: ['mi'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'む', reading: 'mu', romaji: 'mu', meanings: ['mu'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'め', reading: 'me', romaji: 'me', meanings: ['me'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'も', reading: 'mo', romaji: 'mo', meanings: ['mo'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },

  { kanji: 'や', reading: 'ya', romaji: 'ya', meanings: ['ya'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'ゆ', reading: 'yu', romaji: 'yu', meanings: ['yu'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'よ', reading: 'yo', romaji: 'yo', meanings: ['yo'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },

  { kanji: 'ら', reading: 'ra', romaji: 'ra', meanings: ['ra'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'り', reading: 'ri', romaji: 'ri', meanings: ['ri'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'る', reading: 'ru', romaji: 'ru', meanings: ['ru'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'れ', reading: 're', romaji: 're', meanings: ['re'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'ろ', reading: 'ro', romaji: 'ro', meanings: ['ro'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },

  { kanji: 'わ', reading: 'wa', romaji: 'wa', meanings: ['wa'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },
  { kanji: 'を', reading: 'wo', romaji: 'wo', meanings: ['wo'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },

  { kanji: 'ん', reading: 'n', romaji: 'n', meanings: ['n'], category: 'letras', unit: 'Hiragana', lessonId: 1, jlpt: 0 },

  // KATAKANA (lessonId: 2)
  { kanji: 'ア', reading: 'a', romaji: 'a', meanings: ['a'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'イ', reading: 'i', romaji: 'i', meanings: ['i'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ウ', reading: 'u', romaji: 'u', meanings: ['u'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'エ', reading: 'e', romaji: 'e', meanings: ['e'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'オ', reading: 'o', romaji: 'o', meanings: ['o'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },

  { kanji: 'カ', reading: 'ka', romaji: 'ka', meanings: ['ka'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'キ', reading: 'ki', romaji: 'ki', meanings: ['ki'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ク', reading: 'ku', romaji: 'ku', meanings: ['ku'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ケ', reading: 'ke', romaji: 'ke', meanings: ['ke'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'コ', reading: 'ko', romaji: 'ko', meanings: ['ko'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },

  { kanji: 'サ', reading: 'sa', romaji: 'sa', meanings: ['sa'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'シ', reading: 'shi', romaji: 'shi', meanings: ['shi'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ス', reading: 'su', romaji: 'su', meanings: ['su'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'セ', reading: 'se', romaji: 'se', meanings: ['se'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ソ', reading: 'so', romaji: 'so', meanings: ['so'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },

  { kanji: 'タ', reading: 'ta', romaji: 'ta', meanings: ['ta'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'チ', reading: 'chi', romaji: 'chi', meanings: ['chi'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ツ', reading: 'tsu', romaji: 'tsu', meanings: ['tsu'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'テ', reading: 'te', romaji: 'te', meanings: ['te'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ト', reading: 'to', romaji: 'to', meanings: ['to'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },

  { kanji: 'ナ', reading: 'na', romaji: 'na', meanings: ['na'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ニ', reading: 'ni', romaji: 'ni', meanings: ['ni'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ヌ', reading: 'nu', romaji: 'nu', meanings: ['nu'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ネ', reading: 'ne', romaji: 'ne', meanings: ['ne'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ノ', reading: 'no', romaji: 'no', meanings: ['no'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },

  { kanji: 'ハ', reading: 'ha', romaji: 'ha', meanings: ['ha'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ヒ', reading: 'hi', romaji: 'hi', meanings: ['hi'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'フ', reading: 'fu', romaji: 'fu', meanings: ['fu'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ヘ', reading: 'he', romaji: 'he', meanings: ['he'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ホ', reading: 'ho', romaji: 'ho', meanings: ['ho'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },

  { kanji: 'マ', reading: 'ma', romaji: 'ma', meanings: ['ma'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ミ', reading: 'mi', romaji: 'mi', meanings: ['mi'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ム', reading: 'mu', romaji: 'mu', meanings: ['mu'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'メ', reading: 'me', romaji: 'me', meanings: ['me'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'モ', reading: 'mo', romaji: 'mo', meanings: ['mo'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },

  { kanji: 'ヤ', reading: 'ya', romaji: 'ya', meanings: ['ya'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ユ', reading: 'yu', romaji: 'yu', meanings: ['yu'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ヨ', reading: 'yo', romaji: 'yo', meanings: ['yo'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },

  { kanji: 'ラ', reading: 'ra', romaji: 'ra', meanings: ['ra'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'リ', reading: 'ri', romaji: 'ri', meanings: ['ri'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ル', reading: 'ru', romaji: 'ru', meanings: ['ru'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'レ', reading: 're', romaji: 're', meanings: ['re'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ロ', reading: 'ro', romaji: 'ro', meanings: ['ro'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },

  { kanji: 'ワ', reading: 'wa', romaji: 'wa', meanings: ['wa'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },
  { kanji: 'ヲ', reading: 'wo', romaji: 'wo', meanings: ['wo'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },

  { kanji: 'ン', reading: 'n', romaji: 'n', meanings: ['n'], category: 'letras', unit: 'Katakana', lessonId: 2, jlpt: 0 },

  // VERBOS (lessonId: 3)
  { kanji: 'たべる', reading: 'たべる', romaji: 'taberu', meanings: ['comer'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'のむ', reading: 'のむ', romaji: 'nomu', meanings: ['beber'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'いく', reading: 'いく', romaji: 'iku', meanings: ['ir'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'くる', reading: 'くる', romaji: 'kuru', meanings: ['venir'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'みる', reading: 'みる', romaji: 'miru', meanings: ['ver', 'mirar'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'きく', reading: 'きく', romaji: 'kiku', meanings: ['escuchar', 'preguntar'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'はなす', reading: 'はなす', romaji: 'hanasu', meanings: ['hablar'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'よむ', reading: 'よむ', romaji: 'yomu', meanings: ['leer'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'かく', reading: 'かく', romaji: 'kaku', meanings: ['escribir'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'かう', reading: 'かう', romaji: 'kau', meanings: ['comprar'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },

  { kanji: 'あう', reading: 'あう', romaji: 'au', meanings: ['encontrarse con'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'まつ', reading: 'まつ', romaji: 'matsu', meanings: ['esperar'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'ねる', reading: 'ねる', romaji: 'neru', meanings: ['dormir'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'おきる', reading: 'おきる', romaji: 'okiru', meanings: ['levantarse', 'despertarse'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'する', reading: 'する', romaji: 'suru', meanings: ['hacer'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },

  { kanji: 'つかう', reading: 'つかう', romaji: 'tsukau', meanings: ['usar'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'もつ', reading: 'もつ', romaji: 'motsu', meanings: ['tener', 'sostener'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'しる', reading: 'しる', romaji: 'shiru', meanings: ['saber', 'conocer'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'わかる', reading: 'わかる', romaji: 'wakaru', meanings: ['entender'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },
  { kanji: 'ある', reading: 'ある', romaji: 'aru', meanings: ['haber', 'existir (objetos)'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },

  { kanji: 'いる', reading: 'いる', romaji: 'iru', meanings: ['haber', 'existir (personas y animales)'], category: 'verbos', unit: 'Verbos', lessonId: 3, jlpt: 5 },

  // KANJI (lessonId: 4)
  { kanji: '一', reading: 'いち', romaji: 'ichi', meanings: ['uno'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '二', reading: 'に', romaji: 'ni', meanings: ['dos'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '三', reading: 'さん', romaji: 'san', meanings: ['tres'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '四', reading: 'し', romaji: 'shi', meanings: ['cuatro'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '五', reading: 'ご', romaji: 'go', meanings: ['cinco'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '六', reading: 'ろく', romaji: 'roku', meanings: ['seis'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '七', reading: 'しち', romaji: 'shichi', meanings: ['siete'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '八', reading: 'はち', romaji: 'hachi', meanings: ['ocho'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '九', reading: 'きゅう', romaji: 'kyuu', meanings: ['nueve'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '十', reading: 'じゅう', romaji: 'juu', meanings: ['diez'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },

  { kanji: '百', reading: 'ひゃく', romaji: 'hyaku', meanings: ['cien'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '千', reading: 'せん', romaji: 'sen', meanings: ['mil'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '万', reading: 'まん', romaji: 'man', meanings: ['diez mil'], category: 'números', unit: 'Kanji', lessonId: 4, jlpt: 5 },

  { kanji: '日', reading: 'にち', romaji: 'nichi', meanings: ['día', 'sol'], category: 'tiempo', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '月', reading: 'げつ', romaji: 'getsu', meanings: ['mes', 'luna'], category: 'tiempo', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '火', reading: 'か', romaji: 'ka', meanings: ['fuego'], category: 'naturaleza', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '水', reading: 'すい', romaji: 'sui', meanings: ['agua'], category: 'naturaleza', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '木', reading: 'もく', romaji: 'moku', meanings: ['árbol', 'madera'], category: 'naturaleza', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '金', reading: 'きん', romaji: 'kin', meanings: ['oro', 'dinero'], category: 'naturaleza', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '土', reading: 'ど', romaji: 'do', meanings: ['tierra', 'suelo'], category: 'naturaleza', unit: 'Kanji', lessonId: 4, jlpt: 5 },

  { kanji: '人', reading: 'ひと', romaji: 'hito', meanings: ['persona'], category: 'personas', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '男', reading: 'おとこ', romaji: 'otoko', meanings: ['hombre'], category: 'personas', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '女', reading: 'おんな', romaji: 'onna', meanings: ['mujer'], category: 'personas', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '子', reading: 'こ', romaji: 'ko', meanings: ['niño', 'hijo'], category: 'personas', unit: 'Kanji', lessonId: 4, jlpt: 5 },

  { kanji: '父', reading: 'ちち', romaji: 'chichi', meanings: ['padre'], category: 'familia', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '母', reading: 'はは', romaji: 'haha', meanings: ['madre'], category: 'familia', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '友', reading: 'とも', romaji: 'tomo', meanings: ['amigo'], category: 'familia', unit: 'Kanji', lessonId: 4, jlpt: 5 },

  { kanji: '学', reading: 'がく', romaji: 'gaku', meanings: ['estudiar', 'aprendizaje'], category: 'escuela', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '校', reading: 'こう', romaji: 'kou', meanings: ['escuela'], category: 'escuela', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '先', reading: 'せん', romaji: 'sen', meanings: ['anterior', 'antes'], category: 'escuela', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '生', reading: 'せい', romaji: 'sei', meanings: ['vida', 'nacer'], category: 'escuela', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '本', reading: 'ほん', romaji: 'hon', meanings: ['libro'], category: 'escuela', unit: 'Kanji', lessonId: 4, jlpt: 5 },

  { kanji: '上', reading: 'うえ', romaji: 'ue', meanings: ['arriba'], category: 'direcciones', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '下', reading: 'した', romaji: 'shita', meanings: ['abajo'], category: 'direcciones', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '左', reading: 'ひだり', romaji: 'hidari', meanings: ['izquierda'], category: 'direcciones', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '右', reading: 'みぎ', romaji: 'migi', meanings: ['derecha'], category: 'direcciones', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '中', reading: 'なか', romaji: 'naka', meanings: ['dentro', 'medio'], category: 'direcciones', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '外', reading: 'そと', romaji: 'soto', meanings: ['afuera'], category: 'direcciones', unit: 'Kanji', lessonId: 4, jlpt: 5 },

  { kanji: '山', reading: 'やま', romaji: 'yama', meanings: ['montaña'], category: 'naturaleza', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '川', reading: 'かわ', romaji: 'kawa', meanings: ['río'], category: 'naturaleza', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '田', reading: 'た', romaji: 'ta', meanings: ['campo de arroz'], category: 'naturaleza', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '雨', reading: 'あめ', romaji: 'ame', meanings: ['lluvia'], category: 'naturaleza', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '空', reading: 'そら', romaji: 'sora', meanings: ['cielo'], category: 'naturaleza', unit: 'Kanji', lessonId: 4, jlpt: 5 },

  { kanji: '車', reading: 'くるま', romaji: 'kuruma', meanings: ['automóvil'], category: 'transporte', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '電', reading: 'でん', romaji: 'den', meanings: ['electricidad'], category: 'tecnología', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '駅', reading: 'えき', romaji: 'eki', meanings: ['estación'], category: 'transporte', unit: 'Kanji', lessonId: 4, jlpt: 5 },

  { kanji: '時', reading: 'じ', romaji: 'ji', meanings: ['hora'], category: 'tiempo', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '分', reading: 'ふん', romaji: 'fun', meanings: ['minuto'], category: 'tiempo', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '年', reading: 'ねん', romaji: 'nen', meanings: ['año'], category: 'tiempo', unit: 'Kanji', lessonId: 4, jlpt: 5 },

  { kanji: '見', reading: 'み', romaji: 'mi', meanings: ['ver'], category: 'verbos', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '行', reading: 'い', romaji: 'i', meanings: ['ir'], category: 'verbos', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '食', reading: 'しょく', romaji: 'shoku', meanings: ['comer'], category: 'verbos', unit: 'Kanji', lessonId: 4, jlpt: 5 },
  { kanji: '飲', reading: 'いん', romaji: 'in', meanings: ['beber'], category: 'verbos', unit: 'Kanji', lessonId: 4, jlpt: 5 },

  // VOCABULARIO
  { kanji: '水', reading: 'みず', romaji: 'mizu', meanings: ['agua'], category: 'naturaleza', unit: 'Vocabulario', lessonId: 5, jlpt: 5 },
  { kanji: '学校', reading: 'がっこう', romaji: 'gakkou', meanings: ['escuela'], category: 'escuela', unit: 'Vocabulario', lessonId: 6, jlpt: 5 },
  
  // NÚMEROS (lessonId: 9)
  { kanji: '一', reading: 'いち', romaji: 'ichi', meanings: ['uno'], category: 'números', unit: 'Números', lessonId: 9, jlpt: 5 },
  { kanji: '二', reading: 'に', romaji: 'ni', meanings: ['dos'], category: 'números', unit: 'Números', lessonId: 9, jlpt: 5 },
  
  // TIEMPO (lessonId: 10)
  { kanji: '今日', reading: 'きょう', romaji: 'kyou', meanings: ['hoy'], category: 'tiempo', unit: 'Tiempo', lessonId: 10, jlpt: 5 },
  
  // ESCUCHA (lessonId: 15)
  { kanji: '聞いて', reading: 'きいて', romaji: 'kiite', meanings: ['escucha'], category: 'escucha', unit: 'Escucha', lessonId: 15, jlpt: 5 }
];

export async function seedDatabase() {
  const lessonCount = await db.lessons.count();
  if (lessonCount === 0) {
    console.log('Seeding Lessons and Vocabulary...');
    await db.lessons.bulkAdd(initialLessons);
    await db.words.bulkAdd(initialWords);

    await db.userStats.add({
      id: 'current',
      xp: 0,
      streak: 0,
      last_active: new Date(),
      badges: []
    });
    console.log('Database seeded successfully.');
  }
}
