import PostComponents from '@components/Post/Post';
import RelatedPosts from '@components/RelatedPosts/RelatedPosts';
import { Format } from '@data/common-data';
import MainLayout from '@layouts/MainLayout';
import SliceZone from '@lib/prismic/components/slices/SliceZone/SliceZone';
import { Post } from '@model';
import { getHashtagLink } from '@utils/route-utils';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import React from 'react';

type Props = { post: Post; relatedPosts: Post[]; isPreviewMode?: boolean };

const PostWithoutHero = ({
	post,
	relatedPosts,
	isPreviewMode = false,
}: Props) => {
	// FIXME
	// const { data, error } = usePost(serverData?.post.slug, serverData);

	const displayedHashtag = post.data.hashtags[0]?.hashtag;
	const publishDate = dayjs(post.first_publication_date ?? Date.now());

	return (
		<MainLayout
			title={post.data.title}
			tw="pb-0!"
			isPreviewMode={isPreviewMode}
		>
			<section tw="col-span-full md:text-2xl">
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
		</MainLayout>
	);
};

export default PostWithoutHero;
