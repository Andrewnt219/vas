import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import Post from '@components/Post/Post';
import PublishedDate from '@components/PublishedDate/PublishedDate';
import RelatedPosts from '@components/RelatedPosts/RelatedPosts';
import MainLayout from '@layouts/MainLayout';
import { sanityClient } from '@lib/sanity/sanity-clients';
import { postSerializer } from '@lib/sanity/serializers/post-serializer';
import BlockContent from '@sanity/block-content-to-react';
import { usePost } from '@src/hooks/usePost';
import { postPage } from '@src/server/utils/page-utils';
import dayjs from 'dayjs';
import { InferGetStaticPropsType } from 'next';
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
	const { data, error } = usePost(serverData?.post.slug, serverData);
	console.log({ data });
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

			<RelatedPosts
				tw="mt-24 col-span-full"
				posts={relatedPosts}
				heading="Related events"
			/>
		</MainLayout>
	);
};

export default EventPost;
