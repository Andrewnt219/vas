import { Response } from '@api-response';
import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import PublishedDate from '@components/PublishedDate/PublishedDate';
import RelatedPosts from '@components/RelatedPosts/RelatedPosts';
import MainLayout from '@layouts/MainLayout';
import { PostModel } from '@lib/sanity/models/PostModel';
import { sanityClient } from '@lib/sanity/sanity-clients';
import { postSerializer } from '@lib/sanity/serializers/post-serializer';
import BlockContent from '@sanity/block-content-to-react';
import { PostDataService } from '@services/post-data-service';
import { assertLanguages } from '@src/utils/validate-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */

type StaticProps = Response<PostModel>;
type Params = {
	slug: string;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
	params,
	locale,
}) => {
	assertLanguages(locale);

	PostDataService.switchLanguage(locale);

	if (!params?.slug) {
		return {
			props: {
				data: null,
				error: { message: 'Missing slug' },
			},
		};
	}

	const post = await PostDataService.getPostBySlug(params.slug);

	if (!post) {
		return {
			props: {
				data: null,
				error: { message: 'Post not found' },
			},
		};
	}

	return {
		props: {
			data: post,
			error: null,
		},
		revalidate: 60,
	};
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const slugs = await PostDataService.getPostSlugs();

	const paths = slugs.map(({ slug }) => ({ params: { slug } }));

	return {
		paths,
		fallback: true,
	};
};

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */
type Props = InferGetStaticPropsType<typeof getStaticProps> & {
	className?: string;
};

const Post: VFC<Props> = ({ className, data, error }) => {
	if (error) {
		return <h1>{error.message}</h1>;
	}

	if (!data) {
		return <h1>Fetching post...</h1>;
	}

	return (
		<MainLayout title={data.title} tw="pb-0!">
			<section className={className} tw="col-span-full md:text-2xl">
				<StyledContainer as="header">
					<PublishedDate date={new Date(data.publishedAt)} />
					<h1 tw="font-bold text-2xl mt-5 transition-colors hover:text-primary md:(text-4xl mt-10)  xl:(text-5xl mt-14)">
						{data.title}
					</h1>
				</StyledContainer>

				<StyledContainer tw="relative pb-2xs my-10 md:my-16 xl:(my-20 transform scale-x-125)">
					<EnhancedImage
						tw="img-absolute"
						src={data.thumbnail.url}
						lqip={data.thumbnail.metadata.lqip}
						alt={data.thumbnail.alt ?? 'Alt text is unfortunately missing'}
						layout="fill"
					/>
				</StyledContainer>

				<div tw="px-4 max-w-prose mx-auto md:px-8">
					<BlockContent
						blocks={data.body}
						projectId={sanityClient.config().projectId}
						dataset={sanityClient.config().dataset}
						serializers={postSerializer}
						imageOptions={{ fit: 'clip', auto: 'format' }}
					/>
				</div>

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

type StyledContainerProps = {};
const StyledContainer = styled.div<StyledContainerProps>`
	${tw`px-4 md:px-8 max-w-prose mx-auto`}
`;

export default Post;
