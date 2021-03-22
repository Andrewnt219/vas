import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import { NewsCardModel } from '@lib/sanity/models/NewsCardModel';
import { getControllerFromPath } from '@utils/route-utils';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
	className?: string;
	data: NewsCardModel & { views: number; comments: number };
};

function NewsCard({ className, data }: Props) {
	const { asPath } = useRouter();
	const controller = getControllerFromPath(asPath) ?? '';

	return (
		<article className={className} tw="">
			<hr tw="border-black border-opacity-50" />

			<div tw="mt-6 grid md:(mt-12 grid-cols-2 gap-x-8)  xl:(grid-cols-3 )">
				<div tw="relative pb-xs border border-black border-opacity-50 xl:(col-start-1 col-end-2 pb-sm)">
					<EnhancedImage
						tw="img-absolute"
						src={data.thumbnail.url}
						lqip={data.thumbnail.metadata.lqip}
						alt={data.thumbnail.alt ?? ''}
						layout="fill"
					/>
				</div>

				<div tw="mt-4 md:mt-0 xl:(col-start-2 col-end-4 flex flex-col justify-between)">
					<header>
						<p tw="text-primary md:text-xl">{data.subcategory}</p>

						<h2 tw="font-bold text-xl  md:text-3xl hover:(underline text-primary) xl:(text-4xl mt-5)">
							<NextLink href={`/${controller}/posts/${data.slug}`}>
								<a>{data.title}</a>
							</NextLink>
						</h2>
						<p tw="mt-4 text-gray-200 md:text-newsBody xl:mt-8">
							{data.snippet}
						</p>
					</header>

					<p tw="mt-8 text-right text-gray-200 md:text-xl xl:(mt-0 text-left)">
						{data.views} views &#47; {data.comments} comments
					</p>
				</div>
			</div>
		</article>
	);
}

export default NewsCard;
