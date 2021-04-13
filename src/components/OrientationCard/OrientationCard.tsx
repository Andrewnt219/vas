import Button from '@components/Button/Button';
import Image from '@components/Image/Image';
import { Format } from '@data/common-data';
import { Post } from '@services/post-service';
import { getPostLink } from '@utils/route-utils';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	className?: string;
	data: Post;
	isMain?: boolean;
};

function OrientationCard({ className, data: post, isMain }: Props) {
	const postLink = getPostLink(post.uid ?? '');
	const fromDate = dayjs(post.data.from_date ?? Date.now());
	const toDate = dayjs(post.data.to_date ?? Date.now());

	return (
		<div className={className} tw="">
			<article className={className}>
				<ImageContainer isMain={isMain}>
					<NextLink href={postLink}>
						<a>
							<Image
								tw="img-absolute absolute!"
								imgSrc={post.data.thumbnail.url}
								alt={post.data.thumbnail.alt ?? 'Missing alternative text'}
							/>
						</a>
					</NextLink>
				</ImageContainer>

				<header tw="mt-2  md:(mt-4 mb-2) xl:(mt-7 mb-6)">
					<h2 tw="font-bold text-lg md:text-2xl xl:text-4xl">
						<NextLink href={postLink}>
							<a>{post.data.title}</a>
						</NextLink>
					</h2>
				</header>

				{isMain && (
					<>
						<div tw="font-medium text-lg">
							<p>
								Time:{' '}
								<time dateTime={fromDate.format(Format.DATE)}>
									{fromDate.format(Format.SHORT_DATE)}
								</time>{' '}
								&#8211;{' '}
								<time dateTime={toDate.format(Format.DATE)}>
									{toDate.format(Format.SHORT_DATE)}
								</time>
							</p>
							<p>Location: {post.data.location}</p>
						</div>

						<div tw="text-base mt-4 text-gray-200 md:(text-lg mt-6) xl:(mt-10 text-newsBody)">
							<div tw="mb-2 xl:mb-4">
								<RichText render={post.data.snippet} />
							</div>

							<NextLink href={postLink} passHref>
								<Button variant="link" as="a" tw="mt-9 italic">
									Read more...
								</Button>
							</NextLink>
						</div>
					</>
				)}
			</article>
		</div>
	);
}

type ImageContainerProps = Pick<Props, 'isMain'> & {};
const ImageContainer = styled.div<ImageContainerProps>(({ isMain }) => [
	tw`w-full pb-xs relative`,
	!isMain && tw`md:pb-sm`,
]);

export default OrientationCard;
