import type { Word, Lesson } from '../types';
import { hiraganaLessons, hiraganaWords } from './hiragana';
import { katakanaLessons, katakanaWords } from './katakana';
import { kanjiLessons, kanjiWords } from './kanji';
import { verbosLessons, verbosWords } from './verbos';
import { vocabularioLessons, vocabularioWords } from './vocabulario';
import { otrosLessons, otrosWords } from './otros';

export const lessons: Lesson[] = [
  ...hiraganaLessons,
  ...katakanaLessons,
  ...kanjiLessons,
  ...verbosLessons,
  ...vocabularioLessons,
  ...otrosLessons,
];

export const words: Word[] = [
  ...hiraganaWords,
  ...katakanaWords,
  ...kanjiWords,
  ...verbosWords,
  ...vocabularioWords,
  ...otrosWords,
];
