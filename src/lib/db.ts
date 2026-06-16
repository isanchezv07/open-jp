import Dexie, { type EntityTable } from 'dexie';

export interface Lesson {
  id?: number;
  unit: string; // Linking to unit by string name as in existing implementation
  title: string;
  order: number;
}

export interface Word {
  id?: number;
  kanji: string;
  reading: string;
  romaji: string;
  meanings: string[];
  category: string;
  unit: string;
  lessonId: number; // New foreign key to Lesson
  jlpt: number; // 0-5
  image_url?: string;
  audio_url?: string;
  example_ja?: string;
  example_es?: string;
}

export interface Progress {
  word_id: number;
  ease: number; // SM-2 Easiness Factor (default 2.5)
  interval: number; // Days until next review
  repetitions: number; // Successful consecutive reviews
  next_review: Date;
  last_review?: Date;
}

export interface UserStats {
  id: string; // 'current'
  xp: number;
  streak: number;
  last_active: Date;
  badges: string[];
}

const db = new Dexie('JapaneseVocabDB') as Dexie & {
  lessons: EntityTable<Lesson, 'id'>;
  words: EntityTable<Word, 'id'>;
  progress: EntityTable<Progress, 'word_id'>;
  userStats: EntityTable<UserStats, 'id'>;
};

// Schema definition
db.version(1).stores({
  lessons: '++id, unit, order',
  words: '++id, unit, lessonId, kanji, reading, jlpt',
  progress: 'word_id, next_review, ease',
  userStats: 'id'
});

export { db };
