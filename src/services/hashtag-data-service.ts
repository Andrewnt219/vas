import firestore from '@lib/firestore/firestore';
import {
	HashtagModel,
	hashtagModelQuery,
} from '@lib/sanity/models/HashtagModel';
import { sanityClient } from '@lib/sanity/sanity-clients';

export class HashtagDataService {
	private static collection = firestore.collection('hashtags');
	private static cms = sanityClient;

	public static async getHashtags(): Promise<HashtagModel[]> {
		return this.cms.fetch(`
      *[_type = 'hashtag'] ${hashtagModelQuery}
    `);
	}
}
