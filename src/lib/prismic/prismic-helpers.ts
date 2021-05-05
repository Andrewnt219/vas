import { languages } from '@data/localization-data';
import Prismic from '@prismicio/client';
import { QueryOptions } from '@prismicio/client/types/ResolvedApi';

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

export const defaultQueryOptionsFactory = (
  modelQuery: string,
  defaultOptions?: QueryOptions
) => (lang: LanguageOption, options?: QueryOptions) => ({
  ...defaultOptions,
  graphQuery: modelQuery,
  lang,
  ...options,
});
