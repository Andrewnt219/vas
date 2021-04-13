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

export const defaultQueryOptionsFactory = (modelQuery: string) => (
	lang: LanguageOption,
	otherOptions?: Record<string, any>
) => ({ graphQuery: modelQuery, lang, ...otherOptions });
