import { CategorySlug, categorySlugs } from '@lib/sanity/models/CategoryModel';
import { Language, languages } from '@src/data/localization-data';

export function isValidLocale(obj: any): obj is Language {
	return languages.includes(obj);
}

export function isValidCategorySlug(obj: any): obj is CategorySlug {
	return categorySlugs.includes(obj);
}
