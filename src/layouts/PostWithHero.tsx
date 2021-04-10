import PostComponents from '@components/Post/Post';
import PublishedDate from '@components/PublishedDate/PublishedDate';
import RelatedPosts from '@components/RelatedPosts/RelatedPosts';
import { Format } from '@data/common-data';
import MainLayout from '@layouts/MainLayout';
import SliceZone from '@lib/prismic/components/slices/SliceZone/SliceZone';
import { Post } from '@model';
import dayjs from 'dayjs';
import React from 'react';

type Props = { post: Post; relatedPosts: Post[]; isPreviewMode?: boolean };

const EventPost = ({ post, relatedPosts, isPreviewMode }: Props) => {
	// FIXME
	// const { data, error } = usePost(serverData?.post.slug, serverData);

	const publishedAt = post.first_publication_date
		? new Date(post.first_publication_date)
		: new Date();
	const fromDate = dayjs(post.data.from_date ?? new Date());
	const toDate = dayjs(post.data.to_date ?? new Date());

	return (
		<MainLayout
			isPreviewMode={isPreviewMode}
			title={post.data.title}
			tw="pb-0! md:text-2xl"
		>
			<section tw="col-span-full ">
				<PostComponents.Wrapper as="header">
					<PublishedDate date={publishedAt} />
					<PostComponents.Title>{post.data.title}</PostComponents.Title>
				</PostComponents.Wrapper>

				<PostComponents.Wrapper tw="relative pb-2xs my-10 md:my-16 xl:(my-20 transform scale-x-125)">
					{/* FIXME missing responsive and swap */}
					<img
						tw="img-absolute absolute!"
						src={post.data.thumbnail.url}
						alt={
							post.data.thumbnail.alt ?? 'Alt text is unfortunately missing.'
						}
					/>
				</PostComponents.Wrapper>

				<PostComponents.Wrapper>
					{post.data.body.map((slice, index) => (
						<SliceZone slice={slice} key={`slice-${index}`} />
					))}
				</PostComponents.Wrapper>

				<PostComponents.Wrapper as="footer">
					<div tw="relative font-medium pl-4 py-px mt-10 before:(content absolute top-0 left-0 block h-full w-1 bg-primary) md:(pl-16 py-2 text-4xl mt-20 space-y-4 before:w-2)">
						<p>
							Time:{' '}
							<time dateTime={fromDate.format(Format.DATE)}>
								{fromDate.format(Format.SHORT_DATE)}
							</time>
							{post.data.to_date && (
								<>
									{' '}
									&#8211;{' '}
									<time dateTime={toDate.format(Format.DATE)}>
										{toDate.format(Format.SHORT_DATE)}
									</time>
								</>
							)}
						</p>

						<p>Location: {post.data.location ?? 'TBD'}</p>
					</div>
				</PostComponents.Wrapper>
			</section>

			<RelatedPosts posts={relatedPosts} heading="Related events" />
		</MainLayout>
	);
};

export default EventPost;
