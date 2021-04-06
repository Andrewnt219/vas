import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import Post from '@components/Post/Post';
import PublishedDate from '@components/PublishedDate/PublishedDate';
import RelatedPosts from '@components/RelatedPosts/RelatedPosts';
import MainLayout from '@layouts/MainLayout';
import { sanityClient } from '@lib/sanity/sanity-clients';
import { postSerializer } from '@lib/sanity/serializers/post-serializer';
import { urlFor } from '@lib/sanity/utils/sanity-api-utils';
import BlockContent from '@sanity/block-content-to-react';
import { useCurrentLocation } from '@src/hooks/useCurrentLocation';
import { usePost } from '@src/hooks/usePost';
import { postPage } from '@src/server/utils/page-utils';
import dayjs from 'dayjs';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */

export const getStaticProps = postPage.getStaticProps;

export const getStaticPaths = postPage.getStaticPathsByCategorySlug('events');

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const EventPost = ({ data: serverData, error: serverError }: Props) => {
	const location = useCurrentLocation();

	const { data, error } = usePost(serverData?.post.slug, serverData);

	if (serverError || error) {
		const message = serverError?.message ?? error?.message;

		return <h1>{message}</h1>;
	}

	if (!data) {
		return <h1>Fetching post...</h1>;
	}

	const { post, relatedPosts } = data;

	return (
		<MainLayout title={post.title} tw="pb-0! md:text-2xl">
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

			<section tw="col-span-full ">
				<Post.Wrapper as="header">
					<PublishedDate date={new Date(post.publishedAt)} />
					<Post.Title>{post.title}</Post.Title>
				</Post.Wrapper>

				<Post.Wrapper tw="relative pb-2xs my-10 md:my-16 xl:(my-20 transform scale-x-125)">
					<EnhancedImage
						tw="img-absolute absolute!"
						src={post.thumbnail.url}
						lqip={post.thumbnail.metadata.lqip}
						alt={post.thumbnail.alt ?? 'Alt text is unfortunately missing'}
						layout="fill"
					/>
				</Post.Wrapper>

				<Post.Wrapper>
					<BlockContent
						blocks={post.body}
						projectId={sanityClient.config().projectId}
						dataset={sanityClient.config().dataset}
						serializers={postSerializer}
						imageOptions={{ fit: 'clip', auto: 'format' }}
					/>
				</Post.Wrapper>

				<Post.Wrapper as="footer">
					<div tw="relative font-medium pl-4 py-px mt-10 before:(content absolute top-0 left-0 block h-full w-1 bg-primary) md:(pl-16 py-2 text-4xl mt-20 space-y-4 before:w-2)">
						<p>
							Time:{' '}
							<time dateTime={dayjs(post.fromDate).format('YYYY-MM-DD')}>
								{post.fromDate ? dayjs(post.fromDate).format('DD/MM') : '-/-'}
							</time>
							{post.toDate && (
								<>
									{' '}
									&#8211;{' '}
									<time dateTime={dayjs(post.toDate).format('YYYY-MM-DD')}>
										{post.toDate ? dayjs(post.toDate).format('DD/MM ') : '-/-'}
									</time>
								</>
							)}
						</p>

						<p>Location: {post.location ?? '--'}</p>
					</div>
				</Post.Wrapper>
			</section>

			<RelatedPosts posts={relatedPosts} heading="Related events" />
		</MainLayout>
	);
};

export default EventPost;
