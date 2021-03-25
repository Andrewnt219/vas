import { CategorySlug, categorySlugs } from '@lib/sanity/models/CategoryModel';
import { Language, languages } from '@src/data/localization-data';

export function isValidLocale(locale: any): locale is Language {
	return languages.includes(locale);
}
/* -------------------------------------------------------------------------- */

export function isValidCategorySlug(
	categorySlug: any
): categorySlug is CategorySlug {
	return categorySlugs.includes(categorySlug);
}
/* -------------------------------------------------------------------------- */

const handlerKeys = [
	'get',
	'post',
	'update',
	'delete',
	'patch',
	'head',
	'connect',
	'options',
	'trace',
] as const;
export type Handler = typeof handlerKeys[number];

export function isValidHttpMethod(method: any): method is Handler {
	return handlerKeys.includes(method.toLowerCase());
}
