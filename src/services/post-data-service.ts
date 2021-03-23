import { Language } from '@data/localization-data';
import firestore from '@lib/firestore/firestore';
import { FsPost } from '@lib/firestore/models/FsPost';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { PostModel, postModelQuery } from '@lib/sanity/models/PostModel';
import { localizedSanityClient } from '@lib/sanity/sanity-clients';
import firebase from 'firebase-admin';

export class PostDataService {
	private static collection = firestore.collection('posts');
	private static cms = localizedSanityClient;

	public static async getPostBySlug(slug: string): Promise<PostModel | null> {
		return this.cms.fetch(
			`*[_type == 'post' && slug.current == $slug] ${postModelQuery}[0]`,
			{ slug }
		);
	}

	public static async getPosts(lang: Language): Promise<PostModel[]> {
		return this.cms.fetch(
			`*[_type == 'post' && _lang == $lang] | order(_updatedAt desc) ${postModelQuery}`,
			{ lang }
		);
	}

	public static async getPostSlugs(
		lang: Language
	): Promise<{ slug: string }[]> {
		return this.cms.fetch(
			`*[_type == 'post'] {
					"slug": slug.current
			}`,
			{ lang }
		);
	}

	public static async getPostSlugsByCategory(
		categorySlug: CategorySlug,
		lang: Language
	): Promise<{ slug: string }[]> {
		return this.cms.fetch(
			`*[_type == 'post' 
					&& _lang == $lang
					&& categories[] -> slug.current match $categorySlug] {
					"slug": slug.current
			}`,
			{ categorySlug, lang }
		);
	}

	public static async getPostsByCategory(
		categorySlug: CategorySlug,
		lang: Language
	): Promise<PostModel[]> {
		return this.cms.fetch(
			`
			*[_type == 'post' 
					&& _lang == $lang 
					&& !isArchived 
					&& categories[] -> slug.current match $categorySlug
				] | order(_updatedAt desc) ${postModelQuery}
		`,
			{
				categorySlug,
				lang,
			}
		);
	}

	public static async increaseViews(slug: string): Promise<FsPost> {
		const postMetaRef = this.collection.doc(slug);

		await postMetaRef.update({
			views: firebase.firestore.FieldValue.increment(1),
		});

		const postMetaDoc = await postMetaRef.get();

		if (!postMetaDoc.exists) {
			// TODO add a way to create default FsPost
			this.collection.doc(slug).create({ comments: [], views: 0 });
			return { comments: [], views: 0 };
		}

		return postMetaDoc.data() as FsPost;
	}

	public static async getFsPost(slug: string): Promise<FsPost> {
		const postMetaDoc = await this.collection.doc(slug).get();

		if (!postMetaDoc.exists) {
			// TODO add a way to create default FsPost
			this.collection.doc(slug).create({ comments: [], views: 0 });
			return { comments: [], views: 0 };
		}

		return postMetaDoc.data() as FsPost;
	}
}
