import type { SentenceExercise } from '../types';

export const sentenceExercises: SentenceExercise[] = [
  {
    id: 'sentence-001',
    lessonId: 101,
    category: 'Presentaciones',
    type: 'sentence_order',
    japanese: 'わたし は がくせい です',
    translation: 'Yo soy estudiante',
    words: ['です', 'がくせい', 'わたし', 'は'],
    distractors: ['せんせい', 'さん'],
    spanishWords: ['Yo', 'soy', 'estudiante'],
    spanishDistractors: ['el', 'profesor'],
    difficulty: 'easy'
  },
  {
    id: 'sentence-002',
    lessonId: 101,
    category: 'Presentaciones',
    type: 'sentence_order',
    japanese: 'わたし は マリア です',
    translation: 'Yo soy María',
    words: ['です', 'マリア', 'わたし', 'は'],
    distractors: ['なまえ', 'の'],
    spanishWords: ['Yo', 'soy', 'María'],
    spanishDistractors: ['mi', 'se llama'],
    difficulty: 'easy'
  },
  {
    id: 'sentence-003',
    lessonId: 101,
    category: 'Presentaciones',
    type: 'sentence_order',
    japanese: 'はじめまして',
    translation: 'Mucho gusto',
    words: ['はじめまして'],
    distractors: ['ありがとう', 'こんにちは'],
    spanishWords: ['Mucho', 'gusto'],
    spanishDistractors: ['Gracias', 'Buenas', 'tardes'],
    difficulty: 'easy'
  },
  {
    id: 'sentence-004',
    lessonId: 102,
    category: 'Tiempo',
    type: 'sentence_order',
    japanese: 'きょう は げつようび です',
    translation: 'Hoy es lunes',
    words: ['です', 'げつようび', 'きょう', 'は'],
    distractors: ['あした', 'にちようび'],
    spanishWords: ['Hoy', 'es', 'lunes'],
    spanishDistractors: ['Ayer', 'domingo'],
    difficulty: 'medium'
  },
  {
    id: 'sentence-005',
    lessonId: 102,
    category: 'Tiempo',
    type: 'sentence_order',
    japanese: 'いま は なんじ です か',
    translation: '¿Qué hora es ahora?',
    words: ['か', 'です', 'なんじ', 'は', 'いま'],
    distractors: ['にち', 'を'],
    spanishWords: ['¿Qué', 'hora', 'es', 'ahora?'],
    spanishDistractors: ['minuto', 'el'],
    difficulty: 'medium'
  },
  {
    id: 'sentence-006',
    lessonId: 103,
    category: 'Comida',
    type: 'sentence_order',
    japanese: 'りんご を たべます',
    translation: 'Como una manzana',
    words: ['たべます', 'を', 'りんご'],
    distractors: ['のみます', 'パン'],
    spanishWords: ['Como', 'una', 'manzana'],
    spanishDistractors: ['Bebo', 'pan'],
    difficulty: 'medium'
  },
  {
    id: 'sentence-007',
    lessonId: 103,
    category: 'Comida',
    type: 'sentence_order',
    japanese: 'みず を のみます',
    translation: 'Bebo agua',
    words: ['のります', 'を', 'みず'],
    distractors: ['ごはん', 'たべます'],
    spanishWords: ['Bebo', 'agua'],
    spanishDistractors: ['como', 'arroz'],
    difficulty: 'medium'
  },
  {
    id: 'sentence-img-001',
    lessonId: 104,
    category: 'Verificación Visual',
    type: 'image_binary',
    japanese: 'これは ねこ です',
    translation: 'Esto es un gato',
    imageUrls: ['https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgh9T8iIULZyWTH12dBhJiLlqWJ5jHe9DVdEZ72cJJuA7ru5B5lpJew5VvqmbF_KbYdxABcMxh9YcNr7vUL3CRZpW75EMkPGjowjOaK8R7ivS0eJje_nYNTB2H2eBZTIGf5jsz3MtBHPWo/s400/pet_cat_kedukuroi.png', 
                'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAeGNeOpV8DhSfyIY29t8yrzJZGO_rzNrBBQwlot4jtJ8Fuyy-eIfxLQ1ojuqg4RyFlurEH0fdu0P_JdHcIgvOx1vbast3ml7JDxlC2snHadlbZVyrHLM8mamGwAP3E86Y7KAT_VSnv8lj/s400/sleep_animal_cat.png'],
    isTrue: true,
    difficulty: 'easy'
  },
  {
    id: 'sentence-img-002',
    lessonId: 104,
    category: 'Verificación Visual',
    type: 'image_binary',
    japanese: 'これは いぬ です',
    translation: 'Esto es un perro',
    imageUrls: ['https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhG4xpQ_FMBOIdN_junRODMG3TxJw1q5hSm_OVtAJkeI_qS2JBSQbHltv1SE46v-zagGxHe6aKvzbkziOE7LeInDS7UIIhwUfcCBYnmFhJe6dNjM4Jribry1PoJagMXmVhOsR7ESGt-0l9G/s400/dog_akitainu.png', 
                'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiY4WaJ3gVgvAsbaKh-_dNrS4-bhxxQT_qRuO4GR2AG6OFYpcdC1lQBHXI6Hx0SaP5vnlZwpm1NZfuDuuV1wMZC6eEn1r7S6nEZsZ1ZsWEygcw_dazTC2zlDb1Di1YMv-KDdYf5XtwH-ITU/s400/dog_hoeru_kyouken.png'],
    isTrue: true,
    difficulty: 'easy'
  }
];