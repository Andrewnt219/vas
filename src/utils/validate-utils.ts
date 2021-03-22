import { Language, languages } from '@src/data/localization-data';

export function isValidLocale(obj: any): obj is Language {
	return languages.includes(obj);
}
