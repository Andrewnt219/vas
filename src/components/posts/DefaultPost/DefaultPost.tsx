import AuthordCard from '@components/AuthorCard/AuthordCard';
import Image from '@components/Image/Image';
import { Label } from '@components/Label/Label';
import RelatedPosts from '@components/RelatedPosts/RelatedPosts';
import PostSliceZone from '@lib/prismic/component-types/post/slice/PostSliceZone/PostSliceZone';
import { Post } from '@services/post-service';
import { useCurrentLocation } from '@src/hooks/useCurrentLocation';
import {
  getAuthorLink,
  getCommentsCount,
  getDataFromPost,
  getHashtagLink,
} from '@utils/convert-utils';
import { getSizes } from '@utils/css-utils';
import NextLink from 'next/link';
import React from 'react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaRedditAlien,
  FaTwitter,
} from 'react-icons/fa';
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share';
import tw, { css } from 'twin.macro';
import { ActiveCommentProvider } from '../CommentSet/ActiveCommentContext';
import CommentSet from '../CommentSet/CommentSet';
import CommentWriter from '../CommentWriter/CommentWriter';
import Time from '../Time/Time';
import { usePostComments } from './usePostComments';

const wrapper = css`
  ${tw`max-w-prose mx-auto px-4 md:px-8`}
`;

const separator = css`
  ${tw`inline-block bg-current h-px`}
  width: 0.4em;
`;

const sharedButton = css`
  ${tw`w-full svg:(text-white text-larger) py-2 flex justify-center transition-colors hocus:(bg-skin-dark)`}
`;

/* -------------------------------------------------------------------------- */

type Props = { className?: string; post: Post; relatedPosts: Post[] };

// TODO componentize
// TODO add event datetime
function DefaultPost({ className, post, relatedPosts }: Props) {
  const [comments, onCommentSubmit] = usePostComments(post);
  const location = useCurrentLocation();

  const {
    author,
    firstHashtag,
    thumbnail,
    publishedDate,
    readingMinutes,
  } = getDataFromPost(post);

  const authorAvatar = `${author.data.thumbnail.url}&w=48&h=48&fit=crop`;

  return (
    <section className={className} tw="col-span-full text-skin-base">
      {/* Hero */}
      <header tw="mb-5 wrapper md:(grid grid-cols-2 gap-x-16 items-center mb-md ) xl:mb-lg">
        {/* TODO don't use fit cover */}
        <div tw="pb-full relative mb-sm after:hidden md:after:(content block w-full h-full bg-skin-light absolute top-7 left-7)">
          <Image
            sizes={getSizes(['90vw', '40vw', '1280px'])}
            alt={thumbnail.alt}
            imgSrc={thumbnail.url}
            height={thumbnail.dimensions.height}
            width={thumbnail.dimensions.width}
            tw="img-absolute absolute! rounded-none z-10"
          />
        </div>

        <div>
          <div tw="space-y-1 xl:space-y-4">
            <NextLink href={getHashtagLink(firstHashtag.uid)} passHref>
              <Label tw="inline-block">{firstHashtag.data.title}</Label>
            </NextLink>

            <h1 tw="text-h1-variants">{post.data.title}</h1>

            <div tw=" text-tag flex items-center  space-x-1">
              <span tw="text-primary font-black">
                {post.meta?.views ?? 0} views
              </span>

              <span css={separator} />
              <Time time={publishedDate} />

              <span css={separator} />
              <span>
                {readingMinutes <= 1
                  ? '1 min read'
                  : `${readingMinutes} mins read`}
              </span>
            </div>
          </div>

          {/* Author info */}
          <div tw="flex items-end space-x-5 mt-5">
            <Image
              sizes="48px"
              alt={author.data.thumbnail.alt}
              imgSrc={authorAvatar}
              height={48}
              width={48}
              tw="rounded-full w-12 h-12"
            />

            <div tw="flex flex-col leading-tight">
              <span tw="text-smaller text-skin-muted">Written by</span>

              <NextLink href={getAuthorLink(author.data.uid)} passHref>
                <a tw="font-black text-primary">{author.data.title}</a>
              </NextLink>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div css={wrapper}>
        {post.data.body.map((slice, index) => (
          <PostSliceZone slice={slice} key={`slice-${index}`} />
        ))}
      </div>

      {/* TODO add card for event date time */}

      {/* Footer */}
      <div tw="mt-9" css={wrapper}>
        <div tw="flex flex-col">
          <span tw="text-tag">Tagged as</span>

          <ul tw="flex flex-wrap">
            {post.data.hashtags.map(({ hashtag }) => (
              <li tw="mr-1" key={hashtag.id}>
                <NextLink href={getHashtagLink(hashtag.uid)} passHref>
                  <a tw="font-black transition-colors hocus:text-primary">
                    #{hashtag.data.title.toLowerCase()}
                  </a>
                </NextLink>
              </li>
            ))}
          </ul>
        </div>

        <div tw="border-skin-light border-t border-opacity-10 pt-2 mt-sm">
          <span tw="text-tag">Share</span>
          <ul tw="grid grid-cols-2 gap-1 md:grid-cols-4">
            <li>
              <FacebookShareButton
                url={location}
                resetButtonStyle={false}
                css={css`
                  ${sharedButton}
                  background-color: #3e5b98;
                `}
              >
                <FaFacebookF />
              </FacebookShareButton>
            </li>

            <li>
              <TwitterShareButton
                url={location}
                resetButtonStyle={false}
                css={css`
                  ${sharedButton}
                  background-color: #4da7de;
                `}
              >
                <FaTwitter />
              </TwitterShareButton>
            </li>

            <li>
              <RedditShareButton
                url={location}
                resetButtonStyle={false}
                css={css`
                  ${sharedButton}
                  background-color: #e74a1e;
                `}
              >
                <FaRedditAlien />
              </RedditShareButton>
            </li>

            <li>
              <LinkedinShareButton
                url={location}
                resetButtonStyle={false}
                css={css`
                  ${sharedButton}
                  background-color: #0072B1;
                `}
              >
                <FaLinkedinIn />
              </LinkedinShareButton>
            </li>
          </ul>
        </div>
      </div>

      {/* Author card */}
      <section tw="mt-12" css={wrapper}>
        <AuthordCard data={post.data.author.data} />
      </section>

      {/* Comments */}
      <section tw="mt-7 xl:mt-12" css={wrapper}>
        <h2 tw="text-2xl mb-6 text-h2-variants">Join the dicussion</h2>
        <CommentWriter tw=" text-smaller" onFormSubmitted={onCommentSubmit} />

        <h2 tw="mt-7 mb-sm text-h2-variants xl:mt-12">
          {getCommentsCount(post)} comments
        </h2>
        {comments.length === 0 && <span>Be the first to comment</span>}
        <ActiveCommentProvider>
          <CommentSet tw="space-y-12" comments={comments} />
        </ActiveCommentProvider>
      </section>

      {/* More posts */}
      <RelatedPosts
        tw="pb-10 mt-9 md:mt-12"
        posts={relatedPosts}
        heading="Futher reading"
      />
    </section>
  );
}

export default DefaultPost;
