import { Result } from '@common';
import { PostDocument } from '@lib/prismic/component-types/post/PostModel';
import { Post } from '@src/server/services/post-service';
import { AxiosError } from 'axios';
import { RichText } from 'prismic-reactjs';
import { getReadingMinutes } from './number-utils';
import { isValidDate } from './validate-utils';
export function getErrorMessage(error?: AxiosError<Result<any>>): string {
  if (!error) {
    return 'Something went wrong';
  }

  return error.response?.data.error?.message ?? error.message;
}

/* -------------------------------------------------------------------------- */
export const getHashtagLink = (hashtagUID: string | undefined) =>
  `/hashtags/${hashtagUID}`;
export const getPostLink = (postUID: string | undefined) => `/posts/${postUID}`;
export const getCategoryLink = (categoryUID: string | undefined) =>
  `/categories/${categoryUID}`;
export const getAuthorLink = (authorUID: string | undefined) =>
  `/authors/${authorUID}`;

/* -------------------------------------------------------------------------- */

export const getMainCategory = (post: Post | PostDocument) =>
  post.data.categories[0]?.category;

export const getFirstHashtag = (post: Post | PostDocument) =>
  post.data.hashtags[0]?.hashtag;

export const getDataFromPost = (post: Post | PostDocument) => ({
  snippet: post.data.snippet,
  body: post.data.body,
  title: post.data.title,
  author: post.data.author,
  thumbnail: post.data.thumbnail,
  mainCategory: getMainCategory(post),
  firstHashtag: getFirstHashtag(post),
  publishedDate: getDate(post.first_publication_date) ?? new Date(),
  fromDate: getDate(post.data.from_date),
  toDate: getDate(post.data.to_date) ?? getDate(post.data.from_date),
  location: post.data.location,

  readingMinutes: getPostReadingMinutes(post),
  postLink: getPostLink(post.uid),
});
/* -------------------------------------------------------------------------- */

export function getCommentsCount(post: Post) {
  return post.comments.reduce(
    (count, comment) => count + comment.replies.length,
    post.comments.length
  );
}
export function getPostReadingMinutes(post: Post | PostDocument) {
  const readingTime = post.data.body.reduce((accumulator, slice) => {
    switch (slice.slice_type) {
      case 'image_with_caption':
        return (accumulator += 0.5);

      case 'text':
        return (accumulator += getReadingMinutes(
          RichText.asText(slice.primary.text)
        ));

      case 'quote':
        return (accumulator += getReadingMinutes(
          RichText.asText(slice.primary.quote)
        ));

      default:
        return accumulator;
    }
  }, 0);

  return Math.floor(readingTime);
}

/* -------------------------------------------------------------------------- */
export const getDate = (date: any): Date | undefined => {
  if (date === undefined) {
    return undefined;
  }

  return isValidDate(date) ? date : new Date();
};
