import { languages } from '@data/localization-data';
import Prismic from '@prismicio/client';

export const Predicates = Prismic.Predicates;

/* -------------------------------------------------------------------------- */

const languageOptions = [...languages, '*'] as const;
export type LanguageOption = typeof languageOptions[number];
export const isLanguageOption = (lang: any): lang is LanguageOption => {
  return languageOptions.includes(lang);
};

export const tryParseLanguageOption = (lang: any): LanguageOption => {
  return isLanguageOption(lang) ? lang : languageOptions[0];
};

/* -------------------------------------------------------------------------- */

/**
 * @example See https://prismic.io/docs/technologies/query-options-reference-javascript
 */
export type PrismicQueryOptions = Partial<{
  after: string;
  fetch: string;
  fetchLinks: string;
  lang: string;
  orderings: string;
  page: number;
  pageSize: number;
  ref: string;
}>;

export const defaultQueryOptionsFactory = (modelQuery: string) => (
  lang: LanguageOption,
  otherOptions?: Omit<PrismicQueryOptions, 'lang'>
) => ({ graphQuery: modelQuery, lang, ...otherOptions });
