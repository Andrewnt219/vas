import { Language } from '@data/localization-data';
import { MAX_PAGE_SIZE } from '@data/range-data';
import firestore, { fsOperands } from '@lib/firestore/firestore';
import {
  PostComment,
  PostMeta,
  PostReply,
} from '@lib/firestore/models/FsPostDoc';
import {
  PostDocument,
  postQuery,
} from '@lib/prismic/component-types/post/PostModel';
import {
  defaultQueryOptionsFactory,
  LanguageOption,
  Predicates,
} from '@lib/prismic/prismic-helpers';
import { PrismicResult } from '@lib/prismic/prismic-service';
import { QueryOptions } from '@prismicio/client/types/ResolvedApi';
import { PMclient } from '@root/prismic-configuration';
import { isString } from '@utils/validate-utils';
import { CategoryService } from './category-data-service';

// Due to Firestore limitation of `in` query

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
  ): Promise<PrismicResult<Post>> {
    const query = POST_TYPE_PREDICATE;
    const queryOptions = getQueryOption(lang, options);

    const postsResult = await this.cms.query(query, queryOptions);

    return this.replaceWithPosts(postsResult);
  }

  static async getPostsByUIDs(
    postUIDs: string[],
    lang: Language
  ): Promise<PrismicResult<Post>> {
    const options = getQueryOption(lang);
    const query = Predicates.in('document.uid', postUIDs);

    const postsResult = await this.cms.query(query, options);

    return this.replaceWithPosts(postsResult);
  }

  public static async getPostsByCategoryID(
    categoryID: string,
    lang: Language,
    options?: QueryOptions
  ): Promise<PrismicResult<Post>> {
    const query = [
      Predicates.at('document.type', 'post'),
      Predicates.at('my.post.categories.category', categoryID),
    ];
    const queryOptions = getQueryOption(lang, options);

    const postsResult = await this.cms.query(query, queryOptions);

    return this.replaceWithPosts(postsResult);
  }



  private static async getPostDocsByCategoryID(
    categoryID: string,
    lang: Language
  ): Promise<PrismicResult<PostDocument>> {
    const query = [
      Predicates.at('document.type', 'post'),
      Predicates.at('my.post.categories.category', categoryID),
    ];
    const options = getQueryOption(lang);
    return this.cms.query(query, options);
  }

  public static async getPostsByCategoryUID(
    categoryUID: string,
    lang: Language,
    options: QueryOptions
  ): Promise<PrismicResult<Post> | null> {
    const categoryDoc = await CategoryService.getCategoryByUID(
      categoryUID,
      lang
    );

    if (!categoryDoc) {
      return null;
    }

    const postsResult = await this.getPostsByCategoryID(
      categoryDoc.id,
      lang,
      options
    );

    return this.replaceWithPosts(postsResult);
  }



  public static async getRelatedPosts(
    postID: string,
    lang: Language,
    previewRef = ''
  ): Promise<PrismicResult<Post>> {
    const options = getQueryOption(lang, {
      ref: previewRef,
    });
    const query = [
      Predicates.similar(postID, 5),
      Predicates.at('document.type', 'post'),
    ];

    const relatedPostsResult = await await this.cms.query(query, options);

    return this.replaceWithPosts(relatedPostsResult);
  }

  public static async getPostsByAuthorID
  (lang: LanguageOption, authorId: string, options?: QueryOptions): Promise<PrismicResult<Post>>{

    const queryOptions = getQueryOption(lang, options);
    const query = [
      Predicates.at('document.type', 'post'),
      Predicates.at('my.post.author',authorId)
    ];
    const postsResult = await(
      await this.cms.query(query,queryOptions)
    );
    
    return this.replaceWithPosts(postsResult);

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

  private static async replaceWithPosts(
    result: PrismicResult<PostDocument>
  ): Promise<PrismicResult<Post>> {
    const posts = await this.mapPostDocumentsToPosts(result.results);

    return { ...result, results: posts };
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
