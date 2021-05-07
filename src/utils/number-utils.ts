export const padZero = (number: number): string => {
	return number.toString().padStart(2, '0');
};

/* -------------------------------------------------------------------------- */

export const getReadingMinutes = (text: string): number => {
	const READING_SPEED = 265;

	const wordsCount = text.split(' ').length;
	return Math.floor(wordsCount / READING_SPEED);
};
