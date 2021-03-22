import { Language } from '@data/localization-data';
import i18nConfig from '@root/i18n.json';
import { isValidLocale } from '@utils/validate-utils';

export class LocaleDataService {
	private static language: Language = i18nConfig.defaultLocale as Language;

	public static setLocale(lang: unknown): void {
		if (isValidLocale(lang)) {
			this.language = lang;
		}
	}

	public static getLocale(): Language {
		return this.language;
	}
}
