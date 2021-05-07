import { Language } from '@data/localization-data';
import firestore, { fsOperands } from '@lib/firestore/firestore';
import {
  PostComment,
  PostMeta,
  PostReply,
} from '@lib/firestore/models/FsPostDoc';
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
import { QueryOptions } from '@prismicio/client/types/ResolvedApi';
import { PMclient } from '@root/prismic-configuration';
import { getMainCategory } from '@utils/convert-utils';
import { isString } from '@utils/validate-utils';
import { Dictionary } from 'lodash';
import groupBy from 'lodash/groupBy';
import { CategoryService } from './category-data-service';

// Due to Firestore limitation of `in` query
const MAX_PAGE_SIZE = 10;

export class PostService {
  private static readonly posts = firestore.collection('posts');
  private static readonly comments = firestore.collection('comments');
  private static readonly cms = PMclient;

  static async getPostByUID(
    postUID: string,
    lang: Language,
    previewRef = ''
  ): Promise<Post | null> {
    const options = getQueryOption(lang, { ref: previewRef });

    const postDoc: PostDocument = await this.cms.getByUID(
      'post',
      postUID,
      options
    );

    console.log(previewRef);
    return this.mapPostDocumentToPost(postDoc);
  }

  static async getPosts(
    lang: LanguageOption,
    options?: QueryOptions
  ): Promise<Post[]> {
    const query = POST_TYPE_PREDICATE;
    const queryOptions = getQueryOption(lang, options);

    const postDocs: PostDocument[] = (await this.cms.query(query, queryOptions))
      .results;

    return this.mapPostDocumentsToPosts(postDocs);
  }

  static async getPostsByUIDs(
    postUIDs: string[],
    lang: Language
  ): Promise<Post[]> {
    const options = getQueryOption(lang);
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
    const options = getQueryOption(lang);

    const postDocs = (await this.cms.query(query, options))
      .results as PostDocument[];

    return this.mapPostDocumentsToPosts(postDocs);
  }

  public static getPostDocsByCategoryDocs(
    categoryDocs: CategoryDocument[],
    lang: Language
  ): Promise<PostDocument[][]> {
    const getPostsByCategoryDoc = (categoryDoc: CategoryDocument) =>
      this.getPostDocsByCategoryID(categoryDoc.id, lang);

    const getPostsByCategoryDocs = categoryDocs.map(getPostsByCategoryDoc);

    return Promise.all(getPostsByCategoryDocs);
  }

  public static async getPostsByCategories(
    lang: Language
  ): Promise<Dictionary<Post[]>> {
    const categoryDocs = await CategoryService.getCategories(lang);
    const postDocs = await this.getPostDocsByCategoryDocs(categoryDocs, lang);
    const posts = await this.mapPostDocumentsToPosts(postDocs.flat());

    const byCategoryUid = (postDoc: PostDocument): string | undefined =>
      getMainCategory(postDoc).uid;

    return groupBy(posts, byCategoryUid);
  }

  public static async getPostsByCategoryUIDs(
    categoryUIDs: string[],
    lang: Language
  ): Promise<Post[]> {
    const categoryDocs = await CategoryService.getCategoriesByUIDs(
      categoryUIDs,
      lang
    );

    const postDocs = await this.getPostDocsByCategoryDocs(categoryDocs, lang);

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
    const options = getQueryOption(lang);
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
    const options = getQueryOption(lang, {
      ref: previewRef,
    });
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
  public static async insertComment(
    comment: PostComment
  ): Promise<PostComment | undefined> {
    const ref = await this.comments.add(comment);
    const snapshot = await ref.get();
    return { ...snapshot.data(), id: snapshot.id } as PostComment;
  }

  public static async insertReply(
    commentId: string,
    reply: PostReply
  ): Promise<PostComment | null> {
    return this.updatePostCommentByCommentId(commentId, {
      replies: (fsOperands.FieldValue.arrayUnion(
        reply
      ) as unknown) as PostReply[],
    });
  }

  public static async getCommentsByPostUids(
    postUids: string[]
  ): Promise<PostComment[]> {
    if (postUids.length === 0) {
      return [];
    }

    const snapshot = this.comments.where('postUid', 'in', postUids);
    return (await snapshot.get()).docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as PostComment;
    });
  }
  public static async getCommentsByPostUid(
    postUid: string
  ): Promise<PostComment[]> {
    return this.getCommentsByPostUids([postUid]);
  }

  public static async increaseViews(
    postID: string
  ): Promise<PostMeta | undefined> {
    return this.updatePostMetaByPostID(postID, {
      views: (fsOperands.FieldValue.increment(1) as unknown) as number,
    });
  }

  public static async insertPostMeta(
    postId: string,
    overwrite?: Partial<PostMeta>
  ): Promise<PostMeta> {
    const postMetaRef = this.posts.doc(postId);

    const initMeta = this.createPostMeta(postId, overwrite);
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
    const metaList = await this.posts
      .where(fsOperands.FieldPath.documentId(), 'in', filteredPostIDs)
      .get();

    return metaList.docs.map((doc) => doc.data() as PostMeta);
  }

  public static async getPostMetaByPostID(
    postId: string
  ): Promise<PostMeta | undefined> {
    return (await this.getPostMetaByPostIDs([postId]))[0];
  }

  public static async updatePostMetaByPostID(
    postId: string,
    data: Partial<PostMeta>
  ): Promise<PostMeta> {
    const postMetaRef = this.posts.doc(postId);
    const postMetaSnapshot = await postMetaRef.get();

    if (!postMetaSnapshot.exists) {
      return this.insertPostMeta(postId);
    }

    await postMetaRef.update(data);

    return (await postMetaRef.get()).data() as PostMeta;
  }

  public static async updatePostCommentByCommentId(
    commentId: string,
    data: Partial<PostComment>
  ): Promise<PostComment | null> {
    const ref = this.comments.doc(commentId);
    let snapshot = await ref.get();

    if (!snapshot.exists) {
      return null;
    }

    await ref.update(data);
    snapshot = await ref.get();

    return snapshot.data() as PostComment;
  }
  //#endregion

  //#region Helpers
  private static createPostMeta(
    postId: string,
    overwrite?: Partial<PostMeta>
  ): PostMeta {
    return {
      views: 0,
      id: postId,
      ...overwrite,
    };
  }

  private static async mapPostDocumentsToPosts(
    postDocs: PostDocument[]
  ): Promise<Post[]> {
    const ids = postDocs.map((doc) => doc.id);
    const uids = postDocs.map((doc) => doc.uid).filter(isString);
    const postMetaList = await this.getPostMetaByPostIDs(ids);
    const postCommentsList = await this.getCommentsByPostUids(uids);

    return postDocs.map((doc) => {
      const meta = postMetaList.find((meta) => meta.id === doc.id);
      const comments = postCommentsList.filter(
        (comment) => comment.postUid === doc.uid
      );

      return { ...doc, comments, meta: meta ?? null };
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

export type Post = PostDocument & {
  meta: PostMeta | null;
  comments: PostComment[];
};

const defaultOption: QueryOptions = {
  pageSize: MAX_PAGE_SIZE,
  orderings: '[document.first_publication_date desc]',
};
const getQueryOption = defaultQueryOptionsFactory(postQuery, defaultOption);

const POST_TYPE_PREDICATE = Predicates.at('document.type', 'post');
