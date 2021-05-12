export const padZero = (number: number): string => {
  return number.toString().padStart(2, '0');
};

/* -------------------------------------------------------------------------- */

export const getReadingMinutes = (text: string): number => {
  const READING_SPEED = 265;

  const wordsCount = text.split(' ').length;
  const readingMinutes = Math.floor(wordsCount / READING_SPEED);
  return readingMinutes < 1 ? 1 : readingMinutes;
};
