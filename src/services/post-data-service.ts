import { FireBasePost as PostMeta } from '@firebase';
import firestore from '@lib/firestore';
import { localizedSanityClient } from '@lib/sanity';
import { PostModel, postModelQuery } from '@src/models/PostModel';
import firebase from 'firebase-admin';

type Languages = 'en-US' | 'vi-VN';

export class PostDataService {
	private static collection = firestore.collection('posts');
	private static cms = localizedSanityClient;
	private static language: Languages = 'en-US';

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
			`*[_type == 'post' && _lang = $lang] {
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
