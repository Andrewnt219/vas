import { Result } from '@common';
import DefaultPost from '@components/posts/DefaultPost/DefaultPost';
import MainLayout from '@layouts/MainLayout';
import { PrismicResult } from '@lib/prismic/prismic-service';
import { Post, PostService } from '@services/post-service';
import { useCurrentLocation } from '@src/hooks/useCurrentLocation';
import { usePost } from '@src/hooks/usePost';
import { useRelatedPost } from '@src/hooks/useRelatedPosts';
import {
  createStaticError,
  createStaticProps,
  errorStatcPropsHandler,
  errorStaticPathsHandler,
} from '@src/server/utils/page-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-reactjs';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function PostUid({ data: initialData, error: serverError }: Props) {
  const location = useCurrentLocation();

  const { data: post, error: postError } = usePost({
    post: initialData?.main,
  });

  const { data: relatedPosts, error: relatedPostsError } = useRelatedPost(
    initialData?.main.id,
    {
      initialData: initialData?.relatedPosts,
    }
  );

  // server error is prioritized, so place first
  if (serverError || postError || relatedPostsError) {
    return (
      <h1>
        {serverError?.message ??
          postError?.message ??
          relatedPostsError?.message}
      </h1>
    );
  }

  if (!post || !relatedPosts) {
    return <h2>Loading</h2>;
  }

  const categoryUID = post.data.categories?.[0].category.uid;
  let renderedPostPage = <h1>Fail to get post</h1>;

  switch (categoryUID) {
    case 'blog':
    case 'news':
      renderedPostPage = (
        <DefaultPost post={post} relatedPosts={relatedPosts.results} />
      );
      break;

    case 'event':
    case 'orientation':
    case 'tet':
      renderedPostPage = (
        <DefaultPost post={post} relatedPosts={relatedPosts.results} />
      );
      break;

    default:
      break;
  }

  const ogImgUrl = `${post.data.thumbnail.url}&fm=jpg&w=1500`;

  return (
    <MainLayout title={post.data.title} tw="pb-0! leading-relaxed! md:text-xl">
      <Head>
        <meta property="og:url" content={location} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.data.title} />
        <meta
          property="og:description"
          content={RichText.asText(post.data.snippet)}
        />
        <meta property="og:image" content={ogImgUrl} />
        <meta
          property="og:image:width"
          content={post.data.thumbnail.dimensions.width.toString()}
        />
        <meta
          property="og:image:height"
          content={post.data.thumbnail.dimensions.height.toString()}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.data.title} />
        <meta
          name="twitter:description"
          content={RichText.asText(post.data.snippet)}
        />
        <meta name="twitter:image" content={ogImgUrl} />

        <meta
          property="article:published_time"
          content={
            post.first_publication_date
              ? new Date(post.first_publication_date).toISOString()
              : new Date().toISOString()
          }
        />
      </Head>

      {renderedPostPage}
    </MainLayout>
  );
}
type StaticProps = Result<{ main: Post; relatedPosts: PrismicResult<Post> }>;

type Params = {
  uid: string;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  params,
  locale,

  previewData = {},
}) => {
  try {
    //NOTE As of 10.2, the typing has changed so an explicit cast is needed
    const { ref } = previewData as { ref: string | undefined };
    const lang = tryParseLocale(locale);
    const uid = params?.uid;

    if (!uid) {
      return createStaticError('Missing uid');
    }

    const post = await PostService.getPostByUID(uid, lang, ref);

    if (!post) {
      return createStaticError('Post not found');
    }

    const relatedPosts = await PostService.getRelatedPosts(post.id, lang, ref);

    const data = {
      main: post,
      relatedPosts,
    };

    return createStaticProps(data);
  } catch (error) {
    return errorStatcPropsHandler(error);
  }
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  try {
    const posts = await PostService.getPosts('*');

    const paths = posts.results.map((post) => ({
      params: { uid: post.uid ?? '' },
      locale: post.lang,
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    return errorStaticPathsHandler(error);
  }
};
export default PostUid;
