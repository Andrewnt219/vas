import { Language } from '@data/localization-data';
import Prismic from '@prismicio/client';
export const Predicates = Prismic.Predicates;

export const defaultQueryOptionsFactory = (modelQuery: string) => (
	lang: Language,
	otherOptions?: Record<string, any>
) => ({ graphQuery: modelQuery, lang, ...otherOptions });
