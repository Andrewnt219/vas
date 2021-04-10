import { Language } from '@data/localization-data';
import firestore from '@lib/firestore/firestore';
import { MemberDocument, memberQuery } from '@lib/prismic/models/MemberModel';
import {
	defaultQueryOptionsFactory,
	Predicates,
} from '@lib/prismic/prismic-helpers';
import { PMclient } from '@root/prismic-configuration';
export class AuthorDataService {
	private static collection = firestore.collection('authors');
	private static cms = PMclient;

	public static async getAuthors(lang: Language): Promise<MemberDocument[]> {
		const options = getDefaultQuery(lang);
		const query = Predicates.at('document.type', 'member');

		return (await this.cms.query(query, options)).results as MemberDocument[];
	}

	public static async getActiveAuthors(
		lang: Language
	): Promise<MemberDocument[]> {
		const options = getDefaultQuery(lang);
		const query = [
			Predicates.at('document.type', 'member'),
			Predicates.at('my.member.is_active', true),
		];

		return (await this.cms.query(query, options)).results as MemberDocument[];
	}

	public static async countAuthors(lang: Language): Promise<number> {
		return (await this.getAuthors(lang)).length;
	}

	public static async countActiveAuthors(lang: Language): Promise<number> {
		return (await this.getActiveAuthors(lang)).length;
	}
}

const getDefaultQuery = defaultQueryOptionsFactory(memberQuery);
