import { Language } from '@data/localization-data';
import firestore from '@lib/firestore/firestore';
import {
	HashtagDocument,
	hashtagQuery,
} from '@lib/prismic/models/HashtagModel';
import {
	defaultQueryOptionsFactory,
	Predicates,
} from '@lib/prismic/prismic-helpers';
import { PMclient } from '@root/prismic-configuration';

export class HashtagDataService {
	private static collection = firestore.collection('hashtags');
	private static cms = PMclient;

	public static async getHashtags(lang: Language): Promise<HashtagDocument[]> {
		const query = Predicates.at('document.type', 'hashtag');
		const options = getDefaultQuery(lang);

		return (await this.cms.query(query, options)).results as HashtagDocument[];
	}
}

const getDefaultQuery = defaultQueryOptionsFactory(hashtagQuery);
