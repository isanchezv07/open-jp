import type { Word, Lesson } from '../types';

export const otrosLessons: Lesson[] = [
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

export const otrosWords: Word[] = [
  // NÚMEROS
  { id: 400, kanji: '一', reading: 'いち', romaji: 'ichi', meanings: ['uno'], category: 'números', unit: 'Números', lessonId: 9, jlpt: 5 },
  { id: 401, kanji: '二', reading: 'に', romaji: 'ni', meanings: ['dos'], category: 'números', unit: 'Números', lessonId: 9, jlpt: 5 },
  
  // TIEMPO
  { id: 500, kanji: '今日', reading: 'きょう', romaji: 'kyou', meanings: ['hoy'], category: 'tiempo', unit: 'Tiempo', lessonId: 10, jlpt: 5 },
  { id: 501, kanji: '今', reading: 'いま', romaji: 'ima', meanings: ['ahora'], category: 'tiempo', unit: 'Tiempo', lessonId: 10, jlpt: 5 },
  
  // ESCUCHA
  { id: 600, kanji: '聞いて', reading: 'きいて', romaji: 'kiite', meanings: ['escucha'], category: 'escucha', unit: 'Escucha', lessonId: 15, jlpt: 5 },
];
