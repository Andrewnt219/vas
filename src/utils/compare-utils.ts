export const compareDates = (a: string | Date, b: string | Date): number =>
	new Date(a).getTime() - new Date(b).getTime();
