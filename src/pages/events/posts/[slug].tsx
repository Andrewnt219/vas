import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import Post from '@components/Post/Post';
import PublishedDate from '@components/PublishedDate/PublishedDate';
import RelatedPosts from '@components/RelatedPosts/RelatedPosts';
import MainLayout from '@layouts/MainLayout';
import { sanityClient } from '@lib/sanity/sanity-clients';
import { postSerializer } from '@lib/sanity/serializers/post-serializer';
import BlockContent from '@sanity/block-content-to-react';
import {
	getStaticPost,
	getStaticPostsPathsByCategory,
} from '@utils/server-utils';
import { InferGetStaticPropsType } from 'next';
import React, { VFC } from 'react';
import 'twin.macro';
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */

export const getStaticProps = getStaticPost;

export const getStaticPaths = getStaticPostsPathsByCategory('events');

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const EventPost: VFC<Props> = ({ data, error }) => {
	if (error) {
		return <h1>{error.message}</h1>;
	}

	if (!data) {
		return <h1>Fetching post...</h1>;
	}

	return (
		<MainLayout title={data.title} tw="pb-0!">
			<section tw="col-span-full md:text-2xl">
				<Post.Wrapper as="header">
					<PublishedDate date={new Date(data.publishedAt)} />
					<Post.Title>{data.title}</Post.Title>
				</Post.Wrapper>

				<Post.Wrapper tw="relative pb-2xs my-10 md:my-16 xl:(my-20 transform scale-x-125)">
					<EnhancedImage
						tw="img-absolute"
						src={data.thumbnail.url}
						lqip={data.thumbnail.metadata.lqip}
						alt={data.thumbnail.alt ?? 'Alt text is unfortunately missing'}
						layout="fill"
					/>
				</Post.Wrapper>

				<Post.Wrapper>
					<BlockContent
						blocks={data.body}
						projectId={sanityClient.config().projectId}
						dataset={sanityClient.config().dataset}
						serializers={postSerializer}
						imageOptions={{ fit: 'clip', auto: 'format' }}
					/>
				</Post.Wrapper>

				<RelatedPosts tw="mt-24" posts={posts} heading="Related events" />
			</section>
		</MainLayout>
	);
};

const posts = [
	{
		title: 'Therapy for the End of the World',
		thumbnail: {
			url: require('images/hero/tet.png'),
			metadata: {
				height: 100,
				lqip: require('images/hero/tet.png?lqip'),
				ratio: 0.5,
				width: 100,
			},
			alt: 'dasdasdas',
		},
		slug: '/en-us',
	},
	{
		title: 'Therapy for the End of the World',
		thumbnail: {
			url: require('images/hero/about-us.png'),
			metadata: {
				height: 100,
				lqip: require('images/hero/about-us.png?lqip'),
				ratio: 0.5,
				width: 100,
			},
			alt: 'dasdasdas',
		},
		slug: '/en-us',
	},
	{
		title: 'Therapy for the End of the World',
		thumbnail: {
			url: require('images/avatar.jpg'),
			metadata: {
				height: 100,
				lqip: require('images/avatar.jpg?lqip'),
				ratio: 0.5,
				width: 100,
			},
			alt: 'dasdasdas',
		},
		slug: '/en-us',
	},
];

export default EventPost;
