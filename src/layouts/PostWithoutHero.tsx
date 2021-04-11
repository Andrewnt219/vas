import PostComponents from '@components/Post/Post';
import RelatedPosts from '@components/RelatedPosts/RelatedPosts';
import { Format } from '@data/common-data';
import SliceZone from '@lib/prismic/components/slices/SliceZone/SliceZone';
import { Post } from '@model';
import { getHashtagLink } from '@utils/route-utils';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import React from 'react';

type Props = { className?: string; post: Post; relatedPosts: Post[] };

// TODO add author at the bottom

const PostWithoutHero = ({ className, post, relatedPosts }: Props) => {
	const displayedHashtag = post.data.hashtags[0]?.hashtag;
	const publishDate = dayjs(post.first_publication_date ?? Date.now());

	return (
		<div tw="col-span-full" className={className}>
			<section>
				<PostComponents.Wrapper as="header">
					{displayedHashtag && (
						<NextLink href={getHashtagLink(displayedHashtag.data.uid)} passHref>
							<a tw="block transition-colors text-primary underline decorator-transparent hocus:(decorator-primary) xl:(font-bold text-primary)">
								{displayedHashtag.data.title}
							</a>
						</NextLink>
					)}

					<PostComponents.Title tw="my-2 md:my-5">
						{post.data.title}
					</PostComponents.Title>

					<time
						tw="text-gray-200 text-smaller italic"
						dateTime={publishDate.format(Format.DATE)}
					>
						{publishDate.format(Format.DATE_TEXT)}
					</time>
				</PostComponents.Wrapper>

				<PostComponents.Wrapper tw="mt-10 md:mt-14 xl:mt-20">
					{post.data.body.map((slice, index) => (
						<SliceZone slice={slice} key={`slice-${index}`} />
					))}
				</PostComponents.Wrapper>
			</section>

			<RelatedPosts posts={relatedPosts} heading="read more" />
		</div>
	);
};

export default PostWithoutHero;
