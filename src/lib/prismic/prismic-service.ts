import { Language } from '@data/localization-data';
import { PMclient } from '@root/prismic-configuration';
import {
	AboutUsDocument,
	aboutUsQuery,
} from './component-types/about-us/AboutUsModel';
import { defaultQueryOptionsFactory } from './prismic-helpers';

export class PrismicService {
	private static cms = PMclient;

	static async getAboutUs(
		lang: Language
	): Promise<AboutUsDocument | undefined> {
		const options = defaultQueryOptionsFactory(aboutUsQuery)(lang);

		return this.cms.getSingle('about_us', options);
	}
}
