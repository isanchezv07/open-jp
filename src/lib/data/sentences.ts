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
    japanese: 'これは りんご です',
    translation: 'Esto es una manzana',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&q=80', // Cat image
    isTrue: false,
    difficulty: 'easy'
  }
];
