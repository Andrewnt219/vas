import Image from '@components/Image/Image';
import { Post } from '@services/post-service';
import { scaleImageCss } from '@styles/apply';
import { getPostLink } from '@utils/convert-utils';
import NextLink from 'next/link';
import { RichText } from 'prismic-reactjs';
import React from 'react';

type Props = {
	className?: string;
	post: Post;
};

// TODO add author below title
function NewsCard({ className, post }: Props) {
	const postLink = getPostLink(post.uid ?? post.id);
	const hashtag = post.data.hashtags?.[0]?.hashtag;

	return (
		<article className={className} tw="">
			<hr tw="border-black border-opacity-50" />

			<div tw="mt-6 grid md:(mt-12 grid-cols-2 gap-x-8)  xl:(grid-cols-3 )">
				<div tw="relative pb-xs border border-black border-opacity-50 xl:(col-start-1 col-end-2 pb-sm)">
					<NextLink href={postLink}>
						<a>
							<Image
								tw="img-absolute absolute!"
								css={scaleImageCss}
								imgSrc={post.data.thumbnail.url}
								alt={post.data.thumbnail.alt ?? ''}
							/>
						</a>
					</NextLink>
				</div>

				<div tw="mt-4 md:mt-0 xl:(col-start-2 col-end-4 flex flex-col justify-between)">
					<header>
						<p tw="text-primary md:text-xl">{hashtag.data.title ?? '--'}</p>

						<h2 tw="font-bold text-xl  md:text-3xl hocus:(underline text-primary) xl:(text-4xl mt-5)">
							<NextLink href={postLink}>
								<a>{post.data.title}</a>
							</NextLink>
						</h2>
						<div tw="mt-4 text-skin-muted md:text-newsBody xl:mt-8">
							<RichText render={post.data.snippet} />
						</div>
					</header>

					<p tw="mt-8 text-right text-skin-muted md:text-xl xl:(mt-0 text-left)">
						{post.meta?.views ?? 0} views &#47; {post.comments.length ?? 0}{' '}
						comments
					</p>
				</div>
			</div>
		</article>
	);
}

export default NewsCard;
