import firestore from '@lib/firestore';
import { AuthorModel, authorModelQuery } from '@lib/sanity/models/AuthorModel';
import { localizedSanityClient } from '@lib/sanity/sanity-clients';
export class AuthorDataService {
	private static collection = firestore.collection('authors');
	private static cms = localizedSanityClient;

	public static async getAuthors(): Promise<AuthorModel[]> {
		return this.cms.fetch(`*[_type == 'author'] ${authorModelQuery}`);
	}

	public static async getActiveAuthors(): Promise<AuthorModel[]> {
		return this.cms.fetch(
			`*[_type == 'author' && isActive] ${authorModelQuery}`
		);
	}
}
