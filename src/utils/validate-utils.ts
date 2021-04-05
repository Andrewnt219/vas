import { CategorySlug, categorySlugs } from "@lib/sanity/models/CategoryModel";
import {
  DEFAULT_LANGUAGE,
  Language,
  languages,
} from "@src/data/localization-data";

export function isValidLocale(locale: any): locale is Language {
  return languages.includes(locale);
}

/* -------------------------------------------------------------------------- */

export function isNullOrUndefined(obj: any): obj is null | undefined {
  return obj === null || obj === undefined;
}

/* -------------------------------------------------------------------------- */

export function tryParseLocale(locale: any): Language {
  return isValidLocale(locale) ? locale : DEFAULT_LANGUAGE;
}
/* -------------------------------------------------------------------------- */

export function isValidCategorySlug(
  categorySlug: any
): categorySlug is CategorySlug {
  return categorySlugs.includes(categorySlug);
}
/* -------------------------------------------------------------------------- */

const handlerKeys = [
  "get",
  "post",
  "update",
  "delete",
  "patch",
  "head",
  "connect",
  "options",
  "trace",
] as const;
export type Handler = typeof handlerKeys[number];

export function isValidHttpMethod(method: any): method is Handler {
  return handlerKeys.includes(method.toLowerCase());
}

/* -------------------------------------------------------------------------- */
export function isString(str: unknown): str is string {
  return typeof str === "string" && str.length > 0;
}
