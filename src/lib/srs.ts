import type { Progress } from './db';

/**
 * SuperMemo-2 (SM-2) Algorithm implementation.
 * @param quality User response quality: 0 (forgot), 1 (hard), 2 (good), 3 (easy)
 * @param prevProgress Previous progress state for the word
 */
export function calculateNextReview(quality: number, prevProgress?: Progress): Progress {
  let ease = prevProgress?.ease ?? 2.5;
  let interval = prevProgress?.interval ?? 0;
  let repetitions = prevProgress?.repetitions ?? 0;

  if (quality >= 1) { // 1, 2, or 3 (Successful recall)
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease);
    }
    repetitions++;
  } else { // 0 (Forgot)
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor: EF' = EF + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02))
  // Simplified for 0-3 scale:
  const qMap = [0, 2, 4, 5]; // Mapping 0-3 to SM-2's 0-5
  const sm2Quality = qMap[quality];
  
  ease = ease + (0.1 - (5 - sm2Quality) * (0.08 + (5 - sm2Quality) * 0.02));
  if (ease < 1.3) ease = 1.3;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);
  nextReview.setHours(0, 0, 0, 0); // Normalize to start of day

  return {
    word_id: prevProgress?.word_id ?? 0, // Should be set by caller
    ease,
    interval,
    repetitions,
    next_review: nextReview,
    last_review: new Date()
  };
}

export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/\s+/g, ' ') // Normalize multiple spaces to a single space
    .trim();
}

export function validateAnswer(input: string, correctMeanings: string[]): boolean {
  const normalizedInput = normalizeString(input);
  return correctMeanings.some(meaning => normalizeString(meaning) === normalizedInput);
}
