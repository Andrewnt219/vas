import Post from '@components/Post/Post';
import MainLayout from '@layouts/MainLayout';
import { sanityClient } from '@lib/sanity/sanity-clients';
import { postSerializer } from '@lib/sanity/serializers/post-serializer';
import BlockContent from '@sanity/block-content-to-react';
import * as ServerUtils from '@utils/server-utils';
import dayjs from 'dayjs';
import { InferGetStaticPropsType } from 'next';
import NextLink from 'next/link';
import React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */

export const getStaticProps = ServerUtils.getStaticPost;

export const getStaticPaths = ServerUtils.getStaticPostsPathsByCategory('news');

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const NewsPost = ({ data, error }: Props) => {
	if (error) {
		return <h1>{error.message}</h1>;
	}

	if (!data) {
		return <h1>Fetching post...</h1>;
	}

	const { post } = data;

	const displayedHashtag = post.hashtags[0];

	return (
		<MainLayout title={post.title} tw="pb-0!">
			<section tw="col-span-full md:text-2xl">
				<Post.Wrapper as="header">
					{displayedHashtag && (
						<NextLink href={`/categories/${displayedHashtag.slug}`} passHref>
							<a tw="block transition-colors text-primary underline decorator-transparent hocus:(decorator-primary) xl:(font-bold text-primary)">
								{displayedHashtag.title}
							</a>
						</NextLink>
					)}

					<Post.Title tw="my-2 md:my-5">{post.title}</Post.Title>

					<time
						tw="text-gray-200 text-smaller italic"
						dateTime={dayjs(post.publishedAt).format('YYYY-MM-DD')}
					>
						{dayjs(post.publishedAt).format('MMMM DD, YYYY')}
					</time>
				</Post.Wrapper>

				<Post.Wrapper tw="mt-10 md:mt-14 xl:mt-20">
					<BlockContent
						blocks={post.body}
						projectId={sanityClient.config().projectId}
						dataset={sanityClient.config().dataset}
						serializers={postSerializer}
						imageOptions={{ fit: 'clip', auto: 'format' }}
					/>
				</Post.Wrapper>
			</section>
		</MainLayout>
	);
};

export default NewsPost;
