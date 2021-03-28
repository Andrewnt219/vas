import firestore from '@lib/firestore/firestore';
import { AuthorModel, authorModelQuery } from '@lib/sanity/models/AuthorModel';
import { sanityClient } from '@lib/sanity/sanity-clients';
export class AuthorDataService {
	private static collection = firestore.collection('authors');
	private static cms = sanityClient;

	public static async getAuthors(): Promise<AuthorModel[]> {
		return this.cms.fetch(`*[_type == 'author'] ${authorModelQuery}`);
	}

	public static async getActiveAuthors(): Promise<AuthorModel[]> {
		return this.cms.fetch(
			`*[_type == 'author' && isActive] ${authorModelQuery}`
		);
	}

	public static countAuthors(): Promise<number> {
		return this.cms.fetch(`
			count(*[_type == 'author'])
		`);
	}

	public static countActiveAuthors(): Promise<number> {
		return this.cms.fetch(`
			count(*[_type == 'author' && isActive])
		`);
	}
}
