import { Post } from '@model';
import NextLink from 'next/link';
import React from 'react';

type PostItemProps = {
	data: Post;
};
function PostItem({ data }: PostItemProps) {
	const postData = data.data;
	const postUrl = `/posts/${data.uid ?? ''}`;

	return (
		<article>
			<div tw="relative pb-xs md:pb-sm">
				<NextLink href={postUrl} passHref>
					<a>
						<img
							// TODO recreate enhaned image
							tw="img-absolute absolute!"
							src={postData.thumbnail.url}
							alt={postData.thumbnail.url ?? 'A thumbnail for the post'}
						/>
					</a>
				</NextLink>
			</div>

			<header>
				<h1 tw="mt-2 md:mt-4">
					<NextLink href={postUrl} passHref>
						<a tw="font-medium ">{postData.title}</a>
					</NextLink>
				</h1>
			</header>
		</article>
	);
}
type Props = { className?: string; heading: string; posts: Post[] };

function RelatedPosts({ className, heading, posts }: Props) {
	return (
		<section
			aria-label="Related posts"
			className={className}
			tw="mt-24 bg-gray-100 px-8 py-10 md:(px-12) xl:(px-44 py-24)"
		>
			<h1 tw="font-bold text-larger mx-auto max-w-max uppercase relative after:(content block w-sm h-px bg-black bg-opacity-50 mx-auto my-2 md:my-5)">
				{heading}
			</h1>

			<ul tw="mt-8 grid grid-cols-1 gap-y-6 md:(grid-cols-2 gap-x-4 mt-10) xl:(grid-cols-3 gap-x-12 ) 2xl:(grid-cols-4)">
				{posts.map((post) => (
					<li key={post.id}>
						<PostItem data={post} />
					</li>
				))}
			</ul>
		</section>
	);
}

export default RelatedPosts;
