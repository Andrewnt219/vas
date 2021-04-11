import { Language } from '@data/localization-data';
import firestore from '@lib/firestore/firestore';
import {
	CategoryDocument,
	categoryQuery,
} from '@lib/prismic/component-types/category/CategoryModel';
import {
	defaultQueryOptionsFactory,
	Predicates,
} from '@lib/prismic/prismic-helpers';
import { PMclient } from '@root/prismic-configuration';

export class CategoryService {
	private static readonly collection = firestore.collection('categories');
	private static readonly cms = PMclient;

	/* -------------------------------------------------------------------------- */

	public static async getCategories(
		lang: Language
	): Promise<CategoryDocument[]> {
		const options = getQueryOptions(lang);
		const query = Predicates.at('document.type', 'category');

		return (await this.cms.query(query, options)).results as CategoryDocument[];
	}

	public static async getCategoryByUID(
		categoryUID: string,
		lang: Language,
		previewRef = ''
	): Promise<CategoryDocument | null> {
		const categoryDocs: CategoryDocument[] = await this.getCategoriesByUIDs(
			[categoryUID],
			lang,
			previewRef
		);

		return categoryDocs[0] ?? null;
	}

	public static async getCategoriesByUIDs(
		categoryUIDs: string[],
		lang: Language,
		previewRef = ''
	): Promise<CategoryDocument[]> {
		const options = getQueryOptions(lang, { ref: previewRef });
		const query = Predicates.in('my.category.uid', categoryUIDs);

		const categoryDocs: CategoryDocument[] = (
			await this.cms.query(query, options)
		).results;

		if (categoryDocs.length !== categoryUIDs.length) {
			throw new Error("Mismatch results' size and search's size");
		}

		return categoryDocs;
	}
}

const getQueryOptions = defaultQueryOptionsFactory(categoryQuery);
