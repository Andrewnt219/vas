import { Language } from '@data/localization-data';
import { Document } from '@prismicio/client/types/documents';
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

export type PrismicResult<Model extends Document> = {
  page: number;
  results_per_page: number;
  results_size: number;
  total_results_size: number;
  total_pages: number;
  next_page: string;
  prev_page: string;
  results: Model[];
};
