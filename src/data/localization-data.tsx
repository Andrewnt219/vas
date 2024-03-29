import i18nConfig from '@root/i18n.json';

export const languages = ['en-us', 'vi'] as const;

export const DEFAULT_LANGUAGE = i18nConfig.defaultLocale as Language;

export type Language = typeof languages[number];
