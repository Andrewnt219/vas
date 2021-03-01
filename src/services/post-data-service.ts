import { FireBasePost as PostMeta } from '@firebase';
import firestore from '@lib/firestore';
import { PostModel, postModelQuery } from '@lib/sanity/PostModel';
import { localizedSanityClient } from '@lib/sanity/sanity-clients';
import i18nConfig from '@root/i18n.json';
import { Languages } from '@src/data/localization-data';
import firebase from 'firebase-admin';
export class PostDataService {
	private static collection = firestore.collection('posts');
	private static cms = localizedSanityClient;
	private static language: Languages = i18nConfig.defaultLocale as Languages;

	public static switchLanguage(lang: Languages): void {
		this.language = lang;
	}
	public static async getPostBySlug(slug: string): Promise<PostModel | null> {
		return this.cms.fetch(
			`*[_type == 'post' && slug.current == $slug && _lang == $lang   ] ${postModelQuery}[0]`,
			{ slug, lang: this.language }
		);
	}

	public static async getPosts(): Promise<PostModel[]> {
		return this.cms.fetch(
			`*[_type == 'post' && _lang == $lang] ${postModelQuery}`,
			{ lang: this.language }
		);
	}

	public static async getPostSlugs(): Promise<{ slug: string }[]> {
		return this.cms.fetch(
			`*[_type == 'post'] {
					"slug": slug.current
			}`,
			{ lang: this.language }
		);
	}

	public static async increaseViews(slug: string): Promise<PostMeta | null> {
		const postMetaRef = this.collection.doc(slug);

		await postMetaRef.update({
			views: firebase.firestore.FieldValue.increment(1),
		});

		const postMetaDoc = await postMetaRef.get();

		if (!postMetaDoc.exists) {
			return null;
		}

		return postMetaDoc.data() as PostMeta;
	}

	public static async getPostMeta(slug: string): Promise<PostMeta | null> {
		const postMetaDoc = await this.collection.doc(slug).get();

		if (!postMetaDoc.exists) {
			return null;
		}

		return postMetaDoc.data() as PostMeta;
	}
}
