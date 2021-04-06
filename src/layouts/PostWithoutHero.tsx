import { Result } from '@api-response';
import { PostWihMeta } from '@common';
import Post from '@components/Post/Post';
import RelatedPosts from '@components/RelatedPosts/RelatedPosts';
import MainLayout from '@layouts/MainLayout';
import { PostModel } from '@lib/sanity/models/PostModel';
import { sanityClient } from '@lib/sanity/sanity-clients';
import { postSerializer } from '@lib/sanity/serializers/post-serializer';
import { urlFor } from '@lib/sanity/utils/sanity-api-utils';
import BlockContent from '@sanity/block-content-to-react';
import { useCurrentLocation } from '@src/hooks/useCurrentLocation';
import dayjs from 'dayjs';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

type Props = Result<{ post: PostWihMeta; relatedPosts: PostModel[] }>;

const PostWithoutHero = ({ data, error }: Props) => {
	const location = useCurrentLocation();

	if (error) {
		return <h1>{error.message}</h1>;
	}

	if (!data) {
		return <h1>Fetching post...</h1>;
	}

	const { post, relatedPosts } = data;
	const displayedHashtag = post.hashtags?.[0];

	return (
		<MainLayout title={post.title} tw="pb-0!">
			<Head>
				<meta property="og:url" content={location} />
				<meta property="og:type" content="article" />
				<meta property="og:title" content={data.post.title} />
				<meta property="og:description" content={data.post.snippet} />
				<meta
					property="og:image"
					content={urlFor(data.post.thumbnail.url)
						.format('jpg')
						.width(1500)
						.url()
						?.toString()}
				/>
				<meta
					property="og:image:width"
					content={data.post.thumbnail.metadata.width.toString()}
				/>
				<meta
					property="og:image:height"
					content={data.post.thumbnail.metadata.height.toString()}
				/>

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={data.post.title} />
				<meta name="twitter:description" content={data.post.snippet} />
				<meta
					name="twitter:image"
					content={urlFor(data.post.thumbnail.url)
						.format('jpg')
						.width(1500)
						.url()
						?.toString()}
				/>

				<meta
					property="article:published_time"
					content={new Date(data.post.publishedAt).toISOString()}
				/>
			</Head>
			<section tw="col-span-full md:text-2xl">
				<Post.Wrapper as="header">
					{displayedHashtag && (
						<NextLink href={post.hashtagUrl} passHref>
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

			<RelatedPosts posts={relatedPosts} heading="read more" />
		</MainLayout>
	);
};

export default PostWithoutHero;
