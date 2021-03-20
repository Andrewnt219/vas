import Button from '@components/Button/Button';
import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import { OrientationCardModel } from '@lib/sanity/models/OrientationCardModel';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import React from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	className?: string;
	data: OrientationCardModel;
	isMain?: boolean;
};

function OrientationCard({ className, data, isMain }: Props) {
	return (
		<div className={className} tw="">
			<article className={className}>
				<ImageContainer isMain={isMain}>
					<EnhancedImage
						tw="img-absolute"
						src={data.thumbnail.url}
						lqip={data.thumbnail.metadata.lqip}
						alt={data.thumbnail.alt ?? ''}
						layout="fill"
					/>
				</ImageContainer>

				<header tw="mt-2  md:(mt-4 mb-2) xl:(mt-7 mb-6)">
					<h2 tw="font-bold text-lg md:text-2xl xl:text-4xl">{data.title}</h2>
				</header>

				{isMain && (
					<>
						<div tw="font-medium text-lg">
							<p>
								Time:{' '}
								<time dateTime={dayjs(data.fromDate).format('DD/MM')}>
									{dayjs(data.fromDate).format('DD/MM')}
								</time>{' '}
								&#8211;{' '}
								<time dateTime={dayjs(data.toDate).format('DD/MM')}>
									{dayjs(data.toDate).format('DD/MM')}
								</time>
							</p>
							<p>Location: {data.locations.join(' & ')}</p>
						</div>

						<div tw="text-base mt-4 text-gray-200 md:(text-lg mt-6) xl:(mt-10 text-newsBody)">
							<p tw="mb-2 xl:mb-4">{data.snippet}</p>

							<NextLink href={`/posts/${data.slug}`} passHref>
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
