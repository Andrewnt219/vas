import AuthordCard from '@components/AuthorCard/AuthordCard';
import Image from '@components/Image/Image';
import PostComponents from '@components/Post/Post';
import PublishedDate from '@components/PublishedDate/PublishedDate';
import RelatedPosts from '@components/RelatedPosts/RelatedPosts';
import { Format } from '@data/common-data';
import PostSliceZone from '@lib/prismic/component-types/post/slice/PostSliceZone/PostSliceZone';
import { Post } from '@services/post-service';
import dayjs from 'dayjs';
import React from 'react';

type Props = { className?: string; post: Post; relatedPosts: Post[] };

// TODO add author at the bottom
const PostWithHero = ({ post, relatedPosts, className }: Props) => {
	const publishedAt = post.first_publication_date
		? new Date(post.first_publication_date)
		: new Date();
	const fromDate = dayjs(post.data.from_date ?? new Date());
	const toDate = dayjs(post.data.to_date ?? new Date());
	const imgSrc = `${post.data.thumbnail.url}`;
	return (
		<div tw="col-span-full" className={className}>
			<section tw="">
				<PostComponents.Wrapper as="header">
					<PublishedDate date={publishedAt} />
					<PostComponents.Title>{post.data.title}</PostComponents.Title>
				</PostComponents.Wrapper>

				<PostComponents.Wrapper tw="relative pb-2xs my-10 md:my-16 xl:(my-20 transform scale-x-125)">
					<Image
						tw="img-absolute absolute!"
						imgSrc={imgSrc}
						alt={
							post.data.thumbnail.alt ?? 'Alt text is unfortunately missing.'
						}
					/>
				</PostComponents.Wrapper>

				<PostComponents.Wrapper>
					{post.data.body.map((slice, index) => (
						<PostSliceZone slice={slice} key={`slice-${index}`} />
					))}
				</PostComponents.Wrapper>

				<PostComponents.Wrapper>
					<div tw="relative font-medium pl-4 py-px mt-10 before:(content absolute top-0 left-0 block h-full w-1 bg-primary) md:(pl-8 py-2 text-2xl mt-20 before:w-2)">
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

				<PostComponents.Wrapper tw="mt-10 md:mt-14 xl:mt-20">
					<AuthordCard data={post.data.author.data} />
				</PostComponents.Wrapper>
			</section>

			<RelatedPosts posts={relatedPosts} heading="Related events" />
		</div>
	);
};

export default PostWithHero;
