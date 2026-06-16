export interface Lesson {
  id: number;
  unit: string;
  title: string;
  order: number;
}

export interface Word {
  id: number;
  kanji: string;
  reading: string;
  romaji: string;
  meanings: string[];
  category: string;
  unit: string;
  lessonId: number;
  jlpt: number;
  image_url?: string;
  audio_url?: string;
  example_ja?: string;
  example_es?: string;
}

export interface SentenceExercise {
  id: string;
  lessonId: number;
  category: string;
  type: 'sentence_order';
  japanese: string;
  translation: string;
  words: string[]; // Japanese words
  spanishWords?: string[]; // Optional Spanish words for ja-es mode
  distractors?: string[]; // Extra Japanese words to make it harder
  spanishDistractors?: string[]; // Extra Spanish words to make it harder
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Progress {
  word_id: number;
  ease: number;
  interval: number;
  repetitions: number;
  next_review: Date;
  last_review?: Date;
}
