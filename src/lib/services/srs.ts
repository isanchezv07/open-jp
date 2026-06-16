import type { Progress } from '../types';

export function calculateNextReview(quality: number, currentProgress?: Progress): Progress {
  let { ease = 2.5, interval = 0, repetitions = 0 } = currentProgress || {};

  if (quality >= 3) {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease);
    }
    repetitions++;
  } else {
    repetitions = 0;
    interval = 1;
  }

  ease = ease + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02));
  if (ease < 1.3) ease = 1.3;

  const next_review = new Date();
  next_review.setDate(next_review.getDate() + interval);

  return {
    word_id: currentProgress?.word_id || 0,
    ease,
    interval,
    repetitions,
    next_review,
    last_review: new Date()
  };
}

export function validateAnswer(input: string, correctMeanings: string[]): boolean {
  const normalizedInput = input.trim().toLowerCase();
  return correctMeanings.some(m => m.toLowerCase() === normalizedInput);
}
