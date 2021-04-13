import { Language } from '@data/localization-data';
import firestore, { fsOperands } from '@lib/firestore/firestore';
import { PostMeta } from '@lib/firestore/models/FsPostDoc';
import { CategoryDocument } from '@lib/prismic/component-types/category/CategoryModel';
import {
	PostDocument,
	postQuery,
} from '@lib/prismic/component-types/post/PostModel';
import {
	defaultQueryOptionsFactory,
	LanguageOption,
	Predicates,
} from '@lib/prismic/prismic-helpers';
import { PMclient } from '@root/prismic-configuration';
import { isString } from '@utils/validate-utils';
import { CategoryService } from './category-data-service';

export class PostService {
	private static readonly collection = firestore.collection('posts');
	private static readonly cms = PMclient;

	static async getPostByUID(
		postUID: string,
		lang: Language,
		previewRef = ''
	): Promise<Post | null> {
		const options = getQueryOptions(lang, { ref: previewRef });

		const postDoc: PostDocument = await this.cms.getByUID(
			'post',
			postUID,
			options
		);

		console.log(previewRef);
		return this.mapPostDocumentToPost(postDoc);
	}

	static async getPosts(lang: LanguageOption): Promise<Post[]> {
		const query = POST_TYPE_PREDICATE;
		const options = getQueryOptions(lang);

		const postDocs: PostDocument[] = (await this.cms.query(query, options))
			.results;

		return this.mapPostDocumentsToPosts(postDocs);
	}

	static async getPostsByUIDs(
		postUIDs: string[],
		lang: Language
	): Promise<Post[]> {
		const options = getQueryOptions(lang);
		const query = Predicates.in('document.uid', postUIDs);

		const postDocs: PostDocument[] = (await this.cms.query(query, options))
			.results;

		return this.mapPostDocumentsToPosts(postDocs);
	}

	public static async getPostsByCategoryID(
		categoryID: string,
		lang: Language
	): Promise<Post[]> {
		const query = [
			Predicates.at('document.type', 'post'),
			Predicates.at('my.post.categories.category', categoryID),
		];
		const options = getQueryOptions(lang);

		const postDocs = (await this.cms.query(query, options))
			.results as PostDocument[];

		return this.mapPostDocumentsToPosts(postDocs);
	}

	public static async getPostsByCategoryUIDs(
		categoryUIDs: string[],
		lang: Language
	): Promise<Post[]> {
		const categoryDocs: CategoryDocument[] = await CategoryService.getCategoriesByUIDs(
			categoryUIDs,
			lang
		);

		const getPostsByCategoryDoc = (categoryDoc: CategoryDocument) =>
			this.getPostDocsByCategoryID(categoryDoc.id, lang);

		const getPostsByCategoryDocs = categoryDocs.map(getPostsByCategoryDoc);

		const postDocs: PostDocument[][] = await Promise.all(
			getPostsByCategoryDocs
		);

		return this.mapPostDocumentsToPosts(postDocs.flat());
	}

	private static async getPostDocsByCategoryID(
		categoryID: string,
		lang: Language
	): Promise<PostDocument[]> {
		const query = [
			Predicates.at('document.type', 'post'),
			Predicates.at('my.post.categories.category', categoryID),
		];
		const options = getQueryOptions(lang);
		return (await this.cms.query(query, options)).results as PostDocument[];
	}

	public static getPostsByCategoryUID(
		categoryUID: string,
		lang: Language
	): Promise<Post[]> {
		return this.getPostsByCategoryUIDs([categoryUID], lang);
	}

	public static async getRelatedPosts(
		postID: string,
		lang: Language,
		previewRef = ''
	): Promise<Post[]> {
		const options = getQueryOptions(lang, { ref: previewRef });
		const query = [
			Predicates.similar(postID, 5),
			Predicates.at('document.type', 'post'),
		];

		const relatedPostDocs: PostDocument[] = await (
			await this.cms.query(query, options)
		).results;

		return this.mapPostDocumentsToPosts(relatedPostDocs);
	}

	//#region Firestore

	public static async increaseViews(postID: string): Promise<PostMeta> {
		const postMetaRef = this.collection.doc(postID);

		const postMetaDoc = await postMetaRef.get();

		if (!postMetaDoc.exists) {
			return this.InsertPostMeta(postID);
		}

		await postMetaRef.update({
			views: fsOperands.FieldValue.increment(1),
		});

		const updatedPostMetaRef = await postMetaRef.get();

		if (!updatedPostMetaRef.exists) {
			throw new Error('Fail to update post in Firestore');
		}

		return updatedPostMetaRef.data() as PostMeta;
	}

	public static async InsertPostMeta(postId: string): Promise<PostMeta> {
		const postMetaRef = this.collection.doc(postId);

		const initMeta: PostMeta = {
			comments: [],
			views: 0,
			id: postId,
		};
		postMetaRef.set(initMeta);

		return (await postMetaRef.get()).data() as PostMeta;
	}

	public static async getPostMetaByPostIDs(
		postIds: (string | undefined)[]
	): Promise<PostMeta[]> {
		const filteredPostIDs = postIds.filter(isString);

		if (filteredPostIDs.length == 0) {
			return [];
		}

		// NOTE firebase `in` requires non-empty array
		const metaList = await this.collection
			.where(fsOperands.FieldPath.documentId(), 'in', filteredPostIDs)
			.get();

		return metaList.docs.map((doc) => doc.data() as PostMeta);
	}

	public static async getPostMetaByPostID(
		postId: string
	): Promise<PostMeta | undefined> {
		return (await this.getPostMetaByPostIDs([postId]))[0];
	}
	//#endregion

	//#region Helpers
	private static async mapPostDocumentsToPosts(
		postDocs: PostDocument[]
	): Promise<Post[]> {
		const ids = postDocs.map((doc) => doc.id);
		const postMetaList = await this.getPostMetaByPostIDs(ids);

		return postDocs.map((doc) => {
			const meta = postMetaList.find((meta) => meta.id === doc.id);

			return { ...doc, meta: meta ?? null };
		});
	}

	private static async mapPostDocumentToPost(
		postDoc: PostDocument
	): Promise<Post | null> {
		const post = (await this.mapPostDocumentsToPosts([postDoc]))[0];

		if (!post) {
			return null;
		}

		return post;
	}
	//#endregion
}

export type Post = PostDocument & { meta: PostMeta | null };

const getQueryOptions = defaultQueryOptionsFactory(postQuery);

const POST_TYPE_PREDICATE = Predicates.at('document.type', 'post');
