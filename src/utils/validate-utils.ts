import { CategorySlug, categorySlugs } from '@lib/sanity/models/CategoryModel';
import { Language, languages } from '@src/data/localization-data';

export function isValidLocale(locale: any): locale is Language {
	return languages.includes(locale);
}

export function isValidCategorySlug(
	categorySlug: any
): categorySlug is CategorySlug {
	return categorySlugs.includes(categorySlug);
}
