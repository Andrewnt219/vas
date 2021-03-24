import { PostWihMeta } from '@common';
import { Language } from '@data/localization-data';
import firestore from '@lib/firestore/firestore';
import { FsPost } from '@lib/firestore/models/FsPost';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { PostModel, postModelQuery } from '@lib/sanity/models/PostModel';
import { localizedSanityClient } from '@lib/sanity/sanity-clients';
import firebase from 'firebase-admin';
import { LocaleDataService } from './locale-data-service';

const match = {
	post: "_type == 'post'",
	categorySlug: 'categories[] -> slug.current match $categorySlug',
	notDraft: "!(_id in path('drafts.**'))",
	notArchived: '!isArchived',
	slug: 'slug.current == $slug',
	notSlug: 'slug.current != $slug',
	lang: '_lang == $lang',
	combine: (...matchers: string[]) => matchers.join('&&'),
};

const order = {
	updateAtDesc: 'order(_updatedAt desc)',
};

export class PostDataService {
	private static readonly BASE_QUERY = match.combine(
		match.post,
		match.notArchived,
		match.notDraft
	);
	private static readonly collection = firestore.collection('posts');
	private static readonly cms = localizedSanityClient;

	public static async getPostBySlug(slug: string): Promise<PostModel | null> {
		return this.cms.fetch(
			`*[${this.BASE_QUERY} && ${match.slug}] ${postModelQuery}[0]`,
			{ slug }
		);
	}

	public static async getPosts(lang: Language): Promise<PostModel[]> {
		return this.cms.fetch(
			`*[${this.BASE_QUERY} && ${match.lang}] | ${order.updateAtDesc} ${postModelQuery}`,
			{ lang }
		);
	}

	public static async getPostSlugs(
		lang: Language
	): Promise<{ slug: string }[]> {
		LocaleDataService.setLocale(lang);

		return this.cms.fetch(
			`*[${match.combine(this.BASE_QUERY, match.lang)} ] {
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
			`*[${match.combine(this.BASE_QUERY, match.categorySlug)}] {
					"slug": slug.current
			}`,
			{ categorySlug, lang }
		);
	}

	public static async getPostsByCategory(
		categorySlug: CategorySlug,
		lang: Language
	): Promise<PostModel[]> {
		LocaleDataService.setLocale(lang);

		return this.cms.fetch(
			`
			*[${match.combine(this.BASE_QUERY, match.lang, match.categorySlug)}] | ${
				order.updateAtDesc
			} ${postModelQuery}
		`,
			{
				categorySlug,
				lang,
			}
		);
	}

	public static async getPostsWithMeta(lang: Language): Promise<PostWihMeta[]> {
		try {
			const posts = await this.getPosts(lang);

			return await Promise.all(
				posts.map(async (post) => {
					const meta = await PostDataService.getFsPost(post.slug);
					return { ...post, ...meta };
				})
			);
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	public static async getPostsWithMetaByCategory(
		categorySlug: CategorySlug,
		lang: Language
	): Promise<PostWihMeta[]> {
		try {
			const posts = await this.getPostsByCategory(categorySlug, lang);

			return await Promise.all(
				posts.map(async (post) => {
					const meta = await PostDataService.getFsPost(post.slug);
					return { ...post, ...meta };
				})
			);
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	public static getRelatedPost(postSlug: string, lang: Language) {
		LocaleDataService.setLocale(lang);

		// Weird bug cannot directly get value of reference like this `[0].categories[0]->slug.current`
		// Freaking genius btw
		const getCategorySlugOfPost = `
			*[_type == 'post' && slug.current == $slug][0] 
				{"categorySlug": categories[0]->slug.current}.categorySlug
		`;

		return this.cms.fetch(
			`
			*[${match.combine(this.BASE_QUERY, match.lang, match.notSlug)}
				&& categories[] -> slug.current match ${getCategorySlugOfPost}					
			] | ${order.updateAtDesc} ${postModelQuery}
		`,
			{
				slug: postSlug,
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
